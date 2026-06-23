export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download, CalendarDays, Wallet, BookOpen, Users, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { AdBanner } from '@/components/AdBanner';

import { Metadata } from 'next';

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

// Dynamically generate SEO Metadata for each post
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const update: any = await getUpdateDetails(params.slug);
  
  if (!update) return { title: 'Update Not Found' };

  // Fallback description based on eligibility or title
  const desc = update.content && update.content !== 'Content could not be generated.' 
    ? update.content.substring(0, 160).replace(/\n/g, ' ') 
    : `Check out the latest updates for ${update.title} including important dates, eligibility, and direct links.`;

  return {
    title: `${update.title} - Apply Online, Notification & Eligibility | Sarkari Result`,
    description: desc,
    alternates: {
      canonical: `/update/${update._id}`,
    },
    openGraph: {
      title: `${update.title} - Sarkari Result`,
      description: desc,
      url: `/update/${update._id}`,
      type: 'article',
      publishedTime: update.createdAt ? new Date(update.createdAt).toISOString() : undefined,
      modifiedTime: update.updatedAt ? new Date(update.updatedAt).toISOString() : undefined,
    },
    twitter: {
      card: 'summary',
      title: `${update.title} - Sarkari Result`,
      description: desc,
    }
  };
}

export default async function UpdateDetailsPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const update: any = await getUpdateDetails(params.slug);

  if (!update) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-slate-900">Update Not Found</h1>
        <p className="mb-10 text-slate-600 font-medium">We couldn't find the requested update or it has been removed.</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-8 py-3 font-bold hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    );
  }

  // Generate JSON-LD Schema
  const isJob = update.category?.toLowerCase().includes('job') || update.category?.toLowerCase().includes('recruitment');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isJob ? 'JobPosting' : 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://update.nainix.me/update/${update._id}`
    },
    headline: update.title,
    datePublished: update.createdAt ? new Date(update.createdAt).toISOString() : undefined,
    dateModified: update.updatedAt ? new Date(update.updatedAt).toISOString() : update.createdAt ? new Date(update.createdAt).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: 'Nainix Updates',
      url: 'https://update.nainix.me'
    },
    description: update.content ? update.content.substring(0, 200).replace(/\n/g, ' ') : update.title,
    ...(isJob && {
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Government/Official Recruiter',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN'
        }
      },
      employmentType: 'FULL_TIME',
      validThrough: update.lastDate && !isNaN(new Date(update.lastDate).getTime()) ? new Date(update.lastDate).toISOString() : undefined,
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 md:px-8 max-w-7xl">
        {/* Breadcrumbs / Back Link */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 rounded-sm bg-white border border-slate-300 shadow-sm px-6 py-2.5 text-sm font-bold text-[#0A192F] transition-all hover:bg-slate-50 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Top AdSense Banner */}
      <div className="mb-10">
        <AdBanner className="hidden md:flex min-h-[90px]" />
        <AdBanner className="md:hidden min-h-[50px]" />
      </div>

      {/* Hero Section */}
      <div className="mb-10 rounded-sm bg-white border border-slate-300 shadow-sm p-8 md:p-10">
        <div className="mb-6 inline-block rounded-sm bg-red-50 border border-red-200 px-6 py-2 text-xs font-extrabold tracking-widest uppercase text-red-600">
          {update.category}
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#0A192F] md:text-5xl tracking-tight">
          {update.title}
        </h1>
        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Posted on: {new Date(update.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        
        {/* Left Column (Main Details) */}
        <div className="col-span-1 space-y-10 lg:col-span-2">
          
          {update.content && update.content !== 'Content could not be generated.' ? (
            <div className="rounded-sm bg-white shadow-sm border border-slate-300 p-6 lg:p-10">
              <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0A192F] prose-p:text-slate-700 prose-strong:text-[#0A192F] prose-a:text-blue-600 hover:prose-a:text-blue-800 marker:text-blue-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {update.content}
                </ReactMarkdown>
              </article>
            </div>
          ) : (
            <>
              {/* Important Dates Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-sm bg-white shadow-sm border-t-4 border-t-blue-600 border-x border-b border-slate-300 p-8 flex flex-col h-full">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#0A192F]">
                    <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    Important Dates
                  </h3>
                  <div className="space-y-4 text-[15px] font-medium text-slate-700 flex-1">
                    <div className="flex flex-col gap-1 bg-slate-50 border border-slate-200 rounded-sm p-4">
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Last Date to Apply</span>
                      <span className="font-extrabold text-red-500 text-lg">{update.lastDate || 'Not Specified'}</span>
                    </div>
                    {update.importantDates && update.importantDates !== 'Not Specified' && (
                      <div className="pt-2 text-slate-700 leading-relaxed">
                        <p className="whitespace-pre-line">{update.importantDates}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Fee Card */}
                <div className="rounded-sm bg-white shadow-sm border-t-4 border-t-green-600 border-x border-b border-slate-300 p-8 flex flex-col h-full">
                  <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#0A192F]">
                    <div className="w-10 h-10 bg-green-50 rounded-sm flex items-center justify-center text-green-600">
                      <Wallet className="h-5 w-5" />
                    </div>
                    Application Fee
                  </h3>
                  <div className="text-[15px] font-medium text-slate-700 flex-1">
                    {update.applicationFee && update.applicationFee !== 'Not Specified' ? (
                      <p className="whitespace-pre-line leading-relaxed bg-slate-50 border border-slate-200 rounded-sm p-4">{update.applicationFee}</p>
                    ) : (
                      <p className="italic text-slate-500">Fee details not provided.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vacancy Details */}
              {(update.vacancyDetails && update.vacancyDetails !== 'Not Specified') && (
                <div className="rounded-sm bg-white shadow-sm border-t-4 border-t-indigo-600 border-x border-b border-slate-300 p-8">
                  <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0A192F]">
                    <div className="w-12 h-12 bg-indigo-50 rounded-sm flex items-center justify-center text-indigo-600">
                      <Users className="h-6 w-6" />
                    </div>
                    Vacancy Details
                  </h3>
                  <p className="whitespace-pre-line leading-relaxed text-[15px] font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-sm p-6">
                    {update.vacancyDetails}
                  </p>
                </div>
              )}

              {/* Eligibility Section */}
              <div className="rounded-sm bg-white shadow-sm border-t-4 border-t-amber-500 border-x border-b border-slate-300 p-8">
                <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0A192F]">
                  <div className="w-12 h-12 bg-amber-50 rounded-sm flex items-center justify-center text-amber-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  Eligibility Details
                </h3>
                <p className="whitespace-pre-line leading-relaxed text-[15px] font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-sm p-6">
                  {update.eligibility || 'Please refer to the official notification for complete eligibility details.'}
                </p>
              </div>
            </>
          )}

          {/* Bottom Content AdSense Banner */}
          <div className="mt-8">
            <AdBanner height="min-h-[120px]" />
          </div>
          
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="col-span-1">
          <div className="sticky top-32 rounded-sm bg-white shadow-sm border border-slate-300 p-8">
            <h3 className="mb-8 text-center text-xl font-extrabold text-[#0A192F] uppercase tracking-wider">Important Links</h3>
            
            <div className="flex flex-col gap-6">
              <a 
                href={update.applyLink || update.officialLink || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-sm bg-red-600 hover:bg-red-700 text-white px-6 py-4 font-bold transition-all active:scale-95 shadow-sm border border-red-700 uppercase tracking-widest"
              >
                Apply Online
                <ExternalLink className="h-5 w-5" />
              </a>

              {(update.notificationLink && update.notificationLink !== '#') && (
                <a 
                  href={update.notificationLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#0A192F] hover:bg-slate-800 text-white border border-slate-900 px-6 py-4 font-bold transition-all active:scale-95 uppercase tracking-widest"
                >
                  Notification
                  <Download className="h-5 w-5" />
                </a>
              )}

              {(update.officialWebsiteLink && update.officialWebsiteLink !== '#') && (
                <a 
                  href={update.officialWebsiteLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-sm bg-white text-[#0A192F] hover:bg-slate-50 border border-slate-300 px-6 py-4 font-bold transition-all active:scale-95 uppercase tracking-widest"
                >
                  Official Website
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
            
            <div className="mt-8 rounded-sm bg-slate-50 border border-slate-200 p-5 text-center text-[13px] font-medium text-slate-500">
              <p>Note: Always verify details directly on the official website before applying.</p>
            </div>

            {/* Sidebar Skyscraper AdSense Banner */}
            <div className="mt-8">
              <AdBanner height="min-h-[300px]" />
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
