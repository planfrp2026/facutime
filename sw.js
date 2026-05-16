// FacuTIME Service Worker — generado automáticamente por generar_dashboard.py.
// Se versiona con la versión del dashboard. Al publicar una versión nueva,
// el cache viejo se descarta solo en el evento `activate`.

const CACHE_NAME = 'facutime-v1.21';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon-64.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './icon-apple-180.png',
];

// Install: precargar los assets básicos para soporte offline.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('FacuTIME SW: algunos assets no se pudieron precachear.', err);
      })
    )
  );
  // Tomar control sin esperar a que se cierren todas las pestañas.
  self.skipWaiting();
});

// Activate: borrar caches de versiones anteriores.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: estrategia híbrida según el tipo de recurso.
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navegaciones (HTML): network-first.
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // Assets estáticos: cache-first con relleno en background.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
