import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, CalendarDays, Wallet, BookOpen, Users, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchFromMongo } from '@/lib/mongoEdge';

// Fetch specific update by ID from MongoDB
async function getUpdateDetails(id: string) {
  try {
    const data = await fetchFromMongo('findOne', {
      filter: { _id: { $oid: id } }
    });
    return data?.document;
  } catch (error) {
    return null;
  }
}

export default async function UpdateDetailsPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const update: any = await getUpdateDetails(params.slug);

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
          
          {update.content && update.content !== 'Content could not be generated.' ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <article className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {update.content}
                </ReactMarkdown>
              </article>
            </div>
          ) : (
            <>
              {/* Important Dates Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    Important Dates
                  </h3>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-600">Last Date to Apply:</span>
                      <span className="font-semibold text-red-600">{update.lastDate || 'Not Specified'}</span>
                    </div>
                    {update.importantDates && update.importantDates !== 'Not Specified' && (
                      <div className="pt-2 text-slate-600">
                        <p className="whitespace-pre-line">{update.importantDates}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Fee Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Wallet className="h-5 w-5 text-green-600" />
                    Application Fee
                  </h3>
                  <div className="text-sm text-slate-700">
                    {update.applicationFee && update.applicationFee !== 'Not Specified' ? (
                      <p className="whitespace-pre-line">{update.applicationFee}</p>
                    ) : (
                      <p className="italic text-slate-500">Fee details not provided.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vacancy Details */}
              {(update.vacancyDetails && update.vacancyDetails !== 'Not Specified') && (
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Users className="h-6 w-6 text-indigo-600" />
                    Vacancy Details
                  </h3>
                  <p className="whitespace-pre-line leading-relaxed text-slate-700">
                    {update.vacancyDetails}
                  </p>
                </div>
              )}

              {/* Eligibility Section */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  Eligibility Details
                </h3>
                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {update.eligibility || 'Please refer to the official notification for complete eligibility details.'}
                </p>
              </div>
            </>
          )}
          
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="col-span-1">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-md">
            <h3 className="mb-6 text-center text-lg font-bold text-slate-900">Important Links</h3>
            
            <div className="flex flex-col gap-4">
              <a 
                href={update.applyLink || update.officialLink || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md"
              >
                Apply Online
                <ExternalLink className="h-4 w-4" />
              </a>

              {(update.notificationLink && update.notificationLink !== '#') && (
                <a 
                  href={update.notificationLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-md"
                >
                  Download Notification
                  <Download className="h-4 w-4" />
                </a>
              )}

              {(update.officialWebsiteLink && update.officialWebsiteLink !== '#') && (
                <a 
                  href={update.officialWebsiteLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white transition-all hover:bg-slate-900 hover:shadow-md"
                >
                  Official Website
                  <Globe className="h-4 w-4" />
                </a>
              )}
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
