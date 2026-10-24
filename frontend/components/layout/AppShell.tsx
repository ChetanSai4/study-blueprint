'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  Milestone,
  Calendar,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '@/lib/api';
import { User as UserType } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [collegeName, setCollegeName] = useState<string>('Sri Sivani College of Engineering');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const [user, profile] = await Promise.all([
          api.get<UserType>('/auth/me').catch(() => null),
          api.get<any>('/profile').catch(() => null)
        ]);
        if (user) setCurrentUser(user);
        if (profile?.college_name) {
          setCollegeName(profile.college_name);
        } else if (profile?.board_or_university_code) {
          setCollegeName(profile.board_or_university_code.toUpperCase());
        }
      } catch (err) {
        setCurrentUser({
          id: 'student-default',
          email: 'student@studyblueprint.in',
          display_name: 'Chetan Sai',
          role: 'student',
          account_status: 'active',
          is_onboarded: true
        });
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('study_blueprint_token');
    router.push('/login');
  };

  const navPortals = [
    {
      name: '1. Career Roadmaps',
      href: '/careers',
      icon: Milestone,
      active: pathname.startsWith('/careers')
    },
    {
      name: '2. Study Planner & Tracker',
      href: '/study-planner',
      icon: Calendar,
      active: pathname.startsWith('/study-planner') || pathname.startsWith('/study-tracker')
    },
    {
      name: '3. Study Resources',
      href: '/resources',
      icon: BookOpen,
      active: pathname.startsWith('/resources') || pathname.startsWith('/videos')
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* Sleek Modern Top Navigation (Apple / Linear style) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/careers" className="flex items-center space-x-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="h-5 w-5 text-brand-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-900 flex items-center space-x-1">
                  <span>STUDY BLUEPRINT</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                  Student Operating System
                </span>
              </div>
            </Link>

            {/* Desktop Portal Tabs */}
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200">
              {navPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.name}
                    href={portal.href}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      portal.active
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${portal.active ? 'text-brand-400' : 'text-slate-400'}`} />
                    <span>{portal.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            {/* Student Profile Pill */}
            <Link
              href="/profile"
              className={`hidden sm:flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                pathname === '/profile'
                  ? 'border-brand-500 bg-brand-50/60 text-brand-900 ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="h-6 w-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                {currentUser?.display_name ? currentUser.display_name.charAt(0) : 'S'}
              </div>
              <div className="text-left">
                <div className="font-semibold leading-tight text-slate-900 truncate max-w-[140px]">
                  {currentUser?.display_name || 'Chetan Sai'}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[140px]" title={collegeName}>
                  {collegeName}
                </div>
              </div>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
            {navPortals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.name}
                  href={portal.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    portal.active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{portal.name}</span>
                </Link>
              );
            })}

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <User className="h-4 w-4 text-slate-500" />
              <span>Profile & Settings</span>
            </Link>
          </div>
        )}
      </header>

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 Study Blueprint. High-performance learning architecture for Indian engineering students.</p>
          <div className="flex items-center space-x-4">
            <Link href="/careers" className="hover:text-slate-600">Career Roadmaps</Link>
            <Link href="/study-planner" className="hover:text-slate-600">Study Planner</Link>
            <Link href="/resources" className="hover:text-slate-600">Resources</Link>
            <Link href="/profile" className="hover:text-slate-600">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
