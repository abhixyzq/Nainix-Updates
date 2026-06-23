import { NextResponse } from 'next/server';
import { fetchFromMongo } from '@/lib/mongoEdge';
import { sendTelegramMessage } from '@/lib/telegram';

export async function GET() {
  try {
    console.log('Starting Telegram Bulk Sync...');
    
    // Fetch all existing posts from the database
    const data = await fetchFromMongo('find', {
      sort: { createdAt: 1 } // Send oldest first so the newest ends up at the bottom of the channel
    });
    
    const updates = data?.documents || [];
    
    if (updates.length === 0) {
      return NextResponse.json({ message: 'No updates found in database.' });
    }

    console.log(`Found ${updates.length} updates. Beginning broadcast...`);

    // Loop through each update and send to Telegram with a delay to avoid rate limits
    let sentCount = 0;
    for (const update of updates) {
      if (!update.title || !update._id) continue;
      
      const postId = update._id.$oid || update._id;
      
      await sendTelegramMessage(update.title, update.category || 'Update', postId.toString());
      sentCount++;
      
      console.log(`Sent ${sentCount}/${updates.length}: ${update.title}`);
      
      // Delay for 3 seconds between messages to prevent Telegram FloodWait errors
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully sent ${sentCount} posts to Telegram.` 
    });

  } catch (error) {
    console.error('Telegram Sync Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
