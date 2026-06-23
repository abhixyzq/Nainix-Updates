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
    default: 'Sarkari Result 2026, Latest Govt Jobs, Admit Card & Exam Updates',
    template: '%s | Sarkari Result & Govt Jobs',
  },
  description: 'Find the latest Sarkari Result, Sarkari Naukri updates, Govt Jobs, Admit Cards, Answer Keys, and Syllabus for SSC, UPSC, Railway, Banking, and State Police exams 2026.',
  keywords: ['Sarkari Result', 'Sarkari Naukri', 'Latest Govt Jobs', 'Admit Card', 'Sarkari Result 2026', 'Exam Results', 'SSC', 'Railway', 'UPSC', 'Nainix Updates'],
  authors: [{ name: 'Nainix Updates' }],
  openGraph: {
    title: 'Sarkari Result 2026, Latest Govt Jobs, Admit Card & Exam Updates',
    description: 'Find the latest Sarkari Result, Sarkari Naukri updates, Govt Jobs, Admit Cards, Answer Keys, and Syllabus for SSC, UPSC, Railway, Banking, and State Police exams 2026.',
    url: 'https://update.nainix.me',
    siteName: 'Sarkari Result by Nainix Updates',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarkari Result 2026, Latest Govt Jobs, Admit Card & Exam Updates',
    description: 'Find the latest Sarkari Result, Sarkari Naukri updates, Govt Jobs, Admit Cards, Answer Keys, and Syllabus for 2026.',
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
        
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Nainix Updates",
              "alternateName": ["Sarkari Result", "Sarkari Naukri 2026", "Govt Jobs"],
              "url": "https://update.nainix.me",
              "description": "Find the latest Sarkari Result, Sarkari Naukri updates, Govt Jobs, and Admit Cards.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://update.nainix.me/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
