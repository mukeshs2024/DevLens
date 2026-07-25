from typing import List, Optional
from pydantic import BaseModel

class AnalyzeResponse(BaseModel):
    investigation_id: str
    status: str = "processing"
    message: str

class LogUploadResponse(BaseModel):
    parsed_errors: List[dict]
    stack_traces: List[str]
    critical_warnings: int

class InvestigationStatusResponse(BaseModel):
    investigation_id: str
    status: str
    github_context: Optional[dict] = None
    parsed_logs: Optional[dict] = None
    ai_insights_ready: bool = False
