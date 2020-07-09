/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const CACHE_NAME = 'JPC-v1.1';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/menu.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/manifest.json',
  '/style.css',
  '/images/brand.png',
  '/images/banner_fnl.jpg',
  '/images/history.jpg',
  '/images/know.jpg',
  '/images/online_fnl.jpg',
  '/images/soon.jpg',
  '/images/vission.jpg',
  '/images/bucket chicken_fnl.jpg',
  '/images/bucket chicken2_fnl.jpg',
  '/images/bucket chicken3_fnl.jpg',
  '/images/logo/Logo.png',
  '/images/logo/Logo96.png',
  '/images/logo/Logo128.png',
  '/images/logo/Logo144.png',
  '/images/logo/Logo192.png',
  '/images/logo/Logo256.png',
  '/images/logo/Logo384.png',
  '/images/logo/Logo512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
