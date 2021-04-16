importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');
workbox.routing.registerRoute(
	({request}) => request.destination == 'image',
	new workbox.strategies.CacheFirst()
);
self.addListener("fetch",e =>{
	e.respondWith(
		fetch(e.request).catch(() =>{
			return new Response("Hello")
		})
	);
});