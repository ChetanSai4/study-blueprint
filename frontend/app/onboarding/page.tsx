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
  Sparkles,
  Building2,
  Plus,
  Trash2
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

  // Custom subject input
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [customSubjectCode, setCustomSubjectCode] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    displayName: 'BTech Student',
    collegeName: 'Sri Sivani College of Engineering, Srikakulam',
    preferredLanguage: 'en',
    educationLevelCode: 'btech',
    boardOrUniversityCode: 'jntugv',
    branchCode: 'cse',
    academicYear: 1,
    semester: 1,
    regulation: 'R23',
    enrolledSubjectIds: [] as string[],
    customSubjects: [
      { name: 'Linear Algebra & Calculus (M1)', code: '23BS1101' },
      { name: 'Engineering Physics', code: '23BS1102' },
      { name: 'Programming for Problem Solving using C', code: '23ES1101' },
      { name: 'Basic Electrical & Electronics Engineering', code: '23ES1102' },
      { name: 'Communicative English', code: '23HS1101' }
    ],
    availableStudyHoursDaily: 4.0,
    preferredStudyTime: 'evening',
    breakDurationMinutes: 10,
    studyIntervalMinutes: 50,
    goals: [
      'Master university syllabus and score 8.5+ SGPA',
      'Clear 1-1 semester examinations with zero backlogs',
      'Build strong problem solving and programming skills'
    ]
  });

  useEffect(() => {
    async function loadCatalog() {
      try {
        const [levels, b, br, subs] = await Promise.all([
          api.get<EducationLevel[]>('/catalog/education-levels').catch(() => []),
          api.get<BoardOrUniversity[]>('/catalog/boards-universities').catch(() => []),
          api.get<Branch[]>('/catalog/branches').catch(() => []),
          api.get<Subject[]>('/catalog/subjects?education_level=btech&branch=cse').catch(() => [])
        ]);
        if (levels) setEducationLevels(levels);
        if (b) setBoards(b);
        if (br) setBranches(br);
        if (subs) {
          setSubjects(subs);
          if (subs.length > 0) {
            setFormData(prev => ({
              ...prev,
              enrolledSubjectIds: subs.slice(0, 4).map(s => s.id)
            }));
          }
        }
      } catch (err) {
        console.error('Catalog load error', err);
      }
    }
    loadCatalog();
  }, []);

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

  const handleAddCustomSubject = () => {
    if (!customSubjectName.trim()) return;
    setFormData(prev => ({
      ...prev,
      customSubjects: [
        ...prev.customSubjects,
        {
          name: customSubjectName.trim(),
          code: customSubjectCode.trim() || `SUB${prev.customSubjects.length + 1}`
        }
      ]
    }));
    setCustomSubjectName('');
    setCustomSubjectCode('');
  };

  const handleRemoveCustomSubject = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      customSubjects: prev.customSubjects.filter((_, i) => i !== idx)
    }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await api.put('/profile', {
        education_level_code: formData.educationLevelCode,
        board_or_university_code: formData.boardOrUniversityCode,
        college_name: formData.collegeName,
        branch_code: formData.branchCode,
        academic_year: formData.academicYear,
        semester: formData.semester,
        regulation: formData.regulation,
        enrolled_subject_ids: formData.enrolledSubjectIds,
        custom_subjects: formData.customSubjects,
        available_study_hours_daily: formData.availableStudyHoursDaily,
        preferred_study_time: formData.preferredStudyTime,
        break_duration_minutes: formData.breakDurationMinutes,
        study_interval_minutes: formData.studyIntervalMinutes,
        preferred_language: formData.preferredLanguage,
        goals: formData.goals
      });
      router.push('/careers');
    } catch (err) {
      console.error('Onboarding save error', err);
      router.push('/careers');
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
          <p className="text-xs text-slate-500 mt-1">Configure your university, affiliated college, subjects, and study schedule.</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Step {step} of 5</span>
            <span>
              {step === 1 && 'Basic Profile & College'}
              {step === 2 && 'Education Level'}
              {step === 3 && 'Affiliation, Semester & Subjects'}
              {step === 4 && 'Study Schedule & Habits'}
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
                <p className="text-xs text-slate-500 mt-1">Tell us your name and college to personalize your portal.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="e.g. Chetan Sai"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your College Name (Affiliated Institution)
                </label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="e.g. Sri Sivani College of Engineering, Srikakulam"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  You can type your exact engineering, polytechnic, or intermediate college.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Language for Video Resources</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
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
                <p className="text-xs text-slate-500 mt-1">
                  Select your university, semester (e.g. 1-1), and enter your subjects manually or from the catalog.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Affiliated University / Board</label>
                  <select
                    value={formData.boardOrUniversityCode}
                    onChange={e => setFormData({ ...formData, boardOrUniversityCode: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
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
                    <option value="ts_bie">TS BIE — Intermediate</option>
                    <option value="ap_bie">AP BIE — Intermediate</option>
                    <option value="cbse">CBSE — Central Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Branch / Specialization</label>
                  <select
                    value={formData.branchCode}
                    onChange={e => handleBranchChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
                  >
                    <option value="cse">Computer Science & Engineering (CSE)</option>
                    <option value="aiml">AI & Machine Learning (AIML)</option>
                    <option value="ds">Data Science (DS)</option>
                    <option value="ece">Electronics & Communication (ECE)</option>
                    <option value="eee">Electrical & Electronics (EEE)</option>
                    <option value="mech">Mechanical Engineering (MECH)</option>
                    <option value="civil">Civil Engineering (CIVIL)</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="cme">Diploma Computer Engineering (CME)</option>
                    <option value="mpc">Intermediate MPC</option>
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Regulation Scheme</label>
                  <input
                    type="text"
                    value={formData.regulation}
                    onChange={e => setFormData({ ...formData, regulation: e.target.value })}
                    placeholder="e.g. R23, R20, R22"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Enter Custom Subjects */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Your Semester Subjects (Add / Edit Any Subject)
                  </label>
                  <span className="text-[11px] text-brand-600 font-semibold">
                    {formData.customSubjects.length} subjects added
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={customSubjectName}
                    onChange={e => setCustomSubjectName(e.target.value)}
                    placeholder="Subject name (e.g. Linear Algebra & Calculus)"
                    className="w-full sm:flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
                  />
                  <input
                    type="text"
                    value={customSubjectCode}
                    onChange={e => setCustomSubjectCode(e.target.value)}
                    placeholder="Code (optional, e.g. 23BS1101)"
                    className="w-full sm:w-40 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSubject}
                    disabled={!customSubjectName.trim()}
                    className="w-full sm:w-auto flex items-center justify-center space-x-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-500 disabled:opacity-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Display Custom Subjects List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {formData.customSubjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{sub.name}</span>
                        {sub.code && <span className="ml-1.5 font-mono text-slate-400 text-[10px]">({sub.code})</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSubject(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
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
