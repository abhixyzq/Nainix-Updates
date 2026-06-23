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
  title: 'Sarkari Result Admit Card 2026 - Download Exam Hall Tickets',
  description: 'Download the latest admit cards and hall tickets for SSC, UPSC, Railway, Police, and all government exams from Nainix Updates.',
  alternates: {
    canonical: '/admit-cards',
  },
  openGraph: {
    title: 'Sarkari Result Admit Card 2026 - Download Exam Hall Tickets',
    description: 'Download the latest admit cards and hall tickets for SSC, UPSC, Railway, Police, and all government exams.',
    url: '/admit-cards',
  },
};

export default async function AdmitCardsPage() {
  const admitCards = await getAdmitCards();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
        <div className="bg-[#0A192F] text-white p-5 border-b-4 border-orange-500 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center text-orange-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <h1 className="font-extrabold text-2xl md:text-3xl uppercase tracking-wide">Admit Cards</h1>
        </div>
        
        <div className="mb-6 px-6 md:px-10 prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed">
          <p>
            Welcome to the Nainix Updates <strong>Admit Cards</strong> section. An admit card (or hall ticket) is your most crucial document for entering the examination hall. We understand the anxiety students face when official websites crash during admit card releases. Here, we provide fast, secure, and direct links to download admit cards for all major examinations including UPSC, SSC (CGL, CHSL, MTS), Railway Boards (RRB NTPC, Group D), Banking (IBPS, SBI PO), and state-level exams. Keep your registration number and password handy to download your hall ticket without any delay.
          </p>
        </div>

        <ul className="flex-1">
          {admitCards.length > 0 ? admitCards.map((item: any) => (
            <li key={item._id} className="border-b border-slate-100 last:border-b-0">
              <Link 
                href={`/update/${item._id}`} 
                className="flex items-center justify-between py-4 px-6 hover:bg-slate-50 transition-all text-sm md:text-[15px] font-bold text-slate-800 hover:text-orange-600 group"
              >
                <span className="flex-1 pr-4 group-hover:underline decoration-orange-600 underline-offset-4 decoration-2">
                  {item.title}
                </span>
                <span className="text-xs font-bold uppercase text-slate-500 hidden sm:block whitespace-nowrap bg-slate-100 px-3 py-1 rounded-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          )) : (
            <li className="py-8 text-center text-slate-500 font-medium">No admit cards available right now.</li>
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
