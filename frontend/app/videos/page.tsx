'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  Youtube,
  Play,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ShieldCheck,
  X,
  Filter,
  Clock
} from 'lucide-react';
import { api } from '@/lib/api';
import { CuratedVideo, Subject } from '@/types';
import { formatSeconds } from '@/lib/utils';

export default function VideosPage() {
  const [videos, setVideos] = useState<CuratedVideo[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<CuratedVideo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initCatalog() {
      try {
        const subs = await api.get<Subject[]>('/catalog/subjects?branch=cse');
        setSubjects(subs);
      } catch (err) {
        console.error(err);
      }
    }
    initCatalog();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await api.get<CuratedVideo[]>('/videos', {
        subject_id: selectedSubject || undefined,
        language: selectedLanguage || undefined
      });
      setVideos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedSubject, selectedLanguage]);

  const toggleWatched = async (id: string) => {
    try {
      const res = await api.post<{ watched: boolean }>(`/videos/${id}/progress`);
      setVideos(prev =>
        prev.map(v => (v.id === id ? { ...v, is_watched: res.watched } : v))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBookmark = async (id: string) => {
    try {
      const res = await api.post<{ bookmarked: boolean }>(`/videos/${id}/bookmark`);
      setVideos(prev =>
        prev.map(v => (v.id === id ? { ...v, is_bookmarked: res.bookmarked } : v))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Curated YouTube Learning Library
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Topic-mapped video lectures from verified Indian and international educators.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            <span>100% Manually Verified Educational Links</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Subject Filter */}
          <div className="flex items-center space-x-3">
            <label className="text-xs font-bold text-slate-700 shrink-0">Filter by Subject:</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800"
            >
              <option value="">All Subjects</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          {/* Language filter tabs */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-medium text-slate-500 mr-2">Language:</span>
            {[
              { label: 'All', value: '' },
              { label: 'English', value: 'en' },
              { label: 'Telugu (తెలుగు)', value: 'te' },
              { label: 'Hindi (हिंदी)', value: 'hi' },
            ].map(lang => (
              <button
                key={lang.value}
                onClick={() => setSelectedLanguage(lang.value)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedLanguage === lang.value
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs text-slate-500">Loading verified video lectures...</div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map(v => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Thumbnail Header with Play Trigger */}
                <div
                  onClick={() => setActiveVideoModal(v)}
                  className="relative aspect-video bg-slate-900 cursor-pointer group flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  <div className="absolute h-12 w-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </div>
                  {v.duration_seconds && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono font-bold text-white">
                      {formatSeconds(v.duration_seconds)}
                    </span>
                  )}
                  {v.is_watched && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600/90 text-[10px] font-bold text-white flex items-center space-x-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Watched</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5">
                      <span className="font-bold text-slate-800">{v.channel_name}</span>
                      <span className="uppercase font-semibold tracking-wider text-brand-600">
                        {v.language.toUpperCase()} • {v.difficulty_level}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveVideoModal(v)}
                      className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-brand-600 cursor-pointer"
                    >
                      {v.title}
                    </h3>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleWatched(v.id)}
                      className={`flex items-center space-x-1 font-semibold text-[11px] ${
                        v.is_watched ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{v.is_watched ? 'Marked Watched' : 'Mark as Watched'}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleBookmark(v.id)}
                        className="p-1 text-slate-400 hover:text-brand-600"
                        aria-label="Bookmark Video"
                      >
                        {v.is_bookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-brand-600 fill-brand-100" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>

                      <a
                        href={v.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Youtube className="h-10 w-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-bold text-slate-800">No videos found for this filter</p>
            <p className="text-xs text-slate-500 mt-1">Reset your subject filter or select another language.</p>
          </div>
        )}

        {/* Embedded Video Player Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center space-x-2 truncate">
                  <Youtube className="h-4 w-4 text-rose-600" />
                  <span className="text-xs font-bold text-slate-900 truncate">{activeVideoModal.title}</span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Iframe player with error fallback */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtube_id}?autoplay=1`}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{activeVideoModal.channel_name}</p>
                  <p className="text-[11px] text-slate-500">{activeVideoModal.description}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => toggleWatched(activeVideoModal.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{activeVideoModal.is_watched ? 'Watched' : 'Mark Watched'}</span>
                  </button>

                  <a
                    href={activeVideoModal.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 text-xs font-bold text-white hover:bg-rose-500"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
