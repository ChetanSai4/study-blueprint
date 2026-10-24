from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import jwt
from fastapi import Request, HTTPException, status, Depends
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.core.config import settings

def create_session_token(user_id: str, role: str = "student", expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.SESSION_EXPIRE_DAYS)
    
    payload = {
        "sub": user_id,
        "role": role,
        "exp": expire,
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, settings.APP_SESSION_SECRET, algorithm=settings.SESSION_ALGORITHM)

def decode_session_token(token: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, settings.APP_SESSION_SECRET, algorithms=[settings.SESSION_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session token")

def verify_google_id_token(token_string: str) -> Dict[str, Any]:
    """
    Verifies a Google Identity Services token against Google's public certificates.
    If GOOGLE_CLIENT_ID is not configured in dev, returns an error or parsed token.
    """
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google Client ID is not configured on the server."
        )
    try:
        id_info = id_token.verify_oauth2_token(
            token_string,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        return id_info
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google authentication failed: {str(e)}"
        )

async def get_current_user(request: Request):
    token = None
    # 1. Check HTTP-only cookie
    if "session_token" in request.cookies:
        token = request.cookies.get("session_token")
    # 2. Check Authorization header as fallback
    elif "Authorization" in request.headers:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header[7:]

    if not token:
        # Transparent guest student session — zero login wall
        from app.database.mongodb import get_database
        from datetime import datetime
        db = get_database()
        guest = await db.users.find_one({"email": "student@studyblueprint.in"})
        if not guest:
            new_guest = {
                "google_sub": "guest_student_default",
                "email": "student@studyblueprint.in",
                "display_name": "Student",
                "avatar_url": None,
                "role": "student",
                "account_status": "active",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "last_login_at": datetime.utcnow()
            }
            res = await db.users.insert_one(new_guest)
            new_guest["_id"] = res.inserted_id
            guest = new_guest
        guest["id"] = str(guest["_id"])
        return guest
    
    payload = decode_session_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    from app.database.mongodb import get_database
    db = get_database()
    from bson import ObjectId
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        user = await db.users.find_one({"_id": user_id})

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User account not found")
    
    if user.get("account_status") != "active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account suspended or inactive")

    user["id"] = str(user["_id"])
    return user

async def get_optional_user(request: Request) -> Optional[Dict[str, Any]]:
    try:
        return await get_current_user(request)
    except HTTPException:
        return None

async def require_admin_role(current_user: Dict[str, Any] = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges required for this operation."
        )
    return current_user
