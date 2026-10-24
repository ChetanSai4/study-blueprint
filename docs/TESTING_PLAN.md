# Study Blueprint — Comprehensive Testing Plan & QA Strategy

## 1. Testing Scope & Methodology

This document defines the test automation strategy and manual quality gates for Study Blueprint across all phases.

### Quality Objectives:
1. **Zero Fake State:** Every displayed metric must derive from real database documents or explicit user configuration.
2. **Deterministic Computation:** Timetable generators and study duration calculators must yield mathematical precision (e.g. active study time = ended_at - started_at - paused_duration).
3. **Rigid Security Boundaries:** Unauthenticated requests to protected endpoints return 401; student access to admin endpoints returns 403.
4. **Resilience & Fault Tolerance:** Graceful fallbacks when MongoDB Atlas is offline or YouTube iframe embedding is restricted by third-party policies.

---

## 2. Test Suites & Coverage Requirements

### 2.1 Backend Unit & Integration Tests (Pytest + FastAPI TestClient)

#### 1. Authentication & Security
- `test_google_auth_success`: Validates token signature parsing and user creation.
- `test_google_auth_invalid_token`: Rejects malformed or expired Google tokens with HTTP 401.
- `test_session_cookie_validation`: Verifies protected route access using session cookie.
- `test_admin_rbac_guard`: Ensures non-admin accounts receive HTTP 403 on `/api/v1/admin/*`.

#### 2. Academic Catalog & Resource Filtering
- `test_catalog_hierarchy_cascade`: Validates cascading queries (`education_level -> board -> branch -> semester -> subject`).
- `test_strict_resource_filtering`: Tests that filtering by BTech CSE does not return Intermediate BiPC or Class 10 resources.
- `test_resource_search_and_pagination`: Verifies full-text search and page limits.

#### 3. Curated YouTube Learning
- `test_video_url_validation`: Verifies regex extraction of YouTube video IDs from standard and short URLs.
- `test_video_topic_association`: Ensures video documents map to valid subject and topic IDs.
- `test_video_progress_tracking`: Confirms watched toggle persists for user.

#### 4. Study Timetable Engine
- `test_timetable_allocation_240min`: Verifies that a 240-minute daily budget across 4 subjects is distributed proportionally to 240 minutes without drift.
- `test_break_interval_calculation`: Validates that breaks are scheduled at appropriate intervals without subtracting from study budget.
- `test_manual_allocation_override`: Confirms user overrides update the plan accurately.

#### 5. Precision Study Tracker
- `test_timer_duration_calculation`: Validates net study time deduction when pauses occur.
- `test_overlapping_timer_prevention`: Ensures an active session blocks starting a second concurrent session.
- `test_manual_session_entry_validation`: Rejects future timestamps or negative durations.

#### 6. Analytics & Syllabus Progress
- `test_syllabus_percentage_calculation`: Verifies subject percentage reflects topic status counts accurately.
- `test_analytics_dashboard_aggregation`: Tests 7-day rolling totals and subject distribution calculations.

---

### 2.2 Frontend Unit & Component Tests (Vitest + React Testing Library)

- `GoogleLoginButton.test.tsx`: Tests rendering of Google login button and fallback demo mode.
- `TimetablePlanner.test.tsx`: Tests slider adjustment of daily study minutes and recalculation of session slots.
- `StudyStopwatch.test.tsx`: Tests Start, Pause, Resume, and Stop transitions and UI timer formatting.
- `AcademicFilterBar.test.tsx`: Tests multi-dropdown cascade and reset actions.
- `ResourceCard.test.tsx`: Tests bookmark toggle and download triggers.
- `VideoPlayerModal.test.tsx`: Tests responsive player and YouTube fallback button.

---

### 2.3 End-to-End Test Scenarios (Playwright)

1. **Journey 1: Student Onboarding Flow**
   - User signs in.
   - User navigates through 5 onboarding steps: BTech -> JNTUH -> CSE -> Sem 2-1 -> 4.0 hrs daily study time.
   - User arrives at Dashboard and sees their customized subjects and schedule.

2. **Journey 2: Finding Resources & Watching Topic Video**
   - User navigates to Academic Resources.
   - User filters by Data Structures.
   - User clicks resource detail view and bookmarks the syllabus copy.
   - User navigates to YouTube Learning, selects "Trees", and plays the Abdul Bari BST video.

3. **Journey 3: Timetable Generation & Stopwatch Tracking**
   - User navigates to Study Planner.
   - User generates a 240-minute timetable.
   - User clicks "Start Timer" for Data Structures.
   - Timer runs, pauses for 5 seconds, resumes, and stops.
   - Completed session appears on Dashboard analytics.

4. **Journey 4: RBAC Security Enforcement**
   - Logged-in student tries to navigate directly to `/admin`.
   - Application redirects to unauthorized page or dashboard with warning alert.
