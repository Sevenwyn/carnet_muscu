/* Carnet de charges — cache hors-ligne */
var CACHE = "carnet-v1";
var FICHIERS = ["./", "./index.html", "./manifest.webmanifest",
                "./icone-192.png", "./icone-512.png"];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FICHIERS); })
    .then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(noms){
    return Promise.all(noms.filter(function(n){ return n !== CACHE; })
                            .map(function(n){ return caches.delete(n); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(rep){
      if (rep) return rep;
      return fetch(e.request).then(function(res){
        var url = e.request.url;
        var cachable = res && res.status === 200 &&
          (url.indexOf(self.location.origin) === 0 || url.indexOf("fonts.g") > -1);
        if (cachable){
          var copie = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copie); });
        }
        return res;
      }).catch(function(){
        return e.request.mode === "navigate" ? caches.match("./index.html") : Response.error();
      });
    })
  );
});
