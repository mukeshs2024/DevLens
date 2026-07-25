from pathlib import Path

from ai.models.analysis_request import AnalysisRequest

PROMPTS_DIR = Path(__file__).resolve().parent


def _load_template(filename: str) -> str:
    return (PROMPTS_DIR / filename).read_text(encoding="utf-8")


def build_prompt(request: AnalysisRequest) -> dict[str, str]:
    system_prompt = _load_template("system_prompt.txt")
    user_prompt = _load_template("user_prompt.txt").format(
        repository=request.repository or "unknown",
        branch=request.branch or "unknown",
        parsed_errors="\n".join(request.parsed_errors) if request.parsed_errors else "None",
        stack_traces="\n".join(request.stack_traces) if request.stack_traces else "None",
        critical_warnings=request.critical_warnings,
        latest_commit=request.latest_commit if request.latest_commit else "None",
        changed_files="\n".join(request.changed_files) if request.changed_files else "None",
        commit_message=request.commit_message or "None",
        issue_description=request.issue_description or "None",
    )

    return {
        "system_prompt": system_prompt,
        "user_prompt": user_prompt,
    }
