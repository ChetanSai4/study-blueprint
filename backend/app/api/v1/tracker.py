from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from bson import ObjectId

from app.core.security import get_current_user
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import StudySessionCreate, StudySessionResponse
from app.services.tracker_service import log_study_session

router = APIRouter(prefix="/study-sessions", tags=["Precision Study Tracker"])

@router.post("", response_model=StudySessionResponse, status_code=status.HTTP_201_CREATED)
async def create_study_session(
    payload: StudySessionCreate,
    current_user: dict = Depends(get_current_user)
):
    session = await log_study_session(current_user["id"], payload)
    return session

@router.get("", response_model=List[StudySessionResponse])
async def get_study_sessions(
    limit: int = Query(50, ge=1, le=200),
    subject_id: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    query = {"user_id": current_user["id"], "status": "completed"}
    if subject_id:
        query["subject_id"] = subject_id

    cursor = db.study_sessions.find(query).sort("started_at", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return format_docs(docs)

@router.get("/active-check")
async def check_active_session(current_user: dict = Depends(get_current_user)):
    """
    Checks if a session was in-progress (for browser closure recovery).
    """
    db = get_database()
    active = await db.study_sessions.find_one({
        "user_id": current_user["id"],
        "status": "active"
    })
    return {"active_session": format_doc(active)}
