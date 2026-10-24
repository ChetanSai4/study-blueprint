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
  ArrowRight,
  ChevronRight,
  Sparkles,
  BookOpen,
  Milestone,
  Stethoscope,
  Wrench,
  Shield,
  Laptop,
  Check
} from 'lucide-react';
import { api } from '@/lib/api';
import { CareerRole } from '@/types';

// Supported Stages for Indian students
const EDUCATION_STAGES = [
  { id: 'class_10', label: 'Class 10 (Secondary Board)', desc: 'Board exam, stream decision & What Next After 10th pathways' },
  { id: 'class_9', label: 'Class 9 (Secondary School)', desc: 'NCERT foundation, Olympiads & 10th stream preparation' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', desc: 'Pre-engineering & medical entrance prep (JEE / NEET / BITSAT)' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Practical hands-on technical foundation & ECET lateral entry' },
  { id: 'btech_1', label: 'BTech 1st Year (Engineering)', desc: 'Engineering core, programming & industry career roadmaps' }
];

export default function CareersPage() {
  const [selectedStage, setSelectedStage] = useState('class_10');
  const [active10thFlowTab, setActive10thFlowTab] = useState<'puc' | 'diploma' | 'paramedical' | 'iti' | 'defense' | 'short_courses'>('puc');
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read stage from localStorage if set
    const saved = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    const initialStage = saved || 'class_10';
    setSelectedStage(initialStage);

    async function loadCareers() {
      try {
        const rList = await api.get<CareerRole[]>('/careers/roles');
        if (rList && rList.length > 0) {
          // Filter strictly for BTech roles
          const btechRoles = rList.filter(r => r.role_code !== 'class9_foundation');
          setRoles(btechRoles);
          const btechRole = btechRoles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
          setSelectedRole(btechRole || btechRoles[0]);
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
    if (stageId === 'btech_1') {
      const match = roles.find(r => r.role_code === 'ai_ml_engineer' || r.role_code === 'full_stack_dev');
      if (match) setSelectedRole(match);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Milestone className="h-3.5 w-3.5 text-brand-600" />
            <span>Dedicated Section 1: Career Roadmaps</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {selectedStage === 'class_10' || selectedStage === 'class_9'
              ? 'What NEXT After 10th Class? — Complete 39-Pathway Career Guidance Flowchart'
              : selectedStage === 'btech_1'
              ? 'BTech 1st Year Engineering → Industry Career Roadmaps'
              : selectedStage === 'intermediate'
              ? 'Intermediate (+2 MPC / BiPC) → National College Entrance Roadmaps'
              : 'Diploma / Polytechnic → BTech Lateral Entry & Technical Careers'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {selectedStage === 'class_10' || selectedStage === 'class_9'
              ? 'Official multi-track educational flowchart for 10th Class / SSLC pass-outs: Intermediate streams, 3-Year Polytechnic, Paramedical, ITI Trades, Direct Defense & Govt Jobs, and Short-Term Professional Courses.'
              : `Structured step-by-step milestones, skills, and industry roadmaps for ${EDUCATION_STAGES.find(s => s.id === selectedStage)?.label}.`}
          </p>
        </div>

        {/* Academic Class / Level Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[11px] font-bold">1</span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Select Your Academic Class / Level:
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {EDUCATION_STAGES.map(stage => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{stage.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-brand-400" />}
                  </div>
                  <p className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{stage.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CLASS 10 & CLASS 9: WHAT NEXT AFTER 10TH FLOWCHART (EXACT FROM INFOGRAPHIC) */}
        {/* ========================================================================= */}
        {(selectedStage === 'class_10' || selectedStage === 'class_9') ? (
          <div className="space-y-6">
            {/* 6 Core Gateways from Infographic */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Decision Blueprint</span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  The 6 Main Pathways After 10th Standard / SSLC:
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click any pathway below to see complete branches, entrance exams, degree pathways, and job outcomes.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { id: 'puc', label: '1. Intermediate / PUC', sub: '2 Years (+2)', icon: GraduationCap, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                  { id: 'diploma', label: '2. Polytechnic Diploma', sub: '3 Years (Lateral BTech)', icon: Cpu, color: 'border-teal-300 bg-teal-50/70 text-teal-900' },
                  { id: 'paramedical', label: '3. Paramedical Diploma', sub: '2-3 Years (Hospital)', icon: Stethoscope, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                  { id: 'iti', label: '4. ITI Trades', sub: '1-2 Years (Technical)', icon: Wrench, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                  { id: 'defense', label: '5. Defense / Govt Jobs', sub: 'Direct 10th Entry', icon: Shield, color: 'border-rose-300 bg-rose-50/70 text-rose-900' },
                  { id: 'short_courses', label: '6. Job-Oriented Courses', sub: '6 Months - 1 Year', icon: Laptop, color: 'border-purple-300 bg-purple-50/70 text-purple-900' }
                ].map(track => {
                  const Icon = track.icon;
                  const isSelected = active10thFlowTab === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setActive10thFlowTab(track.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                          : `${track.color} hover:shadow-xs`
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                      <div>
                        <div className="text-xs font-bold leading-tight">{track.label}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'opacity-70'}`}>
                          {track.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pathway 1: Intermediate / PUC */}
            {active10thFlowTab === 'puc' && (
              <div className="bg-white rounded-2xl border border-blue-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Pathway 1: 11th Std / 1st PUC / Intermediate (+2) (2 Years)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Academic Junior College: Science, Commerce, and Arts Streams
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    The standard academic progression leading to university bachelor&apos;s degrees and national competitive exams.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Science */}
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-blue-950">Science (PCMB / PCMC / MPC)</h4>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Engineering & Medicine</span>
                    </div>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Key Entrance Exams:</strong>
                        <span className="text-slate-600 text-[11px]">JEE Main, JEE Advanced, NEET-UG, BITSAT, State EAPCET/KCET, NDA, NATA, IISER (IAT)</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Degree Pathways:</strong>
                        <span className="text-slate-600 text-[11px]">B.Tech / B.E., MBBS, BDS, B.Arch, BS-MS Pure Science, Commercial Pilot License</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Future Careers:</strong>
                        <span className="text-slate-600 text-[11px]">Software Engineer, Doctor, Aerospace Scientist, Indian Air Force Pilot</span>
                      </div>
                    </div>
                  </div>

                  {/* Commerce */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-amber-950">Commerce (MEC / CEC / EBAC)</h4>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Finance & CA</span>
                    </div>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Professional Exams:</strong>
                        <span className="text-slate-600 text-[11px]">CA Foundation (ICAI), CS Foundation, CMA Foundation, IPMAT (IIM 5-Yr MBA)</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Degree Pathways:</strong>
                        <span className="text-slate-600 text-[11px]">B.Com (Honours), BBA, IPM (IIM Indore/Rohtak), BMS, Integrated Corporate Law</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Future Careers:</strong>
                        <span className="text-slate-600 text-[11px]">Chartered Accountant (CA), CFO, Investment Banker, Company Secretary</span>
                      </div>
                    </div>
                  </div>

                  {/* Arts */}
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-purple-950">Arts & Humanities (HEPS)</h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">Civil Services & Law</span>
                    </div>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Competitive Exams:</strong>
                        <span className="text-slate-600 text-[11px]">CLAT (Common Law Admission Test for NLUs), CUET, NID DAT, NIFT, UPSC Foundation</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Degree Pathways:</strong>
                        <span className="text-slate-600 text-[11px]">BA LLB (5-Yr Integrated), B.Des (Design), BA Political Science / History, Journalism</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block text-[11px]">Future Careers:</strong>
                        <span className="text-slate-600 text-[11px]">Civil Services (IAS / IPS), Supreme Court Advocate, Product Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pathway 2: Polytechnic Diploma */}
            {active10thFlowTab === 'diploma' && (
              <div className="bg-white rounded-2xl border border-teal-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    Pathway 2: Polytechnic Diploma (3 Years)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Practical Technical Foundation with Direct Lateral Entry into 2nd Year B.Tech
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    No need for +2 Intermediate! After 10th class, join a 3-year technical polytechnic. Write ECET / DCET to get direct admission into 2nd year B.Tech.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Computer Engineering (CME)</strong>
                    <p className="text-slate-600 text-[11px]">Hardware, networking, databases, C/C++, Java, and software development.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Electronics (ECE) & Electrical (EEE)</strong>
                    <p className="text-slate-600 text-[11px]">Circuits, microcontrollers, telecommunications, power systems, and robotics.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Mechanical & Automobile</strong>
                    <p className="text-slate-600 text-[11px]">CAD/CAM, engine mechanics, thermal systems, and industrial automation.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Civil & Environmental</strong>
                    <p className="text-slate-600 text-[11px]">Surveying, structural analysis, construction management, and highway engineering.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-teal-950">Next Step: State ECET Lateral Entry Exam</span>
                    <p className="text-teal-800 text-[11px]">Enters 2nd year B.Tech (3rd semester) directly in engineering colleges.</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold text-xs shrink-0">
                    Direct Engineering Path
                  </span>
                </div>
              </div>
            )}

            {/* Pathway 3: Paramedical Diploma */}
            {active10thFlowTab === 'paramedical' && (
              <div className="bg-white rounded-2xl border border-emerald-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Pathway 3: Paramedical Diploma (2 to 3 Years)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Direct Healthcare, Hospital, and Clinical Laboratory Technicians
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct healthcare courses right after 10th class with immediate hospital and diagnostic center career opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {[
                    { title: 'DMLT (Medical Lab Technology)', desc: 'Blood, pathology, biochemistry analysis in hospitals and research labs.' },
                    { title: 'Dialysis Technician', desc: 'Operating hemodialysis machines in nephrology departments and kidney care clinics.' },
                    { title: 'Medical X-Ray & Imaging Tech', desc: 'Radiography, CT scan, and MRI clinical diagnostic support.' },
                    { title: 'Operation Theatre (OT) Tech', desc: 'Assisting surgeons, surgical instrument prep, and sterilisation procedures.' },
                    { title: 'Ophthalmic Assistant', desc: 'Eye clinics, vision testing, refraction, and optical diagnostics.' },
                    { title: 'Health Inspector / Sanitary Inspector', desc: 'Public health monitoring, food safety inspection, and municipal health cells.' }
                  ].map(card => (
                    <div key={card.title} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <strong className="text-slate-900 block">{card.title}</strong>
                      <p className="text-slate-600 text-[11px]">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pathway 4: ITI Trades */}
            {active10thFlowTab === 'iti' && (
              <div className="bg-white rounded-2xl border border-amber-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Pathway 4: Industrial Training Institute (ITI) (1 to 2 Years)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Vocational Engineering Trades with Guaranteed Government & PSU Apprenticeships
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Certified by NCVT / SCVT. Immediate entry into Indian Railways (Assistant Loco Pilot), BHEL, DRDO, State Electricity Boards, and private automotive plants.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { trade: 'Electrician (2 Yrs)', scope: 'Industrial wiring, transformers, electrical motors, and solar panels.' },
                    { trade: 'Fitter (2 Yrs)', scope: 'Precision fitting, piping, machining, and manufacturing maintenance.' },
                    { trade: 'Mechanic Motor Vehicle (2 Yrs)', scope: 'Automobile engines, diagnostics, EVs, and heavy vehicles.' },
                    { trade: 'Machinist / Turner (2 Yrs)', scope: 'Lathe, milling, CNC machines, and tool manufacturing.' },
                    { trade: 'Draughtsman (Civil/Mech) (2 Yrs)', scope: 'Architectural drawings, CAD drafting, and structural planning.' },
                    { trade: 'Welder (1 Yr)', scope: 'Arc, TIG, MIG welding in marine, pipeline, and structural projects.' },
                    { trade: 'Electronic Mechanic (2 Yrs)', scope: 'PCB assembly, sensor repair, instrumentation, and IoT devices.' },
                    { trade: 'Tool & Die Maker (3 Yrs)', scope: 'Press tools, injection molds, dies, and aerospace precision parts.' }
                  ].map(t => (
                    <div key={t.trade} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <strong className="text-slate-900 block font-bold">{t.trade}</strong>
                      <p className="text-slate-500 text-[10px] leading-relaxed">{t.scope}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pathway 5: Defense & Govt Jobs */}
            {active10thFlowTab === 'defense' && (
              <div className="bg-white rounded-2xl border border-rose-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Pathway 5: Direct Defense Services & Central Government Jobs
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Immediate Uniformed Services & Government Employment (10th Pass Eligibility)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Direct recruitment examinations conducted annually for Class 10 graduates with pensions, medical coverage, and rank progression.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">Indian Army — Agniveer General Duty (GD)</strong>
                    <p className="text-rose-800 text-[11px]">Primary combat force, infantry, gunner, driver. Minimum 45% aggregate in 10th class.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">Indian Navy — Agniveer MR (Matric Recruit)</strong>
                    <p className="text-rose-800 text-[11px]">Chef, Steward, and Hygienist roles aboard naval warships and shore establishments.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">Indian Coast Guard — Navik (Domestic Branch)</strong>
                    <p className="text-rose-800 text-[11px]">Maritime coastal patrol, ship operations, logistics, and marine policing.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">Staff Selection Commission (SSC GD Constable)</strong>
                    <p className="text-rose-800 text-[11px]">BSF, CISF, CRPF, ITBP, SSB, and Assam Rifles border security personnel.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">Railway Protection Force (RPF Constable)</strong>
                    <p className="text-rose-800 text-[11px]">Railway security, station safety, passenger protection in Indian Railways.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1">
                    <strong className="text-rose-950 block font-bold">India Post — Gramin Dak Sevak (GDS)</strong>
                    <p className="text-rose-800 text-[11px]">Branch Postmaster and Assistant Branch Postmaster (merit based on 10th marks).</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pathway 6: Job-Oriented Short Courses */}
            {active10thFlowTab === 'short_courses' && (
              <div className="bg-white rounded-2xl border border-purple-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Pathway 6: Job-Oriented Short-Term Professional Courses (6 Months - 1 Year)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Fast-Track Commercial, Creative, and Digital Industry Certifications
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Practical skill diplomas to launch freelance work, agency jobs, digital marketing, or small business operations.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  {[
                    { field: '3D Animation & VFX', outcome: 'Gaming studios, film post-production, YouTube studios.' },
                    { field: 'Graphic Design & UI', outcome: 'Photoshop, Figma, Illustrator, marketing agencies.' },
                    { field: 'Web Development Basics', outcome: 'HTML, CSS, JavaScript, freelance website building.' },
                    { field: 'Cybersecurity & Ethical Hacking', outcome: 'Network security, firewall configuration, IT support.' },
                    { field: 'Accounting with Tally & GST', outcome: 'Corporate bookkeeping, tax filing, accounting executive.' },
                    { field: 'Hotel Management Diploma', outcome: 'Food production, front office, culinary operations.' },
                    { field: 'Digital Marketing & SEO', outcome: 'Social media management, Google Ads, brand growth.' },
                    { field: 'Mobile Phone Hardware Repair', outcome: 'Smartphone motherboard servicing and chip-level repair.' }
                  ].map(c => (
                    <div key={c.field} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <strong className="text-slate-900 block font-bold">{c.field}</strong>
                      <p className="text-slate-500 text-[10px] leading-relaxed">{c.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* BTECH & HIGHER: ENGINEERING ROLES (ONLY FOR BTECH / DIPLOMA)             */
          /* ========================================================================= */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[11px] font-bold">2</span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Select Target Engineering Role:
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roles.map(r => {
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

            {/* Generated Engineering Roadmap */}
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
