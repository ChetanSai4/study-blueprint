'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Calendar,
  Clock,
  Plus,
  Minus,
  Save,
  RotateCcw,
  Coffee,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Square,
  Trash2,
  BookOpen,
  Sparkles,
  Layers,
  Check,
  GraduationCap
} from 'lucide-react';
import { api } from '@/lib/api';
import { StudyPlan, TimetableAllocation, StudentProfile } from '@/types';
import { formatSeconds } from '@/lib/utils';

const STAGES = [
  { id: 'class_9', label: 'Class 9 (Secondary School)' },
  { id: 'class_10', label: 'Class 10 (Secondary Board)' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)' },
  { id: 'diploma', label: 'Diploma / Polytechnic' },
  { id: 'btech_1', label: 'BTech 1st Year (Sem 1-1 / 1-2)' }
];

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

export default function StudyPlannerPage() {
  const [currentStage, setCurrentStage] = useState('class_9');
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [allocations, setAllocations] = useState<TimetableAllocation[]>(DEFAULT_CLASS_9_ALLOCATIONS);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [availableDailyMinutes, setAvailableDailyMinutes] = useState<number>(240);
  const [breakMinutes, setBreakMinutes] = useState<number>(10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Manual session modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualSubjectName, setManualSubjectName] = useState('');
  const [manualSubjectCode, setManualSubjectCode] = useState('');
  const [manualDuration, setManualDuration] = useState(50);
  const [manualTimeSlot, setManualTimeSlot] = useState('06:00 PM - 06:50 PM');

  // Delete plan confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Embedded Active Study Timer
  const [activeSession, setActiveSession] = useState<TimetableAllocation | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    const stageToUse = saved || 'class_9';
    setCurrentStage(stageToUse);

    async function loadPlan() {
      try {
        const [plan, prof] = await Promise.all([
          api.get<StudyPlan>('/study-plans/current').catch(() => null),
          api.get<StudentProfile>('/profile').catch(() => null)
        ]);
        if (prof) {
          setProfile(prof);
          if (prof.available_study_hours_daily) {
            setAvailableDailyMinutes(Math.round(prof.available_study_hours_daily * 60));
          }
        }
        if (plan && plan.allocations && plan.allocations.length > 0) {
          setStudyPlan(plan);
          setAllocations(plan.allocations);
          setAvailableDailyMinutes(plan.daily_target_minutes);
          setBreakMinutes(plan.break_duration_minutes);
        } else {
          // Initialize default tailored to stage
          if (stageToUse === 'class_9' || stageToUse === 'class_10') {
            setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
          } else {
            setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, []);

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('study_blueprint_stage', stageId);
    }
    if (stageId === 'class_9' || stageId === 'class_10') {
      setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
    } else {
      setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
    }
    setStatusMessage(`Switched academic timetable to: ${STAGES.find(s => s.id === stageId)?.label}`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Timer interval tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const totalStudyMinutes = allocations
    .filter(a => !a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const totalBreakMinutes = allocations
    .filter(a => a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const handleGenerate = async () => {
    if (currentStage === 'class_9' || currentStage === 'class_10') {
      setAllocations(DEFAULT_CLASS_9_ALLOCATIONS);
      handleSave(DEFAULT_CLASS_9_ALLOCATIONS);
    } else {
      setAllocations(DEFAULT_BTECH_1_ALLOCATIONS);
      handleSave(DEFAULT_BTECH_1_ALLOCATIONS);
    }
    setStatusMessage('Auto-balanced standard daily study timetable.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSave = async (updatedList?: TimetableAllocation[]) => {
    setSaving(true);
    setStatusMessage(null);
    const listToSave = updatedList || allocations;
    try {
      const saved = await api.put<StudyPlan>('/study-plans/current', listToSave);
      setStudyPlan(saved);
      setAllocations(saved.allocations);
      setStatusMessage('Timetable changes saved successfully.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Error saving timetable.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleDeletePlan = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      await api.delete('/study-plans/current');
      setStudyPlan(null);
      setAllocations([]);
      setShowDeleteConfirm(false);
      setStatusMessage('Study plan deleted. Timetable is now completely clear.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to delete timetable.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleRemoveSession = (index: number) => {
    const updated = allocations.filter((_, i) => i !== index);
    setAllocations(updated);
    handleSave(updated);
  };

  const adjustMinutes = (index: number, delta: number) => {
    setAllocations(prev => {
      const updated = [...prev];
      const current = updated[index].planned_minutes;
      const nextVal = Math.max(15, current + delta);
      updated[index] = { ...updated[index], planned_minutes: nextVal };
      handleSave(updated);
      return updated;
    });
  };

  const handleAddManualSession = () => {
    if (!manualSubjectName.trim()) return;

    const newOrder = allocations.length + 1;
    const newSession: TimetableAllocation = {
      subject_id: `custom_${Date.now()}`,
      subject_name: manualSubjectName.trim(),
      subject_code: manualSubjectCode.trim() || `SUB-${newOrder}`,
      planned_minutes: Number(manualDuration),
      time_slot: manualTimeSlot,
      session_order: newOrder,
      is_break: false
    };

    const updated = [...allocations, newSession];
    setAllocations(updated);
    handleSave(updated);

    // Reset modal
    setManualSubjectName('');
    setManualSubjectCode('');
    setShowAddModal(false);
    setStatusMessage(`Added "${newSession.subject_name}" to your timetable.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Timer controls
  const startTimerForSession = (alloc: TimetableAllocation) => {
    setActiveSession(alloc);
    setTimerSeconds(0);
    setTimerRunning(true);
    setTimerFinished(false);
  };

  const completeTimerSession = async () => {
    if (!activeSession) return;
    setTimerRunning(false);
    try {
      const now = new Date();
      const startTime = new Date(now.getTime() - timerSeconds * 1000);
      await api.post('/study-sessions', {
        subject_id: activeSession.subject_id,
        task_description: `Focused study on ${activeSession.subject_name}`,
        started_at: startTime.toISOString(),
        ended_at: now.toISOString(),
        duration_seconds: timerSeconds,
        paused_duration_seconds: 0,
        session_type: 'timer',
        session_notes: sessionNotes || 'Study session logged from Study Planner'
      });
      setTimerFinished(true);
      setStatusMessage(`Logged ${Math.round(timerSeconds / 60)} minutes of study for ${activeSession.subject_name}.`);
      setTimeout(() => {
        setActiveSession(null);
        setTimerSeconds(0);
        setTimerFinished(false);
        setStatusMessage(null);
      }, 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="h-4 w-4" />
              <span>Dedicated Section 2: Study Planner & Tracker</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Study Planner & Precision Timetable
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Active timetable for <strong className="text-slate-800">{STAGES.find(s => s.id === currentStage)?.label}</strong>. Manually add subjects, adjust durations, launch live focus stopwatches, or reset your schedule.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>+ Add Subject Manually</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading}
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

            {allocations.length > 0 && (
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center space-x-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow hover:bg-slate-800 transition-colors"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? 'Saving...' : 'Save Plan'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Academic Stage Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-brand-600 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Timetable Class / Level:
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {STAGES.map(stage => {
              const isSelected = currentStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{stage.label}</span>
                  {isSelected && <Check className="h-3 w-3 text-brand-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

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

        {/* Add Manual Subject / Session Modal */}
        {showAddModal && (
          <div className="p-6 rounded-2xl border-2 border-brand-300 bg-white shadow-md space-y-4 animate-in fade-in">
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
                  value={manualSubjectName}
                  onChange={e => setManualSubjectName(e.target.value)}
                  placeholder={currentStage === 'class_9' ? 'e.g. Hindi / Sanskrit / Social' : 'e.g. Linear Algebra / Physics'}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Subject Code (Optional)</label>
                <input
                  type="text"
                  value={manualSubjectCode}
                  onChange={e => setManualSubjectCode(e.target.value)}
                  placeholder="e.g. SUB-01"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Session Duration</label>
                <select
                  value={manualDuration}
                  onChange={e => setManualDuration(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white"
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
                  value={manualTimeSlot}
                  onChange={e => setManualTimeSlot(e.target.value)}
                  placeholder="e.g. 06:00 PM - 06:50 PM"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleAddManualSession}
                disabled={!manualSubjectName.trim()}
                className="flex items-center space-x-1.5 rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white hover:bg-brand-500 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Insert to Schedule</span>
              </button>
            </div>
          </div>
        )}

        {/* Embedded Active Study Stopwatch (Live Tracker) */}
        {activeSession && (
          <div className="p-6 rounded-2xl border-2 border-brand-500 bg-slate-900 text-white shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">Active Study Session</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{activeSession.subject_code}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{activeSession.subject_name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Planned: {activeSession.planned_minutes} minutes ({activeSession.time_slot})</p>
              </div>

              {/* Timer Display */}
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-wider">
                {formatSeconds(timerSeconds)}
              </div>
            </div>

            {/* Timer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={sessionNotes}
                onChange={e => setSessionNotes(e.target.value)}
                placeholder="Session notes (e.g. Completed Chapter 2 exercises)..."
                className="flex-1 min-w-[200px] rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-400"
              />

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="flex items-center space-x-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors"
                >
                  {timerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{timerRunning ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  onClick={completeTimerSession}
                  className="flex items-center space-x-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-colors"
                >
                  <Square className="h-3.5 w-3.5 fill-white" />
                  <span>Complete Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timetable Session Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Today&apos;s Study Schedule</h2>
              <p className="text-xs text-slate-500">
                {totalStudyMinutes} minutes focused study · {totalBreakMinutes} minutes breaks
              </p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">{allocations.length} sessions</span>
          </div>

          {allocations.length > 0 ? (
            <div className="space-y-3">
              {allocations.map((alloc, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    alloc.is_break ? 'border-slate-200 bg-slate-50/70' : 'border-brand-200 bg-brand-50/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        alloc.is_break ? 'bg-amber-100 text-amber-700' : 'bg-slate-900 text-white font-bold text-xs'
                      }`}
                    >
                      {alloc.is_break ? <Coffee className="h-4 w-4" /> : `#${idx + 1}`}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-slate-900">{alloc.subject_name}</h3>
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
                  <div className="flex items-center space-x-2 self-end sm:self-center">
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
                        onClick={() => startTimerForSession(alloc)}
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
                  onClick={handleGenerate}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Auto-Balance 4 Hours
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
