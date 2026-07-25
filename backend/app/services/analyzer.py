import httpx
from app.services.github import GithubService
from app.services.log_parser import LogParserService
from app.utils.logger import setup_logger
from app.core.config import settings

logger = setup_logger(__name__)

class AnalysisOrchestrator:
    def __init__(self):
        self.github_service = GithubService()
        self.parser_service = LogParserService()

    async def run_analysis(self, investigation_id: str, repo_url: str, branch: str, issue_description: str = None, logs: str = None) -> dict:
        logger.info(f"[{investigation_id}] Starting analysis for {repo_url} on branch {branch}")
        
        # 1. Parse repository details
        # naive extraction for demo
        parts = repo_url.rstrip("/").split("/")
        owner, repo = parts[-2], parts[-1]
        
        github_context = {}
        parsed_logs = {}
        
        try:
            # 2. Fetch GitHub Context
            latest_commit = await self.github_service.get_latest_commit(owner, repo, branch)
            github_context["latest_commit_sha"] = latest_commit.get("sha")
            
            # Additional github context could be fetched here (e.g. PRs, changed files)
            context_string = f"Repository: {owner}/{repo}, Branch: {branch}, Latest Commit: {latest_commit.get('sha')}"
            if issue_description:
                context_string += f" | Issue Description: {issue_description}"
                
            logger.info(f"[{investigation_id}] Fetched GitHub context.")
            
            # 3. Parse Logs if provided
            raw_errors = []
            if logs:
                parsed_logs = self.parser_service.parse_logs(logs)
                raw_errors = [e.message for e in parsed_logs.get("parsed_errors", [])]
                logger.info(f"[{investigation_id}] Parsed logs. Found {len(raw_errors)} errors.")
                
            # 4. Call AI Service via HTTP
            ai_payload = {
                "logs": parsed_logs.get("stack_traces", []),
                "errors": raw_errors,
                "github_context": context_string
            }
            
            try:
                logger.info(f"[{investigation_id}] Sending payload to AI service at {settings.AI_SERVICE_URL}")
                async with httpx.AsyncClient() as client:
                    ai_resp = await client.post(settings.AI_SERVICE_URL, json=ai_payload, timeout=60.0)
                    ai_resp.raise_for_status()
                    ai_data = ai_resp.json()
            except httpx.RequestError as exc:
                from app.core.exceptions import DevLensException
                raise DevLensException(f"AI service connection error: {exc}", status_code=503, error_code="ai_service_offline")
            except httpx.HTTPStatusError as exc:
                from app.core.exceptions import DevLensException
                raise DevLensException(f"AI service returned an error: {exc.response.status_code}", status_code=503, error_code="ai_service_error")
                
            logger.info(f"[{investigation_id}] Received AI response.")
            
            return {
                "investigation_id": investigation_id,
                "status": "completed",
                "summary": ai_data.get("summary", ""),
                "root_cause": ai_data.get("root_cause", ""),
                "severity": ai_data.get("severity", ""),
                "suggested_fix": ai_data.get("suggested_fix", ""),
                "confidence": ai_data.get("confidence", 0.0)
            }
            
        except Exception as e:
            logger.error(f"[{investigation_id}] Analysis failed: {str(e)}")
            raise
