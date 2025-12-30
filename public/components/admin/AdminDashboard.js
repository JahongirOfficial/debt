"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminDashboard = AdminDashboard;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
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
function AdminDashboard() {
  var _useState = (0, _react.useState)({
      totalUsers: 0,
      activeUsers: 0,
      totalDebts: 0,
      totalRevenue: 0,
      newUsersToday: 0,
      newDebtsToday: 0
    }),
    _useState2 = _slicedToArray(_useState, 2),
    stats = _useState2[0],
    setStats = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  (0, _react.useEffect)(function () {
    fetchDashboardStats();
  }, []);
  var fetchDashboardStats = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return (0, _api.apiFetch)('/admin/dashboard-stats', {
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
            setStats(data.stats);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching dashboard stats:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchDashboardStats() {
      return _ref.apply(this, arguments);
    };
  }();
  var StatCard = function StatCard(_ref2) {
    var title = _ref2.title,
      value = _ref2.value,
      icon = _ref2.icon,
      gradient = _ref2.gradient,
      _ref2$fontSize = _ref2.fontSize,
      fontSize = _ref2$fontSize === void 0 ? "text-3xl" : _ref2$fontSize;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "p-4 rounded-xl bg-gradient-to-r ".concat(gradient, " shadow-lg")
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "h-8 w-8 text-white",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: icon
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
    }, title), /*#__PURE__*/_react["default"].createElement("p", {
      className: "".concat(fontSize, " font-bold text-gray-900 dark:text-white")
    }, value)))));
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse space-y-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/4"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    }, _toConsumableArray(Array(4)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "p-6"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center space-x-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-xl"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "space-y-2 flex-1"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"
      })))));
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "Admin Dashboard"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-blue-100 text-lg"
  }, "Qarzdaftar admin paneliga xush kelibsiz")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-10 h-10 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  }, /*#__PURE__*/_react["default"].createElement(StatCard, {
    title: "Barcha Foydalanuvchilar",
    value: stats.totalUsers.toLocaleString(),
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    gradient: "from-blue-500 to-blue-600"
  }), /*#__PURE__*/_react["default"].createElement(StatCard, {
    title: "Barcha Qarzlar",
    value: stats.totalDebts.toLocaleString() + " ta",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    gradient: "from-green-500 to-green-600"
  }), /*#__PURE__*/_react["default"].createElement(StatCard, {
    title: "Umumiy Qarz Summasi",
    value: "".concat(stats.totalRevenue.toLocaleString(), " UZS"),
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    gradient: "from-purple-500 to-pink-500",
    fontSize: "text-xl"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, "Qo'shimcha Ma'lumotlar"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Tizim statistikasi"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Bugungi yangi foydalanuvchilar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, stats.newUsersToday))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Bugungi yangi qarzlar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, stats.newDebtsToday))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Faol foydalanuvchilar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, stats.activeUsers))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Faollik darajasi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, stats.totalUsers > 0 ? Math.round(stats.activeUsers / stats.totalUsers * 100) : 0, "%"))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-white mb-6"
  }, "Tezkor amallar"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "flex items-center space-x-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-blue-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium text-blue-700 dark:text-blue-300"
  }, "Foydalanuvchilar")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "flex items-center space-x-3 p-4 rounded-xl bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-green-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium text-green-700 dark:text-green-300"
  }, "Tariflar")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "flex items-center space-x-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-purple-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium text-purple-700 dark:text-purple-300"
  }, "Hisobotlar")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "flex items-center space-x-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-orange-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium text-orange-700 dark:text-orange-300"
  }, "Analitika")))));
}