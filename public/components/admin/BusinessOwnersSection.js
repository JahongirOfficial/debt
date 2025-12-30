"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessOwnersSection = BusinessOwnersSection;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function BusinessOwnersSection() {
  var _selectedOwner$subscr, _selectedOwner$limits, _selectedOwner$usage, _selectedOwner$limits2;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    businessOwners = _useState2[0],
    setBusinessOwners = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    searchTerm = _useState6[0],
    setSearchTerm = _useState6[1];
  var _useState7 = (0, _react.useState)('all'),
    _useState8 = _slicedToArray(_useState7, 2),
    filterTier = _useState8[0],
    setFilterTier = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    selectedOwner = _useState0[0],
    setSelectedOwner = _useState0[1];
  var _useState1 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    ownerDebts = _useState10[0],
    setOwnerDebts = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    debtsLoading = _useState12[0],
    setDebtsLoading = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showDebtsModal = _useState14[0],
    setShowDebtsModal = _useState14[1];
  (0, _react.useEffect)(function () {
    fetchBusinessOwners();
  }, []);
  var fetchBusinessOwners = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return (0, _api.apiFetch)('/admin/business-owners', {
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
            setBusinessOwners(data.businessOwners || []);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching business owners:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchBusinessOwners() {
      return _ref.apply(this, arguments);
    };
  }();
  var filteredOwners = businessOwners.filter(function (owner) {
    var _owner$username, _owner$phone;
    var matchesSearch = ((_owner$username = owner.username) === null || _owner$username === void 0 ? void 0 : _owner$username.toLowerCase().includes(searchTerm.toLowerCase())) || ((_owner$phone = owner.phone) === null || _owner$phone === void 0 ? void 0 : _owner$phone.includes(searchTerm));
    var matchesTier = filterTier === 'all' || owner.subscriptionTier === filterTier;
    // Faqat faol biznes egalarini ko'rsatish
    return matchesSearch && matchesTier && owner.isActive !== false;
  });
  var getTierColor = function getTierColor(tier) {
    switch (tier) {
      case 'pro':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'standard':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'lite':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'free':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };
  var getTierIcon = function getTierIcon(tier) {
    switch (tier) {
      case 'pro':
        return '👑';
      case 'standard':
        return '⭐';
      case 'lite':
        return '🌟';
      case 'free':
        return '👤';
      default:
        return '👤';
    }
  };
  var handleViewDebts = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ownerId) {
      var owner, response, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            setDebtsLoading(true);
            setShowDebtsModal(true);
            owner = businessOwners.find(function (o) {
              return o._id === ownerId;
            });
            setSelectedOwner(owner);
            _context2.n = 1;
            return (0, _api.apiFetch)("/admin/business-owner-debts/".concat(ownerId), {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token'))
              }
            });
          case 1:
            response = _context2.v;
            if (!response.ok) {
              _context2.n = 3;
              break;
            }
            _context2.n = 2;
            return response.json();
          case 2:
            data = _context2.v;
            setOwnerDebts(data.debts || []);
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Error fetching owner debts:', _t2);
          case 5:
            _context2.p = 5;
            setDebtsLoading(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 4, 5, 6]]);
    }));
    return function handleViewDebts(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var formatAmount = function formatAmount(amount) {
    if (!amount || isNaN(amount)) return '0';
    return Number(amount).toLocaleString('uz-UZ');
  };
  var formatDate = function formatDate(dateString) {
    if (!dateString) return 'Sana yo\'q';
    try {
      var date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Noto\'g\'ri sana';
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Noto\'g\'ri sana';
    }
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, _toConsumableArray(Array(5)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "h-16 bg-gray-300 dark:bg-gray-600 rounded"
      });
    }))));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-2xl font-bold text-gray-900 dark:text-white mb-2"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBC Biznes Egalari"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Barcha biznes egalari va ularning ma'lumotlari")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-4 sm:mt-0"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }, filteredOwners.length, " ta egalar"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-gray-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }))), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Ism yoki telefon bo'yicha qidirish...",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    className: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("select", {
    value: filterTier,
    onChange: function onChange(e) {
      return setFilterTier(e.target.value);
    },
    className: "block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Barcha tariflar"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "free"
  }, "Free"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "lite"
  }, "Lite"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "standard"
  }, "Standard"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "pro"
  }, "Pro")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, filteredOwners.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-12 h-12 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-medium text-gray-900 dark:text-white mb-2"
  }, "Biznes egalari topilmadi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400"
  }, "Qidiruv mezonlaringizga mos biznes egalari yo'q")) : filteredOwners.map(function (owner) {
    var _owner$username2, _owner$isOverLimit, _owner$usage, _owner$stats, _owner$limits, _owner$limits2, _owner$isOverLimit2, _owner$isOverLimit3, _owner$usage2, _owner$stats2, _owner$limits3, _owner$limits4, _owner$isOverLimit4, _owner$isOverLimit5, _owner$usage3, _owner$stats3, _owner$limits5, _owner$limits6, _owner$isOverLimit6, _owner$subscriptionTi;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: owner._id,
      className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
    }, ((_owner$username2 = owner.username) === null || _owner$username2 === void 0 || (_owner$username2 = _owner$username2.charAt(0)) === null || _owner$username2 === void 0 ? void 0 : _owner$username2.toUpperCase()) || '?'), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, owner.username || 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, owner.phone || 'Telefon yo\'q'))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "hidden sm:flex items-center space-x-6 text-sm"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold ".concat((_owner$isOverLimit = owner.isOverLimit) !== null && _owner$isOverLimit !== void 0 && _owner$isOverLimit.debts ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')
    }, ((_owner$usage = owner.usage) === null || _owner$usage === void 0 ? void 0 : _owner$usage.debts) || ((_owner$stats = owner.stats) === null || _owner$stats === void 0 ? void 0 : _owner$stats.totalDebts) || 0, ((_owner$limits = owner.limits) === null || _owner$limits === void 0 ? void 0 : _owner$limits.debts) !== 'Cheksiz' && /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-gray-400 text-xs"
    }, "/", (_owner$limits2 = owner.limits) === null || _owner$limits2 === void 0 ? void 0 : _owner$limits2.debts), ((_owner$isOverLimit2 = owner.isOverLimit) === null || _owner$isOverLimit2 === void 0 ? void 0 : _owner$isOverLimit2.debts) && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-1 text-red-500"
    }, "\u26A0\uFE0F")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-gray-500 dark:text-gray-400"
    }, "Qarzlar")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold ".concat((_owner$isOverLimit3 = owner.isOverLimit) !== null && _owner$isOverLimit3 !== void 0 && _owner$isOverLimit3.employees ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')
    }, ((_owner$usage2 = owner.usage) === null || _owner$usage2 === void 0 ? void 0 : _owner$usage2.employees) || ((_owner$stats2 = owner.stats) === null || _owner$stats2 === void 0 ? void 0 : _owner$stats2.totalEmployees) || 0, ((_owner$limits3 = owner.limits) === null || _owner$limits3 === void 0 ? void 0 : _owner$limits3.employees) !== 'Cheksiz' && /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-gray-400 text-xs"
    }, "/", (_owner$limits4 = owner.limits) === null || _owner$limits4 === void 0 ? void 0 : _owner$limits4.employees), ((_owner$isOverLimit4 = owner.isOverLimit) === null || _owner$isOverLimit4 === void 0 ? void 0 : _owner$isOverLimit4.employees) && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-1 text-red-500"
    }, "\u26A0\uFE0F")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-gray-500 dark:text-gray-400"
    }, "Xodimlar")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold ".concat((_owner$isOverLimit5 = owner.isOverLimit) !== null && _owner$isOverLimit5 !== void 0 && _owner$isOverLimit5.branches ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')
    }, ((_owner$usage3 = owner.usage) === null || _owner$usage3 === void 0 ? void 0 : _owner$usage3.branches) || ((_owner$stats3 = owner.stats) === null || _owner$stats3 === void 0 ? void 0 : _owner$stats3.totalBranches) || 0, ((_owner$limits5 = owner.limits) === null || _owner$limits5 === void 0 ? void 0 : _owner$limits5.branches) !== 'Cheksiz' && /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-gray-400 text-xs"
    }, "/", (_owner$limits6 = owner.limits) === null || _owner$limits6 === void 0 ? void 0 : _owner$limits6.branches), ((_owner$isOverLimit6 = owner.isOverLimit) === null || _owner$isOverLimit6 === void 0 ? void 0 : _owner$isOverLimit6.branches) && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-1 text-red-500"
    }, "\u26A0\uFE0F")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-gray-500 dark:text-gray-400"
    }, "Filiallar"))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-lg"
    }, getTierIcon(owner.subscriptionTier)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "px-3 py-1 rounded-full text-xs font-medium ".concat(getTierColor(owner.subscriptionTier))
    }, ((_owner$subscriptionTi = owner.subscriptionTier) === null || _owner$subscriptionTi === void 0 ? void 0 : _owner$subscriptionTi.toUpperCase()) || 'FREE')), /*#__PURE__*/_react["default"].createElement("div", {
      className: "hidden sm:block text-sm text-gray-500 dark:text-gray-400"
    }, owner.createdAt ? new Date(owner.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleViewDebts(owner._id);
      },
      className: "p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors",
      title: "Qarzlarni ko'rish"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    }))), /*#__PURE__*/_react["default"].createElement("button", {
      className: "p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    }), /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    }))), /*#__PURE__*/_react["default"].createElement("button", {
      className: "p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    }))))));
  })), filteredOwners.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, filteredOwners.filter(function (o) {
    return o.subscriptionTier === 'free';
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Free")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, filteredOwners.filter(function (o) {
    return o.subscriptionTier === 'lite';
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Lite")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, filteredOwners.filter(function (o) {
    return o.subscriptionTier === 'standard';
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Standard")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, filteredOwners.filter(function (o) {
    return o.subscriptionTier === 'pro';
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Pro")))), showDebtsModal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[80vh] overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-white"
  }, selectedOwner === null || selectedOwner === void 0 ? void 0 : selectedOwner.username, " - Qarzlar ro'yxati"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-500 dark:text-gray-400 mt-1"
  }, "Tarif: ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, selectedOwner === null || selectedOwner === void 0 || (_selectedOwner$subscr = selectedOwner.subscriptionTier) === null || _selectedOwner$subscr === void 0 ? void 0 : _selectedOwner$subscr.toUpperCase()), (selectedOwner === null || selectedOwner === void 0 || (_selectedOwner$limits = selectedOwner.limits) === null || _selectedOwner$limits === void 0 ? void 0 : _selectedOwner$limits.debts) !== 'Cheksiz' && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ml-2"
  }, "Limit: ", (selectedOwner === null || selectedOwner === void 0 || (_selectedOwner$usage = selectedOwner.usage) === null || _selectedOwner$usage === void 0 ? void 0 : _selectedOwner$usage.debts) || 0, "/", selectedOwner === null || selectedOwner === void 0 || (_selectedOwner$limits2 = selectedOwner.limits) === null || _selectedOwner$limits2 === void 0 ? void 0 : _selectedOwner$limits2.debts))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowDebtsModal(false);
    },
    className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6 overflow-y-auto max-h-[60vh]"
  }, debtsLoading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
  })) : ownerDebts.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("thead", {
    className: "bg-gray-50 dark:bg-gray-900"
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "#"), /*#__PURE__*/_react["default"].createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Qarzdor"), /*#__PURE__*/_react["default"].createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Miqdor"), /*#__PURE__*/_react["default"].createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Muddat"), /*#__PURE__*/_react["default"].createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Holat"))), /*#__PURE__*/_react["default"].createElement("tbody", {
    className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
  }, ownerDebts.map(function (debt) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: debt._id,
      className: "".concat(debt.isOverLimit ? 'opacity-50 bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700', " transition-colors duration-150")
    }, /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm font-medium ".concat(debt.isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white')
    }, debt.debtIndex), debt.isOverLimit && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-2 text-red-500",
      title: "Limitdan oshgan"
    }, "\u26A0\uFE0F"))), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-medium ".concat(debt.isOverLimit ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white')
    }, debt.debtorName || 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm ".concat(debt.isOverLimit ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400')
    }, debt.debtorPhone || 'Telefon yo\'q')), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-medium ".concat(debt.isOverLimit ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white')
    }, formatAmount(debt.amount), " UZS")), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm ".concat(debt.isOverLimit ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white')
    }, formatDate(debt.dueDate))), /*#__PURE__*/_react["default"].createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full ".concat(debt.isOverLimit ? 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400' : debt.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300')
    }, debt.isOverLimit ? 'Limitdan tashqari' : debt.status === 'active' ? 'Faol' : 'Kutilmoqda')));
  })))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-12 h-12 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-medium text-gray-900 dark:text-white mb-2"
  }, "Qarzlar topilmadi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400"
  }, "Bu biznes egasining hozircha qarzlari yo'q"))), ownerDebts.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between text-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Jami qarzlar: ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, ownerDebts.length)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Limitdan tashqari: ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium text-red-600 dark:text-red-400"
  }, ownerDebts.filter(function (d) {
    return d.isOverLimit;
  }).length)))))));
}