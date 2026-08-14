const CACHE_NAME='seah-wind-lms-v16';

self.addEventListener('install',event=>{
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  event.respondWith(
    fetch(event.request).catch(()=>caches.match(event.request))
  );
});

self.addEventListener('push',event=>{
  const data=event.data?event.data.json():{};
  event.waitUntil(
    self.registration.showNotification(
      data.title||'SêAH Wind LMS',
      {
        body:data.body||'You have a new update.',
        icon:'icon-192.png',
        badge:'badge-icon.png',
        data:data.url||'./'
      }
    )
  );
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data||'./')
  );
});
