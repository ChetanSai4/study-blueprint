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
  LogOut,
  Building2,
  Plus,
  Trash2,
  GraduationCap
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

  // Editable user fields
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  // Custom subject input
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [u, p] = await Promise.all([
          api.get<UserType>('/auth/me').catch(() => null),
          api.get<StudentProfile>('/profile').catch(() => null)
        ]);
        if (u) {
          setUser(u);
          setDisplayName(u.display_name || 'BTech Student');
          setEmail(u.email || 'student@studyblueprint.in');
        }
        if (p) {
          setProfile(p);
        }
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
      // 1. Update user identity if changed
      if (displayName !== user?.display_name || email !== user?.email) {
        const updatedUser = await api.put<UserType>('/auth/user', {
          display_name: displayName,
          email: email
        });
        setUser(updatedUser);
      }

      // 2. Update student profile
      const updatedProfile = await api.put<StudentProfile>('/profile', profile);
      setProfile(updatedProfile);
      setStatusMessage('Academic profile, college details, and study preferences saved successfully.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to update settings. Please check your network.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCustomSubject = () => {
    if (!newSubName.trim() || !profile) return;
    const currentCustom = profile.custom_subjects || [];
    const updated = [
      ...currentCustom,
      {
        name: newSubName.trim(),
        code: newSubCode.trim() || `SUB${currentCustom.length + 1}`
      }
    ];
    setProfile({ ...profile, custom_subjects: updated });
    setNewSubName('');
    setNewSubCode('');
  };

  const handleRemoveCustomSubject = (index: number) => {
    if (!profile) return;
    const currentCustom = profile.custom_subjects || [];
    const updated = currentCustom.filter((_, i) => i !== index);
    setProfile({ ...profile, custom_subjects: updated });
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Profile & Academic Settings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure your university, affiliated college, subjects, daily study hours, and examination preferences.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="self-start sm:self-auto flex items-center space-x-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {statusMessage && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {profile && (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Identity Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <User className="h-4 w-4 text-brand-600" />
                <span>Student Identity & Verification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Chetan Sai"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. chetansai@gmail.com"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Academic Institution & Hierarchy */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-brand-600" />
                <span>College & University Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your College Name (Affiliated Institution)
                  </label>
                  <input
                    type="text"
                    value={profile.college_name || ''}
                    onChange={(e) => setProfile({ ...profile, college_name: e.target.value })}
                    placeholder="e.g. Sri Sivani College of Engineering, Srikakulam"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter your specific college name (e.g. Sri Sivani College of Engineering, Gayatri Vidya Parishad, etc.)
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Affiliated Board or University</label>
                  <select
                    value={profile.board_or_university_code || 'jntugv'}
                    onChange={(e) => setProfile({ ...profile, board_or_university_code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white"
                  >
                    <option value="jntugv">JNTU-GV — Gurajada Vizianagaram</option>
                    <option value="jntuk">JNTUK — Kakinada</option>
                    <option value="jntuh">JNTUH — Hyderabad</option>
                    <option value="jntua">JNTUA — Anantapur</option>
                    <option value="au">Andhra University (AU) — Visakhapatnam</option>
                    <option value="osmania">Osmania University (OU) — Hyderabad</option>
                    <option value="vtu">VTU — Visvesvaraya Technological University</option>
                    <option value="anna">Anna University — Chennai</option>
                    <option value="aktu">AKTU — Dr. A.P.J. Abdul Kalam Technical University</option>
                    <option value="sppu">SPPU — Savitribai Phule Pune University</option>
                    <option value="autonomous">Autonomous / Deemed Engineering College</option>
                    <option value="sbtet">SBTET — State Board of Technical Education</option>
                    <option value="ts_bie">TS BIE — Intermediate Board</option>
                    <option value="ap_bie">AP BIE — Intermediate Board</option>
                    <option value="cbse">CBSE — Central Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Branch / Specialization</label>
                  <select
                    value={profile.branch_code || 'cse'}
                    onChange={(e) => setProfile({ ...profile, branch_code: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white"
                  >
                    <option value="cse">Computer Science & Engineering (CSE)</option>
                    <option value="aiml">AI & Machine Learning (AIML)</option>
                    <option value="ds">Data Science (DS)</option>
                    <option value="ece">Electronics & Communication Engineering (ECE)</option>
                    <option value="eee">Electrical & Electronics Engineering (EEE)</option>
                    <option value="mech">Mechanical Engineering (MECH)</option>
                    <option value="civil">Civil Engineering (CIVIL)</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="cme">Diploma Computer Engineering (CME)</option>
                    <option value="mpc">Intermediate MPC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Academic Year & Semester</label>
                  <select
                    value={`${profile.academic_year || 1}-${profile.semester || 1}`}
                    onChange={(e) => {
                      const [y, s] = e.target.value.split('-').map(Number);
                      setProfile({ ...profile, academic_year: y, semester: s });
                    }}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white"
                  >
                    <option value="1-1">1st Year - 1st Semester (1-1)</option>
                    <option value="1-2">1st Year - 2nd Semester (1-2)</option>
                    <option value="2-1">2nd Year - 1st Semester (2-1)</option>
                    <option value="2-2">2nd Year - 2nd Semester (2-2)</option>
                    <option value="3-1">3rd Year - 1st Semester (3-1)</option>
                    <option value="3-2">3rd Year - 2nd Semester (3-2)</option>
                    <option value="4-1">4th Year - 1st Semester (4-1)</option>
                    <option value="4-2">4th Year - 2nd Semester (4-2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Academic Regulation Scheme</label>
                  <input
                    type="text"
                    value={profile.regulation || 'R23'}
                    onChange={(e) => setProfile({ ...profile, regulation: e.target.value })}
                    placeholder="e.g. R23, R20, R22"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Custom Subjects Management */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                    <span>Your Semester Subjects (Add Custom Subjects)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Don&apos;t worry if you don&apos;t know the official code — enter any subject taught in your 1-1 or current semester.
                  </p>
                </div>
              </div>

              {/* Add Custom Subject Form */}
              <div className="p-3.5 rounded-xl border border-dashed border-brand-300 bg-brand-50/40 flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="Subject name (e.g. Linear Algebra & Calculus)"
                  className="w-full sm:flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
                />
                <input
                  type="text"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  placeholder="Code (optional, e.g. 23BS1101)"
                  className="w-full sm:w-44 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSubject}
                  disabled={!newSubName.trim()}
                  className="w-full sm:w-auto flex items-center justify-center space-x-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-500 disabled:opacity-50 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Subject</span>
                </button>
              </div>

              {/* List of Custom Subjects */}
              <div className="space-y-2">
                {profile.custom_subjects && profile.custom_subjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile.custom_subjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{sub.name}</span>
                          {sub.code && <span className="ml-2 font-mono text-slate-400 text-[10px]">({sub.code})</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSubject(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Remove subject"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    No custom subjects added yet. Type your subject name above to add it to your daily timetable.
                  </p>
                )}
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
                      {profile.available_study_hours_daily} Hours ({Math.round(profile.available_study_hours_daily * 60)} mins)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={profile.available_study_hours_daily}
                    onChange={(e) =>
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
                      onChange={(e) => setProfile({ ...profile, preferred_study_time: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 capitalize bg-white"
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
                      onChange={(e) => setProfile({ ...profile, break_duration_minutes: Number(e.target.value) })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 rounded-xl bg-navy-900 px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-navy-800 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save All Academic Settings'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}
