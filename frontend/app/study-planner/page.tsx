'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Calendar,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Save,
  RotateCcw,
  Coffee,
  CheckCircle2,
  AlertCircle,
  Play
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
        if (plan) {
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
      setStatusMessage('Generated mathematically balanced 240-minute timetable.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to generate timetable.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const saved = await api.put<StudyPlan>('/study-plans/current', allocations);
      setStudyPlan(saved);
      setStatusMessage('Timetable changes saved successfully.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Error saving timetable.');
    } finally {
      setSaving(false);
    }
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

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Deterministic Timetable Planner
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Rule-based daily schedule allocation with zero drift and interleaved break intervals.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center space-x-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Regenerate Plan</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-1.5 rounded-xl bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? 'Saving...' : 'Save Timetable'}</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3 text-xs font-semibold text-brand-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
            <span>{statusMessage}</span>
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
                <span className="font-bold text-brand-600">{availableDailyMinutes} Minutes ({(availableDailyMinutes / 60).toFixed(1)} hrs)</span>
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
          </div>

          {/* Active Schedule Flow */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Daily Timeline Allocations</h2>

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
                        {alloc.is_break ? <Coffee className="h-4 w-4" /> : `#${alloc.session_order}`}
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

                    {/* Duration Controls */}
                    <div className="flex items-center space-x-3 self-end sm:self-center">
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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-slate-500">
                Click &quot;Regenerate Plan&quot; to build your personalized study schedule.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
