'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import {
  User,
  Save,
  CheckCircle2,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { api } from '@/lib/api';
import { StudentProfile, User as UserType } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [u, p] = await Promise.all([
          api.get<UserType>('/auth/me').catch(() => null),
          api.get<StudentProfile>('/profile').catch(() => null)
        ]);
        if (u) setUser(u);
        if (p) setProfile(p);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setStatusMessage(null);
    try {
      const updated = await api.put<StudentProfile>('/profile', profile);
      setProfile(updated);
      setStatusMessage('Academic profile and study preferences saved successfully.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('study_blueprint_token');
    router.push('/login');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Profile & Academic Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your university details, branch specialization, daily study budgets, and goals.
          </p>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3.5 text-xs font-semibold text-brand-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {profile && (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Identity Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <User className="h-4 w-4 text-brand-600" />
                <span>Verified Google Identity</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Display Name</label>
                  <input
                    type="text"
                    disabled
                    value={user?.display_name || 'Engineering Student'}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Verified Email</label>
                  <input
                    type="text"
                    disabled
                    value={user?.email || 'student@studyblueprint.in'}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Academic Hierarchy */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-brand-600" />
                <span>Academic Hierarchy Configuration</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Education Level</label>
                  <select
                    value={profile.education_level_code}
                    onChange={e => setProfile({ ...profile, education_level_code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    <option value="btech">BTech / BE Engineering</option>
                    <option value="diploma">Diploma / Polytechnic</option>
                    <option value="intermediate">Intermediate (+2)</option>
                    <option value="school">Secondary School (Class 6-10)</option>
                    <option value="competitive">Competitive Examinations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Board / University</label>
                  <select
                    value={profile.board_or_university_code || 'jntuh'}
                    onChange={e => setProfile({ ...profile, board_or_university_code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    <option value="jntuh">JNTUH — Jawaharlal Nehru Tech University</option>
                    <option value="jntuk">JNTUK — Kakinada</option>
                    <option value="osmania">Osmania University</option>
                    <option value="sbtet">SBTET Polytechnic</option>
                    <option value="ts_bie">TS BIE Intermediate</option>
                    <option value="cbse">CBSE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Branch / Stream</label>
                  <select
                    value={profile.branch_code || 'cse'}
                    onChange={e => setProfile({ ...profile, branch_code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  >
                    <option value="cse">Computer Science & Engineering (CSE)</option>
                    <option value="aiml">AI & Machine Learning (AIML)</option>
                    <option value="ece">Electronics & Communication (ECE)</option>
                    <option value="cme">Diploma Computer Engineering (CME)</option>
                    <option value="mpc">Intermediate MPC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Academic Regulation</label>
                  <input
                    type="text"
                    value={profile.regulation || 'R22'}
                    onChange={e => setProfile({ ...profile, regulation: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Study Habit Preferences */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-brand-600" />
                <span>Daily Study Availability</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Daily Study Hours Target</span>
                    <span className="font-bold text-brand-600">
                      {profile.available_study_hours_daily} Hours ({profile.available_study_hours_daily * 60} mins)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={profile.available_study_hours_daily}
                    onChange={e =>
                      setProfile({ ...profile, available_study_hours_daily: parseFloat(e.target.value) })
                    }
                    className="w-full accent-brand-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Preferred Time of Day</label>
                    <select
                      value={profile.preferred_study_time}
                      onChange={e => setProfile({ ...profile, preferred_study_time: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 capitalize"
                    >
                      <option value="early_morning">Early Morning</option>
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                      <option value="late_night">Late Night</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Break Duration (Minutes)</label>
                    <input
                      type="number"
                      min="5"
                      max="30"
                      value={profile.break_duration_minutes}
                      onChange={e => setProfile({ ...profile, break_duration_minutes: Number(e.target.value) })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center space-x-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out of Account</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 rounded-xl bg-navy-900 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-navy-800 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save Academic Settings'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}
