from fastapi import FastAPI
from app.core.config import settings
from app.core.exceptions import DevLensException, devlens_exception_handler
from app.api.routes import analyze, logs, investigation

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Exception handlers
app.add_exception_handler(DevLensException, devlens_exception_handler)

# Include routers
app.include_router(analyze.router, prefix=f"{settings.API_V1_STR}/analyze", tags=["Analyze"])
app.include_router(logs.router, prefix=f"{settings.API_V1_STR}/upload-log", tags=["Logs"])
app.include_router(investigation.router, prefix=f"{settings.API_V1_STR}/investigation", tags=["Investigation"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}
