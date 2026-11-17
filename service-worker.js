const CACHE_NAME = 'retroradtv-v3-163';
// Only the core shell is precached. Artwork and optional modules cache on demand.
const APP_FILES = [
  './index.html', './styles.css?v=3.0.163', './app.js?v=3.0.163',
  './stream-recovery.js?v=3.0.163', './volume-knob.js?v=3.0.163',
  './tone-controls.js?v=3.0.163', './stations.json',
  './manifest.webmanifest', './icon.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('retroradtv-v3-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Never intercept streams or other third-party requests.
  if (url.origin !== self.location.origin) return;
  const networkFirst = request.mode === 'navigate' || /\/(index\.html|[^/]+\.json)$/.test(url.pathname);
  const cacheFirst = url.searchParams.has('v') || /\.(svg|png)$/i.test(url.pathname);
  if (!networkFirst && !cacheFirst) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (!networkFirst && cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        // Cache failures must never turn a successful network fetch into a failure.
        event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
      }
      return response;
    } catch {
      return cached || (request.mode === 'navigate' && await cache.match('./index.html')) || Response.error();
    }
  })());
});
