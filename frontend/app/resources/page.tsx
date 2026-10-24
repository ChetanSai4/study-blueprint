'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  FileText,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Check
} from 'lucide-react';
import { api } from '@/lib/api';
import { EducationalResource } from '@/types';

const STAGES = [
  { id: 'class_9', label: 'Class 9 (Secondary School)', badge: 'NCERT / CBSE / State' },
  { id: 'class_10', label: 'Class 10 (Secondary Board)', badge: 'Board Year' },
  { id: 'intermediate', label: 'Intermediate (+2 MPC / BiPC)', badge: 'Junior College' },
  { id: 'diploma', label: 'Diploma / Polytechnic', badge: 'Technical Diploma' },
  { id: 'btech_1', label: 'BTech 1st Year (Sem 1-1 / 1-2)', badge: 'Engineering' }
];

export default function ResourcesPage() {
  const [currentStage, setCurrentStage] = useState<string>('class_9');
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read stage from localStorage if set
    const saved = typeof window !== 'undefined' ? localStorage.getItem('study_blueprint_stage') : null;
    if (saved) {
      setCurrentStage(saved);
    }

    async function loadResources() {
      try {
        const data = await api.get<EducationalResource[]>('/resources');
        if (data) {
          setResources(data);
        }
      } catch (err) {
        console.error('Resource fetch error', err);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, []);

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('study_blueprint_stage', stageId);
    }
  };

  // Strictly filter resources by selected stage to prevent cross-module contamination
  const filteredResources = resources.filter(res => {
    // Stage check
    if (currentStage === 'class_9' || currentStage === 'class_10') {
      const isSchool = res.education_level_code === 'school' || res.branch_code === 'class_9' || res.branch_code === 'class_10';
      if (!isSchool) return false;
    } else if (currentStage === 'btech_1') {
      const isBtech = res.education_level_code === 'btech' || res.branch_code === 'cse' || res.branch_code === 'aiml';
      if (!isBtech) return false;
    } else if (currentStage === 'intermediate') {
      const isInter = res.education_level_code === 'intermediate' || res.branch_code === 'mpc';
      if (!isInter) return false;
    } else if (currentStage === 'diploma') {
      const isDiploma = res.education_level_code === 'diploma' || res.branch_code === 'cme';
      if (!isDiploma) return false;
    }

    // Type filter
    if (selectedType && res.resource_type !== selectedType) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.education_level_code.toLowerCase().includes(q) ||
        (res.subject_name && res.subject_name.toLowerCase().includes(q))
      );
    }

    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-center space-x-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="h-4 w-4" />
            <span>Dedicated Section 3: Study Resources</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Resources, Syllabi & Question Papers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official curriculum blueprints, verified formula sheets, and solved model examination papers categorized strictly by academic class.
          </p>
        </div>

        {/* Academic Stage Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-brand-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Your Academic Class / Level:
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {STAGES.map(stage => {
              const isSelected = currentStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{stage.label}</span>
                  {isSelected && <Check className="h-3 w-3 text-brand-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Resource Type Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'All Resources', val: '' },
                { label: 'Syllabus & Blueprints', val: 'syllabus' },
                { label: 'Formula Sheets & Notes', val: 'formula_sheet' },
                { label: 'Model Papers & Tests', val: 'model_paper' }
              ].map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setSelectedType(tab.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedType === tab.val
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by topic, chapter or paper..."
                className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      {res.resource_type.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-semibold">
                      {res.regulation || res.education_level_code.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{res.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 flex items-center space-x-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Source: {res.source_contributor}</span>
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center space-x-1">
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>Verified PDF Document</span>
                  </span>
                  <a
                    href={res.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download / View PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No resources found matching filter</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try switching your academic class or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSelectedType('');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
