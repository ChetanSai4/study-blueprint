'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  CheckSquare,
  Plus,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { api } from '@/lib/api';
import { Task, Subject } from '@/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(45);

  const fetchTasks = async () => {
    try {
      const [tData, sData] = await Promise.all([
        api.get<Task[]>('/tasks'),
        api.get<Subject[]>('/catalog/subjects?branch=cse').catch(() => [])
      ]);
      setTasks(tData);
      setSubjects(sData);
      if (sData.length > 0 && !subjectId) setSubjectId(sData[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.post<Task>('/tasks', {
        title,
        description: description || undefined,
        subject_id: subjectId || undefined,
        priority,
        due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
        estimated_minutes: estimatedMinutes,
        task_type: 'study'
      });
      setTasks(prev => [created, ...prev]);
      setShowModal(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const updated = await api.put<Task>(`/tasks/${task.id}`, { status: nextStatus });
      setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const priorityColors = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-brand-50 text-brand-700',
    high: 'bg-amber-50 text-amber-700',
    urgent: 'bg-rose-50 text-rose-700'
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Academic Task & Assignment Planner
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Organize homework, lab manuals, revision milestones, and exam preparation deadlines.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-1.5 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Task</span>
          </button>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {loading ? (
            <div className="text-center py-12 text-xs text-slate-500">Loading tasks...</div>
          ) : tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map(t => {
                const isCompleted = t.status === 'completed';
                return (
                  <div
                    key={t.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      isCompleted ? 'border-slate-100 bg-slate-50/60' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(t)}
                        className="mt-0.5 shrink-0"
                      >
                        <CheckCircle2
                          className={`h-5 w-5 ${
                            isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300 hover:text-slate-400'
                          }`}
                        />
                      </button>

                      <div>
                        <h3 className={`text-xs font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {t.title}
                        </h3>
                        {t.description && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{t.description}</p>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
                          {t.subject_name && (
                            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              {t.subject_name}
                            </span>
                          )}
                          <span className={`font-bold uppercase px-2 py-0.5 rounded ${priorityColors[t.priority]}`}>
                            {t.priority}
                          </span>
                          {t.due_date && (
                            <span className="flex items-center space-x-1 text-slate-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(t.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1 text-slate-400">
                            <Clock className="h-3 w-3" />
                            <span>{t.estimated_minutes}m</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-600 self-end sm:self-center transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-500">
              No tasks found. Click &quot;Create New Task&quot; above to schedule your next study objective!
            </div>
          )}
        </div>

        {/* Modal for creating task */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-base font-bold text-slate-900 mb-4">Create Study Task</h2>
              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Complete Unit 2 Assignment on Stacks"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Associated Subject</label>
                  <select
                    value={subjectId}
                    onChange={e => setSubjectId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={e => setPriority(e.target.value as any)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-navy-900 text-white font-bold hover:bg-navy-800"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
