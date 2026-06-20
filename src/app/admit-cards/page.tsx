export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { AdBanner } from '@/components/AdBanner';

async function getAdmitCards() {
  try {
    const data = await fetchFromMongo('find', { sort: { createdAt: -1 }, limit: 200 });
    const updates = data?.documents || [];
    return updates.filter((u: any) => {
      const cat = u.category?.toLowerCase() || '';
      return cat.includes('admit');
    }).map((doc: any) => ({ ...doc, _id: doc._id }));
  } catch (error) {
    return [];
  }
}

export const metadata = {
  title: 'Admit Cards | Nainix Updates',
  description: 'Download the latest admit cards and hall tickets for government exams on Nainix Updates.',
  alternates: {
    canonical: '/admit-cards',
  },
  openGraph: {
    title: 'Admit Cards | Nainix Updates',
    description: 'Download the latest admit cards and hall tickets for government exams on Nainix Updates.',
    url: '/admit-cards',
  },
};

export default async function AdmitCardsPage() {
  const admitCards = await getAdmitCards();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="rounded-2xl shadow-neu-flat p-6 md:p-10 flex flex-col bg-[#e6e9ef] mb-8">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neu-text/10">
          <div className="w-12 h-12 shadow-neu-pressed rounded-full flex items-center justify-center text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-neu-text-heading uppercase tracking-wide">Admit Cards</h1>
        </div>

        <ul className="flex-1 space-y-2">
          {admitCards.length > 0 ? admitCards.map((item: any) => (
            <li key={item._id}>
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:shadow-neu-pressed transition-all text-sm md:text-[15px] font-semibold text-neu-text-heading/90 hover:text-orange-600 border-b border-transparent hover:border-neu-text/5 group"
              >
                <span className="flex-1 pr-4 truncate group-hover:underline decoration-orange-600 underline-offset-4 decoration-2">
                  • {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-neu-text/60 hidden sm:block whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-neu-text font-medium">No admit cards available right now.</li>
          )}
        </ul>
      </div>

      <div className="mb-12">
        <AdBanner height="min-h-[120px]" />
      </div>
    </div>
  );
}
