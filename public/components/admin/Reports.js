"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reports = Reports;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
function Reports() {
  var _reports$debtStats, _reports$debtStats2, _reports$debtStats3, _reports$subscription;
  var _useState = (0, _react.useState)({
      userGrowth: [],
      revenue: [],
      debtStats: {},
      subscriptionStats: {}
    }),
    _useState2 = _slicedToArray(_useState, 2),
    reports = _useState2[0],
    setReports = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)({
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    dateRange = _useState6[0],
    setDateRange = _useState6[1];
  (0, _react.useEffect)(function () {
    fetchReports();
  }, [dateRange]);
  var fetchReports = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var params, response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            params = new URLSearchParams({
              start: dateRange.start,
              end: dateRange.end
            });
            _context.n = 1;
            return (0, _api.apiFetch)("/admin/reports?".concat(params), {
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
            setReports(data.reports);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching reports:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchReports() {
      return _ref.apply(this, arguments);
    };
  }();
  var exportReport = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(type) {
      var params, response, blob, url, a, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            params = new URLSearchParams({
              start: dateRange.start,
              end: dateRange.end,
              type: type
            });
            _context2.n = 1;
            return (0, _api.apiFetch)("/admin/reports/export?".concat(params), {
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
            return response.blob();
          case 2:
            blob = _context2.v;
            url = window.URL.createObjectURL(blob);
            a = document.createElement('a');
            a.href = url;
            a.download = "report-".concat(type, "-").concat(dateRange.start, "-").concat(dateRange.end, ".xlsx");
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Error exporting report:', _t2);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 4]]);
    }));
    return function exportReport(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-4 bg-white bg-opacity-20 rounded w-1/2"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-6"
    }, _toConsumableArray(Array(3)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "animate-pulse space-y-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4"
      }, _toConsumableArray(Array(4)).map(function (_, j) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: j,
          className: "h-20 bg-gray-300 dark:bg-gray-600 rounded-xl"
        });
      }))));
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "Hisobotlar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-orange-100 text-lg"
  }, "Loyiha bo'yicha batafsil hisobotlar va statistikalar")), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold text-gray-900 dark:text-white"
  }, "Sana oralig'i"), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4m-4-8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Hisobotlar uchun sana tanlang"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-end sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, "Boshlanish sanasi"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "date",
    value: dateRange.start,
    onChange: function onChange(e) {
      return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
        start: e.target.value
      }));
    },
    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, "Tugash sanasi"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "date",
    value: dateRange.end,
    onChange: function onChange(e) {
      return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
        end: e.target.value
      }));
    },
    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: fetchReports,
    className: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Yangilash")))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-semibold text-gray-900 dark:text-white"
  }, "Hisobotlarni yuklab olish"), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Excel formatida yuklab olish"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return exportReport('users');
    },
    className: "flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Foydalanuvchilar")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return exportReport('revenue');
    },
    className: "flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Daromad")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return exportReport('debts');
    },
    className: "flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Qarzlar")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return exportReport('subscriptions');
    },
    className: "flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Tariflar")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Jami foydalanuvchilar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, ((_reports$debtStats = reports.debtStats) === null || _reports$debtStats === void 0 ? void 0 : _reports$debtStats.totalUsers) || 0))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Jami daromad"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, ((_reports$debtStats2 = reports.debtStats) === null || _reports$debtStats2 === void 0 || (_reports$debtStats2 = _reports$debtStats2.totalRevenue) === null || _reports$debtStats2 === void 0 ? void 0 : _reports$debtStats2.toLocaleString()) || 0, " UZS"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Jami qarzlar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, ((_reports$debtStats3 = reports.debtStats) === null || _reports$debtStats3 === void 0 ? void 0 : _reports$debtStats3.totalDebts) || 0))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-gray-600 dark:text-gray-400"
  }, "Faol tariflar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, ((_reports$subscription = reports.subscriptionStats) === null || _reports$subscription === void 0 ? void 0 : _reports$subscription.activeSubscriptions) || 0)))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-semibold text-gray-900 dark:text-white"
  }, "Foydalanuvchilar o'sishi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-3 h-3 bg-blue-500 rounded-full"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "Trendlar"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-lg font-medium"
  }, "Grafik bu yerda ko'rsatiladi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-2"
  }, "Foydalanuvchilar o'sish dinamikasi")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-semibold text-gray-900 dark:text-white"
  }, "Daromad o'sishi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-3 h-3 bg-green-500 rounded-full"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "Moliyaviy"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-lg font-medium"
  }, "Grafik bu yerda ko'rsatiladi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-2"
  }, "Daromad o'sish dinamikasi"))))));
}