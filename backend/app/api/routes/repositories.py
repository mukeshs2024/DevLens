from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.storage_service import storage
import uuid

router = APIRouter()

@router.get("/")
async def get_repositories():
    return storage.get_repositories()

@router.post("/")
async def add_repository(repo: Dict[str, Any]):
    repo["id"] = str(uuid.uuid4())
    storage.add_repository(repo)
    return repo

@router.delete("/{repo_id}")
async def delete_repository(repo_id: str):
    success = storage.delete_repository(repo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Repository not found")
    return {"status": "success"}
