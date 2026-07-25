from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from ai.models.analysis_request import AnalysisRequest
from ai.models.analysis_response import AnalysisResponse
from ai.prompts.prompt_builder import build_prompt
from ai.scoring.confidence_scoring import score_confidence
from ai.services.gemini_client import AIModelUnavailableError, GeminiClient
from ai.services.response_parser import ResponseParserError, parse_response

import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="DevLens AI Module", version="0.1.0")
client = GeminiClient()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: object, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(status_code=400, content={"detail": "Invalid request payload"})


@app.post("/ai/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest) -> AnalysisResponse | JSONResponse:
    try:
        prompt = build_prompt(request)

        print("Calling Gemini...")

        raw_response = await client.generate(prompt)

        print("Gemini returned")

        parsed_response = parse_response(raw_response)
        confidence = score_confidence(parsed_response)

        return AnalysisResponse(
            summary=parsed_response.get("summary", "No summary generated."),
            root_cause=parsed_response.get("root_cause", "No root cause identified."),
            severity=parsed_response.get("severity", "High"),
            suggested_fix=parsed_response.get("suggested_fix", "No suggested fix generated."),
            confidence=confidence,
        )
    except AIModelUnavailableError as e:
        print("Fallback triggered due to AIModelUnavailableError:", repr(e))
        return AnalysisResponse(
            summary="Fallback: Gemini API quota exceeded or unavailable.",
            root_cause="Fallback: The DevLens AI encountered a quota exhaustion (429) or availability (503) limit while communicating with the Gemini API.",
            severity="High",
            suggested_fix="Fallback: Check your Google Cloud Project billing, upgrade your quota, or wait for capacity to return.",
            confidence=0.5,
        )
    except ResponseParserError as e:
        print("ERROR 1:", repr(e))
        raise HTTPException(status_code=503, detail="Failed to parse AI response.")
    except Exception as e:
        print("ERROR 2:", repr(e))
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")
