/* ==============================================
   Service Worker - Offline Support & Performance
   Romantic Love Story Webapp Service Worker
   ============================================== */

const CACHE_NAME = 'love-story-v1.0.0';
const STATIC_CACHE_NAME = 'love-story-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'love-story-dynamic-v1.0.0';

// Files to cache for offline functionality - Prioritized for Mobile
const STATIC_FILES = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/timeline.css',
  '/css/responsive.css',
  '/css/event-detail.css',
  '/js/main.js',
  '/js/timeline.js',
  '/js/countdown.js',
  '/js/animations.js',
  '/js/event-detail.js',
  '/js/photo-gallery.js',
  '/js/mobile-performance.js',
  '/data/timeline-data.js',
  '/pages/event-the-day-we-said-yes.html',
  // Add Google Fonts - Critical for mobile performance
  'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&display=swap'
];

// Mobile-optimized cache sizes
const MOBILE_CACHE_LIMITS = {
  static: 50, // 50 static files max
  dynamic: 30, // 30 dynamic files max
  images: 20   // 20 images max
};

// Dynamic files that should be cached when accessed
const DYNAMIC_FILES = [
  '/pages/',
  '/images/'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('🐼 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Static files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🐼 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old caches
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('love-story-')) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    handleFetch(request)
  );
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(request)) {
      return await cacheFirst(request);
    }
    
    // Strategy 2: Network First for HTML pages
    if (isHTMLPage(request)) {
      return await networkFirst(request);
    }
    
    // Strategy 3: Stale While Revalidate for images and other assets
    if (isAsset(request)) {
      return await staleWhileRevalidate(request);
    }
    
    // Strategy 4: Network First for everything else
    return await networkFirst(request);
    
  } catch (error) {
    console.error('❌ Fetch error:', error);
    
    // Return offline fallback if available
    return await getOfflineFallback(request);
  }
}

// Cache First Strategy - for static assets with mobile optimization
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    console.log('📦 Serving from cache:', request.url);
    return cachedResponse;
  }
  
  console.log('🌐 Fetching from network:', request.url);
  const networkResponse = await fetch(request);
  
  // Cache the response for future use with mobile-optimized limits
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    
    // Check cache size limits for mobile optimization
    const keys = await cache.keys();
    if (keys.length >= MOBILE_CACHE_LIMITS.static) {
      // Remove oldest entries to stay within mobile limits
      const oldestKey = keys[0];
      await cache.delete(oldestKey);
      console.log('🗑️ Removed oldest cache entry for mobile optimization:', oldestKey.url);
    }
    
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First Strategy - for HTML pages with mobile optimization
async function networkFirst(request) {
  try {
    console.log('🌐 Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses with mobile limits
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      
      // Mobile cache management
      const keys = await cache.keys();
      if (keys.length >= MOBILE_CACHE_LIMITS.dynamic) {
        const oldestKey = keys[0];
        await cache.delete(oldestKey);
        console.log('🗑️ Removed oldest dynamic cache entry:', oldestKey.url);
      }
      
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('📦 Network failed, serving from cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy - for images and assets with mobile optimization
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Fetch from network in background with mobile optimization
  const networkResponsePromise = fetch(request)
    .then(response => {
      if (response.ok) {
        caches.open(DYNAMIC_CACHE_NAME).then(async cache => {
          // Mobile image cache management
          if (isAsset(request)) {
            const keys = await cache.keys();
            const imageKeys = keys.filter(key => isAsset({ url: key.url }));
            
            if (imageKeys.length >= MOBILE_CACHE_LIMITS.images) {
              const oldestImageKey = imageKeys[0];
              await cache.delete(oldestImageKey);
              console.log('🗑️ Removed oldest image cache entry:', oldestImageKey.url);
            }
          }
          
          cache.put(request, response.clone());
        });
      }
      return response;
    })
    .catch(error => {
      console.log('🌐 Network fetch failed:', error);
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('📦 Serving stale from cache:', request.url);
    return cachedResponse;
  }
  
  // Otherwise wait for network
  console.log('🌐 No cache, waiting for network:', request.url);
  return await networkResponsePromise;
}

// Get offline fallback
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // For HTML pages, return cached index.html
  if (request.headers.get('accept').includes('text/html')) {
    const cachedIndex = await caches.match('/index.html');
    if (cachedIndex) {
      console.log('📦 Serving offline fallback: index.html');
      return cachedIndex;
    }
  }
  
  // For images, return a placeholder (if we had one)
  if (request.headers.get('accept').includes('image/')) {
    // Could return a cached placeholder image
    console.log('🖼️ Image not available offline');
  }
  
  // Return a generic offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'This content is not available offline',
      url: request.url
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Helper functions to determine request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/);
}

function isHTMLPage(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('.html') || 
         url.pathname === '/' ||
         request.headers.get('accept').includes('text/html');
}

function isAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/);
}

// Background sync for offline actions (if supported)
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'bookmark-sync') {
    event.waitUntil(syncBookmarks());
  }
});

async function syncBookmarks() {
  // Sync bookmarks when back online
  console.log('🔖 Syncing bookmarks...');
  
  try {
    // Get stored bookmarks from IndexedDB or localStorage
    const bookmarks = getStoredBookmarks();
    
    // Send to server (placeholder)
    // await fetch('/api/bookmarks', {
    //   method: 'POST',
    //   body: JSON.stringify(bookmarks)
    // });
    
    console.log('✅ Bookmarks synced successfully');
  } catch (error) {
    console.error('❌ Error syncing bookmarks:', error);
  }
}

function getStoredBookmarks() {
  // Get bookmarks from localStorage
  const bookmarks = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('bookmarked-')) {
      bookmarks.push({
        eventId: key.replace('bookmarked-', ''),
        timestamp: Date.now()
      });
    }
  }
  return bookmarks;
}

// Push notifications (if needed in the future)
self.addEventListener('push', event => {
  console.log('📱 Push notification received');
  
  const options = {
    body: 'New memory added to your love story! 🐼💕',
    icon: '/images/panda-icon.png',
    badge: '/images/panda-badge.png',
    tag: 'love-story-update',
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Our Love Story', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('📱 Notification clicked');
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  console.log('💬 Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(clearAllCaches());
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName.startsWith('love-story-')) {
        console.log('🗑️ Clearing cache:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
  console.log('✅ All caches cleared');
}

// Error handling
self.addEventListener('error', event => {
  console.error('❌ Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('❌ Service Worker unhandled rejection:', event.reason);
});

console.log('🐼 Service Worker loaded successfully');