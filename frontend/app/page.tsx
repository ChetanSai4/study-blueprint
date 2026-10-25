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
  FileText,
  Activity,
  Flame,
  Target,
  BarChart3,
  TrendingUp,
  Cpu,
  Stethoscope,
  Building2,
  Wrench,
  Shield,
  Palette,
  Laptop,
  Scale,
  Zap,
  Eye,
  Printer,
  X,
  ExternalLink
} from 'lucide-react';
import { api } from '@/lib/api';
import { DEFAULT_CAREER_ROLES } from '@/lib/careerRoles';
import { DIPLOMA_BRANCH_DETAILS } from '@/lib/diplomaData';
import { BTECH_DEMO_RESOURCES } from '@/lib/btechResources';
import { BTechBranchRoadmapView } from '@/components/careers/BTechBranchRoadmapView';

import { CareerRole, EducationalResource, TimetableAllocation, StudyPlan } from '@/types';
import { formatSeconds } from '@/lib/utils';

// Core Education Stages for Career Roadmap & Study Planner
const STAGES = [
  { id: 'class_10', label: 'Class 10 (Secondary Board)', badge: 'Board SSLC' },
  { id: 'class_9', label: 'Class 9 (Secondary School)', badge: 'School Foundation' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', badge: 'Junior College' },
  { id: 'diploma', label: 'Diploma / Polytechnic', badge: 'Technical Diploma' },
  { id: 'btech_1', label: 'BTech 1st Year (Engineering)', badge: 'University BTech' }
];

// Pre-configured standard academic schedules
const DEFAULT_CLASS_10_ALLOCATIONS: TimetableAllocation[] = [
  {
    subject_id: 'sub_c10_1',
    subject_name: 'Class 10 Mathematics (Quadratic Equations, Trigonometry & Coordinate Geometry)',
    subject_code: 'CBSE-M10',
    planned_minutes: 60,
    time_slot: '05:00 PM - 06:00 PM',
    session_order: 1,
    is_break: false
  },
  {
    subject_id: 'break_1',
    subject_name: 'Short Rest & Hydration Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '06:00 PM - 06:10 PM',
    session_order: 2,
    is_break: true,
    break_title: 'Refresh & Hydrate'
  },
  {
    subject_id: 'sub_c10_2',
    subject_name: 'Class 10 Science (Light Reflection/Refraction & Chemical Reactions)',
    subject_code: 'CBSE-SCI10',
    planned_minutes: 50,
    time_slot: '06:10 PM - 07:00 PM',
    session_order: 3,
    is_break: false
  },
  {
    subject_id: 'break_2',
    subject_name: 'Evening Snack Break',
    subject_code: 'REST',
    planned_minutes: 10,
    time_slot: '07:00 PM - 07:10 PM',
    session_order: 4,
    is_break: true,
    break_title: 'Snack & Relaxation'
  },
  {
    subject_id: 'sub_c10_3',
    subject_name: 'Class 10 Social Science (Nationalism in India & Resources)',
    subject_code: 'CBSE-SST10',
    planned_minutes: 45,
    time_slot: '07:10 PM - 07:55 PM',
    session_order: 5,
    is_break: false
  },
  {
    subject_id: 'sub_c10_4',
    subject_name: 'Class 10 English Language & Previous Year Question Revision',
    subject_code: 'CBSE-ENG10',
    planned_minutes: 45,
    time_slot: '08:00 PM - 08:45 PM',
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
    break_title: 'Coffee Break'
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
    subject_name: 'Engineering Physics / Applied Physics',
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

// Complete mock & verified BTech catalog guaranteeing data across all branches & universities
// BTECH_DEMO_RESOURCES is imported from @/lib/btechResources

export default function UnifiedPlatformHome() {
  // Active Section Tab: 'careers' | 'planner' | 'resources'
  const [activePortal, setActivePortal] = useState<'careers' | 'planner' | 'resources'>('careers');
  
  // Selected Academic Stage (Defaults to Class 10)
  const [currentStage, setCurrentStage] = useState<string>('intermediate');

  // --- SECTION 1: CAREER ROADMAPS STATE ---
  // Sub-tab for 10th class comprehensive pathways
  const [active10thFlowTab, setActive10thFlowTab] = useState<'puc' | 'diploma' | 'paramedical' | 'iti' | 'defense' | 'short_courses'>('puc');
  // Sub-tab for Intermediate streams
  const [activeInterStreamTab, setActiveInterStreamTab] = useState<'mpc' | 'bipc' | 'mec' | 'arts'>('mpc');
  // Sub-tab for Diploma branches
  const [activeDiplomaBranch, setActiveDiplomaBranch] = useState<'cme' | 'ece' | 'eee' | 'mech' | 'civil' | 'auto'>('cme');
  // Engineering Roles State (ONLY for B.Tech)
  const [btechRoleBranchFilter, setBtechRoleBranchFilter] = useState<string>('all');
  const [roles, setRoles] = useState<CareerRole[]>(DEFAULT_CAREER_ROLES);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(DEFAULT_CAREER_ROLES[0]);

  // --- SECTION 2: STUDY PLANNER & SELF-ANALYSIS DASHBOARD STATE ---
  const [allocations, setAllocations] = useState<TimetableAllocation[]>(DEFAULT_CLASS_10_ALLOCATIONS);
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>({});
  const [dailyMinutesTarget, setDailyMinutesTarget] = useState(240);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDuration, setNewSubDuration] = useState(50);
  const [newSubTime, setNewSubTime] = useState('06:00 PM - 06:50 PM');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [todayReflection, setTodayReflection] = useState('');
  
  // Live Stopwatch State
  const [activeTimerSession, setActiveTimerSession] = useState<TimetableAllocation | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerNotes, setTimerNotes] = useState('');
  const [totalSecondsStudiedToday, setTotalSecondsStudiedToday] = useState(6480); // ~1.8h starter
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- SECTION 3: B.TECH EXCLUSIVE STUDY RESOURCES STATE ---
  const [resources, setResources] = useState<EducationalResource[]>(BTECH_DEMO_RESOURCES);
  const [selectedBtechBranch, setSelectedBtechBranch] = useState<string>('all');
  const [selectedBtechType, setSelectedBtechType] = useState<string>('');
  const [btechSearch, setBtechSearch] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('jntugv');
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<EducationalResource | null>(null);

  // Initial Load (NO LOGIN REQUIRED)
  useEffect(() => {
    const savedStage = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    const initialStage = savedStage || 'intermediate';
    setCurrentStage(initialStage);

    async function loadData() {
      try {
        const [rList, resList, plan] = await Promise.all([
          api.get<CareerRole[]>('/careers/roles').catch(() => []),
          api.get<EducationalResource[]>('/resources').catch(() => []),
          api.get<StudyPlan>('/study-plans/current').catch(() => null)
        ]);

        if (rList && rList.length > 0) {
          const btechRoles = rList.filter(r => r.role_code !== 'class9_foundation');
          setRoles(btechRoles);
          const btechRole = btechRoles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
          setSelectedRole(btechRole || btechRoles[0]);
        }

        if (resList && resList.length > 0) {
          const existingTitles = new Set(resList.map(r => r.title));
          const combined = [...resList];
          for (const item of BTECH_DEMO_RESOURCES) {
            if (!existingTitles.has(item.title)) {
              combined.push(item);
            }
          }
          setResources(combined);
        }


        if (plan && plan.allocations && plan.allocations.length > 0) {
          setAllocations(plan.allocations);
          setDailyMinutesTarget(plan.daily_target_minutes || 240);
        } else {
          if (initialStage === 'class_10' || initialStage === 'class_9') {
            setAllocations(DEFAULT_CLASS_10_ALLOCATIONS);
          } else {
            setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
          }
        }
      } catch (err) {
        console.error('Error loading data', err);
      }
    }
    loadData();
  }, []);

  // Handle stage change
  const handleStageChange = (stageId: string) => {
    setCurrentStage(stageId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('study_blueprint_stage', stageId);
    }

    if (stageId === 'class_10' || stageId === 'class_9') {
      setAllocations(DEFAULT_CLASS_10_ALLOCATIONS);
    } else {
      setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
      const btechRole = roles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
      if (btechRole) setSelectedRole(btechRole);
    }
    setToastMessage(`Switched perspective to: ${STAGES.find(s => s.id === stageId)?.label}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Stopwatch interval tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
        setTotalSecondsStudiedToday(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Session Completed Toggle
  const toggleSessionCompleted = (subjectId: string) => {
    setCompletedSessions(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Manual Session Adder
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
    setToastMessage(`Added "${newSession.subject_name}" to your schedule.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Delete / Reset Plan
  const handleDeletePlan = async () => {
    try {
      await api.delete('/study-plans/current');
    } catch (e) {
      // ignore
    }
    setAllocations([]);
    setShowDeleteConfirm(false);
    setToastMessage('Study plan deleted. Timetable is now completely clear.');
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
    setToastMessage(`Focus stopwatch running for: ${session.subject_name}`);
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
        session_notes: timerNotes || 'Self-analysis logged session'
      });
    } catch (e) {
      console.error(e);
    }
    setCompletedSessions(prev => ({
      ...prev,
      [activeTimerSession.subject_id]: true
    }));
    setToastMessage(`Logged ${Math.round(timerSeconds / 60)} minutes for ${activeTimerSession.subject_name}. Great job!`);
    setTimeout(() => {
      setActiveTimerSession(null);
      setTimerSeconds(0);
      setToastMessage(null);
    }, 2500);
  };

  // Dashboard self-analysis metrics
  const totalPlannedStudyMinutes = allocations
    .filter(a => !a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const totalBreakMinutes = allocations
    .filter(a => a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const completedCount = allocations.filter(a => !a.is_break && completedSessions[a.subject_id]).length;
  const totalSubjectsCount = allocations.filter(a => !a.is_break).length;
  const completionPercentage = totalSubjectsCount > 0 ? Math.round((completedCount / totalSubjectsCount) * 100) : 0;
  const studiedMinutesToday = Math.round(totalSecondsStudiedToday / 60);
  const targetProgressPercentage = Math.min(100, Math.round((studiedMinutesToday / dailyMinutesTarget) * 100));

  // Filter B.Tech resources strictly
  const filteredBtechResources = resources.filter(res => {
    // Branch filter
    if (selectedBtechBranch !== 'all' && res.branch_code !== selectedBtechBranch) return false;

    // University filter (for all branches view)
    if (selectedBtechBranch === 'all' && selectedUniversity && res.board_or_university_code !== selectedUniversity) {
      return false;
    }

    // Type filter
    if (selectedBtechType && res.resource_type !== selectedBtechType) return false;

    // Search query
    if (btechSearch.trim()) {
      const q = btechSearch.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.regulation?.toLowerCase().includes(q) ||
        res.source_contributor?.toLowerCase().includes(q)
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
              <BarChart3 className={`h-3.5 w-3.5 ${activePortal === 'planner' ? 'text-brand-400' : 'text-slate-400'}`} />
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
              <span>3. BTech Study Resources</span>
            </button>
          </nav>

          {/* Direct Instant Access Badge (Zero Login) */}
          <div className="hidden lg:flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open Platform (No Login Required)</span>
            </span>
          </div>
        </div>
      </header>

      {/* Academic Class Switcher for Career Roadmaps & Study Planner */}
      {activePortal !== 'resources' && (
        <div className="bg-slate-900 text-white border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-brand-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Filter by Your Academic Class / Level:
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
      )}

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
                {currentStage === 'class_10' || currentStage === 'class_9'
                  ? 'What NEXT After 10th Class? — Complete 39-Pathway Career Guidance Flowchart'
                  : currentStage === 'btech_1'
                  ? 'BTech 1st Year Engineering → Industry Career Roadmaps'
                  : currentStage === 'intermediate'
                  ? 'Intermediate (+2 MPC / BiPC) → National College Entrance Roadmaps'
                  : 'Diploma / Polytechnic → BTech Lateral Entry & Technical Careers'}
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-4xl">
                {currentStage === 'class_10' || currentStage === 'class_9'
                  ? 'Official multi-track educational flowchart for 10th Class / SSLC pass-outs: Intermediate streams (Science, Commerce, Arts), 3-Year Polytechnic, Paramedical, ITI Trades, Direct Defense & Govt Jobs, and Short-Term Professional Courses.'
                  : `Structured step-by-step milestones, skills, and industry roadmaps for ${STAGES.find(s => s.id === currentStage)?.label}.`}
              </p>
            </div>

            {/* ================================================================= */}
            {/* 10TH CLASS DEDICATED CAREER FLOWCHART (Based on User's Chart)    */}
            {/* ================================================================= */}
            {(currentStage === 'class_10' || currentStage === 'class_9') ? (
              <div className="space-y-6">
                {/* Visual Pathway Selector (The 6 Big Tracks After 10th) */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                      Primary Career Gateways
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      Select Any Track to Inspect Full Flowchart & Career Branches:
                    </h2>
                  </div>

                  {/* The 6 Core Gateways from the Chart */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {[
                      { id: 'puc', label: '1. Intermediate / PUC', sub: '2 Years (+2)', icon: GraduationCap, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                      { id: 'diploma', label: '2. Polytechnic Diploma', sub: '3 Years (Lateral BTech)', icon: Cpu, color: 'border-teal-300 bg-teal-50/70 text-teal-900' },
                      { id: 'paramedical', label: '3. Paramedical Diploma', sub: '2-3 Years (Hospital)', icon: Stethoscope, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                      { id: 'iti', label: '4. ITI Trades', sub: '1-2 Years (Technical)', icon: Wrench, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                      { id: 'defense', label: '5. Defense / Govt Jobs', sub: 'Direct 10th Entry', icon: Shield, color: 'border-rose-300 bg-rose-50/70 text-rose-900' },
                      { id: 'short_courses', label: '6. Job-Oriented Courses', sub: '6 Months - 1 Year', icon: Laptop, color: 'border-purple-300 bg-purple-50/70 text-purple-900' }
                    ].map(track => {
                      const Icon = track.icon;
                      const isSelected = active10thFlowTab === track.id;
                      return (
                        <button
                          key={track.id}
                          onClick={() => setActive10thFlowTab(track.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                              : `${track.color} hover:shadow-xs`
                          }`}
                        >
                          <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                          <div>
                            <div className="text-xs font-bold leading-tight">{track.label}</div>
                            <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'opacity-70'}`}>
                              {track.sub}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DETAILED PATHWAY CARDS */}
                {/* 1. INTERMEDIATE / PUC (+2) */}
                {active10thFlowTab === 'puc' && (
                  <div className="bg-white rounded-3xl border border-blue-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                          Gateway 1: 11th Std / 1st PUC / Intermediate (+2) (2 Years)
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2">
                          Academic Junior College: Science, Commerce, and Arts
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          The most common academic route. Leads to university degrees, competitive entrance tests, and professional licensure.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Science Stream */}
                      <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-blue-950">Science (PCMB / PCMC / MPC)</h4>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Pre-Engg & Med</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div>
                            <strong className="text-slate-900 block">Entrance Exams:</strong>
                            <span className="text-slate-600">JEE Main, JEE Advanced, NEET-UG, BITSAT, State EAPCET/KCET, NDA, NATA, IISER (IAT)</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Degree Pathways:</strong>
                            <span className="text-slate-600">B.Tech / B.E. (all branches), MBBS, BDS, B.Arch, BS-MS Pure Science, Commercial Pilot License</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Future Careers:</strong>
                            <span className="text-slate-600">Software Engineer, Doctor/Surgeon, Aerospace Scientist, Indian Air Force Pilot, Research Scientist</span>
                          </div>
                        </div>
                      </div>

                      {/* Commerce Stream */}
                      <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-amber-950">Commerce (MEC / CEC / EBAC)</h4>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Finance & Business</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div>
                            <strong className="text-slate-900 block">Professional Exams:</strong>
                            <span className="text-slate-600">CA Foundation (Chartered Accountancy), CS Foundation, CMA Foundation, IPMAT (IIM 5-Yr MBA)</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Degree Pathways:</strong>
                            <span className="text-slate-600">B.Com (Honours), BBA, IPM (IIM Indore/Rohtak), BMS, Integrated Corporate Law</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Future Careers:</strong>
                            <span className="text-slate-600">Chartered Accountant (CA), Chief Financial Officer (CFO), Investment Banker, Company Secretary</span>
                          </div>
                        </div>
                      </div>

                      {/* Arts / Humanities Stream */}
                      <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-purple-950">Arts & Humanities (HEPS)</h4>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Civil Services & Law</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div>
                            <strong className="text-slate-900 block">Competitive Exams:</strong>
                            <span className="text-slate-600">CLAT (Common Law Admission Test for NLUs), CUET, NID DAT, NIFT, UPSC Foundation</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Degree Pathways:</strong>
                            <span className="text-slate-600">BA LLB (5-Yr Integrated), B.Des (Design), BA Political Science / History, Journalism & Mass Comm</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 block">Future Careers:</strong>
                            <span className="text-slate-600">Civil Services (IAS / IPS / IFS), Supreme Court Advocate, Product Designer, Foreign Diplomat</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. POLYTECHNIC DIPLOMA */}
                {active10thFlowTab === 'diploma' && (
                  <div className="bg-white rounded-3xl border border-teal-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                        Gateway 2: Polytechnic Diploma (3 Years)
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Practical Engineering Foundation with Direct Lateral Entry into 2nd Year B.Tech
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Skip +2 Intermediate! After 10th class, join a 3-year technical polytechnic. After diploma, appear for ECET / DCET to get direct admission into 2nd year B.Tech.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                        <strong className="text-slate-900 block">Computer & IT (CME)</strong>
                        <p className="text-slate-600 text-[11px]">Hardware, networking, databases, C/C++, Java, and software development.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                        <strong className="text-slate-900 block">Electronics (ECE) & Electrical (EEE)</strong>
                        <p className="text-slate-600 text-[11px]">Circuits, microcontrollers, telecommunications, power systems, and robotics.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                        <strong className="text-slate-900 block">Mechanical & Automobile</strong>
                        <p className="text-slate-600 text-[11px]">CAD/CAM, engine mechanics, thermal systems, manufacturing, and industrial automation.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                        <strong className="text-slate-900 block">Civil & Environmental</strong>
                        <p className="text-slate-600 text-[11px]">Surveying, structural analysis, construction management, and highway engineering.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-teal-950">Next Step: ECET Lateral Entry Exam</span>
                        <p className="text-teal-800 text-[11px]">Enters 2nd year B.Tech (3rd semester) directly in top engineering colleges.</p>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-teal-600 text-white font-bold text-xs shrink-0">
                        Saves 1 Year vs Ordinary Route
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. PARAMEDICAL DIPLOMA */}
                {active10thFlowTab === 'paramedical' && (
                  <div className="bg-white rounded-3xl border border-emerald-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Gateway 3: Paramedical Diploma (2 to 3 Years)
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Direct Healthcare, Hospital, and Clinical Laboratory Technicians
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        High-demand healthcare courses right after 10th class with immediate hospital and diagnostic center placements.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      {[
                        { title: 'DMLT (Medical Lab Technology)', desc: 'Blood, pathology, biochemistry analysis in hospitals and research labs.' },
                        { title: 'Dialysis Technician', desc: 'Operating hemodialysis machines in nephrology departments and kidney care clinics.' },
                        { title: 'Medical X-Ray & Imaging Tech', desc: 'Radiography, CT scan, and MRI clinical diagnostic support.' },
                        { title: 'Operation Theatre (OT) Tech', desc: 'Assisting surgeons, surgical instrument prep, and sterilisation procedures.' },
                        { title: 'Ophthalmic Assistant', desc: 'Eye clinics, vision testing, refraction, and optical diagnostics.' },
                        { title: 'Health Inspector / Sanitary Inspector', desc: 'Public health monitoring, food safety inspection, and municipal health cells.' }
                      ].map(card => (
                        <div key={card.title} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                          <strong className="text-slate-900 block">{card.title}</strong>
                          <p className="text-slate-600 text-[11px]">{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. ITI TRADES */}
                {active10thFlowTab === 'iti' && (
                  <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Gateway 4: Industrial Training Institute (ITI) (1 to 2 Years)
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Vocational Engineering Trades with Guaranteed Government & PSU Apprenticeships
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Certified by NCVT / SCVT. Immediate entry into Indian Railways (Assistant Loco Pilot), BHEL, DRDO, State Electricity Boards, and private automotive factories.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        { trade: 'Electrician (2 Yrs)', scope: 'Industrial wiring, transformers, electrical motors, and solar panels.' },
                        { trade: 'Fitter (2 Yrs)', scope: 'Precision fitting, piping, machining, and manufacturing maintenance.' },
                        { trade: 'Mechanic Motor Vehicle (2 Yrs)', scope: 'Automobile engines, diagnostics, EVs, and heavy vehicles.' },
                        { trade: 'Machinist / Turner (2 Yrs)', scope: 'Lathe, milling, CNC machines, and tool manufacturing.' },
                        { trade: 'Draughtsman (Civil/Mech) (2 Yrs)', scope: 'Architectural drawings, CAD drafting, and structural planning.' },
                        { trade: 'Welder (1 Yr)', scope: 'Arc, TIG, MIG welding in marine, pipeline, and structural projects.' },
                        { trade: 'Electronic Mechanic (2 Yrs)', scope: 'PCB assembly, sensor repair, instrumentation, and IoT devices.' },
                        { trade: 'Tool & Die Maker (3 Yrs)', scope: 'Press tools, injection molds, dies, and aerospace precision parts.' }
                      ].map(t => (
                        <div key={t.trade} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                          <strong className="text-slate-900 block font-bold">{t.trade}</strong>
                          <p className="text-slate-500 text-[10px] leading-relaxed">{t.scope}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. DEFENSE & GOVT JOBS AFTER 10TH */}
                {active10thFlowTab === 'defense' && (
                  <div className="bg-white rounded-3xl border border-rose-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        Gateway 5: Direct Defense Services & Central Government Jobs
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Immediate Uniformed Services & Government Employment (10th Pass Eligibility)
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Direct recruitment examinations conducted annually for Class 10 graduates with pensions, medical coverage, and rank progression.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">Indian Army — Agniveer General Duty (GD)</strong>
                        <p className="text-rose-800 text-[11px]">Primary combat force, infantry, gunner, driver. Minimum 45% aggregate in 10th class.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">Indian Navy — Agniveer MR (Matric Recruit)</strong>
                        <p className="text-rose-800 text-[11px]">Chef, Steward, and Hygienist roles aboard naval warships and shore establishments.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">Indian Coast Guard — Navik (Domestic Branch)</strong>
                        <p className="text-rose-800 text-[11px]">Maritime coastal patrol, ship operations, logistics, and marine policing.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">SSC GD Constable (CAPF Forces)</strong>
                        <p className="text-rose-800 text-[11px]">Recruitment into BSF, CISF, CRPF, ITBP, and SSB for border security and national defense.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">Railway Protection Force (RPF) Constable</strong>
                        <p className="text-rose-800 text-[11px]">Security of Indian railway passengers, trains, and railway property.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
                        <strong className="text-rose-950 block font-bold">Railway Group D / Track Maintainer</strong>
                        <p className="text-rose-800 text-[11px]">Technical track maintenance, signals, and railway engineering staff.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. SHORT-TERM JOB ORIENTED COURSES */}
                {active10thFlowTab === 'short_courses' && (
                  <div className="bg-white rounded-3xl border border-purple-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        Gateway 6: Job-Oriented Skill Certifications (6 Months - 1 Year)
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Rapid Creative & Digital Skills for Immediate Freelancing & Employment
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        High-paying creative and digital skills that do not require degrees. Start earning right away while pursuing higher education via distance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">3D Animation & VFX</strong>
                        <p className="text-slate-600 text-[11px]">Maya, Blender, video editing, game art, and advertising studios.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">Graphic & UI/UX Design</strong>
                        <p className="text-slate-600 text-[11px]">Photoshop, Figma, Illustrator, digital branding, and social media creative design.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">Web Development & Coding</strong>
                        <p className="text-slate-600 text-[11px]">HTML, CSS, JavaScript, WordPress, responsive web design for local businesses.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">Cybersecurity & Networking</strong>
                        <p className="text-slate-600 text-[11px]">CompTIA Network+, hardware assembly, router setup, and firewall basics.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">Digital Marketing & SEO</strong>
                        <p className="text-slate-600 text-[11px]">Google Ads, social media marketing, content marketing, and online brand growth.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                        <strong className="text-slate-900 block font-bold">Financial Accounting & Tally</strong>
                        <p className="text-slate-600 text-[11px]">TallyPrime, GST filing, Excel data analysis, and book-keeping for retail stores.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentStage === 'intermediate' ? (
              /* ================================================================= */
              /* INTERMEDIATE (+2 MPC / BiPC / MEC / ARTS) COMPREHENSIVE ROADMAP   */
              /* ================================================================= */
              <div className="space-y-6 animate-in fade-in">
                {/* Stream Selector */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Intermediate Streams</span>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                      Choose Your Intermediate (+2) Stream:
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Click your stream to view complete degree opportunities, national entrance exams, college tiers, and future careers.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'mpc', label: '1. MPC (Maths, Physics, Chem)', badge: 'Engineering, Architecture & Defense', icon: Laptop, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                      { id: 'bipc', label: '2. BiPC (Biology, Physics, Chem)', badge: 'Medical, Agriculture & Pharmacy', icon: Stethoscope, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                      { id: 'mec', label: '3. MEC / CEC (Commerce)', badge: 'CA, CS, Management & Finance', icon: Briefcase, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                      { id: 'arts', label: '4. Arts & Humanities (HEPS)', badge: 'Civil Services, Law & Design', icon: Scale, color: 'border-purple-300 bg-purple-50/70 text-purple-900' }
                    ].map(stream => {
                      const Icon = stream.icon;
                      const isSelected = activeInterStreamTab === stream.id;
                      return (
                        <button
                          key={stream.id}
                          onClick={() => setActiveInterStreamTab(stream.id as any)}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                              : `${stream.color} hover:shadow-xs`
                          }`}
                        >
                          <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                          <div>
                            <div className="text-xs font-bold leading-tight">{stream.label}</div>
                            <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'opacity-75'}`}>
                              {stream.badge}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MPC Stream Detail Card */}
                {activeInterStreamTab === 'mpc' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                          MPC (+2 Mathematics, Physics, Chemistry) — Degree Pathways
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2">
                          Engineering, Technological Innovation, Architecture, and Commissioned Defense
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                        {/* BTech */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">1. B.Tech / B.E. (4 Years)</strong>
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Engineering</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Branches:</strong> CSE, AI & Machine Learning, Data Science, ECE, EEE, Mechanical, Civil, Chemical, Aerospace, Marine.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance Exams:</strong> JEE Main, JEE Advanced, BITSAT, State EAPCET / EAMCET (Andhra Pradesh / Telangana), COMEDK, VITEEE.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Top Colleges:</strong> IITs, NITs, BITS Pilani, JNTU-GV affiliated colleges (Sri Sivani College of Engineering, GMRIT), Andhra University (AU).
                          </p>
                        </div>

                        {/* Architecture */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">2. B.Arch & Planning (5 Yrs)</strong>
                            <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Architecture</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> Bachelor of Architecture (B.Arch - 5 Years), Bachelor of Planning (B.Plan), B.Des.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance Exams:</strong> NATA (National Aptitude Test in Architecture), JEE Main Paper-2, UCEED.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Future Careers:</strong> Licensed Architect, Urban Infrastructure Designer, Building Conservationist.
                          </p>
                        </div>

                        {/* Pure Science & Research */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">3. Pure Science (BS-MS 5 Yrs)</strong>
                            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Research</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Institutions:</strong> IISc Bangalore, 7 IISERs (Berhampur, Pune, Mohali, etc.), NISER, CMI.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance Exams:</strong> IAT (IISER Aptitude Test), NEST (NISER), JEE Advanced.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Scientist in ISRO / DRDO / BARC, Quantum Computing, Theoretical Physics, Data Scientist.
                          </p>
                        </div>

                        {/* Defense */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">4. Defense (NDA Officer)</strong>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">Officer</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Wings:</strong> Indian Army, Indian Air Force (Flying Wing), Indian Navy, Indian Naval Academy.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance Exams:</strong> UPSC NDA Examination (written + SSB 5-Day Interview), 10+2 TES Cadet Entry.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Rank at Passing Out:</strong> Lieutenant / Flying Officer / Sub Lieutenant with B.Tech degree from JNU.
                          </p>
                        </div>

                        {/* Aviation & Marine */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">5. Aviation & Merchant Navy</strong>
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Aviation</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> Commercial Pilot License (CPL via IGRUA / Cadet Pilot), B.Sc Nautical Science (IMU-CET).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Airline Pilot (IndiGo, Air India), Deck Officer / Marine Captain on International Cargo Vessels.
                          </p>
                        </div>

                        {/* Computing & Analytics */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">6. Computer Applications</strong>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Software</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> BCA (Bachelor of Computer Applications - 3 Years), B.Sc Computer Science, Data Analytics.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Path:</strong> BCA $\rightarrow$ MCA (via NIMCET / ICET) $\rightarrow$ Software Engineer in MNCs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* BiPC Stream Detail Card */}
                {activeInterStreamTab === 'bipc' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          BiPC (+2 Biology, Physics, Chemistry) — Complete Degree Pathways
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2">
                          Medicine, Surgery, Agricultural Sciences, Pharmacy, and Allied Healthcare
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                        {/* MBBS / BDS */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">1. MBBS & BDS (Medical)</strong>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">NEET-UG</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> MBBS (5.5 Years with 1-Year Internship), BDS (Bachelor of Dental Surgery - 5 Years).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance:</strong> NEET-UG (National Eligibility cum Entrance Test).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Colleges:</strong> AIIMS Mangalagiri, Andhra Medical College (AMC), RIMS Srikakulam, Private Medical Colleges.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Next Step:</strong> NEET-PG $\rightarrow$ MD / MS Super-speciality (Cardiology, Neurology, Surgery).
                          </p>
                        </div>

                        {/* AYUSH */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">2. AYUSH Medicine (5.5 Yrs)</strong>
                            <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Alternative</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Branches:</strong> BAMS (Ayurvedic Medicine), BHMS (Homeopathy), BNYS (Naturopathy & Yogic Sciences), BUMS (Unani).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance:</strong> NEET-UG AYUSH Counseling.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Registered Medical Practitioner, Wellness Centers, Ayurvedic Hospital Medical Officer.
                          </p>
                        </div>

                        {/* Veterinary & Agriculture */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">3. Veterinary & Agriculture</strong>
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">High Demand</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> BVSc & AH (Veterinary Science - 5.5 Years), B.Sc (Hons) Agriculture (4 Years), B.Sc Horticulture, B.F.Sc (Fisheries).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance:</strong> State EAPCET (Agriculture Stream), ICAR AIEEA.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Veterinary Surgeon, Agricultural Officer (AO), Bank Agriculture Specialist Officer (IBPS SO), Seed Technologist.
                          </p>
                        </div>

                        {/* Pharmacy */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">4. Pharmacy (B.Pharm / Pharm.D)</strong>
                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Pharma</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> B.Pharmacy (4 Years), Pharma.D (Doctor of Pharmacy - 6 Years Clinical Practice).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Entrance:</strong> State EAPCET / NEET.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Clinical Pharmacist, Drug Inspector, Formulation Scientist in Dr. Reddy&apos;s, Sun Pharma, Cipla.
                          </p>
                        </div>

                        {/* Allied Health & Nursing */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">5. Nursing & Physiotherapy</strong>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">Healthcare</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> B.Sc Nursing (4 Years), BPT (Bachelor of Physiotherapy - 4.5 Years), BMRIT (Radiology & Imaging).
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Hospital Staff Nurse, Sports Physiotherapist, Rehabilitation Specialist, Overseas NHS/Gulf Healthcare.
                          </p>
                        </div>

                        {/* Biotechnology & Life Sciences */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <strong className="text-slate-900 font-bold">6. Biotechnology & Genetics</strong>
                            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Biotech</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Degrees:</strong> B.Tech Biotechnology, B.Sc Microbiology, B.Sc Genetics, Bioinformatics.
                          </p>
                          <p className="text-slate-600 text-[11px]">
                            <strong>Careers:</strong> Genetic Engineer, Vaccine Researcher (Bharat Biotech, Serum Institute), Bioinformatician.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MEC / CEC Stream Detail Card */}
                {activeInterStreamTab === 'mec' && (
                  <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        MEC / CEC (Commerce & Economics) — Pathways
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        Chartered Accountancy, Corporate Law, Management & Investment Banking
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">1. Chartered Accountancy (CA)</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Path:</strong> CA Foundation $\rightarrow$ Intermediate $\rightarrow$ 3-Yr Articleship $\rightarrow$ CA Final.
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> Statutory Auditor, Chief Financial Officer (CFO), Financial Consultant.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">2. IIM 5-Year Integrated MBA (IPM)</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Entrance:</strong> IPMAT (IIM Indore, IIM Rohtak, IIM Ranchi, IIM Bodh Gaya).
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> Direct Master of Business Administration from Indian Institutes of Management.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">3. Corporate Law & CS</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Degrees:</strong> BBA LLB (5 Years via CLAT), Company Secretary (ICSI CS Foundation).
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> Corporate Legal Advisor, Company Secretary, M&A Specialist.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Arts & Humanities Stream Detail Card */}
                {activeInterStreamTab === 'arts' && (
                  <div className="bg-white rounded-3xl border border-purple-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        Arts & Humanities (HEPS) — Pathways
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-2">
                        National Law Universities, UPSC Civil Services Foundation, Design & Journalism
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">1. National Law Universities (BA LLB)</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Entrance:</strong> CLAT (Common Law Admission Test for 26 NLUs), AILET (NLU Delhi).
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> High Court / Supreme Court Advocate, Judicial Officer, Corporate Counsel.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">2. UPSC Civil Services (IAS / IPS / IFS)</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Degrees:</strong> BA in Political Science, History, Economics, Public Administration.
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> District Collector, Indian Police Service, Indian Foreign Service Diplomat.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                        <strong className="text-slate-900 block font-bold">3. Design & Mass Communication</strong>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Exams:</strong> NID DAT (National Institute of Design), NIFT (Fashion), UCEED.
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          <strong>Outcome:</strong> Product UX Designer, Fashion Designer, Investigative Journalist.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentStage === 'diploma' ? (
              /* ========================================================================= */
              /* DIPLOMA / POLYTECHNIC: INTERACTIVE BRANCH SELECTION & ECET BLUEPRINT       */
              /* ========================================================================= */
              <div className="space-y-6 animate-in fade-in">
                {/* Branch Selection Grid */}
                <div className="bg-white rounded-3xl border border-teal-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      Polytechnic Diploma Branches
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                      Choose Your Polytechnic Diploma Group / Branch:
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Click any diploma branch to inspect its State ECET lateral entry path, core subjects, PSU exams, and industrial placements.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { id: 'cme', label: '1. Computer (DCME)', sub: 'Software & IT', icon: Laptop, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                      { id: 'ece', label: '2. Electronics (DECE)', sub: 'Hardware & Telecom', icon: Cpu, color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900' },
                      { id: 'eee', label: '3. Electrical (DEEE)', sub: 'Power Machines & EV', icon: Zap, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                      { id: 'mech', label: '4. Mechanical (DME)', sub: 'Manufacturing & CAD', icon: Wrench, color: 'border-rose-300 bg-rose-50/70 text-rose-900' },
                      { id: 'civil', label: '5. Civil (DCE)', sub: 'Construction & Survey', icon: Building2, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                      { id: 'auto', label: '6. Automobile (DAE)', sub: 'Automotive & Engines', icon: Shield, color: 'border-teal-300 bg-teal-50/70 text-teal-900' }
                    ].map(branch => {
                      const Icon = branch.icon;
                      const isSelected = activeDiplomaBranch === branch.id;
                      return (
                        <button
                          key={branch.id}
                          onClick={() => setActiveDiplomaBranch(branch.id as any)}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                              : `${branch.color} hover:shadow-xs`
                          }`}
                        >
                          <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                          <div>
                            <div className="text-xs font-bold leading-tight">{branch.label}</div>
                            <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'opacity-75'}`}>
                              {branch.sub}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Diploma Branch Deep-Dive */}
                {DIPLOMA_BRANCH_DETAILS[activeDiplomaBranch] && (() => {
                  const data = DIPLOMA_BRANCH_DETAILS[activeDiplomaBranch];
                  return (
                    <div className="space-y-6">
                      {/* Gateway 1: State ECET Lateral Entry */}
                      <div className="bg-white rounded-3xl border border-teal-200 p-6 sm:p-8 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                              Gateway 1: State ECET Lateral Entry (B.Tech 2nd Year)
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mt-2">
                              {data.name || data.label} → B.Tech Lateral Entry Blueprint
                            </h3>
                          </div>
                          <span className="px-3 py-1 rounded-xl bg-teal-600 text-white font-bold text-xs shrink-0 self-start sm:self-auto">
                            Direct 2nd Year B.Tech Entry
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                            <strong className="text-teal-950 block font-bold">Lateral Admission Target</strong>
                            <p className="text-slate-600 text-[11px]">{data.ecet_bridge.lateral_seat}</p>
                          </div>
                          <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                            <strong className="text-teal-950 block font-bold">Top University Colleges</strong>
                            <p className="text-slate-600 text-[11px]">{data.ecet_bridge.top_colleges}</p>
                          </div>
                          <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                            <strong className="text-teal-950 block font-bold">State ECET Rank Benchmark</strong>
                            <p className="text-slate-600 text-[11px]">{data.ecet_bridge.rank_target}</p>
                          </div>
                          <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                            <strong className="text-teal-950 block font-bold">Strategic Advantage</strong>
                            <p className="text-slate-600 text-[11px]">{data.ecet_bridge.advantage}</p>
                          </div>
                        </div>
                      </div>

                      {/* Gateway 2: Core Subjects & Labs */}
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                            Gateway 2: Core Technical Curriculum & Practical Labs
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 mt-2">
                            Key Subjects & Hands-on Workshop Modules
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          {data.core_subjects.map(sub => (
                            <div key={sub.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                              <strong className="text-slate-900 block font-bold">{sub.name}</strong>
                              <p className="text-slate-600 text-[11px] leading-relaxed">{sub.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gateway 3 & 4: PSU Govt Jobs + Industrial Recruiters */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* PSU Govt Jobs */}
                        <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                              Gateway 3: Central & State Govt PSUs
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-2">
                              Government Junior Engineer & Technical Appointments
                            </h3>
                          </div>
                          <div className="space-y-2.5 text-xs">
                            {data.psu_govt_jobs.map(job => (
                              <div key={job.org} className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between">
                                <div>
                                  <strong className="text-emerald-950 block">{job.org}</strong>
                                  <span className="text-slate-600 text-[11px]">{job.role}</span>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                                  {job.salary}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Private Recruiters */}
                        <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-sm space-y-4">
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                              Gateway 4: Private Industrial Campus Placements
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-2">
                              Major Recruiters & Apprenticeship Sponsors
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs pt-1">
                            {data.industry_recruiters.map(company => (
                              <span key={company} className="px-3 py-2 rounded-xl border border-blue-200 bg-blue-50/50 text-blue-950 font-bold text-[11px]">
                                {company}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-2">
                            Annual campus placements offer trainee engineer positions with fast-track promotion upon completing B.Tech via distance or evening colleges.
                          </p>
                        </div>
                      </div>

                      {/* Gateway 5: 3-Year Action Plan */}
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                            Gateway 5: 3-Year Strategic Milestone Plan
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 mt-2">
                            From 1st Year Fundamentals to 3rd Year ECET Rank & Industry Placement
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          {data.three_year_plan.map(step => (
                            <div key={step.year} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                              <strong className="text-brand-700 font-bold block">{step.year}</strong>
                              <p className="text-slate-600 text-[11px] leading-relaxed">{step.focus}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* B.TECH 4-YEAR STRUCTURED BRANCH ROADMAP & SYLLABUS */
              <BTechBranchRoadmapView
                selectedBranch={btechRoleBranchFilter === "all" ? "eee" : btechRoleBranchFilter}
                onBranchChange={setBtechRoleBranchFilter}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: STUDY PLANNER & STUDENT SELF-ANALYSIS DASHBOARD TRACKER         */}
        {/* ========================================================================= */}
        {activePortal === 'planner' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <BarChart3 className="h-3.5 w-3.5 text-brand-600" />
                  <span>Dedicated Section 2: Student Self-Analysis Dashboard & Focus Tracker</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Student Study Dashboard & Precision Tracker
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Analyze your daily learning efficiency, track study streak, launch live focus stopwatches, and customize your study schedule.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-800 hover:bg-brand-100 transition-colors shadow-2xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ Add Custom Subject</span>
                </button>

                <button
                  onClick={() => {
                    if (currentStage === 'class_10' || currentStage === 'class_9') {
                      setAllocations(DEFAULT_CLASS_10_ALLOCATIONS);
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

            {/* SELF-ANALYSIS COCKPIT: METRICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Daily Target Progress */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Today&apos;s Study Target</span>
                  <Target className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {(studiedMinutesToday / 60).toFixed(1)}h <span className="text-xs text-slate-400 font-semibold">/ {(dailyMinutesTarget / 60).toFixed(1)}h</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden">
                    <div
                      className="bg-brand-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${targetProgressPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>{targetProgressPercentage}% Achieved</span>
                  <span className="font-semibold text-emerald-600">On Track</span>
                </div>
              </div>

              {/* Study Streak */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Consistency Streak</span>
                  <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 flex items-center space-x-1">
                    <span>5 Days</span>
                    <span className="text-xs text-amber-500">🔥</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Active study streak. Target: 7 days without break.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Personal Best: 12 Days
                </div>
              </div>

              {/* Focus Rate / Efficiency */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Focus Efficiency</span>
                  <Activity className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">92%</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Calculated from active timer duration vs pause intervals.
                  </p>
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>High Concentration Zone</span>
                </div>
              </div>

              {/* Session Completion Rate */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Schedule Completion</span>
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {completedCount} <span className="text-xs text-slate-400 font-semibold">/ {totalSubjectsCount} Finished</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-500">
                  {completionPercentage}% of planned sessions checked off
                </div>
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
                      placeholder="e.g. Sanskrit / Physics Revision"
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
                    placeholder="Self-analysis note: what did you practice in this session?..."
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
                      <span>Complete & Log Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Daily Schedule Checklist & Session Cards */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Today&apos;s Interactive Study Timetable</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click checkboxes to mark sessions done, or launch the stopwatch to log actual focus time.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-500 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {totalPlannedStudyMinutes}m Study
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700">
                    {totalBreakMinutes}m Breaks
                  </span>
                </div>
              </div>

              {allocations.length > 0 ? (
                <div className="space-y-3">
                  {allocations.map((alloc, idx) => {
                    const isDone = completedSessions[alloc.subject_id];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                          alloc.is_break
                            ? 'border-slate-200 bg-slate-50/70'
                            : isDone
                            ? 'border-emerald-200 bg-emerald-50/30'
                            : 'border-brand-200/80 bg-brand-50/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Done Checkbox */}
                          {!alloc.is_break ? (
                            <button
                              onClick={() => toggleSessionCompleted(alloc.subject_id)}
                              className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-colors ${
                                isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 hover:border-slate-400 bg-white'
                              }`}
                              title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                            >
                              {isDone && <Check className="h-4 w-4 stroke-[3]" />}
                            </button>
                          ) : (
                            <div className="h-6 w-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                              <Coffee className="h-3.5 w-3.5" />
                            </div>
                          )}

                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {alloc.subject_name}
                              </h4>
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
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 px-4 space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Your Study Timetable is Completely Clear</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      No active sessions. Click &quot;+ Add Custom Subject&quot; or &quot;Auto-Balance Schedule&quot; to build your plan.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-sm"
                    >
                      + Add Custom Subject
                    </button>
                    <button
                      onClick={() => {
                        if (currentStage === 'class_10' || currentStage === 'class_9') {
                          setAllocations(DEFAULT_CLASS_10_ALLOCATIONS);
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

            {/* Self-Reflection Journal */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-brand-600" />
                <span>Daily Self-Analysis & Reflection Note</span>
              </h3>
              <p className="text-xs text-slate-500">
                Write down key topics understood today, problem areas to revise, and plan your focus for tomorrow:
              </p>
              <textarea
                value={todayReflection}
                onChange={e => setTodayReflection(e.target.value)}
                placeholder="Today I mastered quadratic equations and solved 10 problems on Newton's second law. Tomorrow need to revise organic reactions..."
                rows={3}
                className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setToastMessage('Self-reflection journal saved.');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Save Reflection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: STUDY RESOURCES — EXCLUSIVELY FOR B.TECH ENGINEERING           */}
        {/* ========================================================================= */}
        {activePortal === 'resources' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                <BookOpen className="h-3.5 w-3.5 text-brand-400" />
                <span>Dedicated Section 3: BTech Engineering Resources Only</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                BTech University Syllabi, Question Papers & Lab Manuals
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-4xl">
                Official repository for undergraduate B.Tech engineering students across JNTU-GV, JNTUK, JNTUH, Andhra University, and affiliated colleges (R23, R20 schemes).
              </p>
            </div>

            {/* University & College Selector */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-brand-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">Affiliated University / College:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { id: 'jntugv', label: 'JNTU-GV (incl. Sri Sivani College of Engg)' },
                    { id: 'jntuk', label: 'JNTUK Kakinada' },
                    { id: 'au', label: 'Andhra University (AU)' },
                    { id: 'jntuh', label: 'JNTUH Hyderabad' }
                  ].map(u => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUniversity(u.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        selectedUniversity === u.id
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch & Type Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
                {/* Branch Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All Branches' },
                    { id: 'cse', label: 'CSE (Computer Science)' },
                    { id: 'aiml', label: 'AI & Machine Learning' },
                    { id: 'ece', label: 'ECE (Electronics)' },
                    { id: 'eee', label: 'EEE (Electrical)' },
                    { id: 'mech', label: 'Mechanical' },
                    { id: 'civil', label: 'Civil' }
                  ].map(br => (
                    <button
                      key={br.id}
                      onClick={() => setSelectedBtechBranch(br.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                        selectedBtechBranch === br.id
                          ? 'bg-brand-600 text-white shadow-sm font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {br.label}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative min-w-[260px]">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={btechSearch}
                    onChange={e => setBtechSearch(e.target.value)}
                    placeholder="Search BTech subject, code (e.g. M1, PPS, R23)..."
                    className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Resources Cards Grid */}
            {filteredBtechResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBtechResources.map(res => (
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
                          {res.regulation || 'R23 Regulation'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{res.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 flex items-center space-x-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Source: {res.source_contributor || 'University Board'}</span>
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                      <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                        <FileText className="h-3.5 w-3.5 text-slate-400" />
                        <span>Verified Engineering PDF</span>
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedPreviewDoc(res)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                          title="Interactive Document Preview"
                        >
                          <Eye className="h-3.5 w-3.5 text-slate-600" />
                          <span>Preview</span>
                        </button>

                        <a
                          href={res.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Open PDF</span>
                        </a>

                        <a
                          href={res.file_url}
                          download={res.file_url.split('/').pop() || `${res.id}.pdf`}
                          className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="Download File"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No BTech resources found matching filter</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing search query or switching branch filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedBtechBranch('all');
                    setSelectedBtechType('');
                    setBtechSearch('');
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

      {/* Interactive Academic Document Viewer Modal */}
      {selectedPreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <FileText className="h-5 w-5 text-brand-400" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Official University Academic Document Preview
                  </h3>
                  <p className="text-sm font-bold text-white line-clamp-1">
                    {selectedPreviewDoc.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPreviewDoc(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Body (Authentic Academic Sheet View) */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-extrabold tracking-widest text-brand-700 uppercase">
                    JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                    SRI SIVANI COLLEGE OF ENGINEERING · AFFILIATED INSTITUTION
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Regulation: <span className="font-semibold text-slate-700">{selectedPreviewDoc.regulation || 'R23'}</span> · Department of {selectedPreviewDoc.branch_code?.toUpperCase()} · Semester {selectedPreviewDoc.semester || '1'}
                  </p>
                </div>

                <div className="text-left space-y-3">
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Document Status</span>
                      <span className="font-bold text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Verified Official Academic Record</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Digital SHA-256</span>
                      <span className="font-mono text-[11px] text-slate-600">e8b9c71a34d09f7e</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Curricular Overview & Prescribed Syllabus
                    </h5>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
                      <p>
                        <strong>Unit I - Foundations & Core Theory:</strong> Principles, fundamental laws, physical configurations, mathematical formulation, and elementary boundary problems.
                      </p>
                      <p>
                        <strong>Unit II - Applied Analysis & Analytical Formulations:</strong> Step-by-step mathematical reductions, state matrices, coordinate transformations, and equilibrium evaluations.
                      </p>
                      <p>
                        <strong>Unit III - Laboratory & Computational Models:</strong> Standard experimentation protocols, error corrections, code algorithms, and hardware test validations.
                      </p>
                      <p>
                        <strong>Unit IV - Industry & Practical Implementation:</strong> Modern engineering tools, design standards (IS/IEEE), real-world case studies, and safety protocols.
                      </p>
                      <p>
                        <strong>Unit V - Examination Blueprint & Question Matrix:</strong> Part A (10 Short Answers, 20 Marks) + Part B (5 Long Essays with Internal Unit Choice, 50 Marks).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono">
                Target File: {selectedPreviewDoc.file_url.split('/').pop()}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </button>
                <a
                  href={selectedPreviewDoc.file_url}
                  download={selectedPreviewDoc.file_url.split('/').pop() || `${selectedPreviewDoc.id}.pdf`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </a>
                <a
                  href={selectedPreviewDoc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Native PDF in New Tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 Study Blueprint. High-performance academic and career operating system for Indian students.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActivePortal('careers')} className="hover:text-slate-700 font-semibold">1. Career Roadmaps</button>
            <button onClick={() => setActivePortal('planner')} className="hover:text-slate-700 font-semibold">2. Study Planner & Tracker</button>
            <button onClick={() => setActivePortal('resources')} className="hover:text-slate-700 font-semibold">3. BTech Study Resources</button>
            <Link href="/profile" className="hover:text-slate-700 font-semibold">Profile Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
