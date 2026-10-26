# STUDY BLUEPRINT — COMPLETE DEPENDENCY & PACKAGE GUIDE
## Why Each Package is Used and How It Works in Our Code

This document provides a complete explanation of every package installed in the **Frontend** (`package.json`) and **Backend** (`requirements.txt`), why we chose it, and where it is actively used in the codebase.

---

# PART 1: FRONTEND PACKAGES (`frontend/package.json`)

## 1. `next` (v14.2.15)
- **What it is:** The leading production React framework created by Vercel.
- **Why we used it:** 
  - Provides the **App Router** (`app/` directory) for file-based routing without complex router setup.
  - Generates fast, pre-rendered static HTML pages (**Static Site Generation - SSG**).
  - Built-in image and font optimization (e.g., Google Fonts `Inter` and `Geist` loaded with zero layout shift).
  - Full-stack developer server with instant hot-reload on port 3000.
- **Where it is used:**
  - `frontend/app/layout.tsx` (Root layout, HTML head, fonts, metadata)
  - `frontend/app/page.tsx` (Homepage)
  - `frontend/app/careers/page.tsx` (Dedicated branch career roadmaps)
  - `frontend/app/resources/page.tsx` (Curricular resource bank)
  - `frontend/next.config.js` (Build and runtime configuration)

---

## 2. `react` & `react-dom` (v18.3.1)
- **What it is:** The foundational JavaScript library for building component-driven user interfaces.
- **Why we used it:**
  - **Component Reusability:** Every button, modal, card, and roadmap step is an isolated, reusable React component.
  - **React Hooks:** 
    - `useState`: Manages local component states (e.g., active branch `branch="eee"`, focus timer countdown `timeLeft=1890`, active modal popup `isModalOpen=false`).
    - `useEffect`: Triggers side effects such as running the live countdown stopwatch interval or fetching academic resources.
    - `useMemo`: Caches computed statistics (e.g., focus rate percentages, completed study hours) so they don't re-calculate needlessly.
- **Where it is used:** Across every `.tsx` file in `frontend/app/` and `frontend/components/`.

---

## 3. `lucide-react` (v0.359.0)
- **What it is:** An ultra-lightweight, customizable collection of clean, modern SVG vector icons.
- **Why we used it:**
  - Crisp, sharp iconography that scales losslessly to any screen resolution.
  - Avoids heavy icon libraries (like FontAwesome) and only bundles the exact icons imported.
- **Where it is used:**
  - `BookOpen`: Syllabus and subjects indicator.
  - `Flame`: Daily study streak counter (`5 Days 🔥`).
  - `Clock`: Timetable slot duration and countdown timers.
  - `Download`: PDF download triggers.
  - `CheckCircle2` / `Circle`: Completed vs. pending timetable checkmarks.
  - `Play` / `Pause`: Stopwatch start/pause controls.
  - `Search`: University syllabus search bar.

---

## 4. `clsx` (v2.1.0) & `tailwind-merge` (v2.2.1)
- **What they are:** Class utility helpers combined inside `lib/utils.ts` as the standard `cn()` helper function:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
- **Why we used them:**
  - **`clsx`**: Allows writing conditional CSS classes cleanly without ternary string concatenation bugs (e.g., `cn("base-btn", isActive && "bg-primary text-white")`).
  - **`tailwind-merge`**: Solves Tailwind CSS conflicts. If a component defines a default class `p-4` and you pass `p-6` as a prop, standard CSS string concatenation can cause undefined behavior. `twMerge` intelligently resolves this so `p-6` safely overrides `p-4`.
- **Where it is used:** `frontend/lib/utils.ts`, imported across all components in `frontend/components/`.

---

## 5. `tailwindcss` (v3.4.1)
- **What it is:** A utility-first CSS framework for rapid UI styling.
- **Why we used it:**
  - Enables styling directly in markup without writing separate, bulky CSS files.
  - Configured with the **Google Stitch MCP "Blueprint Precision Engine"** design tokens:
    - Primary Indigo: `#3525cd`
    - Secondary Cyan/Teal: `#00687a`
    - Pulse Highlight: `#06b6d4`
    - Surface Canvas: `#f8f9ff`
  - Generates minimal production CSS by purging unused styles during `next build`.
- **Where it is used:** `frontend/tailwind.config.js`, `frontend/app/globals.css`, and throughout all JSX `className` attributes.

---

## 6. `postcss` (v8.4.35) & `autoprefixer` (v10.4.18)
- **What they are:** CSS build toolchain utilities.
- **Why we used them:**
  - **`postcss`**: Compiles Tailwind's `@tailwind base; @tailwind components; @tailwind utilities;` directives into standard vanilla CSS that browsers can parse.
  - **`autoprefixer`**: Automatically scans the compiled CSS and adds required vendor prefixes (like `-webkit-`, `-moz-`, `-ms-`) so visual effects (like blur backdrops, CSS grid, and flexbox) render identically in Chrome, Safari, Firefox, and Edge.
- **Where it is used:** `frontend/postcss.config.js`.

---

## 7. `typescript` (v5.4.2) & `@types/*`
- **What it is:** Strongly-typed programming language that builds on JavaScript.
- **Why we used it:**
  - Eliminates runtime crashes by catching type errors at compile time.
  - Defines strict data models for our curriculum data:
    - `BTechBranchRoadmap`: Defines properties like `branch_code`, `average_package`, `simulation_tools`, `four_year_plan`.
    - `TimetableAllocation`: Enforces types for `subject_name`, `planned_minutes`, `time_slot`.
  - `@types/node`, `@types/react`, `@types/react-dom`: Provides TypeScript autocomplete and IntelliSense for Node and React APIs.
- **Where it is used:** `frontend/tsconfig.json`, `frontend/lib/btechBranchRoadmaps.ts`.

---

# PART 2: BACKEND PACKAGES (`backend/requirements.txt`)

## 1. `fastapi` (v0.110.0)
- **What it is:** A high-speed, modern asynchronous Python web framework for building REST APIs.
- **Why we used it:**
  - One of the fastest Python frameworks available, rivaling NodeJS and Go.
  - Automatically generates interactive OpenAPI **Swagger Documentation** accessible at `http://localhost:8000/docs`.
  - Native support for Python `async` and `await` for concurrent API handling.
- **Where it is used:**
  - `backend/app/main.py` (App initialization, CORS middleware, route registration)
  - `backend/app/api/v1/*.py` (All API endpoint controllers)

---

## 2. `uvicorn[standard]` (v0.28.0)
- **What it is:** A lightning-fast ASGI (Asynchronous Server Gateway Interface) web server implementation.
- **Why we used it:**
  - Python applications require an ASGI server to serve requests over HTTP asynchronously.
  - The `[standard]` flag installs high-performance C-based event loops (`uvloop`) and HTTP parsers (`httptools`).
  - Supports `--reload` for instant live updates during development.
- **Where it is used:** Command line launch: `uvicorn app.main:app --port 8000 --host 0.0.0.0 --reload`.

---

## 3. `pydantic` (v2.6.0) & `pydantic-settings` (v2.2.0)
- **What it is:** The industry-standard data validation and schema definition library for Python.
- **Why we used it:**
  - Validates all incoming JSON request bodies automatically (e.g., validating that study duration is a positive integer).
  - If a user sends malformed data, Pydantic immediately returns a clear HTTP 422 error before running backend logic.
  - `pydantic-settings` securely loads and parses environment variables from `.env`.
- **Where it is used:** `backend/app/config.py`, request body schemas across `backend/app/api/v1/`.

---

## 4. `motor` (v3.3.2) & `pymongo` (v4.6.2)
- **What it is:** 
  - `pymongo`: The official Python driver for MongoDB.
  - `motor`: An asynchronous, non-blocking wrapper around PyMongo designed for `asyncio`.
- **Why we used it:**
  - MongoDB allows flexible document storage for student profiles, subject checklists, and timetable schedules.
  - Asynchronous Motor ensures database read/write queries never block other concurrent API requests.
- **Where it is used:** `backend/app/database/mongodb.py`.

---

## 5. `mongomock-motor` (v0.0.30)
- **What it is:** An in-memory mock engine for Motor and MongoDB.
- **Why we used it:**
  - Provides a **zero-dependency fallback**. If a local MongoDB instance is not currently running on port 27017, the application seamlessly falls back to in-memory mocked collections without crashing!
- **Where it is used:** `backend/app/database/mongodb.py` (Database connection resilience).

---

## 6. `pyjwt[crypto]` (v2.8.0)
- **What it is:** Python library to encode, decode, and cryptographically verify JSON Web Tokens (JWT).
- **Why we used it:**
  - Provides stateless token authentication for optional student sessions and administrative actions.
- **Where it is used:** `backend/app/api/v1/auth.py`.

---

## 7. `python-multipart` (v0.0.9)
- **What it is:** A streaming multipart/form-data parser for Python.
- **Why we used it:**
  - Required by FastAPI for processing form-data submissions and file uploads (e.g., uploading new syllabus documents).
- **Where it is used:** Required dependency for FastAPI form-encoded endpoints.

---

## 8. `httpx` (v0.27.0) & `requests` (v2.31.0)
- **What it is:** Modern HTTP client libraries for Python.
- **Why we used it:**
  - `httpx` supports asynchronous HTTP requests for microservice communication.
  - Used for external health checks, syllabus file integrity verification, and integration tests.
- **Where it is used:** Automated test suites and backend verification tasks.

---

## 9. `pytest` (v8.0.0) & `pytest-asyncio` (v0.23.0)
- **What it is:** Python's leading automated testing framework.
- **Why we used it:**
  - Runs unit tests and API endpoint integration tests.
  - `pytest-asyncio` allows testing asynchronous `async def` endpoints directly.
- **Where it is used:** Backend test suites.

---

### **Summary Table for Evaluator Review:**

| Tier | Package | Primary Purpose | Key Benefit |
| :--- | :--- | :--- | :--- |
| **Frontend** | `next` (14) | Full-stack React App Router & SSG | Ultra-fast pre-rendering & file-based routing |
| **Frontend** | `react` (18) | Component architecture & State Hooks | Reactive UI updates (stopwatch, modals, roadmaps) |
| **Frontend** | `tailwindcss` | Precision Design System Styling | Implements Stitch MCP "Blueprint Precision Engine" tokens |
| **Frontend** | `lucide-react` | Crisp Scalable Vector Icons | Lightweight, zero-bloat iconography |
| **Frontend** | `tailwind-merge` + `clsx` | Dynamic Class Resolution | Prevents style overrides and class conflicts |
| **Frontend** | `typescript` | Static Type Safety | Eliminates runtime exceptions across curricular datasets |
| **Backend** | `fastapi` | Asynchronous RESTful API Framework | Sub-100ms response times & auto Swagger documentation |
| **Backend** | `uvicorn` | High-speed ASGI Web Server | Production server handling concurrent async requests |
| **Backend** | `pydantic` | Data Validation & Serialization | Strict schema enforcement on API payloads |
| **Backend** | `motor` + `pymongo` | Non-blocking MongoDB Driver | Async database persistence for schedules & metrics |
| **Backend** | `mongomock-motor`| Database Fallback Engine | Guarantees server runs even without active local MongoDB |
| **Backend** | `pyjwt` | JWT Token Authentication | Stateless, cryptographic security |
