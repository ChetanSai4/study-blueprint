'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Youtube,
  CheckSquare,
  Milestone,
  User,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Play
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
  const [collegeName, setCollegeName] = useState<string>('BTech Engineering');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
        // Fallback demo user
        setCurrentUser({
          id: 'demo-student',
          email: 'student@studyblueprint.in',
          display_name: 'BTech Student',
          role: 'student',
          account_status: 'active',
          is_onboarded: true
        });
      } finally {
        setLoading(false);
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

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Academic Resources', href: '/resources', icon: BookOpen },
    { name: 'Study Planner', href: '/study-planner', icon: Calendar },
    { name: 'Study Tracker', href: '/study-tracker', icon: Clock },
    { name: 'My Progress', href: '/progress', icon: TrendingUp },
    { name: 'YouTube Learning', href: '/videos', icon: Youtube },
    { name: 'Tasks & Revision', href: '/tasks', icon: CheckSquare },
    { name: 'Career Roadmaps', href: '/careers', icon: Milestone },
    { name: 'Profile & Settings', href: '/profile', icon: User },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ name: 'Admin Portal', href: '/admin', icon: ShieldAlert });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white min-h-screen sticky top-0 h-screen">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight">STUDY <span className="text-brand-600">BLUEPRINT</span></span>
              <span className="block text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Student OS</span>
            </div>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
            {currentUser?.display_name ? currentUser.display_name.charAt(0) : 'S'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-900 truncate">{currentUser?.display_name || 'BTech Student'}</p>
            <p className="text-[10px] text-slate-500 truncate" title={collegeName}>{collegeName}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-bold border-l-4 border-brand-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="text-xs text-slate-500 font-medium">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/study-tracker"
              className="flex items-center space-x-2 rounded-lg bg-brand-50 border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <Play className="h-3 w-3 fill-brand-700" />
              <span>Launch Study Timer</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">STUDY BLUEPRINT</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md text-slate-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
