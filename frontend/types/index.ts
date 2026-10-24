export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  account_status: string;
  is_onboarded: boolean;
  created_at?: string;
  last_login_at?: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  education_level_code: string;
  board_or_university_code?: string;
  college_name?: string;
  course_or_stream_code?: string;
  branch_code?: string;
  academic_year?: number;
  semester?: number;
  regulation?: string;
  enrolled_subject_ids: string[];
  custom_subjects?: Array<{ name: string; code?: string; credits?: number; priority?: number }>;
  available_study_hours_daily: number;
  preferred_study_time: string;
  break_duration_minutes: number;
  study_interval_minutes: number;
  preferred_language: string;
  subject_priorities?: Record<string, number>;
  goals?: string[];
  updated_at?: string;
}

export interface EducationLevel {
  id: string;
  code: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface BoardOrUniversity {
  id: string;
  code: string;
  name: string;
  short_name: string;
  education_level_code: string;
  state_or_national: string;
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  short_name: string;
  education_level_code: string;
  description?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  short_name: string;
  education_level_code: string;
  board_or_university_code?: string;
  branch_code?: string;
  academic_year?: number;
  semester?: number;
  regulation?: string;
  credits?: number;
  description?: string;
  icon_name?: string;
}

export interface SyllabusTopic {
  id: string;
  unit_id: string;
  subject_id: string;
  topic_name: string;
  order: number;
  is_important_for_exam: boolean;
  estimated_study_minutes: number;
}

export interface SyllabusUnit {
  id: string;
  subject_id: string;
  unit_number: number;
  title: string;
  description?: string;
  weightage_marks?: number;
  topics: SyllabusTopic[];
}

export interface EducationalResource {
  id: string;
  title: string;
  resource_type: 'syllabus' | 'previous_paper' | 'model_paper' | 'notes' | 'formula_sheet' | 'lab_manual';
  education_level_code: string;
  board_or_university_code?: string;
  branch_code?: string;
  semester?: number;
  regulation?: string;
  subject_id: string;
  subject_name?: string;
  unit_id?: string;
  file_url: string;
  file_size_bytes: number;
  file_mime_type: string;
  source_contributor: string;
  verification_status: string;
  publication_status: string;
  download_count: number;
  is_bookmarked?: boolean;
  created_at?: string;
}

export interface CuratedVideo {
  id: string;
  title: string;
  youtube_url: string;
  youtube_id: string;
  channel_name: string;
  description?: string;
  education_level_code: string;
  subject_id: string;
  subject_name?: string;
  unit_id?: string;
  topic_id?: string;
  topic_name?: string;
  language: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_seconds?: number;
  verification_status: string;
  publication_status: string;
  is_watched: boolean;
  is_bookmarked: boolean;
}

export interface TimetableAllocation {
  subject_id: string;
  subject_name: string;
  subject_code: string;
  planned_minutes: number;
  time_slot: string;
  session_order: number;
  is_break: boolean;
  break_title?: string;
}

export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  daily_target_minutes: number;
  break_duration_minutes: number;
  study_interval_minutes: number;
  allocations: TimetableAllocation[];
  is_active: boolean;
}

export interface StudySession {
  id: string;
  user_id: string;
  subject_id: string;
  subject_name?: string;
  topic_id?: string;
  topic_name?: string;
  task_description: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  paused_duration_seconds: number;
  session_type: string;
  status: string;
  session_notes?: string;
}

export interface SubjectProgressSummary {
  subject_id: string;
  subject_name: string;
  subject_code: string;
  studied_minutes_total: number;
  syllabus_completed_percentage: number;
  total_topics: number;
  completed_topics: number;
}

export interface DailyStudyPoint {
  date: string;
  minutes: number;
}

export interface AnalyticsDashboard {
  today_actual_minutes: number;
  today_planned_minutes: number;
  weekly_actual_minutes: number;
  planned_vs_actual_ratio: number;
  overall_syllabus_completion_rate: number;
  active_streak_days: number;
  subject_distribution: Array<{ subject_name: string; minutes: number }>;
  daily_history_7d: DailyStudyPoint[];
  subjects_progress: SubjectProgressSummary[];
  upcoming_exams_count: number;
  pending_tasks_count: number;
  pending_revisions_count: number;
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  entry_level_code: string;
  intermediate_step_codes: string[];
  target_education_level_code: string;
  target_branch_code: string;
  description: string;
  entrance_exams: string[];
  display_order: number;
}

export interface ProjectRecommendation {
  tier: 'beginner' | 'intermediate' | 'advanced_capstone';
  title: string;
  description: string;
  suggested_tech_stack: string[];
}

export interface CareerRole {
  id: string;
  role_code: string;
  title: string;
  branch_codes: string[];
  summary: string;
  core_skills: string[];
  programming_languages: string[];
  frameworks_and_tools: string[];
  learning_roadmap: Array<{
    phase: number;
    title: string;
    topics: string[];
    recommended_duration_weeks: number;
  }>;
  projects: ProjectRecommendation[];
  internship_preparation_checklist: string[];
  certifications: string[];
  eligibility_notes?: string;
  industry_insights?: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  subject_id?: string;
  subject_name?: string;
  topic_id?: string;
  task_type: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  estimated_minutes: number;
  completed_at?: string;
}
