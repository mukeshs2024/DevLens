import json
import re
from typing import Any


class ResponseParserError(ValueError):
    pass


def parse_response(raw_response: str) -> dict[str, Any]:
    cleaned = raw_response.strip()

    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        raise ResponseParserError("Model returned invalid JSON") from exc

    required_fields = {"summary", "root_cause", "severity", "suggested_fix", "confidence"}
    if not required_fields.issubset(parsed.keys()):
        raise ResponseParserError("Model response missing required fields")

    return parsed
