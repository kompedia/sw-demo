
// w przegladarce istnieje `caches`
const cacheKey = 'sw-demo-cache';

const urlsToCache = [
    '/',
    '/index.js',
    '/styles/main.css',
    '/icons/apple-touch-icon-180x180.png',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/pwa-192x192.png',
    '/icons/pwa-512x512.png',
    '/images/mozilla.png'
];

function installServiceWorker(event) {
    // funkcja `waitUntil` przyjmuje Promise
    event.waitUntil(
        caches
            .open(cacheKey)
            .then(cache => cache.addAll(urlsToCache))
    )
}

self.addEventListener('install', installServiceWorker);


function matchRequest(event) {
    event.respondWith(
        caches
            .match(event.request)// czy w naszym cache'u jest slad po zapytaniu `requiest` 
            .then(response => {// response to ALBO juz pobrany zasob, ALBO nic
                if (response) {
                    return response;
                }

                return fetch(event.request);
            })
    );
}

self.addEventListener('fetch', matchRequest);
