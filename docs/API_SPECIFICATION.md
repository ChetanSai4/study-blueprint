# Study Blueprint — REST API Specification (`/api/v1`)

## 1. Standards & Conventions

- **Base URL:** `/api/v1`
- **Data Format:** JSON (`application/json`)
- **Authentication:** HTTP-only session cookie containing signed JWT token or Bearer token header (`Authorization: Bearer <token>`).
- **Authorization Enforcement:** FastAPI dependencies `get_current_user` and `require_admin_role`.
- **Response Format:**
  - Success responses return typed payloads.
  - Paginated responses return `{ "items": [...], "total": int, "page": int, "limit": int, "has_next": bool }`.
  - Errors return RFC 7807 compliant JSON: `{ "detail": "Human-readable explanation", "error_code": "STRING_CODE" }`.

---

## 2. Authentication & Student Profile Endpoints

### 2.1 `GET /api/v1/auth/google/config`
- **Access:** Public
- **Description:** Returns the configured Google OAuth Client ID for frontend GIS button rendering.
- **Response 200:**
```json
{
  "client_id": "string",
  "is_configured": true
}
```

### 2.2 `POST /api/v1/auth/google`
- **Access:** Public
- **Description:** Verifies Google Identity Services ID token on the backend, finds or creates user record, and issues a secure session cookie.
- **Request Body:**
```json
{
  "credential": "string (Google JWT credential string)"
}
```
- **Response 200:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "display_name": "string",
    "avatar_url": "string",
    "role": "student | admin",
    "is_onboarded": false
  },
  "access_token": "string"
}
```

### 2.3 `POST /api/v1/auth/demo-login` (Development & Evaluation Aid)
- **Access:** Public (Active when configured or in development mode)
- **Description:** Allows evaluating student and admin personas directly.
- **Request Body:**
```json
{
  "role": "student | admin"
}
```

### 2.4 `POST /api/v1/auth/logout`
- **Access:** Authenticated
- **Description:** Clears the HTTP-only session cookie.
- **Response 200:** `{ "message": "Successfully logged out" }`

### 2.5 `GET /api/v1/auth/me`
- **Access:** Authenticated
- **Description:** Returns the currently active session user.
- **Response 200:**
```json
{
  "id": "string",
  "email": "string",
  "display_name": "string",
  "avatar_url": "string",
  "role": "student | admin",
  "is_onboarded": true
}
```

### 2.6 `GET /api/v1/profile`
- **Access:** Authenticated (Student/Admin)
- **Description:** Fetches current student academic profile and preferences.
- **Response 200:** Detailed student profile object.

### 2.7 `PUT /api/v1/profile`
- **Access:** Authenticated (Student/Admin)
- **Description:** Updates academic details, daily study budget, break intervals, and subject priorities.
- **Request Body:** Partial or complete profile fields.

---

## 3. Academic Catalog & Hierarchy Endpoints

### 3.1 `GET /api/v1/catalog/education-levels`
- **Access:** Public
- **Response 200:** List of supported education levels (School, Intermediate, Diploma, BTech, Competitive).

### 3.2 `GET /api/v1/catalog/boards-universities`
- **Access:** Public
- **Query Params:** `education_level` (e.g. `btech`)
- **Response 200:** List of boards/universities (JNTUH, CBSE, etc.).

### 3.3 `GET /api/v1/catalog/branches`
- **Access:** Public
- **Query Params:** `education_level`
- **Response 200:** List of branches (CSE, AIML, ECE, MPC, CME, etc.).

### 3.4 `GET /api/v1/catalog/subjects`
- **Access:** Public / Filtered
- **Query Params:** `education_level`, `board_or_university`, `branch`, `semester`, `regulation`
- **Response 200:** Array of matching subjects with codes and names.

### 3.5 `GET /api/v1/catalog/subjects/{subject_id}/units`
- **Access:** Public
- **Response 200:** Units and syllabus topics under the specified subject.

---

## 4. Academic Resources Endpoints

### 4.1 `GET /api/v1/resources`
- **Access:** Public / Authenticated
- **Query Params:**
  - `education_level`: string
  - `board_or_university`: string
  - `branch`: string
  - `semester`: integer
  - `subject_id`: string
  - `resource_type`: `syllabus | previous_paper | model_paper | notes | formula_sheet`
  - `search`: string
  - `page`: integer (default 1)
  - `limit`: integer (default 20)
- **Response 200:** Paginated list of verified resources.

### 4.2 `GET /api/v1/resources/{resource_id}`
- **Access:** Public / Authenticated
- **Response 200:** Resource detail view with related topics, papers, and videos.

### 4.3 `POST /api/v1/resources/{resource_id}/bookmark`
- **Access:** Authenticated
- **Response 200:** `{ "bookmarked": true }`

### 4.4 `DELETE /api/v1/resources/{resource_id}/bookmark`
- **Access:** Authenticated
- **Response 200:** `{ "bookmarked": false }`

---

## 5. YouTube Learning Library Endpoints

### 5.1 `GET /api/v1/videos`
- **Access:** Public / Authenticated
- **Query Params:**
  - `subject_id`: string
  - `topic_id`: string
  - `language`: `en | te | hi`
  - `difficulty`: `beginner | intermediate | advanced`
  - `page`: integer
  - `limit`: integer
- **Response 200:** List of curated videos.

### 5.2 `POST /api/v1/videos/{video_id}/progress`
- **Access:** Authenticated
- **Request Body:** `{ "watched": true }`
- **Response 200:** Updated watch status.

### 5.3 `POST /api/v1/admin/videos` (Admin Only)
- **Access:** Admin Role
- **Request Body:**
```json
{
  "youtube_url": "string",
  "title": "string",
  "channel_name": "string",
  "subject_id": "string",
  "unit_id": "string (optional)",
  "topic_id": "string (optional)",
  "language": "en | te | hi",
  "difficulty_level": "beginner | intermediate | advanced"
}
```
- **Response 201:** Created video document.

---

## 6. Study Timetable & Tracker Endpoints

### 6.1 `GET /api/v1/study-plans/current`
- **Access:** Authenticated
- **Response 200:** Active daily and weekly timetable allocations.

### 6.2 `POST /api/v1/study-plans/generate`
- **Access:** Authenticated
- **Description:** Deterministic rule engine calculating proportional study blocks.
- **Request Body:**
```json
{
  "available_daily_minutes": 240,
  "break_minutes": 10,
  "study_interval_minutes": 50,
  "subject_ids": ["string"],
  "subject_difficulties": { "<subject_id>": 4 }
}
```
- **Response 200:** Generated schedule with balanced minutes and break slots.

### 6.3 `PUT /api/v1/study-plans/current`
- **Access:** Authenticated
- **Description:** Saves user manual overrides, duration adjustments, and reordered sessions.

### 6.4 `POST /api/v1/study-sessions`
- **Access:** Authenticated
- **Description:** Creates a completed or in-progress study session.
- **Request Body:**
```json
{
  "subject_id": "string",
  "topic_id": "string (optional)",
  "task_description": "string",
  "started_at": "string (ISO)",
  "ended_at": "string (ISO)",
  "duration_seconds": 3600,
  "paused_duration_seconds": 300,
  "session_type": "timer | manual",
  "session_notes": "string"
}
```
- **Response 201:** Logged session record.

### 6.5 `GET /api/v1/study-sessions`
- **Access:** Authenticated
- **Query Params:** `start_date`, `end_date`, `subject_id`, `limit`
- **Response 200:** List of historical study sessions.

---

## 7. Syllabus Progress, Tasks & Analytics Endpoints

### 7.1 `GET /api/v1/progress/syllabus`
- **Access:** Authenticated
- **Query Params:** `subject_id`
- **Response 200:** Subject-level and topic-level completion percentages.

### 7.2 `PUT /api/v1/progress/topics/{topic_id}`
- **Access:** Authenticated
- **Request Body:**
```json
{
  "status": "not_started | in_progress | completed | revised",
  "confidence_level": 4
}
```

### 7.3 `GET /api/v1/tasks`
- **Access:** Authenticated
- **Query Params:** `status`, `priority`
- **Response 200:** Tasks list.

### 7.4 `POST /api/v1/tasks`
- **Access:** Authenticated
- **Request Body:** Task payload (title, priority, due date, subject).

### 7.5 `GET /api/v1/analytics/dashboard`
- **Access:** Authenticated
- **Response 200:** Consolidated analytics:
  - `today_study_minutes`: integer
  - `weekly_study_minutes`: integer
  - `planned_vs_actual_ratio`: float
  - `syllabus_completion_rate`: float
  - `streak_days`: integer
  - `subject_time_distribution`: array of `{ subject_name, minutes }`
  - `daily_history_7d`: array of `{ date, minutes }`

---

## 8. Career Guidance Endpoints

### 8.1 `GET /api/v1/careers/pathways`
- **Access:** Public
- **Query Params:** `entry_level`, `target_level`, `branch`
- **Response 200:** List of academic career pathways (e.g. Class 10 → Inter MPC → BTech CSE).

### 8.2 `GET /api/v1/careers/roles`
- **Access:** Public
- **Query Params:** `branch_code`
- **Response 200:** Roles list (Full Stack Developer, AI/ML Engineer, etc.).

### 8.3 `GET /api/v1/careers/roles/{role_code}`
- **Access:** Public
- **Response 200:** Full role roadmap, essential skills, tiered projects, and certifications.

---

## 9. Admin Endpoints

### 9.1 `GET /api/v1/admin/overview`
- **Access:** Admin Only
- **Response 200:** Platform totals (users, resources, videos, active sessions).

### 9.2 `POST /api/v1/admin/resources`
- **Access:** Admin Only
- **Description:** Creates verified academic resource records.

### 9.3 `GET /api/v1/admin/audit-logs`
- **Access:** Admin Only
- **Response 200:** List of security audit logs.
