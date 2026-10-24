# Study Blueprint — UI/UX Design Blueprint & Component Inventory

## 1. Visual Design Philosophy & Token System

Study Blueprint delivers an authoritative, modern, and trustworthy educational software experience. The interface balances the rigor of academic planning with the ergonomic polish of a high-end SaaS productivity suite.

### 1.1 Color Hierarchy & Design Tokens
- **Primary Navy / Canvas Base:**
  - Dark Charcoal / Slate Navy Header & Accents: `#0F172A` (Tailwind `slate-900`)
  - Elevated Navigation & Surfaces: `#1E293B` (Tailwind `slate-800`)
  - Page Background (Light Mode default): `#F8FAFC` (Tailwind `slate-50`)
  - Elevated Card Background: `#FFFFFF`
  - Subtle Border Strokes: `#E2E8F0` (Tailwind `slate-200`)
- **Brand Interactive Colors (Teal / Blue Accent):**
  - Primary Accent: `#0284C7` (Sky 600) to `#0F766E` (Teal 700)
  - Interactive Action Hover: `#0369A1` (Sky 700)
  - Focused Ring: `rgba(2, 132, 199, 0.35)`
- **Feedback & Semantics:**
  - Success / Completed: `#10B981` (Emerald 500) / Background `#ECFDF5`
  - In Progress / Warning: `#F59E0B` (Amber 500) / Background `#FFFBEB`
  - Urgent / Overdue / Error: `#EF4444` (Rose 500) / Background `#FEF2F2`
  - Informational / Revision: `#6366F1` (Indigo 500) / Background `#EEF2FF`

### 1.2 Typography & Spacing
- **Font Stack:** Clean modern sans-serif: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Typographic Scale:**
  - Display / Hero: `text-4xl md:text-5xl font-extrabold tracking-tight`
  - Section Headings: `text-2xl font-bold text-slate-900`
  - Card Titles: `text-lg font-semibold text-slate-800`
  - Body Copy: `text-sm leading-relaxed text-slate-600`
  - Meta / Badges: `text-xs font-medium uppercase tracking-wider`
- **Surface Elevation:**
  - Cards: `rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200`
  - Interactive Buttons: `rounded-lg font-medium shadow-sm transition-all active:scale-[0.98]`

---

## 2. Page Inventory & Wireframe Architecture

### 2.1 Public Pages
1. **Landing Page (`/`):**
   - **Sticky Navigation Bar:** Logo, Links ("Features", "Academic Library", "Study Planner", "Career Pathways", "About"), "Sign in with Google" CTA button.
   - **Hero Section:** High-impact headline ("Plan Your Studies. Track Your Progress. Build Your Future."), subtext explaining all-in-one planning without distractions, dual CTA ("Get Started Free" & "Explore Academic Catalog").
   - **Interactive Live Preview Widget:** A live demonstration preview showcasing a sample BTech CSE student dashboard with realistic planned study time (240 min), active syllabus completion donut, and upcoming exam countdown.
   - **Feature Showcase Matrix:**
     - Curated Academic Library (Verified syllabus & PYQs).
     - Intelligent Timetable Generator (Deterministic study schedules).
     - Live Precision Stopwatch with session recovery.
     - Curated YouTube Learning Index.
     - Interactive Indian Career Roadmaps.
   - **Education Streams Supported:** School (6-10), Intermediate (+2), Diploma/Polytechnic, BTech/BE, Competitive Exams.
   - **FAQ Section:** Accordions explaining privacy, data ownership, zero chatbot requirement, and free access.
   - **Footer:** Academic disclaimer, Terms, Privacy Policy, Copyright.

2. **Authentication Page (`/login`):**
   - Centered auth card with Study Blueprint brand emblem.
   - One-click Google Sign-in button with Google official branding (`G` icon).
   - Test Drive / Demo Login button for local preview when Google OAuth client ID is not configured.
   - Data privacy note: "We only use your verified Google identity for secure account access. No passwords, no spam."

### 2.2 Student Application Shell & Layout
Persistent layout with responsive sidebar and top-bar for all authenticated routes:
- **Left Sidebar Navigation:**
  - Brand header with current academic stream tag (e.g., `BTech CSE - Sem 2-1`).
  - Nav links with Lucide icons:
    - 📊 **Dashboard** (`/dashboard`)
    - 📚 **Academic Resources** (`/resources`)
    - 📅 **Study Planner** (`/study-planner`)
    - ⏱️ **Study Tracker** (`/study-tracker`)
    - 📈 **My Progress** (`/progress`)
    - 🎥 **YouTube Learning** (`/videos`)
    - 📝 **Tasks & Revision** (`/tasks`)
    - 🧭 **Career Roadmaps** (`/careers`)
    - ⚙️ **Profile & Settings** (`/profile`)
  - Bottom section: User avatar, name, sign-out button.
- **Top Bar:** Mobile menu toggle, current date display, quick-action timer widget, active notifications bell.

### 2.3 Key Screen Details
- **Student Onboarding Wizard (`/onboarding`):**
  - Step 1: Confirm Profile details (Name, preferred study language).
  - Step 2: Choose Education Level (School, Intermediate, Diploma, BTech, Competitive).
  - Step 3: Select Academic Details (University/Board, Branch, Semester, Regulation, Subjects).
  - Step 4: Configure Study Habits (Daily hours e.g. 4.0 hrs, Break duration, Weak subjects).
  - Step 5: Primary Goal (Semester toppers, Placement readiness, Exam clearance).
- **Dashboard (`/dashboard`):**
  - Welcome greeting with dynamic academic profile pill.
  - Metrics Grid: Today's Planned vs Actual Study Time (e.g., `180 / 240 mins`), Syllabus Completion (`42%`), Active Streak (`5 days`), Upcoming Exam (`Data Structures in 14 days`).
  - Today's Timetable timeline with quick "Launch Timer" buttons.
  - Active study tracker mini-card.
  - Subject-wise progress bars.
  - Pending revision prompts.
- **Academic Resources (`/resources`):**
  - Dynamic hierarchical dropdown cascade: Level → Board/University → Branch → Semester → Subject.
  - Keyword search input with debouncing.
  - Resource type filter chips: All, Syllabus, Previous Papers (PYQs), Model Papers, Notes, Formula Sheets.
  - Resource Card Grid: Document title, verified badge, academic tags, page count, file size, bookmark button, and view/download triggers.
- **YouTube Learning Library (`/videos`):**
  - Multi-tiered topic selector matching academic hierarchy.
  - Language filter tabs: All, English, Telugu, Hindi.
  - Video Cards: Thumbnail with duration badge, educator channel badge, verified checkmark, embedded playback modal or inline player, watched toggle, and "Save to Revision".
- **Study Timetable Planner (`/study-planner`):**
  - Daily & Weekly views.
  - Available daily minutes slider (e.g. 60 to 480 mins).
  - Break interval selector (e.g. 10m break every 50m).
  - Rule-based "Generate Schedule" button.
  - Interactive timetable cards with edit duration buttons (+/- 15 mins) and drag/reorder controls.
  - Reschedule missed sessions modal.
- **Precision Study Tracker (`/study-tracker`):**
  - Prominent digital stopwatch display (HH:MM:SS).
  - Subject and topic selector dropdowns.
  - Start, Pause, Resume, and Stop controls with clean visual feedback.
  - Elapsed study time vs pause time calculation display.
  - Manual entry tab for retroactively adding verified study hours with validation.
  - Historical session table with exportable summary.
- **Tasks & Revision (`/tasks`):**
  - Task creation modal with priority, subject, due date, and revision interval triggers.
  - Tabbed views: Pending, Completed, Overdue, Revision Calendar.
  - Spaced repetition queue automatically recommending topics studied 1, 3, and 7 days ago.
- **Career Roadmaps (`/careers`):**
  - Stream-to-career path explorer (e.g., Class 10 → Inter MPC → BTech CSE → Software Engineer).
  - Role deep-dives: Detailed overview, Required core skills, Languages/frameworks, 3-tier project recommendations (Beginner, Intermediate, Production Capstone), certifications, and realistic salary insights without guarantees.
- **Admin Dashboard (`/admin`):**
  - Protected behind admin RBAC check.
  - Metric cards: Total Users, Total Resources, Curated Videos, Active Study Sessions.
  - Video Manager: Add YouTube link, preview, verify, assign to unit/topic, toggle published.
  - Resource Manager: Upload/register document metadata, assign university/regulation, verify authenticity.
  - Audit logs viewer.

---

## 3. Responsive Breakpoints & Accessibility
- **Breakpoints:** Mobile (`< 640px`), Tablet (`640px - 1024px`), Desktop (`> 1024px`).
- **Mobile Adaptations:**
  - Sidebar folds into an off-canvas drawer with smooth slide transition.
  - Data tables switch to stacked card representations to prevent horizontal scrolling.
  - Touch-friendly tap targets (`min-height: 44px`) on all primary buttons and controls.
  - Fixed mobile bottom-sheet for the study timer.
- **Accessibility:**
  - Semantic HTML (`<main>`, `<header>`, `<nav>`, `<aside>`, `<section>`, `<article>`).
  - High-contrast text compliance (minimum 4.5:1 ratio for normal text).
  - Full keyboard accessibility for tabs, modals, and dropdowns.
