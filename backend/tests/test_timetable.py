import pytest
from app.services.timetable_service import generate_deterministic_timetable

def test_deterministic_timetable_240_minutes():
    """
    Validates that a 240-minute daily budget across 4 subjects is strictly
    allocated to 240 total study minutes with interleaved breaks.
    """
    subjects = [
        {"_id": "sub1", "name": "Data Structures", "code": "CS301PC"},
        {"_id": "sub2", "name": "Database Management Systems", "code": "CS302PC"},
        {"_id": "sub3", "name": "Operating Systems", "code": "CS401PC"},
        {"_id": "sub4", "name": "Computer Networks", "code": "CS402PC"},
    ]
    priorities = {
        "sub1": 5, # High priority / weak subject
        "sub2": 3,
        "sub3": 2,
        "sub4": 2
    }

    allocations = generate_deterministic_timetable(
        available_daily_minutes=240,
        break_duration_minutes=10,
        study_interval_minutes=50,
        subjects=subjects,
        subject_priorities=priorities
    )

    study_sessions = [a for a in allocations if not a.is_break]
    break_sessions = [a for a in allocations if a.is_break]

    total_study_minutes = sum(s.planned_minutes for s in study_sessions)
    assert total_study_minutes == 240, f"Expected exactly 240 study minutes, got {total_study_minutes}"

    # Verify that higher priority subject received more minutes
    sub1_minutes = sum(s.planned_minutes for s in study_sessions if s.subject_id == "sub1")
    sub4_minutes = sum(s.planned_minutes for s in study_sessions if s.subject_id == "sub4")
    assert sub1_minutes > sub4_minutes, "Subject 1 with priority 5 must receive more time than Subject 4 with priority 2"

    # Verify breaks exist
    assert len(break_sessions) > 0, "Breaks must be inserted between study sessions"
    for b in break_sessions:
        assert b.planned_minutes == 10
        assert b.is_break is True
