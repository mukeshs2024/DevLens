from fastapi import Request
from fastapi.responses import JSONResponse

class DevLensException(Exception):
    """Base exception for DevLens backend."""
    def __init__(self, message: str, status_code: int = 500, error_code: str = "internal_error"):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        super().__init__(self.message)

class GitHubAPIError(DevLensException):
    def __init__(self, message: str, status_code: int = 502):
        super().__init__(message, status_code, "github_api_error")

class LogParsingError(DevLensException):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message, status_code, "log_parsing_error")

async def devlens_exception_handler(request: Request, exc: DevLensException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_code,
            "message": exc.message,
            "status_code": exc.status_code
        }
    )
