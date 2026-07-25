from typing import List, Optional
from pydantic import BaseModel, Field

class AIResponseSchema(BaseModel):
    summary: str
    root_cause: str
    severity: str
    suggested_fix: str
    confidence: float
from pydantic import BaseModel

class AnalyzeResponse(BaseModel):
    investigation_id: str
    status: str = "completed"
    summary: str
    root_cause: str
    severity: str
    suggested_fix: str
    confidence: float
    repository: Optional[str] = None
    branch: Optional[str] = None
    latest_commit: Optional[str] = None
    commit_message: Optional[str] = None
    changed_files: Optional[List[dict]] = None
    parsed_errors: Optional[List[dict]] = None
    stack_traces: Optional[List[str]] = None
    pull_request: Optional[dict] = None

class ParsedError(BaseModel):
    line: int
    message: str
    type: str
    severity: str

class LogUploadResponse(BaseModel):
    parsed_errors: List[ParsedError]
    stack_traces: List[str]
    critical_warnings: int

class InvestigationStatusResponse(BaseModel):
    investigation_id: str
    status: str
    github_context: Optional[dict] = None
    parsed_logs: Optional[dict] = None
    ai_insights_ready: bool = False
