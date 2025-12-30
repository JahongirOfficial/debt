"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileModal = UserProfileModal;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
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
function UserProfileModal(_ref) {
  var isOpen = _ref.isOpen,
    userId = _ref.userId,
    username = _ref.username,
    onClose = _ref.onClose;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    profile = _useState2[0],
    setProfile = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  (0, _react.useEffect)(function () {
    if (isOpen && userId) {
      fetchUserProfile();
    }
  }, [isOpen, userId]);
  var fetchUserProfile = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            setError(null);
            _context.n = 1;
            return (0, _api.apiFetch)("/admin/users/".concat(userId, "/profile"), {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token'))
              }
            });
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            data = _context.v;
            setProfile(data.profile);
            _context.n = 4;
            break;
          case 3:
            setError('Foydalanuvchi ma\'lumotlarini olishda xatolik');
          case 4:
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Error fetching user profile:', _t);
            setError('Server bilan bog\'lanishda xatolik');
          case 6:
            _context.p = 6;
            setLoading(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[0, 5, 6, 7]]);
    }));
    return function fetchUserProfile() {
      return _ref2.apply(this, arguments);
    };
  }();
  var formatCurrency = function formatCurrency(amount) {
    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UZS';
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' ' + currency;
  };
  var formatDate = function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  var getSubscriptionBadge = function getSubscriptionBadge(subscription) {
    var config = {
      free: {
        color: 'bg-gray-100 text-gray-800',
        text: 'Bepul'
      },
      lite: {
        color: 'bg-green-100 text-green-800',
        text: 'Lite'
      },
      standard: {
        color: 'bg-blue-100 text-blue-800',
        text: 'Standart'
      },
      pro: {
        color: 'bg-purple-100 text-purple-800',
        text: 'Professional'
      }
    };
    var sub = config[subscription] || config.free;
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ".concat(sub.color)
    }, sub.text);
  };
  var getStatusBadge = function getStatusBadge(status) {
    var config = {
      active: {
        color: 'bg-green-100 text-green-800',
        text: 'Faol'
      },
      suspended: {
        color: 'bg-red-100 text-red-800',
        text: 'Bloklangan'
      }
    };
    var stat = config[status] || config.active;
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ".concat(stat.color)
    }, stat.text);
  };
  if (!isOpen) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 overflow-y-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
    onClick: onClose
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xl font-bold text-white"
  }, (username === null || username === void 0 ? void 0 : username.charAt(0).toUpperCase()) || 'U')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-white"
  }, username || 'Foydalanuvchi', " profili"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-blue-100"
  }, "To'liq ma'lumotlar"))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose,
    className: "text-white hover:text-gray-200 transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-6 py-6 max-h-96 overflow-y-auto"
  }, loading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"
  })) : error ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 text-red-600",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 dark:text-white mb-2"
  }, "Xatolik yuz berdi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, error)) : profile ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-lg font-semibold text-gray-900 dark:text-white mb-4"
  }, "Foydalanuvchi ma'lumotlari"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Foydalanuvchi nomi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-900 dark:text-white font-semibold"
  }, profile.user.username)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Telefon"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-900 dark:text-white font-semibold"
  }, profile.user.phone)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Holat"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-1"
  }, getStatusBadge(profile.user.status))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Obuna"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-1"
  }, getSubscriptionBadge(profile.user.subscriptionTier))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Ro'yxatdan o'tgan"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-900 dark:text-white"
  }, formatDate(profile.user.createdAt))), profile.user.subscriptionExpiresAt && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Obuna tugaydi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-orange-600 dark:text-orange-400 font-semibold"
  }, formatDate(profile.user.subscriptionExpiresAt)))), profile.user.telegramId && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("h5", {
    className: "text-sm font-semibold text-gray-900 dark:text-white mb-2"
  }, "Telegram"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4 text-sm"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-green-600 dark:text-green-400"
  }, "\u2713 Ulangan"), profile.user.telegramUsername && /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-gray-600 dark:text-gray-400"
  }, "@", profile.user.telegramUsername), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-gray-500 dark:text-gray-400"
  }, formatDate(profile.user.telegramConnectedAt))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-blue-50 dark:bg-blue-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-blue-600 dark:text-blue-400"
  }, profile.stats.totalDebts), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-blue-600 dark:text-blue-400"
  }, "Jami qarzlar")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-orange-50 dark:bg-orange-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-orange-600 dark:text-orange-400"
  }, profile.stats.pendingDebts), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-orange-600 dark:text-orange-400"
  }, "To'lanmagan")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-green-50 dark:bg-green-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-green-600 dark:text-green-400"
  }, profile.stats.paidDebts), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-green-600 dark:text-green-400"
  }, "To'langan")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-red-50 dark:bg-red-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-red-600 dark:text-red-400"
  }, profile.stats.dueTodayCount), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-red-600 dark:text-red-400"
  }, "Bugun")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-yellow-600 dark:text-yellow-400"
  }, profile.stats.dueTomorrowCount), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-yellow-600 dark:text-yellow-400"
  }, "Ertaga")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-purple-50 dark:bg-purple-900 p-4 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-lg font-bold text-purple-600 dark:text-purple-400"
  }, formatCurrency(profile.stats.totalAmount)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-purple-600 dark:text-purple-400"
  }, "Jami summa"))), profile.dueToday.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-red-50 dark:bg-red-900 rounded-xl p-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  })), "Bugun qarz keltiruvchilar (", profile.stats.dueTodayCount, " kishi)"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3"
  }, profile.dueToday.map(function (debt, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, debt.creditor), debt.description && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-600 dark:text-gray-400"
    }, debt.description)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-bold text-red-600 dark:text-red-400"
    }, formatCurrency(debt.amount, debt.currency))));
  }))), profile.dueTomorrow.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-yellow-50 dark:bg-yellow-900 rounded-xl p-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  })), "Ertaga qarz keltiruvchilar (", profile.stats.dueTomorrowCount, " kishi)"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3"
  }, profile.dueTomorrow.map(function (debt, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, debt.creditor), debt.description && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-600 dark:text-gray-400"
    }, debt.description)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-bold text-yellow-600 dark:text-yellow-400"
    }, formatCurrency(debt.amount, debt.currency))));
  }))), profile.overdue.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-red-100 dark:bg-red-900 rounded-xl p-6"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  })), "Muddati o'tgan qarzdorlar (", profile.stats.overdueCount, " kishi)"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3"
  }, profile.overdue.map(function (debt, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, debt.creditor), debt.description && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-600 dark:text-gray-400"
    }, debt.description), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs text-red-600 dark:text-red-400"
    }, debt.daysOverdue, " kun kechikkan")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-bold text-red-600 dark:text-red-400"
    }, formatCurrency(debt.amount, debt.currency))));
  }))), profile.stats.totalDebts === 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 dark:text-white mb-2"
  }, "Qarzlar yo'q"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Bu foydalanuvchida hech qanday qarz yo'q"))) : null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose,
    className: "bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
  }, "Yopish")))));
}