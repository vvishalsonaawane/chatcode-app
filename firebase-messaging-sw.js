importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA2eRT4Xr-ffMLGBCdTcjCnsMcRzo1yon4",
  authDomain: "chatcode-fb6ba.firebaseapp.com",
  projectId: "chatcode-fb6ba",
  storageBucket: "chatcode-fb6ba.firebasestorage.app",
  messagingSenderId: "487610794070",
  appId: "1:487610794070:web:02fb15da8bd800f7743bf7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'ChatCode', {
    body: body || 'New message!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'chatcode-msg',
    renotify: true
  });
});
