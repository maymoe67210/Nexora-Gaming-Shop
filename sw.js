const CACHE_NAME = "nexora-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/Nexora-Gaming-Shop/",
        "/Nexora-Gaming-Shop/manifest.webmanifest"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method === "GET") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
