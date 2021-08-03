
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');
workbox.routing.registerRoute(
	({request}) => request.destination == 'image',
	new workbox.strategies.CacheFirst()
);

let isInstalled = localStorage.getItem('pwaInstalled') === '1' || false;

if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    // User is currently navigating on the PWA so yes it's installed
    localStorage.setItem('pwaInstalled', '1');
    isInstalled = true;
} else {
    //User is navigating in browser
    window.addEventListener('beforeinstallprompt', () => {
        localStorage.setItem('pwaInstalled', '0');
        isInstalled = false;
        //User can get an installation prompt meaning the app is not installed
    });
    window.addEventListener('onappinstalled', () => {
        localStorage.setItem('pwaInstalled', '1');
        isInstalled = true;
    });
}

console.log(isInstalled + " app");