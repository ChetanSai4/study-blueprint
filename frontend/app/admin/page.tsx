'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import {
  ShieldAlert,
  Users,
  BookOpen,
  Youtube,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { api } from '@/lib/api';
import { Subject, User } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'add_video' | 'add_resource' | 'audit'>('overview');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // New Video Form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [channelName, setChannelName] = useState('');
  const [videoSubjectId, setVideoSubjectId] = useState('');
  const [videoLang, setVideoLang] = useState('en');

  // New Resource Form
  const [resTitle, setResTitle] = useState('');
  const [resType, setResType] = useState('model_paper');
  const [resSubjectId, setResSubjectId] = useState('');
  const [resFileUrl, setResFileUrl] = useState('');

  useEffect(() => {
    async function loadAdminData() {
      try {
        const u = await api.get<User>('/auth/me');
        setUser(u);
        if (u.role !== 'admin') {
          // Denied
          setStatusMessage('Access Denied: Administrative role required.');
          return;
        }

        const [ov, subs, logs] = await Promise.all([
          api.get('/admin/overview').catch(() => null),
          api.get<Subject[]>('/catalog/subjects?branch=cse').catch(() => []),
          api.get<any[]>('/admin/audit-logs').catch(() => [])
        ]);

        if (ov) setStats(ov);
        if (subs) {
          setSubjects(subs);
          if (subs.length > 0) {
            setVideoSubjectId(subs[0].id);
            setResSubjectId(subs[0].id);
          }
        }
        if (logs) setAuditLogs(logs);
      } catch (err: any) {
        setStatusMessage(err.message || 'Unauthorized');
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      await api.post('/admin/videos', {
        title: videoTitle,
        youtube_url: videoUrl,
        channel_name: channelName,
        education_level_code: 'btech',
        branch_code: 'cse',
        subject_id: videoSubjectId,
        language: videoLang,
        difficulty_level: 'intermediate'
      });
      setStatusMessage('Educational YouTube video published successfully.');
      setVideoTitle('');
      setVideoUrl('');
      setChannelName('');
    } catch (err: any) {
      setStatusMessage(err.message || 'Failed to add video.');
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      await api.post('/admin/resources', {
        title: resTitle,
        resource_type: resType,
        education_level_code: 'btech',
        board_or_university_code: 'jntuh',
        branch_code: 'cse',
        semester: 1,
        regulation: 'R22',
        subject_id: resSubjectId,
        file_url: resFileUrl || 'https://raw.githubusercontent.com/chetansai/study-blueprint-assets/main/sample_paper.pdf',
        file_size_bytes: 840000,
        source_contributor: 'Admin Curation Cell'
      });
      setStatusMessage('Academic resource published and indexed successfully.');
      setResTitle('');
      setResFileUrl('');
    } catch (err: any) {
      setStatusMessage(err.message || 'Failed to add resource.');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <AppShell>
        <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center max-w-lg mx-auto my-12">
          <ShieldAlert className="h-12 w-12 text-rose-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Administrative Access Required</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            This area is restricted to authorized academic moderators and administrators. Please log in using the Admin persona to manage videos and documents.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="mt-6 px-5 py-2.5 rounded-xl bg-navy-900 text-xs font-bold text-white shadow"
          >
            Switch to Admin Persona
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                Admin Control Room
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Platform Moderation & Content Management
            </h1>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3.5 text-xs font-semibold text-brand-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex space-x-2 border-b border-slate-200 pb-3">
          {[
            { id: 'overview', label: 'Platform Stats' },
            { id: 'add_video', label: 'Curate YouTube Video' },
            { id: 'add_resource', label: 'Upload Academic Material' },
            { id: 'audit', label: 'Security Audit Logs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Metrics */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Registered Users</span>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.total_users || 0}</p>
              <p className="text-[11px] text-slate-400 mt-1">Verified Google identity accounts</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Academic Resources</span>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.total_resources || 0}</p>
              <p className="text-[11px] text-slate-400 mt-1">Syllabi, PYQs & model papers</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Curated YouTube Videos</span>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.total_videos || 0}</p>
              <p className="text-[11px] text-slate-400 mt-1">Verified topic lectures</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Total Study Time Tracked</span>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stats?.total_study_hours || 0} hrs</p>
              <p className="text-[11px] text-slate-400 mt-1">{stats?.total_study_sessions || 0} completed stopwatch sessions</p>
            </div>
          </div>
        )}

        {/* Tab 2: Curate Video */}
        {activeTab === 'add_video' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Youtube className="h-4 w-4 text-rose-600" />
              <span>Add Verified Educational YouTube Video</span>
            </h2>

            <form onSubmit={handleAddVideo} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">YouTube Video URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Traversals (BFS and DFS) with Code Walkthrough"
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Educator / Channel Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abdul Bari, Neso Academy"
                    value={channelName}
                    onChange={e => setChannelName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={videoLang}
                    onChange={e => setVideoLang(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    <option value="en">English</option>
                    <option value="te">Telugu</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Map to Subject</label>
                <select
                  value={videoSubjectId}
                  onChange={e => setVideoSubjectId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-navy-900 py-2.5 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors"
              >
                Publish Verified Video Record
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Upload Resource */}
        {activeTab === 'add_resource' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-brand-600" />
              <span>Index Academic Model Paper or Syllabus Document</span>
            </h2>

            <form onSubmit={handleAddResource} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JNTUH R22 Data Structures End-Sem Model Paper"
                  value={resTitle}
                  onChange={e => setResTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resource Type</label>
                  <select
                    value={resType}
                    onChange={e => setResType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    <option value="model_paper">Model Question Paper</option>
                    <option value="previous_paper">Previous Year Paper (PYQ)</option>
                    <option value="syllabus">Official Syllabus Copy</option>
                    <option value="notes">Faculty Lecture Notes</option>
                    <option value="formula_sheet">Formula Cheat Sheet</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={resSubjectId}
                    onChange={e => setResSubjectId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">File Storage URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={resFileUrl}
                  onChange={e => setResFileUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-500 transition-colors"
              >
                Index & Publish Resource
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Security Audit Log Trajectory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3">Administrator</th>
                    <th className="pb-3">Action</th>
                    <th className="pb-3">Target Entity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-2.5 font-mono text-[11px] text-slate-500">
                        {new Date(log.timestamp).toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 font-semibold text-slate-800">{log.admin_email}</td>
                      <td className="py-2.5 uppercase font-bold text-brand-700 text-[10px]">{log.action}</td>
                      <td className="py-2.5 font-mono text-slate-500">{log.entity_type} ({log.entity_id || 'N/A'})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
