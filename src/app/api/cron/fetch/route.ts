import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fetchFromMongo } from '@/lib/mongoEdge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-api-key-for-now');

// Helper to fetch and clean HTML
async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove heavy unnecessary tags to save tokens
    $('script, style, noscript, iframe, nav, footer, header').remove();
    
    const bodyHtml = $('body').html();
    return bodyHtml ? bodyHtml.replace(/\s+/g, ' ').trim() : '';
  } catch (error) {
    console.error(`Scraping Error for ${url}:`, error);
    return null;
  }
}

// Helper to call Gemini with retry logic
async function callGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  let retries = 3;
  let delay = 2000;
  
  while (retries > 0) {
    try {
      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(responseText);
    } catch (error: any) {
      const isOverloaded = error.status === 503 || error.message?.includes('503');
      if (isOverloaded && retries > 1) {
        console.warn(`[Google AI 503] Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        retries--;
        delay *= 2;
      } else {
        console.error('AI Processing Error:', error);
        return null;
      }
    }
  }
  return null;
}

export async function GET(request: Request) {
  try {
    // SECURITY CHECK
    const authHeader = request.headers.get('authorization');
    if (
      process.env.NODE_ENV === 'production' &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Cron Secret' }, { status: 401 });
    }

    // --- PHASE 1: Extract Links from Homepage ---
    const TARGET_URL = 'https://www.sarkariresult.com/'; 
    const homepageText = await scrapeWebsite(TARGET_URL);
    if (!homepageText) throw new Error("Failed to load homepage");

    const linkPrompt = `You are a data extractor. Parse this raw homepage text from a job portal and return ONLY a strict JSON array of the top 10 most recent updates. Each object MUST have: title, category (Result/Job/Admit Card), and url (the full URL to the detail page). Ensure the URL is absolute (starts with http).
Raw Text: ${homepageText.slice(0, 50000)}`;

    const recentUpdates = await callGemini(linkPrompt);
    if (!Array.isArray(recentUpdates) || recentUpdates.length === 0) {
      throw new Error("Failed to extract links from homepage");
    }

    // --- PHASE 2: Filter New Updates ---
    // Extract URLs to check against DB
    const extractedUrls = recentUpdates.map((u: any) => u.url).filter(Boolean);
    
    const existingDocs = await fetchFromMongo('find', {
      filter: { officialLink: { $in: extractedUrls } }
    });
    
    const existingUrls = new Set(existingDocs?.documents?.map((d: any) => d.officialLink) || []);
    
    // Get URLs we haven't scraped yet
    const newUpdates = recentUpdates.filter((u: any) => u.url && !existingUrls.has(u.url));
    
    let newUpdatesAdded = 0;

    // Limit to processing 3 new updates per run to avoid timeouts/rate limits
    const updatesToProcess = newUpdates.slice(0, 3);

    // --- PHASE 3: Deep Scraping for Detail Pages ---
    for (const item of updatesToProcess) {
      const detailText = await scrapeWebsite(item.url);
      if (!detailText) continue;

      const detailPrompt = `You are an expert Job Portal Content Writer and SEO Blogger. Read the following job detail page text. 
Write a comprehensive, engaging, and highly structured 400-500 word blog post in Markdown format about this update. 
The blog post must include headings (H2, H3), bullet points, and tables (if applicable) for sections like "Overview", "Important Dates", "Application Fee", "Vacancy Details", "Eligibility Criteria", and "How to Apply".
Make the tone professional yet accessible. Do NOT include markdown code blocks for the overall JSON, just return a raw JSON object.

Ensure the JSON keys exactly match these: 
- title: (string, an SEO optimized, catchy title for this post)
- content: (string, the full markdown formatted blog post you just wrote)
- lastDate: (string, e.g., '15-08-2026', extract the last date to apply)
- applyLink: (string, the URL to apply online, extract from text if possible, else return '#')
- notificationLink: (string, the URL to download notification PDF, else return '#')
- officialWebsiteLink: (string, the URL to the official website, else return '#')

Raw HTML: ${detailText.slice(0, 50000)}`;

      const deepDetails = await callGemini(detailPrompt);

      if (deepDetails) {
        await fetchFromMongo('insertOne', {
          document: {
            title: deepDetails.title || item.title,
            category: item.category,
            officialLink: item.url, // saving detail page url as official link for uniqueness
            content: deepDetails.content || 'Content could not be generated.',
            lastDate: deepDetails.lastDate || 'Not Specified',
            applyLink: deepDetails.applyLink || item.url,
            notificationLink: deepDetails.notificationLink || item.url,
            officialWebsiteLink: deepDetails.officialWebsiteLink || item.url,
            createdAt: new Date().toISOString()
          }
        });
        newUpdatesAdded++;
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Database sync complete.`,
      foundOnHomepage: recentUpdates.length,
      newUpdatesProcessed: updatesToProcess.length,
      newUpdatesAdded: newUpdatesAdded
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
