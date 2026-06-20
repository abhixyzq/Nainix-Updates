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
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="rounded-2xl shadow-neu-flat p-6 md:p-10 flex flex-col bg-[#e6e9ef] mb-8">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neu-text/10">
          <div className="w-12 h-12 shadow-neu-pressed rounded-full flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-neu-text-heading uppercase tracking-wide">Exam Results</h1>
        </div>

        <ul className="flex-1 space-y-2">
          {results.length > 0 ? results.map((item: any) => (
            <li key={item._id}>
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:shadow-neu-pressed transition-all text-sm md:text-[15px] font-semibold text-neu-text-heading/90 hover:text-green-600 border-b border-transparent hover:border-neu-text/5 group"
              >
                <span className="flex-1 pr-4 truncate group-hover:underline decoration-green-600 underline-offset-4 decoration-2">
                  • {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-neu-text/60 hidden sm:block whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-neu-text font-medium">No results available right now.</li>
          )}
        </ul>
      </div>

      <div className="mb-12">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
