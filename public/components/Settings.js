"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarSettings = QarzdaftarSettings;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _LanguageContext = require("../utils/LanguageContext");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Function to generate a random avatar color
var getRandomAvatarColor = function getRandomAvatarColor() {
  var colors = ['bg-gradient-to-br from-blue-500 to-indigo-500', 'bg-gradient-to-br from-green-500 to-emerald-500', 'bg-gradient-to-br from-orange-500 to-red-500', 'bg-gradient-to-br from-purple-500 to-pink-500', 'bg-gradient-to-br from-yellow-500 to-orange-500', 'bg-gradient-to-br from-teal-500 to-cyan-500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get subscription tier with color
var getSubscriptionTier = function getSubscriptionTier(tier, t) {
  var tiers = {
    free: {
      name: t('pricing.free.name', 'Bepul'),
      color: 'bg-gray-500',
      textColor: 'text-gray-700'
    },
    lite: {
      name: t('pricing.lite.name', 'Lite'),
      color: 'bg-green-500',
      textColor: 'text-green-700'
    },
    standard: {
      name: t('pricing.standard.name', 'Standart'),
      color: 'bg-orange-500',
      textColor: 'text-orange-700'
    },
    pro: {
      name: t('pricing.pro.name', 'Pro'),
      color: 'bg-purple-500',
      textColor: 'text-purple-700'
    }
  };
  return tiers[tier] || tiers.free;
};
function QarzdaftarSettings() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language,
    setLanguage = _useLanguage.setLanguage;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    settings = _useAuth.settings,
    logout = _useAuth.logout,
    updateUserSettings = _useAuth.updateUserSettings;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showRefreshModal = _useState2[0],
    setShowRefreshModal = _useState2[1];

  // Function to handle upgrade button click - navigate to pricing plans
  var handleUpgradeClick = function handleUpgradeClick() {
    navigate('/pricing');
  };

  // Function to handle admin panel button click
  var handleAdminPanelClick = function handleAdminPanelClick() {
    navigate('/admin/dashboard');
  };

  // Use actual subscription tier from user data or default to free
  var subscriptionTier = (user === null || user === void 0 ? void 0 : user.subscriptionTier) || 'free';
  var tierInfo = getSubscriptionTier(subscriptionTier, t);

  // Use actual avatar color from user data or generate a random one
  var avatarColor = (user === null || user === void 0 ? void 0 : user.avatarColor) || 'bg-gradient-to-br from-blue-500 to-indigo-500';

  // Handle language change
  var handleLanguageChange = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(newLanguage) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            setLanguage(newLanguage);
            _context.n = 1;
            return updateUserSettings(_objectSpread(_objectSpread({}, settings), {}, {
              language: newLanguage
            }));
          case 1:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleLanguageChange(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Handle currency change
  var handleCurrencyChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(newCurrency) {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return updateUserSettings(_objectSpread(_objectSpread({}, settings), {}, {
              currency: newCurrency
            }));
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handleCurrencyChange(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Handle theme change
  var handleThemeChange = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(newTheme) {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return updateUserSettings(_objectSpread(_objectSpread({}, settings), {}, {
              theme: newTheme
            }));
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleThemeChange(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-4xl mx-auto p-4 md:p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
  }, t('settings.title', 'Sozlamalar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-slate-300 text-sm md:text-base font-medium"
  }, t('settings.subtitle', 'Ilova sozlamalarini boshqaring va shaxsiylashtiring')))), user && /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 mb-6 dark:text-slate-100 flex items-center gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  }))), t('settings.user.title', 'Foydalanuvchi ma\'lumotlari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row items-start md:items-center gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ".concat(avatarColor)
  }, user.username.charAt(0).toUpperCase()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-3 w-3 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 3,
    d: "M5 13l4 4L19 7"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 space-y-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center gap-3"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-bold text-gray-800 text-xl dark:text-slate-100"
  }, user.username), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "px-3 py-1 rounded-full text-xs font-bold shadow-sm ring-1 ".concat(subscriptionTier === 'pro' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 ring-purple-300 dark:ring-purple-600' : subscriptionTier === 'standard' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 ring-blue-300 dark:ring-blue-600' : 'bg-gray-100 text-gray-800 dark:bg-slate-800/80 dark:text-slate-200 ring-gray-300 dark:ring-slate-600')
  }, tierInfo.name))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-wrap items-center gap-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleUpgradeClick,
    className: "group/btn relative px-4 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "relative flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  })), t('settings.subscription.upgrade', 'Yangilash'))), user.role === 'admin' && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleAdminPanelClick,
    className: "px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  })), "Admin Panel"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: logout,
    className: "px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  })), t('settings.logout', 'Chiqish'))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
  }))), t('settings.language.title', 'Til sozlamalari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 mb-1"
  }, t('settings.language.interface', 'Interfeys tili')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-slate-300"
  }, t('settings.language.description', 'Ilova tilini tanlang'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    value: settings.language || language,
    onChange: function onChange(e) {
      return handleLanguageChange(e.target.value);
    },
    className: "px-4 py-3 pr-10 rounded-xl border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/90 dark:border-slate-600/60 dark:text-slate-100 backdrop-blur-sm appearance-none transition-all duration-200 hover:border-blue-400 md:text-base text-sm font-medium shadow-sm hover:shadow-md"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "uz"
  }, t('languages.uz', "O'zbek tili")), /*#__PURE__*/_react["default"].createElement("option", {
    value: "ru"
  }, t('languages.ru', 'Русский')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "en"
  }, t('languages.en', 'English')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "tjk"
  }, t('languages.tjk', 'Тоҷикӣ'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5 text-gray-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 9l-7 7-7-7"
  })))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), t('settings.currency.title', 'Valyuta sozlamalari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 mb-1"
  }, t('settings.currency.main', 'Asosiy valyuta')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-slate-300"
  }, t('settings.currency.description', 'Qarzlar ko\'rsatish uchun asosiy valyuta'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    value: settings.currency,
    onChange: function onChange(e) {
      return handleCurrencyChange(e.target.value);
    },
    className: "px-4 py-3 pr-10 rounded-xl border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 dark:bg-slate-800/90 dark:border-slate-600/60 dark:text-slate-100 backdrop-blur-sm appearance-none transition-all duration-200 hover:border-green-400 md:text-base text-sm font-medium shadow-sm hover:shadow-md"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "UZS"
  }, t('currencies.UZS', "UZS - O'zbek so'm")), /*#__PURE__*/_react["default"].createElement("option", {
    value: "USD"
  }, t('currencies.USD', 'USD - Dollar')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "EUR"
  }, t('currencies.EUR', 'EUR - Yevro')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "RUB"
  }, t('currencies.RUB', 'RUB - Rubl')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "TJS"
  }, t('currencies.TJS', 'TJS - Tojik somoni'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5 text-gray-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 9l-7 7-7-7"
  })))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, settings.theme === 'dark' ? /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  }))), t('settings.theme.title', 'Mavzu sozlamalari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 mb-1"
  }, t('settings.theme.color', 'Rang mavzusi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-slate-300"
  }, t('settings.theme.description', 'Yorug\' yoki qorong\'u mavzuni tanlang'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 p-1 bg-gray-100/80 dark:bg-slate-800/90 rounded-xl backdrop-blur-sm"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleThemeChange('light');
    },
    className: "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ".concat(settings.theme === 'light' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105' : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })), t('settings.theme.light', 'Yorug\'')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleThemeChange('dark');
    },
    className: "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ".concat(settings.theme === 'dark' ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 shadow-lg transform scale-105 ring-2 ring-slate-600' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:text-gray-800 dark:hover:text-slate-100')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })), t('settings.theme.dark', 'Qorong\'u'))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  }))), t('settings.refresh.title', 'Ilovani yangilash')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 mb-1"
  }, t('settings.refresh.button', 'Ilovani yangilash')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-slate-300"
  }, t('settings.refresh.description', 'Ilovani to\'liq qayta yuklash (Ctrl+Shift+R)'))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowRefreshModal(true);
    },
    className: "group/btn relative px-4 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-xl blur opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "relative flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  })), t('settings.refresh.button', 'Ilovani yangilash'))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-gray-500/10 via-slate-500/10 to-gray-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2 md:gap-3 dark:text-slate-100"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), t('settings.about.title', 'Ilova haqida')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4 md:h-5 md:w-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base"
  }, t('settings.about.totalDebts', 'Jami qarzlar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs md:text-sm text-gray-600 dark:text-slate-300"
  }, "Yaratilgan qarzlar soni"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"
  }, t('settings.about.noDebts', '0')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4 md:h-5 md:w-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base"
  }, t('settings.about.selectedLanguage', 'Tanlangan til')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs md:text-sm text-gray-600 dark:text-slate-300"
  }, "Joriy interfeys tili"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm md:text-lg font-semibold text-green-600 dark:text-green-400"
  }, t("languages.".concat(settings.language || language), settings.language || language)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/60 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/40 dark:border-slate-600/50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4 md:h-5 md:w-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-slate-100 text-sm md:text-base"
  }, t('settings.about.mainCurrency', 'Asosiy valyuta')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs md:text-sm text-gray-600 dark:text-slate-300"
  }, "Qarzlar ko'rsatish valyutasi"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm md:text-lg font-semibold text-orange-600 dark:text-orange-400"
  }, t("currencies.".concat(settings.currency), settings.currency))))))))), showRefreshModal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6 pb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-4 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-slate-100"
  }, t('settings.refresh.confirmTitle', 'Ilovani yangilashni tasdiqlang')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-slate-400 mt-1"
  }, "Bu amal qaytarib bo'lmaydi"))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-700 dark:text-slate-300 leading-relaxed"
  }, t('settings.refresh.confirmMessage', 'Bu amalni bajarish ilova to\'liq qayta yuklanadi va barcha saqlanmagan ma\'lumotlar yo\'qoladi. Davom etishni xohlaysizmi?'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-6 pb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row gap-3 sm:justify-end"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowRefreshModal(false);
    },
    className: "px-4 py-2.5 text-gray-700 dark:text-slate-300 bg-gray-100/80 dark:bg-slate-700/80 hover:bg-gray-200/80 dark:hover:bg-slate-600/80 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50"
  }, t('settings.refresh.cancel', 'Bekor qilish')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      setShowRefreshModal(false);
      // Small delay for smooth modal close animation
      setTimeout(function () {
        window.location.reload(true);
      }, 200);
    },
    className: "px-4 py-2.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  })), t('settings.refresh.confirm', 'Ha, yangilash')))))));
}