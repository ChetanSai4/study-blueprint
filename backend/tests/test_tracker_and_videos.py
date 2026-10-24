import pytest
from datetime import datetime, timedelta
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_precision_tracker_session_logging(async_client: AsyncClient):
    # 1. Login
    login_resp = await async_client.post("/api/v1/auth/demo-login", json={"role": "student"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get subjects to log a session for Data Structures
    sub_resp = await async_client.get("/api/v1/catalog/subjects?branch=cse", headers=headers)
    assert sub_resp.status_code == 200
    subjects = sub_resp.json()
    assert len(subjects) > 0
    ds_sub = subjects[0]

    # 3. Create a completed study session: 60 minutes total, 10 minutes paused = 50 mins (3000 seconds) net active
    now = datetime.utcnow()
    started = now - timedelta(minutes=60)
    session_payload = {
        "subject_id": ds_sub["id"],
        "task_description": "Binary Tree Traversals practice and recursion tree analysis",
        "started_at": started.isoformat(),
        "ended_at": now.isoformat(),
        "duration_seconds": 3000,
        "paused_duration_seconds": 600,
        "session_type": "timer",
        "session_notes": "Mastered Inorder and Postorder recursive traversal"
    }

    create_resp = await async_client.post("/api/v1/study-sessions", json=session_payload, headers=headers)
    assert create_resp.status_code == 201
    created = create_resp.json()
    assert created["duration_seconds"] == 3000
    assert created["paused_duration_seconds"] == 600
    assert created["status"] == "completed"

    # 4. Verify session appears in recent sessions list
    list_resp = await async_client.get("/api/v1/study-sessions", headers=headers)
    assert list_resp.status_code == 200
    sessions = list_resp.json()
    assert len(sessions) >= 1
    assert sessions[0]["task_description"] == "Binary Tree Traversals practice and recursion tree analysis"

    # 5. Verify session updates analytics dashboard
    analytics_resp = await async_client.get("/api/v1/analytics/dashboard", headers=headers)
    assert analytics_resp.status_code == 200
    analytics = analytics_resp.json()
    assert analytics["today_actual_minutes"] >= 50
    assert analytics["active_streak_days"] >= 1

@pytest.mark.asyncio
async def test_curated_youtube_videos_and_progress(async_client: AsyncClient):
    login_resp = await async_client.post("/api/v1/auth/demo-login", json={"role": "student"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Fetch videos
    video_resp = await async_client.get("/api/v1/videos", headers=headers)
    assert video_resp.status_code == 200
    videos = video_resp.json()
    assert len(videos) >= 5

    # Check that real verified channels exist (Abdul Bari, Neso Academy)
    channels = [v["channel_name"] for v in videos]
    assert "Abdul Bari" in channels or "Neso Academy" in channels

    # Toggle watched status
    first_vid = videos[0]
    watch_resp = await async_client.post(f"/api/v1/videos/{first_vid['id']}/progress", headers=headers)
    assert watch_resp.status_code == 200
    assert watch_resp.json()["watched"] is True

    # Toggle bookmark
    bm_resp = await async_client.post(f"/api/v1/videos/{first_vid['id']}/bookmark", headers=headers)
    assert bm_resp.status_code == 200
    assert bm_resp.json()["bookmarked"] is True
