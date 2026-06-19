export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { AdBanner } from '@/components/AdBanner';

// Connect to DB and fetch live data
async function getLatestUpdates() {
  try {
    // Fetch latest 50 updates to populate all columns
    const data = await fetchFromMongo('find', {
      sort: { createdAt: -1 },
      limit: 60
    });
    
    const updates = data?.documents || [];
    return updates.map((doc: any) => ({
      ...doc,
      _id: doc._id, 
    }));
  } catch (error) {
    console.error('Database connection failed:', error);
    return []; 
  }
}

export default async function HomePage() {
  const liveUpdates = await getLatestUpdates();

  // Categorize updates in memory
  const results = liveUpdates.filter((u: any) => u.category?.toLowerCase().includes('result'));
  const admitCards = liveUpdates.filter((u: any) => u.category?.toLowerCase().includes('admit'));
  const latestJobs = liveUpdates.filter((u: any) => {
    const cat = u.category?.toLowerCase() || '';
    return !cat.includes('result') && !cat.includes('admit');
  });

  return (
    <div className="min-h-screen bg-neu-light text-neu-text-heading font-sans transition-colors duration-300">
      
      {/* Neumorphic Top Section */}
      <div className="pt-6 pb-10 px-4 md:px-8 mb-10 rounded-b-[2.5rem] shadow-neu-flat">
        <div className="max-w-7xl mx-auto">
          
          {/* Pressed Ticker */}
          <div className="bg-neu-light shadow-neu-pressed rounded-full p-2 flex items-center mx-auto max-w-3xl mt-4">
             <div className="bg-neu-accent text-white font-bold px-5 py-2 rounded-full text-xs uppercase shadow-neu-flat-sm mr-3 z-10 whitespace-nowrap">
               Live Updates
             </div>
             <div className="overflow-hidden relative w-full rounded-r-full">
               <div className="inline-block animate-[marquee_50s_linear_infinite] text-neu-text whitespace-nowrap">
                 {liveUpdates.slice(0, 5).map((u: any, i: number) => (
                   <span key={i} className="mx-6 text-sm font-medium">
                     <Link href={`/update/${u._id}`} className="hover:text-neu-accent transition-colors">
                       • {u.title}
                     </Link>
                   </span>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Top AdSense Banner */}
      <div className="container mx-auto px-4 max-w-7xl mb-8">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl pb-16">
        
        {liveUpdates.length === 0 ? (
          <div className="rounded-3xl shadow-neu-pressed p-12 text-center max-w-2xl mx-auto mt-8">
            <div className="w-20 h-20 mx-auto shadow-neu-flat rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5e6687" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">No updates found</h2>
            <p className="text-neu-text">The database might be empty right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Result */}
            <div className="rounded-3xl shadow-neu-flat p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-neu-text-heading tracking-wide">Results</h3>
                <div className="w-10 h-10 shadow-neu-pressed rounded-full flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>
              <ul className="flex-1 space-y-4">
                {results.length > 0 ? results.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block p-4 rounded-2xl shadow-neu-flat-sm hover:shadow-neu-pressed transition-shadow text-[14px] font-semibold text-neu-text hover:text-neu-accent leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="p-4 shadow-neu-pressed rounded-2xl text-center text-sm text-neu-text">No results available</li>
                )}
              </ul>
            </div>

            {/* Column 2: Admit Card */}
            <div className="rounded-3xl shadow-neu-flat p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-neu-text-heading tracking-wide">Admit Cards</h3>
                <div className="w-10 h-10 shadow-neu-pressed rounded-full flex items-center justify-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <ul className="flex-1 space-y-4">
                {admitCards.length > 0 ? admitCards.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block p-4 rounded-2xl shadow-neu-flat-sm hover:shadow-neu-pressed transition-shadow text-[14px] font-semibold text-neu-text hover:text-neu-accent leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="p-4 shadow-neu-pressed rounded-2xl text-center text-sm text-neu-text">No admit cards available</li>
                )}
              </ul>
            </div>

            {/* Column 3: Latest Jobs */}
            <div className="rounded-3xl shadow-neu-flat p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-neu-text-heading tracking-wide">Latest Jobs</h3>
                <div className="w-10 h-10 shadow-neu-pressed rounded-full flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
              </div>
              <ul className="flex-1 space-y-4">
                {latestJobs.length > 0 ? latestJobs.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block p-4 rounded-2xl shadow-neu-flat-sm hover:shadow-neu-pressed transition-shadow text-[14px] font-semibold text-neu-text hover:text-neu-accent leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="p-4 shadow-neu-pressed rounded-2xl text-center text-sm text-neu-text">No latest jobs available</li>
                )}
              </ul>
            </div>

          </div>
        )}
      </div>

      {/* Bottom AdSense Banner */}
      <div className="container mx-auto px-4 max-w-7xl pb-12">
        <AdBanner height="min-h-[120px]" />
      </div>

    </div>
  );
}
