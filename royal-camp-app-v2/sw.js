// Self-destroying service worker.
// The previous deployment at this same URL registered a PWA service worker
// that aggressively caches the app shell. Browsers that installed it keep
// serving the old cached version forever, even after this URL's content
// changes, because the old worker intercepts navigation before it ever
// reaches the network. This file replaces that worker, immediately clears
// every cache it created, unregisters itself, and forces any open tab to
// reload — after which no service worker controls this origin anymore.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
