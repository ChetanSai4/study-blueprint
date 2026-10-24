# Study Blueprint — Product Requirements Document (PRD)

## 1. Executive Summary & Vision

**Product Name:** Study Blueprint  
**Tagline:** Plan Your Studies. Track Your Progress. Build Your Future.  
**Objective:** A complete, production-ready, responsive academic planning, exam preparation, study tracking, educational resource management, and career guidance platform tailored for Indian students.

The platform provides a coherent, end-to-end learning lifecycle addressing six critical student questions:
1. **What should I study?** (Curriculum breakdown, syllabus units, examination roadmaps)
2. **Where can I find verified materials?** (Syllabus copies, previous year papers, model papers, verified YouTube tutorials)
3. **How should I allocate my study hours?** (Deterministic, rule-based timetable generator supporting daily availability, breaks, and exam priorities)
4. **Am I completing my syllabus and staying consistent?** (Precision study stopwatch, manual study logging, syllabus checklist, consistency heatmap, and analytics)
5. **Which educational pathways and careers can I pursue?** (Interactive roadmaps across school, intermediate, diploma, and undergraduate degrees)
6. **What skills, projects, and certifications should I focus on next?** (Curated role profiles with beginner-to-advanced project ideas and verified industry resources)

> **Important Scope Boundary:** In strict accordance with platform specifications, Study Blueprint features **zero AI chatbots, zero generative AI assistants, and zero external LLM dependencies**. All scheduling, revision intervals, quiz evaluations, and analytics run on deterministic, mathematically verifiable rule engines.

---

## 2. Target Audience & Educational Structure

Study Blueprint accommodates the complete Indian academic ecosystem with distinct workflows:

1. **School Education (Classes 6–10):**
   - CBSE, ICSE, and State Boards.
   - Core foundations: Mathematics, Science (Physics/Chemistry/Biology), Social Studies, Languages.
   - Focus: Board exam preparation (Class 10), foundational conceptual mastery.

2. **Intermediate / +2 (Classes 11–12):**
   - Streams: MPC (Maths, Physics, Chemistry), BiPC (Biology, Physics, Chemistry), MEC (Maths, Economics, Commerce), CEC (Civics, Economics, Commerce).
   - State Intermediate Boards (TS BIE, AP BIE, etc.) & CBSE/ISC.
   - Preparation for competitive entrance exams (JEE Main, NEET, State EAMCET/EAPCET).

3. **Diploma & Polytechnic:**
   - Branches: Computer Engineering (CME), Electronics & Communication (ECE), Electrical & Electronics (EEE), Mechanical (ME), Civil (CE).
   - SBTET / State Technical Boards.
   - Core curriculum, laboratory manuals, state polytechnic exam papers, lateral entry (ECET) roadmaps.

4. **BTech / BE Undergraduate Engineering:**
   - Branches: Computer Science & Engineering (CSE), Artificial Intelligence & Machine Learning (AIML), Data Science (DS), Electronics & Communication (ECE), Electrical & Electronics (EEE), Information Technology (IT), Mechanical Engineering (ME), Civil Engineering (CE).
   - Universities: JNTUH, JNTUK, Osmania University, Anna University, VTU, Mumbai University, AKTU, and autonomous colleges.
   - Regulations: R18, R20, R22, CBCS schemes across Semesters 1-1 to 4-2.
   - Semester subjects, unit-wise notes, previous university question papers, lab manuals.

5. **Competitive Examination Aspirants:**
   - Engineering (GATE, JEE Main/Advanced, EAMCET).
   - Government and technical recruitment foundations.

---

## 3. Core Capabilities & Feature Specifications

### 3.1 Public Experience & Authentication
- **Public Showcase:** Hero section, dynamic preview cards showing realistic study schedules and analytics previews, visual breakdown of supported boards/universities, FAQ, and footer.
- **Google Identity Services Only:** Single-button "Continue with Google" OAuth authentication. Token verified cryptographically on the FastAPI backend. No passwords, no phone OTPs, no insecure mock email signups in production.
- **Secure Sessions:** HTTP-only, SameSite, secure cookies with JWT-based session identity.
- **Onboarding Wizard:** 5-step guided flow:
  1. Profile Basics (Google Name, Avatar, Preferred Language)
  2. Education Level Selection
  3. Academic Details (Board/University, Branch, Semester, Academic Regulation, Enrolled Subjects)
  4. Study Habits (Daily available hours, preferred time slots, break intervals, subject difficulty)
  5. Academic Goals (Semester exams, Competitive entrance, Placements/Job-ready skills)

### 3.2 Academic Resource Library
- **Hierarchical Taxonomy:** `Education Level -> Course/Stream -> Board/University -> Branch -> Semester/Class -> Subject -> Unit/Topic -> Resource`.
- **Strict Server-Side Filtering:** Zero frontend cross-contamination; selecting BTech CSE Semester 3 never leaks Class 10 Science resources.
- **Resource Types:** Official Syllabus Copies, Previous Year Question Papers (PYQs), Model Question Papers, Faculty Lecture Notes, Formula Cheat Sheets, Lab Manuals.
- **Metadata Transparency:** Clear tags for verification status, publication date, source contributor, regulation, and file size.
- **Actions:** In-browser viewer preview, secure signed download stream, bookmarking.

### 3.3 YouTube Learning Library
- **Curated Educational Index:** Seeded with genuine, verified educational videos from top Indian and international educators (e.g., Neso Academy, Abdul Bari, Telusko, GATE Smashers, Knowledge Gate).
- **Topic Mapping:** Videos mapped directly down to specific syllabus units and topics (e.g., `BTech -> CSE -> Data Structures -> Trees -> Binary Search Trees`).
- **Student Experience:** Responsive embedded player with external YouTube fallback, language badges (English, Telugu, Hindi), watched status toggle, bookmarking, and "Add to Timetable" action.
- **Admin Management:** Secure portal to submit YouTube URLs, parse YouTube Video ID, validate thumbnail, assign academic taxonomy, preview, and toggle publication state.

### 3.4 Deterministic Study Timetable Planner
- **Rule-Based Allocation Engine:**
  - Input: Available daily study minutes (e.g., 240 mins), enrolled subjects, student difficulty rating (1-5), upcoming examination deadlines.
  - Mathematical Distribution: Weighted proportional allocation guaranteeing sum of session minutes exactly equals target study time without exceeding daily budget.
  - Break Insertion: Configurable break intervals (e.g., 10 mins break every 50 mins study).
- **Interactive Customization:**
  - Subject duration fine-tuning (+/- 15 min increments).
  - Session reordering (drag/shift priority).
  - Day-wise availability masks (e.g., Monday 4 hrs vs Sunday 6 hrs).
  - Exam sprint mode (weights upcoming exams higher as date approaches).
- **Rescheduling Engine:** Mark missed sessions and automatically redistribute them across open revision slots without silently dropping tasks.

### 3.5 Precision Study Tracker
- **Stateful Timer:** Start, Pause, Resume, Stop.
- **Accuracy Guarantee:** Paused duration is deducted from net study time; background clock diffing prevents browser throttle desynchronization.
- **Interruption Recovery:** Local storage & backend sync guarantees that an accidental browser refresh or closure restores the in-progress session with exact elapsed seconds.
- **Audit-Compliant Logging:** Prevents overlapping timers. Supports manual retroactive entry with mandatory start and end timestamps.

### 3.6 Analytics, Tasks & Syllabus Progress
- **Real-Time Analytics:** Daily study chart, 7-day rolling average, subject time distribution doughnut chart, planned vs. actual ratio, consistency streak calendar.
- **Syllabus Mastery Tracker:** Topic-level checkboxes (Not Started, In Progress, Completed, Revised) computing true percentage completion per subject.
- **Rule-Based Revision Scheduler:** Spaced repetition prompts triggered at +1 day, +3 days, and +7 days post-completion.
- **Task Management:** Kanban and list views for homework, lab assignments, project milestones, and mock exams with urgency indicators.
- **Interactive Quizzes:** Topic-wise concept checks with instantaneous backend grading, explanation cards, and score tracking.

### 3.7 Career Roadmaps & Industry Readiness
- **Education-to-Career Bridges:**
  - Example: `Class 10 -> Intermediate MPC -> EAMCET/JEE -> BTech CSE -> Full Stack Developer / AI-ML Engineer`.
  - Diploma lateral entry (ECET) paths to BTech 2nd year.
- **BTech CSE Specializations:** Full Stack Developer, Frontend Engineer, Backend Architect, DevOps/Cloud Specialist, Data Analyst, Machine Learning Practitioner, Cybersecurity Analyst.
- **Career Deep Dives:** Role overview, core technical competencies, programming tools, progressive milestone projects (Beginner, Intermediate, Advanced Capstone), interview readiness checklist, and truthful salary/hiring insights without false job guarantees.

### 3.8 Administration Portal
- Protected RBAC (`role: "admin"`).
- Catalog Management (Add/Edit Universities, Branches, Regulations, Subjects, Topics).
- Resource Moderation (Verify, publish, archive documents).
- YouTube Video Curation (Add video ID, verify link, associate topics).
- Career Pathway Editing.
- Security Audit Log inspection.

---

## 4. Non-Functional Requirements

- **Performance:** Sub-200ms API response time for cached catalog items; Lighthouse performance score > 90 on desktop.
- **Security:** Strict OWASP compliance, NoSQL injection mitigation through Pydantic BSON schemas, HTTP-only secure cookie sessions, role-based authorization guards on every endpoint.
- **Reliability:** Graceful handling of MongoDB offline/reconnecting states; zero client crash on missing video embeds.
- **Accessibility:** WCAG 2.1 AA color contrast compliance, keyboard navigability, semantic HTML landmarks.
