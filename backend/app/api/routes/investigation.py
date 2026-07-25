from fastapi import APIRouter, Path
from app.models.schemas.responses import InvestigationStatusResponse

router = APIRouter()

@router.get("/{investigation_id}", response_model=InvestigationStatusResponse)
async def get_investigation(investigation_id: str = Path(..., description="The ID of the investigation")):
    """
    Retrieves the status and results of an investigation.
    """
    # Placeholder for retrieval logic
    return InvestigationStatusResponse(
        investigation_id=investigation_id,
        status="completed",
        github_context={"commits": 5, "prs": 1},
        ai_insights_ready=True
    )
