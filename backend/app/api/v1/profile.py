from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId

from app.core.security import get_current_user
from app.database.mongodb import get_database, format_doc
from app.models.schemas import StudentProfileBase, StudentProfileUpdate, StudentProfileResponse

router = APIRouter(prefix="/profile", tags=["Student Profile"])

@router.get("", response_model=StudentProfileResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user_id = current_user["id"]
    profile = await db.student_profiles.find_one({"user_id": user_id})

    if not profile:
        # Return blank profile template
        return StudentProfileResponse(
            id="new",
            user_id=user_id,
            education_level_code="",
            available_study_hours_daily=4.0,
            preferred_study_time="evening",
            break_duration_minutes=10,
            study_interval_minutes=50,
            preferred_language="en",
            enrolled_subject_ids=[],
            goals=[]
        )

    return format_doc(profile)

@router.put("", response_model=StudentProfileResponse)
async def update_profile(payload: StudentProfileUpdate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    user_id = current_user["id"]
    now = datetime.utcnow()

    update_data = {k: v for k, v in payload.dict().items() if v is not None}
    update_data["updated_at"] = now

    existing = await db.student_profiles.find_one({"user_id": user_id})

    if not existing:
        update_data["user_id"] = user_id
        update_data["created_at"] = now
        res = await db.student_profiles.insert_one(update_data)
        update_data["_id"] = res.inserted_id
        doc = update_data
    else:
        await db.student_profiles.update_one(
            {"user_id": user_id},
            {"$set": update_data}
        )
        doc = await db.student_profiles.find_one({"user_id": user_id})

    return format_doc(doc)
