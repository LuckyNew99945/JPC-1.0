/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const CACHE_NAME = 'JPC-v1.0';
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