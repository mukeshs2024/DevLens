from typing import Optional
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    repository_url: str = Field(..., description="GitHub repository URL")
    branch: str = Field("main", description="Target branch")
    issue_description: Optional[str] = Field(None, description="Context of the issue")
    logs: Optional[str] = Field(None, description="Raw logs")

class LogUploadRequest(BaseModel):
    log_content: str = Field(..., description="Raw log text")
    source: str = Field("unknown", description="Source of the log (e.g., stderr, file)")
