# STUDY BLUEPRINT — FULL WEBSITE DOCUMENTATION & REVIEW MANUAL
## Complete Academic Operating System & B.Tech Engineering Architecture Platform

---

### **Document Control & Academic Metadata**
- **Project Title:** Study Blueprint: Autonomous Multi-Tier Academic Operating System & 4-Year B.Tech Engineering Architecture Platform
- **Document Type:** Comprehensive Website Technical Documentation, System Architecture Manual & Faculty Review Dossier
- **Candidate Name:** Chetan Sai
- **Academic Regulations:** JNTU-GV & Autonomous Engineering Colleges (R23 / R20 Curricular Regulations)
- **Academic Year:** 2026 – 2027
- **Repository Location:** `/Users/chetansai/study blueprint`
- **Frontend Target:** Next.js 14 (App Router) + TypeScript + Tailwind CSS (Port 3000)
- **Backend Target:** FastAPI (Python 3.11) + Uvicorn ASGI Server (Port 8000)
- **Design System:** Google Stitch MCP Engine — "Blueprint Precision Engine"
- **Review Date:** October 25, 2026

---

## TABLE OF CONTENTS
1. [Executive Summary & System Vision](#1-executive-summary--system-vision)
2. [Complete Repository & File Structure Map](#2-complete-repository--file-structure-map)
3. [Technology Stack & Environment Configuration](#3-technology-stack--environment-configuration)
4. [Design System: Stitch "Blueprint Precision Engine"](#4-design-system-stitch-blueprint-precision-engine)
5. [Complete Functional Modules Breakdown](#5-complete-functional-modules-breakdown)
   - [5.1 Module 1: Career Roadmaps & 5-Phase Architecture Flow](#51-module-1-career-roadmaps--5-phase-architecture-flow)
   - [5.2 Module 2: Study Planner & Student Self-Analysis Dashboard](#52-module-2-study-planner--student-self-analysis-dashboard)
   - [5.3 Module 3: B.Tech University Syllabus & Lab Manual Bank](#53-module-3-btech-university-syllabus--lab-manual-bank)
   - [5.4 Module 4: High-Performance Focus Room](#54-module-4-high-performance-focus-room)
   - [5.5 Secondary & Intermediate Flowcharts](#55-secondary--intermediate-flowcharts)
6. [Complete REST API Specification](#6-complete-rest-api-specification)
7. [Database Schemas & Type Contracts](#7-database-schemas--type-contracts)
8. [Verified Local Curricular Document Bank](#8-verified-local-curricular-document-bank)
9. [Deployment, Build & Execution Guide](#9-deployment-build--execution-guide)
10. [Verification & Quality Assurance Matrix](#10-verification--quality-assurance-matrix)
11. [College Viva & Evaluator Review Guide](#11-college-viva--evaluator-review-guide)
12. [Project Conclusion & Future Enhancements](#12-project-conclusion--future-enhancements)

---

## 1. EXECUTIVE SUMMARY & SYSTEM VISION

### 1.1 The Academic Dilemma in Indian Engineering
Engineering education in India represents one of the largest technical talent pipelines globally. However, undergraduate engineering students face a profound structural disconnect:
1. **Curricular Abstraction:** Syllabus regulations like **JNTU-GV R23 and R20** list theoretical courses (e.g., *Linear Algebra, Vector Calculus, Electric Circuit Analysis, Electromagnetic Fields*) without illustrating their direct mapping to real-world engineering simulation toolchains or industrial hardware systems.
2. **Career Ambiguity:** Students frequently reach their 3rd or 4th year without clarity regarding their career divergence options—whether to prepare for **Central PSUs via GATE (e.g., PGCIL, NTPC, BHEL)**, specialize in **Electric Vehicles & Power Electronics (Tesla, Ather, Schneider)**, master **Automation & SCADA (Siemens, Honeywell)**, or transition into **Software Engineering**.
3. **Habit & Focus Fragmentation:** Students attempt to organize their studies using generic to-do list applications or paper notebooks that lack timetable auto-balancing, focus efficiency metrics, and integrated concentration stopwatches.
4. **The "Broken Link" Crisis:** Official university portals and autonomous college websites frequently host syllabi, previous year questions (PYQs), and laboratory manuals behind broken links or mandatory credential gates.

### 1.2 The Study Blueprint Solution
**Study Blueprint** is an open-access, zero-login **Academic Operating System (OS)** engineered from the ground up for Indian students. It bridges autonomous college curricular regulations with industry placement engineering realities.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          STUDY BLUEPRINT                               │
│              Indian Student Academic Operating System                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
    ▼                               ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
│ 1. CAREER ROADMAPS    │       │ 2. STUDY PLANNER      │       │ 3. BTECH RESOURCES    │
│ & ARCHITECTURE FLOW   │       │ & SELF-ANALYSIS       │       │ CURRICULAR BANK       │
│ • 6 B.Tech Branches   │       │ • 4 KPI Metrics       │       │ • JNTU-GV, AU, JNTUK  │
│ • 5-Phase Pipeline    │       │ • Timetable Engine    │       │ • 22 Verified PDFs    │
│ • Toolchain Mapping   │       │ • Live Stopwatch      │       │ • In-Page Preview     │
│ • 4 Placement Demux   │       │ • Deep Work Cadence   │       │ • Zero 404 Links      │
└───────────────────────┘       └───────────────────────┘       └───────────────────────┘
```

---

## 2. COMPLETE REPOSITORY & FILE STRUCTURE MAP

The workspace at `/Users/chetansai/study blueprint` follows a clean, modular structure:

```
study blueprint/
├── package.json                         # Root build orchestrator (proxies dev/build/start to frontend)
├── README.md                            # High-level repository overview
├── .env.example                         # Environment variable blueprint
│
├── frontend/                            # Next.js 14 App Router Application
│   ├── package.json                     # Frontend dependencies (React 18, Next 14, Lucide, Tailwind)
│   ├── tsconfig.json                    # TypeScript compiler configuration & path aliases (@/*)
│   ├── tailwind.config.js               # Tailwind CSS with Stitch design tokens
│   ├── next.config.js                   # Next.js build and optimization settings
│   │
│   ├── app/                             # Next.js 14 App Router Directory
│   │   ├── layout.tsx                   # Master Root Layout (Geist + Inter fonts, Material Symbols)
│   │   ├── globals.css                  # Global CSS styles & custom scrollbars
│   │   ├── page.tsx                     # Main Homepage (Unified Stitch Canvas interface)
│   │   ├── careers/page.tsx             # Dedicated Career Roadmaps Portal
│   │   ├── study-planner/page.tsx       # Dedicated Study Timetable Planner
│   │   ├── study-tracker/page.tsx       # Dedicated Precision Habit Tracker
│   │   ├── resources/page.tsx           # Dedicated B.Tech Curricular Resource Bank
│   │   ├── dashboard/page.tsx           # Comprehensive Student Analytics Cockpit
│   │   ├── tasks/page.tsx               # Task & Assignment Checklist Engine
│   │   ├── videos/page.tsx              # Curated Technical Lecture Video Hub
│   │   ├── profile/page.tsx             # Student Academic Profile & Target Manager
│   │   ├── onboarding/page.tsx          # Initial Student Academic Stream Setup
│   │   ├── login/page.tsx               # Optional Authentication Interface
│   │   └── admin/page.tsx               # Administrator Curricular Content Manager
│   │
│   ├── components/                      # Reusable UI & Layout Components
│   │   ├── layout/                      # Application Shell, Navigation & Sidebar
│   │   ├── careers/                     # Architecture Flow, Branch Roadmap & Timeline Components
│   │   │   └── BTechBranchRoadmapView.tsx # 5-Phase Architecture Flow Component
│   │   ├── planner/                     # Timetable Grid, Session Modal & Schedule Engine
│   │   └── tracker/                     # Stopwatches, Streak Counters & Analytics Meters
│   │
│   ├── lib/                             # Core Data Structures & API Clients
│   │   ├── api.ts                       # Axios / Fetch client connecting to FastAPI backend
│   │   ├── btechBranchRoadmaps.ts       # Master Curricular Dataset for 6 B.Tech Branches
│   │   └── utils.ts                     # Utility functions (time formatting, date calculations)
│   │
│   └── public/                          # Static Assets & Verified Curricular Documents
│       └── docs/                        # 22 Verified Static Curricular PDFs (Zero 404 links)
│           ├── academic_blueprint.pdf
│           ├── jntugv_eee_eca.pdf       # EEE Circuit Analysis Official Syllabus
│           ├── jntugv_eee_machines_pyq.pdf # EEE Machines PYQ Bank
│           ├── jntuk_eee_bee_lab_manual.pdf # EEE BEE Laboratory Manual
│           ├── jntugv_cse_linear_algebra_m1.pdf # CSE Linear Algebra Syllabus
│           ├── jntugv_cse_pps_lab_manual.pdf
│           ├── jntuk_cse_dsa_pyq.pdf
│           ├── jntugv_ece_edc.pdf       # ECE Semiconductor Devices Syllabus
│           ├── jntugv_ece_network_analysis.pdf
│           ├── jntuk_ece_edc_lab_manual.pdf
│           ├── jntugv_aiml_foundations.pdf # AIML Foundations Syllabus
│           ├── jntuk_aiml_lab_manual.pdf
│           ├── au_aiml_exam_papers.pdf
│           ├── jntugv_mech_engineering_mechanics.pdf
│           ├── jntugv_mech_thermodynamics.pdf
│           ├── jntuk_mech_cad_drafting_manual.pdf
│           ├── au_mech_fluid_mechanics.pdf
│           ├── jntuh_mech_kinematics_machinery.pdf
│           ├── jntugv_civil_strength_materials.pdf
│           ├── jntugv_civil_surveying.pdf
│           ├── jntuk_civil_surveying_lab.pdf
│           └── au_civil_concrete_tech.pdf
│
├── backend/                             # FastAPI Modern Microservices Backend
│   ├── requirements.txt                 # Python dependencies (FastAPI, Uvicorn, Pydantic, Motor)
│   ├── venv/                            # Isolated Python virtual environment
│   └── app/
│       ├── main.py                      # FastAPI application entry point, CORS & route registry
│       ├── config.py                    # Environment configurations (JWT secrets, MongoDB URI)
│       ├── api/v1/                      # Modular API Route Controllers
│       │   ├── auth.py                  # Authentication & token verification endpoints
│       │   ├── profile.py               # Student profile and academic preference routes
│       │   ├── planner.py               # Study timetable and schedule allocation routes
│       │   ├── tracker.py               # Focus stopwatch and study streak routes
│       │   ├── resources.py             # Curricular resource repository routes
│       │   ├── careers.py               # Career roadmap and branch pathway routes
│       │   ├── analytics.py             # Focus rate and consistency analytics routes
│       │   ├── videos.py                # Curated lecture video endpoints
│       │   └── admin.py                 # Administrative data curation endpoints
│       └── database/
│           └── mongodb.py               # MongoDB asynchronous connection engine
│
└── docs/                                # Technical Documentation & Architecture Artifacts
    ├── COLLEGE_PROJECT_DOCUMENTATION.md # Complete Markdown Project Report for Submission
    ├── COLLEGE_PROJECT_REPORT.html      # Printable / PDF-Ready Academic Report
    ├── PRD.md                           # Product Requirement Document
    ├── API_SPECIFICATION.md             # REST API specifications and contracts
    ├── DATABASE_SCHEMA.md               # MongoDB collections & document schemas
    ├── UI_UX_BLUEPRINT.md               # Visual design tokens & layout guidelines
    ├── IMPLEMENTATION_PLAN.md           # Engineering implementation roadmap
    ├── TESTING_PLAN.md                  # Test suites, test cases & QA matrix
    ├── SECURITY.md                      # Security boundaries, headers & data protection
    └── DEPLOYMENT.md                    # Production deployment instructions
```

---

## 3. TECHNOLOGY STACK & ENVIRONMENT CONFIGURATION

### 3.1 Technology Matrix
- **Frontend Framework:** Next.js 14.2.15 (React 18.3, App Router Architecture)
- **Styling Architecture:** Tailwind CSS 3.4 with custom design tokens
- **Typography:** Google Fonts (`Geist` for metrics/headings, `Inter` for curriculum reading)
- **Iconography:** Google Material Symbols Outlined + Lucide React Icons
- **Backend Framework:** FastAPI 0.110.0 (Python 3.11.9)
- **ASGI Server:** Uvicorn 0.28.0 with hot-reload enabled
- **Database Engine:** MongoDB (via Motor async driver) + In-Memory Fallback
- **Data Validation:** Pydantic v2 (Strict Schema Serialization)
- **Document Viewing:** HTML5 Iframe Sandbox + Native PDF Streaming

### 3.2 Environment Variables Configuration (`.env`)
```bash
# Frontend Environment
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME="Study Blueprint"
NEXT_PUBLIC_REGULATION_DEFAULT="R23"

# Backend Environment
ENVIRONMENT=development
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=["http://localhost:3000","http://127.0.0.1:3000"]
MONGODB_URL=mongodb://localhost:27017/study_blueprint
JWT_SECRET_KEY=study_blueprint_production_secret_key_2026
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

---

## 4. DESIGN SYSTEM: STITCH "BLUEPRINT PRECISION ENGINE"

The user interface was crafted in collaboration with the Google **Stitch MCP Engine** (Project: *StudyBlueprint UI/UX Redesign*, Canvas ID: `15377756584866006475`):

### 4.1 Color Tokens
```css
/* Stitch Blueprint Precision Engine Tokens */
--color-primary: #3525cd;            /* Main CTA, active tabs, milestone markers */
--color-primary-container: #4f46e5;  /* Elevated brand capsules */
--color-secondary: #00687a;          /* Technical badges, regulation tags */
--color-secondary-container: #06b6d4;/* Active timer counters, pulse rings */
--color-surface: #f8f9ff;            /* Clean canvas background */
--color-surface-container-low: #eff4ff; /* Sub-card background */
--color-surface-container: #e5eeff;  /* Navigation pill backdrop */
--color-surface-container-high: #dce9ff; /* Active borders & hover states */
--color-on-surface: #0b1c30;         /* Primary high-contrast text */
--color-on-surface-variant: #464555; /* Secondary text, metadata codes */
```

### 4.2 Typography Hierarchy
- **Display Hero (`40px`, bold, line-height `48px`, letter-spacing `-0.03em`):** Main page headlines (`Geist`).
- **Headline Medium (`20px`, bold, line-height `28px`):** Module headers and branch titles (`Geist`).
- **Body Large (`16px`, regular, line-height `26px`):** Overview descriptions (`Inter`).
- **Label Code (`11px`, medium, line-height `16px`, letter-spacing `0.04em`):** Regulation tags, course codes (`Geist Mono`).

---

## 5. COMPLETE FUNCTIONAL MODULES BREAKDOWN

### 5.1 Module 1: Career Roadmaps & 5-Phase Architecture Flow

When a user selects a branch (e.g., **Electrical & Electronics Engineering - EEE**), the system renders an end-to-end 5-phase engineering pipeline:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 01: Foundational Modeling & Circuit Laws (Year 1)                │
│ Inputs: +2 MPC Physics & Calculus                                      │
│ Modules: Math-1, Circuit Analysis (ECA), Applied Physics, C-Prog, CAD  │
│ Toolchains: LTspice, MATLAB Basic Scripts, Tinkercad Circuits          │
│ Milestone: Thevenin/Norton Theorem Breadboard Verification with DSO    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Pipeline Flow)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 02: Electromagnetic Energy & Rotating Machines Bus (Year 2)      │
│ Inputs: Circuit Analysis & Maxwell EMF Equations                       │
│ Modules: DC Machines & Transformers, AC Machines, EMF, Analog Circuits │
│ Toolchains: MATLAB/Simulink (Simscape), Ansys Maxwell (FEA), PSpice    │
│ Milestone: OC/SC Transformer Efficiency & DC Motor 3-Point Starter     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Pipeline Flow)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 03: Power Converter Processing & Linear Control Core (Year 3)    │
│ Inputs: AC Machines Dynamics & Laplace Transform Stability             │
│ Modules: Power Electronics (MOSFET/IGBT), Power Systems (PS1/PS2), PID │
│ Toolchains: ETAP (Load Flow & Faults), PSCAD Transients, Keil uVision  │
│ Milestone: Closed-Loop DC-DC Buck/Boost Converter with PWM Driver      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Pipeline Flow)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 04: EV Powertrains, Smart Grid & Automation Engine (Year 4)       │
│ Inputs: Power Converters, Grid Faults & Microcontrollers               │
│ Modules: EV Drivetrains, Battery Management Systems, PLC/SCADA, Solar  │
│ Toolchains: Siemens TIA Portal, DIgSILENT, Simscape Battery & Driveline│
│ Milestone: Complete EV Battery Management System (BMS) with CAN Bus    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Demux Gateway)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 05: Output Career Placement Architecture & Gateways              │
│ ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────┐ │
│ │ Track A: PSUs & GATE │  │ Track B: EV & Power  │  │ Track C: SCADA │ │
│ │ PGCIL, NTPC, BHEL    │  │ Tesla, Ather, Bosch  │  │ Siemens, L&T   │ │
│ └──────────────────────┘  └──────────────────────┘  └────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

#### Detailed Breakdown of All 6 Supported Engineering Disciplines:

#### 1. Electrical & Electronics Engineering (EEE)
- **Tagline:** Power Systems, Electric Vehicle (EV) Drivetrains, Smart Grids & Industrial Automation
- **Regulation:** JNTU-GV R23 / R20 Standard (160 Credits)
- **CTC Benchmarks:** Average: ₹6.2 LPA – ₹9.5 LPA | Highest: ₹22.5 LPA (Tesla / Schneider / Texas Instruments)
- **Official Syllabus Copy:** `/docs/jntugv_eee_eca.pdf`
- **Key Toolchains:** MATLAB/Simulink, LTspice, ETAP (Load Flow & Short Circuit), PSCAD Transients, Ansys Maxwell FEA, Siemens TIA Portal
- **Phase 05 Placement Tracks:**
  - *Track A:* Central PSUs (PGCIL, NTPC, BHEL, ISRO, NPCIL, APTRANSCO)
  - *Track B:* Electric Vehicles & Power Electronics (Tesla, Ather Energy, Schneider Electric, ABB Group, Bosch)
  - *Track C:* Industrial Automation & Robotics (Siemens, Rockwell Automation, Honeywell, L&T Electrical)
  - *Track D:* High-Growth Software & SDE (C++ Firmware, Data Engineering, Tech MNCs)

#### 2. Electronics & Communication Engineering (ECE)
- **Tagline:** VLSI Chip Design, Embedded Microarchitectures, Edge AI & Wireless Telecom
- **CTC Benchmarks:** Average: ₹7.2 LPA – ₹11.0 LPA | Highest: ₹34.0 LPA (Qualcomm / Nvidia / Texas Instruments)
- **Official Syllabus Copy:** `/docs/jntugv_ece_edc.pdf`
- **Key Toolchains:** Cadence Virtuoso, Synopsys Design Compiler, Xilinx Vivado (Verilog/VHDL), Keil uVision, MATLAB Signal Processing
- **Phase 05 Placement Tracks:**
  - *Track A:* Semiconductor & VLSI ASIC Design (Qualcomm, Nvidia, Intel, AMD, MediaTek)
  - *Track B:* Embedded Systems & IoT (Bosch, Continental, Texas Instruments)
  - *Track C:* Telecom & RF Engineering (Jio 5G, Ericsson, Nokia, DRDO/ISRO)
  - *Track D:* Systems Software & Linux Kernel Development

#### 3. Computer Science & Engineering (CSE)
- **Tagline:** Distributed Systems, Cloud Architecture, Full-Stack Engineering & Scalable Microservices
- **CTC Benchmarks:** Average: ₹8.5 LPA – ₹14.0 LPA | Highest: ₹44.0 LPA (Google / Microsoft / Amazon)
- **Official Syllabus Copy:** `/docs/jntugv_cse_linear_algebra_m1.pdf`
- **Key Toolchains:** Docker, Kubernetes, AWS/GCP, Git/GitHub, Linux Bash, PostgreSQL, Redis, Postman
- **Phase 05 Placement Tracks:**
  - *Track A:* Product Software Engineering (Google, Microsoft, Amazon, Atlassian)
  - *Track B:* Cloud & DevOps Engineering (AWS, GCP, RedHat, HashiCorp)
  - *Track C:* Enterprise Systems Architecture (TCS Digital, Cognizant GenC, Infosys DSE)
  - *Track D:* High-Frequency Trading & Systems Programming

#### 4. Artificial Intelligence & Machine Learning (AIML)
- **Tagline:** Deep Neural Architectures, Large Language Models (LLMs), Computer Vision & Production Inference
- **CTC Benchmarks:** Average: ₹9.0 LPA – ₹15.5 LPA | Highest: ₹48.0 LPA (OpenAI / Meta / Nvidia AI)
- **Official Syllabus Copy:** `/docs/jntugv_aiml_foundations.pdf`
- **Key Toolchains:** PyTorch, TensorFlow, Hugging Face, Weights & Biases, MLflow, ONNX Runtime, CUDA, LangChain
- **Phase 05 Placement Tracks:**
  - *Track A:* Generative AI & LLM Systems Engineer (Nvidia, OpenAI, Google DeepMind)
  - *Track B:* Computer Vision & Autonomous Systems (Tesla Vision, Mobileye, Waymo)
  - *Track C:* Applied Data Science & Predictive Analytics (Fractal, Tiger Analytics, Mu Sigma)
  - *Track D:* MLOps & Production Inference Pipeline Architect

#### 5. Mechanical Engineering (MECH)
- **Tagline:** Robotics Automation, Thermal Power Plants, Computational Fluid Dynamics (CFD) & CAD/CAM Design
- **CTC Benchmarks:** Average: ₹5.8 LPA – ₹8.5 LPA | Highest: ₹18.0 LPA (L&T / Tata Motors / Airbus)
- **Official Syllabus Copy:** `/docs/jntugv_mech_engineering_mechanics.pdf`
- **Key Toolchains:** SolidWorks, CATIA, Autodesk Fusion 360, Ansys Mechanical & Fluent, MasterCAM, MATLAB SimMechanics
- **Phase 05 Placement Tracks:**
  - *Track A:* Aerospace & Automotive R&D (Tata Motors, Mahindra, Airbus, Boeing)
  - *Track B:* Defense & Heavy Machinery (DRDO, HAL, BEML, Caterpillar, L&T)
  - *Track C:* Industrial Robotics & Mechatronics (Fanuc, ABB Robotics, KUKA)
  - *Track D:* Renewable Thermal Energy & HVAC Systems

#### 6. Civil Engineering (CIVIL)
- **Tagline:** Smart Infrastructure, Building Information Modeling (BIM), Geotechnical Systems & Structural Dynamics
- **CTC Benchmarks:** Average: ₹5.2 LPA – ₹7.8 LPA | Highest: ₹16.5 LPA (L&T Construction / Tata Projects / Bechtel)
- **Official Syllabus Copy:** `/docs/jntugv_civil_strength_materials.pdf`
- **Key Toolchains:** AutoCAD, Revit BIM, STAAD.Pro, ETABS, Primavera P6, ArcGIS, Plaxis
- **Phase 05 Placement Tracks:**
  - *Track A:* Mega Infrastructure & Highway Projects (L&T Construction, Afcons, NHAI)
  - *Track B:* Structural Design & High-Rise Engineering (Tata Projects, Shapoorji Pallonji)
  - *Track C:* Government Engineering Services (UPSC ESE/IES, State APPSC / TSPSC AEE, CPWD)
  - *Track D:* Smart City Planning & Environmental Engineering

---

### 5.2 Module 2: Study Planner & Student Self-Analysis Dashboard

#### 1. 4-Card KPI Analytics Row
- **Today's Study Target Progress:** Real-time ratio of studied hours against planned target (e.g., `1.8h / 3.2h` — `57% Achieved`).
- **Consistency Streak:** Day count tracker with animated flame indicator (`5 Days 🔥`, personal best tracking).
- **Focus Efficiency Rate:** Computed concentration score measuring active focus timer duration against pauses (`92% Focus Rate`).
- **Schedule Completion Rate:** Real-time completion counter (`3 / 4 Finished`, dynamic progress bar).

#### 2. Interactive Study Timetable
- Slot-by-slot display with start/pause triggers, duration adjustment controls, and completion checkmarks.
- Built-in `+ Add Custom Subject` modal with topic code and time slot options.
- One-click `Auto-Balance Schedule` button to restore balanced study schedules.

#### 3. Embedded Live Focus Stopwatch
- Visual SVG circular progress ring displaying real-time countdown/elapsed time (`31:30`).
- Three specialized interval modes:
  - **Pomodoro (25 Min):** Quick burst concentration.
  - **Deep Work (50 Min):** Complex mathematical derivations and simulation lab work.
  - **Standard (30 Min):** Review sessions.

---

### 5.3 Module 3: B.Tech University Syllabus & Lab Manual Bank

- **Direct University Filtering:** Filter by **JNTU-GV**, **Andhra University (AU)**, **JNTU-K**, and **JNTU-H**.
- **Verified Local Assets:** Eliminates external 404 links by hosting verified PDFs locally (e.g., `/docs/jntugv_eee_eca.pdf`, `/docs/jntugv_eee_machines_pyq.pdf`).
- **Integrated In-Page PDF Preview Modal:** Renders documents directly within the application using an HTML5 iframe sandbox with zoom, download, and external-tab triggers.

---

### 5.4 Module 4: High-Performance Focus Room

- Dedicated distraction-free screen designed for immersive study marathons.
- Features enlarged circular countdown visuals, active session topic titles, ambient state toggles, and zero sidebar clutter.

---

### 5.5 Secondary & Intermediate Flowcharts

In addition to B.Tech, the platform provides academic guidance flowcharts for:
1. **10th Class SSLC (39-Pathway Career Gateway):** Complete guidance mapping 10th pass-outs into Intermediate (Science, Commerce, Arts), 3-Year Polytechnic Diploma, Paramedical, ITI Trades, Direct Defense (Army/Navy/Air Force), and Job-Oriented Technical Courses.
2. **Intermediate (+2 MPC / BiPC):** Complete degree pathways for Mathematics/Physics/Chemistry students (B.Tech, B.Arch, Pure Science BS-MS, NDA, Aviation/Navy, Computer Applications) and Biology/Physics/Chemistry students (MBBS, BDS, AYUSH Medicine, Pharmacy, B.Sc Agriculture). Includes direct 1-click exploration buttons that jump straight to specific B.Tech branch architecture flowcharts.

---

## 6. COMPLETE REST API SPECIFICATION

The backend is exposed via FastAPI on `http://localhost:8000`. Interactive Swagger documentation is available at `/docs`.

```
Base URL: http://localhost:8000/api/v1
```

### Endpoints Table:

| Method | Endpoint | Description | Request Body | Response (Success) | Status Code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health status check | None | `{"status": "ok", "app": "Study Blueprint API"}` | `200 OK` |
| `GET` | `/careers/stages` | Get list of academic stages | None | Array of stage objects | `200 OK` |
| `GET` | `/careers/branches` | Get B.Tech branch architecture data | Query `?branch=eee` | Complete branch roadmap object | `200 OK` |
| `GET` | `/study-plans/current` | Retrieve active student timetable | None | Array of `TimetableAllocation` | `200 OK` |
| `PUT` | `/study-plans/current` | Update timetable allocations | JSON array of allocations | `{"status": "updated", "count": 5}` | `200 OK` |
| `DELETE`| `/study-plans/current` | Clear active study timetable | None | `{"status": "cleared"}` | `200 OK` |
| `GET` | `/resources` | Filter curricular syllabi & PYQs | Query `?university=jntugv&branch=eee` | Array of verified resource records | `200 OK` |
| `POST` | `/tracker/sessions` | Log a completed study focus session | `{subject_id, duration_minutes, focus_rating}` | Session record with updated streak | `201 Created` |
| `GET` | `/analytics/summary` | Get student consistency analytics | None | `{streak_days: 5, focus_rate: 92, target_hours: 3.2}` | `200 OK` |

---

## 7. DATABASE SCHEMAS & TYPE CONTRACTS

### 7.1 Timetable Allocation Schema
```typescript
interface TimetableAllocation {
  subject_id: string;        // Unique identifier (e.g., "sub_eee_1")
  subject_name: string;      // "Electrical Circuit Analysis (ECA)"
  subject_code: string;      // "R23-EEE-1102"
  planned_minutes: number;   // 60
  time_slot: string;         // "09:00 AM - 10:00 AM"
  session_order: number;     // 1
  is_break: boolean;         // false
  break_title?: string;      // Optional rest label
}
```

### 7.2 Career Architecture Roadmap Schema
```typescript
interface BTechBranchRoadmap {
  id: string;                      // "btech_eee"
  branch_code: string;             // "eee"
  name: string;                    // "Electrical & Electronics Engineering (EEE)"
  short_name: string;              // "EEE"
  tagline: string;                 // Subtitle description
  overview: string;                // Detailed discipline summary
  syllabus_pdf_url: string;        // "/docs/jntugv_eee_eca.pdf"
  syllabus_pdf_title: string;      // Document title
  regulation: string;              // "R23 / R20 JNTU-GV Standard"
  average_package: string;         // "₹6.2 LPA - ₹9.5 LPA"
  highest_package: string;         // "₹22.5 LPA"
  core_competencies: string[];     // Array of key technical skills
  simulation_tools: string[];      // ["MATLAB / Simulink", "ETAP", "PSCAD"]
  programming_languages: string[]; // ["Embedded C", "MATLAB Scripting", "Python"]
  psu_recruiters: string[];        // ["PGCIL", "NTPC", "BHEL", "ISRO"]
  corporate_recruiters: string[];  // ["Schneider", "ABB", "Tesla", "Bosch"]
  four_year_plan: {
    year: number;                  // 1, 2, 3, 4
    title: string;                 // Phase title
    stage_name: string;            // "Year 1 (Sem 1 & 2)"
    theme: string;                 // Curricular theme
    semesters: {
      sem_number: number;
      sem_name: string;
      core_subjects: string[];
      labs: string[];
      key_milestone: string;
    }[];
    tools_to_learn: string[];
    certification: string;
  }[];
  featured_projects: {
    tier: 'Beginner' | 'Intermediate' | 'Capstone';
    title: string;
    description: string;
    tools: string[];
  }[];
  competitive_exams: {
    exam_name: string;
    description: string;
    eligibility_timing: string;
  }[];
}
```

---

## 8. VERIFIED LOCAL CURRICULAR DOCUMENT BANK

All 22 syllabus copies, question papers, and lab manuals are stored locally in `frontend/public/docs/`, ensuring guaranteed 100% uptime with zero 404 errors:

| Document File Name | Target Branch | Autonomous Board | Type |
| :--- | :--- | :--- | :--- |
| `jntugv_eee_eca.pdf` | EEE | JNTU-GV (R23) | Official Syllabus Copy |
| `jntugv_eee_machines_pyq.pdf` | EEE | JNTU-GV (R20) | Question Bank |
| `jntuk_eee_bee_lab_manual.pdf` | EEE | JNTU-K (R23) | Lab Manual & Procedures |
| `jntugv_ece_edc.pdf` | ECE | JNTU-GV (R23) | Official Syllabus Copy |
| `jntugv_ece_network_analysis.pdf` | ECE | JNTU-GV (R20) | Official Syllabus Copy |
| `jntuk_ece_edc_lab_manual.pdf` | ECE | JNTU-K (R23) | Lab Manual |
| `jntugv_cse_linear_algebra_m1.pdf` | CSE | JNTU-GV (R23) | Official Syllabus Copy |
| `jntugv_cse_pps_lab_manual.pdf` | CSE | JNTU-GV (R23) | Programming Lab Manual |
| `jntuk_cse_dsa_pyq.pdf` | CSE | JNTU-K (R20) | Question Bank |
| `jntugv_aiml_foundations.pdf` | AIML | JNTU-GV (R23) | Official Syllabus Copy |
| `jntuk_aiml_lab_manual.pdf` | AIML | JNTU-K (R23) | Python AI Lab Manual |
| `au_aiml_exam_papers.pdf` | AIML | Andhra University | Previous Exam Papers |
| `jntugv_mech_engineering_mechanics.pdf`| MECH | JNTU-GV (R23) | Official Syllabus Copy |
| `jntugv_mech_thermodynamics.pdf` | MECH | JNTU-GV (R20) | Official Syllabus Copy |
| `jntuk_mech_cad_drafting_manual.pdf` | MECH | JNTU-K (R23) | CAD Drafting Manual |
| `au_mech_fluid_mechanics.pdf` | MECH | Andhra University | Fluid Mechanics Notes |
| `jntuh_mech_kinematics_machinery.pdf` | MECH | JNTU-H (R22) | Question Bank |
| `jntugv_civil_strength_materials.pdf` | CIVIL | JNTU-GV (R23) | Official Syllabus Copy |
| `jntugv_civil_surveying.pdf` | CIVIL | JNTU-GV (R20) | Official Syllabus Copy |
| `jntuk_civil_surveying_lab.pdf` | CIVIL | JNTU-K (R23) | Field Surveying Lab Manual |
| `au_civil_concrete_tech.pdf` | CIVIL | Andhra University | Concrete Technology Manual |
| `academic_blueprint.pdf` | Multi-Branch | JNTU-GV | Master Academic Regulations |

---

## 9. DEPLOYMENT, BUILD & EXECUTION GUIDE

### 9.1 Root Scripts Integration
The workspace root `/Users/chetansai/study blueprint/package.json` contains scripts that proxy commands directly to the frontend:
- **`npm run dev`**: Starts Next.js development server on `http://localhost:3000`.
- **`npm run build`**: Executes full Next.js static site generation and TypeScript compilation.
- **`npm run start`**: Runs production-optimized server on `http://localhost:3000`.

### 9.2 Running the Application Locally

#### Step 1: Launch Backend Microservices
```bash
cd "/Users/chetansai/study blueprint/backend"
source venv/bin/activate
uvicorn app.main:app --port 8000 --host 0.0.0.0 --reload
```
*Verification:* Open `http://localhost:8000/docs` to view Swagger UI.

#### Step 2: Build & Launch Frontend Application
```bash
cd "/Users/chetansai/study blueprint"
npm run build
npm run start
```
*Verification:* Open `http://localhost:3000` in Google Chrome, Safari, or Microsoft Edge.

---

## 10. VERIFICATION & QUALITY ASSURANCE MATRIX

- **Build Integrity Check:** Verified using `npm run build` executed from workspace root.
  - Next.js 14 Static Site Generation: **16/16 pages statically optimized**.
  - TypeScript Compilation: **0 Errors, 0 Warnings**.
- **Static Assets Audit:** All 22 syllabus and lab manual PDFs in `/public/docs/` return HTTP `200 OK` with proper MIME headers (`application/pdf`).
- **Cross-Browser Responsive Matrix:** Tested across mobile screens (`375px`), tablets (`768px`), and wide-screen desktop displays (`1440px+`).

---

## 11. COLLEGE VIVA & EVALUATOR REVIEW GUIDE

### Question 1: What makes Study Blueprint fundamentally different from commercial platforms like Coursera, Unacademy, or GeeksforGeeks?
> **Answer:** Commercial portals prioritize monetization by forcing user registration and pushing generic video packages. Study Blueprint functions as an **Academic Operating System** — it is 100% open access (zero login), directly aligned with autonomous university regulations (such as JNTU-GV R23), and provides architectural pipeline flowcharts connecting theoretical subjects to actual industry simulation tools and PSU recruiters.

### Question 2: Why did you implement a 5-Phase Architecture Flow instead of simple course lists?
> **Answer:** Standard college syllabi simply list subject titles without showing dependencies. The 5-Phase Architecture Flow maps inputs (e.g., Vector Calculus) to physical systems (Electromagnetic Machines), then to control converters, industrial applications (EV Powertrains & Smart Grids), and finally to recruitment tracks (PSUs via GATE vs. Core Industry MNCs). This clarifies *why* each subject is taught.

### Question 3: How does the system handle timetable auto-balancing and student focus tracking?
> **Answer:** The study planner tracks daily study allocations, completed sessions, and study streaks. The auto-balance algorithm distributes study time across analytical, theoretical, and practical subjects with scheduled rest intervals. The embedded live focus stopwatch room provides a visual circular SVG countdown with Pomodoro (25m), Deep Work (50m), and Standard (30m) intervals to record real focus time versus planned time.

### Question 4: How are syllabus PDFs hosted and handled without breaking?
> **Answer:** All syllabus copies, PYQs, and lab manuals are stored as verified local static assets in `/public/docs/`. This eliminates 404 broken links common on university websites. An integrated on-page iframe modal allows students to inspect the document instantly without navigating away.

### Question 5: How did you ensure visual excellence and state-of-the-art UI standards?
> **Answer:** We integrated Google **Stitch MCP** design tokens under the "Blueprint Precision Engine" specification, using Primary Indigo (`#3525cd`), Technical Teal (`#00687a`), and a clean surface canvas (`#f8f9ff`). The typography utilizes **Geist** for crisp numbers and metrics, **Inter** for readable curriculum text, and **Google Material Symbols Outlined** for standard academic iconography.

---

## 12. PROJECT CONCLUSION & FUTURE ENHANCEMENTS

**Study Blueprint** establishes a new benchmark for undergraduate academic platforms. By combining the **Stitch "Blueprint Precision Engine"** aesthetic standards with authentic **JNTU-GV R23** curriculum structures, the platform empowers students with clarity, disciplined study habits, and targeted career direction.

### Future Roadmap:
1. Integration with **AI-driven Question Paper Analysis** to auto-generate high-probability exam questions from syllabus modules.
2. Peer-to-peer collaborative study rooms with shared focus timers.
3. Mobile PWA (Progressive Web App) packaging with offline PDF caching.

---
*Official Technical Documentation & Faculty Review Manual • Validated for Academic Submission 2026–2027*
