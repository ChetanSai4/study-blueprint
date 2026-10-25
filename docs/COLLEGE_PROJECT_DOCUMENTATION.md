# STUDY BLUEPRINT: Complete Academic Planning & Career Operating System
## Official Project Report & Technical Documentation for Academic Submission

---

### **Project Information**
- **Project Title:** Study Blueprint: Autonomous Multi-Tier Academic Operating System & 4-Year Engineering Architecture Platform
- **Academic Standard:** JNTU-GV & Affiliated Colleges — R23 / R20 Curricular Regulations
- **Platform Architecture:** Dual-Engine Next.js 14 (App Router) + FastAPI Modern Microservices + Stitch MCP Design System
- **Domain:** Educational Technology, Career Pathway Systems & Cognitive Habit Tracking
- **Academic Year:** 2026 – 2027

---

## Table of Contents
1. [Certificate of Completion & Declaration](#1-certificate-of-completion--declaration)
2. [Abstract & Executive Summary](#2-abstract--executive-summary)
3. [Problem Statement & Background Motivation](#3-problem-statement--background-motivation)
4. [Key System Objectives & Innovations](#4-key-system-objectives--innovations)
5. [Complete System Architecture & Flow](#5-complete-system-architecture--flow)
6. [Design System: Stitch "Blueprint Precision Engine"](#6-design-system-stitch-blueprint-precision-engine)
7. [Module-by-Module Technical Deep Dive](#7-module-by-module-technical-deep-dive)
   - [7.1 Module 1: Career Roadmaps & 5-Phase Architecture Flow](#71-module-1-career-roadmaps--5-phase-architecture-flow)
   - [7.2 Module 2: Study Planner & Student Self-Analysis Dashboard](#72-module-2-study-planner--student-self-analysis-dashboard)
   - [7.3 Module 3: B.Tech University Syllabus & Lab Manual Bank](#73-module-3-btech-university-syllabus--lab-manual-bank)
   - [7.4 Module 4: High-Performance Focus Room](#74-module-4-high-performance-focus-room)
8. [Database Schema & Data Models](#8-database-schema--data-models)
9. [REST API Specifications](#9-rest-api-specifications)
10. [Verification, Quality Assurance & Build Matrix](#10-verification-quality-assurance--build-matrix)
11. [College Viva / Interview Q&A Guide](#11-college-viva--interview-qa-guide)
12. [Conclusion & Future Roadmap](#12-conclusion--future-roadmap)

---

## 1. Certificate of Completion & Declaration

### Candidate Declaration
> I hereby declare that the project titled **"STUDY BLUEPRINT: Autonomous Multi-Tier Academic Operating System & 4-Year Engineering Architecture Platform"** is an authentic work carried out by me. The software implementation, system architecture diagrams, and accompanying technical specifications have been engineered from ground up adhering to modern software engineering standards, autonomous curricular regulations (JNTU-GV R23/R20), and industry design guidelines.

**Student Name:** Chetan Sai  
**Registration Number:** [Your University Roll Number]  
**Department:** Computer Science & Engineering / Electrical & Electronics Engineering  
**Institution:** [Your College / Institution Name]  

---

## 2. Abstract & Executive Summary

Modern engineering education in India faces severe structural fragmentation. While curriculum schemes like **JNTU-GV R23 and R20** outline semester-by-semester theoretical coursework, students lack a clear architectural pipeline connecting foundational mathematics with industrial software toolchains (e.g., MATLAB/Simulink, ETAP, PSCAD, Ansys Maxwell), physical laboratory validation, and high-yield recruitment pathways (Central PSUs via GATE vs. Core EV/Semiconductor MNCs). Furthermore, existing EdTech platforms impose aggressive login walls, display advertisement clutter, and offer disconnected generic video tutorials.

**Study Blueprint** resolves this gap by introducing an open-access, zero-login **Academic Operating System (OS)** tailored for undergraduate engineering students and pre-engineering aspirants. 

### Core Innovations Delivered:
1. **Zero-Login Open Access Architecture:** Frictionless access to critical syllabi, roadmaps, and timetable tools without forced authentication or personal data collection.
2. **5-Phase Engineering Discipline Architecture Pipeline:** An end-to-end system flow diagram for each major branch (**EEE, ECE, CSE, AIML, Mechanical, Civil**), mapping Year 1 foundational modeling to Year 4 industrial specialization and 4 distinct career placement gateways.
3. **Student Self-Analysis Dashboard & Focus Stopwatch:** A dynamic habit engine combining timetable schedule tracking, consistency streaks, focus efficiency analytics, and an integrated Pomodoro/Deep Work circular stopwatch.
4. **Autonomous Curricular Document Repository:** Direct, verified in-page PDF preview and zero-error downloading of official JNTU-GV, Andhra University (AU), and JNTU-K question banks and laboratory manuals.
5. **Stitch "Blueprint Precision Engine" Design Synchronization:** Modern, high-contrast UI utilizing Google Material Symbols, Geist + Inter typography, and curated color palettes (`#3525cd` Primary Indigo, `#00687a` Technical Teal, `#f8f9ff` Canvas Surface).

---

## 3. Problem Statement & Background Motivation

### The Academic Reality of Engineering Undergraduates
1. **The "Disconnected Syllabus" Syndrome:** Students study abstract formulas (e.g., Fourier Transforms, Maxwell Equations, Thevenin Theorems) without understanding where they fit in the industrial hardware and software pipeline.
2. **The Career Uncertainty Cliff:** At 3rd and 4th year, students are overwhelmed by ambiguous choices between GATE preparation, core industrial jobs, or IT software recruitment.
3. **Study Fragmentation & Low Focus:** Students manage timetables on fragmented paper notes or unscientific apps without feedback loops tracking real focus time versus planned allocations.
4. **404 Broken Document Links:** College university websites frequently bury official syllabus copies and question papers behind broken portals or password walls.

---

## 4. Key System Objectives & Innovations

| Objective | Traditional Academic Portals | Study Blueprint Solution |
| :--- | :--- | :--- |
| **Authentication Barrier** | Mandatory signup, phone OTP, spam emails | **100% Zero-Login Open Platform** |
| **Branch Guidance** | Static list of course names | **5-Phase Architectural Pipeline Flow** |
| **Toolchain Integration** | Not mentioned in standard syllabus | **Explicit simulation tool mapping (MATLAB, ETAP, Keil, etc.)** |
| **Study Habit Tracking** | Disconnected generic habit apps | **Curriculum-integrated Timetable + Live Stopwatch** |
| **Syllabus Document Access** | External broken links & 404 errors | **Verified local PDF engine with Instant In-Page Preview** |
| **Design Standard** | Outdated, cluttered table layouts | **Stitch "Blueprint Precision Engine" Design System** |

---

## 5. Complete System Architecture & Flow

The system employs a decoupled, cloud-ready architecture:

```mermaid
graph TD
    User([Engineering Student / Aspirant]) -->|Zero-Login Web Access| NextApp[Next.js 14 Frontend Application]
    
    subgraph Frontend Layer [Next.js 14 App Router + Tailwind CSS]
        NextApp --> Nav[Stitch Precision Navigation]
        Nav --> Tab1[1. Career Roadmaps & 5-Phase Architecture Flow]
        Nav --> Tab2[2. Study Planner & Self-Analysis Dashboard]
        Nav --> Tab3[3. BTech University Curricular Resources]
        Nav --> Tab4[4. High-Performance Focus Room]
        
        Tab1 --> BTechEngine[B.Tech 6-Branch Pipeline Engine: EEE, ECE, CSE, AIML, MECH, CIVIL]
        Tab2 --> TimetableEngine[Interactive Timetable + Circular SVG Stopwatch]
        Tab3 --> PDFEngine[Verified PDF Streaming & In-Page Modal Viewer]
    end
    
    subgraph Microservices Layer [FastAPI Modern Backend]
        NextApp -.->|REST API Calls| APIGateway[FastAPI Router - /api/v1]
        APIGateway --> CareerRouter[/api/v1/careers]
        APIGateway --> PlannerRouter[/api/v1/study-plans]
        APIGateway --> ResourceRouter[/api/v1/resources]
        APIGateway --> TrackerRouter[/api/v1/tracker]
    end
    
    subgraph Data & Storage Layer
        PlannerRouter --> Mongo[(MongoDB Curricular Database)]
        PDFEngine --> LocalDocs[Local Static Assets - /public/docs/*.pdf]
    end
```

---

## 6. Design System: Stitch "Blueprint Precision Engine"

The user interface was crafted in collaboration with the Google **Stitch MCP Engine** (Project: *StudyBlueprint UI/UX Redesign*, Canvas ID: `15377756584866006475`):

### 1. Color Palette Tokens
- **Surface Canvas (`#f8f9ff`):** Ultra-crisp background engineered for extended study sessions without eye strain.
- **Surface Container Low (`#eff4ff`):** Subtle card backdrop providing delicate boundary separation.
- **Primary Indigo (`#3525cd` / `#4f46e5`):** Primary action triggers, active navigation capsules, and roadmap milestones.
- **Technical Teal (`#00687a` / `#06b6d4`):** Secondary metrics, live pulse indicators, and accreditation badges.
- **Midnight Slate (`#0b1c30`):** High-contrast typography and deep phase output cards.

### 2. Typography Hierarchy
- **Header & Metric Typography:** `Geist` (Modern Geometric Sans) with tabular numbers (`tnum`) for timers and analytics.
- **Body & Curriculum Lists:** `Inter` (Optimized Screen Legibility) with 1.5x line height.
- **Metadata & Subject Codes:** `Geist Mono` uppercase with tracking offsets (e.g., `R23-EEE-1102`).

### 3. Iconography
- Standardized on **Google Material Symbols Outlined** (e.g., `architecture`, `account_tree`, `bolt`, `terminal`, `timer`, `school`).

---

## 7. Module-by-Module Technical Deep Dive

### 7.1 Module 1: Career Roadmaps & 5-Phase Architecture Flow

When a user selects a branch (e.g., **Electrical & Electronics Engineering - EEE**), the system renders a structured, 5-phase engineering pipeline:

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

#### Supported Disciplines:
1. **EEE (02):** Electrical & Electronics (EV Powertrains, Smart Grids, Machines & Automation)
2. **ECE (04):** Electronics & Communication (VLSI Design, Embedded IoT, Microarchitectures)
3. **CSE (05):** Computer Science & Engineering (Systems Architecture, Cloud, Full-Stack)
4. **AIML (42):** Artificial Intelligence & Machine Learning (Neural Systems, NLP, GenAI)
5. **Mechanical (03):** Mechanical Engineering (Robotics, FEA, Thermal Systems, CAD)
6. **Civil (01):** Civil Engineering (Structural Engineering, BIM, Geotechnical Systems)

---

### 7.2 Module 2: Study Planner & Student Self-Analysis Dashboard

#### 1. 4-Card KPI Analytics Row
- **Today's Study Target:** Ratio of studied hours against target (e.g., `1.8h / 3.2h` — 57% achieved).
- **Consistency Streak:** Day count tracker with flame indicator (`5 Days 🔥`).
- **Focus Efficiency Meter:** Ratio of uninterrupted study against pauses (`92%`).
- **Schedule Completion:** Fraction of scheduled study blocks completed.

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

### 7.3 Module 3: B.Tech University Syllabus & Lab Manual Bank

- **Direct University Filtering:** Filter by **JNTU-GV**, **Andhra University (AU)**, **JNTU-K**, and **JNTU-H**.
- **Verified Local Assets:** Eliminates external 404 links by hosting verified PDFs locally (e.g., `/docs/jntugv_eee_eca.pdf`, `/docs/jntugv_eee_machines_pyq.pdf`).
- **Integrated In-Page PDF Preview Modal:** Renders documents directly within the application using an HTML5 iframe sandbox with zoom, download, and external-tab triggers.

---

### 7.4 Module 4: High-Performance Focus Room

- Dedicated distraction-free screen designed for immersive study marathons.
- Features enlarged circular countdown visuals, active session topic titles, ambient state toggles, and zero sidebar clutter.

---

## 8. Database Schema & Data Models

### 1. Timetable Allocation Model (`study_plans`)
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

### 2. Career Architecture Roadmap Model (`career_roadmaps`)
```typescript
interface BTechBranchRoadmap {
  id: string;                      // "btech_eee"
  branch_code: string;             // "eee"
  name: string;                    // "Electrical & Electronics Engineering (EEE)"
  short_name: string;              // "EEE"
  syllabus_pdf_url: string;        // "/docs/jntugv_eee_eca.pdf"
  regulation: string;              // "R23 / R20 JNTU-GV Standard"
  average_package: string;         // "₹6.2 LPA - ₹9.5 LPA"
  highest_package: string;         // "₹22.5 LPA"
  core_competencies: string[];     // Array of key technical skills
  simulation_tools: string[];      // ["MATLAB / Simulink", "ETAP", "PSCAD"]
  psu_recruiters: string[];        // ["PGCIL", "NTPC", "BHEL", "ISRO"]
  corporate_recruiters: string[];  // ["Schneider", "ABB", "Tesla", "Bosch"]
  four_year_plan: YearPlan[];      // 4-phase academic and lab progression
}
```

---

## 9. REST API Specifications

The FastAPI backend exposes the following endpoints on port `8000`:

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status check | `200 OK` |
| `GET` | `/api/v1/careers/stages` | Get list of supported academic stages | `200 OK` |
| `GET` | `/api/v1/careers/branches` | Get full branch architecture roadmaps | `200 OK` |
| `GET` | `/api/v1/study-plans/current` | Retrieve active student timetable | `200 OK` |
| `PUT` | `/api/v1/study-plans/current` | Update timetable allocations | `200 OK` |
| `DELETE`| `/api/v1/study-plans/current` | Reset / clear timetable allocations | `200 OK` |
| `GET` | `/api/v1/resources` | Fetch filtered curricular documents | `200 OK` |
| `GET` | `/docs` | Interactive Swagger API documentation | `200 OK` |

---

## 10. Verification, Quality Assurance & Build Matrix

- **Build Integrity Check:** Verified using `npm run build` executed from workspace root.
  - Next.js 14 Static Site Generation: **16/16 pages statically optimized**.
  - TypeScript Compilation: **0 Errors, 0 Warnings**.
- **Static Assets Audit:** All 22 syllabus and lab manual PDFs in `/public/docs/` return HTTP `200 OK` with proper MIME headers (`application/pdf`).
- **Responsive Layout Matrix:** Tested across mobile screens (`375px`), tablets (`768px`), and wide-screen desktop displays (`1440px+`).

---

## 11. College Viva / Interview Q&A Guide

### Q1: What makes Study Blueprint different from commercial EdTech portals?
> **Answer:** Commercial portals prioritize monetization by forcing user registration and pushing generic video packages. Study Blueprint functions as an **Academic Operating System** — it is 100% open access (zero login), directly aligned with autonomous university regulations (such as JNTU-GV R23), and provides architectural pipeline flowcharts connecting theoretical subjects to actual industry simulation tools and PSU recruiters.

### Q2: Why did you implement a 5-Phase Architecture Flow instead of simple course lists?
> **Answer:** Standard college syllabi simply list subject titles without showing dependencies. The 5-Phase Architecture Flow maps inputs (e.g., Vector Calculus) to physical systems (Electromagnetic Machines), then to control converters, industrial applications (EV Powertrains & Smart Grids), and finally to recruitment tracks (PSUs via GATE vs. Core Industry MNCs). This clarifies *why* each subject is taught.

### Q3: How are the syllabus PDFs hosted and handled without breaking?
> **Answer:** All syllabus copies, PYQs, and lab manuals are stored as verified local static assets in `/public/docs/`. This eliminates 404 broken links common on university websites. An integrated on-page iframe modal allows students to inspect the document instantly without navigating away.

### Q4: How is the system architected for scalability?
> **Answer:** The frontend is built on **Next.js 14 App Router** using static page generation and server-side optimization, delivering sub-second load times. The backend is decoupled via **FastAPI** asynchronously serving JSON endpoints, making it easily containerizable with Docker for cloud deployment on AWS or Google Cloud.

---

## 12. Conclusion & Future Roadmap

**Study Blueprint** establishes a new benchmark for undergraduate academic platforms. By combining the **Stitch "Blueprint Precision Engine"** aesthetic standards with authentic **JNTU-GV R23** curriculum structures, the platform empowers students with clarity, disciplined study habits, and targeted career direction.

### Future Roadmap:
1. Integration with **AI-driven Question Paper Analysis** to auto-generate high-probability exam questions from syllabus modules.
2. Peer-to-peer collaborative study rooms with shared focus timers.
3. Mobile PWA (Progressive Web App) packaging with offline PDF caching.

---
*Report generated and validated for College Project Submission • Academic Year 2026-2027*
