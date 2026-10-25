'use client';

import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  Code2,
  Wrench,
  Building2,
  Download,
  Eye,
  ExternalLink,
  Award,
  Briefcase,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Printer,
  X,
  FileText,
  TrendingUp,
  Target,
  ArrowDown,
  Workflow,
  Sparkles,
  ShieldCheck,
  Compass,
  Laptop,
  Check
} from 'lucide-react';
import { BTECH_BRANCH_ROADMAPS, BTechBranchRoadmap } from '@/lib/btechBranchRoadmaps';

interface Props {
  selectedBranch?: string;
  onBranchChange?: (branch: string) => void;
}

export function BTechBranchRoadmapView({
  selectedBranch = 'eee',
  onBranchChange
}: Props) {
  const [currentBranch, setCurrentBranch] = useState<string>(selectedBranch || 'eee');
  const [activeViewMode, setActiveViewMode] = useState<'architecture' | 'semesters' | 'placements'>('architecture');
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const handleBranchSelect = (code: string) => {
    setCurrentBranch(code);
    if (onBranchChange) {
      onBranchChange(code);
    }
  };

  const branchData: BTechBranchRoadmap =
    BTECH_BRANCH_ROADMAPS[currentBranch] || BTECH_BRANCH_ROADMAPS['eee'];

  const BRANCH_TABS = [
    { id: 'eee', label: 'EEE (Electrical & Electronics)', short: 'EEE', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'ece', label: 'ECE (Electronics & Comm)', short: 'ECE', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'cse', label: 'CSE (Computer Science)', short: 'CSE', icon: Code2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'aiml', label: 'AI & Machine Learning', short: 'AIML', icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'mech', label: 'Mechanical Engineering', short: 'MECH', icon: Wrench, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'civil', label: 'Civil Engineering', short: 'CIVIL', icon: Building2, color: 'text-cyan-500', bg: 'bg-cyan-500/10' }
  ];

  return (
    <div className="space-y-7 animate-in fade-in duration-200" id="btech-branch-roadmap-root">
      {/* Branch Selector Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
              B.Tech Engineering Specializations
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5 flex items-center space-x-2">
              <span>Select Your Engineering Discipline / Branch:</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your branch to view the complete <strong>Architecture Flow Diagram</strong>, 4-Year Academic Blueprint, simulation toolchains, and PSU / Corporate placements.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 self-start sm:self-auto bg-slate-100 px-3 py-1.5 rounded-xl font-mono">
            R23 / R20 Regulation
          </span>
        </div>

        {/* Branch Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {BRANCH_TABS.map(tab => {
            const isSelected = currentBranch === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleBranchSelect(tab.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/90 shadow-sm ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${tab.bg}`}>
                    <Icon className={`h-4 w-4 ${tab.color}`} />
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{tab.label}</h4>
                  <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">
                    {tab.id === 'eee' ? 'Power & EV' : tab.id === 'ece' ? 'VLSI & IoT' : tab.id === 'cse' ? 'FullStack & Cloud' : tab.id === 'aiml' ? 'ML & GenAI' : tab.id === 'mech' ? 'CAD & Robotics' : 'Structural & BIM'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Branch Full-Structure Roadmap Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-7">
        {/* Banner */}
        <div className="border-b border-slate-100 pb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full flex items-center space-x-1">
              <Zap className="h-3 w-3 text-brand-700" />
              <span>B.Tech {branchData.short_name} Official Architecture Blueprint</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              {branchData.regulation}
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Highest CTC: {branchData.highest_package}</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Avg Package: {branchData.average_package}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {branchData.name} — Architecture Flow
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-brand-600 mt-1">
              {branchData.tagline}
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-4xl">
              {branchData.overview}
            </p>
          </div>

          {/* Prominent Syllabus Download & Preview Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={branchData.syllabus_pdf_url}
              download={branchData.syllabus_pdf_url.split('/').pop() || `${branchData.branch_code}_syllabus.pdf`}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <Download className="h-4 w-4" />
              <span>Download Official {branchData.short_name} Syllabus (PDF)</span>
            </a>

            <button
              onClick={() => {
                setPreviewPdfUrl(branchData.syllabus_pdf_url);
                setPreviewPdfTitle(branchData.syllabus_pdf_title);
              }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Preview Syllabus & Exam Blueprint</span>
            </button>

            <a
              href={branchData.syllabus_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in New Tab</span>
            </a>

            <a
              href="/docs/academic_blueprint.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-2.5 rounded-2xl text-brand-600 text-xs font-semibold hover:underline"
            >
              <span>View Master Academic Regulations Copy →</span>
            </a>
          </div>
        </div>

        {/* View Mode Toggle: Architecture Flowchart (Default) vs Semester Grid vs Placements */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-2 rounded-2xl">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setActiveViewMode('architecture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'architecture'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Workflow className="h-3.5 w-3.5 text-brand-600" />
              <span>⚡ Visual Architecture Flow Diagram</span>
            </button>

            <button
              onClick={() => setActiveViewMode('semesters')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'semesters'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              <span>📅 4-Year Semester Grid (All 8 Sems)</span>
            </button>

            <button
              onClick={() => setActiveViewMode('placements')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'placements'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
              <span>🎯 PSU & Corporate Placements Matrix</span>
            </button>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 px-3 py-1 font-mono">
            {branchData.short_name} Engineering Pipeline
          </span>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: VISUAL ARCHITECTURE FLOW DIAGRAM                                  */}
        {/* ========================================================================= */}
        {activeViewMode === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-950 text-white p-6 sm:p-7 rounded-3xl space-y-3 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  Engineering Architecture Pipeline
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Stage 01 → Stage 02 → Stage 03 → Stage 04 → Stage 05 (Career Exit)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {branchData.name} — 5-Phase End-to-End System Architecture
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                This architecture flowchart details how foundational math and physics convert into core physical machinery, linear control loops, industrial simulation software, smart grid / EV powertrains, and multi-track placement gateways.
              </p>
            </div>

            {/* THE ARCHITECTURE FLOW PIPELINE */}
            <div className="space-y-4 relative">
              {/* PHASE 01 */}
              <div className="bg-white rounded-3xl border-2 border-blue-200/90 p-5 sm:p-6 shadow-xs space-y-4 relative hover:border-blue-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-xs">
                      01
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Phase 01: Foundational Modeling & Circuit Laws Layer (Year 1)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Mathematical Rigor, Differential Calculus, Matrix Algebra & Passive Network Theorems
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
                    Input Prerequisites: +2 MPC Physics & Calculus
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Core Modules */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Core Architecture Modules:</span>
                    <ul className="text-xs text-slate-700 space-y-1 pl-3 list-disc">
                      {branchData.four_year_plan[0].semesters[0].core_subjects.slice(0, 3).map((sub, idx) => (
                        <li key={idx} className="font-medium">{sub}</li>
                      ))}
                      <li className="font-medium">Differential Equations & Transform Calculus</li>
                      <li className="font-medium">Engineering Graphics & CAD Drafting</li>
                    </ul>
                  </div>

                  {/* Toolchains */}
                  <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-blue-700 block">Simulation Toolchains:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['LTspice', 'MATLAB Basic Scripts', 'Tinkercad Circuits', 'AutoCAD Electrical'].map(tool => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 text-[10px] font-mono font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-blue-700 block pt-2">Laboratory Testing Gates:</span>
                    <p className="text-[11px] text-slate-600">
                      {branchData.four_year_plan[0].semesters[0].labs.join(' • ')}
                    </p>
                  </div>

                  {/* Deliverable & Competency */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-800 block">Hardware / Prototype Deliverable:</span>
                      <p className="text-[11px] text-emerald-950 font-medium mt-0.5">
                        Verification of Thevenin/Norton Theorems on Breadboard with Dual-Trace DSO & DC Bench Supply.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-900">
                      <strong>Competency Gate:</strong> Master KVL/KCL, AC Phasors, Resonance & Steady-State Responses.
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOW ARROW 1 -> 2 */}
              <div className="flex justify-center items-center py-1">
                <div className="flex items-center space-x-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[11px] font-mono border border-slate-200 shadow-2xs">
                  <ArrowDown className="h-3.5 w-3.5 text-brand-600 animate-bounce" />
                  <span>Pipeline Flow: Network Theorems Feed Physical Electromagnetic Machinery</span>
                </div>
              </div>

              {/* PHASE 02 */}
              <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-5 sm:p-6 shadow-xs space-y-4 relative hover:border-amber-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white font-black text-xs">
                      02
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Phase 02: Electromagnetic Energy & Rotating Core Machines Bus (Year 2)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Faraday&apos;s Laws, DC Motors/Generators, Transformers, 3-Phase Induction & Synchronous Machines
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                    Prerequisite: Circuit Analysis & Maxwell EMF Equations
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Core Modules */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Core Architecture Modules:</span>
                    <ul className="text-xs text-slate-700 space-y-1 pl-3 list-disc">
                      {branchData.four_year_plan[1].semesters[0].core_subjects.slice(0, 3).map((sub, idx) => (
                        <li key={idx} className="font-medium">{sub}</li>
                      ))}
                      {branchData.four_year_plan[1].semesters[1].core_subjects.slice(0, 2).map((sub, idx) => (
                        <li key={`sem2-${idx}`} className="font-medium">{sub}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Toolchains */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block">Simulation Toolchains:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['MATLAB / Simulink (Simscape)', 'Ansys Maxwell (FEA)', 'PSpice / Multisim', 'Proteus Design Suite'].map(tool => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-950 text-[10px] font-mono font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-amber-800 block pt-2">Laboratory Testing Gates:</span>
                    <p className="text-[11px] text-slate-600">
                      {branchData.four_year_plan[1].semesters[0].labs.join(' • ')}
                    </p>
                  </div>

                  {/* Deliverable & Competency */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-900 block">Hardware / Prototype Deliverable:</span>
                      <p className="text-[11px] text-amber-950 font-medium mt-0.5">
                        Open-Circuit & Short-Circuit Pre-determination of Transformer Efficiency; DC Shunt Motor 3-Point Starter Speed Rig.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-200 text-[11px] text-amber-900">
                      <strong>Competency Gate:</strong> Magnetic Circuit Sizing, Armature Reaction, Rotating Magnetic Field (RMF) Synchronization.
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOW ARROW 2 -> 3 */}
              <div className="flex justify-center items-center py-1">
                <div className="flex items-center space-x-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[11px] font-mono border border-slate-200 shadow-2xs">
                  <ArrowDown className="h-3.5 w-3.5 text-brand-600 animate-bounce" />
                  <span>Pipeline Flow: Machine Dynamics Feed Semiconductor Converters & Linear Feedback Control</span>
                </div>
              </div>

              {/* PHASE 03 */}
              <div className="bg-white rounded-3xl border-2 border-purple-200/90 p-5 sm:p-6 shadow-xs space-y-4 relative hover:border-purple-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white font-black text-xs">
                      03
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Phase 03: Power Converter Processing & Linear Control Core (Year 3)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Power Electronics (MOSFET/IGBT Converters), Power Systems Analysis, PID Controllers & Microcontrollers
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl">
                    Prerequisite: AC Machines & Laplace Transform Stability
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Core Modules */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Core Architecture Modules:</span>
                    <ul className="text-xs text-slate-700 space-y-1 pl-3 list-disc">
                      {branchData.four_year_plan[2].semesters[0].core_subjects.map((sub, idx) => (
                        <li key={idx} className="font-medium">{sub}</li>
                      ))}
                      {branchData.four_year_plan[2].semesters[1].core_subjects.slice(0, 2).map((sub, idx) => (
                        <li key={`sem3-${idx}`} className="font-medium">{sub}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Toolchains */}
                  <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-purple-800 block">Simulation Toolchains:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['ETAP (Load Flow & Faults)', 'PSCAD Transients', 'Keil uVision (ARM)', 'Simulink Control Design'].map(tool => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-950 text-[10px] font-mono font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-purple-800 block pt-2">Laboratory Testing Gates:</span>
                    <p className="text-[11px] text-slate-600">
                      {branchData.four_year_plan[2].semesters[0].labs.join(' • ')}
                    </p>
                  </div>

                  {/* Deliverable & Competency */}
                  <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-purple-900 block">Hardware / Prototype Deliverable:</span>
                      <p className="text-[11px] text-purple-950 font-medium mt-0.5">
                        Closed-Loop DC-DC Buck/Boost Converter with PWM Microcontroller Gate Driver & Current Feedback Protection.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-purple-200 text-[11px] text-purple-900">
                      <strong>Competency Gate:</strong> Root Locus / Bode Stability, Inverter Harmonic THD Filter Design, Power Grid Load Flow.
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOW ARROW 3 -> 4 */}
              <div className="flex justify-center items-center py-1">
                <div className="flex items-center space-x-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[11px] font-mono border border-slate-200 shadow-2xs">
                  <ArrowDown className="h-3.5 w-3.5 text-brand-600 animate-bounce" />
                  <span>Pipeline Flow: Converter Topology Integrates into Smart Grid, EV Powertrains & Industrial SCADA</span>
                </div>
              </div>

              {/* PHASE 04 */}
              <div className="bg-white rounded-3xl border-2 border-emerald-200/90 p-5 sm:p-6 shadow-xs space-y-4 relative hover:border-emerald-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs">
                      04
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Phase 04: Industrial Automation, EV & Smart Grid Specialization Engine (Year 4)
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Electric Vehicle Drivetrains, Battery Management Systems (BMS), PLC / SCADA Automation & Capstone Thesis
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    Prerequisite: Power Converters, Grid Faults & Microcontrollers
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Core Modules */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Core Architecture Modules:</span>
                    <ul className="text-xs text-slate-700 space-y-1 pl-3 list-disc">
                      {branchData.four_year_plan[3].semesters[0].core_subjects.map((sub, idx) => (
                        <li key={idx} className="font-medium">{sub}</li>
                      ))}
                      <li className="font-medium">Industry Internship & Capstone Project Evaluation</li>
                    </ul>
                  </div>

                  {/* Toolchains */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block">Simulation Toolchains:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Siemens TIA Portal', 'DIgSILENT PowerFactory', 'Simscape Battery & Driveline', 'KiCad PCB Multi-layer'].map(tool => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-950 text-[10px] font-mono font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block pt-2">Laboratory Testing Gates:</span>
                    <p className="text-[11px] text-slate-600">
                      {branchData.four_year_plan[3].semesters[0].labs.join(' • ')}
                    </p>
                  </div>

                  {/* Deliverable & Competency */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-900 block">Capstone Project Deliverable:</span>
                      <p className="text-[11px] text-emerald-950 font-medium mt-0.5">
                        {branchData.featured_projects[2]?.title || 'Complete EV Battery Management System (BMS) with CAN Bus & Active Cell Balancing'}: {branchData.featured_projects[2]?.description.slice(0, 110)}...
                      </p>
                    </div>
                    <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-900">
                      <strong>Competency Gate:</strong> Complete Production Sizing, SCADA Integration, Autonomous Fault Isolation.
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOW ARROW 4 -> 5 */}
              <div className="flex justify-center items-center py-1">
                <div className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[11px] font-mono shadow-md">
                  <ArrowDown className="h-4 w-4 text-emerald-400 animate-bounce" />
                  <span>Architecture Output Demux: 4 High-Growth Career Placement Gateways</span>
                </div>
              </div>

              {/* PHASE 05: CAREER GATEWAYS DEMUX */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-5 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-white font-black text-xs">
                      05
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        Phase 05: Output Career Architecture & Industry Placement Gateways
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {branchData.name} graduates demux into 4 distinct, lucrative national and international technical pathways.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-3 py-1 rounded-xl">
                    Peak CTC: {branchData.highest_package}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Track 1: PSUs & GATE */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        Track A: PSUs & GATE
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Central PSUs & Power Utilities</h5>
                    <p className="text-[11px] text-slate-300">
                      Executive Trainee in PGCIL, NTPC, BHEL, ISRO, NPCIL, and State TRANSCO/GENCO.
                    </p>
                    <div className="pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {branchData.psu_recruiters.slice(0, 4).map(c => (
                          <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                            {c.split('(')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Track 2: EV & Power Electronics */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                        Track B: EV & Power Tech
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white">Electric Vehicles & Grid MNCs</h5>
                    <p className="text-[11px] text-slate-300">
                      BMS Design Engineer, Inverter R&D, Motor Drive Specialist, Renewable Grid Specialist.
                    </p>
                    <div className="pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {['Schneider', 'Tesla', 'Ather Energy', 'ABB Group', 'Bosch'].map(c => (
                          <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Track 3: Industrial Automation & Robotics */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                        Track C: Automation & IoT
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white">PLC / SCADA & Robotics</h5>
                    <p className="text-[11px] text-slate-300">
                      Industrial Automation Engineer, Embedded Hardware Designer, Substation Automation Engineer.
                    </p>
                    <div className="pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {['Siemens', 'Honeywell', 'Rockwell', 'L&T Electrical'].map(c => (
                          <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Track 4: Software & Tech Product */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                        Track D: Tech & Software
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white">High-Growth Tech / SDE</h5>
                    <p className="text-[11px] text-slate-300">
                      C++ Firmware Engineer, Data Pipelines, Algorithmic Optimization, Cloud Integration.
                    </p>
                    <div className="pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-mono">Recruiters:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {['TCS Digital', 'Cognizant GenC', 'Infosys DSE', 'Product MNCs'].map(c => (
                          <span key={c} className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-300 font-semibold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: 4-YEAR SEMESTER-BY-SEMESTER TIMELINE                              */}
        {/* ========================================================================= */}
        {activeViewMode === 'semesters' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  4-Year Semester-by-Semester Academic & Lab Syllabus
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">160 Total Credits • R23 Regulation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branchData.four_year_plan.map(yearPlan => (
                <div
                  key={yearPlan.year}
                  className="bg-slate-50/70 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                        {yearPlan.stage_name}
                      </span>
                      <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                        {yearPlan.certification}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{yearPlan.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{yearPlan.theme}</p>
                    </div>

                    {/* Semesters inside Year */}
                    <div className="space-y-3 pt-2">
                      {yearPlan.semesters.map(sem => (
                        <div
                          key={sem.sem_number}
                          className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">{sem.sem_name}</span>
                          </div>

                          {/* Core subjects */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Core Subjects:</span>
                            <ul className="text-xs text-slate-700 space-y-1 pl-3 list-disc">
                              {sem.core_subjects.map((sub, idx) => (
                                <li key={idx} className="leading-snug">{sub}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Labs */}
                          <div className="pt-1">
                            <span className="text-[10px] font-bold uppercase text-brand-600 block">Practical Labs:</span>
                            <p className="text-[11px] text-slate-600 leading-snug">
                              {sem.labs.join(' • ')}
                            </p>
                          </div>

                          {/* Milestone */}
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                            <strong className="text-slate-800">Target Outcome:</strong> {sem.key_milestone}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Year Tools */}
                  <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Tools to Master:</span>
                    {yearPlan.tools_to_learn.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono text-[10px] font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: PLACEMENTS & RECRUITERS MATRIX                                    */}
        {/* ========================================================================= */}
        {activeViewMode === 'placements' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Recruiters Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PSU Recruiters */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-brand-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Top Public Sector Undertakings (PSUs)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Direct recruiting through GATE Examination (Scores above 650/1000). Executive Engineer Trainee posts with central DA and allowances.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {branchData.psu_recruiters.map(psu => (
                    <span
                      key={psu}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs"
                    >
                      {psu}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corporate Recruiters */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Tier-1 Corporate & MNC Recruiters
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Annual campus and off-campus placements for Core Design, Simulation R&D, and Power Electronics Engineers.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {branchData.corporate_recruiters.map(corp => (
                    <span
                      key={corp}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs"
                    >
                      {corp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Layers className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Tiered Engineering Projects Portfolio
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {branchData.featured_projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            proj.tier === 'Beginner'
                              ? 'bg-blue-100 text-blue-800'
                              : proj.tier === 'Intermediate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {proj.tier} Tier
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {proj.tools.map((t, tidx) => (
                        <span key={tidx} className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Exams */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                  National Competitive Gateways
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Exams Every {branchData.short_name} Student Must Target
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {branchData.competitive_exams.map((exam, idx) => (
                  <div key={idx} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-brand-300 block">{exam.exam_name}</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{exam.description}</p>
                    <div className="text-[10px] text-slate-400 font-semibold pt-1">
                      Eligibility: {exam.eligibility_timing}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Document Preview Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <FileText className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {previewPdfTitle || 'Official Syllabus Blueprint'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {previewPdfUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={previewPdfUrl}
                  download={previewPdfUrl.split('/').pop() || 'syllabus.pdf'}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center space-x-1"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <a
                  href={previewPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center space-x-1"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>

                <button
                  onClick={() => {
                    setPreviewPdfUrl(null);
                    setPreviewPdfTitle(null);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF Viewer */}
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={`${previewPdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={previewPdfTitle || 'Syllabus Preview'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
