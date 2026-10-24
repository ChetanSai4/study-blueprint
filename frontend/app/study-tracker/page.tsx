'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Play,
  Pause,
  Square,
  Clock,
  RotateCcw,
  PlusCircle,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import { Subject, StudySession } from '@/types';
import { formatSeconds } from '@/lib/utils';

export default function StudyTrackerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [history, setHistory] = useState<StudySession[]>([]);

  // Timer State
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerPaused, setTimerPaused] = useState<boolean>(false);
  const [elapsedActiveSeconds, setElapsedActiveSeconds] = useState<number>(0);
  const [elapsedPausedSeconds, setElapsedPausedSeconds] = useState<number>(0);
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  // Manual entry tab
  const [activeTab, setActiveTab] = useState<'stopwatch' | 'manual'>('stopwatch');
  const [manualDate, setManualDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [manualMinutes, setManualMinutes] = useState<number>(45);

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load catalog and session history
  useEffect(() => {
    async function loadData() {
      try {
        const [subs, sess] = await Promise.all([
          api.get<Subject[]>('/catalog/subjects?branch=cse').catch(() => []),
          api.get<StudySession[]>('/study-sessions').catch(() => [])
        ]);
        if (subs.length > 0) {
          setSubjects(subs);
          setSelectedSubjectId(subs[0].id);
        }
        if (sess) setHistory(sess);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();

    // Recover persisted active timer if page was refreshed
    const savedTimer = localStorage.getItem('study_blueprint_active_timer');
    if (savedTimer) {
      try {
        const parsed = JSON.parse(savedTimer);
        setStartedAt(new Date(parsed.startedAt));
        setElapsedActiveSeconds(parsed.elapsedActiveSeconds || 0);
        setElapsedPausedSeconds(parsed.elapsedPausedSeconds || 0);
        setSelectedSubjectId(parsed.selectedSubjectId || '');
        setTaskDescription(parsed.taskDescription || '');
        setTimerRunning(parsed.timerRunning || false);
        setTimerPaused(parsed.timerPaused || false);
      } catch (e) {
        console.error('Failed to restore saved timer state', e);
      }
    }
  }, []);

  // Stopwatch ticker
  useEffect(() => {
    if (timerRunning && !timerPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedActiveSeconds(prev => {
          const next = prev + 1;
          persistState(next, elapsedPausedSeconds);
          return next;
        });
      }, 1000);
    } else if (timerRunning && timerPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedPausedSeconds(prev => {
          const next = prev + 1;
          persistState(elapsedActiveSeconds, next);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, timerPaused]);

  const persistState = (active: number, paused: number) => {
    localStorage.setItem(
      'study_blueprint_active_timer',
      JSON.stringify({
        startedAt: startedAt?.toISOString(),
        elapsedActiveSeconds: active,
        elapsedPausedSeconds: paused,
        selectedSubjectId,
        taskDescription,
        timerRunning,
        timerPaused
      })
    );
  };

  const handleStart = () => {
    if (!selectedSubjectId) return;
    setStartedAt(new Date());
    setTimerRunning(true);
    setTimerPaused(false);
  };

  const handlePause = () => {
    setTimerPaused(true);
  };

  const handleResume = () => {
    setTimerPaused(false);
  };

  const handleStopAndSave = async () => {
    if (!startedAt) return;
    const ended = new Date();
    setFeedbackMessage(null);

    try {
      const created = await api.post<StudySession>('/study-sessions', {
        subject_id: selectedSubjectId,
        task_description: taskDescription || 'Focused Subject Study Block',
        started_at: startedAt.toISOString(),
        ended_at: ended.toISOString(),
        duration_seconds: elapsedActiveSeconds,
        paused_duration_seconds: elapsedPausedSeconds,
        session_type: 'timer',
        session_notes: sessionNotes || undefined
      });

      setHistory(prev => [created, ...prev]);
      setFeedbackMessage(`Logged ${Math.round(elapsedActiveSeconds / 60)} minutes of active study time!`);

      // Reset
      setTimerRunning(false);
      setTimerPaused(false);
      setElapsedActiveSeconds(0);
      setElapsedPausedSeconds(0);
      setStartedAt(null);
      localStorage.removeItem('study_blueprint_active_timer');
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage('Failed to save study session.');
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);
    try {
      const start = new Date(`${manualDate}T10:00:00Z`);
      const end = new Date(start.getTime() + manualMinutes * 60 * 1000);

      const created = await api.post<StudySession>('/study-sessions', {
        subject_id: selectedSubjectId,
        task_description: taskDescription || 'Manual Study Session Log',
        started_at: start.toISOString(),
        ended_at: end.toISOString(),
        duration_seconds: manualMinutes * 60,
        paused_duration_seconds: 0,
        session_type: 'manual',
        session_notes: sessionNotes || undefined
      });

      setHistory(prev => [created, ...prev]);
      setFeedbackMessage(`Logged ${manualMinutes} minutes manually.`);
      setTaskDescription('');
      setSessionNotes('');
    } catch (err: any) {
      console.error(err);
      setFeedbackMessage('Failed to log manual study session.');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Precision Study Stopwatch & Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracks true active study time, deducts pauses strictly, and persists records safely across browser sessions.
          </p>
        </div>

        {feedbackMessage && (
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3.5 text-xs font-semibold text-brand-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Tab switch */}
        <div className="flex space-x-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'stopwatch'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Live Precision Stopwatch</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'manual'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Manual Session Entry</span>
          </button>
        </div>

        {/* Stopwatch Card */}
        {activeTab === 'stopwatch' ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto">
            {/* Subject Selector */}
            <div className="max-w-md mx-auto mb-6">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 text-left">
                Select Subject for Timer:
              </label>
              <select
                disabled={timerRunning}
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 disabled:opacity-70"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            {/* Task Description */}
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                disabled={timerRunning}
                placeholder="What topic or goal are you studying?"
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-70"
              />
            </div>

            {/* Big Stopwatch Display */}
            <div className="my-8">
              <div className="inline-block p-8 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 font-mono text-5xl sm:text-6xl font-extrabold tracking-wider">
                {formatSeconds(elapsedActiveSeconds)}
              </div>
              {timerPaused && (
                <p className="mt-3 text-xs font-bold text-amber-600 animate-pulse">
                  Timer Paused ({formatSeconds(elapsedPausedSeconds)} paused time deducted)
                </p>
              )}
            </div>

            {/* Stopwatch Controls */}
            <div className="flex items-center justify-center space-x-4">
              {!timerRunning ? (
                <button
                  onClick={handleStart}
                  className="flex items-center space-x-2 rounded-2xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-500 active:scale-95 transition-all"
                >
                  <Play className="h-5 w-5 fill-white" />
                  <span>Start Studying</span>
                </button>
              ) : (
                <>
                  {!timerPaused ? (
                    <button
                      onClick={handlePause}
                      className="flex items-center space-x-2 rounded-2xl bg-amber-500 px-6 py-3 text-xs font-bold text-white shadow hover:bg-amber-600 transition-colors"
                    >
                      <Pause className="h-4 w-4 fill-white" />
                      <span>Pause Session</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResume}
                      className="flex items-center space-x-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow hover:bg-emerald-500 transition-colors"
                    >
                      <Play className="h-4 w-4 fill-white" />
                      <span>Resume Study</span>
                    </button>
                  )}

                  <button
                    onClick={handleStopAndSave}
                    className="flex items-center space-x-2 rounded-2xl bg-rose-600 px-6 py-3 text-xs font-bold text-white shadow hover:bg-rose-500 transition-colors"
                  >
                    <Square className="h-4 w-4 fill-white" />
                    <span>Complete & Save</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* Manual Entry Form */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Log Completed Study Time</h2>
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={selectedSubjectId}
                  onChange={e => setSelectedSubjectId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date Studied</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={e => setManualDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="10"
                    max="480"
                    value={manualMinutes}
                    onChange={e => setManualMinutes(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task or Topic Studied</label>
                <input
                  type="text"
                  placeholder="e.g. Solved 10 AVL Tree Rotation Problems"
                  value={taskDescription}
                  onChange={e => setTaskDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-navy-900 py-2.5 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors"
              >
                Log Study Record
              </button>
            </form>
          </div>
        )}

        {/* Historical Study Sessions Log */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Verified Study Session History</h2>
            <span className="text-xs text-slate-500 font-mono">{history.length} completed sessions logged</span>
          </div>

          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Task Description</th>
                    <th className="pb-3 text-right">Active Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-mono text-[11px] text-slate-500">
                        {new Date(s.started_at).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 font-bold text-slate-900">{s.subject_name || 'Subject'}</td>
                      <td className="py-3">{s.task_description}</td>
                      <td className="py-3 text-right font-mono font-bold text-brand-700">
                        {formatSeconds(s.duration_seconds)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              No study sessions recorded yet. Launch the stopwatch above to start tracking!
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
