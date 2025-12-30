"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeToPushNotifications = exports.scheduleBackgroundSync = exports.registerServiceWorker = exports.onNetworkChange = exports.isPWA = exports.isIOS = exports.isAndroid = exports.installPWA = exports.getNetworkStatus = exports.getInstallPrompt = exports.getIOSInstallInstructions = exports.getCacheSize = exports.getAppVersion = exports.clearAppCache = exports.checkForUpdates = void 0;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// PWA Service Worker Registration
var registerServiceWorker = exports.registerServiceWorker = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var registration, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!('serviceWorker' in navigator)) {
            _context.n = 4;
            break;
          }
          _context.p = 1;
          console.log('Registering service worker...');
          _context.n = 2;
          return navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
        case 2:
          registration = _context.v;
          console.log('Service Worker registered successfully:', registration);

          // Handle updates
          registration.addEventListener('updatefound', function () {
            var newWorker = registration.installing;
            console.log('New service worker found:', newWorker);
            newWorker.addEventListener('statechange', function () {
              console.log('Service worker state changed:', newWorker.state);
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content is available; please refresh.');

                // Dispatch custom event for update notification
                window.dispatchEvent(new CustomEvent('sw-update-available', {
                  detail: {
                    registration: registration,
                    newWorker: newWorker
                  }
                }));
              }
            });
          });

          // Handle controller change
          navigator.serviceWorker.addEventListener('controllerchange', function () {
            console.log('Service worker controller changed, reloading page...');
            window.location.reload();
          });
          return _context.a(2, registration);
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error('Service Worker registration failed:', _t);
          return _context.a(2, null);
        case 4:
          console.log('Service Worker not supported');
          return _context.a(2, null);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return function registerServiceWorker() {
    return _ref.apply(this, arguments);
  };
}();

// Check if app is running as PWA
var isPWA = exports.isPWA = function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
};

// Check if device is iOS
var isIOS = exports.isIOS = function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Check if device is Android
var isAndroid = exports.isAndroid = function isAndroid() {
  return /Android/.test(navigator.userAgent);
};

// Get install prompt availability
var getInstallPrompt = exports.getInstallPrompt = function getInstallPrompt() {
  return new Promise(function (resolve) {
    var deferredPrompt = null;
    var _handleBeforeInstallPrompt = function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      deferredPrompt = e;
      resolve(deferredPrompt);
      window.removeEventListener('beforeinstallprompt', _handleBeforeInstallPrompt);
    };
    window.addEventListener('beforeinstallprompt', _handleBeforeInstallPrompt);

    // Timeout after 5 seconds
    setTimeout(function () {
      window.removeEventListener('beforeinstallprompt', _handleBeforeInstallPrompt);
      resolve(null);
    }, 5000);
  });
};

// Install PWA
var installPWA = exports.installPWA = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(deferredPrompt) {
    var _yield$deferredPrompt, outcome, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (deferredPrompt) {
            _context2.n = 1;
            break;
          }
          console.log('No install prompt available');
          return _context2.a(2, false);
        case 1:
          _context2.p = 1;
          deferredPrompt.prompt();
          _context2.n = 2;
          return deferredPrompt.userChoice;
        case 2:
          _yield$deferredPrompt = _context2.v;
          outcome = _yield$deferredPrompt.outcome;
          console.log('Install prompt outcome:', outcome);
          return _context2.a(2, outcome === 'accepted');
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error('Error installing PWA:', _t2);
          return _context2.a(2, false);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return function installPWA(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// Add to home screen instructions for iOS
var getIOSInstallInstructions = exports.getIOSInstallInstructions = function getIOSInstallInstructions() {
  return {
    title: 'Ilovani o\'rnatish',
    steps: ['Safari brauzerini oching', 'Pastdagi "Ulashish" tugmasini bosing', '"Bosh ekranga qo\'shish" ni tanlang', '"Qo\'shish" tugmasini bosing']
  };
};

// Check network status
var getNetworkStatus = exports.getNetworkStatus = function getNetworkStatus() {
  return {
    online: navigator.onLine,
    connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection
  };
};

// Listen for network changes
var onNetworkChange = exports.onNetworkChange = function onNetworkChange(callback) {
  var handleOnline = function handleOnline() {
    return callback(true);
  };
  var handleOffline = function handleOffline() {
    return callback(false);
  };
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  return function () {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Cache management
var clearAppCache = exports.clearAppCache = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var cacheNames, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!('caches' in window)) {
            _context3.n = 5;
            break;
          }
          _context3.p = 1;
          _context3.n = 2;
          return caches.keys();
        case 2:
          cacheNames = _context3.v;
          _context3.n = 3;
          return Promise.all(cacheNames.map(function (cacheName) {
            return caches["delete"](cacheName);
          }));
        case 3:
          console.log('App cache cleared');
          return _context3.a(2, true);
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          console.error('Error clearing cache:', _t3);
          return _context3.a(2, false);
        case 5:
          return _context3.a(2, false);
      }
    }, _callee3, null, [[1, 4]]);
  }));
  return function clearAppCache() {
    return _ref3.apply(this, arguments);
  };
}();

// Get cache size
var getCacheSize = exports.getCacheSize = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var estimate, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (!('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage)) {
            _context4.n = 4;
            break;
          }
          _context4.p = 1;
          _context4.n = 2;
          return navigator.storage.estimate();
        case 2:
          estimate = _context4.v;
          return _context4.a(2, {
            used: estimate.usage,
            available: estimate.quota,
            usedMB: Math.round(estimate.usage / 1024 / 1024 * 100) / 100,
            availableMB: Math.round(estimate.quota / 1024 / 1024 * 100) / 100
          });
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          console.error('Error getting cache size:', _t4);
          return _context4.a(2, null);
        case 4:
          return _context4.a(2, null);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return function getCacheSize() {
    return _ref4.apply(this, arguments);
  };
}();

// Background sync for offline actions
var scheduleBackgroundSync = exports.scheduleBackgroundSync = function scheduleBackgroundSync(tag, data) {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(function (registration) {
      // Store data for sync
      localStorage.setItem("sync-".concat(tag), JSON.stringify(data));

      // Register background sync
      return registration.sync.register(tag);
    })["catch"](function (error) {
      console.error('Background sync registration failed:', error);
    });
  } else {
    console.log('Background sync not supported');
  }
};

// Push notification subscription
var subscribeToPushNotifications = exports.subscribeToPushNotifications = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var registration, subscription, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (!('serviceWorker' in navigator && 'PushManager' in window)) {
            _context5.n = 5;
            break;
          }
          _context5.p = 1;
          _context5.n = 2;
          return navigator.serviceWorker.ready;
        case 2:
          registration = _context5.v;
          _context5.n = 3;
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.VITE_VAPID_PUBLIC_KEY || '')
          });
        case 3:
          subscription = _context5.v;
          console.log('Push notification subscription:', subscription);
          return _context5.a(2, subscription);
        case 4:
          _context5.p = 4;
          _t5 = _context5.v;
          console.error('Push notification subscription failed:', _t5);
          return _context5.a(2, null);
        case 5:
          return _context5.a(2, null);
      }
    }, _callee5, null, [[1, 4]]);
  }));
  return function subscribeToPushNotifications() {
    return _ref5.apply(this, arguments);
  };
}();

// Helper function for VAPID key conversion
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// App version management
var getAppVersion = exports.getAppVersion = function getAppVersion() {
  return process.env.VITE_APP_VERSION || '1.0.0';
};

// Check for app updates
var checkForUpdates = exports.checkForUpdates = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var registration, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          if (!('serviceWorker' in navigator)) {
            _context6.n = 6;
            break;
          }
          _context6.p = 1;
          _context6.n = 2;
          return navigator.serviceWorker.getRegistration();
        case 2:
          registration = _context6.v;
          if (!registration) {
            _context6.n = 4;
            break;
          }
          _context6.n = 3;
          return registration.update();
        case 3:
          console.log('Checked for updates');
          return _context6.a(2, true);
        case 4:
          _context6.n = 6;
          break;
        case 5:
          _context6.p = 5;
          _t6 = _context6.v;
          console.error('Error checking for updates:', _t6);
        case 6:
          return _context6.a(2, false);
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return function checkForUpdates() {
    return _ref6.apply(this, arguments);
  };
}();