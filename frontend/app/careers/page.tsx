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
  Check,
  Building,
  Building2,
  Plane,
  HeartPulse,
  Scale,
  Award,
  Zap,
  FolderGit2
} from 'lucide-react';
import { api } from '@/lib/api';
import { DEFAULT_CAREER_ROLES } from '@/lib/careerRoles';
import { DIPLOMA_BRANCH_DETAILS } from '@/lib/diplomaData';
import { BTechBranchRoadmapView } from '@/components/careers/BTechBranchRoadmapView';
import { CareerRole } from '@/types';

// Supported Stages for Indian students
const EDUCATION_STAGES = [
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', desc: 'Pre-engineering, medical, degree & national entrance roadmaps' },
  { id: 'class_10', label: 'Class 10 (Secondary Board)', desc: 'Board exam, stream decision & What Next After 10th pathways' },
  { id: 'class_9', label: 'Class 9 (Secondary School)', desc: 'NCERT foundation, Olympiads & 10th stream preparation' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Practical hands-on technical foundation & ECET lateral entry' },
  { id: 'btech_1', label: 'BTech 1st Year (Engineering)', desc: 'Engineering core, programming & industry career roadmaps' }
];

export default function CareersPage() {
  const [selectedStage, setSelectedStage] = useState('intermediate');
  const [active10thFlowTab, setActive10thFlowTab] = useState<'puc' | 'diploma' | 'paramedical' | 'iti' | 'defense' | 'short_courses'>('puc');
  const [activeInterStreamTab, setActiveInterStreamTab] = useState<'mpc' | 'bipc' | 'mec' | 'arts'>('mpc');
  const [activeDiplomaBranch, setActiveDiplomaBranch] = useState<'cme' | 'ece' | 'eee' | 'mech' | 'civil' | 'auto'>('cme');
  const [btechRoleBranchFilter, setBtechRoleBranchFilter] = useState<string>('all');
  const [roles, setRoles] = useState<CareerRole[]>(DEFAULT_CAREER_ROLES);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(DEFAULT_CAREER_ROLES[0]);

  useEffect(() => {
    // Read stage from localStorage if set
    const saved = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    const initialStage = saved || 'intermediate';
    setSelectedStage(initialStage);

    async function loadCareers() {
      try {
        const rList = await api.get<CareerRole[]>('/careers/roles');
        if (rList && rList.length > 0) {
          const btechRoles = rList.filter(r => r.role_code !== 'class9_foundation');
          if (btechRoles.length > 0) {
            setRoles(btechRoles);
            const btechRole = btechRoles.find(r => r.role_code === 'full_stack_dev' || r.role_code === 'ai_ml_engineer');
            setSelectedRole(btechRole || btechRoles[0]);
          }
        }
      } catch (err) {
        console.warn('Using client-side career pathways', err);
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
            {selectedStage === 'intermediate'
              ? 'What NEXT After Intermediate (+2 MPC / BiPC)? — Complete Degree & Entrance Flowchart'
              : selectedStage === 'class_10' || selectedStage === 'class_9'
              ? 'What NEXT After 10th Class? — Complete 39-Pathway Career Guidance Flowchart'
              : selectedStage === 'diploma'
              ? 'Polytechnic Diploma → ECET BTech Lateral Entry & Technical Careers'
              : 'BTech 1st Year Engineering → Industry Career Roadmaps'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {selectedStage === 'intermediate'
              ? 'Step-by-step higher education flowchart for Intermediate (+2): Engineering (BTech), Medicine (MBBS/BDS), Agriculture, Pharmacy, Pure Sciences, Architecture, CA, and Law.'
              : selectedStage === 'class_10' || selectedStage === 'class_9'
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
        {/* INTERMEDIATE (+2 MPC / BiPC / MEC / ARTS) COMPREHENSIVE ROADMAP           */}
        {/* ========================================================================= */}
        {selectedStage === 'intermediate' ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Stream Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Intermediate Streams</span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Choose Your Intermediate (+2) Stream:
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click your stream to view complete degree opportunities, national entrance exams, college tiers, and future careers.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'mpc', label: '1. MPC (Maths, Physics, Chem)', badge: 'Engineering, Architecture & Defense', icon: Laptop, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                  { id: 'bipc', label: '2. BiPC (Biology, Physics, Chem)', badge: 'Medical, Agriculture & Pharmacy', icon: Stethoscope, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                  { id: 'mec', label: '3. MEC / CEC (Commerce)', badge: 'CA, CS, Management & Finance', icon: Briefcase, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                  { id: 'arts', label: '4. Arts & Humanities (HEPS)', badge: 'Civil Services, Law & Design', icon: Scale, color: 'border-purple-300 bg-purple-50/70 text-purple-900' }
                ].map(stream => {
                  const Icon = stream.icon;
                  const isSelected = activeInterStreamTab === stream.id;
                  return (
                    <button
                      key={stream.id}
                      onClick={() => setActiveInterStreamTab(stream.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                          : `${stream.color} hover:shadow-xs`
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                      <div>
                        <div className="text-xs font-bold">{stream.label}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'opacity-75'}`}>
                          {stream.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MPC Stream Detail Card */}
            {activeInterStreamTab === 'mpc' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      MPC (+2 Mathematics, Physics, Chemistry) — Degree Pathways
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">
                      Engineering, Technological Innovation, Architecture, and Commissioned Defense
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {/* BTech */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">1. B.Tech / B.E. (4 Years)</strong>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Engineering</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Branches:</strong> CSE, AI & Machine Learning, Data Science, ECE, EEE, Mechanical, Civil, Chemical, Aerospace, Marine.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance Exams:</strong> JEE Main, JEE Advanced, BITSAT, State EAPCET / EAMCET (Andhra Pradesh / Telangana), COMEDK, VITEEE.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Top Colleges:</strong> IITs, NITs, BITS Pilani, JNTU-GV affiliated colleges (Sri Sivani College of Engineering, GMRIT), Andhra University (AU).
                      </p>
                    </div>

                    {/* Architecture */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">2. B.Arch & Planning (5 Yrs)</strong>
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Architecture</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> Bachelor of Architecture (B.Arch - 5 Years), Bachelor of Planning (B.Plan), B.Des.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance Exams:</strong> NATA (National Aptitude Test in Architecture), JEE Main Paper-2, UCEED.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Future Careers:</strong> Licensed Architect, Urban Infrastructure Designer, Building Conservationist.
                      </p>
                    </div>

                    {/* Pure Science & Research */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">3. Pure Science (BS-MS 5 Yrs)</strong>
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Research</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Institutions:</strong> IISc Bangalore, 7 IISERs (Berhampur, Pune, Mohali, etc.), NISER, CMI.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance Exams:</strong> IAT (IISER Aptitude Test), NEST (NISER), JEE Advanced.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Scientist in ISRO / DRDO / BARC, Quantum Computing, Theoretical Physics, Data Scientist.
                      </p>
                    </div>

                    {/* Defense */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">4. Defense (NDA Officer)</strong>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">Officer</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Wings:</strong> Indian Army, Indian Air Force (Flying Wing), Indian Navy, Indian Naval Academy.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance Exams:</strong> UPSC NDA Examination (written + SSB 5-Day Interview), 10+2 TES Cadet Entry.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Rank at Passing Out:</strong> Lieutenant / Flying Officer / Sub Lieutenant with B.Tech degree from JNU.
                      </p>
                    </div>

                    {/* Aviation & Marine */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">5. Aviation & Merchant Navy</strong>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Aviation</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> Commercial Pilot License (CPL via IGRUA / Cadet Pilot), B.Sc Nautical Science (IMU-CET).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Airline Pilot (IndiGo, Air India), Deck Officer / Marine Captain on International Cargo Vessels.
                      </p>
                    </div>

                    {/* Computing & Analytics */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">6. Computer Applications</strong>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Software</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> BCA (Bachelor of Computer Applications - 3 Years), B.Sc Computer Science, Data Analytics.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Path:</strong> BCA $\rightarrow$ MCA (via NIMCET / ICET) $\rightarrow$ Software Engineer in MNCs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BiPC Stream Detail Card */}
            {activeInterStreamTab === 'bipc' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      BiPC (+2 Biology, Physics, Chemistry) — Complete Degree Pathways
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">
                      Medicine, Surgery, Agricultural Sciences, Pharmacy, and Allied Healthcare
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    {/* MBBS / BDS */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">1. MBBS & BDS (Medical)</strong>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">NEET-UG</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> MBBS (5.5 Years with 1-Year Internship), BDS (Bachelor of Dental Surgery - 5 Years).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance:</strong> NEET-UG (National Eligibility cum Entrance Test).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Colleges:</strong> AIIMS Mangalagiri, Andhra Medical College (AMC), RIMS Srikakulam, Private Medical Colleges.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Next Step:</strong> NEET-PG $\rightarrow$ MD / MS Super-speciality (Cardiology, Neurology, Surgery).
                      </p>
                    </div>

                    {/* AYUSH */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">2. AYUSH Medicine (5.5 Yrs)</strong>
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Alternative</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Branches:</strong> BAMS (Ayurvedic Medicine), BHMS (Homeopathy), BNYS (Naturopathy & Yogic Sciences), BUMS (Unani).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance:</strong> NEET-UG AYUSH Counseling.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Registered Medical Practitioner, Wellness Centers, Ayurvedic Hospital Medical Officer.
                      </p>
                    </div>

                    {/* Veterinary & Agriculture */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">3. Veterinary & Agriculture</strong>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">High Demand</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> BVSc & AH (Veterinary Science - 5.5 Years), B.Sc (Hons) Agriculture (4 Years), B.Sc Horticulture, B.F.Sc (Fisheries).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance:</strong> State EAPCET (Agriculture Stream), ICAR AIEEA.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Veterinary Surgeon, Agricultural Officer (AO), Bank Agriculture Specialist Officer (IBPS SO), Seed Technologist.
                      </p>
                    </div>

                    {/* Pharmacy */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">4. Pharmacy (B.Pharm / Pharm.D)</strong>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Pharma</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> B.Pharmacy (4 Years), Pharma.D (Doctor of Pharmacy - 6 Years Clinical Practice).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Entrance:</strong> State EAPCET / NEET.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Clinical Pharmacist, Drug Inspector, Formulation Scientist in Dr. Reddy&apos;s, Sun Pharma, Cipla.
                      </p>
                    </div>

                    {/* Allied Health & Nursing */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">5. Nursing & Physiotherapy</strong>
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">Healthcare</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> B.Sc Nursing (4 Years), BPT (Bachelor of Physiotherapy - 4.5 Years), BMRIT (Radiology & Imaging).
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Hospital Staff Nurse, Sports Physiotherapist, Rehabilitation Specialist, Overseas NHS/Gulf Healthcare.
                      </p>
                    </div>

                    {/* Biotechnology & Life Sciences */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">6. Biotechnology & Genetics</strong>
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Biotech</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Degrees:</strong> B.Tech Biotechnology, B.Sc Microbiology, B.Sc Genetics, Bioinformatics.
                      </p>
                      <p className="text-slate-600 text-[11px]">
                        <strong>Careers:</strong> Genetic Engineer, Vaccine Researcher (Bharat Biotech, Serum Institute), Bioinformatician.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MEC / CEC Stream Detail Card */}
            {activeInterStreamTab === 'mec' && (
              <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    MEC / CEC (Commerce & Economics) — Pathways
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Chartered Accountancy, Corporate Law, Management & Investment Banking
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">1. Chartered Accountancy (CA)</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Path:</strong> CA Foundation $\rightarrow$ Intermediate $\rightarrow$ 3-Yr Articleship $\rightarrow$ CA Final.
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> Statutory Auditor, Chief Financial Officer (CFO), Financial Consultant.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">2. IIM 5-Year Integrated MBA (IPM)</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Entrance:</strong> IPMAT (IIM Indore, IIM Rohtak, IIM Ranchi, IIM Bodh Gaya).
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> Direct Master of Business Administration from Indian Institutes of Management.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">3. Corporate Law & CS</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Degrees:</strong> BBA LLB (5 Years via CLAT), Company Secretary (ICSI CS Foundation).
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> Corporate Legal Advisor, Company Secretary, M&A Specialist.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Arts & Humanities Stream Detail Card */}
            {activeInterStreamTab === 'arts' && (
              <div className="bg-white rounded-2xl border border-purple-200 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Arts & Humanities (HEPS) — Pathways
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    National Law Universities, UPSC Civil Services Foundation, Design & Journalism
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">1. National Law Universities (BA LLB)</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Entrance:</strong> CLAT (Common Law Admission Test for 26 NLUs), AILET (NLU Delhi).
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> High Court / Supreme Court Advocate, Judicial Officer, Corporate Counsel.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">2. UPSC Civil Services (IAS / IPS / IFS)</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Degrees:</strong> BA in Political Science, History, Economics, Public Administration.
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> District Collector, Indian Police Service, Indian Foreign Service Diplomat.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <strong className="text-slate-900 block font-bold">3. Design & Mass Communication</strong>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Exams:</strong> NID DAT (National Institute of Design), NIFT (Fashion), UCEED.
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Outcome:</strong> Product UX Designer, Fashion Designer, Investigative Journalist.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (selectedStage === 'class_10' || selectedStage === 'class_9') ? (
          /* ========================================================================= */
          /* CLASS 10 & CLASS 9: WHAT NEXT AFTER 10TH FLOWCHART                        */
          /* ========================================================================= */
          <div className="space-y-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
                    <h4 className="text-xs font-bold text-blue-950">Science (MPC / BiPC)</h4>
                    <p className="text-slate-600">JEE, NEET, BITSAT, State EAPCET $\rightarrow$ BTech, MBBS, BDS, Pharmacy.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                    <h4 className="text-xs font-bold text-amber-950">Commerce (MEC / CEC)</h4>
                    <p className="text-slate-600">CA Foundation, CS, CMA, IPMAT $\rightarrow$ Chartered Accountant, IIM MBA.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
                    <h4 className="text-xs font-bold text-purple-950">Arts & Humanities</h4>
                    <p className="text-slate-600">CLAT, CUET, NID, UPSC $\rightarrow$ High Court Advocate, IAS / IPS.</p>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Computer (CME)</strong>
                    <p className="text-slate-600 text-[11px]">Software, C/C++, Java, databases.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Electronics (ECE)</strong>
                    <p className="text-slate-600 text-[11px]">Circuits, microcontrollers, telecommunications.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Mechanical</strong>
                    <p className="text-slate-600 text-[11px]">CAD/CAM, engines, thermal systems.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <strong className="text-slate-900 block">Civil</strong>
                    <p className="text-slate-600 text-[11px]">Surveying, structures, construction.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pathway 3: Paramedical */}
            {active10thFlowTab === 'paramedical' && (
              <div className="bg-white rounded-2xl border border-emerald-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Pathway 3: Paramedical Diploma (2 to 3 Years)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Healthcare & Clinical Diagnostic Technicians
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">DMLT (Medical Lab Tech)</strong>
                    <p className="text-slate-600 text-[11px]">Pathology, biochemistry, diagnostic labs.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Dialysis Technician</strong>
                    <p className="text-slate-600 text-[11px]">Hemodialysis in nephrology clinics.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Operation Theatre (OT) Tech</strong>
                    <p className="text-slate-600 text-[11px]">Assisting surgeons, surgical instrumentation.</p>
                  </div>
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
                    Vocational Engineering Trades (Railways ALP & PSU Apprenticeships)
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Electrician (2 Yrs)</strong>
                    <p className="text-slate-500 text-[10px]">Industrial wiring, transformers.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Fitter (2 Yrs)</strong>
                    <p className="text-slate-500 text-[10px]">Precision fitting, machining.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Motor Mechanic (2 Yrs)</strong>
                    <p className="text-slate-500 text-[10px]">Automobile engines, diagnostics.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block">Machinist / Turner (2 Yrs)</strong>
                    <p className="text-slate-500 text-[10px]">Lathe, CNC machines.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pathway 5: Defense */}
            {active10thFlowTab === 'defense' && (
              <div className="bg-white rounded-2xl border border-rose-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Pathway 5: Direct Defense Services & Central Government Jobs
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Uniformed Defense Employment (10th Pass Eligibility)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                    <strong className="text-rose-950 block font-bold">Indian Army — Agniveer GD</strong>
                    <p className="text-rose-800 text-[11px]">Primary combat force, infantry.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                    <strong className="text-rose-950 block font-bold">Indian Navy — Agniveer MR</strong>
                    <p className="text-rose-800 text-[11px]">Chef, steward, and naval operations.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                    <strong className="text-rose-950 block font-bold">SSC GD Constable</strong>
                    <p className="text-rose-800 text-[11px]">BSF, CISF, CRPF, ITBP forces.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pathway 6: Short Courses */}
            {active10thFlowTab === 'short_courses' && (
              <div className="bg-white rounded-2xl border border-purple-200/90 p-6 shadow-sm space-y-6 animate-in fade-in">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    Pathway 6: Job-Oriented Short Courses (6 Months - 1 Year)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    Fast-Track Digital & Commercial Certifications
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block font-bold">3D Animation & VFX</strong>
                    <p className="text-slate-500 text-[10px]">Gaming studios, film post-production.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block font-bold">Graphic Design & UI</strong>
                    <p className="text-slate-500 text-[10px]">Photoshop, Figma, marketing agencies.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block font-bold">Web Development Basics</strong>
                    <p className="text-slate-500 text-[10px]">HTML, CSS, JavaScript websites.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="text-slate-900 block font-bold">Tally with GST</strong>
                    <p className="text-slate-500 text-[10px]">Corporate bookkeeping, tax filing.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : selectedStage === 'diploma' ? (
          /* ========================================================================= */
          /* DIPLOMA / POLYTECHNIC: INTERACTIVE BRANCH SELECTION & ECET BLUEPRINT       */
          /* ========================================================================= */
          <div className="space-y-6 animate-in fade-in">
            {/* Branch Selection Grid */}
            <div className="bg-white rounded-2xl border border-teal-200/90 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                  Polytechnic Diploma Branches
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  Choose Your Polytechnic Diploma Group / Branch:
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click any diploma branch to inspect its State ECET lateral entry path, core subjects, PSU exams, and industrial placements.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'cme', label: '1. Computer (DCME)', sub: 'Software & IT', icon: Laptop, color: 'border-blue-300 bg-blue-50/70 text-blue-900' },
                  { id: 'ece', label: '2. Electronics (DECE)', sub: 'Hardware & Telecom', icon: Cpu, color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900' },
                  { id: 'eee', label: '3. Electrical (DEEE)', sub: 'Power Machines & EV', icon: Zap, color: 'border-amber-300 bg-amber-50/70 text-amber-900' },
                  { id: 'mech', label: '4. Mechanical (DME)', sub: 'Manufacturing & CAD', icon: Wrench, color: 'border-rose-300 bg-rose-50/70 text-rose-900' },
                  { id: 'civil', label: '5. Civil (DCE)', sub: 'Construction & Survey', icon: Building2, color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900' },
                  { id: 'auto', label: '6. Automobile (DAE)', sub: 'Automotive & Engines', icon: Shield, color: 'border-teal-300 bg-teal-50/70 text-teal-900' }
                ].map(branch => {
                  const Icon = branch.icon;
                  const isSelected = activeDiplomaBranch === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setActiveDiplomaBranch(branch.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                          : `${branch.color} hover:shadow-xs`
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-brand-400' : 'opacity-80'}`} />
                      <div>
                        <div className="text-xs font-bold leading-tight">{branch.label}</div>
                        <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'opacity-75'}`}>
                          {branch.sub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Diploma Branch Deep-Dive */}
            {DIPLOMA_BRANCH_DETAILS[activeDiplomaBranch] && (() => {
              const data = DIPLOMA_BRANCH_DETAILS[activeDiplomaBranch];
              return (
                <div className="space-y-6">
                  {/* Gateway 1: State ECET Lateral Entry */}
                  <div className="bg-white rounded-2xl border border-teal-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                          Gateway 1: State ECET Lateral Entry (B.Tech 2nd Year)
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-2">
                          {data.name || data.label} → B.Tech Lateral Entry Blueprint
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-teal-600 text-white font-bold text-xs shrink-0 self-start sm:self-auto">
                        Direct 2nd Year B.Tech Entry
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                        <strong className="text-teal-950 block font-bold">Lateral Admission Target</strong>
                        <p className="text-slate-600 text-[11px]">{data.ecet_bridge.lateral_seat}</p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                        <strong className="text-teal-950 block font-bold">Top University Colleges</strong>
                        <p className="text-slate-600 text-[11px]">{data.ecet_bridge.top_colleges}</p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                        <strong className="text-teal-950 block font-bold">State ECET Rank Benchmark</strong>
                        <p className="text-slate-600 text-[11px]">{data.ecet_bridge.rank_target}</p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 space-y-1">
                        <strong className="text-teal-950 block font-bold">Strategic Advantage</strong>
                        <p className="text-slate-600 text-[11px]">{data.ecet_bridge.advantage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Gateway 2: Core Subjects & Labs */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Gateway 2: Core Technical Curriculum & Practical Labs
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        Key Subjects & Hands-on Workshop Modules
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {data.core_subjects.map(sub => (
                        <div key={sub.name} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                          <strong className="text-slate-900 block font-bold">{sub.name}</strong>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{sub.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gateway 3 & 4: PSU Govt Jobs + Industrial Recruiters */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* PSU Govt Jobs */}
                    <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          Gateway 3: Central & State Govt PSUs
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-2">
                          Government Junior Engineer & Technical Appointments
                        </h3>
                      </div>
                      <div className="space-y-2 text-xs">
                        {data.psu_govt_jobs.map(job => (
                          <div key={job.org} className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between">
                            <div>
                              <strong className="text-emerald-950 block">{job.org}</strong>
                              <span className="text-slate-600 text-[11px]">{job.role}</span>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                              {job.salary}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Private Recruiters */}
                    <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                          Gateway 4: Private Industrial Campus Placements
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-2">
                          Major Recruiters & Apprenticeship Sponsors
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs pt-1">
                        {data.industry_recruiters.map(company => (
                          <span key={company} className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/50 text-blue-950 font-bold text-[11px]">
                            {company}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Annual campus placements offer trainee engineer positions with fast-track promotion upon completing B.Tech.
                      </p>
                    </div>
                  </div>

                  {/* Gateway 5: 3-Year Action Plan */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Gateway 5: 3-Year Strategic Milestone Plan
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        From 1st Year Fundamentals to 3rd Year ECET Rank & Industry Placement
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {data.three_year_plan.map(step => (
                        <div key={step.year} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                          <strong className="text-brand-700 font-bold block">{step.year}</strong>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{step.focus}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* B.TECH 4-YEAR STRUCTURED BRANCH ROADMAP & SYLLABUS */
          <BTechBranchRoadmapView
            selectedBranch={btechRoleBranchFilter === "all" ? "eee" : btechRoleBranchFilter}
            onBranchChange={setBtechRoleBranchFilter}
          />
        )}
      </div>
    </AppShell>
  );
}
