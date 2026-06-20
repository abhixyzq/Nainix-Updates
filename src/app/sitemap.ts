import { MetadataRoute } from 'next';
import { fetchFromMongo } from '@/lib/mongoEdge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://update.nainix.me';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
    '/disclaimer',
    '/results',
    '/admit-cards',
    '/latest-jobs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (Jobs, Results, Admit Cards)
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const data = await fetchFromMongo('find', { 
      sort: { createdAt: -1 }, 
      limit: 1000 // Get up to 1000 latest posts for the sitemap
    });
    
    if (data && data.documents) {
      dynamicRoutes = data.documents.map((doc: any) => ({
        url: `${baseUrl}/update/${doc._id}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(doc.createdAt),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch dynamic routes for sitemap', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
