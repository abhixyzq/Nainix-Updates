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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300">
      
      {/* Premium Live Ticker Section */}
      <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800 mb-10 py-6 md:py-8">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-sm p-1.5 shadow-2xl shadow-blue-900/10 overflow-hidden mx-auto">
             
             {/* Live Badge */}
             <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold px-6 py-3 md:py-2.5 rounded-sm text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-red-600/20 flex items-center justify-center gap-3 z-10 shrink-0">
               <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
               </div>
               Trending Now
             </div>
             
             {/* Marquee Content */}
             <div className="overflow-hidden relative w-full flex-1 mt-2 md:mt-0 md:ml-4">
               {/* Left/Right Fade Gradient for Marquee to hide edges smoothly */}
               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/80 to-transparent z-10 hidden md:block"></div>
               <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900/80 to-transparent z-10 hidden md:block"></div>
               
               <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
                 {/* First Copy */}
                 <div className="flex items-center whitespace-nowrap py-2 md:py-0 pr-8">
                   {liveUpdates.slice(0, 5).map((u: any, i: number) => (
                     <span key={`orig-${i}`} className="mx-6 text-sm md:text-[15px] font-bold text-slate-200">
                       <Link href={`/update/${u._id}`} className="hover:text-white hover:underline underline-offset-4 decoration-blue-500 transition-all flex items-center gap-2">
                         <span className="text-yellow-500 text-xs">⚡</span>
                         {u.title}
                       </Link>
                     </span>
                   ))}
                 </div>
                 {/* Second Copy for continuous loop */}
                 <div aria-hidden="true" className="flex items-center whitespace-nowrap py-2 md:py-0 pr-8">
                   {liveUpdates.slice(0, 5).map((u: any, i: number) => (
                     <span key={`dup-${i}`} className="mx-6 text-sm md:text-[15px] font-bold text-slate-200">
                       <Link href={`/update/${u._id}`} className="hover:text-white hover:underline underline-offset-4 decoration-blue-500 transition-all flex items-center gap-2">
                         <span className="text-yellow-500 text-xs">⚡</span>
                         {u.title}
                       </Link>
                     </span>
                   ))}
                 </div>
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
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto mt-8">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">No updates found</h2>
            <p className="text-slate-500">The database might be empty right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Result */}
            <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#0A192F] text-white p-3 border-b-4 border-green-500 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-extrabold text-[15px] uppercase tracking-wider">Results</h3>
              </div>
              <ul className="flex-1 p-3 space-y-1">
                {results.length > 0 ? results.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2 px-2 border-b border-slate-100 hover:bg-slate-50 transition-all text-[13px] md:text-sm font-bold text-slate-800 hover:text-blue-700 leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 text-center text-sm font-medium text-slate-500">No results available</li>
                )}
              </ul>
              {results.length > 0 && (
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <Link href="/results" className="block text-center text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-blue-600 transition-colors py-2 bg-white border border-slate-300 rounded-sm shadow-sm hover:bg-slate-100">
                    View All Results
                  </Link>
                </div>
              )}
            </div>

            {/* Column 2: Admit Card */}
            <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#0A192F] text-white p-3 border-b-4 border-orange-500 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <h3 className="font-extrabold text-[15px] uppercase tracking-wider">Admit Cards</h3>
              </div>
              <ul className="flex-1 p-3 space-y-1">
                {admitCards.length > 0 ? admitCards.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2 px-2 border-b border-slate-100 hover:bg-slate-50 transition-all text-[13px] md:text-sm font-bold text-slate-800 hover:text-blue-700 leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 text-center text-sm font-medium text-slate-500">No admit cards available</li>
                )}
              </ul>
              {admitCards.length > 0 && (
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <Link href="/admit-cards" className="block text-center text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-blue-600 transition-colors py-2 bg-white border border-slate-300 rounded-sm shadow-sm hover:bg-slate-100">
                    View All Admit Cards
                  </Link>
                </div>
              )}
            </div>

            {/* Column 3: Latest Jobs */}
            <div className="rounded-sm bg-white border border-slate-300 shadow-sm flex flex-col overflow-hidden">
              <div className="bg-[#0A192F] text-white p-3 border-b-4 border-blue-500 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <h3 className="font-extrabold text-[15px] uppercase tracking-wider">Latest Jobs</h3>
              </div>
              <ul className="flex-1 p-3 space-y-1">
                {latestJobs.length > 0 ? latestJobs.map((item: any) => (
                  <li key={item._id}>
                    <Link 
                      href={`/update/${item._id}`} 
                      className="block py-2 px-2 border-b border-slate-100 hover:bg-slate-50 transition-all text-[13px] md:text-sm font-bold text-slate-800 hover:text-blue-700 leading-snug"
                    >
                      {item.title}
                    </Link>
                  </li>
                )) : (
                  <li className="py-4 text-center text-sm font-medium text-slate-500">No latest jobs available</li>
                )}
              </ul>
              {latestJobs.length > 0 && (
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <Link href="/latest-jobs" className="block text-center text-xs font-bold uppercase tracking-wider text-[#0A192F] hover:text-blue-600 transition-colors py-2 bg-white border border-slate-300 rounded-sm shadow-sm hover:bg-slate-100">
                    View All Latest Jobs
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Career Guidance & Blog Section */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <div className="rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A192F] mb-2 uppercase tracking-tight">Career Guidance & Articles</h2>
              <p className="text-slate-600 font-bold">Expert strategies and tips to crack your dream government job.</p>
            </div>
            <Link href="/blog" className="shrink-0 rounded-sm bg-white border border-slate-300 px-6 py-3 font-bold text-[#0A192F] hover:bg-slate-100 transition-colors shadow-sm">
              View All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/how-to-prepare-for-ssc-cgl" className="rounded-sm bg-slate-50 border border-slate-200 p-6 hover:shadow-md hover:border-blue-400 transition-all group">
              <h3 className="text-lg font-bold text-[#0A192F] mb-3 group-hover:text-blue-600 transition-colors underline-offset-4 group-hover:underline">How to Prepare for SSC CGL 2026</h3>
              <p className="text-sm text-slate-600 line-clamp-3">A comprehensive step-by-step guide to crack the Staff Selection Commission Combined Graduate Level exam in 2026. Discover the best books and study plans.</p>
            </Link>
            <Link href="/blog/top-10-govt-jobs-after-12th" className="rounded-sm bg-slate-50 border border-slate-200 p-6 hover:shadow-md hover:border-blue-400 transition-all group">
              <h3 className="text-lg font-bold text-[#0A192F] mb-3 group-hover:text-blue-600 transition-colors underline-offset-4 group-hover:underline">Top 10 Govt Jobs After 12th</h3>
              <p className="text-sm text-slate-600 line-clamp-3">Explore the top 10 highest-paying and most secure government job opportunities available for 12th pass students in India.</p>
            </Link>
            <Link href="/blog/rrb-exams-guide" className="rounded-sm bg-slate-50 border border-slate-200 p-6 hover:shadow-md hover:border-blue-400 transition-all group">
              <h3 className="text-lg font-bold text-[#0A192F] mb-3 group-hover:text-blue-600 transition-colors underline-offset-4 group-hover:underline">Ultimate Guide to RRB Exams</h3>
              <p className="text-sm text-slate-600 line-clamp-3">Everything you need to know about RRB NTPC, Group D, and ALP exams. Understand the syllabus, exam pattern, and physical tests.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Content Section (About Nainix Updates) */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <div className="rounded-sm bg-white border border-slate-300 p-8 md:p-12 prose prose-slate max-w-none text-slate-700 prose-headings:text-[#0A192F] prose-a:text-blue-600 shadow-sm">
          <h2 className="text-2xl font-extrabold mb-4 uppercase tracking-tight">Sarkari Result 2026: Find Latest Govt Jobs & Sarkari Naukri Updates</h2>
          <p className="font-medium leading-relaxed mb-6">
            Welcome to <strong>Nainix Updates</strong>, your most trusted portal for finding the latest <strong>Sarkari Result</strong>, <strong>Sarkari Naukri</strong>, and <strong>Government Jobs</strong> across India. Whether you are a 10th pass student looking for your first job or a graduate preparing for UPSC, we provide the fastest and most accurate updates. We cover all major sectors including Railway (RRB), Staff Selection Commission (SSC), Banking (IBPS, SBI), Defense (Army, Navy, Air Force), and State Police recruitments.
          </p>
          
          <h3 className="text-xl font-bold mb-3 mt-8">Download Admit Card & Exam Syllabus</h3>
          <p className="font-medium leading-relaxed mb-6">
            Before appearing for any competitive exam, downloading the <strong>Admit Card</strong> (Hall Ticket) and understanding the <strong>Exam Syllabus</strong> is crucial. We provide safe, direct links to download admit cards without the hassle of slow server issues. Along with the hall tickets, you can easily access the latest syllabus and exam patterns to boost your preparation. 
          </p>

          <h3 className="text-xl font-bold mb-3 mt-8">Fastest Sarkari Exam Results & Answer Keys</h3>
          <p className="font-medium leading-relaxed mb-6">
            Waiting for your exam result can be stressful. We ensure that as soon as a board or commission releases a <strong>Sarkari Result</strong>, Merit List, or Cut-off marks, it is updated on our portal instantly. From UP Board, CBSE, to high-stakes exams like SSC CGL, RRB NTPC, and State PSCs, get your results and official <strong>Answer Keys</strong> with a single click. 
          </p>

          <h3 className="text-xl font-bold mb-3 mt-8">Why Choose Us for Latest Govt Jobs?</h3>
          <p className="font-medium leading-relaxed">
            Finding legitimate recruitment notifications online can be confusing due to fake websites. We curate verified, official notifications directly from employment news (Rojgar Samachar) and government portals. Bookmark our website today and never miss an update on <strong>Upcoming Sarkari Naukri</strong>, online application forms, and career guidance.
          </p>
        </div>
      </div>

      {/* Bottom AdSense Banner */}
      <div className="container mx-auto px-4 max-w-7xl pb-12">
        <AdBanner height="min-h-[120px]" />
      </div>

    </div>
  );
}
