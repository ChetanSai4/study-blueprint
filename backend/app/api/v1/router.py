from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.profile import router as profile_router
from app.api.v1.catalog import router as catalog_router
from app.api.v1.resources import router as resources_router
from app.api.v1.videos import router as videos_router
from app.api.v1.timetable import router as timetable_router
from app.api.v1.tracker import router as tracker_router
from app.api.v1.progress import router as progress_router
from app.api.v1.tasks import router as tasks_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.careers import router as careers_router
from app.api.v1.admin import router as admin_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(profile_router)
api_router.include_router(catalog_router)
api_router.include_router(resources_router)
api_router.include_router(videos_router)
api_router.include_router(timetable_router)
api_router.include_router(tracker_router)
api_router.include_router(progress_router)
api_router.include_router(tasks_router)
api_router.include_router(analytics_router)
api_router.include_router(careers_router)
api_router.include_router(admin_router)
