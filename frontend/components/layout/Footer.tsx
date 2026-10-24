import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">STUDY BLUEPRINT</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plan Your Studies. Track Your Progress. Build Your Future. A structured academic planning platform built for Indian students.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Free & Open Academic Content</span>
            </div>
          </div>

          {/* Academic Portals */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Academic Hierarchy</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/resources?level=btech" className="hover:text-brand-600">BTech / BE Engineering</Link></li>
              <li><Link href="/resources?level=diploma" className="hover:text-brand-600">Diploma / Polytechnic (SBTET)</Link></li>
              <li><Link href="/resources?level=intermediate" className="hover:text-brand-600">Intermediate MPC & BiPC</Link></li>
              <li><Link href="/resources?level=school" className="hover:text-brand-600">Secondary School (Class 6–10)</Link></li>
              <li><Link href="/resources?level=competitive" className="hover:text-brand-600">Competitive Entrance Exams</Link></li>
            </ul>
          </div>

          {/* Student Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Product Suite</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/study-planner" className="hover:text-brand-600">Daily Timetable Planner</Link></li>
              <li><Link href="/study-tracker" className="hover:text-brand-600">Precision Study Stopwatch</Link></li>
              <li><Link href="/videos" className="hover:text-brand-600">Curated YouTube Index</Link></li>
              <li><Link href="/careers" className="hover:text-brand-600">Interactive Career Roadmaps</Link></li>
              <li><Link href="/login" className="hover:text-brand-600">Student Sign In</Link></li>
            </ul>
          </div>

          {/* Policies & Disclaimers */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Academic Transparency</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Study Blueprint is an independent academic resource organizer. University syllabi, model papers, and educational YouTube videos remain the intellectual property of their respective creators and university authorities.
            </p>
            <p className="text-[11px] text-slate-400">
              Zero chatbots or generative AI gimmicks. Deterministic planning algorithms only.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Study Blueprint. Crafted for Indian student excellence.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-700 cursor-pointer">Academic Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
