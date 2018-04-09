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
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/restaurant.html')) {
    event.respondWith(
        caches.match('restaurant.html')
        // .then(response => response || fetch(event.request))
        .then(response => {
          // Cache hit - return response
          if(response !== undefined) {
            const cacheResponse = response;
            caches.open(staticCacheName).then(function (cache) {
              fetch(event.request).then(function(responseFetch) {
                cache.put('restaurant.html', responseFetch.clone());
              })
            });
            return response;
          }
          return fetch(event.request);
        })
    );
    return;
  } 

  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if(response !== undefined) {
        const cacheResponse = response;
        caches.open(staticCacheName).then(function (cache) {
          fetch(event.request).then(function(responseFetch) {
            cache.put(event.request, responseFetch.clone());
          })
        });
        return response;
      }
      return fetch(event.request);
    })
  );
});
