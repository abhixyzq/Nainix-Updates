import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, CalendarDays, Wallet, BookOpen, Users } from 'lucide-react';
import { fetchFromMongo } from '@/lib/mongoEdge';

// Fetch specific update by ID from MongoDB
async function getUpdateDetails(id: string) {
  try {
    const data = await fetchFromMongo('findOne', {
      filter: { _id: { $oid: id } }
    });
    return data.document;
  } catch (error) {
    // If the ID is an invalid format or missing, it will drop here
    return null;
  }
}

export default async function UpdateDetailsPage(
  props: { params: Promise<{ slug: string }> }
) {
  // Awaiting params for Next.js 15 compatibility
  const params = await props.params;
  const update: any = await getUpdateDetails(params.slug);

  // Fallback UI if the record doesn't exist
  if (!update) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">Update Not Found</h1>
        <p className="mb-8 text-slate-600">We couldn't find the requested update or it has been removed.</p>
        <Link 
          href="/" 
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      {/* Breadcrumbs / Back Link */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-10 border-b border-slate-200 pb-8">
        <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
          {update.category}
        </div>
        <h1 className="mb-2 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          {update.title}
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Posted on: {new Date(update.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column (Main Details) */}
        <div className="col-span-1 space-y-8 lg:col-span-2">
          
          {/* Important Dates Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                Important Dates
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-600">Last Date to Apply:</span>
                  <span className="font-semibold text-red-600">{update.lastDate || 'Not Specified'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Eligibility Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
              <BookOpen className="h-6 w-6 text-slate-700" />
              Eligibility Details
            </h3>
            <p className="leading-relaxed text-slate-700">
              {update.eligibility || 'Please refer to the official notification for complete eligibility details.'}
            </p>
          </div>
          
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="col-span-1">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-md">
            <h3 className="mb-6 text-center text-lg font-bold text-slate-900">Important Links</h3>
            
            <div className="flex flex-col gap-4">
              <a 
                href={update.officialLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md"
              >
                Apply / Official Site
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <div className="mt-6 rounded-lg bg-slate-50 p-4 text-center text-xs text-slate-500">
              <p>Note: Always verify details directly on the official website before applying.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
