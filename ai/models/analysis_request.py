from typing import Any

from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    repository: str = ""
    branch: str = ""
    parsed_errors: list[str] = Field(default_factory=list)
    stack_traces: list[str] = Field(default_factory=list)
    critical_warnings: int = 0
    latest_commit: dict[str, Any] = Field(default_factory=dict)
    changed_files: list[str] = Field(default_factory=list)
    commit_message: str = ""
    issue_description: str = ""
