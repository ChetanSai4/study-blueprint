from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId

from app.core.security import require_admin_role
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import (
    AdminOverviewResponse,
    ResourceCreate,
    ResourceResponse,
    VideoCreate,
    VideoResponse,
    AuditLogResponse
)

router = APIRouter(prefix="/admin", tags=["Administration"])

@router.get("/overview", response_model=AdminOverviewResponse)
async def get_admin_overview(admin_user: dict = Depends(require_admin_role)):
    db = get_database()
    total_users = await db.users.count_documents({})
    total_resources = await db.resources.count_documents({})
    total_videos = await db.videos.count_documents({})
    total_study_sessions = await db.study_sessions.count_documents({"status": "completed"})
    
    # Calculate total study hours
    cursor = db.study_sessions.find({"status": "completed"}, {"duration_seconds": 1})
    sessions = await cursor.to_list(length=10000)
    total_secs = sum(s.get("duration_seconds", 0) for s in sessions)
    total_hours = round(total_secs / 3600.0, 1)

    active_plans_count = await db.study_plans.count_documents({"is_active": True})

    return AdminOverviewResponse(
        total_users=total_users,
        total_resources=total_resources,
        total_videos=total_videos,
        total_study_sessions=total_study_sessions,
        total_study_hours=total_hours,
        active_plans_count=active_plans_count
    )

@router.post("/resources", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
async def admin_create_resource(
    payload: ResourceCreate,
    admin_user: dict = Depends(require_admin_role)
):
    db = get_database()
    now = datetime.utcnow()

    doc = payload.dict()
    doc["created_at"] = now
    doc["updated_at"] = now
    doc["download_count"] = 0

    res = await db.resources.insert_one(doc)
    doc["_id"] = res.inserted_id

    # Audit log
    await db.audit_logs.insert_one({
        "admin_user_id": admin_user["id"],
        "admin_email": admin_user["email"],
        "action": "create_resource",
        "entity_type": "resource",
        "entity_id": str(res.inserted_id),
        "details": {"title": payload.title},
        "timestamp": now
    })

    return format_doc(doc)

@router.post("/videos", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
async def admin_create_video(
    payload: VideoCreate,
    admin_user: dict = Depends(require_admin_role)
):
    db = get_database()
    now = datetime.utcnow()

    # Extract YouTube ID
    import re
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*", payload.youtube_url)
    youtube_id = match.group(1) if match else "unknown"

    doc = payload.dict()
    doc["youtube_id"] = youtube_id
    doc["publication_status"] = "published"
    doc["verification_date"] = now
    doc["created_at"] = now

    res = await db.videos.insert_one(doc)
    doc["_id"] = res.inserted_id

    await db.audit_logs.insert_one({
        "admin_user_id": admin_user["id"],
        "admin_email": admin_user["email"],
        "action": "create_video",
        "entity_type": "video",
        "entity_id": str(res.inserted_id),
        "details": {"title": payload.title, "youtube_id": youtube_id},
        "timestamp": now
    })

    return format_doc(doc)

@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def get_audit_logs(admin_user: dict = Depends(require_admin_role)):
    db = get_database()
    cursor = db.audit_logs.find().sort("timestamp", -1).limit(100)
    docs = await cursor.to_list(length=100)
    return format_docs(docs)
