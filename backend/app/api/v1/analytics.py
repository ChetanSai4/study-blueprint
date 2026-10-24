from fastapi import APIRouter, Depends

from app.core.security import get_current_user
from app.models.schemas import AnalyticsDashboardResponse
from app.services.analytics_service import get_dashboard_analytics

router = APIRouter(prefix="/analytics", tags=["Analytics Dashboard"])

@router.get("/dashboard", response_model=AnalyticsDashboardResponse)
async def get_analytics_summary(current_user: dict = Depends(get_current_user)):
    return await get_dashboard_analytics(current_user["id"])
