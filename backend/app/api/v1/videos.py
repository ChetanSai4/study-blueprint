from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status, Depends
from bson import ObjectId

from app.core.security import get_optional_user, get_current_user
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import VideoResponse

router = APIRouter(prefix="/videos", tags=["YouTube Learning Library"])

@router.get("", response_model=List[VideoResponse])
async def get_videos(
    education_level: Optional[str] = Query(None),
    subject_id: Optional[str] = Query(None),
    unit_id: Optional[str] = Query(None),
    topic_id: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100),
    current_user: Optional[dict] = Depends(get_optional_user)
):
    db = get_database()
    query = {"publication_status": "published"}

    if education_level:
        query["education_level_code"] = education_level
    if subject_id:
        query["subject_id"] = subject_id
    if unit_id:
        query["unit_id"] = unit_id
    if topic_id:
        query["topic_id"] = topic_id
    if language:
        query["language"] = language
    if difficulty:
        query["difficulty_level"] = difficulty

    skip = (page - 1) * limit
    cursor = db.videos.find(query).skip(skip).limit(limit).sort("created_at", -1)
    docs = await cursor.to_list(length=limit)

    watched_ids = set()
    bookmarked_ids = set()
    if current_user:
        # Check watched
        w_docs = await db.user_video_progress.find({
            "user_id": current_user["id"],
            "watched": True
        }).to_list(length=500)
        watched_ids = {w["video_id"] for w in w_docs}

        # Check bookmarks
        bms = await db.bookmarks.find({
            "user_id": current_user["id"],
            "item_type": "video"
        }).to_list(length=500)
        bookmarked_ids = {b["item_id"] for b in bms}

    results = []
    for d in docs:
        item = format_doc(d)
        item["is_watched"] = item["id"] in watched_ids
        item["is_bookmarked"] = item["id"] in bookmarked_ids
        results.append(item)

    return results

@router.post("/{video_id}/progress")
async def toggle_video_watched_status(
    video_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]

    existing = await db.user_video_progress.find_one({
        "user_id": user_id,
        "video_id": video_id
    })

    if existing and existing.get("watched"):
        await db.user_video_progress.update_one(
            {"_id": existing["_id"]},
            {"$set": {"watched": False}}
        )
        return {"watched": False}
    else:
        await db.user_video_progress.update_one(
            {"user_id": user_id, "video_id": video_id},
            {"$set": {"watched": True}},
            upsert=True
        )
        return {"watched": True}

@router.post("/{video_id}/bookmark")
async def toggle_video_bookmark(
    video_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]

    existing = await db.bookmarks.find_one({
        "user_id": user_id,
        "item_type": "video",
        "item_id": video_id
    })

    if existing:
        await db.bookmarks.delete_one({"_id": existing["_id"]})
        return {"bookmarked": False}
    else:
        await db.bookmarks.insert_one({
            "user_id": user_id,
            "item_type": "video",
            "item_id": video_id
        })
        return {"bookmarked": True}
