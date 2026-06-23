'use client';

import { useEffect, useRef } from 'react';
import OneSignal from 'react-onesignal';

export function OneSignalInit() {
  const initialized = useRef(false);

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    
    if (!appId || appId === 'your_onesignal_app_id_here' || initialized.current) {
      return;
    }

    const initOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: appId,
          allowLocalhostAsSecureOrigin: true,
        });
        
        // Show prompt to user
        OneSignal.Slidedown.promptPush();
        initialized.current = true;
      } catch (error) {
        console.error('OneSignal initialization failed:', error);
      }
    };

    initOneSignal();
  }, []);

  return null; // This component doesn't render anything
}
