const CACHE_NAME = "version-1"
const URLaToCache = ["index.html","offline.html"]

//instalar SW
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache)=>{
                console.log("cache abierto:")
                return cache.addAll(URLaToCache)
            })
    )
})
//escuchar por requests
self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request)
            .then(()=>{
                return fetch(event.request)
                    .catch(()=>caches.match('offline.html'))
            })
    )
})
//activar el SW
self.addEventListener("activate",(event)=>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cacheWhiteList.includes(cacheName))
                return caches.delete(cacheName)
            })
        ))
    )
})