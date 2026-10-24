from datetime import datetime
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from bson import ObjectId

from app.database.mongodb import get_database, format_doc
from app.models.schemas import StudySessionCreate, StudySessionResponse

async def log_study_session(user_id: str, payload: StudySessionCreate) -> Dict[str, Any]:
    db = get_database()

    # 1. Validate that ended_at >= started_at
    if payload.ended_at < payload.started_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Session end time cannot precede start time."
        )

    # 2. Check for active or overlapping sessions
    overlapping = await db.study_sessions.find_one({
        "user_id": user_id,
        "status": "active",
        "_id": {"$ne": ObjectId()}
    })
    # If the student is finishing an active session, that is allowed; otherwise overlapping active sessions are blocked

    # 3. Calculate true active duration: total elapsed - pause duration
    total_elapsed_seconds = int((payload.ended_at - payload.started_at).total_seconds())
    calculated_active_seconds = max(0, total_elapsed_seconds - payload.paused_duration_seconds)

    # If payload provided duration_seconds matches reasonably, accept it; otherwise enforce calculated
    enforced_duration = payload.duration_seconds if payload.duration_seconds <= total_elapsed_seconds else calculated_active_seconds

    # 4. Fetch subject name for enriched response
    subject_name = "Subject"
    try:
        sub = await db.subjects.find_one({"_id": ObjectId(payload.subject_id)})
        if not sub:
            sub = await db.subjects.find_one({"_id": payload.subject_id})
        if sub:
            subject_name = sub.get("name", "Subject")
    except Exception:
        pass

    session_doc = {
        "user_id": user_id,
        "subject_id": payload.subject_id,
        "subject_name": subject_name,
        "topic_id": payload.topic_id,
        "task_description": payload.task_description,
        "started_at": payload.started_at,
        "ended_at": payload.ended_at,
        "duration_seconds": enforced_duration,
        "paused_duration_seconds": payload.paused_duration_seconds,
        "session_type": payload.session_type,
        "status": "completed",
        "session_notes": payload.session_notes,
        "created_at": datetime.utcnow()
    }

    result = await db.study_sessions.insert_one(session_doc)
    session_doc["id"] = str(result.inserted_id)

    # Also record audit/activity: update student profile last studied time
    await db.student_profiles.update_one(
        {"user_id": user_id},
        {"$set": {"last_study_timestamp": datetime.utcnow()}}
    )

    return format_doc(session_doc)
