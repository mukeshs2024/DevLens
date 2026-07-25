from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.exceptions import DevLensException, devlens_exception_handler
from app.api.routes import analyze, logs, investigation

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For MVP, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(DevLensException, devlens_exception_handler)

# Include routers
app.include_router(analyze.router, prefix=f"{settings.API_V1_STR}/analyze", tags=["Analyze"])
app.include_router(logs.router, prefix=f"{settings.API_V1_STR}/upload-log", tags=["Logs"])
app.include_router(investigation.router, prefix=f"{settings.API_V1_STR}/investigation", tags=["Investigation"])

from fastapi.responses import RedirectResponse

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
