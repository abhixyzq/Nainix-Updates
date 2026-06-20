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
  title: 'Latest Government Jobs | Nainix Updates',
  description: 'Find all the latest government jobs, private jobs, and recruitment updates on Nainix Updates.',
  alternates: {
    canonical: '/latest-jobs',
  },
  openGraph: {
    title: 'Latest Government Jobs | Nainix Updates',
    description: 'Find all the latest government jobs, private jobs, and recruitment updates on Nainix Updates.',
    url: '/latest-jobs',
  },
};

export default async function LatestJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="rounded-2xl shadow-neu-flat p-6 md:p-10 flex flex-col bg-[#e6e9ef] mb-8">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neu-text/10">
          <div className="w-12 h-12 shadow-neu-pressed rounded-full flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-neu-text-heading uppercase tracking-wide">Latest Jobs</h1>
        </div>

        <ul className="flex-1 space-y-2">
          {jobs.length > 0 ? jobs.map((item: any) => (
            <li key={item._id}>
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:shadow-neu-pressed transition-all text-sm md:text-[15px] font-semibold text-neu-text-heading/90 hover:text-blue-600 border-b border-transparent hover:border-neu-text/5 group"
              >
                <span className="flex-1 pr-4 truncate group-hover:underline decoration-blue-600 underline-offset-4 decoration-2">
                  • {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-neu-text/60 hidden sm:block whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-neu-text font-medium">No jobs available right now.</li>
          )}
        </ul>
      </div>

      <div className="mb-12">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
