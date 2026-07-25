from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    logs: list[str] = Field(default_factory=list)
    errors: list[str] = Field(default_factory=list)
    github_context: str = Field(default="")
