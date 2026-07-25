from fastapi import FastAPI, HTTPException

from ai.models.analysis_request import AnalysisRequest
from ai.models.analysis_response import AnalysisResponse
from ai.prompts.prompt_builder import build_prompt
from ai.scoring.confidence_scoring import score_confidence
from ai.services.error_handler import handle_error
from ai.services.gemini_client import GeminiClient
from ai.services.response_parser import parse_response

app = FastAPI(title="DevLens AI Module", version="0.1.0")
client = GeminiClient()


@app.post("/ai/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest) -> AnalysisResponse:
    try:
        prompt = build_prompt(request)
        raw_response = await client.generate(prompt)
        parsed_response = parse_response(raw_response)
        confidence = score_confidence(parsed_response)

        return AnalysisResponse(
            summary=parsed_response.get("summary", "No summary generated."),
            root_cause=parsed_response.get("root_cause", "No root cause identified."),
            severity=parsed_response.get("severity", "medium"),
            suggested_fix=parsed_response.get("suggested_fix", "No suggested fix generated."),
            confidence=confidence,
        )
    except Exception as exc:  # pragma: no cover - defensive guard
        raise HTTPException(status_code=500, detail=handle_error(exc)) from exc
