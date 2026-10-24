from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId

from app.core.security import get_current_user
from app.database.mongodb import get_database, format_doc
from app.models.schemas import (
    GenerateTimetableRequest,
    StudyPlanResponse,
    TimetableSessionAllocation
)
from app.services.timetable_service import generate_deterministic_timetable

router = APIRouter(prefix="/study-plans", tags=["Study Planner & Timetable"])

@router.get("/current", response_model=StudyPlanResponse)
async def get_current_study_plan(current_user: dict = Depends(get_current_user)):
    db = get_database()
    user_id = current_user["id"]
    plan = await db.study_plans.find_one({"user_id": user_id, "is_active": True})

    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active study plan found."
        )

    return format_doc(plan)

@router.post("/generate", response_model=StudyPlanResponse)
async def generate_new_timetable(
    payload: GenerateTimetableRequest,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]
    profile = await db.student_profiles.find_one({"user_id": user_id})

    target_subject_ids = payload.subject_ids
    if not target_subject_ids and profile:
        target_subject_ids = profile.get("enrolled_subject_ids", [])

    subjects = []
    if target_subject_ids:
        for s_id in target_subject_ids:
            try:
                s = await db.subjects.find_one({"_id": ObjectId(s_id)})
            except Exception:
                s = await db.subjects.find_one({"_id": s_id})
            if s:
                subjects.append(s)

    if payload.custom_subjects:
        for idx, cs in enumerate(payload.custom_subjects):
            subjects.append({
                "_id": f"custom_{idx}",
                "id": f"custom_{idx}",
                "name": cs.get("name", "Custom Subject"),
                "code": cs.get("code", "SUB")
            })

    if not subjects:
        cursor = db.subjects.find({"is_active": True}).limit(4)
        subjects = await cursor.to_list(length=4)

    priorities = payload.subject_priorities or (profile.get("subject_priorities", {}) if profile else {})

    allocations = generate_deterministic_timetable(
        available_daily_minutes=payload.available_daily_minutes,
        break_duration_minutes=payload.break_duration_minutes,
        study_interval_minutes=payload.study_interval_minutes,
        subjects=subjects,
        subject_priorities=priorities
    )

    now = datetime.utcnow()
    plan_doc = {
        "user_id": user_id,
        "title": "Generated Custom Timetable",
        "daily_target_minutes": payload.available_daily_minutes,
        "break_duration_minutes": payload.break_duration_minutes,
        "study_interval_minutes": payload.study_interval_minutes,
        "allocations": [a.dict() for a in allocations],
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }

    # Deactivate existing plans
    await db.study_plans.update_many({"user_id": user_id}, {"$set": {"is_active": False}})

    res = await db.study_plans.insert_one(plan_doc)
    plan_doc["_id"] = res.inserted_id

    return format_doc(plan_doc)

@router.delete("/current")
async def delete_current_plan(current_user: dict = Depends(get_current_user)):
    """
    Deletes / resets the current timetable so the student can create a fresh one.
    """
    db = get_database()
    user_id = current_user["id"]
    await db.study_plans.delete_many({"user_id": user_id})
    return {"message": "Timetable plan deleted successfully."}

@router.put("/current", response_model=StudyPlanResponse)
async def save_custom_allocations(
    allocations: List[TimetableSessionAllocation],
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]
    now = datetime.utcnow()

    # Recalculate target minutes based on sum of study allocations
    study_mins = sum(a.planned_minutes for a in allocations if not a.is_break)

    existing = await db.study_plans.find_one({"user_id": user_id, "is_active": True})
    if existing:
        await db.study_plans.update_one(
            {"_id": existing["_id"]},
            {
                "$set": {
                    "allocations": [a.dict() for a in allocations],
                    "daily_target_minutes": study_mins,
                    "updated_at": now
                }
            }
        )
        updated = await db.study_plans.find_one({"_id": existing["_id"]})
        return format_doc(updated)
    else:
        new_plan = {
            "user_id": user_id,
            "title": "Customized Timetable",
            "daily_target_minutes": study_mins,
            "break_duration_minutes": 10,
            "study_interval_minutes": 50,
            "allocations": [a.dict() for a in allocations],
            "is_active": True,
            "created_at": now,
            "updated_at": now
        }
        res = await db.study_plans.insert_one(new_plan)
        new_plan["_id"] = res.inserted_id
        return format_doc(new_plan)
