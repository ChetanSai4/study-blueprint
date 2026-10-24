# Study Blueprint — MongoDB Database Schema & Indexing Architecture

## 1. Architecture Overview

Study Blueprint uses **MongoDB Atlas** as its sole primary database. The database is accessed asynchronously using Python's asynchronous MongoDB driver (`motor` / `pymongo.asynchronous`).

### Core Engineering Principles:
1. **Strict Reference Validation:** Since MongoDB does not enforce relational foreign-key constraints automatically, all referencing IDs (`user_id`, `subject_id`, `topic_id`, etc.) are validated in the FastAPI Pydantic service layer before writes.
2. **Normalized vs. Embedded Balance:**
   - Academic catalog hierarchies (`education_levels`, `boards`, `universities`, `courses`, `branches`, `semesters`, `subjects`, `syllabus_units`, `syllabus_topics`) are normalized with clear reference fields to enable flexible filtering and prevent unbounded document growth.
   - User historical logs (`study_sessions`, `tasks`, `syllabus_progress`, `quiz_attempts`, `audit_logs`) are modeled in separate collections with compound indexes.
   - Resource documents contain metadata, verification stamps, and storage URLs; binary files (PDFs, docs) are stored in cloud object storage or static storage, never embedded as raw binary in BSON documents.
3. **Deterministic Idempotency:** All initial seed scripts check for natural business keys (e.g., `code`, `slug`, `google_sub`, `youtube_id`) using `update_one(..., {"$set": ...}, upsert=True)` so seed execution never duplicates data.

---

## 2. Collection Inventory & Document Schemas

### 2.1 Identity & Profiles

#### Collection: `users`
Represents verified user accounts linked to Google Identity.
```json
{
  "_id": "ObjectId",
  "google_sub": "String (Unique, Google subject identifier)",
  "email": "String (Normalized lowercase)",
  "display_name": "String",
  "avatar_url": "String (Optional)",
  "role": "String (Enum: 'student', 'admin', default: 'student')",
  "account_status": "String (Enum: 'active', 'suspended', default: 'active')",
  "created_at": "ISODate",
  "updated_at": "ISODate",
  "last_login_at": "ISODate"
}
```
*Indexes:*
- `{"google_sub": 1}` (Unique)
- `{"email": 1}` (Unique)

#### Collection: `student_profiles`
Holds academic configuration and personalized study preferences.
```json
{
  "_id": "ObjectId",
  "user_id": "String (Refers to users._id)",
  "education_level_code": "String (e.g. 'btech', 'intermediate', 'diploma', 'school')",
  "board_or_university_code": "String (e.g. 'jntuh', 'cbse', 'sbtet')",
  "course_or_stream_code": "String (e.g. 'btech', 'mpc', 'cme', 'class_10')",
  "branch_code": "String (e.g. 'cse', 'aiml', 'ece', optional for school)",
  "academic_year": "Integer (e.g. 2)",
  "semester": "Integer (e.g. 1 for Sem 2-1)",
  "regulation": "String (e.g. 'R22', 'R18')",
  "enrolled_subject_ids": ["String (Refers to subjects._id)"],
  "available_study_hours_daily": "Double (e.g. 4.0)",
  "preferred_study_time": "String (Enum: 'early_morning', 'morning', 'afternoon', 'evening', 'late_night')",
  "break_duration_minutes": "Integer (Default: 10)",
  "study_interval_minutes": "Integer (Default: 50)",
  "preferred_language": "String (Default: 'en', 'te', 'hi')",
  "subject_priorities": {
    "<subject_id>": "Integer (Difficulty rating 1 to 5)"
  },
  "upcoming_exam_dates": [
    {
      "subject_id": "String",
      "exam_date": "ISODate",
      "exam_type": "String (Enum: 'mid1', 'mid2', 'semester', 'board', 'competitive')"
    }
  ],
  "goals": ["String"],
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```
*Indexes:*
- `{"user_id": 1}` (Unique)
- `{"education_level_code": 1, "board_or_university_code": 1}`

---

### 2.2 Academic Catalog Hierarchy

#### Collection: `education_levels`
```json
{
  "_id": "ObjectId",
  "code": "String (Unique, e.g. 'school', 'intermediate', 'diploma', 'btech', 'competitive')",
  "title": "String (e.g. 'BTech / BE Engineering')",
  "description": "String",
  "display_order": "Integer",
  "is_active": "Boolean"
}
```

#### Collection: `boards_and_universities`
```json
{
  "_id": "ObjectId",
  "code": "String (Unique, e.g. 'jntuh', 'osmania', 'cbse', 'ts_bie', 'sbtet')",
  "name": "String (e.g. 'Jawaharlal Nehru Technological University Hyderabad')",
  "short_name": "String (e.g. 'JNTUH')",
  "education_level_code": "String",
  "state_or_national": "String (e.g. 'Telangana', 'National')",
  "is_active": "Boolean"
}
```

#### Collection: `branches`
```json
{
  "_id": "ObjectId",
  "code": "String (Unique, e.g. 'btech_cse', 'btech_aiml', 'inter_mpc', 'diploma_cme')",
  "name": "String (e.g. 'Computer Science & Engineering')",
  "short_name": "String (e.g. 'CSE')",
  "education_level_code": "String",
  "description": "String"
}
```

#### Collection: `subjects`
```json
{
  "_id": "ObjectId",
  "code": "String (e.g. 'CS301PC', 'MA101')",
  "name": "String (e.g. 'Data Structures')",
  "short_name": "String (e.g. 'DS')",
  "education_level_code": "String",
  "board_or_university_code": "String",
  "branch_code": "String",
  "academic_year": "Integer",
  "semester": "Integer",
  "regulation": "String",
  "credits": "Integer",
  "description": "String",
  "icon_name": "String",
  "is_active": "Boolean"
}
```
*Indexes:*
- `{"code": 1, "board_or_university_code": 1, "regulation": 1}` (Compound Unique)
- `{"education_level_code": 1, "branch_code": 1, "semester": 1}`

#### Collection: `syllabus_units` & `syllabus_topics`
```json
// syllabus_units
{
  "_id": "ObjectId",
  "subject_id": "String (Refers to subjects._id)",
  "unit_number": "Integer (1 to 5)",
  "title": "String (e.g. 'Trees and Binary Search Trees')",
  "description": "String",
  "weightage_marks": "Integer"
}
// syllabus_topics
{
  "_id": "ObjectId",
  "unit_id": "String (Refers to syllabus_units._id)",
  "subject_id": "String (Refers to subjects._id)",
  "topic_name": "String (e.g. 'AVL Trees - Rotations and Operations')",
  "order": "Integer",
  "is_important_for_exam": "Boolean",
  "estimated_study_minutes": "Integer"
}
```
*Indexes:*
- `syllabus_units`: `{"subject_id": 1, "unit_number": 1}`
- `syllabus_topics`: `{"unit_id": 1, "order": 1}`, `{"subject_id": 1}`

---

### 2.3 Educational Resources & Curated Videos

#### Collection: `resources`
```json
{
  "_id": "ObjectId",
  "title": "String (e.g. 'Data Structures Unit 3 Notes - Trees')",
  "resource_type": "String (Enum: 'syllabus', 'previous_paper', 'model_paper', 'notes', 'formula_sheet', 'lab_manual')",
  "education_level_code": "String",
  "board_or_university_code": "String",
  "branch_code": "String",
  "semester": "Integer",
  "regulation": "String",
  "subject_id": "String (Refers to subjects._id)",
  "unit_id": "String (Optional, Refers to syllabus_units._id)",
  "file_url": "String",
  "file_size_bytes": "Integer",
  "file_mime_type": "String",
  "source_contributor": "String (e.g. 'Verified Academic Cell')",
  "verification_status": "String (Enum: 'verified', 'pending', 'rejected', default: 'verified')",
  "publication_status": "String (Enum: 'published', 'draft', 'archived', default: 'published')",
  "download_count": "Integer (Default: 0)",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```
*Indexes:*
- `{"subject_id": 1, "resource_type": 1, "publication_status": 1}`
- `{"education_level_code": 1, "branch_code": 1, "semester": 1}`
- `{"title": "text"}` (Full text search support)

#### Collection: `videos`
```json
{
  "_id": "ObjectId",
  "title": "String (e.g. 'Binary Search Trees (BST) - Full Concept & Operations')",
  "youtube_url": "String (e.g. 'https://www.youtube.com/watch?v=gcULXE7ViPu')",
  "youtube_id": "String (Unique, e.g. 'gcULXE7ViPu')",
  "channel_name": "String (e.g. 'Abdul Bari')",
  "description": "String",
  "education_level_code": "String",
  "board_or_university_code": "String (Optional)",
  "branch_code": "String",
  "subject_id": "String (Refers to subjects._id)",
  "unit_id": "String (Optional)",
  "topic_id": "String (Optional)",
  "language": "String (Enum: 'en', 'te', 'hi')",
  "difficulty_level": "String (Enum: 'beginner', 'intermediate', 'advanced')",
  "duration_seconds": "Integer",
  "verification_status": "String (Enum: 'verified', 'pending', default: 'verified')",
  "verification_date": "ISODate",
  "publication_status": "String (Enum: 'published', 'archived', default: 'published')",
  "created_at": "ISODate"
}
```
*Indexes:*
- `{"youtube_id": 1}` (Unique)
- `{"subject_id": 1, "publication_status": 1}`
- `{"topic_id": 1, "publication_status": 1}`

---

### 2.4 Study Planning, Tracking & Analytics

#### Collection: `study_plans`
```json
{
  "_id": "ObjectId",
  "user_id": "String (Refers to users._id)",
  "title": "String (e.g. 'Semester 2-1 Mid Exam Blueprint')",
  "start_date": "ISODate",
  "end_date": "ISODate",
  "daily_target_minutes": "Integer (e.g. 240)",
  "break_duration_minutes": "Integer",
  "schedule_rules": {
    "prioritize_weak_subjects": "Boolean",
    "include_weekend_revision": "Boolean",
    "exam_proximity_weight": "Double"
  },
  "allocations": [
    {
      "subject_id": "String",
      "planned_minutes_daily": "Integer",
      "day_of_week": "Integer (0-6)",
      "time_slot": "String (e.g. '06:00 - 07:00')"
    }
  ],
  "is_active": "Boolean (Default: true)",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```
*Indexes:*
- `{"user_id": 1, "is_active": 1}`

#### Collection: `study_sessions`
```json
{
  "_id": "ObjectId",
  "user_id": "String (Refers to users._id)",
  "subject_id": "String (Refers to subjects._id)",
  "topic_id": "String (Optional)",
  "task_description": "String",
  "started_at": "ISODate",
  "ended_at": "ISODate",
  "duration_seconds": "Integer (Actual active seconds without pause)",
  "paused_duration_seconds": "Integer (Total paused time)",
  "session_type": "String (Enum: 'timer', 'manual')",
  "status": "String (Enum: 'active', 'completed', 'discarded')",
  "session_notes": "String",
  "created_at": "ISODate"
}
```
*Indexes:*
- `{"user_id": 1, "started_at": -1}`
- `{"user_id": 1, "status": 1}`
- `{"user_id": 1, "subject_id": 1}`

#### Collection: `syllabus_progress`
```json
{
  "_id": "ObjectId",
  "user_id": "String (Refers to users._id)",
  "subject_id": "String (Refers to subjects._id)",
  "topic_id": "String (Refers to syllabus_topics._id)",
  "status": "String (Enum: 'not_started', 'in_progress', 'completed', 'revised')",
  "progress_percentage": "Integer (0-100)",
  "confidence_level": "Integer (1-5)",
  "last_studied_at": "ISODate",
  "revision_count": "Integer (Default: 0)",
  "next_recommended_revision_at": "ISODate"
}
```
*Indexes:*
- `{"user_id": 1, "topic_id": 1}` (Compound Unique)
- `{"user_id": 1, "subject_id": 1, "status": 1}`

#### Collection: `tasks`
```json
{
  "_id": "ObjectId",
  "user_id": "String (Refers to users._id)",
  "subject_id": "String (Optional)",
  "topic_id": "String (Optional)",
  "title": "String",
  "description": "String",
  "task_type": "String (Enum: 'study', 'revision', 'practice_test', 'assignment', 'lab')",
  "priority": "String (Enum: 'low', 'medium', 'high', 'urgent')",
  "status": "String (Enum: 'pending', 'in_progress', 'completed')",
  "due_date": "ISODate",
  "estimated_minutes": "Integer",
  "completed_at": "ISODate (Optional)",
  "created_at": "ISODate"
}
```
*Indexes:*
- `{"user_id": 1, "status": 1, "due_date": 1}`

---

### 2.5 Career Pathways & Roles

#### Collection: `career_paths` & `career_roles`
```json
// career_paths
{
  "_id": "ObjectId",
  "slug": "String (Unique, e.g. 'class10-intermpc-btechcse')",
  "title": "String (e.g. 'Class 10 -> Intermediate MPC -> BTech CSE')",
  "entry_level_code": "String (e.g. 'school')",
  "intermediate_step_codes": ["String"],
  "target_education_level_code": "String (e.g. 'btech')",
  "target_branch_code": "String (e.g. 'btech_cse')",
  "description": "String",
  "entrance_exams": ["String (e.g. 'JEE Main', 'TS EAMCET', 'AP EAPCET')"],
  "display_order": "Integer"
}
// career_roles
{
  "_id": "ObjectId",
  "role_code": "String (Unique, e.g. 'full_stack_dev', 'ai_ml_engineer', 'cloud_devops')",
  "title": "String (e.g. 'Full Stack Developer')",
  "branch_codes": ["btech_cse", "btech_aiml", "diploma_cme"],
  "summary": "String",
  "core_skills": ["String"],
  "programming_languages": ["String"],
  "frameworks_and_tools": ["String"],
  "learning_roadmap": [
    {
      "phase": "Integer",
      "title": "String",
      "topics": ["String"],
      "recommended_duration_weeks": "Integer"
    }
  ],
  "projects": [
    {
      "tier": "String (Enum: 'beginner', 'intermediate', 'advanced_capstone')",
      "title": "String",
      "description": "String",
      "suggested_tech_stack": ["String"]
    }
  ],
  "internship_preparation_checklist": ["String"],
  "certifications": ["String"],
  "eligibility_notes": "String",
  "industry_insights": "String",
  "is_active": "Boolean"
}
```
*Indexes:*
- `career_paths`: `{"slug": 1}` (Unique)
- `career_roles`: `{"role_code": 1}` (Unique)

---

### 2.6 Quizzes, Bookmarks, and System Logs

#### Collections: `quizzes`, `quiz_attempts`, `bookmarks`, `audit_logs`
- `quizzes`: Subject-tagged practice questions, answer choices, correct index, detailed academic explanation.
- `quiz_attempts`: User score, answers given, pass/fail, timestamps.
- `bookmarks`: Unique compound index on `{"user_id": 1, "item_type": 1, "item_id": 1}` for fast retrieval of saved videos and papers.
- `audit_logs`: Timestamped record of sensitive admin operations (resource verification, content deletion, role modification).
