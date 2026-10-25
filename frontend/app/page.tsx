'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  Cpu,
  Code2,
  Wrench,
  Building2,
  Download,
  Eye,
  ExternalLink,
  Award,
  Briefcase,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Printer,
  X,
  FileText,
  TrendingUp,
  Target,
  ArrowDown,
  Workflow,
  Sparkles,
  ShieldCheck,
  Compass,
  Laptop,
  Check,
  Flame,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Search,
  BookOpen,
  Filter,
  School,
  Timer,
  Bell,
  User,
  MoreVertical,
  Volume2,
  Maximize2
} from 'lucide-react';
import { BTECH_BRANCH_ROADMAPS, BTechBranchRoadmap } from '@/lib/btechBranchRoadmaps';

// Timetable type
interface TimetableAllocation {
  subject_id: string;
  subject_name: string;
  subject_code: string;
  planned_minutes: number;
  time_slot: string;
  session_order: number;
  is_break: boolean;
  break_title?: string;
}

const DEFAULT_TIMETABLE: TimetableAllocation[] = [
  {
    subject_id: 'sub_1',
    subject_name: 'Electrical Circuit Analysis & Phasors (ECA)',
    subject_code: 'R23-EEE-1102',
    planned_minutes: 60,
    time_slot: '09:00 AM - 10:00 AM',
    session_order: 1,
    is_break: false
  },
  {
    subject_id: 'break_1',
    subject_name: 'Hydration & Posture Reset',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '10:00 AM - 10:10 AM',
    session_order: 2,
    is_break: true,
    break_title: 'Hydrate & Stretch'
  },
  {
    subject_id: 'sub_2',
    subject_name: 'Linear Algebra & Calculus (Mathematics-1)',
    subject_code: 'R23-BS-1101',
    planned_minutes: 50,
    time_slot: '10:10 AM - 11:00 AM',
    session_order: 3,
    is_break: false
  },
  {
    subject_id: 'sub_3',
    subject_name: 'Programming in C & Data Problem Solving',
    subject_code: 'R23-CS-1103',
    planned_minutes: 60,
    time_slot: '11:15 AM - 12:15 PM',
    session_order: 4,
    is_break: false
  },
  {
    subject_id: 'sub_4',
    subject_name: 'Basic Electrical Engineering Lab Prep (BEE)',
    subject_code: 'R23-EE-1104',
    planned_minutes: 40,
    time_slot: '02:00 PM - 02:40 PM',
    session_order: 5,
    is_break: false
  }
];

export default function UnifiedPlatformHome() {
  // Navigation Tabs: 'careers' | 'planner' | 'resources' | 'focus'
  const [activeTab, setActiveTab] = useState<'careers' | 'planner' | 'resources' | 'focus'>('careers');

  // Selected Branch: default to 'eee' as requested by user
  const [selectedBranch, setSelectedBranch] = useState<string>('eee');

  // View Mode inside Career Roadmaps
  const [careerFlowMode, setCareerFlowMode] = useState<'architecture' | 'semesters' | 'placements'>('architecture');

  // PDF Preview Modal
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string | null>(null);

  // Timetable State
  const [timetable, setTimetable] = useState<TimetableAllocation[]>(DEFAULT_TIMETABLE);
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>({ sub_1: true });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDuration, setNewSubDuration] = useState(50);
  const [newSubTime, setNewSubTime] = useState('03:00 PM - 03:50 PM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Focus Stopwatch State
  const [stopwatchSeconds, setStopwatchSeconds] = useState(1890); // 31:30
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stopwatchMode, setStopwatchMode] = useState<'pomodoro' | 'deep' | 'custom'>('deep');
  const [activeSessionName, setActiveSessionName] = useState('Electrical Circuit Analysis (ECA)');
  const [reflectionText, setReflectionText] = useState('Today focus was concentrated on verifying Thevenin and Norton equivalence formulas before afternoon lab testing.');

  // Resources State
  const [resourceUniversity, setResourceUniversity] = useState('jntugv');
  const [resourceBranch, setResourceBranch] = useState('all');
  const [resourceSearch, setResourceSearch] = useState('');

  // Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const branchData: BTechBranchRoadmap =
    BTECH_BRANCH_ROADMAPS[selectedBranch] || BTECH_BRANCH_ROADMAPS['eee'];

  const BRANCH_TABS = [
    { id: 'eee', codeNum: '02', short: 'EEE', label: 'Electrical & Electronics', icon: 'bolt', themeColor: 'text-amber-500' },
    { id: 'ece', codeNum: '04', short: 'ECE', label: 'Electronics & Comm', icon: 'memory', themeColor: 'text-blue-500' },
    { id: 'cse', codeNum: '05', short: 'CSE', label: 'Computer Science', icon: 'terminal', themeColor: 'text-emerald-500' },
    { id: 'aiml', codeNum: '42', short: 'AI & ML', label: 'Artificial Intelligence', icon: 'neurology', themeColor: 'text-purple-500' },
    { id: 'mech', codeNum: '03', short: 'Mechanical', label: 'Robotics & Thermal', icon: 'precision_manufacturing', themeColor: 'text-rose-500' },
    { id: 'civil', codeNum: '01', short: 'Civil', label: 'Structural & Spatial', icon: 'foundation', themeColor: 'text-cyan-500' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased flex flex-col selection:bg-[#4f46e5] selection:text-white">
      {/* ========================================================================= */}
      {/* STITCH HEADER BAR (Exact Design Theme: Blueprint Precision Engine)         */}
      {/* ========================================================================= */}
      <header className="fixed top-0 w-full z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab('careers')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#3525cd] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[20px]">architecture</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#0b1c30]">STUDY BLUEPRINT</span>
                <span className="text-[10px] font-mono text-[#464555] uppercase tracking-wider -mt-0.5">
                  B.Tech OS // R23 Core
                </span>
              </div>
            </div>

            {/* University Tag Badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#eff4ff] border border-[#dce9ff] px-3 py-1 rounded-lg text-[#0b1c30]">
              <span className="material-symbols-outlined text-[#00687a] text-[16px]">school</span>
              <span className="text-xs font-semibold">JNTU-GV</span>
              <span className="px-1.5 py-0.2 rounded bg-[#acedff] text-[#001f26] font-mono text-[10px] font-bold">
                R23
              </span>
            </div>
          </div>

          {/* Dedicated Section Tabs (Stitch Navigation) */}
          <nav className="flex items-center gap-1 bg-[#e5eeff]/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'careers'
                  ? 'bg-[#4f46e5] text-white shadow-sm font-bold'
                  : 'text-[#464555] hover:text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>1. Career Roadmaps</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'planner'
                  ? 'bg-[#4f46e5] text-white shadow-sm font-bold'
                  : 'text-[#464555] hover:text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">event_note</span>
              <span>2. Study Planner & Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'resources'
                  ? 'bg-[#4f46e5] text-white shadow-sm font-bold'
                  : 'text-[#464555] hover:text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">library_books</span>
              <span>3. BTech Resources</span>
            </button>

            <button
              onClick={() => setActiveTab('focus')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'focus'
                  ? 'bg-[#4f46e5] text-white shadow-sm font-bold'
                  : 'text-[#464555] hover:text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span>4. Focus Room</span>
            </button>
          </nav>

          {/* Right Profile & Direct Access */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero Login Required</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-20 pb-16 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* TAB 1: CAREER ROADMAPS (STITCH CANVAS SCREEN: 0cb35c719d534e0da68ede3dbdd)*/}
        {/* ========================================================================= */}
        {activeTab === 'careers' && (
          <div className="flex flex-col gap-6 w-full animate-in fade-in duration-150">
            {/* Breadcrumb & Top Indicator Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#464555] uppercase tracking-wider">
                <span className="flex items-center gap-1 text-[#3525cd] font-semibold">
                  <span className="material-symbols-outlined text-[15px]">school</span>
                  Academic Curriculum & Careers
                </span>
                <span className="text-[#c7c4d8]">/</span>
                <span>B.Tech Engineering Specializations</span>
                <span className="text-[#c7c4d8]">/</span>
                <span className="text-[#0b1c30] font-bold">Architecture Flow</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-1 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#00687a] animate-pulse" />
                <span className="font-mono text-xs text-[#0b1c30] font-semibold">JNTU-GV R23 Standard</span>
                <span className="text-[#464555] text-[11px] font-mono">• Realtime Verification</span>
              </div>
            </div>

            {/* Page Title & Micro Description */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
                Engineering Discipline Architecture & Placements
              </h1>
              <p className="text-xs sm:text-sm text-[#464555] max-w-3xl leading-relaxed">
                End-to-end multi-tier curriculum blueprints connecting collegiate foundational mathematics, core lab deliverables, simulation toolchains, and high-yield recruitment tracks.
              </p>
            </div>

            {/* Branch Selection Matrix (The 6 Major Branches) */}
            <div className="flex flex-col gap-2.5 bg-[#eff4ff] p-4 rounded-2xl shadow-xs border border-[#dce9ff]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#464555] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">hub</span>
                  Select Engineering Discipline (Branch Pipeline)
                </span>
                <span className="font-mono text-[11px] text-[#464555] bg-[#e5eeff] px-2 py-0.5 rounded font-semibold">
                  R23 Standard Track
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {BRANCH_TABS.map(tab => {
                  const isSelected = selectedBranch === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedBranch(tab.id)}
                      className={`relative flex flex-col p-3.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#4f46e5] text-white shadow-md ring-2 ring-[#3525cd] -translate-y-0.5'
                          : 'bg-white hover:bg-white/80 text-[#0b1c30] shadow-2xs hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span
                          className={`font-mono text-[11px] px-1.5 py-0.5 rounded font-bold ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-[#e5eeff] text-[#464555]'
                          }`}
                        >
                          {tab.codeNum} {isSelected ? 'ACTIVE' : ''}
                        </span>
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            isSelected ? 'text-white' : tab.themeColor
                          }`}
                        >
                          {tab.icon}
                        </span>
                      </div>
                      <span className={`text-sm font-extrabold ${isSelected ? 'text-white' : 'text-[#0b1c30]'}`}>
                        {tab.short}
                      </span>
                      <span
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[#464555]'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stream Focus Banner (Active Stream Metrics) */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#e5eeff] p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-2xl relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#e2dfff] text-[#0f0069] font-bold tracking-wider">
                    DISCIPLINE: {branchData.short_name}-{BRANCH_TABS.find(t => t.id === selectedBranch)?.codeNum || '02'}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#acedff] text-[#001f26] font-bold">
                    SEM 1 TO 8 SYLLABUS
                  </span>
                  <span className="font-mono text-xs text-[#464555]">
                    • JNTU-GV Autonomous Standard
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#0b1c30]">
                  {branchData.name}
                </h2>

                <p className="text-xs text-[#464555] leading-relaxed">
                  {branchData.overview}
                </p>

                {/* Metrics Strip */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">
                      Highest Verified CTC
                    </span>
                    <span className="text-lg font-black text-[#3525cd]">
                      {branchData.highest_package}
                    </span>
                    <span className="font-mono text-[10px] text-[#464555]">
                      {selectedBranch === 'eee' ? 'Tesla / Schneider Electric' : selectedBranch === 'ece' ? 'Qualcomm / Nvidia ASIC' : 'Google / Microsoft'}
                    </span>
                  </div>

                  <div className="w-px h-8 bg-[#d3e4fe]" />

                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">
                      Average Core CTC
                    </span>
                    <span className="text-lg font-black text-[#0b1c30]">
                      {branchData.average_package}
                    </span>
                    <span className="font-mono text-[10px] text-[#464555]">
                      {selectedBranch === 'eee' ? 'EV Powertrain & PSUs' : 'Core Product & IoT'}
                    </span>
                  </div>

                  <div className="w-px h-8 bg-[#d3e4fe]" />

                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">
                      Accreditation
                    </span>
                    <span className="text-lg font-black text-[#00687a]">NBA Tier-1</span>
                    <span className="font-mono text-[10px] text-[#464555]">
                      Outcome-Based Education
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 relative z-10">
                <a
                  href={branchData.syllabus_pdf_url}
                  download={branchData.syllabus_pdf_url.split('/').pop() || `${branchData.branch_code}_syllabus.pdf`}
                  className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#3525cd] text-white font-semibold text-xs shadow-md hover:bg-[#4f46e5] transition-all hover:scale-[1.01]"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Official PDF (R23)</span>
                </a>

                <button
                  onClick={() => {
                    setPreviewPdfUrl(branchData.syllabus_pdf_url);
                    setPreviewPdfTitle(branchData.syllabus_pdf_title);
                  }}
                  className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#e5eeff] text-[#0b1c30] font-semibold text-xs hover:bg-[#dce9ff] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Preview Syllabus Blueprint</span>
                </button>

                <a
                  href="/docs/academic_blueprint.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 font-mono text-[11px] text-[#3525cd] hover:underline pt-1"
                >
                  <span>View Master Regulations Copy</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* View Mode Sub-tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-[#eff4ff] p-1.5 rounded-xl shadow-2xs border border-[#dce9ff]">
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => setCareerFlowMode('architecture')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    careerFlowMode === 'architecture'
                      ? 'bg-white text-[#0b1c30] shadow-xs'
                      : 'text-[#464555] hover:text-[#0b1c30] hover:bg-white/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[#3525cd] text-[18px]">account_tree</span>
                  <span>Visual Architecture Flow Diagram</span>
                </button>

                <button
                  onClick={() => setCareerFlowMode('semesters')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    careerFlowMode === 'semesters'
                      ? 'bg-white text-[#0b1c30] shadow-xs'
                      : 'text-[#464555] hover:text-[#0b1c30] hover:bg-white/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_view_week</span>
                  <span>4-Year Semester Grid (All 8 Sems)</span>
                </button>

                <button
                  onClick={() => setCareerFlowMode('placements')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    careerFlowMode === 'placements'
                      ? 'bg-white text-[#0b1c30] shadow-xs'
                      : 'text-[#464555] hover:text-[#0b1c30] hover:bg-white/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                  <span>PSU & Corporate Placements Matrix</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 px-3">
                <span className="font-mono text-[11px] text-[#464555] uppercase font-semibold">Flow Mode:</span>
                <span className="font-mono text-[11px] text-[#3525cd] font-bold">Comprehensive Multi-Phase</span>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* ARCHITECTURE FLOW DIAGRAM (Phases 01 to 05)                            */}
            {/* ===================================================================== */}
            {careerFlowMode === 'architecture' && (
              <div className="flex flex-col gap-5 relative">
                {/* PHASE 01 */}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#eff4ff]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        01
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0b1c30]">
                            Phase 01: Foundational Modeling & Circuit Laws
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                            Year 1 (Sem 1 & 2)
                          </span>
                        </div>
                        <span className="text-xs text-[#464555]">
                          Mathematical Rigor, Differential Calculus, Matrix Algebra & Passive Network Theorems
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs bg-[#eff4ff] px-3 py-1 rounded-lg">
                      <span className="text-[#464555] font-medium">Input Prerequisites:</span>
                      <span className="text-[#3525cd] font-bold">+2 MPC Physics & Calculus</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {/* Core Modules */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#3525cd] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Core Architecture Modules
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs text-[#0b1c30]">
                        {branchData.four_year_plan[0].semesters[0].core_subjects.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]" />
                          <span>Differential Equations & Transform Calculus</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd]" />
                          <span>Engineering Graphics & CAD Drafting</span>
                        </li>
                      </ul>
                    </div>

                    {/* Toolchains */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#00687a] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                        Simulation Toolchains
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['LTspice', 'MATLAB Basic Scripts', 'Tinkercad Circuits', 'AutoCAD Electrical'].map(t => (
                          <span key={t} className="font-mono text-[11px] px-2 py-1 rounded bg-white text-[#0b1c30] font-semibold shadow-2xs border border-[#dce9ff]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#464555] font-bold uppercase">Laboratory Testing Gates</span>
                        <span className="text-xs text-[#0b1c30]">
                          {branchData.four_year_plan[0].semesters[0].labs.join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Hardware Deliverable */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#41485e] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">hardware</span>
                        Hardware / Prototype Deliverable
                      </span>
                      <div className="p-2.5 rounded-lg bg-white text-[#0b1c30] text-xs shadow-2xs border border-[#dce9ff]">
                        <span className="font-semibold text-[#0b1c30] block mb-0.5">Bench Milestone 01:</span>
                        Verification of Thevenin/Norton Theorems on Breadboard with Dual Trace DSO & DC Bench Supply.
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#464555]">
                          <span>Competency Gate</span>
                          <span className="text-[#3525cd] font-bold">KVL/KCL, AC Phasors, Resonance</span>
                        </div>
                        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-1 overflow-hidden">
                          <div className="bg-[#3525cd] h-1.5 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Spine Marker 1 -> 2 */}
                <div className="flex items-center justify-center -my-2.5 z-10">
                  <span className="bg-white text-[#3525cd] px-3.5 py-1 rounded-full shadow-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                    Pipeline Flow: Network Theorems Feed Electromagnetic Machinery
                  </span>
                </div>

                {/* PHASE 02 */}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#eff4ff]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00687a] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        02
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0b1c30]">
                            Phase 02: Electromagnetic Energy & Rotating Core Machines Bus
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                            Year 2 (Sem 3 & 4)
                          </span>
                        </div>
                        <span className="text-xs text-[#464555]">
                          Faraday&apos;s Laws, DC Motors/Generators, Transformers, 3-Phase Induction & Synchronous Machines
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs bg-[#eff4ff] px-3 py-1 rounded-lg">
                      <span className="text-[#464555] font-medium">Prerequisite:</span>
                      <span className="text-[#00687a] font-bold">Circuit Analysis & Maxwell EMF Equations</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {/* Core Modules */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#00687a] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Core Architecture Modules
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs text-[#0b1c30]">
                        {branchData.four_year_plan[1].semesters[0].core_subjects.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00687a]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                        {branchData.four_year_plan[1].semesters[1].core_subjects.slice(0, 2).map((sub, idx) => (
                          <li key={`sem2-${idx}`} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00687a]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Toolchains */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#00687a] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                        Simulation Toolchains
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['MATLAB Simscape Electrical', 'Ansys Maxwell (FEA)', 'PSpice Multisim', 'Proteus Design Suite'].map(t => (
                          <span key={t} className="font-mono text-[11px] px-2 py-1 rounded bg-white text-[#0b1c30] font-semibold shadow-2xs border border-[#dce9ff]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#464555] font-bold uppercase">Laboratory Testing Gates</span>
                        <span className="text-xs text-[#0b1c30]">
                          {branchData.four_year_plan[1].semesters[0].labs.join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Hardware Deliverable */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#41485e] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">hardware</span>
                        Hardware / Prototype Deliverable
                      </span>
                      <div className="p-2.5 rounded-lg bg-white text-[#0b1c30] text-xs shadow-2xs border border-[#dce9ff]">
                        <span className="font-semibold text-[#0b1c30] block mb-0.5">Bench Milestone 02:</span>
                        Open-Circuit & Short-Circuit Pre-determination of Transformer Efficiency; DC Shunt Motor 3-Point Starter Speed Rig.
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#464555]">
                          <span>Competency Gate</span>
                          <span className="text-[#00687a] font-bold">Magnetic Circuit Sizing & RMF Synchronization</span>
                        </div>
                        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-1 overflow-hidden">
                          <div className="bg-[#00687a] h-1.5 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Spine Marker 2 -> 3 */}
                <div className="flex items-center justify-center -my-2.5 z-10">
                  <span className="bg-white text-[#3525cd] px-3.5 py-1 rounded-full shadow-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                    Pipeline Flow: Machine Dynamics Feed Semiconductor Converters & Linear Feedback Control
                  </span>
                </div>

                {/* PHASE 03 */}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#eff4ff]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#4f46e5] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        03
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0b1c30]">
                            Phase 03: Power Converter Processing & Linear Control Core
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                            Year 3 (Sem 5 & 6)
                          </span>
                        </div>
                        <span className="text-xs text-[#464555]">
                          Power Electronics (MOSFET/IGBT Converters), Power Systems Analysis, PID Controllers & Microcontrollers
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs bg-[#eff4ff] px-3 py-1 rounded-lg">
                      <span className="text-[#464555] font-medium">Prerequisite:</span>
                      <span className="text-[#4f46e5] font-bold">AC Machines & Laplace Transform Stability</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {/* Core Modules */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#4f46e5] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Core Architecture Modules
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs text-[#0b1c30]">
                        {branchData.four_year_plan[2].semesters[0].core_subjects.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                        {branchData.four_year_plan[2].semesters[1].core_subjects.slice(0, 2).map((sub, idx) => (
                          <li key={`sem3-${idx}`} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Toolchains */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#4f46e5] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                        Simulation Toolchains
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['ETAP (Load Flow & Faults)', 'PSCAD Transients', 'Keil uVision (ARM)', 'Simulink Control Design'].map(t => (
                          <span key={t} className="font-mono text-[11px] px-2 py-1 rounded bg-white text-[#0b1c30] font-semibold shadow-2xs border border-[#dce9ff]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#464555] font-bold uppercase">Laboratory Testing Gates</span>
                        <span className="text-xs text-[#0b1c30]">
                          {branchData.four_year_plan[2].semesters[0].labs.join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Hardware Deliverable */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#41485e] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">hardware</span>
                        Hardware / Prototype Deliverable
                      </span>
                      <div className="p-2.5 rounded-lg bg-white text-[#0b1c30] text-xs shadow-2xs border border-[#dce9ff]">
                        <span className="font-semibold text-[#0b1c30] block mb-0.5">Bench Milestone 03:</span>
                        Closed-Loop DC-DC Buck/Boost Converter with PWM Microcontroller Gate Driver & Current Feedback Protection.
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#464555]">
                          <span>Competency Gate</span>
                          <span className="text-[#4f46e5] font-bold">Root Locus Stability & THD Filter Design</span>
                        </div>
                        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-1 overflow-hidden">
                          <div className="bg-[#4f46e5] h-1.5 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Spine Marker 3 -> 4 */}
                <div className="flex items-center justify-center -my-2.5 z-10">
                  <span className="bg-white text-[#3525cd] px-3.5 py-1 rounded-full shadow-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1 border border-[#dce9ff]">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                    Pipeline Flow: Converter Topology Integrates into Smart Grid, EV Powertrains & Industrial SCADA
                  </span>
                </div>

                {/* PHASE 04 */}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#e5eeff] hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#eff4ff]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        04
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0b1c30]">
                            Phase 04: Industrial Automation, EV & Smart Grid Specialization Engine
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] font-semibold">
                            Year 4 (Sem 7 & 8)
                          </span>
                        </div>
                        <span className="text-xs text-[#464555]">
                          Electric Vehicle Drivetrains, Battery Management Systems (BMS), PLC / SCADA Automation & Capstone Thesis
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs bg-[#eff4ff] px-3 py-1 rounded-lg">
                      <span className="text-[#464555] font-medium">Prerequisite:</span>
                      <span className="text-emerald-700 font-bold">Power Converters & Grid Fault Protection</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {/* Core Modules */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Core Architecture Modules
                      </span>
                      <ul className="flex flex-col gap-1.5 text-xs text-[#0b1c30]">
                        {branchData.four_year_plan[3].semesters[0].core_subjects.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <span>{sub}</span>
                          </li>
                        ))}
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Industry Internship & Capstone Project Evaluation</span>
                        </li>
                      </ul>
                    </div>

                    {/* Toolchains */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                        Simulation Toolchains
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Siemens TIA Portal', 'DIgSILENT PowerFactory', 'Simscape Battery & Driveline', 'KiCad Multi-layer'].map(t => (
                          <span key={t} className="font-mono text-[11px] px-2 py-1 rounded bg-white text-[#0b1c30] font-semibold shadow-2xs border border-[#dce9ff]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#464555] font-bold uppercase">Laboratory Testing Gates</span>
                        <span className="text-xs text-[#0b1c30]">
                          {branchData.four_year_plan[3].semesters[0].labs.join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Hardware Deliverable */}
                    <div className="flex flex-col gap-2 p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                      <span className="font-mono text-xs text-[#41485e] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">hardware</span>
                        Capstone Project Deliverable
                      </span>
                      <div className="p-2.5 rounded-lg bg-white text-[#0b1c30] text-xs shadow-2xs border border-[#dce9ff]">
                        <span className="font-semibold text-[#0b1c30] block mb-0.5">Capstone Thesis:</span>
                        {branchData.featured_projects[2]?.title || 'Complete EV Battery Management System (BMS) with CAN Bus & Active Cell Balancing'}: {branchData.featured_projects[2]?.description.slice(0, 110)}...
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#464555]">
                          <span>Competency Gate</span>
                          <span className="text-emerald-700 font-bold">Production Sizing & SCADA Synchronization</span>
                        </div>
                        <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-1 overflow-hidden">
                          <div className="bg-emerald-600 h-1.5 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Spine Marker 4 -> 5 */}
                <div className="flex items-center justify-center -my-2.5 z-10">
                  <span className="bg-[#0b1c30] text-white px-4 py-1.5 rounded-full shadow-md text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">arrow_downward</span>
                    Architecture Output Demux: 4 High-Growth Career Placement Gateways
                  </span>
                </div>

                {/* PHASE 05: CAREER GATEWAYS DEMUX (STITCH CANVAS SPEC) */}
                <div className="bg-[#0b1c30] text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-5 border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        05
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-white">
                          Phase 05: Output Career Architecture & Industry Placement Gateways
                        </h4>
                        <p className="text-xs text-slate-400">
                          {branchData.name} graduates demux into 4 distinct, lucrative national and international technical pathways.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-xl">
                      Peak CTC: {branchData.highest_package}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {/* Track A: PSUs & GATE */}
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                          Track A: PSUs & GATE
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">Central PSUs & Power Utilities</h5>
                      <p className="text-[11px] text-slate-300">
                        Executive Trainee in PGCIL, NTPC, BHEL, ISRO, NPCIL, and State TRANSCO/GENCO.
                      </p>
                      <div className="pt-2 border-t border-slate-700/60">
                        <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {branchData.psu_recruiters.slice(0, 4).map(c => (
                            <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                              {c.split('(')[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Track B: EV & Power Electronics */}
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          Track B: EV & Power Tech
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">Electric Vehicles & Grid MNCs</h5>
                      <p className="text-[11px] text-slate-300">
                        BMS Design Engineer, Inverter R&D, Motor Drive Specialist, Renewable Grid Specialist.
                      </p>
                      <div className="pt-2 border-t border-slate-700/60">
                        <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {['Schneider', 'Tesla', 'Ather Energy', 'ABB Group', 'Bosch'].map(c => (
                            <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Track C: Industrial Automation & Robotics */}
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                          Track C: Automation & IoT
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">PLC / SCADA & Robotics</h5>
                      <p className="text-[11px] text-slate-300">
                        Industrial Automation Engineer, Embedded Hardware Designer, Substation Automation Engineer.
                      </p>
                      <div className="pt-2 border-t border-slate-700/60">
                        <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {['Siemens', 'Honeywell', 'Rockwell', 'L&T Electrical'].map(c => (
                            <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Track D: Software & Tech Product */}
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                          Track D: Tech & Software
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white">High-Growth Tech / SDE</h5>
                      <p className="text-[11px] text-slate-300">
                        C++ Firmware Engineer, Data Pipelines, Algorithmic Optimization, Cloud Integration.
                      </p>
                      <div className="pt-2 border-t border-slate-700/60">
                        <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {['TCS Digital', 'Cognizant GenC', 'Infosys DSE', 'Product MNCs'].map(c => (
                            <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Semesters Grid */}
            {careerFlowMode === 'semesters' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                {branchData.four_year_plan.map(yearPlan => (
                  <div key={yearPlan.year} className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0b1c30] text-white font-mono">
                        {yearPlan.stage_name}
                      </span>
                      <span className="text-[11px] font-semibold text-[#3525cd] bg-[#e5eeff] px-2 py-0.5 rounded font-mono">
                        {yearPlan.certification}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0b1c30]">{yearPlan.title}</h4>
                    <p className="text-xs text-[#464555]">{yearPlan.theme}</p>

                    <div className="space-y-2.5 pt-2">
                      {yearPlan.semesters.map(sem => (
                        <div key={sem.sem_number} className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-1">
                          <span className="text-xs font-bold text-[#0b1c30] block">{sem.sem_name}</span>
                          <span className="font-mono text-[10px] text-[#464555] block">Core Courses:</span>
                          <p className="text-xs text-[#0b1c30]">{sem.core_subjects.join(' • ')}</p>
                          <div className="pt-1 text-[11px] text-[#3525cd] font-medium">
                            Labs: {sem.labs.join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View 3: Placements Matrix */}
            {careerFlowMode === 'placements' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm space-y-3">
                    <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-[#0b1c30]">
                      Top Central PSUs (GATE Qualification)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {branchData.psu_recruiters.map(p => (
                        <span key={p} className="px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0b1c30]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm space-y-3">
                    <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-[#0b1c30]">
                      Tier-1 Corporate & MNC Recruiters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {branchData.corporate_recruiters.map(c => (
                        <span key={c} className="px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0b1c30]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: STUDY PLANNER & TRACKER (STITCH CANVAS: 449d59f0dc2a4bf19cb336942a)*/}
        {/* ========================================================================= */}
        {activeTab === 'planner' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#e5eeff]">
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#3525cd] font-mono text-[11px] font-bold uppercase">
                    JNTU-GV // R23 Curricular Engine
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#464555]">
                    <span className="w-2 h-2 rounded-full bg-[#00687a] animate-pulse" />
                    Sync Active • 12ms
                  </span>
                </div>
                <h1 className="text-2xl font-black text-[#0b1c30] mt-1">
                  Student Study Dashboard & Precision Tracker
                </h1>
                <p className="text-xs text-[#464555]">
                  Analyze daily learning efficiency, track study streaks, launch high-precision stopwatches, and synthesize exam readiness.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold shadow-2xs transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">add_circle</span>
                  <span>+ Add Custom Subject</span>
                </button>
                <button
                  onClick={() => {
                    setTimetable(DEFAULT_TIMETABLE);
                    setToastMessage('Auto-balanced standard R23 study timetable.');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold shadow-sm hover:bg-[#4f46e5] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                  <span>Auto-Balance Schedule</span>
                </button>
              </div>
            </div>

            {/* 4-Card KPI Metric Row (Stitch Design) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* KPI 1 */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">Today&apos;s Study Target</span>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-2xl font-black text-[#0b1c30]">1.8h</span>
                      <span className="text-xs text-[#464555] font-semibold">/ 3.2h</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
                    <span className="material-symbols-outlined text-[20px]">timer</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1 text-[11px]">
                    <span className="font-bold text-[#3525cd]">57% Achieved</span>
                    <span className="text-[#464555] font-semibold">On Track</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
                    <div className="h-full bg-[#3525cd] rounded-full" style={{ width: '57%' }} />
                  </div>
                </div>
              </div>

              {/* KPI 2 */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">Consistency Streak</span>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-2xl font-black text-[#0b1c30]">5 Days</span>
                      <span className="text-lg">🔥</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#00687a]">
                    <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#464555]">Personal Record</span>
                  <span className="text-emerald-700 font-bold">14 Days Clean</span>
                </div>
              </div>

              {/* KPI 3 */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">Focus Rate / Efficiency</span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-2xl font-black text-[#0b1c30]">92%</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-emerald-700">
                    <span className="material-symbols-outlined text-[20px]">insights</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-[#464555]">Active Concentration</span>
                  <span className="text-emerald-700 font-bold">+4% vs Yesterday</span>
                </div>
              </div>

              {/* KPI 4 */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#464555] uppercase font-bold">Schedule Completion</span>
                    <div className="flex items-baseline gap-1 mt-1.5">
                      <span className="text-2xl font-black text-[#0b1c30]">
                        {Object.values(completedSessions).filter(Boolean).length}
                      </span>
                      <span className="text-xs text-[#464555] font-semibold">/ {timetable.filter(t => !t.is_break).length} Finished</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{
                        width: `${Math.round((Object.values(completedSessions).filter(Boolean).length / Math.max(1, timetable.filter(t => !t.is_break).length)) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Two-Column Layout: Left Timetable, Right Live Focus Stopwatch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (7 cols): Today's Timetable */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#3525cd] text-[18px]">calendar_today</span>
                    <h3 className="text-sm font-bold text-[#0b1c30]">Today&apos;s Interactive Study Timetable</h3>
                  </div>
                  <span className="font-mono text-[11px] text-[#464555]">
                    {timetable.length} Scheduled Slots
                  </span>
                </div>

                <div className="space-y-2.5">
                  {timetable.map((item, idx) => {
                    const isDone = completedSessions[item.subject_id];
                    if (item.is_break) {
                      return (
                        <div
                          key={idx}
                          className="bg-[#eff4ff]/60 border border-dashed border-[#dce9ff] p-3 rounded-xl flex items-center justify-between text-xs text-[#464555]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-[#00687a]">bedtime</span>
                            <span className="font-semibold">{item.subject_name}</span>
                          </div>
                          <span className="font-mono text-[11px]">{item.time_slot} ({item.planned_minutes}m)</span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item.subject_id}
                        className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isDone
                            ? 'bg-[#eff4ff]/40 border-[#dce9ff] opacity-65'
                            : 'bg-white border-[#e5eeff] hover:border-[#3525cd]/40 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setCompletedSessions(prev => ({
                                ...prev,
                                [item.subject_id]: !prev[item.subject_id]
                              }))
                            }
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'border border-[#c7c4d8] hover:border-[#3525cd]'
                            }`}
                          >
                            {isDone && <Check className="h-4 w-4" />}
                          </button>

                          <div>
                            <h4 className={`text-xs font-bold ${isDone ? 'line-through text-[#464555]' : 'text-[#0b1c30]'}`}>
                              {item.subject_name}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-[#464555] font-mono mt-0.5">
                              <span>{item.subject_code}</span>
                              <span>•</span>
                              <span>{item.time_slot}</span>
                              <span>•</span>
                              <span>{item.planned_minutes} min</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveSessionName(item.subject_name);
                            setStopwatchRunning(true);
                            setActiveTab('focus');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#3525cd] hover:text-white text-[#3525cd] font-bold text-xs transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span>Start Focus</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Reflection Notes */}
                <div className="pt-3 border-t border-[#eff4ff] space-y-2">
                  <span className="font-mono text-xs text-[#0b1c30] font-bold block">
                    Daily Study Reflection & Weak Spot Log:
                  </span>
                  <textarea
                    value={reflectionText}
                    onChange={e => setReflectionText(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border border-[#dce9ff] bg-[#eff4ff]/40 text-xs text-[#0b1c30] focus:ring-2 focus:ring-[#3525cd]/20 focus:outline-none"
                    placeholder="Log formulas to review or topics for tomorrow..."
                  />
                </div>
              </div>

              {/* Right Column (5 cols): High-Precision Stopwatch Preview */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#3525cd] text-[18px]">timer</span>
                    <h3 className="text-sm font-bold text-[#0b1c30]">Live Focus Stopwatch Room</h3>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-[#eff4ff]/60 rounded-2xl border border-[#dce9ff]">
                  <span className="text-[11px] font-mono text-[#464555] uppercase font-semibold mb-2">
                    Active Study Target
                  </span>
                  <h4 className="text-xs font-bold text-[#0b1c30] text-center mb-4 line-clamp-1">
                    {activeSessionName}
                  </h4>

                  {/* Circular Timer Visual */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        className="stroke-[#dce9ff]"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        className="stroke-[#3525cd] transition-all duration-1000"
                        strokeWidth="6"
                        strokeDasharray="276"
                        strokeDashoffset={276 - (276 * (stopwatchSeconds / 3000))}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black font-mono text-[#0b1c30]">
                        {formatTimer(stopwatchSeconds)}
                      </span>
                      <span className="text-[10px] font-mono text-[#464555] uppercase mt-0.5">
                        {stopwatchRunning ? 'Focus Active' : 'Paused'}
                      </span>
                    </div>
                  </div>

                  {/* Stopwatch Controls */}
                  <div className="flex items-center gap-3 mt-5">
                    <button
                      onClick={() => setStopwatchRunning(!stopwatchRunning)}
                      className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5 ${
                        stopwatchRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#3525cd] hover:bg-[#4f46e5]'
                      }`}
                    >
                      {stopwatchRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                      <span>{stopwatchRunning ? 'Pause' : 'Start Focus'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setStopwatchRunning(false);
                        setStopwatchSeconds(1890);
                      }}
                      className="p-2 rounded-xl border border-[#dce9ff] text-[#464555] hover:bg-white text-xs"
                      title="Reset Timer"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { id: 'pomodoro', label: 'Pomodoro', mins: 25, sec: 1500 },
                    { id: 'deep', label: 'Deep Work', mins: 50, sec: 3000 },
                    { id: 'custom', label: 'Standard', mins: 30, sec: 1800 }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setStopwatchMode(m.id as any);
                        setStopwatchSeconds(m.sec);
                        setStopwatchRunning(false);
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        stopwatchMode === m.id
                          ? 'bg-[#3525cd] text-white font-bold border-[#3525cd]'
                          : 'bg-white border-[#dce9ff] text-[#0b1c30] hover:bg-[#eff4ff]'
                      }`}
                    >
                      <div className="font-semibold">{m.label}</div>
                      <div className="text-[10px] opacity-80">{m.mins} min</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: BTECH RESOURCES (STITCH CANVAS SCREEN: ab8e3d3a9ba944de80a07af54c)  */}
        {/* ========================================================================= */}
        {activeTab === 'resources' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header */}
            <div className="pb-4 border-b border-[#e5eeff]">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#e2dfff] text-[#0f0069] font-bold">
                B.Tech Curricular Bank // R23 Regulation
              </span>
              <h1 className="text-2xl font-black text-[#0b1c30] mt-1">
                BTech University Syllabi, Question Papers & Lab Manuals
              </h1>
              <p className="text-xs text-[#464555]">
                Direct zero-error downloads of verified autonomous college PDFs, JNTU-GV, AU, and JNTU-K question banks.
              </p>
            </div>

            {/* University & Branch Filters */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5eeff] shadow-xs space-y-4">
              <div>
                <span className="font-mono text-xs text-[#464555] font-bold uppercase block mb-2">
                  Select Affiliated University / Autonomous Board:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'jntugv', name: 'JNTU-GV (Vizianagaram)', reg: 'R23 / R20' },
                    { id: 'au', name: 'Andhra University (AU)', reg: 'Autonomous' },
                    { id: 'jntuk', name: 'JNTU-K (Kakinada)', reg: 'R20 / R23' },
                    { id: 'jntuh', name: 'JNTU-H (Hyderabad)', reg: 'R22' }
                  ].map(u => (
                    <button
                      key={u.id}
                      onClick={() => setResourceUniversity(u.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        resourceUniversity === u.id
                          ? 'bg-[#3525cd] text-white shadow-xs'
                          : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                      }`}
                    >
                      {u.name} <span className="text-[10px] opacity-75">({u.reg})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Filter Chips */}
              <div>
                <span className="font-mono text-xs text-[#464555] font-bold uppercase block mb-2">
                  Discipline Branch Filter:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Branches' },
                    { id: 'eee', label: 'EEE' },
                    { id: 'ece', label: 'ECE' },
                    { id: 'cse', label: 'CSE' },
                    { id: 'aiml', label: 'AI & ML' },
                    { id: 'mech', label: 'Mechanical' },
                    { id: 'civil', label: 'Civil' }
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setResourceBranch(b.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        resourceBranch === b.id
                          ? 'bg-[#0b1c30] text-white'
                          : 'bg-[#eff4ff] text-[#464555] hover:text-[#0b1c30]'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: 'res_1',
                  branch: 'eee',
                  title: 'JNTU-GV EEE R23 Electrical Circuit Analysis (ECA) Official Syllabus Copy',
                  code: 'R23-EEE-1102',
                  pdf: '/docs/jntugv_eee_eca.pdf',
                  type: 'Official Syllabus'
                },
                {
                  id: 'res_2',
                  branch: 'eee',
                  title: 'JNTU-GV EEE DC Machines & Transformers PYQ Analysis Question Bank',
                  code: 'R20-EEE-2101',
                  pdf: '/docs/jntugv_eee_machines_pyq.pdf',
                  type: 'Question Bank'
                },
                {
                  id: 'res_3',
                  branch: 'eee',
                  title: 'JNTU-K EEE Basic Electrical Engineering (BEE) Lab Manual & Procedures',
                  code: 'R23-EEE-LAB1',
                  pdf: '/docs/jntuk_eee_bee_lab_manual.pdf',
                  type: 'Lab Manual'
                },
                {
                  id: 'res_4',
                  branch: 'cse',
                  title: 'JNTU-GV CSE R23 Linear Algebra & Calculus (M1) Official Syllabus',
                  code: 'R23-CS-1101',
                  pdf: '/docs/jntugv_cse_linear_algebra_m1.pdf',
                  type: 'Official Syllabus'
                },
                {
                  id: 'res_5',
                  branch: 'ece',
                  title: 'JNTU-GV ECE R23 Electronic Devices & Circuits (EDC) Syllabus Copy',
                  code: 'R23-EC-1101',
                  pdf: '/docs/jntugv_ece_edc.pdf',
                  type: 'Official Syllabus'
                },
                {
                  id: 'res_6',
                  branch: 'aiml',
                  title: 'JNTU-GV AI & Machine Learning Foundations R23 Official Syllabus Copy',
                  code: 'R23-AI-1101',
                  pdf: '/docs/jntugv_aiml_foundations.pdf',
                  type: 'Official Syllabus'
                }
              ]
                .filter(item => resourceBranch === 'all' || item.branch === resourceBranch)
                .map(res => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-sm transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#eff4ff] text-[#3525cd]">
                          {res.type}
                        </span>
                        <span className="font-mono text-[10px] text-[#464555]">{res.code}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[#0b1c30] leading-snug line-clamp-2">
                        {res.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#eff4ff]">
                      <a
                        href={res.pdf}
                        download
                        className="flex-1 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold text-center hover:bg-[#4f46e5] transition-colors flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </a>
                      <button
                        onClick={() => {
                          setPreviewPdfUrl(res.pdf);
                          setPreviewPdfTitle(res.title);
                        }}
                        className="p-2 rounded-xl border border-[#dce9ff] text-[#464555] hover:bg-[#eff4ff] transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FOCUS ROOM (STITCH CANVAS SCREEN: 9671e3138b8a4dfb93537da548ce93b)*/}
        {/* ========================================================================= */}
        {activeTab === 'focus' && (
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-8 space-y-7 animate-in fade-in duration-150">
            <div className="text-center space-y-1">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#e2dfff] text-[#0f0069] font-bold uppercase">
                High-Performance Focus Room
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
                {activeSessionName}
              </h1>
              <p className="text-xs text-[#464555]">
                Eliminate distractions. Calibrate your deep work cadence with precision timer intervals.
              </p>
            </div>

            {/* Big Stopwatch Display */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-[#dce9ff]"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-[#3525cd] transition-all duration-1000"
                  strokeWidth="5"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * (stopwatchSeconds / 3000))}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black font-mono text-[#0b1c30] tracking-tight">
                  {formatTimer(stopwatchSeconds)}
                </span>
                <span className="font-mono text-xs text-[#464555] uppercase mt-1">
                  {stopwatchRunning ? '🔥 Concentration Mode' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setStopwatchRunning(!stopwatchRunning)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold text-white shadow-md transition-all flex items-center gap-2 ${
                  stopwatchRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#3525cd] hover:bg-[#4f46e5]'
                }`}
              >
                {stopwatchRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                <span>{stopwatchRunning ? 'Pause Session' : 'Start Focus'}</span>
              </button>

              <button
                onClick={() => {
                  setStopwatchRunning(false);
                  setStopwatchSeconds(1890);
                }}
                className="p-3 rounded-2xl border border-[#dce9ff] text-[#464555] hover:bg-white text-sm"
                title="Reset"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Status Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#0b1c30] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Interactive Document Preview Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#e5eeff] w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-[#f8f9ff] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3525cd] text-white flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0b1c30]">
                    {previewPdfTitle || 'Official Syllabus Blueprint'}
                  </h3>
                  <p className="text-[11px] text-[#464555] font-mono">
                    {previewPdfUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewPdfUrl}
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-[#3525cd] text-white text-xs font-bold hover:bg-[#4f46e5] flex items-center gap-1"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setPreviewPdfUrl(null)}
                  className="p-2 rounded-xl text-[#464555] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#eff4ff] relative">
              <iframe
                src={`${previewPdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewPdfTitle || 'Syllabus Preview'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#e5eeff] shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30]">Add Custom Study Subject</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#464555]">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Subject Title</label>
                <input
                  type="text"
                  value={newSubName}
                  onChange={e => setNewSubName(e.target.value)}
                  placeholder="e.g. Electric Vehicle Powertrain Modeling"
                  className="w-full p-2.5 rounded-xl border border-[#dce9ff] bg-[#eff4ff]/40"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Subject Code / Topic Tag</label>
                <input
                  type="text"
                  value={newSubCode}
                  onChange={e => setNewSubCode(e.target.value)}
                  placeholder="e.g. R23-EE-EV401"
                  className="w-full p-2.5 rounded-xl border border-[#dce9ff] bg-[#eff4ff]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newSubDuration}
                    onChange={e => setNewSubDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#dce9ff] bg-[#eff4ff]/40"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newSubTime}
                    onChange={e => setNewSubTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#dce9ff] bg-[#eff4ff]/40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#464555]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newSubName.trim()) return;
                  const newSession: TimetableAllocation = {
                    subject_id: `custom_${Date.now()}`,
                    subject_name: newSubName.trim(),
                    subject_code: newSubCode.trim() || 'CUSTOM',
                    planned_minutes: newSubDuration || 45,
                    time_slot: newSubTime || '04:00 PM - 04:45 PM',
                    session_order: timetable.length + 1,
                    is_break: false
                  };
                  setTimetable([...timetable, newSession]);
                  setShowAddModal(false);
                  setNewSubName('');
                  setNewSubCode('');
                  setToastMessage(`Added "${newSession.subject_name}" to schedule.`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-4 py-2 rounded-xl bg-[#3525cd] text-white text-xs font-bold"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
