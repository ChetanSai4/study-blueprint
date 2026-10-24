'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { api } from '@/lib/api';
import { EducationLevel, BoardOrUniversity, Branch, Subject } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Catalog state
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [boards, setBoards] = useState<BoardOrUniversity[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    displayName: 'Engineering Student',
    preferredLanguage: 'en',
    educationLevelCode: 'btech',
    boardOrUniversityCode: 'jntuh',
    branchCode: 'cse',
    academicYear: 2,
    semester: 1,
    regulation: 'R22',
    enrolledSubjectIds: [] as string[],
    availableStudyHoursDaily: 4.0,
    preferredStudyTime: 'evening',
    breakDurationMinutes: 10,
    studyIntervalMinutes: 50,
    goals: ['Complete syllabus with high conceptual clarity', 'Ace JNTUH Semester Examinations', 'Develop Placement-Ready Full Stack Skills']
  });

  useEffect(() => {
    async function loadCatalog() {
      try {
        const levels = await api.get<EducationLevel[]>('/catalog/education-levels');
        setEducationLevels(levels);
        const b = await api.get<BoardOrUniversity[]>('/catalog/boards-universities');
        setBoards(b);
        const br = await api.get<Branch[]>('/catalog/branches');
        setBranches(br);
        const subs = await api.get<Subject[]>('/catalog/subjects?education_level=btech&branch=cse');
        setSubjects(subs);
        // Default enrolled subjects
        if (subs.length > 0) {
          setFormData(prev => ({
            ...prev,
            enrolledSubjectIds: subs.slice(0, 4).map(s => s.id)
          }));
        }
      } catch (err) {
        console.error('Catalog load error', err);
      }
    }
    loadCatalog();
  }, []);

  // Update subjects when level or branch changes
  const handleBranchChange = async (brCode: string) => {
    setFormData(prev => ({ ...prev, branchCode: brCode }));
    try {
      const subs = await api.get<Subject[]>(`/catalog/subjects?education_level=${formData.educationLevelCode}&branch=${brCode}`);
      setSubjects(subs);
      setFormData(prev => ({ ...prev, enrolledSubjectIds: subs.map(s => s.id) }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await api.put('/profile', {
        education_level_code: formData.educationLevelCode,
        board_or_university_code: formData.boardOrUniversityCode,
        branch_code: formData.branchCode,
        academic_year: formData.academicYear,
        semester: formData.semester,
        regulation: formData.regulation,
        enrolled_subject_ids: formData.enrolledSubjectIds,
        available_study_hours_daily: formData.availableStudyHoursDaily,
        preferred_study_time: formData.preferredStudyTime,
        break_duration_minutes: formData.breakDurationMinutes,
        study_interval_minutes: formData.studyIntervalMinutes,
        preferred_language: formData.preferredLanguage,
        goals: formData.goals
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Onboarding save error', err);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubject = (id: string) => {
    setFormData(prev => {
      const exists = prev.enrolledSubjectIds.includes(id);
      return {
        ...prev,
        enrolledSubjectIds: exists
          ? prev.enrolledSubjectIds.filter(x => x !== id)
          : [...prev.enrolledSubjectIds, id]
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md mb-3">
            <Compass className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Blueprint Setup</h1>
          <p className="text-xs text-slate-500 mt-1">Configure your curriculum, study hours, and examination priorities.</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Step {step} of 5</span>
            <span>
              {step === 1 && 'Basic Profile'}
              {step === 2 && 'Education Level'}
              {step === 3 && 'Academic Details & Subjects'}
              {step === 4 && 'Study Schedule & Breaks'}
              {step === 5 && 'Academic Goals'}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Welcome to Study Blueprint!</h2>
                <p className="text-xs text-slate-500 mt-1">Let&apos;s personalize your academic workspace.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Language for Video Resources</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="en">English (Default)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="hi">Hindi (हिंदी)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">What is your current education level?</h2>
                <p className="text-xs text-slate-500 mt-1">This configures your academic catalog taxonomy.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationLevels.map(lvl => (
                  <button
                    key={lvl.code}
                    type="button"
                    onClick={() => setFormData({ ...formData, educationLevelCode: lvl.code })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.educationLevelCode === lvl.code
                        ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{lvl.title}</span>
                      {formData.educationLevelCode === lvl.code && (
                        <CheckCircle2 className="h-4 w-4 text-brand-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{lvl.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Academic Hierarchy & Enrolled Subjects</h2>
                <p className="text-xs text-slate-500 mt-1">Select your board/university, branch, and semester.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Board or University</label>
                  <select
                    value={formData.boardOrUniversityCode}
                    onChange={e => setFormData({ ...formData, boardOrUniversityCode: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    {boards
                      .filter(b => b.education_level_code === formData.educationLevelCode)
                      .map(b => (
                        <option key={b.code} value={b.code}>{b.short_name} — {b.name}</option>
                      ))}
                    <option value="jntuh">JNTUH — Jawaharlal Nehru Tech University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Branch / Specialization</label>
                  <select
                    value={formData.branchCode}
                    onChange={e => handleBranchChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    {branches
                      .filter(br => br.education_level_code === formData.educationLevelCode)
                      .map(br => (
                        <option key={br.code} value={br.code}>{br.name} ({br.short_name})</option>
                      ))}
                    <option value="cse">Computer Science & Engineering (CSE)</option>
                    <option value="aiml">AI & Machine Learning (AIML)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Academic Year & Semester</label>
                  <select
                    value={`${formData.academicYear}-${formData.semester}`}
                    onChange={e => {
                      const [y, s] = e.target.value.split('-').map(Number);
                      setFormData({ ...formData, academicYear: y, semester: s });
                    }}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    <option value="1-1">Year 1 - Semester 1 (1-1)</option>
                    <option value="1-2">Year 1 - Semester 2 (1-2)</option>
                    <option value="2-1">Year 2 - Semester 1 (2-1)</option>
                    <option value="2-2">Year 2 - Semester 2 (2-2)</option>
                    <option value="3-1">Year 3 - Semester 1 (3-1)</option>
                    <option value="3-2">Year 3 - Semester 2 (3-2)</option>
                    <option value="4-1">Year 4 - Semester 1 (4-1)</option>
                    <option value="4-2">Year 4 - Semester 2 (4-2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Regulation Scheme</label>
                  <select
                    value={formData.regulation}
                    onChange={e => setFormData({ ...formData, regulation: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    <option value="R22">R22 (Current Regulation)</option>
                    <option value="R18">R18 Regulation</option>
                    <option value="CBCS">CBCS Scheme</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Select Your Enrolled Subjects</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {subjects.map(sub => {
                    const isSelected = formData.enrolledSubjectIds.includes(sub.id);
                    return (
                      <div
                        key={sub.id}
                        onClick={() => toggleSubject(sub.id)}
                        className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                          isSelected ? 'border-brand-500 bg-brand-50/50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-slate-900">{sub.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{sub.code}</span>
                        </div>
                        <CheckCircle2 className={`h-4 w-4 ${isSelected ? 'text-brand-600' : 'text-slate-300'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Study Availability & Habits</h2>
                <p className="text-xs text-slate-500 mt-1">We use this to construct your deterministic 240-minute timetable.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Daily Study Hours Budget</label>
                  <span className="text-sm font-bold text-brand-600">{formData.availableStudyHoursDaily} Hours ({formData.availableStudyHoursDaily * 60} mins)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={formData.availableStudyHoursDaily}
                  onChange={e => setFormData({ ...formData, availableStudyHoursDaily: parseFloat(e.target.value) })}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-1">Recommended: 4.0 hours for engineering semester preparation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Study Block Duration</label>
                  <select
                    value={formData.studyIntervalMinutes}
                    onChange={e => setFormData({ ...formData, studyIntervalMinutes: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    <option value={45}>45 Minutes Focus</option>
                    <option value={50}>50 Minutes (Recommended)</option>
                    <option value={60}>60 Minutes Deep Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rest & Break Duration</label>
                  <select
                    value={formData.breakDurationMinutes}
                    onChange={e => setFormData({ ...formData, breakDurationMinutes: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  >
                    <option value={5}>5 Minutes Quick Break</option>
                    <option value={10}>10 Minutes (Standard)</option>
                    <option value={15}>15 Minutes Refresh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Study Time Window</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {['early_morning', 'morning', 'evening', 'late_night'].map(timeSlot => (
                    <button
                      key={timeSlot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredStudyTime: timeSlot })}
                      className={`p-2.5 rounded-lg border capitalize ${
                        formData.preferredStudyTime === timeSlot
                          ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {timeSlot.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Primary Academic Goals</h2>
                <p className="text-xs text-slate-500 mt-1">Select the outcomes you want to achieve this semester.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  'Master university syllabus and score 8.5+ SGPA',
                  'Clear Mid-Term & Semester Examinations with zero backlogs',
                  'Build real-world projects to prepare for campus placements',
                  'Prepare for competitive engineering exams (GATE / ECET)',
                  'Follow a structured 4-hour daily revision timetable'
                ].map((goal, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center space-x-2 rounded-xl bg-navy-900 px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-navy-800 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading}
                className="flex items-center space-x-2 rounded-xl bg-brand-600 px-7 py-2.5 text-xs font-semibold text-white shadow hover:bg-brand-500 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Finalizing Setup...' : 'Launch Dashboard'}</span>
                <Sparkles className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
