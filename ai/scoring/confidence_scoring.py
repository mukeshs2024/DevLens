from typing import Any


def score_confidence(response: dict[str, Any]) -> float:
    score = 0.0

    if response.get("summary"):
        score += 0.2
    if response.get("root_cause"):
        score += 0.2
    if response.get("suggested_fix"):
        score += 0.2
    if response.get("severity"):
        score += 0.2
    if isinstance(response.get("confidence"), (int, float)):
        score = max(score, float(response["confidence"]))

    return round(min(score, 1.0), 2)
