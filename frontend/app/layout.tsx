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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
