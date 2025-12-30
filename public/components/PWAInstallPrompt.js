"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PWAInstallPrompt = PWAInstallPrompt;
exports.PWAUpdatePrompt = PWAUpdatePrompt;
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function PWAInstallPrompt() {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    deferredPrompt = _useState2[0],
    setDeferredPrompt = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showInstallPrompt = _useState4[0],
    setShowInstallPrompt = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isIOS = _useState6[0],
    setIsIOS = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isStandalone = _useState8[0],
    setIsStandalone = _useState8[1];
  (0, _react.useEffect)(function () {
    // Check if running as PWA
    var isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    var handleBeforeInstallPrompt = function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user has dismissed the prompt before
      var dismissed = localStorage.getItem('pwa-install-dismissed');
      var dismissedTime = dismissed ? parseInt(dismissed) : 0;
      var oneDayInMs = 24 * 60 * 60 * 1000;
      if (!dismissed || Date.now() - dismissedTime > oneDayInMs) {
        setShowInstallPrompt(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show iOS install prompt if not standalone and not dismissed
    if (iOS && !isStandaloneMode) {
      var dismissed = localStorage.getItem('pwa-install-dismissed-ios');
      var dismissedTime = dismissed ? parseInt(dismissed) : 0;
      var oneDayInMs = 24 * 60 * 60 * 1000;
      if (!dismissed || Date.now() - dismissedTime > oneDayInMs) {
        setTimeout(function () {
          return setShowInstallPrompt(true);
        }, 3000);
      }
    }
    return function () {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  var handleInstallClick = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _yield$deferredPrompt, outcome;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!deferredPrompt) {
              _context.n = 2;
              break;
            }
            deferredPrompt.prompt();
            _context.n = 1;
            return deferredPrompt.userChoice;
          case 1:
            _yield$deferredPrompt = _context.v;
            outcome = _yield$deferredPrompt.outcome;
            if (outcome === 'accepted') {
              console.log('PWA installed');
            } else {
              console.log('PWA installation dismissed');
            }
            setDeferredPrompt(null);
            setShowInstallPrompt(false);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleInstallClick() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleDismiss = function handleDismiss() {
    var storageKey = isIOS ? 'pwa-install-dismissed-ios' : 'pwa-install-dismissed';
    localStorage.setItem(storageKey, Date.now().toString());
    setShowInstallPrompt(false);
  };

  // Don't show if already running as PWA
  if (isStandalone || !showInstallPrompt) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-2xl text-white relative overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 opacity-10"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleDismiss,
    className: "absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.X, {
    size: 16
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-white/20 rounded-xl"
  }, isIOS ? /*#__PURE__*/_react["default"].createElement(_lucideReact.Smartphone, {
    size: 20
  }) : /*#__PURE__*/_react["default"].createElement(_lucideReact.Download, {
    size: 20
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-bold text-sm"
  }, "Ilovani o'rnating"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs opacity-90"
  }, "Tezroq kirish uchun"))), isIOS ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs space-y-2 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("p", null, "Safari brauzerida:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "1."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Pastdagi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "inline-flex items-center justify-center w-4 h-4 bg-white/20 rounded"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  }))), /*#__PURE__*/_react["default"].createElement("span", null, "tugmasini bosing"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "2."), /*#__PURE__*/_react["default"].createElement("span", null, "\"Bosh ekranga qo'shish\" ni tanlang"))) : /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs mb-4 opacity-90"
  }, "Qarzdaftarni telefoningizga o'rnating va tezroq foydalaning"), !isIOS && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleInstallClick,
    className: "w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Download, {
    size: 16
  }), "O'rnatish"))));
}

// PWA Update Available Component
function PWAUpdatePrompt() {
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showUpdatePrompt = _useState0[0],
    setShowUpdatePrompt = _useState0[1];
  var _useState1 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    waitingWorker = _useState10[0],
    setWaitingWorker = _useState10[1];
  (0, _react.useEffect)(function () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        window.location.reload();
      });
      navigator.serviceWorker.ready.then(function (registration) {
        registration.addEventListener('updatefound', function () {
          var newWorker = registration.installing;
          newWorker.addEventListener('statechange', function () {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setShowUpdatePrompt(true);
            }
          });
        });
      });
    }
  }, []);
  var handleUpdate = function handleUpdate() {
    if (waitingWorker) {
      waitingWorker.postMessage({
        type: 'SKIP_WAITING'
      });
      setShowUpdatePrompt(false);
    }
  };
  if (!showUpdatePrompt) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-blue-500 rounded-xl p-4 shadow-lg text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-white/20 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Download, {
    size: 16
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-sm"
  }, "Yangilanish mavjud"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs opacity-90"
  }, "Yangi versiya tayyor"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowUpdatePrompt(false);
    },
    className: "flex-1 bg-white/20 hover:bg-white/30 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
  }, "Keyinroq"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleUpdate,
    className: "flex-1 bg-white text-blue-500 hover:bg-gray-100 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
  }, "Yangilash"))));
}