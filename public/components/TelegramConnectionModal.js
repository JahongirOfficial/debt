"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lucideReact = require("lucide-react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
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
var TelegramConnectionModal = function TelegramConnectionModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    user = _ref.user;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isClosing = _useState2[0],
    setIsClosing = _useState2[1];
  var _useState3 = (0, _react.useState)('initial'),
    _useState4 = _slicedToArray(_useState3, 2),
    connectionStep = _useState4[0],
    setConnectionStep = _useState4[1]; // initial, connecting, connected
  var _useState5 = (0, _react.useState)({
      token: '',
      botUsername: 'qarzdaftarchabot',
      telegramUrl: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    telegramData = _useState6[0],
    setTelegramData = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isLoading = _useState8[0],
    setIsLoading = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState0 = _slicedToArray(_useState9, 2),
    error = _useState0[0],
    setError = _useState0[1];

  // Generate connection token from backend
  var generateConnectionToken = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, contentType, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setIsLoading(true);
            setError('');
            _context.p = 1;
            token = localStorage.getItem('token');
            if (token) {
              _context.n = 2;
              break;
            }
            setError('Tizimga kiring');
            return _context.a(2);
          case 2:
            _context.n = 3;
            return fetch('/api/telegram/generate-token', {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 3:
            response = _context.v;
            if (response.ok) {
              _context.n = 4;
              break;
            }
            throw new Error("HTTP error! status: ".concat(response.status));
          case 4:
            contentType = response.headers.get('content-type');
            if (!(!contentType || !contentType.includes('application/json'))) {
              _context.n = 5;
              break;
            }
            throw new Error('Backend server ishlamayapti. Iltimos, serverni ishga tushiring.');
          case 5:
            _context.n = 6;
            return response.json();
          case 6:
            data = _context.v;
            if (data.success) {
              setTelegramData({
                token: data.token,
                botUsername: data.botUsername,
                telegramUrl: data.telegramUrl
              });
            } else {
              setError(data.message || 'Token yaratishda xatolik');
            }
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error('Error generating token:', _t);
            if (_t.message.includes('Backend server ishlamayapti')) {
              setError('Backend server ishlamayapti. npm run dev:full buyrug\'ini ishga tushiring.');
            } else {
              setError('Server bilan bog\'lanishda xatolik');
            }
          case 8:
            _context.p = 8;
            setIsLoading(false);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[1, 7, 8, 9]]);
    }));
    return function generateConnectionToken() {
      return _ref2.apply(this, arguments);
    };
  }();

  // Modal ochilganda token yaratish
  (0, _react.useEffect)(function () {
    if (isOpen && connectionStep === 'initial') {
      generateConnectionToken();
    }
  }, [isOpen, connectionStep]);
  var handleClose = function handleClose() {
    setIsClosing(true);
    setTimeout(function () {
      onClose();
      setIsClosing(false);
    }, 300);
  };
  var handleConnectClick = function handleConnectClick() {
    if (!telegramData.telegramUrl) {
      setError('Telegram URL yaratilmagan. Qayta urinib ko\'ring.');
      return;
    }
    setConnectionStep('connecting');
    // Open Telegram bot in new window
    window.open(telegramData.telegramUrl, '_blank');

    // Check connection status periodically
    var checkConnection = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var token, response, contentType, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            token = localStorage.getItem('token');
            _context2.n = 1;
            return fetch('/api/telegram/status', {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context2.v;
            if (response.ok) {
              _context2.n = 2;
              break;
            }
            console.log('Backend not responding, skipping connection check');
            return _context2.a(2);
          case 2:
            contentType = response.headers.get('content-type');
            if (!(!contentType || !contentType.includes('application/json'))) {
              _context2.n = 3;
              break;
            }
            console.log('Backend returned non-JSON response, skipping connection check');
            return _context2.a(2);
          case 3:
            _context2.n = 4;
            return response.json();
          case 4:
            data = _context2.v;
            if (data.success && data.connected) {
              setConnectionStep('connected');
              clearInterval(checkConnection);
            }
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error('Error checking connection:', _t2);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 5]]);
    })), 2000);

    // Stop checking after 2 minutes
    setTimeout(function () {
      clearInterval(checkConnection);
      if (connectionStep === 'connecting') {
        setError('Bog\'lanish vaqti tugadi. Qayta urinib ko\'ring.');
        setConnectionStep('initial');
      }
    }, 120000);
  };
  var handleSkip = function handleSkip() {
    // Set flag to not show modal for 24 hours
    var skipTime = Date.now().toString();
    localStorage.setItem('telegramModalSkipped', skipTime);
    console.log('Telegram modal skipped until:', new Date(parseInt(skipTime) + 24 * 60 * 60 * 1000));
    handleClose();
  };
  if (!isOpen) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ".concat(isClosing ? 'opacity-0' : 'opacity-100')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ".concat(isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100')
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClose,
    className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.X, {
    size: 20
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white relative overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 opacity-10"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative z-10"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 mb-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-white/20 rounded-xl backdrop-blur-sm"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.MessageCircle, {
    size: 24
  })), /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-bold"
  }, "Telegram Bot bilan bog'laning")), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-blue-100 text-sm"
  }, "Qarz eslatmalarini Telegram orqali oling"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, connectionStep === 'initial' && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isLoading && /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-4 mb-4"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Loader, {
    className: "animate-spin mx-auto mb-2 text-blue-500",
    size: 24
  }), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600"
  }, "Token yaratilmoqda...")), error && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-red-800 text-sm"
  }, error), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: generateConnectionToken,
    className: "text-red-600 hover:text-red-800 text-sm font-medium mt-1"
  }, "Qayta urinish")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-green-100 rounded-lg mt-0.5"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Zap, {
    size: 16,
    className: "text-green-600"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-900 text-sm"
  }, "Tezkor eslatmalar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-xs"
  }, "Ertaga muddati tugaydigan qarzlar haqida darhol xabar oling"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-blue-100 rounded-lg mt-0.5"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Shield, {
    size: 16,
    className: "text-blue-600"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-900 text-sm"
  }, "Xavfsiz ulanish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-xs"
  }, "Ma'lumotlaringiz shifrlangan holda uzatiladi"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-purple-100 rounded-lg mt-0.5"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.Clock, {
    size: 16,
    className: "text-purple-600"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-900 text-sm"
  }, "24/7 mavjud"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-xs"
  }, "Istalgan vaqtda qarz ma'lumotlarini oling")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gray-50 rounded-xl p-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-900 text-sm mb-3"
  }, "Qanday ishlaydi:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-2 text-xs text-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
  }, "1"), /*#__PURE__*/_react["default"].createElement("span", null, "\"Telegram Bot\"ga o'tish tugmasini bosing")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
  }, "2"), /*#__PURE__*/_react["default"].createElement("span", null, "Botga /start buyrug'ini yuboring")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
  }, "3"), /*#__PURE__*/_react["default"].createElement("span", null, "Bog'lanish tasdiqlanadi")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleConnectClick,
    disabled: isLoading || !telegramData.telegramUrl || error,
    className: "w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.MessageCircle, {
    size: 18
  }), "Telegram Botga o'tish", /*#__PURE__*/_react["default"].createElement(_lucideReact.ExternalLink, {
    size: 16
  })), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSkip,
    className: "w-full text-gray-500 py-2 px-4 rounded-xl font-medium hover:text-gray-700 hover:bg-gray-50 transition-colors text-sm"
  }, "Keyinroq bog'layman"))), connectionStep === 'connecting' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.MessageCircle, {
    size: 32,
    className: "text-blue-600 animate-pulse"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 mb-2"
  }, "Bog'lanish kutilmoqda..."), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-sm mb-4"
  }, "Telegram botga /start buyrug'ini yuboring"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-yellow-800 text-xs"
  }, "\uD83D\uDCA1 Agar bot ochilmagan bo'lsa, @", telegramData.botUsername, " ni qidirib toping"))), connectionStep === 'connected' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement(_lucideReact.CheckCircle, {
    size: 32,
    className: "text-green-600"
  })), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 mb-2"
  }, "Muvaffaqiyatli bog'landi!"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-sm mb-6"
  }, "Endi siz Telegram orqali qarz eslatmalarini olishingiz mumkin"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-green-900 text-sm mb-2"
  }, "Mavjud buyruqlar:"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-green-800 space-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", null, "/tomorrow - Ertaga muddati tugaydigan qarzlar"), /*#__PURE__*/_react["default"].createElement("div", null, "/today - Bugungi qarzlar"), /*#__PURE__*/_react["default"].createElement("div", null, "/week - Bir haftalik qarzlar"), /*#__PURE__*/_react["default"].createElement("div", null, "/stats - Umumiy statistika"))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleClose,
    className: "w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
  }, "Yopish")))));
};
var _default = exports["default"] = TelegramConnectionModal;