import Link from 'next/link';
import { ArrowLeft, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'How to Prepare for SSC CGL 2026: Complete Strategy',
  description: 'A comprehensive step-by-step guide to crack the Staff Selection Commission Combined Graduate Level (SSC CGL) exam in 2026.',
  alternates: {
    canonical: '/blog/how-to-prepare-for-ssc-cgl',
  },
};

export default function SSCCGLGuide() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl">
      {/* Breadcrumbs / Back Link */}
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 rounded-sm bg-white border border-slate-300 shadow-sm px-6 py-2.5 text-sm font-bold text-[#0A192F] transition-all hover:bg-slate-50 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <div className="mb-10">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      {/* Hero Section */}
      <div className="mb-10 rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12 text-center">
        <div className="mb-6 inline-block rounded-sm bg-blue-50 border border-blue-200 px-6 py-2 text-xs font-extrabold tracking-widest uppercase text-blue-700">
          Preparation Strategy
        </div>
        <h1 className="mb-6 text-3xl font-extrabold leading-tight text-[#0A192F] md:text-5xl tracking-tight">
          How to Prepare for SSC CGL 2026: Complete Strategy
        </h1>
        <p className="text-sm font-bold text-slate-500 flex justify-center items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Published on: June 20, 2026
        </p>
      </div>

      {/* Article Content */}
      <article className="rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0A192F] prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-[#0A192F] prose-li:text-slate-700">
        <p className="text-lg font-medium">
          The Staff Selection Commission Combined Graduate Level (SSC CGL) is one of the most highly anticipated and competitive exams in India. Every year, millions of graduates appear for this exam to secure prestigious Group B and Group C posts in various ministries, departments, and organizations of the Government of India. If you are targeting SSC CGL 2026, starting early with a clear, strategic plan is your key to success.
        </p>

        <h2>1. Understand the Exam Pattern and Syllabus</h2>
        <p>
          Before diving into the books, you must have a crystal-clear understanding of the exam pattern. The SSC CGL is conducted in two tiers (Tier I and Tier II).
        </p>
        <ul>
          <li><strong>Tier I:</strong> Qualifying in nature. It consists of four sections: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. You have 60 minutes to attempt 100 questions.</li>
          <li><strong>Tier II:</strong> The merit-deciding phase. It tests your advanced knowledge in Mathematical Abilities, Reasoning, English Language, General Awareness, and Computer Knowledge.</li>
        </ul>

        <h2>2. Section-wise Preparation Strategy</h2>
        
        <h3>Quantitative Aptitude (Maths)</h3>
        <p>
          This section requires extensive practice. Start by clearing your basic concepts from NCERT books or specialized coaching materials. Once the basics are clear, memorize squares up to 30, cubes up to 20, and fractional values of percentages. Use shortcut tricks for faster calculation, but only after mastering the traditional methods. 
        </p>

        <h3>English Comprehension</h3>
        <p>
          English can be the highest-scoring section if you have a good reading habit.
        </p>
        <ul className="list-none pl-0">
          <li className="flex items-start gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>Grammar:</strong> Read Neetu Singh's 'Plinth to Paramount' or SP Bakshi for clearing grammar rules.</span>
          </li>
          <li className="flex items-start gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>Vocabulary:</strong> Learn 20-30 new words daily. 'Word Power Made Easy' by Norman Lewis is highly recommended.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
            <span><strong>Reading:</strong> Read an English newspaper daily (like The Hindu or Indian Express) to improve comprehension speed.</span>
          </li>
        </ul>

        <h3>General Intelligence & Reasoning</h3>
        <p>
          Reasoning is generally easier but can be time-consuming. You don't need many books for this; solving previous years' question (PYQ) papers is usually sufficient. Focus on weak topics like Syllogism, Blood Relations, and Number Series.
        </p>

        <h3>General Awareness (GK)</h3>
        <p>
          This is often the most unpredictable section. Divide it into Static GK (History, Polity, Geography, Science) and Current Affairs.
        </p>
        <ul>
          <li><strong>Static GK:</strong> Lucent's General Knowledge is the bible for this section.</li>
          <li><strong>Current Affairs:</strong> Read monthly magazines or watch daily current affairs videos. Focus on the last 8-10 months prior to the exam.</li>
        </ul>

        <h2>3. The Importance of Mock Tests and PYQs</h2>
        <p>
          You cannot clear SSC CGL without giving mock tests. After completing 50% of your syllabus, start giving one full-length mock test every weekend. Analyze your mistakes thoroughly. Which section took the most time? Which easy questions did you skip? 
        </p>
        <p>
          Furthermore, SSC tends to repeat question patterns. Solving the last 4-5 years of Previous Year Questions (PYQs) is absolutely mandatory. It gives you an exact idea of the difficulty level and the type of questions asked.
        </p>

        <h2>Conclusion</h2>
        <p>
          Consistency is the secret ingredient to cracking SSC CGL. Studying 6 hours daily for 6 months is far better than studying 14 hours a day for just one month. Stay away from distractions, maintain a positive attitude, and trust your preparation strategy. Good luck for SSC CGL 2026!
        </p>
      </article>

      <div className="mt-10">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
