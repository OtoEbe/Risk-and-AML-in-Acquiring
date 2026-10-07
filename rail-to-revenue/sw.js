/* Rail to Revenue service worker: keeps the app usable through a reload with no signal. */
const CACHE = "r2r-1.0.20261007";
const SHELL = ["./", "./index.html", "./console.html"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: "reload" })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("r2r-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // Network first with a short timeout, so a fresh deploy wins when the venue Wi-Fi is up
  // and the cached copy wins when it is not.
  e.respondWith(new Promise((resolve) => {
    let done = false;
    const fromCache = () => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"));
    const timer = setTimeout(() => { fromCache().then((r) => { if (!done && r) { done = true; resolve(r); } }); }, 3500);
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      if (!done) { done = true; clearTimeout(timer); resolve(res); }
    }).catch(() => {
      fromCache().then((r) => { if (!done) { done = true; clearTimeout(timer); resolve(r || new Response("Offline", { status: 503 })); } });
    });
  }));
});
