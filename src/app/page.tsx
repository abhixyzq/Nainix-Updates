import { UpdateCard } from '@/components/UpdateCard';
import { fetchFromMongo } from '@/lib/mongoEdge';

// Connect to DB and fetch live data
async function getLatestUpdates() {
  try {
    // Fetch latest 20 updates using MongoDB Data API
    const data = await fetchFromMongo('find', {
      sort: { createdAt: -1 },
      limit: 20
    });
    
    const updates = data?.documents || [];

    // Map object IDs
    return updates.map((doc: any) => ({
      ...doc,
      _id: doc._id, // Data API returns IDs as strings implicitly if parsed
    }));
  } catch (error) {
    console.error('Database connection failed:', error);
    return []; // Fallback to empty array if DB isn't connected yet
  }
}

export default async function HomePage() {
  const liveUpdates = await getLatestUpdates();
  const featuredUpdate = liveUpdates.length > 0 ? liveUpdates[0] : null;
  const gridUpdates = liveUpdates.length > 0 ? liveUpdates.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12 md:px-8">
        
        {/* Modern Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Powered by Autonomous AI
          </div>
          <h1 className="mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:leading-[1.1]">
            Your Next Career Move, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Delivered Instantly.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
            Stay ahead of the curve with AI-curated, real-time updates for government jobs, admit cards, and examination results.
          </p>
        </section>

        {liveUpdates.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-slate-500">No updates found. Please configure your MONGODB_URI and run the fetch API.</p>
          </div>
        ) : (
          <>
            {/* Featured Post (Most Recent) */}
            {featuredUpdate && (
              <section className="mb-16">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-800">Featured Update</h2>
                <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl shadow-slate-200/40 lg:flex">
                  <div className="flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:w-2/5 lg:p-12">
                    <span className="mb-4 inline-block w-fit rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold tracking-wide text-white shadow-md">
                      {featuredUpdate.category}
                    </span>
                    <h3 className="mb-4 text-3xl font-bold leading-tight text-slate-900">
                      {featuredUpdate.title}
                    </h3>
                    <p className="mb-8 text-slate-600 line-clamp-3">
                      {featuredUpdate.eligibility !== 'Not Specified' 
                        ? featuredUpdate.eligibility 
                        : "Discover the complete details, important dates, and application process for this latest opportunity."}
                    </p>
                    <a 
                      href={`/update/${featuredUpdate._id}`}
                      className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Read Full Article
                    </a>
                  </div>
                  <div className="relative hidden bg-slate-100 lg:block lg:w-3/5">
                    {/* Placeholder for an image or abstract art. Since we don't have images in DB, we use a beautiful gradient abstract pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 opacity-90 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md">
                         <p className="text-4xl font-extrabold text-white shadow-black/10 drop-shadow-lg">Just Arrived</p>
                         <p className="mt-2 text-lg text-white/90">AI Verified & Processed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Grid Layout (Rest of Updates) */}
            {gridUpdates.length > 0 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">Recent Updates</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {gridUpdates.map((update: any) => (
                    <UpdateCard
                      key={update._id}
                      title={update.title}
                      category={update.category}
                      lastDate={update.lastDate || 'Not Specified'}
                      eligibility={update.eligibility || 'Refer to Notification'}
                      link={`/update/${update._id}`}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
