from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from bson import ObjectId

from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import CareerPathResponse, CareerRoleResponse

router = APIRouter(prefix="/careers", tags=["Career Planning & Guidance"])

@router.get("/pathways", response_model=List[CareerPathResponse])
async def get_career_pathways(
    entry_level: Optional[str] = Query(None),
    target_level: Optional[str] = Query(None)
):
    db = get_database()
    query = {}
    if entry_level:
        query["entry_level_code"] = entry_level
    if target_level:
        query["target_education_level_code"] = target_level

    cursor = db.career_paths.find(query).sort("display_order", 1)
    docs = await cursor.to_list(length=50)
    return format_docs(docs)

@router.get("/roles", response_model=List[CareerRoleResponse])
async def get_career_roles(branch_code: Optional[str] = Query(None)):
    db = get_database()
    query = {"is_active": True}
    if branch_code:
        query["branch_codes"] = branch_code

    cursor = db.career_roles.find(query).sort("title", 1)
    docs = await cursor.to_list(length=50)
    return format_docs(docs)

@router.get("/roles/{role_code}", response_model=CareerRoleResponse)
async def get_career_role_detail(role_code: str):
    db = get_database()
    doc = await db.career_roles.find_one({"role_code": role_code})
    if not doc:
        try:
            doc = await db.career_roles.find_one({"_id": ObjectId(role_code)})
        except Exception:
            pass

    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Career role not found")

    return format_doc(doc)
