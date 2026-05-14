
const CACHE_NAME = "his mhjs";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  // favicon/icon external (may or may not be cachable depending on CORS)
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjg4atlTOzmEO68E10MhQVShNsfqVP6msdKdP87mX0mWv-NYd3tAOOmzNTtUkzq8O2U2mdPJEkdi3VGBgcOfYeJ3ZKUANrdSKYuMEn-iYM1mfrI-fxshm9dywGwkDn26CZR2RhVqlhoZcmu0jLPjjrosnpw8-C2J4tdSmlKjte7UGbMSEDGRZnMsU67ba0/s16000/icon1.png",
  // app iframe URLs (may be rejected by remote server for caching)
  "https://www.appsheet.com/start/7d5e0c23-79ec-4fe2-92ca-fa715c516491?refresh=1",
  "https://www.appsheet.com/start/7d5e0c23-79ec-4fe2-92ca-fa715c516491?refresh=1"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE.map(url => new Request(url, {mode: 'no-cors'})))
        .catch(err => {
          // Some cross-origin requests may fail due to CORS - that's expected.
          console.warn("Some resources failed to cache (likely cross-origin/CORS):", err);
          return Promise.resolve();
        });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Try cache first, then network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(err => {
        // network failed
        return new Response('<h1>Offline</h1><p>Content is not available offline.</p>', {
          headers: { 'Content-Type': 'text/html' }
        });
      });
    })
  );
});
