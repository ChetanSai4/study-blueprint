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
  Trash2,
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { api } from '@/lib/api';
import { StudyPlan, TimetableAllocation, Subject, StudentProfile } from '@/types';
import Link from 'next/link';

export default function StudyPlannerPage() {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [allocations, setAllocations] = useState<TimetableAllocation[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
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

  useEffect(() => {
    async function loadPlan() {
      try {
        const [plan, prof, subs] = await Promise.all([
          api.get<StudyPlan>('/study-plans/current').catch(() => null),
          api.get<StudentProfile>('/profile').catch(() => null),
          api.get<Subject[]>('/catalog/subjects?branch=cse').catch(() => [])
        ]);
        if (prof) {
          setProfile(prof);
          if (prof.available_study_hours_daily) {
            setAvailableDailyMinutes(Math.round(prof.available_study_hours_daily * 60));
          }
        }
        if (subs) setSubjects(subs);
        if (plan && plan.allocations && plan.allocations.length > 0) {
          setStudyPlan(plan);
          setAllocations(plan.allocations);
          setAvailableDailyMinutes(plan.daily_target_minutes);
          setBreakMinutes(plan.break_duration_minutes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, []);

  const totalStudyMinutes = allocations
    .filter(a => !a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const totalBreakMinutes = allocations
    .filter(a => a.is_break)
    .reduce((sum, a) => sum + a.planned_minutes, 0);

  const handleGenerate = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const generated = await api.post<StudyPlan>('/study-plans/generate', {
        available_daily_minutes: availableDailyMinutes,
        break_duration_minutes: breakMinutes,
        study_interval_minutes: 50
      });
      setStudyPlan(generated);
      setAllocations(generated.allocations);
      setStatusMessage('Generated mathematically balanced daily study timetable.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to generate timetable.');
    } finally {
      setLoading(false);
    }
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
      setStatusMessage('Study plan deleted and timetable reset.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to delete timetable.');
    } finally {
      setSaving(false);
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
      return updated;
    });
  };

  const handleAddManualSession = () => {
    if (!manualSubjectName.trim()) return;

    const newOrder = allocations.length + 1;
    const newSession: TimetableAllocation = {
      subject_id: `custom_${Date.now()}`,
      subject_name: manualSubjectName.trim(),
      subject_code: manualSubjectCode.trim() || `SEM1-${newOrder}`,
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
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Study Planner & Timetable
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Add your subjects manually, configure study intervals, adjust session lengths, or reset your timetable anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 rounded-xl border border-brand-300 bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Custom Subject</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Auto-Balance</span>
            </button>

            {allocations.length > 0 && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center space-x-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Plan</span>
              </button>
            )}

            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center space-x-1.5 rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? 'Saving...' : 'Save Plan'}</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3 text-xs font-semibold text-brand-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Delete Plan Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50/80 space-y-3 animate-in fade-in">
            <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <span>Are you sure you want to delete and reset your study plan?</span>
            </div>
            <p className="text-xs text-rose-700">
              This will remove all current daily session allocations. You can rebuild or manually add your subjects again anytime.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <button
                onClick={handleDeletePlan}
                className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 shadow-sm"
              >
                Yes, Delete Plan
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Manual Subject / Session Modal */}
        {showAddModal && (
          <div className="p-5 rounded-2xl border-2 border-brand-300 bg-white shadow-md space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-brand-600" />
                <span>Add Custom Subject / Study Session</span>
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
                  placeholder="e.g. Linear Algebra / PPS in C"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Subject Code (Optional)</label>
                <input
                  type="text"
                  value={manualSubjectCode}
                  onChange={e => setManualSubjectCode(e.target.value)}
                  placeholder="e.g. 23BS1101"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Duration (Minutes)</label>
                <select
                  value={manualDuration}
                  onChange={e => setManualDuration(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white"
                >
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={50}>50 Minutes (Standard)</option>
                  <option value={60}>60 Minutes Focus</option>
                  <option value={90}>90 Minutes Deep Study</option>
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
                className="flex items-center space-x-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-500 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Insert Session to Plan</span>
              </button>
            </div>
          </div>
        )}

        {/* Timetable Controls & Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Study Budget Controls</h2>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-600">Daily Study Target:</span>
                <span className="font-bold text-brand-600">
                  {availableDailyMinutes} Minutes ({(availableDailyMinutes / 60).toFixed(1)} hrs)
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="480"
                step="30"
                value={availableDailyMinutes}
                onChange={e => setAvailableDailyMinutes(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-semibold text-slate-600">Break Duration:</span>
                <span className="font-bold text-slate-800">{breakMinutes} Minutes</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[5, 10, 15].map(b => (
                  <button
                    key={b}
                    onClick={() => setBreakMinutes(b)}
                    className={`py-1.5 rounded-lg border font-semibold ${
                      breakMinutes === b
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {b}m Break
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Stats */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Study Time:</span>
                <span className="font-bold text-slate-900">{totalStudyMinutes} mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Break Time:</span>
                <span className="font-bold text-slate-700">{totalBreakMinutes} mins</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span className="font-semibold text-slate-700">Total Schedule Length:</span>
                <span className="font-extrabold text-brand-700">{totalStudyMinutes + totalBreakMinutes} mins</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full py-2.5 rounded-xl border border-dashed border-brand-400 text-brand-700 font-bold text-xs bg-brand-50/50 hover:bg-brand-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>+ Add Subject Manually</span>
              </button>
            </div>
          </div>

          {/* Active Schedule Flow */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Daily Timeline Allocations</h2>
              <span className="text-xs text-slate-400 font-semibold">{allocations.length} items</span>
            </div>

            {allocations.length > 0 ? (
              <div className="space-y-3">
                {allocations.map((alloc, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      alloc.is_break
                        ? 'border-slate-200 bg-slate-50/80'
                        : 'border-brand-200 bg-brand-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                          alloc.is_break
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-brand-600 text-white font-bold text-xs'
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

                    {/* Duration Controls and Delete Button */}
                    <div className="flex items-center space-x-2.5 self-end sm:self-center">
                      <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                          onClick={() => adjustMinutes(idx, -15)}
                          className="p-1 rounded text-slate-500 hover:bg-slate-100"
                          title="Subtract 15 minutes"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-slate-800 px-2">
                          {alloc.planned_minutes}m
                        </span>
                        <button
                          onClick={() => adjustMinutes(idx, 15)}
                          className="p-1 rounded text-slate-500 hover:bg-slate-100"
                          title="Add 15 minutes"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {!alloc.is_break && (
                        <Link
                          href={`/study-tracker?subject=${alloc.subject_id}`}
                          className="flex items-center space-x-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-500 shadow-sm"
                        >
                          <Play className="h-3 w-3 fill-white" />
                          <span>Start</span>
                        </Link>
                      )}

                      {/* Remove individual session */}
                      <button
                        type="button"
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
              <div className="text-center py-12 px-4 space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">No Active Study Timetable</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click &quot;Auto-Balance&quot; to auto-generate a schedule or click &quot;+ Add Custom Subject&quot; to enter your subjects manually.
                </p>
                <div className="flex items-center justify-center space-x-3 pt-2">
                  <button
                    onClick={handleGenerate}
                    className="flex items-center space-x-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-500 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Generate Schedule</span>
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Manually</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
