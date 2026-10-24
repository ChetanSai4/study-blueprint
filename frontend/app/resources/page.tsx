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
  ChevronRight
} from 'lucide-react';
import { api } from '@/lib/api';
import { EducationalResource, EducationLevel, BoardOrUniversity, Branch, Subject } from '@/types';

export default function ResourcesPage() {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [boards, setBoards] = useState<BoardOrUniversity[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<number | ''>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Load catalog taxonomies
  useEffect(() => {
    async function initCatalog() {
      try {
        const [lvls, bds, brs] = await Promise.all([
          api.get<EducationLevel[]>('/catalog/education-levels'),
          api.get<BoardOrUniversity[]>('/catalog/boards-universities'),
          api.get<Branch[]>('/catalog/branches')
        ]);
        setEducationLevels(lvls);
        setBoards(bds);
        setBranches(brs);
      } catch (err) {
        console.error('Catalog load error', err);
      }
    }
    initCatalog();
  }, []);

  // Cascade load subjects
  useEffect(() => {
    async function loadSubs() {
      try {
        const subs = await api.get<Subject[]>('/catalog/subjects', {
          education_level: selectedLevel,
          board_or_university: selectedBoard,
          branch: selectedBranch,
          semester: selectedSemester || undefined
        });
        setSubjects(subs);
      } catch (err) {
        console.error('Subjects fetch error', err);
      }
    }
    loadSubs();
  }, [selectedLevel, selectedBoard, selectedBranch, selectedSemester]);

  // Fetch resources with strict filtering
  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await api.get<EducationalResource[]>('/resources', {
        education_level: selectedLevel,
        board_or_university: selectedBoard,
        branch: selectedBranch,
        semester: selectedSemester || undefined,
        subject_id: selectedSubject || undefined,
        resource_type: selectedType || undefined,
        search: searchQuery || undefined
      });
      setResources(data);
    } catch (err) {
      console.error('Resource fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedLevel, selectedBoard, selectedBranch, selectedSemester, selectedSubject, selectedType, searchQuery]);

  const toggleBookmark = async (id: string) => {
    try {
      const res = await api.post<{ bookmarked: boolean }>(`/resources/${id}/bookmark`);
      setResources(prev =>
        prev.map(r => (r.id === id ? { ...r, is_bookmarked: res.bookmarked } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const resourceTypes = [
    { label: 'All Resources', value: '' },
    { label: 'Syllabus', value: 'syllabus' },
    { label: 'Previous Papers (PYQ)', value: 'previous_paper' },
    { label: 'Model Papers', value: 'model_paper' },
    { label: 'Notes', value: 'notes' },
    { label: 'Formula Sheets', value: 'formula_sheet' }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Academic Resource Explorer</h1>
          <p className="text-xs text-slate-500 mt-1">
            Strict multi-tier filtered repository of verified university syllabi, model question papers, and study notes.
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          {/* Cascading Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Level */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Education Level</label>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-800"
              >
                <option value="">All Education Levels</option>
                {educationLevels.map(lvl => (
                  <option key={lvl.code} value={lvl.code}>{lvl.title}</option>
                ))}
              </select>
            </div>

            {/* Board / University */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Board / University</label>
              <select
                value={selectedBoard}
                onChange={e => setSelectedBoard(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-800"
              >
                <option value="">All Boards / Universities</option>
                {boards
                  .filter(b => b.education_level_code === selectedLevel)
                  .map(b => (
                    <option key={b.code} value={b.code}>{b.short_name}</option>
                  ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Branch / Stream</label>
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-800"
              >
                <option value="">All Branches</option>
                {branches
                  .filter(br => br.education_level_code === selectedLevel)
                  .map(br => (
                    <option key={br.code} value={br.code}>{br.short_name}</option>
                  ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Semester</label>
              <select
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value ? Number(e.target.value) : '')}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-800"
              >
                <option value="">All Semesters</option>
                <option value={1}>Semester 1 (1-1 / 2-1)</option>
                <option value={2}>Semester 2 (1-2 / 2-2)</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-800"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search bar & Type Chips */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-1.5">
              {resourceTypes.map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedType === t.value
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources by title or source..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs text-slate-500">Loading verified academic documents...</div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 uppercase tracking-wider">
                      <FileCheck2 className="h-3 w-3" />
                      <span>{res.resource_type.replace('_', ' ')}</span>
                    </span>
                    <button
                      onClick={() => toggleBookmark(res.id)}
                      className="p-1 text-slate-400 hover:text-brand-600 transition-colors"
                      aria-label="Bookmark resource"
                    >
                      {res.is_bookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-brand-600 fill-brand-100" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{res.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{res.education_level_code.toUpperCase()}</span>
                    {res.board_or_university_code && (
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{res.board_or_university_code.toUpperCase()}</span>
                    )}
                    {res.regulation && (
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{res.regulation}</span>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-emerald-600 font-semibold text-[11px]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{res.source_contributor}</span>
                  </div>

                  <a
                    href={res.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <BookOpen className="h-10 w-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-bold text-slate-800">No matching educational resources found</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your subject or semester filter to view available materials.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
