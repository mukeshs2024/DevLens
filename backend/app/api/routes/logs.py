from fastapi import APIRouter
from app.models.schemas.requests import LogUploadRequest
from app.models.schemas.responses import LogUploadResponse
from app.services.log_parser import LogParserService

router = APIRouter()
parser_service = LogParserService()

@router.post("/", response_model=LogUploadResponse, summary="Upload a log", description="Accepts raw log text and returns parsed errors, stack traces, and warning counts.")
async def upload_log(request: LogUploadRequest):
    """
    Accepts raw log files or text for parsing.
    """
    result = parser_service.parse_logs(request.log_content)
    return LogUploadResponse(
        parsed_errors=result["parsed_errors"],
        stack_traces=result["stack_traces"],
        critical_warnings=result["critical_warnings"]
    )
