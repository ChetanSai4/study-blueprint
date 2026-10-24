from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, HttpUrl, validator

# ------------------------------------------------------------------------------
# User & Authentication Models
# ------------------------------------------------------------------------------
class UserBase(BaseModel):
    email: str
    display_name: str
    avatar_url: Optional[str] = None
    role: str = "student"

class UserResponse(UserBase):
    id: str
    account_status: str = "active"
    is_onboarded: bool = False
    created_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None

class GoogleAuthRequest(BaseModel):
    credential: str

class DemoAuthRequest(BaseModel):
    role: str = "student" # 'student' or 'admin'
    email: Optional[str] = None
    display_name: Optional[str] = None

class UserUpdateRequest(BaseModel):
    display_name: Optional[str] = None
    email: Optional[str] = None

class AuthResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"

# ------------------------------------------------------------------------------
# Student Profile Models
# ------------------------------------------------------------------------------
class ExamDateEntry(BaseModel):
    subject_id: str
    exam_date: datetime
    exam_type: str = "semester" # 'mid1', 'mid2', 'semester', 'board', 'competitive'

class StudentProfileBase(BaseModel):
    education_level_code: str
    board_or_university_code: Optional[str] = None
    college_name: Optional[str] = None # e.g. Sri Sivani College of Engineering
    course_or_stream_code: Optional[str] = None
    branch_code: Optional[str] = None
    academic_year: Optional[int] = None
    semester: Optional[int] = None
    regulation: Optional[str] = None
    enrolled_subject_ids: List[str] = []
    custom_subjects: List[Dict[str, Any]] = [] # [{ "name": "...", "code": "..." }]
    available_study_hours_daily: float = Field(default=4.0, ge=0.5, le=16.0)
    preferred_study_time: str = "evening"
    break_duration_minutes: int = Field(default=10, ge=5, le=60)
    study_interval_minutes: int = Field(default=50, ge=20, le=120)
    preferred_language: str = "en"
    subject_priorities: Dict[str, int] = {}
    upcoming_exam_dates: List[ExamDateEntry] = []
    goals: List[str] = []

class StudentProfileUpdate(BaseModel):
    education_level_code: Optional[str] = None
    board_or_university_code: Optional[str] = None
    college_name: Optional[str] = None
    course_or_stream_code: Optional[str] = None
    branch_code: Optional[str] = None
    academic_year: Optional[int] = None
    semester: Optional[int] = None
    regulation: Optional[str] = None
    enrolled_subject_ids: Optional[List[str]] = None
    custom_subjects: Optional[List[Dict[str, Any]]] = None
    available_study_hours_daily: Optional[float] = None
    preferred_study_time: Optional[str] = None
    break_duration_minutes: Optional[int] = None
    study_interval_minutes: Optional[int] = None
    preferred_language: Optional[str] = None
    subject_priorities: Optional[Dict[str, int]] = None
    upcoming_exam_dates: Optional[List[ExamDateEntry]] = None
    goals: Optional[List[str]] = None

class StudentProfileResponse(StudentProfileBase):
    id: str
    user_id: str
    updated_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# Academic Catalog Models
# ------------------------------------------------------------------------------
class EducationLevelResponse(BaseModel):
    id: str
    code: str
    title: str
    description: str
    display_order: int
    is_active: bool = True

class BoardOrUniversityResponse(BaseModel):
    id: str
    code: str
    name: str
    short_name: str
    education_level_code: str
    state_or_national: str
    is_active: bool = True

class BranchResponse(BaseModel):
    id: str
    code: str
    name: str
    short_name: str
    education_level_code: str
    description: Optional[str] = None

class SubjectResponse(BaseModel):
    id: str
    code: str
    name: str
    short_name: str
    education_level_code: str
    board_or_university_code: Optional[str] = None
    branch_code: Optional[str] = None
    academic_year: Optional[int] = None
    semester: Optional[int] = None
    regulation: Optional[str] = None
    credits: Optional[int] = None
    description: Optional[str] = None
    icon_name: Optional[str] = None

class SyllabusTopicResponse(BaseModel):
    id: str
    unit_id: str
    subject_id: str
    topic_name: str
    order: int
    is_important_for_exam: bool = False
    estimated_study_minutes: int = 45

class SyllabusUnitResponse(BaseModel):
    id: str
    subject_id: str
    unit_number: int
    title: str
    description: Optional[str] = None
    weightage_marks: Optional[int] = None
    topics: List[SyllabusTopicResponse] = []

# ------------------------------------------------------------------------------
# Educational Resources Models
# ------------------------------------------------------------------------------
class ResourceCreate(BaseModel):
    title: str
    resource_type: str # 'syllabus', 'previous_paper', 'model_paper', 'notes', 'formula_sheet', 'lab_manual'
    education_level_code: str
    board_or_university_code: Optional[str] = None
    branch_code: Optional[str] = None
    semester: Optional[int] = None
    regulation: Optional[str] = None
    subject_id: Optional[str] = "general"
    unit_id: Optional[str] = None
    file_url: str
    file_size_bytes: int = 0
    file_mime_type: str = "application/pdf"
    source_contributor: str = "Verified Academic Cell"
    verification_status: str = "verified"
    publication_status: str = "published"

class ResourceResponse(BaseModel):
    id: str
    title: str
    resource_type: str
    education_level_code: str
    board_or_university_code: Optional[str] = None
    branch_code: Optional[str] = None
    semester: Optional[int] = None
    regulation: Optional[str] = None
    subject_id: Optional[str] = "general"
    subject_name: Optional[str] = None

    unit_id: Optional[str] = None
    file_url: str
    file_size_bytes: int
    file_mime_type: str
    source_contributor: str
    verification_status: str
    publication_status: str
    download_count: int = 0
    is_bookmarked: bool = False
    created_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# YouTube Learning Models
# ------------------------------------------------------------------------------
class VideoCreate(BaseModel):
    title: str
    youtube_url: str
    channel_name: str
    description: Optional[str] = None
    education_level_code: str
    board_or_university_code: Optional[str] = None
    branch_code: Optional[str] = None
    subject_id: str
    unit_id: Optional[str] = None
    topic_id: Optional[str] = None
    language: str = "en" # 'en', 'te', 'hi'
    difficulty_level: str = "beginner" # 'beginner', 'intermediate', 'advanced'
    duration_seconds: Optional[int] = None
    verification_status: str = "verified"

class VideoResponse(BaseModel):
    id: str
    title: str
    youtube_url: str
    youtube_id: str
    channel_name: str
    description: Optional[str] = None
    education_level_code: str
    subject_id: str
    subject_name: Optional[str] = None
    unit_id: Optional[str] = None
    topic_id: Optional[str] = None
    topic_name: Optional[str] = None
    language: str
    difficulty_level: str
    duration_seconds: Optional[int] = None
    verification_status: str
    publication_status: str
    is_watched: bool = False
    is_bookmarked: bool = False
    created_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# Timetable & Planner Models
# ------------------------------------------------------------------------------
class TimetableSessionAllocation(BaseModel):
    subject_id: str
    subject_name: str
    subject_code: str
    planned_minutes: int
    time_slot: str
    session_order: int
    is_break: bool = False
    break_title: Optional[str] = None

class GenerateTimetableRequest(BaseModel):
    available_daily_minutes: int = Field(default=240, ge=60, le=720)
    break_duration_minutes: int = Field(default=10, ge=5, le=30)
    study_interval_minutes: int = Field(default=50, ge=25, le=120)
    subject_ids: Optional[List[str]] = None
    custom_subjects: Optional[List[Dict[str, Any]]] = None # [{ "name": "...", "code": "..." }]
    subject_priorities: Optional[Dict[str, int]] = None # subject_id -> 1..5

class StudyPlanResponse(BaseModel):
    id: str
    user_id: str
    title: str
    daily_target_minutes: int
    break_duration_minutes: int
    study_interval_minutes: int
    allocations: List[TimetableSessionAllocation]
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# Precision Study Tracker Models
# ------------------------------------------------------------------------------
class StudySessionCreate(BaseModel):
    subject_id: str
    topic_id: Optional[str] = None
    task_description: str
    started_at: datetime
    ended_at: datetime
    duration_seconds: int = Field(ge=0)
    paused_duration_seconds: int = Field(default=0, ge=0)
    session_type: str = "timer" # 'timer' or 'manual'
    session_notes: Optional[str] = None

class StudySessionResponse(BaseModel):
    id: str
    user_id: str
    subject_id: str
    subject_name: Optional[str] = None
    topic_id: Optional[str] = None
    topic_name: Optional[str] = None
    task_description: str
    started_at: datetime
    ended_at: datetime
    duration_seconds: int
    paused_duration_seconds: int
    session_type: str
    status: str
    session_notes: Optional[str] = None
    created_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# Syllabus Progress & Task Models
# ------------------------------------------------------------------------------
class TopicProgressUpdate(BaseModel):
    status: str # 'not_started', 'in_progress', 'completed', 'revised'
    confidence_level: Optional[int] = Field(default=3, ge=1, le=5)

class TopicProgressResponse(BaseModel):
    id: str
    user_id: str
    subject_id: str
    topic_id: str
    status: str
    progress_percentage: int
    confidence_level: int
    last_studied_at: Optional[datetime] = None
    revision_count: int = 0
    next_recommended_revision_at: Optional[datetime] = None

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    subject_id: Optional[str] = None
    topic_id: Optional[str] = None
    task_type: str = "study" # 'study', 'revision', 'practice_test', 'assignment'
    priority: str = "medium" # 'low', 'medium', 'high', 'urgent'
    due_date: Optional[datetime] = None
    estimated_minutes: int = 45

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None # 'pending', 'in_progress', 'completed'
    priority: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str] = None
    subject_id: Optional[str] = None
    subject_name: Optional[str] = None
    topic_id: Optional[str] = None
    task_type: str
    priority: str
    status: str
    due_date: Optional[datetime] = None
    estimated_minutes: int
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

# ------------------------------------------------------------------------------
# Analytics Dashboard Models
# ------------------------------------------------------------------------------
class SubjectProgressSummary(BaseModel):
    subject_id: str
    subject_name: str
    subject_code: str
    studied_minutes_total: int
    syllabus_completed_percentage: float
    total_topics: int
    completed_topics: int

class DailyStudyPoint(BaseModel):
    date: str
    minutes: int

class AnalyticsDashboardResponse(BaseModel):
    today_actual_minutes: int
    today_planned_minutes: int
    weekly_actual_minutes: int
    planned_vs_actual_ratio: float
    overall_syllabus_completion_rate: float
    active_streak_days: int
    subject_distribution: List[Dict[str, Any]]
    daily_history_7d: List[DailyStudyPoint]
    subjects_progress: List[SubjectProgressSummary]
    upcoming_exams_count: int
    pending_tasks_count: int
    pending_revisions_count: int

# ------------------------------------------------------------------------------
# Career Models
# ------------------------------------------------------------------------------
class CareerPathResponse(BaseModel):
    id: str
    slug: str
    title: str
    entry_level_code: str
    intermediate_step_codes: List[str]
    target_education_level_code: str
    target_branch_code: str
    description: str
    entrance_exams: List[str]
    display_order: int

class ProjectRecommendation(BaseModel):
    tier: str # 'beginner', 'intermediate', 'advanced_capstone'
    title: str
    description: str
    suggested_tech_stack: List[str]

class CareerRoleResponse(BaseModel):
    id: str
    role_code: str
    title: str
    branch_codes: List[str]
    summary: str
    core_skills: List[str]
    programming_languages: List[str]
    frameworks_and_tools: List[str]
    learning_roadmap: List[Dict[str, Any]]
    projects: List[ProjectRecommendation]
    internship_preparation_checklist: List[str]
    certifications: List[str]
    eligibility_notes: str
    industry_insights: str
    is_active: bool = True

# ------------------------------------------------------------------------------
# Admin & Audit Models
# ------------------------------------------------------------------------------
class AdminOverviewResponse(BaseModel):
    total_users: int
    total_resources: int
    total_videos: int
    total_study_sessions: int
    total_study_hours: float
    active_plans_count: int

class AuditLogResponse(BaseModel):
    id: str
    admin_user_id: str
    admin_email: str
    action: str
    entity_type: str
    entity_id: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime
