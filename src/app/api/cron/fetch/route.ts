import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/dbConnect';
import Update from '@/models/Update';

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
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = `You are a data extractor. Parse this raw job notification text and return a strict JSON array of objects. Each object MUST have: title, category (Result/Job/Admit Card), lastDate, eligibility, and officialLink.`;

    const truncatedText = rawText.slice(0, 15000); 
    const prompt = `${systemPrompt}\n\nRaw Text to Parse:\n\n${truncatedText}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('AI Processing Error:', error);
    throw new Error('Failed to process text with AI');
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

    // 1. Establish database connection
    await dbConnect();

    const TARGET_URL = 'https://example.com'; 
    const rawText = await scrapeWebsite(TARGET_URL);
    const structuredData: any[] = await processWithAI(rawText);
    
    let newUpdatesAdded = 0;

    // 2. Loop through and conditionally save unique data
    for (const item of structuredData) {
      const existingUpdate = await Update.findOne({ title: item.title });

      if (!existingUpdate) {
        const newUpdate = new Update({
          title: item.title,
          category: item.category,
          lastDate: item.lastDate,
          eligibility: item.eligibility,
          officialLink: item.officialLink,
        });

        await newUpdate.save();
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
