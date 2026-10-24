from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from bson import ObjectId

from app.core.security import get_current_user
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import TopicProgressUpdate, TopicProgressResponse

router = APIRouter(prefix="/progress", tags=["Syllabus Progress"])

@router.get("/syllabus", response_model=List[TopicProgressResponse])
async def get_syllabus_progress(
    subject_id: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    query = {"user_id": current_user["id"]}
    if subject_id:
        query["subject_id"] = subject_id

    cursor = db.syllabus_progress.find(query)
    docs = await cursor.to_list(length=500)
    return format_docs(docs)

@router.put("/topics/{topic_id}", response_model=TopicProgressResponse)
async def update_topic_progress(
    topic_id: str,
    payload: TopicProgressUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]
    now = datetime.utcnow()

    # Find topic details to extract subject_id
    try:
        topic = await db.syllabus_topics.find_one({"_id": ObjectId(topic_id)})
    except Exception:
        topic = await db.syllabus_topics.find_one({"_id": topic_id})

    subject_id = topic.get("subject_id", "") if topic else ""

    progress_pct = 100 if payload.status in ["completed", "revised"] else (50 if payload.status == "in_progress" else 0)
    
    # Calculate next recommended revision using rule-based spaced repetition (+3 days)
    next_revision = now + timedelta(days=3) if payload.status == "completed" else None

    update_fields = {
        "status": payload.status,
        "progress_percentage": progress_pct,
        "confidence_level": payload.confidence_level or 3,
        "last_studied_at": now,
        "next_recommended_revision_at": next_revision
    }

    if payload.status == "revised":
        update_fields["$inc"] = {"revision_count": 1}

    res = await db.syllabus_progress.find_one_and_update(
        {"user_id": user_id, "topic_id": topic_id},
        {
            "$set": update_fields,
            "$setOnInsert": {
                "user_id": user_id,
                "subject_id": str(subject_id),
                "topic_id": topic_id,
                "revision_count": 1 if payload.status == "revised" else 0
            }
        },
        upsert=True,
        return_document=True
    )

    return format_doc(res)
