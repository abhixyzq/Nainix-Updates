export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { AdBanner } from '@/components/AdBanner';

async function getResults() {
  try {
    const data = await fetchFromMongo('find', { sort: { createdAt: -1 }, limit: 200 });
    const updates = data?.documents || [];
    return updates.filter((u: any) => {
      const cat = u.category?.toLowerCase() || '';
      return cat.includes('result');
    }).map((doc: any) => ({ ...doc, _id: doc._id }));
  } catch (error) {
    return [];
  }
}

export const metadata = {
  title: 'Exam Results | Nainix Updates',
  description: 'Check the latest government exam results, cut-offs, and merit lists on Nainix Updates.',
  alternates: {
    canonical: '/results',
  },
  openGraph: {
    title: 'Exam Results | Nainix Updates',
    description: 'Check the latest government exam results, cut-offs, and merit lists on Nainix Updates.',
    url: '/results',
  },
};

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
        <div className="bg-[#0A192F] text-white p-5 border-b-4 border-green-500 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl uppercase tracking-wide">Exam Results</h1>
        </div>
        
        <div className="mb-6 px-6 md:px-10 prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed">
          <p>
            Welcome to the Nainix Updates <strong>Exam Results</strong> portal. The culmination of your hard work and dedication is finally here. We provide the fastest and most reliable links to check your results for a wide array of competitive examinations including UPSC Civil Services, SSC CGL/CHSL, IBPS PO/Clerk, Railway Recruitment Board (RRB), State PSCs, and various university or board exams. Say goodbye to confusing official websites and server crashes. We also provide insights into cut-off marks, merit lists, and the next steps in the selection process.
          </p>
        </div>

        <ul className="flex-1">
          {results.length > 0 ? results.map((item: any) => (
            <li key={item._id} className="border-b border-slate-100 last:border-b-0">
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-4 px-6 hover:bg-slate-50 transition-all text-sm md:text-[15px] font-bold text-slate-800 hover:text-green-600 group"
              >
                <span className="flex-1 pr-4 group-hover:underline decoration-green-600 underline-offset-4 decoration-2">
                  {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-slate-500 hidden sm:block whitespace-nowrap bg-slate-100 px-3 py-1 rounded-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-slate-500 font-medium">No results available right now.</li>
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
