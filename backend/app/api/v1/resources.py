from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status, Depends
from bson import ObjectId

from app.core.security import get_optional_user, get_current_user
from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import ResourceResponse

router = APIRouter(prefix="/resources", tags=["Academic Resources"])

@router.get("", response_model=List[ResourceResponse])
async def get_resources(
    education_level: Optional[str] = Query(None),
    board_or_university: Optional[str] = Query(None),
    branch: Optional[str] = Query(None),
    semester: Optional[int] = Query(None),
    subject_id: Optional[str] = Query(None),
    resource_type: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: Optional[dict] = Depends(get_optional_user)
):
    db = get_database()
    query = {"publication_status": "published"}

    if education_level:
        query["education_level_code"] = education_level
    if board_or_university:
        query["board_or_university_code"] = board_or_university
    if branch:
        query["branch_code"] = branch
    if semester:
        query["semester"] = semester
    if subject_id:
        query["subject_id"] = subject_id
    if resource_type:
        query["resource_type"] = resource_type
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"source_contributor": {"$regex": search, "$options": "i"}}
        ]

    skip = (page - 1) * limit
    cursor = db.resources.find(query).skip(skip).limit(limit).sort("created_at", -1)
    docs = await cursor.to_list(length=limit)

    # Check bookmarks for logged in user
    bookmarked_ids = set()
    if current_user:
        bms = await db.bookmarks.find({
            "user_id": current_user["id"],
            "item_type": "resource"
        }).to_list(length=500)
        bookmarked_ids = {b["item_id"] for b in bms}

    results = []
    for d in docs:
        item = format_doc(d)
        item["is_bookmarked"] = item["id"] in bookmarked_ids
        results.append(item)

    return results

@router.get("/{resource_id}", response_model=ResourceResponse)
async def get_resource_detail(
    resource_id: str,
    current_user: Optional[dict] = Depends(get_optional_user)
):
    db = get_database()
    try:
        doc = await db.resources.find_one({"_id": ObjectId(resource_id)})
    except Exception:
        doc = await db.resources.find_one({"_id": resource_id})

    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")

    res = format_doc(doc)
    res["is_bookmarked"] = False

    if current_user:
        bm = await db.bookmarks.find_one({
            "user_id": current_user["id"],
            "item_type": "resource",
            "item_id": res["id"]
        })
        res["is_bookmarked"] = bool(bm)

    return res

@router.post("/{resource_id}/bookmark")
async def toggle_resource_bookmark(
    resource_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_database()
    user_id = current_user["id"]

    existing = await db.bookmarks.find_one({
        "user_id": user_id,
        "item_type": "resource",
        "item_id": resource_id
    })

    if existing:
        await db.bookmarks.delete_one({"_id": existing["_id"]})
        return {"bookmarked": False}
    else:
        await db.bookmarks.insert_one({
            "user_id": user_id,
            "item_type": "resource",
            "item_id": resource_id
        })
        return {"bookmarked": True}
