from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DevLens Backend"
    API_V1_STR: str = "/api/v1"
    GITHUB_TOKEN: str
    AI_SERVICE_URL: str = "http://127.0.0.1:8001/ai/analyze"
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"

settings = Settings()
