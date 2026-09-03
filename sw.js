/* Carnet de charges — cache hors-ligne */
var CACHE = "carnet-14fecbb8";
var FICHIERS = ["./", "./index.html", "./programme.html", "./manifest.webmanifest",
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
  var req = e.request;
  if (req.method !== "GET") return;

  /* La page elle-meme : le reseau d'abord, le cache en secours.
     Sans ca l'app resterait une visite en retard a chaque mise a jour. */
  if (req.mode === "navigate" || req.destination === "document"){
    e.respondWith(
      fetch(req).then(function(res){
        var copie = res.clone();
        caches.open(CACHE).then(function(c){ c.put("./index.html", copie); });
        return res;
      }).catch(function(){
        return caches.match("./index.html").then(function(r){
          return r || caches.match("./");
        });
      })
    );
    return;
  }

  /* Le reste (police, icones) : le cache d'abord, c'est stable. */
  e.respondWith(
    caches.match(req).then(function(rep){
      if (rep) return rep;
      return fetch(req).then(function(res){
        var url = req.url;
        var cachable = res && res.status === 200 &&
          (url.indexOf(self.location.origin) === 0 || url.indexOf("fonts.g") > -1);
        if (cachable){
          var copie = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copie); });
        }
        return res;
      }).catch(function(){ return Response.error(); });
    })
  );
});
