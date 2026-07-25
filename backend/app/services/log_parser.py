import re
from typing import List, Dict, Any
from app.models.schemas.responses import ParsedError

# Keywords for generic errors and warnings
ERROR_KEYWORDS = re.compile(
    r"(?i)\b(error|exception|moduleNotFoundError|importerror|syntaxerror|typeerror|valueerror|referenceerror|cannot find module|build failed|failed|panic:|segmentation fault|exit code)\b"
)
CRITICAL_KEYWORDS = re.compile(r"(?i)\b(critical|fatal|panic|build failed|exit code [^0])\b")

# Stack trace starts
TRACEBACK_STARTS = [
    re.compile(r"^Traceback \(most recent call last\):"),  # Python
    re.compile(r"^\s*at .+\(.+\)"),                        # Node/Java (approx)
    re.compile(r"^goroutine \d+ \["),                      # Go
    re.compile(r"^thread '.+' panicked at"),               # Rust
    re.compile(r"^\s*Exception in thread \".+\""),         # Java
    re.compile(r"^\s*---> System\.")                       # .NET
]

class LogParserService:
    """Service to parse raw logs and extract meaningful errors and stack traces."""

    def parse_logs(self, log_content: str) -> Dict[str, Any]:
        """
        Parses the uploaded log content to detect errors, critical warnings, and stack traces.
        """
        if not log_content or not log_content.strip():
            from app.core.exceptions import DevLensException
            raise DevLensException("Log content cannot be empty", status_code=400, error_code="invalid_request")

        lines = log_content.splitlines()
        parsed_errors: List[ParsedError] = []
        stack_traces: List[str] = []
        critical_warnings = 0
        
        seen_errors = set()
        
        in_traceback = False
        current_traceback = []

        for line_idx, line in enumerate(lines):
            line_num = line_idx + 1
            clean_line = line.strip()

            if not clean_line:
                if in_traceback:
                    # An empty line might end a traceback in some languages, but let's keep accumulating
                    current_traceback.append(line)
                continue

            # Check for critical warnings
            if CRITICAL_KEYWORDS.search(clean_line):
                critical_warnings += 1

            # Check for generic errors
            if ERROR_KEYWORDS.search(clean_line):
                if clean_line not in seen_errors:
                    seen_errors.add(clean_line)
                    # Simple heuristic for type and severity
                    err_type = "Error"
                    if "exception" in clean_line.lower():
                        err_type = "Exception"
                    
                    severity = "High" if "fatal" in clean_line.lower() or "critical" in clean_line.lower() else "Medium"
                    
                    parsed_errors.append(
                        ParsedError(
                            line=line_num,
                            message=clean_line[:500], # truncate very long lines
                            type=err_type,
                            severity=severity
                        )
                    )

            # Check for stack trace starts
            is_traceback_start = any(pattern.search(clean_line) for pattern in TRACEBACK_STARTS)
            
            if is_traceback_start and not in_traceback:
                in_traceback = True
                current_traceback.append(line)
            elif in_traceback:
                # Heuristic to detect end of traceback (starts with non-whitespace and isn't another trace line)
                if not line.startswith(" ") and not line.startswith("\t") and not is_traceback_start:
                    if current_traceback:
                        stack_traces.append("\n".join(current_traceback))
                        current_traceback = []
                    in_traceback = False
                else:
                    current_traceback.append(line)

        # Catch trailing traceback
        if in_traceback and current_traceback:
            stack_traces.append("\n".join(current_traceback))

        return {
            "parsed_errors": parsed_errors,
            "stack_traces": stack_traces,
            "critical_warnings": critical_warnings
        }
