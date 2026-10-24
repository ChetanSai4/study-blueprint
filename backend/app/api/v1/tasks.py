from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Depends, Query
from bson import ObjectId

from app.core.security import get_current_user
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["Tasks & Revision"])

@router.get("", response_model=List[TaskResponse])
async def get_tasks(
    status_filter: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    query = {"user_id": current_user["id"]}
    if status_filter:
        query["status"] = status_filter
    if priority:
        query["priority"] = priority

    cursor = db.tasks.find(query).sort("due_date", 1)
    docs = await cursor.to_list(length=200)

    results = []
    for d in docs:
        item = format_doc(d)
        if item.get("subject_id") and not item.get("subject_name"):
            # enrich subject name
            try:
                sub = await db.subjects.find_one({"_id": ObjectId(item["subject_id"])})
                if sub:
                    item["subject_name"] = sub.get("name")
            except Exception:
                pass
        results.append(item)

    return results

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    payload: TaskCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]
    now = datetime.utcnow()

    subject_name = None
    if payload.subject_id:
        try:
            sub = await db.subjects.find_one({"_id": ObjectId(payload.subject_id)})
            if sub:
                subject_name = sub.get("name")
        except Exception:
            pass

    task_doc = {
        "user_id": user_id,
        "title": payload.title,
        "description": payload.description,
        "subject_id": payload.subject_id,
        "subject_name": subject_name,
        "topic_id": payload.topic_id,
        "task_type": payload.task_type,
        "priority": payload.priority,
        "status": "pending",
        "due_date": payload.due_date,
        "estimated_minutes": payload.estimated_minutes,
        "completed_at": None,
        "created_at": now
    }

    res = await db.tasks.insert_one(task_doc)
    task_doc["_id"] = res.inserted_id

    return format_doc(task_doc)

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: str,
    payload: TaskUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]

    try:
        query = {"_id": ObjectId(task_id), "user_id": user_id}
    except Exception:
        query = {"_id": task_id, "user_id": user_id}

    existing = await db.tasks.find_one(query)
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    update_fields = {k: v for k, v in payload.dict().items() if v is not None}
    if payload.status == "completed":
        update_fields["completed_at"] = datetime.utcnow()
    elif payload.status == "pending":
        update_fields["completed_at"] = None

    await db.tasks.update_one(query, {"$set": update_fields})
    updated = await db.tasks.find_one(query)

    return format_doc(updated)

@router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]

    try:
        query = {"_id": ObjectId(task_id), "user_id": user_id}
    except Exception:
        query = {"_id": task_id, "user_id": user_id}

    res = await db.tasks.delete_one(query)
    if res.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    return {"message": "Task deleted successfully"}
