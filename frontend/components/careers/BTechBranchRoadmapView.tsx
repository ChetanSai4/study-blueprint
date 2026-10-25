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
  Target
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
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewPdfTitle, setPreviewPdfTitle] = useState<string | null>(null);

  const handleBranchSelect = (code: string) => {
    setCurrentBranch(code);
    if (onBranchChange) {
      onBranchChange(code);
    }
  };

  const branchData: BTechBranchRoadmap =
    BTECH_BRANCH_ROADMAPS[currentBranch] || BTECH_BRANCH_ROADMAPS['eee'];

  const BRANCH_TABS = [
    { id: 'eee', label: 'EEE (Electrical & Electronics)', icon: Zap, color: 'text-amber-500' },
    { id: 'ece', label: 'ECE (Electronics & Comm)', icon: Cpu, color: 'text-blue-500' },
    { id: 'cse', label: 'CSE (Computer Science)', icon: Code2, color: 'text-emerald-500' },
    { id: 'aiml', label: 'AI & Machine Learning', icon: Target, color: 'text-purple-500' },
    { id: 'mech', label: 'Mechanical Engineering', icon: Wrench, color: 'text-rose-500' },
    { id: 'civil', label: 'Civil Engineering', icon: Building2, color: 'text-cyan-500' }
  ];

  return (
    <div className="space-y-7 animate-in fade-in duration-200">
      {/* Branch Selector Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
              B.Tech Engineering Specializations
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
              Select Your Engineering Discipline / Branch:
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose your branch to view the complete 4-Year Academic Blueprint, semester-by-semester subjects, core toolchains, and PSU / corporate placements.
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
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/80 shadow-xs ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-4 w-4 ${tab.color}`} />
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{tab.label}</h4>
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
              B.Tech {branchData.short_name} Complete Blueprint
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
              {branchData.name}
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

        {/* 4-Year Semester-by-Semester Progression Timeline */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-brand-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                4-Year Semester-by-Semester Academic & Career Architecture
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">160 Total Credits</span>
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

        {/* Core Competencies & Industry Toolchains */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <Code2 className="h-4 w-4 text-brand-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Core Technical Competencies & Software Toolchains
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Discipline Theory & Systems</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {branchData.core_competencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Simulation & CAD Toolchains</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {branchData.simulation_tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-mono text-[11px]">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Programming & Hardware Protocols</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {branchData.programming_languages.map((lang, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span className="font-mono text-[11px]">{lang}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tiered Practical Projects */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-brand-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Tiered Practical Engineering Projects Portfolio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {branchData.featured_projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full inline-block ${
                    proj.tier === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : proj.tier === 'Intermediate'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {proj.tier} Level
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{proj.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{proj.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                  {proj.tools.map((t, tidx) => (
                    <span key={tidx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PSU & Corporate Recruiters + Competitive Exams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {/* Recruiters */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-1.5">
              <Briefcase className="h-4 w-4 text-brand-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Top PSU & Corporate Recruiters
              </h4>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Central Maharatna / Navratna PSUs:</span>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {branchData.psu_recruiters.join(' • ')}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Top Corporate & MNC Employers:</span>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {branchData.corporate_recruiters.join(' • ')}
              </p>
            </div>
          </div>

          {/* Competitive Exams */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center space-x-1.5">
              <Target className="h-4 w-4 text-brand-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Competitive Examinations & Career Gateways
              </h4>
            </div>

            <div className="space-y-2">
              {branchData.competitive_exams.map((ex, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{ex.exam_name}</strong>
                    <span className="text-[10px] text-brand-600 font-semibold">{ex.eligibility_timing}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{ex.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Document Preview Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <FileText className="h-5 w-5 text-brand-400" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Official University Syllabus & Blueprint Preview
                  </h3>
                  <p className="text-sm font-bold text-white line-clamp-1">
                    {previewPdfTitle || 'Official Academic Syllabus Copy'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewPdfUrl(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Body (Authentic Academic Sheet View) */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-center">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-extrabold tracking-widest text-brand-700 uppercase">
                    JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY GURAJADA VIZIANAGARAM
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                    SRI SIVANI COLLEGE OF ENGINEERING · AFFILIATED INSTITUTION
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Regulation: <span className="font-semibold text-slate-700">{branchData.regulation}</span> · Department of {branchData.short_name}
                  </p>
                </div>

                <div className="text-left space-y-3">
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Document Status</span>
                      <span className="font-bold text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Verified Official Academic Record</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Course Code</span>
                      <span className="font-mono text-[11px] text-slate-600 font-bold">{branchData.syllabus_code}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Prescribed 5-Unit Curricular Structure & Examination Matrix
                    </h5>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
                      <p>
                        <strong>Unit I - Principles & Fundamental Theorems:</strong> Foundations, core scientific laws, boundary limits, and mathematical formulations.
                      </p>
                      <p>
                        <strong>Unit II - Applied Analysis & Computational Reductions:</strong> Analytical reductions, matrix operations, transform methods, and equilibrium states.
                      </p>
                      <p>
                        <strong>Unit III - Laboratory & Experimental Testing Rigs:</strong> Standard university test protocols, error bounds, and simulation verifications.
                      </p>
                      <p>
                        <strong>Unit IV - Industrial Standards & Codes:</strong> Safety guidelines, IEEE / ASME / IS standards, and design workflows.
                      </p>
                      <p>
                        <strong>Unit V - Semester End Examination Blueprint:</strong> Part A (10 Short Answer Questions, 20 Marks) + Part B (5 Units Internal Choice, 50 Marks). Total: 70 Marks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono">
                Source: {previewPdfUrl.split('/').pop()}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </button>
                <a
                  href={previewPdfUrl}
                  download={previewPdfUrl.split('/').pop()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </a>
                <a
                  href={previewPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Native PDF in New Tab</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
