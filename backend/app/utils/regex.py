import re

# Pre-compiled regex patterns for performance
ERROR_PATTERN = re.compile(r"(?i)\b(error|exception|fatal|traceback)\b")
TIMESTAMP_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}")
PYTHON_TRACEBACK_START = re.compile(r"^Traceback \(most recent call last\):")
