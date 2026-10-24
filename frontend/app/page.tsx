'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Milestone,
  Calendar,
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  GraduationCap,
  Briefcase,
  Play,
  Pause,
  Square,
  Plus,
  Minus,
  Trash2,
  RotateCcw,
  Coffee,
  Download,
  Search,
  Sparkles,
  ChevronRight,
  FolderGit2,
  Award,
  Clock,
  User,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
  FileText
} from 'lucide-react';
import { api } from '@/lib/api';
import { CareerRole, EducationalResource, TimetableAllocation, StudyPlan } from '@/types';
import { formatSeconds } from '@/lib/utils';

// Core Education Stages
const STAGES = [
  { id: 'class_9', label: 'Class 9 (Secondary School)', badge: 'NCERT / CBSE / State' },
  { id: 'class_10', label: 'Class 10 (Secondary Board)', badge: 'Board Year' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', badge: 'Junior College' },
  { id: 'diploma', label: 'Diploma / Polytechnic', badge: 'Technical Diploma' },
  { id: 'btech_1', label: 'BTech 1st Year (Sem 1-1 / 1-2)', badge: 'Engineering' }
];

// Pre-configured standard academic schedules
const DEFAULT_CLASS_9_ALLOCATIONS: TimetableAllocation[] = [
  {
    subject_id: 'sub_c9_1',
    subject_name: 'Class 9 Mathematics (Number Systems, Polynomials & Geometry)',
    subject_code: 'CBSE-M09',
    planned_minutes: 50,
    time_slot: '05:00 PM - 05:50 PM',
    session_order: 1,
    is_break: false
  },
  {
    subject_id: 'break_1',
    subject_name: 'Hydration & Rest Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '05:50 PM - 06:00 PM',
    session_order: 2,
    is_break: true,
    break_title: 'Refresh & Hydrate'
  },
  {
    subject_id: 'sub_c9_2',
    subject_name: 'Class 9 Science (Laws of Motion, Gravitation & Atoms)',
    subject_code: 'CBSE-SCI09',
    planned_minutes: 50,
    time_slot: '06:00 PM - 06:50 PM',
    session_order: 3,
    is_break: false
  },
  {
    subject_id: 'break_2',
    subject_name: 'Evening Snack Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '06:50 PM - 07:00 PM',
    session_order: 4,
    is_break: true,
    break_title: 'Snack & Relaxation'
  },
  {
    subject_id: 'sub_c9_3',
    subject_name: 'Class 9 Social Science (History, Geography & Civics)',
    subject_code: 'CBSE-SST09',
    planned_minutes: 45,
    time_slot: '07:00 PM - 07:45 PM',
    session_order: 5,
    is_break: false
  },
  {
    subject_id: 'sub_c9_4',
    subject_name: 'Class 9 English (Beehive Literature & Grammar)',
    subject_code: 'CBSE-ENG09',
    planned_minutes: 40,
    time_slot: '07:50 PM - 08:30 PM',
    session_order: 6,
    is_break: false
  }
];

const DEFAULT_BTECH_1_ALLOCATIONS: TimetableAllocation[] = [
  {
    subject_id: 'sub_bt_1',
    subject_name: 'Linear Algebra & Calculus (Mathematics-I)',
    subject_code: 'BS1101',
    planned_minutes: 50,
    time_slot: '05:00 PM - 05:50 PM',
    session_order: 1,
    is_break: false
  },
  {
    subject_id: 'break_bt_1',
    subject_name: 'Short Coffee Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '05:50 PM - 06:00 PM',
    session_order: 2,
    is_break: true,
    break_title: 'Break'
  },
  {
    subject_id: 'sub_bt_2',
    subject_name: 'Programming for Problem Solving using C (PPS)',
    subject_code: 'ES1102',
    planned_minutes: 50,
    time_slot: '06:00 PM - 06:50 PM',
    session_order: 3,
    is_break: false
  },
  {
    subject_id: 'break_bt_2',
    subject_name: 'Rest Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '06:50 PM - 07:00 PM',
    session_order: 4,
    is_break: true,
    break_title: 'Break'
  },
  {
    subject_id: 'sub_bt_3',
    subject_name: 'Engineering Physics',
    subject_code: 'BS1103',
    planned_minutes: 50,
    time_slot: '07:00 PM - 07:50 PM',
    session_order: 5,
    is_break: false
  },
  {
    subject_id: 'sub_bt_4',
    subject_name: 'Basic Electrical & Electronics Engineering (BEEE)',
    subject_code: 'ES1104',
    planned_minutes: 40,
    time_slot: '07:50 PM - 08:30 PM',
    session_order: 6,
    is_break: false
  }
];

export default function UnifiedPlatformHome() {
  // Active Section Tab: 'careers' | 'planner' | 'resources'
  const [activePortal, setActivePortal] = useState<'careers' | 'planner' | 'resources'>('careers');
  
  // Selected Academic Stage (Defaults to Class 9)
  const [currentStage, setCurrentStage] = useState<string>('class_9');

  // --- SECTION 1: CAREER ROADMAPS STATE ---
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [selectedStreamTab, setSelectedStreamTab] = useState<'mpc' | 'bipc' | 'mec' | 'arts' | 'diploma'>('mpc');

  // --- SECTION 2: STUDY PLANNER & TRACKER STATE ---
  const [allocations, setAllocations] = useState<TimetableAllocation[]>(DEFAULT_CLASS_9_ALLOCATIONS);
  const [dailyMinutes, setDailyMinutes] = useState(240);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDuration, setNewSubDuration] = useState(50);
  const [newSubTime, setNewSubTime] = useState('06:00 PM - 06:50 PM');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Live Stopwatch State
  const [activeTimerSession, setActiveTimerSession] = useState<TimetableAllocation | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerNotes, setTimerNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- SECTION 3: ACADEMIC RESOURCES STATE ---
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [resourceFilterType, setResourceFilterType] = useState<string>('');
  const [resourceSearch, setResourceSearch] = useState<string>('');

  // Initial Load (NO LOGIN REQUIRED)
  useEffect(() => {
    // Check if user previously picked a stage
    const savedStage = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    const initialStage = savedStage || 'class_9';
    setCurrentStage(initialStage);

    async function loadInitialData() {
      try {
        const [rList, resList, plan] = await Promise.all([
          api.get<CareerRole[]>('/careers/roles').catch(() => []),
          api.get<EducationalResource[]>('/resources').catch(() => []),
          api.get<StudyPlan>('/study-plans/current').catch(() => null)
        ]);

        if (rList && rList.length > 0) {
          setRoles(rList);
          // Pick role matching initial stage
          const match = rList.find(r => 
            initialStage === 'class_9' || initialStage === 'class_10'
              ? r.role_code === 'class9_foundation'
              : r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev'
          );
          setSelectedRole(match || rList[0]);
        }

        if (resList) {
          setResources(resList);
        }

        if (plan && plan.allocations && plan.allocations.length > 0) {
          setAllocations(plan.allocations);
          setDailyMinutes(plan.daily_target_minutes);
          setBreakMinutes(plan.break_duration_minutes);
        } else {
          // Default allocations based on stage
          if (initialStage === 'class_9' || initialStage === 'class_10') {
            setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
          } else {
            setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
          }
        }
      } catch (err) {
        console.error('Error loading data', err);
      }
    }
    loadInitialData();
  }, []);

  // Update Academic Stage
  const handleStageChange = (stageId: string) => {
    setCurrentStage(stageId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('study_blueprint_stage', stageId);
    }

    if (stageId === 'class_9' || stageId === 'class_10') {
      const match = roles.find(r => r.role_code === 'class9_foundation');
      if (match) setSelectedRole(match);
      setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
    } else if (stageId === 'btech_1') {
      const match = roles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
      if (match) setSelectedRole(match);
      setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
    } else {
      if (roles.length > 0) setSelectedRole(roles[0]);
    }
    setToastMessage(`Switched academic focus to: ${STAGES.find(s => s.id === stageId)?.label}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Stopwatch interval tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Planner handlers
  const handleAddManualSession = () => {
    if (!newSubName.trim()) return;
    const newSession: TimetableAllocation = {
      subject_id: `custom_${Date.now()}`,
      subject_name: newSubName.trim(),
      subject_code: newSubCode.trim() || `SUB-${allocations.length + 1}`,
      planned_minutes: Number(newSubDuration),
      time_slot: newSubTime,
      session_order: allocations.length + 1,
      is_break: false
    };
    const updated = [...allocations, newSession];
    setAllocations(updated);
    api.put('/study-plans/current', updated).catch(() => null);
    setNewSubName('');
    setNewSubCode('');
    setShowAddModal(false);
    setToastMessage(`Added "${newSession.subject_name}" to your study schedule.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeletePlan = async () => {
    try {
      await api.delete('/study-plans/current');
    } catch (e) {
      // ignore
    }
    setAllocations([]);
    setShowDeleteConfirm(false);
    setToastMessage('Study plan deleted. Your timetable is now completely clear.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRemoveSession = (index: number) => {
    const updated = allocations.filter((_, idx) => idx !== index);
    setAllocations(updated);
    api.put('/study-plans/current', updated).catch(() => null);
  };

  const adjustMinutes = (index: number, delta: number) => {
    const updated = [...allocations];
    const newMinutes = Math.max(15, updated[index].planned_minutes + delta);
    updated[index].planned_minutes = newMinutes;
    setAllocations(updated);
    api.put('/study-plans/current', updated).catch(() => null);
  };

  // Live Timer controls
  const startTimer = (session: TimetableAllocation) => {
    setActiveTimerSession(session);
    setTimerSeconds(0);
    setTimerRunning(true);
    setToastMessage(`Focus timer launched for ${session.subject_name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const stopAndLogTimer = async () => {
    if (!activeTimerSession) return;
    setTimerRunning(false);
    try {
      const now = new Date();
      const startTime = new Date(now.getTime() - timerSeconds * 1000);
      await api.post('/study-sessions', {
        subject_id: activeTimerSession.subject_id,
        task_description: `Focused study on ${activeTimerSession.subject_name}`,
        started_at: startTime.toISOString(),
        ended_at: now.toISOString(),
        duration_seconds: timerSeconds,
        paused_duration_seconds: 0,
        session_type: 'timer',
        session_notes: timerNotes || 'Study session logged from Study Blueprint'
      });
    } catch (e) {
      console.error(e);
    }
    setToastMessage(`Logged ${Math.round(timerSeconds / 60)} minutes of study for ${activeTimerSession.subject_name}.`);
    setTimeout(() => {
      setActiveTimerSession(null);
      setTimerSeconds(0);
      setToastMessage(null);
    }, 2500);
  };

  // Strictly filter resources by current selected academic stage so data is NEVER mixed together
  const filteredResources = resources.filter(res => {
    // 1. Stage isolation filter
    if (currentStage === 'class_9' || currentStage === 'class_10') {
      const isSchool = res.education_level_code === 'school' || res.branch_code === 'class_9' || res.branch_code === 'class_10';
      if (!isSchool) return false;
    } else if (currentStage === 'btech_1') {
      const isBtech = res.education_level_code === 'btech' || res.branch_code === 'cse' || res.branch_code === 'aiml';
      if (!isBtech) return false;
    } else if (currentStage === 'intermediate') {
      const isInter = res.education_level_code === 'intermediate' || res.branch_code === 'mpc';
      if (!isInter) return false;
    } else if (currentStage === 'diploma') {
      const isDiploma = res.education_level_code === 'diploma' || res.branch_code === 'cme';
      if (!isDiploma) return false;
    }

    // 2. Resource type filter
    if (resourceFilterType && res.resource_type !== resourceFilterType) return false;

    // 3. Search query filter
    if (resourceSearch.trim()) {
      const q = resourceSearch.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.education_level_code.toLowerCase().includes(q) ||
        (res.subject_name && res.subject_name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans antialiased flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Sleek Top Navigation Bar — Zero Login Required */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <Compass className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900">STUDY BLUEPRINT</span>
              <span className="hidden sm:block text-[9px] font-semibold text-slate-400 uppercase tracking-widest -mt-0.5">
                Indian Student OS
              </span>
            </div>
          </div>

          {/* The THREE Dedicated Section Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActivePortal('careers')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePortal === 'careers'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Milestone className={`h-3.5 w-3.5 ${activePortal === 'careers' ? 'text-brand-400' : 'text-slate-400'}`} />
              <span>1. Career Roadmaps</span>
            </button>

            <button
              onClick={() => setActivePortal('planner')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePortal === 'planner'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Calendar className={`h-3.5 w-3.5 ${activePortal === 'planner' ? 'text-brand-400' : 'text-slate-400'}`} />
              <span>2. Study Planner & Tracker</span>
            </button>

            <button
              onClick={() => setActivePortal('resources')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePortal === 'resources'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <BookOpen className={`h-3.5 w-3.5 ${activePortal === 'resources' ? 'text-brand-400' : 'text-slate-400'}`} />
              <span>3. Study Resources</span>
            </button>
          </nav>

          {/* Direct Instant Access Badge (Zero Login) */}
          <div className="hidden lg:flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Instant Open Access (No Login)</span>
            </span>
          </div>
        </div>
      </header>

      {/* Persistent Academic Stage Switcher (Guarantees Data is NEVER Mixed Together) */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-brand-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Your Academic Class / Level:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {STAGES.map(stage => {
              const isSelected = currentStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageChange(stage.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-sm ring-1 ring-white/30 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{stage.label}</span>
                  {isSelected && <Check className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Status Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* ========================================================================= */}
        {/* SECTION 1: CAREER ROADMAPS                                                */}
        {/* ========================================================================= */}
        {activePortal === 'careers' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Milestone className="h-3.5 w-3.5 text-brand-600" />
                <span>Dedicated Section 1: Career Roadmaps</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentStage === 'class_9' || currentStage === 'class_10'
                  ? 'Class 9 & 10 Secondary School → Future Career Pathway'
                  : currentStage === 'btech_1'
                  ? 'BTech 1st Year Engineering → Tech Career Roadmaps'
                  : currentStage === 'intermediate'
                  ? 'Intermediate (+2) → College Entrance & Career Pathways'
                  : 'Diploma / Polytechnic → Technical & Engineering Pathways'}
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
                Structured step-by-step milestones, stream selection criteria, exam roadmaps, and career targets designed specifically for{' '}
                <strong className="text-slate-800">{STAGES.find(s => s.id === currentStage)?.label}</strong>.
              </p>
            </div>

            {/* CLASS 9 & 10 SPECIALIZED ROADMAP VIEW (Pristine, Structured, Clear) */}
            {(currentStage === 'class_9' || currentStage === 'class_10') ? (
              <div className="space-y-8">
                {/* Visual Roadmap Progression */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <Layers className="h-5 w-5 text-brand-600" />
                    <span>Step-by-Step Educational Journey from Class 9 to Dream Career</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-[10px] font-bold text-brand-700 uppercase">Current Year</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">Class 9 Foundation</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Master NCERT Mathematics & Science fundamentals. Participate in SOF Olympiads (NSO/IMO) and NTSE Stage 1 foundation.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Next Year</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">Class 10 Board Exam</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Excel in Class 10 Board Exams (target 90%+). Clear NTSE scholarship test and choose optimal higher secondary stream.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">+2 Junior College</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">Intermediate / +2</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Study MPC (Engineering) or BiPC (Medical) or MEC (Commerce) or 3-Yr Polytechnic Diploma. Prepare for national entrance exams.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">4</span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Degree & Career</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900">Professional College</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Join IIT / NIT / AIIMS / NLU / IIM or Top Engineering Colleges and launch into high-growth global professions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stream Selection Matrix after 10th (The Core Guide for 9th/10th Students) */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Decision Blueprint</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      Which Stream Should You Choose After 10th? (Explore Your Options)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Click each stream below to view its complete career roadmap, entrance examinations, and future prospects.
                    </p>
                  </div>

                  {/* Stream Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                    {[
                      { id: 'mpc', label: '1. MPC (Maths, Physics, Chem)', badge: 'Engineering & Tech' },
                      { id: 'bipc', label: '2. BiPC (Biology, Physics, Chem)', badge: 'Medicine & Health' },
                      { id: 'mec', label: '3. MEC / CEC (Commerce & Economics)', badge: 'Finance & CA' },
                      { id: 'arts', label: '4. Arts / Humanities', badge: 'Civil Services & Law' },
                      { id: 'diploma', label: '5. Polytechnic Diploma', badge: 'Practical Engineering' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedStreamTab(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedStreamTab === tab.id
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Stream Details Card */}
                  {selectedStreamTab === 'mpc' && (
                    <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-blue-950">MPC: Mathematics, Physics, and Chemistry</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Best for Math Lovers
                        </span>
                      </div>
                      <p className="text-xs text-blue-900/80 leading-relaxed">
                        MPC is the primary pre-engineering stream for Indian students. It prepares you for technical problem solving, physics modeling, and high-performance engineering disciplines.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Entrance Exams</span>
                          <span className="text-slate-600 block text-[11px]">JEE Main, JEE Advanced, BITSAT, State EAPCET/EAMCET, NDA</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Degrees Offered</span>
                          <span className="text-slate-600 block text-[11px]">B.Tech, B.E., B.Arch, BS-MS (IISER/IISc), Commercial Pilot License</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Career Roles</span>
                          <span className="text-slate-600 block text-[11px]">Software/AI Engineer, Aerospace Engineer, Defence Officer, Data Scientist</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStreamTab === 'bipc' && (
                    <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-emerald-950">BiPC: Biology, Physics, and Chemistry</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Best for Medical Aspirants
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900/80 leading-relaxed">
                        BiPC is the medical and biological sciences stream. It leads to careers in healthcare, biotechnology, genomics, pharmaceuticals, and agricultural research.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Entrance Exams</span>
                          <span className="text-slate-600 block text-[11px]">NEET-UG, AIIMS, State Paramedical, ICAR AIEEA</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Degrees Offered</span>
                          <span className="text-slate-600 block text-[11px]">MBBS, BDS, BAMS, B.Pharm, B.Sc Nursing, B.Sc Agriculture, BVSc</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Career Roles</span>
                          <span className="text-slate-600 block text-[11px]">Surgeon, Physician, Biotech Researcher, Clinical Pharmacist, Veterinarian</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStreamTab === 'mec' && (
                    <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-amber-950">MEC / CEC: Mathematics, Economics, Commerce</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Best for Finance & Business
                        </span>
                      </div>
                      <p className="text-xs text-amber-900/80 leading-relaxed">
                        Ideal for students passionate about business, capital markets, accounting, corporate governance, and investment banking.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Entrance Exams</span>
                          <span className="text-slate-600 block text-[11px]">CA Foundation, CMA Foundation, IPMAT (IIM Indore/Rohtak), CUET</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Degrees Offered</span>
                          <span className="text-slate-600 block text-[11px]">B.Com (Hons), BBA, IPM (5-Yr MBA), BMS, Integrated Law</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Career Roles</span>
                          <span className="text-slate-600 block text-[11px]">Chartered Accountant (CA), Investment Banker, Chief Financial Officer, Auditor</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStreamTab === 'arts' && (
                    <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-200/70 space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-purple-950">Humanities / Arts: History, Political Science, Psychology</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                          Best for Civil Services & Law
                        </span>
                      </div>
                      <p className="text-xs text-purple-900/80 leading-relaxed">
                        Builds world-class critical thinking, policy analysis, constitutional law, design aesthetics, and public leadership.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-purple-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Entrance Exams</span>
                          <span className="text-slate-600 block text-[11px]">CLAT (Common Law Admission Test), CUET, NID DAT, UCEED</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-purple-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Degrees Offered</span>
                          <span className="text-slate-600 block text-[11px]">BA LLB (National Law Universities), B.Des, BA Political Science / Journalism</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-purple-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Career Roles</span>
                          <span className="text-slate-600 block text-[11px]">Civil Servant (IAS/IPS/IFS), Corporate Lawyer, Product Designer, Journalist</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedStreamTab === 'diploma' && (
                    <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-200/70 space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-teal-950">Polytechnic Diploma: 3-Year Technical Engineering</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                          Hands-on Technical Foundation
                        </span>
                      </div>
                      <p className="text-xs text-teal-900/80 leading-relaxed">
                        A practical 3-year technical course right after Class 10. Allows direct lateral entry into 2nd year B.Tech via ECET examination without doing Intermediate.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-teal-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Entrance Exams</span>
                          <span className="text-slate-600 block text-[11px]">State POLYCET (after 10th), ECET (for B.Tech lateral entry)</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-teal-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Branches</span>
                          <span className="text-slate-600 block text-[11px]">Computer Engineering (CME), Electronics (ECE), Electrical (EEE), Mechanical</span>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-teal-200 space-y-1">
                          <span className="font-bold text-slate-900 block">Career Roles</span>
                          <span className="text-slate-600 block text-[11px]">Junior Engineer (SSC JE / RRB JE), Technical Specialist, Lateral Entry B.Tech</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Class 9 Focus Checklist & Competitions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span>National Competitions for Class 9 Students</span>
                    </h3>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">SOF National Science Olympiad (NSO) & IMO:</strong> Builds rapid problem solving for maths & science.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">PRMO / IOQM (Indian Olympiad Qualifier in Math):</strong> Foundation for national mathematical olympiad.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">Unified Council NSTSE:</strong> Diagnostic national talent search test across CBSE & state syllabus.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <FolderGit2 className="h-4 w-4 text-brand-600" />
                      <span>Recommended Class 9 Hands-on Projects</span>
                    </h3>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <Code2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">Python Formula & Geometry Calculator:</strong> Write a script calculating areas, volumes, and algebraic roots.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <Code2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">Physics Laws of Motion Simulator:</strong> Demonstrate velocity-time graphs and Newton’s second law visually.
                        </div>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start space-x-2">
                        <Code2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">Interactive Quiz Engine in HTML/JS:</strong> Practice multiple-choice questions for school exams with instant scoring.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* BTECH & HIGHER EDUCATION ROADMAP VIEW */
              <div className="space-y-6">
                {selectedRole && (
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-7">
                    <div className="border-b border-slate-100 pb-5">
                      <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                        Verified Engineering Learning Pathway
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedRole.title}</h2>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-4xl">{selectedRole.summary}</p>
                    </div>

                    {/* Core Skills & Tools */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <Code2 className="h-4 w-4 text-brand-600" />
                        <span>Essential Concepts & Programming Languages</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRole.programming_languages.map(l => (
                          <span key={l} className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-bold">
                            {l}
                          </span>
                        ))}
                        {selectedRole.core_skills.map(s => (
                          <span key={s} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone Phases */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <Layers className="h-4 w-4 text-brand-600" />
                        <span>Semester-by-Semester Milestones</span>
                      </h3>
                      <div className="space-y-3">
                        {selectedRole.learning_roadmap.map((phase, idx) => (
                          <div key={phase.phase} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                              <div className="flex items-center space-x-2.5">
                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                                  {idx + 1}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900">{phase.title}</h4>
                              </div>
                              <span className="text-[11px] font-mono font-semibold text-brand-600">
                                Duration: {phase.recommended_duration_weeks} Weeks
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {phase.topics.map(t => (
                                <span key={t} className="text-xs bg-white border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Milestone Projects */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <FolderGit2 className="h-4 w-4 text-brand-600" />
                        <span>Portfolio Milestone Projects</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {selectedRole.projects.map(proj => (
                          <div key={proj.title} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between shadow-2xs">
                            <div>
                              <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {proj.tier.replace('_', ' ')}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 mt-2">{proj.title}</h4>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{proj.description}</p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                              {proj.suggested_tech_stack.map(st => (
                                <span key={st} className="text-[9px] bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                                  {st}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: STUDY PLANNER & TRACKER                                        */}
        {/* ========================================================================= */}
        {activePortal === 'planner' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header with Quick Actions */}
            <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Calendar className="h-3.5 w-3.5 text-brand-600" />
                  <span>Dedicated Section 2: Study Planner & Tracker</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Daily Study Planner & Focus Tracker
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Active Timetable for <strong className="text-slate-800">{STAGES.find(s => s.id === currentStage)?.label}</strong>. Add subjects, adjust durations, launch live focus stopwatches, or reset your schedule.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-800 hover:bg-brand-100 transition-colors shadow-2xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Add Subject Manually</span>
                </button>

                <button
                  onClick={() => {
                    if (currentStage === 'class_9' || currentStage === 'class_10') {
                      setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
                    } else {
                      setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
                    }
                    setToastMessage('Auto-balanced standard study timetable.');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Auto-Balance</span>
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center space-x-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-2xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete / Reset Plan</span>
                </button>
              </div>
            </div>

            {/* Delete Plan Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50 space-y-3 animate-in fade-in">
                <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                  <span>Are you sure you want to delete and reset your study plan?</span>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">
                  This will immediately remove all current daily session allocations. Your schedule will be completely cleared so you can add your custom subjects or generate a fresh plan.
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={handleDeletePlan}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 shadow-sm"
                  >
                    Yes, Delete Plan Now
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Add Manual Subject Modal */}
            {showAddModal && (
              <div className="p-6 rounded-3xl border border-brand-200 bg-white shadow-md space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                    <span>Add Custom Subject to Study Timetable</span>
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subject Name</label>
                    <input
                      type="text"
                      value={newSubName}
                      onChange={e => setNewSubName(e.target.value)}
                      placeholder={currentStage === 'class_9' ? 'e.g. Hindi / Sanskrit / Social' : 'e.g. Linear Algebra / Physics'}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subject Code (Optional)</label>
                    <input
                      type="text"
                      value={newSubCode}
                      onChange={e => setNewSubCode(e.target.value)}
                      placeholder="e.g. SUB-01"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Duration</label>
                    <select
                      value={newSubDuration}
                      onChange={e => setNewSubDuration(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 bg-white"
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={50}>50 Minutes (Standard)</option>
                      <option value={60}>60 Minutes Deep Focus</option>
                      <option value={90}>90 Minutes Extended</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Time Slot Label</label>
                    <input
                      type="text"
                      value={newSubTime}
                      onChange={e => setNewSubTime(e.target.value)}
                      placeholder="e.g. 06:00 PM - 06:50 PM"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddManualSession}
                    disabled={!newSubName.trim()}
                    className="flex items-center space-x-1.5 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Insert to Schedule</span>
                  </button>
                </div>
              </div>
            )}

            {/* Embedded Active Focus Stopwatch (Live Study Tracker) */}
            {activeTimerSession && (
              <div className="p-6 rounded-3xl border-2 border-brand-500 bg-slate-900 text-white shadow-xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Study Focus Timer</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{activeTimerSession.subject_code}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeTimerSession.subject_name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Planned: {activeTimerSession.planned_minutes}m ({activeTimerSession.time_slot})</p>
                  </div>
                  <div className="text-4xl font-extrabold font-mono text-emerald-400 tracking-wider">
                    {formatSeconds(timerSeconds)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <input
                    type="text"
                    value={timerNotes}
                    onChange={e => setTimerNotes(e.target.value)}
                    placeholder="Add brief notes on what you studied..."
                    className="flex-1 min-w-[200px] rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="flex items-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      <span>{timerRunning ? 'Pause' : 'Resume'}</span>
                    </button>
                    <button
                      onClick={stopAndLogTimer}
                      className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      <Square className="h-3.5 w-3.5 fill-white" />
                      <span>Complete Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Timetable Session Cards */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Today&apos;s Study Schedule</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Click &quot;Start Timer&quot; on any subject to track your live learning.</p>
                </div>
                <span className="text-xs text-slate-400 font-semibold">{allocations.length} sessions</span>
              </div>

              {allocations.length > 0 ? (
                <div className="space-y-3">
                  {allocations.map((alloc, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        alloc.is_break ? 'border-slate-200 bg-slate-50/70' : 'border-brand-200/80 bg-brand-50/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            alloc.is_break ? 'bg-amber-100 text-amber-700' : 'bg-slate-900 text-white font-bold text-xs'
                          }`}
                        >
                          {alloc.is_break ? <Coffee className="h-4 w-4" /> : `#${idx + 1}`}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-bold text-slate-900">{alloc.subject_name}</h4>
                            {!alloc.is_break && (
                              <span className="text-[10px] font-mono text-slate-400 font-semibold">
                                ({alloc.subject_code})
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">{alloc.time_slot}</span>
                        </div>
                      </div>

                      {/* Duration & Start Controls */}
                      <div className="flex items-center space-x-2.5 self-end sm:self-center">
                        <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1">
                          <button
                            onClick={() => adjustMinutes(idx, -15)}
                            className="p-1 rounded text-slate-500 hover:bg-slate-100"
                            title="Subtract 15 mins"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold font-mono text-slate-800 px-1.5">
                            {alloc.planned_minutes}m
                          </span>
                          <button
                            onClick={() => adjustMinutes(idx, 15)}
                            className="p-1 rounded text-slate-500 hover:bg-slate-100"
                            title="Add 15 mins"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {!alloc.is_break && (
                          <button
                            onClick={() => startTimer(alloc)}
                            className="flex items-center space-x-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-sm transition-colors"
                          >
                            <Play className="h-3 w-3 fill-white" />
                            <span>Start Timer</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleRemoveSession(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove session"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Your Study Timetable is Completely Clear</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      No active sessions. Click &quot;+ Add Subject Manually&quot; or &quot;Auto-Balance Schedule&quot; to build your plan.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-sm"
                    >
                      + Add Subject Manually
                    </button>
                    <button
                      onClick={() => {
                        if (currentStage === 'class_9' || currentStage === 'class_10') {
                          setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
                        } else {
                          setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
                        }
                      }}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50"
                    >
                      Auto-Balance 4 Hours
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: STUDY RESOURCES                                                */}
        {/* ========================================================================= */}
        {activePortal === 'resources' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <BookOpen className="h-3.5 w-3.5 text-brand-600" />
                <span>Dedicated Section 3: Study Resources</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentStage === 'class_9'
                  ? 'Class 9 Syllabi, Blueprints, Formula Sheets & Model Papers'
                  : currentStage === 'class_10'
                  ? 'Class 10 Board Blueprints, Sample Papers & Revision Sheets'
                  : currentStage === 'btech_1'
                  ? 'BTech 1st Year (1-1/1-2) University Blueprints, Syllabi & Notes'
                  : 'Study Resources & Question Papers'}
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-3xl">
                Verified blueprints, model question papers, and revision notes exclusively for{' '}
                <strong className="text-slate-800">{STAGES.find(s => s.id === currentStage)?.label}</strong>. Unmixed and sorted for rapid revision.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'All Resources', val: '' },
                    { label: 'Syllabus & Blueprints', val: 'syllabus' },
                    { label: 'Model Papers & Tests', val: 'model_paper' },
                    { label: 'Formula Sheets & Notes', val: 'formula_sheet' }
                  ].map(tab => (
                    <button
                      key={tab.val}
                      onClick={() => setResourceFilterType(tab.val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        resourceFilterType === tab.val
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={resourceSearch}
                    onChange={e => setResourceSearch(e.target.value)}
                    placeholder="Search by topic, subject or paper..."
                    className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Resources Cards Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map(res => (
                  <div
                    key={res.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                          {res.resource_type.replace('_', ' ')}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono font-semibold">
                          {res.regulation || res.education_level_code.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{res.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 flex items-center space-x-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Source: {res.source_contributor}</span>
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                        <FileText className="h-3.5 w-3.5 text-slate-400" />
                        <span>Verified PDF Document</span>
                      </span>
                      <a
                        href={res.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download / View PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No resources found matching filter</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing the search query or switching resource type filter.
                </p>
                <button
                  onClick={() => {
                    setResourceFilterType('');
                    setResourceSearch('');
                  }}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 Study Blueprint. High-performance academic and career operating system for Indian students.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActivePortal('careers')} className="hover:text-slate-700 font-semibold">1. Career Roadmaps</button>
            <button onClick={() => setActivePortal('planner')} className="hover:text-slate-700 font-semibold">2. Study Planner</button>
            <button onClick={() => setActivePortal('resources')} className="hover:text-slate-700 font-semibold">3. Study Resources</button>
            <Link href="/profile" className="hover:text-slate-700 font-semibold">Profile Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
