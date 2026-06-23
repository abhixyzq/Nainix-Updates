import Link from 'next/link';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { Metadata } from 'next';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Ultimate Guide to Railway Recruitment Board (RRB) Exams',
  description: 'Everything you need to know about RRB NTPC, Group D, and ALP exams. Understand the syllabus, exam pattern, and physical tests required for Indian Railways jobs.',
  alternates: {
    canonical: '/blog/rrb-exams-guide',
  },
};

export default function RRBExamsGuide() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl">
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

      <div className="mb-10 rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12 text-center">
        <div className="mb-6 inline-block rounded-sm bg-blue-50 border border-blue-200 px-6 py-2 text-xs font-extrabold tracking-widest uppercase text-blue-700">
          Exam Guide
        </div>
        <h1 className="mb-6 text-3xl font-extrabold leading-tight text-[#0A192F] md:text-5xl tracking-tight">
          Ultimate Guide to Railway Recruitment Board (RRB) Exams
        </h1>
        <p className="text-sm font-bold text-slate-500 flex justify-center items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Published on: June 23, 2026
        </p>
      </div>

      <article className="rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0A192F] prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-[#0A192F] prose-li:text-slate-700">
        <p className="text-lg font-medium">
          The Indian Railways is the backbone of India's transport infrastructure and one of the largest employers globally. Securing a job in the railways through the Railway Recruitment Board (RRB) is a dream for millions of Indian aspirants. RRB conducts massive recruitment drives for various technical and non-technical posts. In this guide, we demystify the major RRB exams: NTPC, Group D, and ALP.
        </p>

        <h2>1. RRB NTPC (Non-Technical Popular Categories)</h2>
        <p>
          RRB NTPC is perhaps the most sought-after railway exam for graduates and undergraduates. It recruits candidates for posts like Commercial Apprentice, Goods Guard, Traffic Assistant, Station Master, and Clerical roles.
        </p>
        <h3>Exam Pattern</h3>
        <ul>
          <li><strong>CBT 1 (Computer Based Test):</strong> A 90-minute test covering Mathematics, General Intelligence & Reasoning, and General Awareness. It is qualifying in nature.</li>
          <li><strong>CBT 2:</strong> Shortlisted candidates take this test, which follows a similar syllabus but with a higher difficulty level.</li>
          <li><strong>Skill Test:</strong> Depending on the post, candidates may have to pass a Typing Skill Test or a Computer Based Aptitude Test (CBAT).</li>
          <li><strong>Document Verification & Medical Exam:</strong> The final stage before appointment.</li>
        </ul>

        <h2>2. RRB Group D (Level 1 Posts)</h2>
        <p>
          RRB Group D is a massive recruitment drive aimed at filling entry-level positions like Track Maintainer Grade-IV, Helper/Assistant in various technical departments (Electrical, Mechanical, and S&T), and Assistant Pointsman. The minimum educational qualification is usually 10th pass or ITI.
        </p>
        <h3>Exam Pattern</h3>
        <ul>
          <li><strong>CBT:</strong> A single-stage Computer Based Test covering General Science, Mathematics, General Intelligence & Reasoning, and General Awareness.</li>
          <li><strong>PET (Physical Efficiency Test):</strong> Candidates must clear physical tasks. For male candidates, this typically involves lifting a 35 kg weight and running 100 meters in 2 minutes, plus a 1000-meter run in 4 minutes 15 seconds. Female candidates have slightly relaxed standards.</li>
        </ul>

        <h2>3. RRB ALP & Technician (Assistant Loco Pilot)</h2>
        <p>
          If you have a technical background (ITI, Diploma, or Degree in Engineering), the RRB ALP exam is an excellent opportunity. Assistant Loco Pilots assist the Loco Pilot in driving trains, while Technicians maintain the rolling stock and infrastructure.
        </p>
        <h3>Exam Pattern</h3>
        <ul>
          <li><strong>First Stage CBT:</strong> Tests basic Math, Reasoning, General Science, and Current Affairs.</li>
          <li><strong>Second Stage CBT:</strong> Divided into two parts. Part A is similar to CBT 1 but tougher. Part B tests knowledge specific to the candidate's chosen trade/engineering discipline.</li>
          <li><strong>CBAT:</strong> Only for ALP candidates. This aptitude test evaluates reaction time, concentration, and spatial reasoning.</li>
        </ul>

        <h2>Preparation Strategy for RRB Exams</h2>
        <p>
          The syllabus for RRB exams heavily emphasizes Mathematics and General Science (Physics, Chemistry, and Life Sciences up to the 10th standard level). Unlike SSC or Banking exams, English is completely absent from most RRB exams, which is a huge relief for candidates from regional language backgrounds.
        </p>
        <p>
          <strong>General Awareness:</strong> Focus heavily on Current Affairs (last 6-8 months), Indian Geography, and Railway-specific facts (longest route, new train launches like Vande Bharat, railway zones). 
        </p>
        <p>
          Mock tests are critical. RRB exams are known for tricky calculation-based math questions and repetitive science questions. Solving previous year's Group D and NTPC question papers will give you a significant edge over the competition.
        </p>

        <h2>Conclusion</h2>
        <p>
          A career in Indian Railways offers unparalleled job security, free travel passes, excellent medical facilities, and a decent salary. Stay updated with official RRB regional websites for notifications, prepare consistently, and focus on your physical fitness if you are targeting Group D or ALP posts.
        </p>
      </article>

      <div className="mt-10">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
