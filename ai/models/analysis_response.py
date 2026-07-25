from pydantic import BaseModel, Field


class AnalysisResponse(BaseModel):
    summary: str
    root_cause: str
    severity: str
    suggested_fix: str
    confidence: float = Field(ge=0.0, le=1.0)
