import math
from datetime import datetime, time
from typing import List, Dict, Any, Optional
from app.models.schemas import TimetableSessionAllocation

def generate_deterministic_timetable(
    available_daily_minutes: int,
    break_duration_minutes: int,
    study_interval_minutes: int,
    subjects: List[Dict[str, Any]],
    subject_priorities: Optional[Dict[str, int]] = None
) -> List[TimetableSessionAllocation]:
    """
    Deterministically allocates available study time across subjects according to priority weights.
    
    Guarantees:
    - Sum of subject study minutes strictly equals available_daily_minutes.
    - Breaks are interleaved according to break_duration_minutes and study_interval_minutes.
    - Higher priority subjects receive proportionally more time.
    """
    if not subjects:
        return []

    # Calculate weights
    priorities = subject_priorities or {}
    total_weight = 0
    weights = {}
    for sub in subjects:
        sub_id = str(sub.get("_id", sub.get("id")))
        # Default priority is 3 (range 1 to 5)
        w = max(1, min(5, priorities.get(sub_id, 3)))
        weights[sub_id] = w
        total_weight += w

    # Proportional allocation of total study minutes
    allocated_minutes = {}
    remaining_minutes = available_daily_minutes

    for sub in subjects:
        sub_id = str(sub.get("_id", sub.get("id")))
        raw_share = (weights[sub_id] / total_weight) * available_daily_minutes
        # Round to nearest 5 minutes
        rounded = int(round(raw_share / 5.0) * 5)
        rounded = max(20, rounded) # Minimum 20 mins per subject
        allocated_minutes[sub_id] = rounded
        remaining_minutes -= rounded

    # Adjust rounding discrepancy to guarantee exact sum
    if remaining_minutes != 0 and subjects:
        # Give or subtract discrepancy from highest weighted subject
        sorted_sub_ids = sorted(weights.keys(), key=lambda s: weights[s], reverse=True)
        allocated_minutes[sorted_sub_ids[0]] += remaining_minutes

    # Construct timeline with study sessions and interleaved breaks
    allocations: List[TimetableSessionAllocation] = []
    current_time_minutes = 6 * 60 # Default start at 06:00 AM or 18:00 (evening)
    session_order = 1

    for sub in subjects:
        sub_id = str(sub.get("_id", sub.get("id")))
        sub_name = sub.get("name", "Subject")
        sub_code = sub.get("code", "SUB")
        mins = allocated_minutes[sub_id]

        # Break large subject allocations into study blocks with breaks if longer than study_interval_minutes
        remaining_sub_mins = mins
        while remaining_sub_mins > 0:
            block_mins = min(study_interval_minutes, remaining_sub_mins)
            start_hr = current_time_minutes // 60
            start_min = current_time_minutes % 60
            current_time_minutes += block_mins
            end_hr = current_time_minutes // 60
            end_min = current_time_minutes % 60

            time_slot = f"{start_hr:02d}:{start_min:02d} - {end_hr:02d}:{end_min:02d}"

            allocations.append(
                TimetableSessionAllocation(
                    subject_id=sub_id,
                    subject_name=sub_name,
                    subject_code=sub_code,
                    planned_minutes=block_mins,
                    time_slot=time_slot,
                    session_order=session_order,
                    is_break=False
                )
            )
            session_order += 1
            remaining_sub_mins -= block_mins

            # Insert break if study remains
            if remaining_sub_mins > 0 or sub != subjects[-1]:
                b_start_hr = current_time_minutes // 60
                b_start_min = current_time_minutes % 60
                current_time_minutes += break_duration_minutes
                b_end_hr = current_time_minutes // 60
                b_end_min = current_time_minutes % 60

                allocations.append(
                    TimetableSessionAllocation(
                        subject_id="break",
                        subject_name="Rest & Hydration Break",
                        subject_code="REST",
                        planned_minutes=break_duration_minutes,
                        time_slot=f"{b_start_hr:02d}:{b_start_min:02d} - {b_end_hr:02d}:{b_end_min:02d}",
                        session_order=session_order,
                        is_break=True,
                        break_title="Refresh & Quick Stretch"
                    )
                )
                session_order += 1

    return allocations
