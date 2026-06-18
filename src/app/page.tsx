import Link from 'next/link';
import { fetchFromMongo } from '@/lib/mongoEdge';

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
    <div className="min-h-screen bg-white">
      
      {/* Ticker / Marquee Section (Optional but adds official vibe) */}
      <div className="bg-slate-900 text-white overflow-hidden py-2 px-4 shadow-md flex">
        <span className="font-bold whitespace-nowrap mr-4 bg-red-600 px-2 py-0.5 rounded text-xs animate-pulse">LATEST</span>
        <div className="whitespace-nowrap overflow-hidden relative w-full">
           <div className="inline-block animate-[marquee_20s_linear_infinite]">
             {liveUpdates.slice(0, 5).map((u: any, i: number) => (
               <span key={i} className="mx-6 text-sm">
                 <Link href={`/update/${u._id}`} className="hover:text-blue-300 transition-colors">
                   {u.title}
                 </Link>
               </span>
             ))}
           </div>
        </div>
      </div>

      <div className="container mx-auto px-2 py-6 max-w-7xl">
        
        {liveUpdates.length === 0 ? (
          <div className="rounded border border-slate-200 bg-slate-50 p-12 text-center shadow-sm mt-8">
            <p className="text-lg text-slate-500 font-semibold">No updates found. Database might be empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Result */}
            <div className="border border-red-700 rounded-lg overflow-hidden shadow-sm flex flex-col bg-white">
              <div className="bg-red-700 text-white text-center py-2.5 font-bold text-xl uppercase tracking-wide border-b-4 border-red-900">
                Result
              </div>
              <ul className="flex-1 divide-y divide-slate-200">
                {results.length > 0 ? results.map((item: any) => (
                  <li key={item._id} className="group">
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2.5 px-4 text-[15px] font-semibold text-blue-700 hover:text-red-700 hover:bg-red-50 transition-colors leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 px-4 text-center text-sm text-slate-500">No results available</li>
                )}
              </ul>
            </div>

            {/* Column 2: Admit Card */}
            <div className="border border-emerald-700 rounded-lg overflow-hidden shadow-sm flex flex-col bg-white">
              <div className="bg-emerald-700 text-white text-center py-2.5 font-bold text-xl uppercase tracking-wide border-b-4 border-emerald-900">
                Admit Card
              </div>
              <ul className="flex-1 divide-y divide-slate-200">
                {admitCards.length > 0 ? admitCards.map((item: any) => (
                  <li key={item._id} className="group">
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2.5 px-4 text-[15px] font-semibold text-blue-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 px-4 text-center text-sm text-slate-500">No admit cards available</li>
                )}
              </ul>
            </div>

            {/* Column 3: Latest Jobs */}
            <div className="border border-blue-800 rounded-lg overflow-hidden shadow-sm flex flex-col bg-white">
              <div className="bg-blue-800 text-white text-center py-2.5 font-bold text-xl uppercase tracking-wide border-b-4 border-blue-950">
                Latest Jobs
              </div>
              <ul className="flex-1 divide-y divide-slate-200">
                {latestJobs.length > 0 ? latestJobs.map((item: any) => (
                  <li key={item._id} className="group">
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2.5 px-4 text-[15px] font-semibold text-blue-800 hover:text-blue-600 hover:bg-blue-50 transition-colors leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 px-4 text-center text-sm text-slate-500">No latest jobs available</li>
                )}
              </ul>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
