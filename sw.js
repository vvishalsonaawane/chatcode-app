// ChatCode Service Worker - enables "Add to Home Screen" installability
const CACHE_NAME = 'chatcode-v3';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isShellFile = urlsToCache.some(f => url.endsWith(f.replace('./', '')));

  if (isShellFile) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
