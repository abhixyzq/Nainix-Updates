const cheerio = require('cheerio');

async function testScrape() {
  const response = await fetch('https://www.sarkariresult.com/');
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const links = new Set();
  $('a').each((i, el) => {
    let href = $(el).attr('href');
    // Actual job links usually contain /2024/ or /2025/ or end with .php
    if (href && href.includes('.php') && !href.includes('sarkariresult.com/page')) {
      if (!href.startsWith('http')) {
        href = 'https://www.sarkariresult.com' + (href.startsWith('/') ? '' : '/') + href;
      }
      links.add(href);
    }
  });
  
  console.log(Array.from(links).slice(0, 5));
}

testScrape();
