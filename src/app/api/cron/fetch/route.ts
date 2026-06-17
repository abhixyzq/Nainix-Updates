import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fetchFromMongo } from '@/lib/mongoEdge';

export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-api-key-for-now');

async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    $('script, style, noscript, iframe, nav, footer').remove();
    return $('body').text().replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Scraping Error:', error);
    throw new Error('Failed to scrape website content');
  }
}

async function processWithAI(rawText: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  const systemPrompt = `You are a data extractor. Parse this raw job notification text and return ONLY a strict JSON array of objects. Do NOT wrap it in markdown blockquotes like \`\`\`json. Each object MUST have: title, category (Result/Job/Admit Card), lastDate, eligibility, and officialLink.`;

  const truncatedText = rawText.slice(0, 15000); 
  const prompt = `${systemPrompt}\n\nRaw Text to Parse:\n\n${truncatedText}`;

  let retries = 3;
  let delay = 2000; // start with 2 second delay
  
  while (retries > 0) {
    try {
      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(responseText);
    } catch (error: any) {
      const isOverloaded = error.status === 503 || error.message?.includes('503');
      if (isOverloaded && retries > 1) {
        console.warn(`[Google AI 503] Server overloaded. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        retries--;
        delay *= 2; // exponential backoff
      } else {
        console.error('AI Processing Error:', error);
        throw new Error(`Failed to process text with AI: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
}

export async function GET(request: Request) {
  try {
    // SECURITY CHECK: Verify Vercel Cron Secret (skips in local development)
    const authHeader = request.headers.get('authorization');
    if (
      process.env.NODE_ENV === 'production' &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Cron Secret' }, { status: 401 });
    }

    // 1. Target a real job portal
    const TARGET_URL = 'https://www.sarkariresult.com/'; 
    const rawText = await scrapeWebsite(TARGET_URL);
    const structuredData: any[] = await processWithAI(rawText);
    
    let newUpdatesAdded = 0;

    // 2. Loop through and conditionally save unique data via Data API
    for (const item of structuredData) {
      const existing = await fetchFromMongo('findOne', {
        filter: { title: item.title }
      });

      if (!existing?.document) {
        await fetchFromMongo('insertOne', {
          document: {
            title: item.title,
            category: item.category,
            lastDate: item.lastDate,
            eligibility: item.eligibility,
            officialLink: item.officialLink,
            createdAt: new Date().toISOString()
          }
        });
        newUpdatesAdded++;
      }
    }
    
    // 3. Return clean JSON response
    return NextResponse.json({ 
      success: true, 
      message: `Database sync complete.`,
      totalParsed: structuredData.length,
      newUpdatesAdded: newUpdatesAdded
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
