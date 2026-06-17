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

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      {/* Hero Section */}
      <section className="mb-12 max-w-3xl">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:leading-tight">
          Latest Education & <span className="text-blue-700">Job Updates</span>
        </h1>
        <p className="text-lg text-slate-600">
          Stay ahead with the fastest, official updates for government jobs, admit cards, and exam results.
        </p>
      </section>

      {/* Grid Layout (Live MongoDB Data) */}
      <section>
        {liveUpdates.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            No updates found. Please configure your MONGODB_URI and run the fetch API.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveUpdates.map((update: any) => (
              <UpdateCard
                key={update._id}
                title={update.title}
                category={update.category}
                lastDate={update.lastDate || 'Not Specified'}
                eligibility={update.eligibility || 'Refer to Notification'}
                link={`/update/${update._id}`} // Link directly to the MongoDB ID
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
