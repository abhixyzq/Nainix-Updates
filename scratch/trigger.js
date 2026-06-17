async function triggerFetch() {
  console.log('Triggering local deep scrape API...');
  try {
    const res = await fetch('http://localhost:3000/api/cron/fetch', {
      headers: { 'Authorization': 'Bearer SuperSecretCronKey2026' }
    });
    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}
triggerFetch();
