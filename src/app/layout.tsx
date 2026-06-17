import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Use a clean, modern font for trustworthiness
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nainix Updates | Official Jobs & Exam Results',
  description: 'The trusted portal for Indian students and job seekers to find the latest education updates, admit cards, government jobs, and exam results.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
