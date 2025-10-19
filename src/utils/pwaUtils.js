// PWA Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('New service worker found:', newWorker);

        newWorker.addEventListener('statechange', () => {
          console.log('Service worker state changed:', newWorker.state);
          
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New content is available; please refresh.');
            
            // Dispatch custom event for update notification
            window.dispatchEvent(new CustomEvent('sw-update-available', {
              detail: { registration, newWorker }
            }));
          }
        });
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed, reloading page...');
        window.location.reload();
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.log('Service Worker not supported');
    return null;
  }
};

// Check if app is running as PWA
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

// Check if device is iOS
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if device is Android
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

// Get install prompt availability
export const getInstallPrompt = () => {
  return new Promise((resolve) => {
    let deferredPrompt = null;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      resolve(deferredPrompt);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Timeout after 5 seconds
    setTimeout(() => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      resolve(null);
    }, 5000);
  });
};

// Install PWA
export const installPWA = async (deferredPrompt) => {
  if (!deferredPrompt) {
    console.log('No install prompt available');
    return false;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log('Install prompt outcome:', outcome);
    return outcome === 'accepted';
  } catch (error) {
    console.error('Error installing PWA:', error);
    return false;
  }
};

// Add to home screen instructions for iOS
export const getIOSInstallInstructions = () => {
  return {
    title: 'Ilovani o\'rnatish',
    steps: [
      'Safari brauzerini oching',
      'Pastdagi "Ulashish" tugmasini bosing',
      '"Bosh ekranga qo\'shish" ni tanlang',
      '"Qo\'shish" tugmasini bosing'
    ]
  };
};

// Check network status
export const getNetworkStatus = () => {
  return {
    online: navigator.onLine,
    connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection
  };
};

// Listen for network changes
export const onNetworkChange = (callback) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Cache management
export const clearAppCache = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('App cache cleared');
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  }
  return false;
};

// Get cache size
export const getCacheSize = async () => {
  if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage,
        available: estimate.quota,
        usedMB: Math.round(estimate.usage / 1024 / 1024 * 100) / 100,
        availableMB: Math.round(estimate.quota / 1024 / 1024 * 100) / 100
      };
    } catch (error) {
      console.error('Error getting cache size:', error);
      return null;
    }
  }
  return null;
};

// Background sync for offline actions
export const scheduleBackgroundSync = (tag, data) => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      // Store data for sync
      localStorage.setItem(`sync-${tag}`, JSON.stringify(data));
      
      // Register background sync
      return registration.sync.register(tag);
    }).catch((error) => {
      console.error('Background sync registration failed:', error);
    });
  } else {
    console.log('Background sync not supported');
  }
};

// Push notification subscription
export const subscribeToPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.VITE_VAPID_PUBLIC_KEY || '')
      });

      console.log('Push notification subscription:', subscription);
      return subscription;
    } catch (error) {
      console.error('Push notification subscription failed:', error);
      return null;
    }
  }
  return null;
};

// Helper function for VAPID key conversion
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// App version management
export const getAppVersion = () => {
  return process.env.VITE_APP_VERSION || '1.0.0';
};

// Check for app updates
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        console.log('Checked for updates');
        return true;
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }
  return false;
};