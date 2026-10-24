import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Youtube,
  Milestone,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  HelpCircle,
  FileText,
  Play
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-brand-50 border border-brand-200 px-3.5 py-1.5 text-xs font-semibold text-brand-700 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span>Built Specifically for Indian Universities, Boards & Branches</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Plan Your Studies. Track Your Progress. <br />
            <span className="bg-gradient-to-r from-brand-600 to-teal-600 bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The all-in-one educational OS for Indian students. Complete syllabus tracking, verified university model papers, deterministic timetables, precision study stopwatches, and career roadmaps.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/10 hover:bg-navy-800 active:scale-95 transition-all"
            >
              <span>Get Started with Google</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resources"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
            >
              <BookOpen className="h-4 w-4 text-brand-600" />
              <span>Explore Academic Catalog</span>
            </Link>
          </div>

          {/* Realistic Product Demonstration Widget (Clearly labeled) */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 bg-slate-50/80 rounded-t-xl text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[11px] ml-2 text-slate-400">studyblueprint.in/dashboard</span>
                </div>
                <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200">
                  Interactive Live Preview (Realistic Demonstration Data)
                </span>
              </div>

              {/* Sample Dashboard Mock Representation */}
              <div className="p-4 sm:p-6 bg-slate-50/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Metric 1: Planned vs Actual */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Today&apos;s Study Time</span>
                    <Clock className="h-4 w-4 text-brand-600" />
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-900">195</span>
                    <span className="text-xs text-slate-500">/ 240 mins target</span>
                  </div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-brand-600 h-2 rounded-full w-[81%]" />
                  </div>
                  <p className="mt-2 text-[11px] text-emerald-600 font-medium">81% of daily timetable completed</p>
                </div>

                {/* Metric 2: Syllabus Coverage */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Syllabus Completion</span>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-900">42.5%</span>
                    <span className="text-xs text-slate-500">Overall Sem 2-1</span>
                  </div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-[42.5%]" />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">17 of 40 syllabus topics mastered</p>
                </div>

                {/* Metric 3: Upcoming Exam Countdown */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">Next University Exam</span>
                    <Calendar className="h-4 w-4 text-rose-500" />
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-900">14 Days</span>
                    <span className="text-xs text-slate-500">remaining</span>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-slate-800">Data Structures (CS301PC)</p>
                  <p className="text-[11px] text-slate-500">JNTUH R22 Mid-Term Examination</p>
                </div>

                {/* Today's Schedule Table Preview */}
                <div className="md:col-span-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Today&apos;s Proportional Schedule (Sample 240 Min Plan)</h3>
                    <span className="text-xs text-brand-600 font-semibold">Strict 0-Minute Drift Guarantee</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-[10px] font-mono font-bold text-slate-400">06:00 - 06:50</span>
                      <p className="text-xs font-bold text-slate-800 mt-1">Data Structures</p>
                      <span className="text-[10px] text-emerald-600 font-medium">50m Study • Completed</span>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-[10px] font-mono font-bold text-slate-400">06:50 - 07:00</span>
                      <p className="text-xs font-bold text-slate-600 mt-1">Hydration Break</p>
                      <span className="text-[10px] text-slate-400 font-medium">10m Rest Slot</span>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-[10px] font-mono font-bold text-slate-400">07:00 - 07:50</span>
                      <p className="text-xs font-bold text-slate-800 mt-1">DBMS Normalization</p>
                      <span className="text-[10px] text-emerald-600 font-medium">50m Study • Completed</span>
                    </div>
                    <div className="p-3 rounded-lg border border-brand-200 bg-brand-50/50">
                      <span className="text-[10px] font-mono font-bold text-brand-600">18:00 - 18:50</span>
                      <p className="text-xs font-bold text-brand-900 mt-1">Operating Systems</p>
                      <span className="text-[10px] text-brand-700 font-semibold">Next Session Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600">Built for Authentic Academic Mastery</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Five Cohesive Systems in One Single Platform
            </p>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              No isolated, fragmented tools. Your timetable connects directly to your syllabus topics, which link to verified model papers and curated educational videos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Strictly Filtered Academic Library</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Official syllabus copies, previous year university question papers (PYQs), faculty lecture notes, and formula sheets categorized by University, Branch, and Semester.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Deterministic Timetable Planner</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Mathematically balanced distribution of your daily available study time across enrolled subjects based on your chosen difficulty ratings and upcoming exam priorities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Precision Study Stopwatch</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Active study tracking that deducts pauses automatically, prevents overlapping active timers, and recovers gracefully from accidental browser closures.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                <Youtube className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Curated YouTube Learning Index</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Real, verified educational video links from top Indian creators (Neso Academy, Abdul Bari, Telusko, GATE Smashers) mapped directly to specific unit topics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Milestone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Interactive Career Roadmaps</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Explore real pathways from School and Intermediate through BTech specializations (Full Stack, AI/ML, Cloud DevOps) with tiered projects and core competencies.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Zero AI Chatbots or Hallucinations</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Purely deterministic mathematics and authentic verified curriculum. No unreliable chatbot summaries or fabricated examination marks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Education Levels */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Complete Educational Lifecycle</h2>
            <p className="text-2xl font-bold text-slate-900 mt-1">Supported Education Levels in India</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <span className="text-2xl mb-2 block">🏫</span>
              <h4 className="text-xs font-bold text-slate-900">School (Class 6–10)</h4>
              <p className="text-[11px] text-slate-500 mt-1">CBSE, ICSE & State Boards</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <span className="text-2xl mb-2 block">🔬</span>
              <h4 className="text-xs font-bold text-slate-900">Intermediate (+2)</h4>
              <p className="text-[11px] text-slate-500 mt-1">MPC, BiPC, MEC & CEC</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <span className="text-2xl mb-2 block">⚙️</span>
              <h4 className="text-xs font-bold text-slate-900">Diploma / Polytechnic</h4>
              <p className="text-[11px] text-slate-500 mt-1">SBTET Technical Branches</p>
            </div>
            <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 text-center">
              <span className="text-2xl mb-2 block">💻</span>
              <h4 className="text-xs font-bold text-brand-900">BTech / BE Engineering</h4>
              <p className="text-[11px] text-brand-700 mt-1">CSE, AIML, ECE across R18/R22</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <span className="text-2xl mb-2 block">🎯</span>
              <h4 className="text-xs font-bold text-slate-900">Competitive Exams</h4>
              <p className="text-[11px] text-slate-500 mt-1">JEE, EAMCET, ECET & GATE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Step Flow */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600">How Study Blueprint Works</h2>
            <p className="text-3xl font-bold text-slate-900 mt-1">Three Steps to Academic Excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Configure Your Academic Profile</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Select your University or Board (e.g. JNTUH R22), engineering branch, semester, and daily study availability.
              </p>
            </div>

            <div className="p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Follow Deterministic Study Plans</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Generate daily study blocks that allocate your exact target study minutes, track time with the stopwatch, and check off syllabus topics.
              </p>
            </div>

            <div className="p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Master Skills & Build Real Projects</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Leverage career roadmaps to prepare for internships and campus placements through tiered project building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Frequently Asked Questions</h2>
            <p className="text-3xl font-bold text-slate-900 mt-1">Everything You Need to Know</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900">Is Study Blueprint completely free to use?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Yes. All core features including timetable generation, academic catalog access, verified YouTube videos, syllabus tracking, and career roadmaps are completely free for students.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900">Does Study Blueprint use AI or Chatbots?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                No. In strict adherence to academic rigor, Study Blueprint uses purely deterministic, rule-based algorithms for scheduling, timetable generation, and progress tracking. There are zero generative AI chatbots, avoiding unverified summaries and exam misinformation.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900">How are the educational YouTube videos verified?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Every video link in our library is manually researched and verified from legitimate educational channels (e.g., Abdul Bari, Neso Academy, GATE Smashers) and mapped down to specific syllabus units and topics.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900">Why is Google sign-in the only authentication method?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Google Identity Services ensures high security with verified email identities, eliminates passwords and insecure SMS OTPs, and ensures immediate, safe access for students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-navy-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Take Control of Your Academic Journey?</h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Join students organizing their studies with precision, tracking real progress, and preparing for high-impact careers.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="flex items-center space-x-2 rounded-xl bg-brand-600 px-7 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-500 active:scale-95 transition-all"
            >
              <span>Launch Study Blueprint</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
