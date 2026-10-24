from datetime import datetime, timedelta, time
from typing import Dict, Any, List
from bson import ObjectId

from app.database.mongodb import get_database
from app.models.schemas import AnalyticsDashboardResponse, DailyStudyPoint, SubjectProgressSummary

async def get_dashboard_analytics(user_id: str) -> AnalyticsDashboardResponse:
    db = get_database()
    now = datetime.utcnow()
    start_of_today = datetime.combine(now.date(), time.min)
    seven_days_ago = start_of_today - timedelta(days=6)

    # 1. Fetch user's study sessions in the last 7 days
    cursor = db.study_sessions.find({
        "user_id": user_id,
        "status": "completed",
        "started_at": {"$gte": seven_days_ago}
    })
    recent_sessions = await cursor.to_list(length=1000)

    # 2. Compute Today's Actual Minutes
    today_actual_seconds = sum(
        s.get("duration_seconds", 0) for s in recent_sessions
        if s.get("started_at") >= start_of_today
    )
    today_actual_minutes = today_actual_seconds // 60

    # 3. Compute Weekly Actual Minutes
    weekly_actual_seconds = sum(s.get("duration_seconds", 0) for s in recent_sessions)
    weekly_actual_minutes = weekly_actual_seconds // 60

    # 4. Fetch planned study time from active study plan or student profile
    today_planned_minutes = 240 # Default baseline
    profile = await db.student_profiles.find_one({"user_id": user_id})
    if profile and "available_study_hours_daily" in profile:
        today_planned_minutes = int(profile["available_study_hours_daily"] * 60)

    plan = await db.study_plans.find_one({"user_id": user_id, "is_active": True})
    if plan and "daily_target_minutes" in plan:
        today_planned_minutes = plan["daily_target_minutes"]

    ratio = round(today_actual_minutes / max(1, today_planned_minutes), 2)

    # 5. Build 7-day daily history points
    daily_history: List[DailyStudyPoint] = []
    daily_map = {}
    for i in range(7):
        day_date = (seven_days_ago + timedelta(days=i)).date()
        daily_map[day_date] = 0

    for s in recent_sessions:
        s_date = s["started_at"].date()
        if s_date in daily_map:
            daily_map[s_date] += s.get("duration_seconds", 0) // 60

    for day_date, mins in daily_map.items():
        daily_history.append(DailyStudyPoint(
            date=day_date.strftime("%a (%d %b)"),
            minutes=mins
        ))

    # 6. Subject-wise time distribution
    subject_time_map: Dict[str, int] = {}
    for s in recent_sessions:
        sub_name = s.get("subject_name", "General Studies")
        mins = s.get("duration_seconds", 0) // 60
        subject_time_map[sub_name] = subject_time_map.get(sub_name, 0) + mins

    subject_distribution = [
        {"subject_name": k, "minutes": v} for k, v in subject_time_map.items()
    ]
    if not subject_distribution:
        subject_distribution = [{"subject_name": "No sessions logged yet", "minutes": 0}]

    # 7. Syllabus progress calculation
    enrolled_sub_ids = profile.get("enrolled_subject_ids", []) if profile else []
    subjects_progress: List[SubjectProgressSummary] = []
    total_enrolled_topics = 0
    completed_enrolled_topics = 0

    if enrolled_sub_ids:
        for sub_id in enrolled_sub_ids:
            try:
                sub_obj = await db.subjects.find_one({"_id": ObjectId(sub_id)})
            except Exception:
                sub_obj = await db.subjects.find_one({"_id": sub_id})
            
            sub_name = sub_obj.get("name", "Subject") if sub_obj else "Subject"
            sub_code = sub_obj.get("code", "SUB") if sub_obj else "SUB"

            # Count total topics under this subject
            topic_count = await db.syllabus_topics.count_documents({"subject_id": str(sub_id)})
            # Count user completed topics
            completed_count = await db.syllabus_progress.count_documents({
                "user_id": user_id,
                "subject_id": str(sub_id),
                "status": {"$in": ["completed", "revised"]}
            })

            total_enrolled_topics += topic_count
            completed_enrolled_topics += completed_count

            studied_secs = sum(
                s.get("duration_seconds", 0) for s in recent_sessions
                if s.get("subject_id") == str(sub_id)
            )

            pct = round((completed_count / max(1, topic_count)) * 100, 1) if topic_count > 0 else 0.0

            subjects_progress.append(
                SubjectProgressSummary(
                    subject_id=str(sub_id),
                    subject_name=sub_name,
                    subject_code=sub_code,
                    studied_minutes_total=studied_secs // 60,
                    syllabus_completed_percentage=pct,
                    total_topics=topic_count,
                    completed_topics=completed_count
                )
            )

    overall_syllabus_completion = (
        round((completed_enrolled_topics / max(1, total_enrolled_topics)) * 100, 1)
        if total_enrolled_topics > 0 else 0.0
    )

    # 8. Compute active streak days
    active_streak = 0
    check_day = now.date()
    while True:
        check_start = datetime.combine(check_day, time.min)
        check_end = datetime.combine(check_day, time.max)
        has_session = await db.study_sessions.find_one({
            "user_id": user_id,
            "status": "completed",
            "started_at": {"$gte": check_start, "$lte": check_end}
        })
        if has_session:
            active_streak += 1
            check_day = check_day - timedelta(days=1)
        else:
            # If today has no sessions yet, check if yesterday had a streak
            if check_day == now.date():
                check_day = check_day - timedelta(days=1)
                continue
            break

    # 9. Upcoming exams & tasks counts
    upcoming_exams_count = len(profile.get("upcoming_exam_dates", [])) if profile else 0
    pending_tasks_count = await db.tasks.count_documents({"user_id": user_id, "status": "pending"})
    
    # Pending revision prompts: topics completed > 2 days ago without recent revision
    pending_revisions_count = await db.syllabus_progress.count_documents({
        "user_id": user_id,
        "status": "completed",
        "last_studied_at": {"$lte": now - timedelta(days=2)}
    })

    return AnalyticsDashboardResponse(
        today_actual_minutes=today_actual_minutes,
        today_planned_minutes=today_planned_minutes,
        weekly_actual_minutes=weekly_actual_minutes,
        planned_vs_actual_ratio=ratio,
        overall_syllabus_completion_rate=overall_syllabus_completion,
        active_streak_days=active_streak,
        subject_distribution=subject_distribution,
        daily_history_7d=daily_history,
        subjects_progress=subjects_progress,
        upcoming_exams_count=upcoming_exams_count,
        pending_tasks_count=pending_tasks_count,
        pending_revisions_count=pending_revisions_count
    )
