'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Compass,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  FolderGit2,
  Award
} from 'lucide-react';
import { api } from '@/lib/api';
import { CareerRole } from '@/types';

// Supported Stages for Indian students
const EDUCATION_STAGES = [
  { id: 'class_9', label: 'Class 9 (Secondary School)', desc: 'Master NCERT maths & science, Olympiads & 10th stream decision' },
  { id: 'class_10', label: 'Class 10 (Secondary Board)', desc: 'Board exam excellence, NTSE preparation & stream selection' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', desc: 'Pre-engineering & medical entrance examination prep (JEE / NEET)' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Practical hands-on technical foundation & ECET lateral entry' },
  { id: 'btech_1', label: 'BTech 1st Year (1-1 / 1-2)', desc: 'Core math, physics & C programming fundamentals' }
];

export default function CareersPage() {
  const [selectedStage, setSelectedStage] = useState('class_9');
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [selectedStreamTab, setSelectedStreamTab] = useState<'mpc' | 'bipc' | 'mec' | 'arts' | 'diploma'>('mpc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read stage from localStorage if set
    const saved = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    if (saved) {
      setSelectedStage(saved);
    }

    async function loadCareers() {
      try {
        const rList = await api.get<CareerRole[]>('/careers/roles');
        if (rList) {
          setRoles(rList);
          const activeS = saved || 'class_9';
          if (activeS === 'class_9' || activeS === 'class_10') {
            const class9Role = rList.find(r => r.role_code === 'class9_foundation');
            setSelectedRole(class9Role || rList[0]);
          } else {
            const btechRole = rList.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
            setSelectedRole(btechRole || rList[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('study_blueprint_stage', stageId);
    }
    if (stageId === 'class_9' || stageId === 'class_10') {
      const match = roles.find(r => r.role_code === 'class9_foundation');
      if (match) setSelectedRole(match);
    } else {
      const match = roles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
      if (match) setSelectedRole(match);
    }
  };

  // Filter roles relevant to the chosen stage
  const visibleRoles = roles.filter(r => {
    if (selectedStage === 'class_9' || selectedStage === 'class_10') {
      return r.role_code === 'class9_foundation';
    }
    return r.role_code !== 'class9_foundation';
  });

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-center space-x-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            <span>Dedicated Section 1: Career Roadmaps</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic & Professional Career Roadmaps
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Select your current academic class or stage to view your step-by-step milestone pathway, stream guidance, and future career targets.
          </p>
        </div>

        {/* STEP 1: Select Current Educational Stage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">1</span>
            <h2 className="text-sm font-bold text-slate-900">Step 1: Select Your Current Academic Class / Stage</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EDUCATION_STAGES.map(stage => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/70 ring-2 ring-brand-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{stage.label}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">{stage.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SPECIALIZED CLASS 9 / 10 STREAM EXPLORER */}
        {(selectedStage === 'class_9' || selectedStage === 'class_10') ? (
          <div className="space-y-6">
            {/* Stream Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Decision Blueprint</span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Which Stream Should You Choose After 10th? (Interactive Stream Guidance)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click each higher-secondary stream to inspect the curriculum, required entrance examinations, and future degree outcomes.
                </p>
              </div>

              {/* Stream Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                {[
                  { id: 'mpc', label: '1. MPC (Maths, Physics, Chem)', badge: 'Engineering & Tech' },
                  { id: 'bipc', label: '2. BiPC (Biology, Physics, Chem)', badge: 'Medicine & Health' },
                  { id: 'mec', label: '3. MEC / CEC (Commerce & Economics)', badge: 'Finance & CA' },
                  { id: 'arts', label: '4. Arts / Humanities', badge: 'Civil Services & Law' },
                  { id: 'diploma', label: '5. Polytechnic Diploma', badge: 'Practical Engineering' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedStreamTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedStreamTab === tab.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Stream Details Card */}
              {selectedStreamTab === 'mpc' && (
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-950">MPC: Mathematics, Physics, and Chemistry</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Pre-Engineering Stream</span>
                  </div>
                  <p className="text-xs text-blue-900/80 leading-relaxed">
                    MPC is the premier pathway for students targeting Indian Institutes of Technology (IITs), National Institutes of Technology (NITs), BITS Pilani, Defense Services (NDA), and aerospace/software careers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-blue-200">
                      <span className="font-bold text-slate-900 block mb-1">Key Entrance Exams</span>
                      <span className="text-slate-600 text-[11px]">JEE Main, JEE Advanced, BITSAT, State EAPCET/EAMCET, NDA</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-200">
                      <span className="font-bold text-slate-900 block mb-1">Degrees & Courses</span>
                      <span className="text-slate-600 text-[11px]">B.Tech, B.E., B.Arch, BS-MS (IISER/IISc), Commercial Pilot</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-blue-200">
                      <span className="font-bold text-slate-900 block mb-1">Career Destinations</span>
                      <span className="text-slate-600 text-[11px]">Software/AI Engineer, Aerospace Scientist, Indian Air Force Pilot</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedStreamTab === 'bipc' && (
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-950">BiPC: Biology, Physics, and Chemistry</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Medical & Health Sciences</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed">
                    BiPC is tailored for students passionate about human physiology, molecular genetics, surgery, healthcare, veterinary medicine, and agricultural biotechnology.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">Key Entrance Exams</span>
                      <span className="text-slate-600 text-[11px]">NEET-UG, AIIMS, State Paramedical, ICAR AIEEA</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">Degrees & Courses</span>
                      <span className="text-slate-600 text-[11px]">MBBS, BDS, BAMS, B.Pharm, B.Sc Nursing, B.Sc Agriculture</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-slate-900 block mb-1">Career Destinations</span>
                      <span className="text-slate-600 text-[11px]">Surgeon, Physician, Biotechnology Researcher, Clinical Pharmacist</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedStreamTab === 'mec' && (
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-950">MEC / CEC: Mathematics, Economics, and Commerce</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Finance & Chartered Accountancy</span>
                  </div>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    Designed for students aspiring to lead corporate finance, chartered accountancy, commercial banking, equity research, and general management.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">Key Entrance Exams</span>
                      <span className="text-slate-600 text-[11px]">CA Foundation, CMA Foundation, IPMAT (IIM 5-Yr MBA), CUET</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">Degrees & Courses</span>
                      <span className="text-slate-600 text-[11px]">B.Com (Hons), BBA, IPM (IIM), BMS, Integrated Corporate Law</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-200">
                      <span className="font-bold text-slate-900 block mb-1">Career Destinations</span>
                      <span className="text-slate-600 text-[11px]">Chartered Accountant (CA), Investment Banker, CFO, Auditor</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedStreamTab === 'arts' && (
                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-purple-950">Humanities / Arts: History, Political Science, Psychology</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">Civil Services & Legal Studies</span>
                  </div>
                  <p className="text-xs text-purple-900/80 leading-relaxed">
                    Builds analytical writing, constitutional law foundation, public administration insights, and creative product design.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-purple-200">
                      <span className="font-bold text-slate-900 block mb-1">Key Entrance Exams</span>
                      <span className="text-slate-600 text-[11px]">CLAT (Common Law Admission Test), CUET, NID DAT, UCEED</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-purple-200">
                      <span className="font-bold text-slate-900 block mb-1">Degrees & Courses</span>
                      <span className="text-slate-600 text-[11px]">BA LLB (National Law Universities), B.Des, BA Political Science</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-purple-200">
                      <span className="font-bold text-slate-900 block mb-1">Career Destinations</span>
                      <span className="text-slate-600 text-[11px]">Civil Servant (IAS/IPS), High Court Advocate, Product Designer</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedStreamTab === 'diploma' && (
                <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-teal-950">Polytechnic Diploma: 3-Year Technical Engineering</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">Technical Lateral Entry</span>
                  </div>
                  <p className="text-xs text-teal-900/80 leading-relaxed">
                    A hands-on technical curriculum after 10th. Enables direct entry into 2nd year B.Tech via ECET without doing +2 Intermediate.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">Key Entrance Exams</span>
                      <span className="text-slate-600 text-[11px]">State POLYCET (after 10th), ECET (for B.Tech lateral entry)</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">Branches Available</span>
                      <span className="text-slate-600 text-[11px]">Computer Engineering (CME), Electronics, Electrical, Mechanical</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-1">Career Destinations</span>
                      <span className="text-slate-600 text-[11px]">Junior Engineer (SSC JE / RRB), Lateral Entry B.Tech Engineer</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Class 9 Structured Roadmap Details */}
            {selectedRole && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">{selectedRole.title}</h2>
                  <p className="text-xs text-slate-600 mt-1">{selectedRole.summary}</p>
                </div>

                {/* Structured Phase Roadmap */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                    <Layers className="h-4 w-4 text-brand-600" />
                    <span>Term-by-Term Roadmap Milestones</span>
                  </h3>
                  <div className="space-y-3">
                    {selectedRole.learning_roadmap.map((phase, idx) => (
                      <div key={phase.phase} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 text-white font-mono text-xs font-bold">
                              {idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900">{phase.title}</h4>
                          </div>
                          <span className="text-[11px] font-mono text-brand-600 font-semibold">
                            {phase.recommended_duration_weeks} Weeks
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {phase.topics.map(t => (
                            <span key={t} className="text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects & Competitions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Award className="h-4 w-4 text-emerald-600" />
                      <span>Class 9 Olympiads & Competitions</span>
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>SOF National Science Olympiad (NSO)</li>
                      <li>SOF International Mathematics Olympiad (IMO)</li>
                      <li>PRMO / IOQM (Indian Olympiad Qualifier in Math)</li>
                      <li>Unified Council NSTSE Examination</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <FolderGit2 className="h-4 w-4 text-brand-600" />
                      <span>Hands-on Skill Exploration</span>
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Learn basic Python syntax & math functions</li>
                      <li>Simulate Physics Newton&apos;s Laws of Motion in code</li>
                      <li>Solve 100% of NCERT Class 9 Exemplar Problems</li>
                      <li>Participate in school science exhibition models</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* BTECH & HIGHER ROLES EXPLORER */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
                <h2 className="text-sm font-bold text-slate-900">Step 2: Choose Your Target Engineering Role</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleRoles.map(r => {
                  const isSelected = selectedRole?.role_code === r.role_code;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-xs font-bold text-slate-900">{r.title}</h3>
                        {isSelected ? (
                          <CheckCircle2 className="h-4 w-4 text-brand-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-300" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{r.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Structured Roadmap */}
            {selectedRole && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-5">
                  <h2 className="text-xl font-bold text-slate-900">{selectedRole.title}</h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{selectedRole.summary}</p>
                </div>

                {/* Core Competencies & Skills */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                    <Code2 className="h-4 w-4 text-brand-600" />
                    <span>Core Competencies & Technology Stack</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Programming Languages</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRole.programming_languages.map(l => (
                          <span key={l} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-bold text-brand-700">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Frameworks & Tools</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRole.frameworks_and_tools.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Core Concepts</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRole.core_skills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Roadmap Milestones */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                    <Layers className="h-4 w-4 text-brand-600" />
                    <span>Learning Roadmap Milestones</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedRole.learning_roadmap.map((phase, idx) => (
                      <div key={phase.phase} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 text-white font-mono text-xs font-bold">
                              {idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900">{phase.title}</h4>
                          </div>
                          <span className="text-[11px] font-mono text-brand-600 font-semibold">
                            {phase.recommended_duration_weeks} Weeks
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {phase.topics.map(t => (
                            <span key={t} className="text-xs bg-white border border-slate-200/80 px-2 py-0.5 rounded text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
