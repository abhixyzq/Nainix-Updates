require('dotenv').config({ path: '.env.local' });
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-api-key-for-now');

async function scrapeWebsite(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    $('script, style, noscript, iframe, nav, footer, header').remove();
    return $('body').text().replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error(`Scraping Error for ${url}:`, error);
    return null;
  }
}

async function callGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  let retries = 3;
  let delay = 2000;
  while (retries > 0) {
    try {
      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(responseText);
    } catch (error) {
      if (error.status === 503 && retries > 1) {
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

async function testPhase1() {
  const TARGET_URL = 'https://www.sarkariresult.com/'; 
  const homepageText = await scrapeWebsite(TARGET_URL);
  if (!homepageText) return console.log('Failed to load homepage');

  const linkPrompt = `You are a data extractor. Parse this raw homepage text from a job portal and return ONLY a strict JSON array of the top 3 most recent updates. Each object MUST have: title, category (Result/Job/Admit Card), and url (the full URL to the detail page). Ensure the URL is absolute (starts with http).
Raw Text: ${homepageText.slice(0, 15000)}`;

  const recentUpdates = await callGemini(linkPrompt);
  console.log('Phase 1 Results:', recentUpdates);
}
testPhase1();
