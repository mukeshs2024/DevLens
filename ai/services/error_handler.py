def handle_error(exc: Exception) -> dict[str, str]:
    return {
        "error": "AI analysis failed",
        "message": str(exc),
    }
