'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { api } from '@/lib/api';
import { Subject, SyllabusUnit } from '@/types';

export default function ProgressPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [units, setUnits] = useState<SyllabusUnit[]>([]);
  const [topicStatuses, setTopicStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const subs = await api.get<Subject[]>('/catalog/subjects?branch=cse');
        if (subs.length > 0) {
          setSubjects(subs);
          setSelectedSubjectId(subs[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSubjects();
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) return;
    async function loadUnits() {
      try {
        const unitData = await api.get<SyllabusUnit[]>(`/catalog/subjects/${selectedSubjectId}/units`);
        setUnits(unitData);

        // Fetch user progress
        const prog = await api.get<any[]>('/progress/syllabus', { subject_id: selectedSubjectId }).catch(() => []);
        const map: Record<string, string> = {};
        prog.forEach(p => {
          map[p.topic_id] = p.status;
        });
        setTopicStatuses(map);
      } catch (err) {
        console.error(err);
      }
    }
    loadUnits();
  }, [selectedSubjectId]);

  const handleStatusChange = async (topicId: string, status: string) => {
    setTopicStatuses(prev => ({ ...prev, [topicId]: status }));
    try {
      await api.put(`/progress/topics/${topicId}`, { status, confidence_level: 4 });
    } catch (err) {
      console.error(err);
    }
  };

  const allTopics = units.flatMap(u => u.topics || []);
  const completedCount = allTopics.filter(t => ['completed', 'revised'].includes(topicStatuses[t.id] || '')).length;
  const completionPercentage = allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Syllabus Mastery & Revision Checklist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Unit-wise syllabus breakdown with deterministic progress calculations and spaced repetition schedules.
          </p>
        </div>

        {/* Subject Switcher & Mastery Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Choose Active Subject:</label>
            <div className="flex flex-wrap gap-2">
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSubjectId === s.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {s.name} ({s.code})
                </button>
              ))}
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-6 shrink-0">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Subject Coverage</p>
              <div className="mt-1 flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-slate-900">{completionPercentage}%</span>
                <span className="text-xs text-slate-500">completed</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{completedCount} of {allTopics.length} topics mastered</p>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-brand-600 flex items-center justify-center font-bold text-xs text-brand-700">
              {completionPercentage}%
            </div>
          </div>
        </div>

        {/* Units & Topics Checklist */}
        <div className="space-y-4">
          {units.map(unit => (
            <div key={unit.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Unit {unit.unit_number}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{unit.title}</h3>
                  <p className="text-xs text-slate-500">{unit.description}</p>
                </div>
                {unit.weightage_marks && (
                  <span className="text-[11px] font-semibold bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                    {unit.weightage_marks} Marks Weightage
                  </span>
                )}
              </div>

              {/* Topics List */}
              <div className="space-y-2.5">
                {unit.topics.map(topic => {
                  const currentStatus = topicStatuses[topic.id] || 'not_started';
                  const isDone = ['completed', 'revised'].includes(currentStatus);

                  return (
                    <div
                      key={topic.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        isDone
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : currentStatus === 'in_progress'
                          ? 'border-amber-200 bg-amber-50/30'
                          : 'border-slate-100 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleStatusChange(topic.id, isDone ? 'not_started' : 'completed')}
                          className="shrink-0"
                        >
                          <CheckCircle2
                            className={`h-5 w-5 ${
                              isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300 hover:text-slate-400'
                            }`}
                          />
                        </button>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {topic.topic_name}
                            </span>
                            {topic.is_important_for_exam && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                                Exam Important
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">Est. study time: {topic.estimated_study_minutes} mins</span>
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={currentStatus}
                        onChange={e => handleStatusChange(topic.id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 self-end sm:self-center"
                      >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="revised">Revised (Spaced Repetition)</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
