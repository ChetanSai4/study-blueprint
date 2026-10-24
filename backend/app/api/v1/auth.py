from datetime import datetime
from fastapi import APIRouter, Response, Request, HTTPException, status, Depends
from bson import ObjectId

from app.core.config import settings
from app.core.security import (
    create_session_token,
    verify_google_id_token,
    get_current_user
)
from app.database.mongodb import get_database, format_doc
from app.models.schemas import GoogleAuthRequest, DemoAuthRequest, AuthResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.get("/google/config")
async def get_google_config():
    return {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "is_configured": bool(settings.GOOGLE_CLIENT_ID)
    }

@router.post("/google", response_model=AuthResponse)
async def google_sign_in(payload: GoogleAuthRequest, response: Response):
    id_info = verify_google_id_token(payload.credential)
    google_sub = id_info.get("sub")
    email = id_info.get("email", "").lower().strip()
    display_name = id_info.get("name", "Student")
    avatar_url = id_info.get("picture")

    if not google_sub or not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google token payload missing subject or email identity."
        )

    db = get_database()
    user = await db.users.find_one({"google_sub": google_sub})

    now = datetime.utcnow()
    is_onboarded = False

    if not user:
        # Check if email exists to prevent duplicates
        user = await db.users.find_one({"email": email})
        if user:
            # Associate google_sub
            await db.users.update_one(
                {"_id": user["_id"]},
                {"$set": {"google_sub": google_sub, "last_login_at": now}}
            )
        else:
            # Create fresh student user
            new_user = {
                "google_sub": google_sub,
                "email": email,
                "display_name": display_name,
                "avatar_url": avatar_url,
                "role": "student",
                "account_status": "active",
                "created_at": now,
                "updated_at": now,
                "last_login_at": now
            }
            res = await db.users.insert_one(new_user)
            new_user["_id"] = res.inserted_id
            user = new_user
    else:
        # Update last login
        await db.users.update_one({"_id": user["_id"]}, {"$set": {"last_login_at": now}})

    user_id = str(user["_id"])

    # Check onboarding status
    profile = await db.student_profiles.find_one({"user_id": user_id})
    if profile and profile.get("education_level_code"):
        is_onboarded = True

    # Generate session JWT
    token = create_session_token(user_id=user_id, role=user.get("role", "student"))

    # Set secure HTTP-only cookie
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        max_age=settings.SESSION_EXPIRE_DAYS * 86400,
        samesite="lax",
        secure=settings.ENVIRONMENT == "production"
    )

    user_resp = UserResponse(
        id=user_id,
        email=user["email"],
        display_name=user["display_name"],
        avatar_url=user.get("avatar_url"),
        role=user.get("role", "student"),
        account_status=user.get("account_status", "active"),
        is_onboarded=is_onboarded,
        created_at=user.get("created_at"),
        last_login_at=now
    )

    return AuthResponse(user=user_resp, access_token=token)

@router.post("/demo-login", response_model=AuthResponse)
async def demo_login(payload: DemoAuthRequest, response: Response):
    """
    Evaluation helper for testing student and administrator roles seamlessly.
    """
    db = get_database()
    role = "admin" if payload.role == "admin" else "student"
    email = f"demo.{role}@studyblueprint.in"
    name = "Demo Administrator" if role == "admin" else "Demo Engineering Student"

    user = await db.users.find_one({"email": email})
    now = datetime.utcnow()

    if not user:
        new_user = {
            "google_sub": f"demo_sub_{role}",
            "email": email,
            "display_name": name,
            "avatar_url": None,
            "role": role,
            "account_status": "active",
            "created_at": now,
            "updated_at": now,
            "last_login_at": now
        }
        res = await db.users.insert_one(new_user)
        new_user["_id"] = res.inserted_id
        user = new_user
    else:
        await db.users.update_one({"_id": user["_id"]}, {"$set": {"last_login_at": now}})

    user_id = str(user["_id"])
    token = create_session_token(user_id=user_id, role=role)

    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        max_age=settings.SESSION_EXPIRE_DAYS * 86400,
        samesite="lax",
        secure=settings.ENVIRONMENT == "production"
    )

    profile = await db.student_profiles.find_one({"user_id": user_id})
    is_onboarded = bool(profile and profile.get("education_level_code"))

    user_resp = UserResponse(
        id=user_id,
        email=user["email"],
        display_name=user["display_name"],
        avatar_url=user.get("avatar_url"),
        role=role,
        account_status="active",
        is_onboarded=is_onboarded,
        created_at=user.get("created_at"),
        last_login_at=now
    )

    return AuthResponse(user=user_resp, access_token=token)

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="session_token")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    db = get_database()
    profile = await db.student_profiles.find_one({"user_id": current_user["id"]})
    is_onboarded = bool(profile and profile.get("education_level_code"))

    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        display_name=current_user["display_name"],
        avatar_url=current_user.get("avatar_url"),
        role=current_user.get("role", "student"),
        account_status=current_user.get("account_status", "active"),
        is_onboarded=is_onboarded,
        created_at=current_user.get("created_at"),
        last_login_at=current_user.get("last_login_at")
    )
