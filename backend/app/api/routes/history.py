from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.storage_service import storage

router = APIRouter()

@router.get("/")
async def get_history():
    return storage.get_history()

@router.get("/{history_id}")
async def get_history_by_id(history_id: str):
    item = storage.get_history_by_id(history_id)
    if not item:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return item

@router.delete("/{history_id}")
async def delete_history(history_id: str):
    success = storage.delete_history(history_id)
    if not success:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return {"status": "success"}
