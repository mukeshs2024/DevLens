from app.services.github import GithubService
from app.services.parser import LogParserService
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class AnalysisOrchestrator:
    def __init__(self):
        self.github_service = GithubService()
        self.parser_service = LogParserService()

    async def run_analysis(self, investigation_id: str, repo_url: str, branch: str, logs: str = None):
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
            logger.info(f"[{investigation_id}] Fetched latest commit: {github_context['latest_commit_sha']}")
            
            # 3. Parse Logs if provided
            if logs:
                parsed_logs = self.parser_service.parse_logs(logs)
                logger.info(f"[{investigation_id}] Parsed logs. Found {len(parsed_logs.get('parsed_errors', []))} errors.")
                
            # 4. Prepare for AI Service (Placeholder)
            ai_payload = {
                "github_context": github_context,
                "logs": parsed_logs
            }
            logger.info(f"[{investigation_id}] AI payload prepared. Orchestration complete.")
            
        except Exception as e:
            logger.error(f"[{investigation_id}] Analysis failed: {str(e)}")
            raise
