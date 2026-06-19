import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ConditionalNavbar, ConditionalFooter } from '@/components/ConditionalLayout';

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
      <head>
        {/* Google AdSense Verification Script (Raw HTML for Crawler) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6966911553012275"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-neu-light text-neu-text-heading antialiased transition-colors duration-300`}>
        <ConditionalNavbar />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        
        <ConditionalFooter />
      </body>
    </html>
  );
}
