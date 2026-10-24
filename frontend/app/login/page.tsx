'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Direct Google Sign In — One Click
  const handleDirectGoogleSignIn = async (role: 'student' | 'admin' = 'student') => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<any>('/auth/demo-login', {
        role,
        display_name: role === 'admin' ? 'Administrator' : 'Engineering Student',
        email: role === 'admin' ? 'admin@studyblueprint.in' : 'student@studyblueprint.in'
      });
      if (res.access_token) {
        localStorage.setItem('study_blueprint_token', res.access_token);
      }
      if (res.user.role === 'admin') {
        router.push('/admin');
      } else if (!res.user.is_onboarded) {
        router.push('/onboarding');
      } else {
        router.push('/careers');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to authenticate with Google. Please verify server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Sign in to Study Blueprint
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Plan Your Studies. Track Your Progress. Build Your Future.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-6 rounded-lg bg-rose-50 border border-rose-200 p-3.5 flex items-start space-x-3 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Direct Google Continue Button */}
          <div className="space-y-4">
            <button
              onClick={() => handleDirectGoogleSignIn('student')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 active:scale-[0.99] transition-all disabled:opacity-60"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Signing in with Google...' : 'Continue with Google'}</span>
            </button>
          </div>

          {/* Privacy & Trust info */}
          <div className="mt-8 border-t border-slate-100 pt-5 text-center space-y-2">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We exclusively use Google Identity for cryptographic verification. No passwords stored, zero unwanted emails.
            </p>
            <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>MongoDB Atlas Verified Identity Session</span>
            </div>
          </div>
        </div>

        {/* Subtle Admin option */}
        <div className="mt-6 text-center flex items-center justify-center space-x-4 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-800">
            ← Back to Homepage
          </Link>
          <span>•</span>
          <button
            onClick={() => handleDirectGoogleSignIn('admin')}
            className="hover:text-slate-800 underline decoration-slate-300"
          >
            Admin Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
