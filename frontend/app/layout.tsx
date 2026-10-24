import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Blueprint — Complete Academic Planning & Learning Platform',
  description: 'Plan Your Studies. Track Your Progress. Build Your Future. A structured academic platform for Indian students across School, Intermediate, Diploma, and BTech.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
