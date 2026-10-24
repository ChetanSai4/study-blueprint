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
  { id: 'btech_1', label: 'BTech 1st Year (1-1 / 1-2)', desc: 'Core math, physics & C programming fundamentals' },
  { id: 'btech_2_3', label: 'BTech 2nd & 3rd Year', desc: 'Data structures, algorithms & domain specialization' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Practical hands-on technical foundation & ECET route' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC)', desc: 'Pre-engineering foundations & entrance examination prep' }
];

export default function CareersPage() {
  const [selectedStage, setSelectedStage] = useState('btech_1');
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareers() {
      try {
        const rList = await api.get<CareerRole[]>('/careers/roles');
        if (rList) {
          setRoles(rList);
          if (rList.length > 0) setSelectedRole(rList[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-center space-x-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="h-4 w-4" />
            <span>Dedicated Career Roadmaps Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Engineering & Tech Career Roadmaps
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Select your current academic stage and career goal to generate your semester-by-semester milestone roadmap.
          </p>
        </div>

        {/* STEP 1: Select Current Educational Stage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">1</span>
            <h2 className="text-sm font-bold text-slate-900">Step 1: Select Your Current Academic Stage</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EDUCATION_STAGES.map(stage => {
              const isSelected = selectedStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
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

        {/* STEP 2: Select Target Career Goal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
            <h2 className="text-sm font-bold text-slate-900">Step 2: Choose Your Target Career Goal</h2>
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

        {/* Generated Structured Roadmap */}
        {selectedRole && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-0.5 rounded-full">
                  Tailored For {EDUCATION_STAGES.find(s => s.id === selectedStage)?.label}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Industry Verified Pathway
                </span>
              </div>
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
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Frameworks & Tooling</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRole.frameworks_and_tools.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Core Concepts</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRole.core_skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs font-medium text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Milestone Roadmap */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Layers className="h-4 w-4 text-brand-600" />
                <span>Semester-by-Semester Progression Roadmap</span>
              </h3>

              <div className="space-y-3">
                {selectedRole.learning_roadmap.map((step, idx) => (
                  <div key={step.phase} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-600 text-white text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                      </div>
                      <span className="text-[11px] text-brand-600 font-mono font-semibold">
                        Recommended: {step.recommended_duration_weeks} Weeks
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {step.topics.map(t => (
                        <span key={t} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 shadow-2xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tiered Project Recommendations */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <FolderGit2 className="h-4 w-4 text-brand-600" />
                <span>Portfolio Milestone Projects</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedRole.projects.map(proj => {
                  const badgeColor =
                    proj.tier === 'beginner'
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : proj.tier === 'intermediate'
                      ? 'bg-brand-50 text-brand-700 border-brand-200'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200';
                  return (
                    <div key={proj.title} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between shadow-2xs">
                      <div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                          {proj.tier.replace('_', ' ')}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-2.5">{proj.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{proj.description}</p>
                      </div>
                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                        {proj.suggested_tech_stack.map(st => (
                          <span key={st} className="text-[9px] bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Internship Preparation Checklist */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Internship & Campus Placement Checklist</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedRole.internship_preparation_checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 p-2.5 rounded-lg border border-slate-100 bg-slate-50/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Academic Advisory: Study Blueprint career milestones are mapped directly to current industry hiring frameworks and university curricula. No third-party sponsorship or paid certifications required.
              </span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
