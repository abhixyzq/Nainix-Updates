export async function sendPushNotification(title: string, category: string, postId: string) {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://update.nainix.me';

  if (!appId || !apiKey || appId === 'your_onesignal_app_id_here') {
    console.warn('OneSignal App ID or API Key missing. Skipping Web Push.');
    return;
  }

  const postUrl = `${siteUrl}/update/${postId}`;

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ['Subscribed Users'], // Target all subscribed users
        headings: { en: `New Update: ${category}` },
        contents: { en: title },
        url: postUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Push Notification:', errorData);
    }
  } catch (error) {
    console.error('Error in sendPushNotification:', error);
  }
}
