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

    if not isinstance(parsed, dict):
        raise ResponseParserError("Model response must be a JSON object")

    required_fields = {"summary", "root_cause", "severity", "suggested_fix", "confidence"}
    if not required_fields.issubset(parsed.keys()):
        raise ResponseParserError("Model response missing required fields")

    parsed["summary"] = str(parsed.get("summary", "")).strip()
    parsed["root_cause"] = str(parsed.get("root_cause", "")).strip()
    parsed["severity"] = str(parsed.get("severity", "High")).strip() or "High"
    parsed["suggested_fix"] = str(parsed.get("suggested_fix", "")).strip()

    try:
        parsed["confidence"] = float(parsed.get("confidence", 0.0))
    except (TypeError, ValueError):
        parsed["confidence"] = 0.0

    return parsed
