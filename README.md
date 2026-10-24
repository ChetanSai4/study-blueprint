# Study Blueprint 🎓
> **Plan Your Studies. Track Your Progress. Build Your Future.**

A complete, production-ready educational platform designed specifically for Indian students across School, Intermediate, Diploma/Polytechnic, BTech/BE, and Competitive Examinations.

Built with **Next.js App Router (TypeScript + Tailwind CSS)**, **FastAPI (Python)**, and **MongoDB Atlas**.

---

## 🚀 Key Highlights & Philosophy

- **Zero AI Chatbots / Generative Gimmicks:** Built with strict deterministic engines, real verified academic syllabi, accurate time budgeting, and real student progress tracking.
- **Hierarchical Academic Resource Explorer:** Search across Boards, Universities (JNTUH, CBSE, SBTET, etc.), Branches (CSE, AIML, ECE, EEE, MECH, etc.), Regulations (R18/R20/R22), and Semesters with zero cross-contamination.
- **Verified Curated YouTube Learning Index:** Real, manually curated educational videos from top educators (Neso Academy, Abdul Bari, Telusko, GATE Smashers) mapped down to specific syllabus units and topics.
- **Rule-Based Timetable Planner:** Balanced daily study minutes allocation (e.g., 240 mins across 6 subjects plus breaks) with manual adjustment controls and missed session rescheduling.
- **Precision Study Stopwatch:** Tracks true active study time, excludes pauses, supports recovery from accidental browser closure, and prevents overlapping timers.
- **Live Progress & Consistency Analytics:** Real MongoDB aggregations tracking daily study totals, rolling 7-day volume, subject distribution, and syllabus completion percentages.
- **Interactive Indian Career Roadmaps:** Clear educational pathways (e.g., Class 10 → Inter MPC → BTech CSE → Software Engineer / AI-ML Engineer) with essential skills, beginner-to-advanced project ideas, and realistic career insights.
- **Google Identity Services Only:** Single-button verified Google sign-in with HTTP-only session cookies and role-based access control.

---

## 📁 Repository Structure

```text
study-blueprint/
├── frontend/                     # Next.js App Router (TypeScript, Tailwind, Lucide)
│   ├── app/                      # App router screens ((public), (auth), (student), admin)
│   ├── components/               # Reusable UI & business domain components
│   ├── hooks/                    # Custom React hooks (timer, auth, data fetchers)
│   ├── lib/                      # Utilities, API client, local storage helpers
│   ├── types/                    # Shared TypeScript interfaces & types
│   ├── package.json
│   └── tailwind.config.js
├── backend/                      # Python FastAPI Application
│   ├── app/
│   │   ├── api/v1/               # REST API route handlers
│   │   ├── core/                 # Settings, config, security helpers
│   │   ├── database/             # MongoDB async connection & ODM wrappers
│   │   ├── models/               # Pydantic schemas & document definitions
│   │   ├── services/             # Business logic (timetables, stopwatch, analytics)
│   │   └── main.py               # FastAPI application entrypoint
│   ├── scripts/                  # Idempotent database index & seed scripts
│   ├── tests/                    # Pytest test suite
│   └── requirements.txt
├── docs/                         # Complete Project Documentation
│   ├── PRD.md                    # Product Requirements Document
│   ├── UI_UX_BLUEPRINT.md        # UI/UX design tokens and screen inventory
│   ├── DATABASE_SCHEMA.md        # MongoDB schema, documents & indexes
│   ├── API_SPECIFICATION.md      # REST API endpoints & contract definitions
│   ├── IMPLEMENTATION_PLAN.md    # Phase-by-phase implementation plan
│   ├── TESTING_PLAN.md           # Automated and manual QA strategies
│   ├── SECURITY.md               # Security controls & threat mitigations
│   └── DEPLOYMENT.md             # Atlas & deployment guides
├── .env.example                  # Environment configuration template
└── README.md
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Python 3.9+
- Node.js 18+ & npm
- MongoDB Atlas Free Tier account (or local MongoDB)

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Fill in your MONGODB_URI and GOOGLE_CLIENT_ID

# Seed initial academic catalog, resources, and verified YouTube videos
python3 scripts/seed_database.py

# Launch FastAPI
uvicorn app.main:app --reload --port 8000
```
Open interactive Swagger API docs at `http://localhost:8000/docs`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open application at `http://localhost:3000`.

---

## 🛡️ Security & Privacy
- Verified Google Identity token verification on backend.
- HttpOnly, SameSite secure session cookies.
- Role-Based Access Control (RBAC) protecting administrative resources.
- Input validation on all incoming payloads using Pydantic.
