# Study Blueprint — Phase-by-Phase Implementation Plan

## 1. Roadmap & Phase Summary

| Phase | Title | Key Deliverables | Status |
|---|---|---|---|
| **Phase 0** | Workspace Inspection & Architecture Planning | PRD, UI/UX Blueprint, Database Schema, API Spec, Implementation Plan, Testing Plan, Security, Deployment | **In Progress** |
| **Phase 1** | Foundation, Design System & App Shell | Next.js App Router, Tailwind CSS, Lucide Icons, FastAPI backend setup, Base layouts, Public landing page | Queued |
| **Phase 2** | MongoDB Atlas & Google Auth | Asynchronous MongoDB connection, Indexes, Google Identity verification, Session tokens, Profile onboarding wizard | Queued |
| **Phase 3** | Academic Catalog & Resource Library | Hierarchical models (Level -> Board -> Branch -> Semester -> Subject -> Unit -> Topic), Multi-filter search, Resource viewer & downloads, Bookmarks | Queued |
| **Phase 4** | Curated YouTube Learning Library | Seeded verified educational videos, Topic-level mapping, Video player with external fallback, Watch progress tracking, Admin video management | Queued |
| **Phase 5** | Deterministic Study Timetable & Tracker | 240-min allocation scenario, Proportional weighting engine, Break slots, Manual schedule editor, Stateful study stopwatch, Session recovery, Overlap prevention | Queued |
| **Phase 6** | Dashboard, Real Analytics, Tasks & Revision | Real MongoDB aggregation dashboard, Subject time distribution, Syllabus checklist, Spaced repetition triggers, Task management, Practice quizzes | Queued |
| **Phase 7** | Interactive Career Pathways & Roadmaps | Stream-to-career path bridges (Class 10 -> Inter MPC -> BTech CSE), Roles deep-dives (Full Stack, AI/ML, Cloud/DevOps), Tiered projects, Skill checklists | Queued |
| **Phase 8** | Administration & Security Auditing | Protected Admin RBAC, Catalog & Resource moderation, Video management, Audit logging | Queued |
| **Phase 9** | Comprehensive QA, Tests & Release Verification | Vitest unit tests, Pytest backend test suite, Responsive layout verification, Security checks, Deployment documentation | Queued |

---

## 2. Phase-by-Phase Workflows and Acceptance Criteria

### Phase 1: Foundation & App Shell
- Initialize Next.js frontend with Tailwind CSS and responsive layout shell.
- Initialize Python FastAPI backend with Pydantic settings, CORS, and unified router structure.
- Build the public landing page with real feature showcases, interactive preview cards, FAQ, and footer.
- **Acceptance:** Frontend builds without TypeScript or ESLint errors; FastAPI boots and passes `/health` check.

### Phase 2: MongoDB Atlas & Google Auth
- Configure asynchronous MongoDB driver (`motor` / `pymongo.asynchronous`).
- Implement Google token verification using `google-auth` / OAuth2 ID token verification.
- Implement session cookies and fallback evaluation login mode for testing.
- Build the 5-step onboarding wizard for student academic setup.
- **Acceptance:** Google credentials or demo auth generate authenticated sessions; onboarding saves profile to MongoDB.

### Phase 3: Academic Catalog & Resources
- Seed comprehensive initial academic catalog (School, Intermediate, Diploma, BTech branches CSE/AIML/ECE/EEE/MECH, Competitive).
- Build multi-level filtering resource explorer.
- **Acceptance:** Selecting BTech CSE Sem 2-1 strictly displays CS301PC Data Structures resources without unrelated leaks.

### Phase 4: Curated YouTube Learning Library
- Seed verified educational links from legitimate Indian and international channels (Neso Academy, Abdul Bari, Telusko, GATE Smashers).
- Implement video viewer with responsive iframe embed and YouTube link fallback.
- **Acceptance:** YouTube video IDs are validated; watch status updates in real time.

### Phase 5: Deterministic Timetable & Tracker
- Build the rule-based allocation algorithm (e.g. allocating 240 mins across 6 subjects plus breaks).
- Implement the study stopwatch with start, pause, resume, stop, and local storage recovery.
- **Acceptance:** Active study time excludes pause duration; no overlapping sessions can be created.

### Phase 6: Dashboard, Real Analytics & Tasks
- Build dashboard displaying real user analytics from MongoDB.
- Build syllabus checklist with subject percentage calculations.
- Implement tasks list with revision schedules.
- **Acceptance:** Empty profiles display clean onboarding states; completed sessions immediately reflect in charts.

### Phase 7: Career Roadmaps
- Build career explorer bridging Class 10 → Inter MPC → BTech CSE.
- Detail roles: Full Stack Developer, AI/ML Engineer, Cloud/DevOps, Data Analyst.
- **Acceptance:** Clear skill roadmaps, beginner-to-advanced project ideas, and realistic career guidance.

### Phase 8: Admin Portal
- Admin-only routes for video creation, resource moderation, and audit logs.
- **Acceptance:** Ordinary students cannot access or execute admin operations.

### Phase 9: Testing, Hardening & Final Report
- Run backend pytest suite and frontend Vitest suite.
- Verify mobile, tablet, and desktop layouts.
- Finalize all documentation.
