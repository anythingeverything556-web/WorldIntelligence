/**
 * WorldIntelligence Service Worker v37
 * Advanced caching strategies, offline support, background sync
 */

const CACHE_VERSION = 'v42';
const CACHE_NAME = `worldinfo-${CACHE_VERSION}`;
const STATIC_CACHE = `worldinfo-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `worldinfo-images-${CACHE_VERSION}`;
const API_CACHE = `worldinfo-api-${CACHE_VERSION}`;

const MAX_CACHE_SIZE = 100; // Max items per cache
const MAX_CACHE_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/console.html',
  '/intel-feed.html',
  '/privacy.html',
  '/manifest.json',
  '/assets/css/app.min.css',
  '/assets/css/cesium/theme.min.css',
  '/assets/css/imagery-panel-new.min.css',
  '/assets/css/layers-dropdown.min.css',
  '/assets/js/app.min.js',
  '/assets/js/polyfills.min.js',
  '/assets/js/data.min.js',
  '/assets/js/data-fixes.min.js',
  '/assets/js/osm.min.js',
  '/assets/js/imagery-picker.min.js',
  '/sw.js',
  '/assets/img/logo-light.png',
  '/assets/img/logo.png'
];

// Install event - cache static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(function(err) {
        console.error('[SW] Static cache failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function(cacheName) {
              return cacheName.startsWith('worldintelligence-') && 
                     !cacheName.includes(CACHE_VERSION);
            })
            .map(function(cacheName) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

// Helper: Cache size management
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const toDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(toDelete.map(key => cache.delete(key)));
  }
}

// Helper: Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(function(response) {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
      trimCache(cacheName, MAX_CACHE_SIZE);
    }
    return response;
  })
  .catch(function() {
    return cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  });

  return cached || fetchPromise;
}

// Helper: Network-first strategy with timeout
async function networkFirst(request, cacheName, timeout = 3000) {
  const cache = await caches.open(cacheName);

  let fetchSettled = false;
  const fetchPromise = fetch(request).then(function(response) {
    fetchSettled = true;
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  })
  .catch(function() {
    fetchSettled = true;
    return cache.match(request);
  });

  const timeoutPromise = new Promise(function(resolve) {
    setTimeout(function() {
      cache.match(request).then(resolve);
    }, timeout);
  });

  const result = await Promise.race([fetchPromise, timeoutPromise]);
  if (!fetchSettled) fetchPromise.catch(function() {});
  return result || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Fetch event - route requests based on type
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  const request = event.request;
  
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;
  
  if (url.pathname.startsWith('/api/auth/') || url.pathname.startsWith('/api/user/')) {
    event.respondWith(fetch(request).catch(function() {
      return new Response('{"error":"offline"}', {status: 503, headers: {'Content-Type': 'application/json'}});
    }));
    return;
  }
  
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE, 5000));
    return;
  }
  
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }
  
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(function(cached) {
        if (cached) return cached;
        return fetch(request).then(function(response) {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then(function(cache) {
              cache.put(request, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
});

// Background sync for offline actions
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-watchlist') {
    event.waitUntil(syncWatchlist());
  }
});

async function syncWatchlist() {
  // Sync watchlist data when back online
  console.log('[SW] Syncing watchlist...');
}

// Push notifications
self.addEventListener('push', function(event) {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New intelligence available',
    icon: '/assets/img/logo.png',
    badge: '/assets/img/logo.png',
    tag: data.tag || 'default',
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
    data: data.data || {}
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'WorldIntelligence Alert',
      options
    )
  );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  const url = (event.notification.data && event.notification.data.url) || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(function(clientList) {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Message handling from main thread
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ version: CACHE_VERSION });
    }
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    var urls = Array.isArray(event.data.urls) ? event.data.urls : [];
    var sameOriginUrls = urls.filter(function(u) {
      try { return new URL(u, self.location.origin).origin === self.location.origin; } catch(e) { return false; }
    });
    if (!sameOriginUrls.length) {
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: false, error: 'No valid same-origin URLs' });
      return;
    }
    caches.open(STATIC_CACHE)
    .then(function(cache) {
      return cache.addAll(sameOriginUrls);
    })
    .then(function() {
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: true });
    })
    .catch(function(err) {
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: false, error: err.message });
    });
  }

  // Clear API cache on signout (prevents stale authenticated data leakage)
  if (event.data && event.data.type === 'CLEAR_API_CACHE') {
    caches.delete(API_CACHE).then(function() {
      console.log('[SW] API cache cleared (signout)');
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: true });
    }).catch(function(err) {
      if (event.ports && event.ports[0]) event.ports[0].postMessage({ success: false, error: err.message });
    });
  }
});
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'update-intel') {
    event.waitUntil(updateIntelligence());
  }
});

async function updateIntelligence() {
  console.log('[SW] Running periodic sync...');
  // Update cached data
}
