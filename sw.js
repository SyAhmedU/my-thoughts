// My Thoughts — minimal offline service worker.
// Network-first for navigations, stale-while-revalidate for same-origin assets.
const CACHE = "my-thoughts-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => { cachePut(req, res.clone()); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => { cachePut(req, res.clone()); return res; }).catch(() => cached);
      return cached || network;
    })
  );
});

function cachePut(req, res) {
  if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res)).catch(() => {});
}
