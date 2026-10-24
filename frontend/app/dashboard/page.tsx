'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import {
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Play,
  BookOpen,
  Youtube,
  Milestone,
  ArrowRight,
  Flame,
  AlertCircle,
  FileText
} from 'lucide-react';
import { api } from '@/lib/api';
import { AnalyticsDashboard, StudyPlan, User, StudentProfile } from '@/types';
import { formatMinutes } from '@/lib/utils';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsDashboard | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [u, prof, a, plan] = await Promise.all([
          api.get<User>('/auth/me').catch(() => null),
          api.get<StudentProfile>('/profile').catch(() => null),
          api.get<AnalyticsDashboard>('/analytics/dashboard').catch(() => null),
          api.get<StudyPlan>('/study-plans/current').catch(() => null)
        ]);
        if (u) setUser(u);
        if (prof) setProfile(prof);
        if (a) setAnalytics(a);
        if (plan) setStudyPlan(plan);
      } catch (err) {
        console.error('Dashboard load error', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Welcome back, {user?.display_name || 'Student'}! 👋
              </h1>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span>{analytics?.active_streak_days || 0} Day Streak</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Academic Stream:{' '}
              <span className="font-semibold text-slate-800">
                {profile?.education_level_code?.toUpperCase() || 'BTECH'} •{' '}
                {profile?.branch_code?.toUpperCase() || 'CSE'} • Semester{' '}
                {profile?.academic_year || 2}-{profile?.semester || 1} ({profile?.regulation || 'R22'})
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/study-tracker"
              className="flex items-center space-x-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-500 active:scale-95 transition-all"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Launch Study Timer</span>
            </Link>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today Actual vs Planned */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Today&apos;s Study Time</span>
              <Clock className="h-4 w-4 text-brand-600" />
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {analytics?.today_actual_minutes || 0}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / {analytics?.today_planned_minutes || 240} mins planned
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(
                      ((analytics?.today_actual_minutes || 0) /
                        Math.max(1, analytics?.today_planned_minutes || 240)) *
                        100
                    )
                  )}%`
                }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              {analytics?.planned_vs_actual_ratio
                ? `${Math.round(analytics.planned_vs_actual_ratio * 100)}% of daily target completed`
                : 'Ready for your first session today'}
            </p>
          </div>

          {/* Card 2: 7-Day Total Study Time */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Weekly Total (7 Days)</span>
              <TrendingUp className="h-4 w-4 text-teal-600" />
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatMinutes(analytics?.weekly_actual_minutes || 0)}
              </span>
            </div>
            <p className="mt-5 text-[11px] text-slate-500">
              Aggregated from verified study sessions stored in MongoDB.
            </p>
          </div>

          {/* Card 3: Overall Syllabus Completion */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Syllabus Completion</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {analytics?.overall_syllabus_completion_rate || 0}%
              </span>
              <span className="text-xs text-slate-500 font-medium">mastered</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics?.overall_syllabus_completion_rate || 0}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Calculated from topic status checklist across enrolled subjects.
            </p>
          </div>

          {/* Card 4: Upcoming Exams & Revisions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Pending Tasks & Exams</span>
              <Calendar className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {analytics?.pending_tasks_count || 0}
              </span>
              <span className="text-xs text-slate-500 font-medium">pending tasks</span>
            </div>
            <p className="mt-5 text-[11px] text-slate-500">
              {analytics?.pending_revisions_count || 0} topics flagged for spaced repetition.
            </p>
          </div>
        </div>

        {/* Section 2: Today's Deterministic Timetable */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today&apos;s Study Timetable</h2>
              <p className="text-xs text-slate-500">
                Proportionally distributed across your enrolled subjects ({studyPlan?.daily_target_minutes || 240} total minutes)
              </p>
            </div>
            <Link
              href="/study-planner"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
            >
              <span>Edit Allocations</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {studyPlan?.allocations && studyPlan.allocations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {studyPlan.allocations.map((alloc, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alloc.is_break
                      ? 'border-slate-200 bg-slate-50/70 text-slate-600'
                      : 'border-brand-200 bg-brand-50/40 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span>{alloc.time_slot}</span>
                    <span className="font-semibold">{alloc.planned_minutes} mins</span>
                  </div>
                  <h3 className="text-xs font-bold truncate">
                    {alloc.is_break ? alloc.subject_name : alloc.subject_name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {alloc.is_break ? 'Rest & Refresh' : alloc.subject_code}
                    </span>
                    {!alloc.is_break && (
                      <Link
                        href={`/study-tracker?subject=${alloc.subject_id}`}
                        className="text-[10px] font-bold text-brand-700 hover:underline flex items-center space-x-1"
                      >
                        <Play className="h-2.5 w-2.5 fill-brand-700" />
                        <span>Start</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              No active timetable found.{' '}
              <Link href="/study-planner" className="text-brand-600 font-bold underline">
                Generate your 240-minute timetable now
              </Link>.
            </div>
          )}
        </div>

        {/* Section 3: Subject-Wise Progress & 7-Day Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject-Wise Syllabus Progress */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Enrolled Subjects Progress</h2>
                <p className="text-xs text-slate-500">Track topic mastery and hours invested per subject</p>
              </div>
              <Link
                href="/progress"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                View Syllabus Checklist →
              </Link>
            </div>

            {analytics?.subjects_progress && analytics.subjects_progress.length > 0 ? (
              <div className="space-y-4">
                {analytics.subjects_progress.map(sub => (
                  <div key={sub.subject_id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/40">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{sub.subject_name}</span>
                        <span className="text-[10px] text-slate-500 ml-2 font-mono">({sub.subject_code})</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        {sub.syllabus_completed_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${sub.syllabus_completed_percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{sub.completed_topics} of {sub.total_topics} topics completed</span>
                      <span>Total Studied: {formatMinutes(sub.studied_minutes_total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-500">
                No subjects configured.{' '}
                <Link href="/profile" className="text-brand-600 font-bold underline">
                  Select your subjects in Profile Settings
                </Link>.
              </div>
            )}
          </div>

          {/* Quick Hub: Curated Videos & Career Shortcut */}
          <div className="space-y-4">
            {/* Quick Card 1: Curated YouTube Videos */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Youtube className="h-5 w-5 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">Curated Video Learning</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Watch verified, topic-level tutorials from educators like Abdul Bari and Neso Academy.
              </p>
              <Link
                href="/videos"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <span>Browse YouTube Library</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Quick Card 2: Academic Resources */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900">Academic Model Papers</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Download verified university question papers, syllabus copies, and formula sheets.
              </p>
              <Link
                href="/resources"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-brand-50 border border-brand-200 px-4 py-2.5 text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors"
              >
                <span>Access University Resources</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Quick Card 3: Career Roadmaps */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Milestone className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Career Roadmaps</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Connect your BTech courses to industry roles: Full Stack, AI/ML, Cloud DevOps with tiered capstones.
              </p>
              <Link
                href="/careers"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <span>Explore Career Paths</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
