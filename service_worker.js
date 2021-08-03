/*
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');
workbox.routing.registerRoute(
	({request}) => request.destination == 'image',
	new workbox.strategies.CacheFirst()
);*/

let cache_name = "VitaCache";
self.addEventListener("install", event => {
    console.log("Installing VitaTrack Offline...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(ASSETS);
            })
            .catch(err => console.log(err))
    );
});

const ASSETS = [
    "/assets/css/styles.css",
    "/assets/img/logo-standard-white.png",
    "/index.html"
];
self.addEventListener("fetch", event => {
    if (event.request.url === "https://www.vitatrack.app/") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/offline.html"))
            )
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});


