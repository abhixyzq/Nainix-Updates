const cheerio = require('cheerio');

async function testScrape() {
  const response = await fetch('https://www.sarkariresult.com/');
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const links = new Set();
  $('a').each((i, el) => {
    let href = $(el).attr('href');
    if (href && (href.includes('/result/') || href.includes('/latestjob/') || href.includes('/admitcard/'))) {
      if (!href.startsWith('http')) {
        href = 'https://www.sarkariresult.com' + (href.startsWith('/') ? '' : '/') + href;
      }
      links.add(href);
    }
  });
  
  console.log(Array.from(links).slice(0, 10));
}

testScrape();
