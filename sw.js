'use strict';

var staticCacheName = 'tms-cache';
var assets = ['./', './index.html', './app.js', './water-bottle.png', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js'];

// install event
self.addEventListener('install', function (evt) {
  // console.log('service worker installed');
  evt.waitUntil(caches.open(staticCacheName).then(function (cache) {
    console.log('caching shell assets');
    cache.addAll(assets);
  }));
});

// activate event
self.addEventListener('activate', function (evt) {
  // console.log('service worker activated');
  evt.waitUntil(caches.keys().then(function (keys) {
    //console.log(keys);
    return Promise.all(keys.filter(function (key) {
      return key !== staticCacheName;
    }).map(function (key) {
      return caches.delete(key);
    }));
  }));
});

// fetch event
self.addEventListener('fetch', function (evt) {
  // console.log('fetch event', evt);
  evt.respondWith(caches.match(evt.request).then(function (cacheRes) {
    return cacheRes || fetch(evt.request);
  }));
});