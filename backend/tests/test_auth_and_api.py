import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_health_check(async_client: AsyncClient):
    response = await async_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "Study Blueprint"

@pytest.mark.asyncio
async def test_catalog_education_levels(async_client: AsyncClient):
    response = await async_client.get("/api/v1/catalog/education-levels")
    assert response.status_code == 200
    levels = response.json()
    assert len(levels) >= 5
    codes = [l["code"] for l in levels]
    assert "btech" in codes
    assert "intermediate" in codes
    assert "school" in codes

@pytest.mark.asyncio
async def test_strict_academic_filtering(async_client: AsyncClient):
    # Fetch BTech CSE subjects
    response = await async_client.get("/api/v1/catalog/subjects?education_level=btech&branch=cse&semester=1")
    assert response.status_code == 200
    subjects = response.json()
    assert len(subjects) > 0
    for s in subjects:
        assert s["education_level_code"] == "btech"
        assert s["branch_code"] == "cse"
        assert s["semester"] == 1

@pytest.mark.asyncio
async def test_demo_auth_and_protected_profile(async_client: AsyncClient):
    # 1. Login as demo student
    login_resp = await async_client.post("/api/v1/auth/demo-login", json={"role": "student"})
    assert login_resp.status_code == 200
    data = login_resp.json()
    token = data["access_token"]
    assert token is not None
    assert data["user"]["role"] == "student"

    # 2. Access me endpoint
    headers = {"Authorization": f"Bearer {token}"}
    me_resp = await async_client.get("/api/v1/auth/me", headers=headers)
    assert me_resp.status_code == 200
    me_data = me_resp.json()
    assert me_data["email"] == "demo.student@studyblueprint.in"

    # 3. Update student profile
    profile_update = {
        "education_level_code": "btech",
        "board_or_university_code": "jntuh",
        "branch_code": "cse",
        "academic_year": 2,
        "semester": 1,
        "regulation": "R22",
        "available_study_hours_daily": 4.0
    }
    put_resp = await async_client.put("/api/v1/profile", json=profile_update, headers=headers)
    assert put_resp.status_code == 200
    p_data = put_resp.json()
    assert p_data["education_level_code"] == "btech"
    assert p_data["available_study_hours_daily"] == 4.0

@pytest.mark.asyncio
async def test_admin_rbac_protection(async_client: AsyncClient):
    # 1. Student should receive 403 on admin routes
    student_login = await async_client.post("/api/v1/auth/demo-login", json={"role": "student"})
    student_token = student_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {student_token}"}

    denied_resp = await async_client.get("/api/v1/admin/overview", headers=headers)
    assert denied_resp.status_code == 403

    # 2. Admin should succeed
    admin_login = await async_client.post("/api/v1/auth/demo-login", json={"role": "admin"})
    admin_token = admin_login.json()["access_token"]
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    allowed_resp = await async_client.get("/api/v1/admin/overview", headers=admin_headers)
    assert allowed_resp.status_code == 200
    stats = allowed_resp.json()
    assert "total_users" in stats
    assert "total_resources" in stats
