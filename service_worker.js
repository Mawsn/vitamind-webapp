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
	"/index.html",
	"/home.html",
	
	"/signup-options.html",
	"/signup.html",
	/*
	"/login-options.html",
	"/login.html",
	"/tool-skin-tone.html",
	"/tool-dietary-tone.html",
	"/tool-supplement-1.html",
	"/tool-supplement-2.html",
	"/tool-supplement-3.html",
	"/tool-sun-exposure.html",
	"/tool-sun-exposure-2.html",
	
	"/result-breakdown.html",
	"/assets/bootstrap/css/bootstrap.min.css",
	"/assets/bootstrap/js/bootstrap.min.js",
    "/assets/css/styles.css",
    "/assets/js/authenticateUser.js",
    "/assets/js/color-theif.min.js",
    "/assets/js/dietary.js",
    "/assets/js/image-processing.js",
    "/assets/js/jquery.min.js",
    "/assets/js/jquery-3.6.0.min.js",
    "/assets/js/main.js",
    "/assets/js/mobile-menu.js",
    "/assets/js/results.js",
    "/assets/js/skin-tone.js",
    "/assets/js/sun-exposure-tool.js",
    "/assets/js/supplement.js",
    "/assets/js/tool-calculations.js",
    "/assets/js/weather.js",
    "/assets/img/logo-standard-white.png",
    "/assets/img/Skin Types/tone-1.png",
    "/assets/img/Skin Types/tone-2.png",
    "/assets/img/Skin Types/tone-3.png",
    "/assets/img/Skin Types/tone-4.png",
    "/assets/img/Skin Types/tone-5.png",
    "/assets/img/Skin Types/tone-6.png",
    "/assets/img/tool-figure/figure.png",
    "/assets/img/tool-figure/figure_hands.png",
    "/assets/img/tool-figure/figure_hat.png",
    "/assets/img/tool-figure/figure_long_sleeve.png",
    "/assets/img/tool-figure/figure_pants.png",
    "/assets/img/tool-figure/figure_shirt.png",
    "/assets/img/tool-figure/figure_singlet.png"*/
    
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


