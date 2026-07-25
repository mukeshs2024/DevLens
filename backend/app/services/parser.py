from app.utils.regex import ERROR_PATTERN, PYTHON_TRACEBACK_START
from app.core.exceptions import LogParsingError

class LogParserService:
    def __init__(self):
        pass

    def parse_logs(self, log_content: str):
        if not log_content or not log_content.strip():
            raise LogParsingError("Log content cannot be empty.")
            
        lines = log_content.splitlines()
        parsed_errors = []
        stack_traces = []
        critical_warnings = 0
        
        in_traceback = False
        current_traceback = []

        for line in lines:
            # Basic error finding
            if ERROR_PATTERN.search(line):
                parsed_errors.append({"message": line.strip()})
                if "critical" in line.lower() or "fatal" in line.lower():
                    critical_warnings += 1
            
            # Stack trace extraction (Python example)
            if PYTHON_TRACEBACK_START.search(line):
                in_traceback = True
                current_traceback.append(line)
            elif in_traceback:
                if line.startswith(" ") or line.startswith("\t"):
                    current_traceback.append(line)
                else:
                    # End of traceback, but include the actual exception line
                    if current_traceback:
                        current_traceback.append(line)
                        stack_traces.append("\n".join(current_traceback))
                        current_traceback = []
                    in_traceback = False

        if in_traceback and current_traceback:
            stack_traces.append("\n".join(current_traceback))

        return {
            "parsed_errors": parsed_errors,
            "stack_traces": stack_traces,
            "critical_warnings": critical_warnings
        }
