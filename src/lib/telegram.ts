export async function sendTelegramMessage(title: string, category: string, postId: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://update.nainix.me';

  if (!token || !chatId || token === 'your_bot_token_here') {
    console.warn('Telegram token or chat ID is missing. Skipping Telegram broadcast.');
    return;
  }

  // Construct the exact real URL to the detail page
  const postUrl = `${siteUrl}/update/${postId}`;

  const message = `🚨 *New Update: ${category}* 🚨\n\n📌 *${title}*\n\n🔗 *Read Details & Apply:* \n${postUrl}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Telegram message:', errorData);
    }
  } catch (error) {
    console.error('Error in sendTelegramMessage:', error);
  }
}
