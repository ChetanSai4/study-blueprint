'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Milestone,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import { CareerPath, CareerRole } from '@/types';

export default function CareersPage() {
  const [pathways, setPathways] = useState<CareerPath[]>([]);
  const [roles, setRoles] = useState<CareerRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareers() {
      try {
        const [paths, rList] = await Promise.all([
          api.get<CareerPath[]>('/careers/pathways'),
          api.get<CareerRole[]>('/careers/roles')
        ]);
        setPathways(paths);
        setRoles(rList);
        if (rList.length > 0) setSelectedRole(rList[0]);
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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Indian Academic & Career Roadmaps
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bridge academic coursework across School, Intermediate, Diploma, and BTech into industry skills and milestone projects.
          </p>
        </div>

        {/* Academic Bridges Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-brand-600" />
            <span>Supported Educational Progression Bridges</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pathways.map(p => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded">
                  Academic Pathway
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">{p.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                  <span className="font-semibold text-slate-500">Key Entrance Exams:</span>
                  {p.entrance_exams.map(e => (
                    <span key={e} className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-700">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Roles Master-Detail Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-slate-700" />
              <span>Specialized Roles</span>
            </h2>

            <div className="space-y-2">
              {roles.map(r => {
                const isSelected = selectedRole?.role_code === r.role_code;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-500/30'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900">{r.title}</h3>
                      <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-brand-600' : 'text-slate-300'}`} />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{r.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Deep Dive Detail Card */}
          {selectedRole && (
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              {/* Role Header */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Career Profile</span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedRole.title}</h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedRole.summary}</p>
              </div>

              {/* Skills & Tools */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Core Skills & Competencies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.core_skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Programming Languages</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRole.programming_languages.map(l => (
                      <span key={l} className="px-2.5 py-1 rounded-lg bg-brand-50 text-xs font-bold text-brand-700 border border-brand-200">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Frameworks & Tooling</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRole.frameworks_and_tools.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Roadmap */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Structured Learning Roadmap</h3>
                <div className="space-y-3">
                  {selectedRole.learning_roadmap.map(step => (
                    <div key={step.phase} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-1">
                        <span>{step.title}</span>
                        <span className="text-[10px] text-brand-600 font-mono">{step.recommended_duration_weeks} Weeks</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {step.topics.map(t => (
                          <span key={t} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiered Project Recommendations */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Portfolio Milestone Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedRole.projects.map(proj => {
                    const badgeColor =
                      proj.tier === 'beginner'
                        ? 'bg-slate-100 text-slate-700'
                        : proj.tier === 'intermediate'
                        ? 'bg-brand-50 text-brand-700'
                        : 'bg-indigo-50 text-indigo-700';
                    return (
                      <div key={proj.title} className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
                        <div>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${badgeColor}`}>
                            {proj.tier.replace('_', ' ')}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-2">{proj.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{proj.description}</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                          {proj.suggested_tech_stack.map(st => (
                            <span key={st} className="text-[9px] bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 font-mono">
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Internship Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Internship Preparation Checklist</h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedRole.internship_preparation_checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
                <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Academic Disclaimer: Study Blueprint does not guarantee job placement or admissions. All skills, roadmaps, and salary perspectives represent current industry consensus and verified educational best practices.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
