'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, BookOpen, Calendar, Award, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">STUDY <span className="text-brand-600">BLUEPRINT</span></span>
            <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-1">Academic Engine</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-brand-600 transition-colors">Features</Link>
          <Link href="/resources" className="hover:text-brand-600 transition-colors">Academic Library</Link>
          <Link href="/study-planner" className="hover:text-brand-600 transition-colors">Study Planner</Link>
          <Link href="/videos" className="hover:text-brand-600 transition-colors">YouTube Learning</Link>
          <Link href="/careers" className="hover:text-brand-600 transition-colors">Career Pathways</Link>
          <Link href="/#faq" className="hover:text-brand-600 transition-colors">FAQ</Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="flex items-center space-x-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-navy-800 active:scale-95 transition-all"
          >
            <span>Sign in with Google</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Features
          </Link>
          <Link
            href="/resources"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Academic Library
          </Link>
          <Link
            href="/study-planner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Study Planner
          </Link>
          <Link
            href="/videos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            YouTube Learning
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Career Pathways
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy-800"
          >
            Sign in with Google
          </Link>
        </div>
      )}
    </header>
  );
};
