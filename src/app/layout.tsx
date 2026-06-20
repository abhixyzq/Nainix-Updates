import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ConditionalNavbar, ConditionalFooter } from '@/components/ConditionalLayout';

// Use a clean, modern font for trustworthiness
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://update.nainix.me'),
  title: {
    default: 'Nainix Updates | Official Jobs & Exam Results',
    template: '%s | Nainix Updates',
  },
  description: 'The trusted portal for Indian students and job seekers to find the latest education updates, admit cards, government jobs, and exam results.',
  keywords: ['Government Jobs', 'Exam Results', 'Admit Cards', 'Latest Jobs', 'Sarkari Result', 'Nainix Updates', 'Education News'],
  authors: [{ name: 'Nainix Updates' }],
  openGraph: {
    title: 'Nainix Updates | Official Jobs & Exam Results',
    description: 'Find the latest education updates, admit cards, government jobs, and exam results.',
    url: 'https://update.nainix.me',
    siteName: 'Nainix Updates',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nainix Updates | Official Jobs & Exam Results',
    description: 'Find the latest education updates, admit cards, government jobs, and exam results.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
