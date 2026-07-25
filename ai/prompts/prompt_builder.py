from pathlib import Path

from ai.models.analysis_request import AnalysisRequest

PROMPTS_DIR = Path(__file__).resolve().parent


def _load_template(filename: str) -> str:
    return (PROMPTS_DIR / filename).read_text(encoding="utf-8")


def build_prompt(request: AnalysisRequest) -> dict[str, str]:
    system_prompt = _load_template("system_prompt.txt")
    user_prompt = _load_template("user_prompt.txt").format(
        logs="\n".join(request.logs),
        errors="\n".join(request.errors),
        github_context=request.github_context,
    )

    return {
        "system_prompt": system_prompt,
        "user_prompt": user_prompt,
    }
