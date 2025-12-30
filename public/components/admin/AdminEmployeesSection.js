"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminEmployeesSection = AdminEmployeesSection;
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
function AdminEmployeesSection() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    employees = _useState2[0],
    setEmployees = _useState2[1];
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
    filterStatus = _useState8[0],
    setFilterStatus = _useState8[1];
  (0, _react.useEffect)(function () {
    fetchAllEmployees();
  }, []);
  var fetchAllEmployees = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return (0, _api.apiFetch)('/admin/all-employees', {
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
            setEmployees(data.employees || []);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching employees:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchAllEmployees() {
      return _ref.apply(this, arguments);
    };
  }();
  var filteredEmployees = employees.filter(function (employee) {
    var _employee$name, _employee$phone, _employee$ownerName;
    var matchesSearch = ((_employee$name = employee.name) === null || _employee$name === void 0 ? void 0 : _employee$name.toLowerCase().includes(searchTerm.toLowerCase())) || ((_employee$phone = employee.phone) === null || _employee$phone === void 0 ? void 0 : _employee$phone.includes(searchTerm)) || ((_employee$ownerName = employee.ownerName) === null || _employee$ownerName === void 0 ? void 0 : _employee$ownerName.toLowerCase().includes(searchTerm.toLowerCase()));
    var matchesStatus = filterStatus === 'all' || filterStatus === 'active' && employee.isActive || filterStatus === 'inactive' && !employee.isActive;
    return matchesSearch && matchesStatus;
  });
  var getPermissionCount = function getPermissionCount(permissions) {
    if (!permissions) return 0;
    return Object.values(permissions).filter(Boolean).length;
  };
  var getPermissionBadgeColor = function getPermissionBadgeColor(count) {
    if (count >= 5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (count >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
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
  }, "\uD83D\uDC65 Xodimlar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Barcha biznes egalari xodimlari ro'yxati")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-4 sm:mt-0 flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  }, filteredEmployees.filter(function (e) {
    return e.isActive;
  }).length, " faol"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }, filteredEmployees.length, " jami"))), /*#__PURE__*/_react["default"].createElement("div", {
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
    placeholder: "Xodim ismi, telefon yoki egasi bo'yicha qidirish...",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    className: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("select", {
    value: filterStatus,
    onChange: function onChange(e) {
      return setFilterStatus(e.target.value);
    },
    className: "block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Barcha xodimlar"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "active"
  }, "Faol xodimlar"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "inactive"
  }, "Nofaol xodimlar")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, filteredEmployees.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-medium text-gray-900 dark:text-white mb-2"
  }, "Xodimlar topilmadi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400"
  }, "Qidiruv mezonlaringizga mos xodimlar yo'q")) : filteredEmployees.map(function (employee) {
    var _employee$name2;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: employee._id,
      className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
    }, ((_employee$name2 = employee.name) === null || _employee$name2 === void 0 || (_employee$name2 = _employee$name2.charAt(0)) === null || _employee$name2 === void 0 ? void 0 : _employee$name2.toUpperCase()) || '?'), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, employee.name || 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, employee.phone || 'Telefon yo\'q', " \u2022 ", employee.position || 'Lavozim yo\'q'), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs text-gray-400 dark:text-gray-500"
    }, "Egasi: ", employee.ownerName || 'Noma\'lum', " \u2022 Filial: ", employee.branchName || 'Noma\'lum'))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "hidden sm:block"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "px-2 py-1 rounded-full text-xs font-medium ".concat(getPermissionBadgeColor(getPermissionCount(employee.permissions)))
    }, getPermissionCount(employee.permissions), " ruxsat")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "hidden md:block text-sm text-gray-500 dark:text-gray-400"
    }, employee.hireDate ? new Date(employee.hireDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-3 h-3 rounded-full ".concat(employee.isActive ? 'bg-green-500' : 'bg-red-500')
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-2 text-sm font-medium ".concat(employee.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')
    }, employee.isActive ? 'Faol' : 'Nofaol')), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("button", {
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
  })), filteredEmployees.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-green-600 dark:text-green-400"
  }, filteredEmployees.filter(function (e) {
    return e.isActive;
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Faol")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-red-600 dark:text-red-400"
  }, filteredEmployees.filter(function (e) {
    return !e.isActive;
  }).length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Nofaol")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-blue-600 dark:text-blue-400"
  }, Math.round(filteredEmployees.reduce(function (sum, e) {
    return sum + getPermissionCount(e.permissions);
  }, 0) / filteredEmployees.length) || 0), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "O'rtacha ruxsat")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-purple-600 dark:text-purple-400"
  }, new Set(filteredEmployees.map(function (e) {
    return e.ownerId;
  })).size), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Biznes egalar")))));
}