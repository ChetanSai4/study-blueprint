from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from bson import ObjectId

from app.database.mongodb import get_database, format_docs, format_doc
from app.models.schemas import (
    EducationLevelResponse,
    BoardOrUniversityResponse,
    BranchResponse,
    SubjectResponse,
    SyllabusUnitResponse
)

router = APIRouter(prefix="/catalog", tags=["Academic Catalog"])

@router.get("/education-levels", response_model=List[EducationLevelResponse])
async def get_education_levels():
    db = get_database()
    cursor = db.education_levels.find({"is_active": True}).sort("display_order", 1)
    docs = await cursor.to_list(length=100)
    return format_docs(docs)

@router.get("/boards-universities", response_model=List[BoardOrUniversityResponse])
async def get_boards_universities(education_level: Optional[str] = Query(None)):
    db = get_database()
    query = {"is_active": True}
    if education_level:
        query["education_level_code"] = education_level
    cursor = db.boards_and_universities.find(query).sort("short_name", 1)
    docs = await cursor.to_list(length=200)
    return format_docs(docs)

@router.get("/branches", response_model=List[BranchResponse])
async def get_branches(education_level: Optional[str] = Query(None)):
    db = get_database()
    query = {}
    if education_level:
        query["education_level_code"] = education_level
    cursor = db.branches.find(query).sort("name", 1)
    docs = await cursor.to_list(length=200)
    return format_docs(docs)

@router.get("/subjects", response_model=List[SubjectResponse])
async def get_subjects(
    education_level: Optional[str] = Query(None),
    board_or_university: Optional[str] = Query(None),
    branch: Optional[str] = Query(None),
    semester: Optional[int] = Query(None),
    regulation: Optional[str] = Query(None)
):
    db = get_database()
    query = {"is_active": True}
    if education_level:
        query["education_level_code"] = education_level
    if board_or_university:
        query["board_or_university_code"] = board_or_university
    if branch:
        query["branch_code"] = branch
    if semester:
        query["semester"] = semester
    if regulation:
        query["regulation"] = regulation

    cursor = db.subjects.find(query).sort("code", 1)
    docs = await cursor.to_list(length=500)
    return format_docs(docs)

@router.get("/subjects/{subject_id}/units", response_model=List[SyllabusUnitResponse])
async def get_subject_units(subject_id: str):
    db = get_database()
    # Find units
    unit_cursor = db.syllabus_units.find({"subject_id": subject_id}).sort("unit_number", 1)
    unit_docs = await unit_cursor.to_list(length=50)

    # Find topics for each unit
    result = []
    for u in unit_docs:
        u_id = str(u["_id"])
        topic_cursor = db.syllabus_topics.find({"unit_id": u_id}).sort("order", 1)
        topics = await topic_cursor.to_list(length=100)
        u_dict = format_doc(u)
        u_dict["topics"] = format_docs(topics)
        result.append(u_dict)

    return result
