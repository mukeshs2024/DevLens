from fastapi import APIRouter
from app.models.schemas.requests import AnalyzeRequest
from app.models.schemas.responses import AnalyzeResponse
from app.services.analyzer import AnalysisOrchestrator
from app.services.storage_service import storage
import uuid
import datetime

router = APIRouter()
orchestrator = AnalysisOrchestrator()

@router.post("/", response_model=AnalyzeResponse, status_code=200, summary="Analyze an issue", description="Fetches GitHub context, parses logs, and calls AI service for a final report.")
async def analyze_issue(request: AnalyzeRequest):
    """
    Triggers an analysis workflow based on a repository and context.
    """
    investigation_id = str(uuid.uuid4())
    
    result = await orchestrator.run_analysis(
        investigation_id=investigation_id,
        repo_url=request.repository_url,
        branch=request.branch,
        issue_description=request.issue_description,
        logs=request.logs
    )
    
    # Save to history
    history_item = {
        "id": investigation_id,
        "uuid": investigation_id,
        "timestamp": datetime.datetime.now().isoformat(),
        "repository": result.get("repository"),
        "branch": result.get("branch"),
        "severity": result.get("severity"),
        "summary": result.get("summary"),
        "status": result.get("status", "completed"),
        "data": result
    }
    storage.add_history(history_item)
    
    return AnalyzeResponse(**result)
