from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from ai.models.analysis_request import AnalysisRequest
from ai.models.analysis_response import AnalysisResponse
from ai.prompts.prompt_builder import build_prompt
from ai.scoring.confidence_scoring import score_confidence
from ai.services.gemini_client import AIModelUnavailableError, GeminiClient
from ai.services.response_parser import ResponseParserError, parse_response

app = FastAPI(title="DevLens AI Module", version="0.1.0")
client = GeminiClient()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: object, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(status_code=400, content={"detail": "Invalid request payload"})


@app.post("/ai/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest) -> AnalysisResponse | JSONResponse:
    try:
        prompt = build_prompt(request)
        raw_response = await client.generate(prompt)
        parsed_response = parse_response(raw_response)
        confidence = score_confidence(parsed_response)

        return AnalysisResponse(
            summary=parsed_response.get("summary", "No summary generated."),
            root_cause=parsed_response.get("root_cause", "No root cause identified."),
            severity=parsed_response.get("severity", "High"),
            suggested_fix=parsed_response.get("suggested_fix", "No suggested fix generated."),
            confidence=confidence,
        )
    except (AIModelUnavailableError, ResponseParserError):
        return JSONResponse(status_code=503, content={"detail": "AI model unavailable"})
    except Exception:
        return JSONResponse(status_code=503, content={"detail": "AI model unavailable"})
