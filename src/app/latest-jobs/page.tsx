export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { AdBanner } from '@/components/AdBanner';

async function getJobs() {
  try {
    const data = await fetchFromMongo('find', { sort: { createdAt: -1 }, limit: 200 });
    const updates = data?.documents || [];
    return updates.filter((u: any) => {
      const cat = u.category?.toLowerCase() || '';
      return !cat.includes('result') && !cat.includes('admit');
    }).map((doc: any) => ({ ...doc, _id: doc._id }));
  } catch (error) {
    return [];
  }
}

export const metadata = {
  title: 'Latest Govt Jobs 2026: 10th/12th Pass Sarkari Naukri Updates',
  description: 'Find all the latest government jobs, Sarkari Naukri, private jobs, and recruitment updates on Nainix Updates. Daily updates for SSC, UPSC, Police, Railway.',
  alternates: {
    canonical: '/latest-jobs',
  },
  openGraph: {
    title: 'Latest Govt Jobs 2026: 10th/12th Pass Sarkari Naukri Updates',
    description: 'Find all the latest government jobs, Sarkari Naukri, private jobs, and recruitment updates on Nainix Updates.',
    url: '/latest-jobs',
  },
};

export default async function LatestJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
        <div className="bg-[#0A192F] text-white p-5 border-b-4 border-blue-500 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl uppercase tracking-wide">Latest Jobs</h1>
        </div>
        
        <div className="mb-6 px-6 md:px-10 prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed">
          <p>
            Welcome to the Nainix Updates <strong>Latest Jobs</strong> portal. Are you preparing for a career in the government or public sector? Finding authentic and timely job notifications is the first step towards success. Here, we meticulously curate and update the latest vacancies across various departments, including SSC, UPSC, Indian Railways, Banking (IBPS, SBI), Defense, and State Police. Stay ahead of the competition by regularly checking this page for new recruitment drives, eligibility criteria, and direct application links.
          </p>
        </div>

        <ul className="flex-1">
          {jobs.length > 0 ? jobs.map((item: any) => (
            <li key={item._id} className="border-b border-slate-100 last:border-b-0">
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-4 px-6 hover:bg-slate-50 transition-all text-sm md:text-[15px] font-bold text-slate-800 hover:text-blue-700 group"
              >
                <span className="flex-1 pr-4 group-hover:underline decoration-blue-600 underline-offset-4 decoration-2">
                  {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-slate-500 hidden sm:block whitespace-nowrap bg-slate-100 px-3 py-1 rounded-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-slate-500 font-medium">No jobs available right now.</li>
          )}
        </ul>
      </div>
        </div>
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24">
            <AdBanner height="min-h-[600px]" />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
