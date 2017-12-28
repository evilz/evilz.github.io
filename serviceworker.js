self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('mysite').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    if (event.request.method === "GET") {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                })



                return response || fetchPromise;
            })
        })
    );
});
