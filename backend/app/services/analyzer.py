import time
import httpx
from pydantic import ValidationError
from app.services.github import GithubService
from app.services.log_parser import LogParserService
from app.models.schemas.responses import AIResponseSchema
from app.utils.logger import setup_logger
from app.core.config import settings
from app.core.exceptions import DevLensException

logger = setup_logger(__name__)

class AnalysisOrchestrator:
    def __init__(self):
        self.github_service = GithubService()
        self.parser_service = LogParserService()

    async def run_analysis(self, investigation_id: str, repo_url: str, branch: str, issue_description: str = None, logs: str = None) -> dict:
        logger.info(f"[{investigation_id}] Starting analysis for {repo_url} on branch {branch}")
        
        parts = repo_url.rstrip("/").split("/")
        owner, repo = parts[-2], parts[-1]
        
        github_context = {}
        parsed_logs = {}
        
        # 1. Fetch GitHub Context
        latest_commit = await self.github_service.get_latest_commit(owner, repo, branch)
        commit_sha = latest_commit.get("sha")
        commit_message = latest_commit.get("commit", {}).get("message", "")
        changed_files = [f.get("filename") for f in latest_commit.get("files", [])]
        
        logger.info(f"[{investigation_id}] Fetched GitHub context.")
        
        # 2. Parse Logs
        raw_errors = []
        stack_traces = []
        critical_warnings = 0
        if logs:
            parsed_logs = self.parser_service.parse_logs(logs)
            raw_errors = [e.model_dump() for e in parsed_logs.get("parsed_errors", [])]
            stack_traces = parsed_logs.get("stack_traces", [])
            critical_warnings = parsed_logs.get("critical_warnings", 0)
            logger.info(f"[{investigation_id}] Parsed logs. Found {len(raw_errors)} errors.")
            
        # 3. Call AI Service via HTTP with exact payload
        ai_payload = {
            "repository": f"{owner}/{repo}",
            "branch": branch,
            "parsed_errors": raw_errors,
            "stack_traces": stack_traces,
            "critical_warnings": critical_warnings,
            "latest_commit": commit_sha,
            "changed_files": changed_files,
            "commit_message": commit_message,
            "issue_description": issue_description or ""
        }
        
        logger.info(f"[{investigation_id}] AI request start to {settings.AI_SERVICE_URL}")
        start_time = time.time()
        
        # Retry logic for timeout
        ai_data = None
        for attempt in range(2):
            try:
                async with httpx.AsyncClient() as client:
                    ai_resp = await client.post(settings.AI_SERVICE_URL, json=ai_payload, timeout=60.0)
                    ai_resp.raise_for_status()
                    ai_data = ai_resp.json()
                    break # Success
            except httpx.TimeoutException as exc:
                if attempt == 0:
                    logger.warning(f"[{investigation_id}] AI Timeout on attempt 1. Retrying...")
                    continue
                logger.error(f"[{investigation_id}] AI request failure: Timeout after 2 attempts.")
                raise DevLensException(f"AI service connection timeout: {exc}", status_code=503, error_code="ai_service_offline")
            except httpx.RequestError as exc:
                logger.error(f"[{investigation_id}] AI request failure: Connection error {exc}")
                raise DevLensException(f"AI service connection error: {exc}", status_code=503, error_code="ai_service_offline")
            except httpx.HTTPStatusError as exc:
                logger.error(f"[{investigation_id}] AI request failure: HTTP {exc.response.status_code}")
                raise DevLensException(f"AI service returned an error: {exc.response.status_code}", status_code=503, error_code="ai_service_error")

        response_time = time.time() - start_time
        logger.info(f"[{investigation_id}] AI request success. Response time: {response_time:.2f}s")
        
        # 4. Validate AI Response
        try:
            validated_ai_response = AIResponseSchema(**ai_data)
        except ValidationError as e:
            logger.error(f"[{investigation_id}] Invalid AI Response: {e}")
            raise DevLensException(f"AI service returned invalid payload structure: {e}", status_code=502, error_code="ai_invalid_response")
        
        return {
            "investigation_id": investigation_id,
            "status": "completed",
            "summary": validated_ai_response.summary,
            "root_cause": validated_ai_response.root_cause,
            "severity": validated_ai_response.severity,
            "suggested_fix": validated_ai_response.suggested_fix,
            "confidence": validated_ai_response.confidence
        }
