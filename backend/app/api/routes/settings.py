from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services.storage_service import storage

router = APIRouter()

@router.get("/")
async def get_settings():
    return storage.get_settings()

@router.put("/")
async def update_settings(settings: Dict[str, Any]):
    storage.update_settings(settings)
    return storage.get_settings()
