/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { BroadcastUpdatePlugin } from "workbox-broadcast-update";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

clientsClaim();

// Precache de todos los activos generados por el build
precacheAndRoute([
  ...self.__WB_MANIFEST,
  { url: "/offline.html", revision: "12345" },
]);

// App Shell-style routing para servir index.html en todas las navegaciones
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") return false;
  if (url.pathname.startsWith("/_")) return false;
  if (url.pathname.match(fileExtensionRegexp)) return false;
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

// Caching para CSS y JS con CacheFirst
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new CacheFirst({
    cacheName: "static-resources",
    plugins: [
      new BroadcastUpdatePlugin(),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
);

// Caching para imágenes con StaleWhileRevalidate
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// Caching para solicitudes API con NetworkFirst
registerRoute(
  ({ url }) =>
    url.origin === "https://swapi.dev" &&
    url.pathname.startsWith("/api/people"),
  new NetworkFirst({
    cacheName: "star-wars-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          return await fetch(event.request);
        } catch (error) {
          const cache = await caches.open("offline-cache");
          return await cache.match("/offline.html");
        }
      })()
    );
  }
});

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

clientsClaim();
