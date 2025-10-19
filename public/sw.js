const CACHE_NAME = 'qarzdaftar-v1.0.0';
const STATIC_CACHE = 'qarzdaftar-static-v1.0.0';
const DYNAMIC_CACHE = 'qarzdaftar-dynamic-v1.0.0';

// Cache qilinadigan static fayllar
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // CSS va JS fayllar Vite tomonidan generate qilinadi
];

// Cache qilinadigan API endpoints
const API_CACHE_PATTERNS = [
  /^\/api\/auth\//,
  /^\/api\/debts\//,
  /^\/api\/branches\//,
  /^\/api\/analytics\//
];

// Install event - static fayllarni cache qilish
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files:', error);
      })
  );
});

// Activate event - eski cache larni tozalash
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - network first, fallback to cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // API requests - Network first, cache fallback
  if (isApiRequest(request.url)) {
    event.respondWith(
      networkFirstStrategy(request)
    );
    return;
  }

  // Static files - Cache first, network fallback
  if (isStaticFile(request.url)) {
    event.respondWith(
      cacheFirstStrategy(request)
    );
    return;
  }

  // HTML pages - Network first, cache fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      networkFirstStrategy(request)
    );
    return;
  }

  // Default strategy - Network first
  event.respondWith(
    networkFirstStrategy(request)
  );
});

// Network first strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline.html') || new Response(
        '<h1>Offline</h1><p>Internet aloqasi yo\'q. Iltimos, internetni tekshiring.</p>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    throw error;
  }
}

// Cache first strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Failed to fetch:', request.url, error);
    throw error;
  }
}

// Helper functions
function isApiRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isStaticFile(url) {
  return /\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/i.test(url);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'debt-sync') {
    event.waitUntil(syncOfflineDebts());
  }
});

// Sync offline debts when connection is restored
async function syncOfflineDebts() {
  try {
    // Get offline debts from IndexedDB or localStorage
    const offlineDebts = await getOfflineDebts();
    
    for (const debt of offlineDebts) {
      try {
        await fetch('/api/debts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${debt.token}`
          },
          body: JSON.stringify(debt.data)
        });
        
        // Remove from offline storage after successful sync
        await removeOfflineDebt(debt.id);
        console.log('Service Worker: Synced offline debt:', debt.id);
      } catch (error) {
        console.error('Service Worker: Failed to sync debt:', debt.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Placeholder functions for offline storage
async function getOfflineDebts() {
  // Implement IndexedDB or localStorage logic
  return [];
}

async function removeOfflineDebt(id) {
  // Implement removal logic
  console.log('Removing offline debt:', id);
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Yangi xabar',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ko\'rish',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'close',
        title: 'Yopish',
        icon: '/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Qarzdaftar', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});