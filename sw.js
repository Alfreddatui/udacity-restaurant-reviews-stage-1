var staticCacheName = 'restauran-reviews-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/restaurant.html',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'data/restaurants.json',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log('before if response', response);
      // Cache hit - return response
      if(response !== undefined) {
        console.log('enter if response', response);
        const cacheResponse = response;
        caches.open(staticCacheName).then(function (cache) {
          console.log('cache open', cache);
          fetch(event.request).then(function(responseFetch) {
            console.log('fetch success', responseFetch);
            cache.put(event.request, responseFetch.clone());
          })
        });
        return response;
      }
      return fetch(event.request);
    })
  );
});
