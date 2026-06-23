import Link from 'next/link';
import { BookOpen, CalendarDays, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Career Guide | Nainix Updates',
  description: 'Read our latest articles on government job preparation, exam strategies, and career guidance. Get the best tips for SSC, Banking, and Railway exams.',
  alternates: {
    canonical: '/blog',
  },
};

const blogPosts = [
  {
    title: 'How to Prepare for SSC CGL 2026: Complete Strategy',
    slug: 'how-to-prepare-for-ssc-cgl',
    excerpt: 'A comprehensive step-by-step guide to crack the Staff Selection Commission Combined Graduate Level (SSC CGL) exam in 2026. Discover the best books, study plans, and daily routines.',
    date: 'June 20, 2026',
    category: 'Preparation Strategy'
  },
  {
    title: 'Top 10 Government Jobs in India After 12th',
    slug: 'top-10-govt-jobs-after-12th',
    excerpt: 'Just completed your 12th board exams? Explore the top 10 highest-paying and most secure government job opportunities available for 12th pass students.',
    date: 'June 21, 2026',
    category: 'Career Guide'
  },
  {
    title: 'Bank PO vs SSC CGL: Which is Better for Your Career?',
    slug: 'bank-po-vs-ssc-cgl',
    excerpt: 'Confused between Bank PO and SSC CGL? Compare salary, job profile, work-life balance, and promotions to make the right career choice.',
    date: 'June 22, 2026',
    category: 'Comparison'
  },
  {
    title: 'Ultimate Guide to Railway Recruitment Board (RRB) Exams',
    slug: 'rrb-exams-guide',
    excerpt: 'Everything you need to know about RRB NTPC, Group D, and ALP exams. Understand the syllabus, exam pattern, and physical tests required for Indian Railways jobs.',
    date: 'June 23, 2026',
    category: 'Exam Guide'
  },
  {
    title: 'How to Check Govt Job Results Fast and Safely',
    slug: 'how-to-check-results-fast',
    excerpt: 'Learn the quickest and most secure ways to check your competitive exam results online without falling for fake websites or dealing with server crashes.',
    date: 'June 24, 2026',
    category: 'Tips & Tricks'
  }
];

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A192F] mb-6 tracking-tight flex items-center justify-center gap-4 uppercase">
          <BookOpen className="h-10 w-10 text-blue-600" />
          Blog & Career Guide
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-bold">
          Expert articles, preparation strategies, and career guidance for Indian government jobs and competitive exams.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="group rounded-sm bg-white shadow-sm border border-slate-300 p-8 flex flex-col h-full hover:shadow-md hover:border-blue-500 transition-all duration-300"
          >
            <div className="mb-4 inline-block rounded-sm bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase self-start">
              {post.category}
            </div>
            
            <h2 className="text-xl font-bold text-[#0A192F] mb-4 group-hover:text-blue-600 transition-colors leading-snug group-hover:underline underline-offset-4">
              {post.title}
            </h2>
            
            <p className="text-[15px] font-medium text-slate-600 mb-6 flex-1 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-500">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                Read Article
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO Content Section at Bottom */}
      <div className="mt-20 rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12 text-center">
        <h2 className="text-2xl font-extrabold text-[#0A192F] mb-4 uppercase tracking-wider">Why Read the Nainix Updates Blog?</h2>
        <p className="text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed">
          Preparing for government exams like SSC, Banking, Railways, or State PCS requires more than just hard work; it requires a smart strategy. Our blog provides well-researched, deeply analyzed, and practical tips to help you navigate the complex world of competitive exams. From breaking down syllabus changes to offering daily study routines, we cover every aspect of exam preparation. Stay ahead of the competition by regularly following our expert career guidance.
        </p>
      </div>
    </div>
  );
}
