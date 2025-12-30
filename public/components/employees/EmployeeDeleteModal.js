"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmployeeDeleteModal = EmployeeDeleteModal;
var _react = _interopRequireWildcard(require("react"));
var _EmployeeContext = require("../../utils/EmployeeContext");
var _ToastContext = require("../../utils/ToastContext");
var _AuthContext = require("../../utils/AuthContext");
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
function EmployeeDeleteModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onEmployeeDeleted = _ref.onEmployeeDeleted,
    employee = _ref.employee;
  var _useEmployees = (0, _EmployeeContext.useEmployees)(),
    deleteEmployee = _useEmployees.deleteEmployee;
  var _useToast = (0, _ToastContext.useToast)(),
    showError = _useToast.showError;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var handleDelete = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (employee) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setLoading(true);
            _context.p = 2;
            _context.n = 3;
            return deleteEmployee(employee._id);
          case 3:
            result = _context.v;
            if (result.success) {
              onEmployeeDeleted();
            } else {
              showError(result.message || 'Xodimni o\'chirishda xatolik');
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            showError('Xodimni o\'chirishda xatolik yuz berdi');
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function handleDelete() {
      return _ref2.apply(this, arguments);
    };
  }();
  if (!isOpen || !employee) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-lg rounded-2xl shadow-2xl ".concat(settings.theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 text-red-600 dark:text-red-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  }))), /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-bold mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, "Xodimni o'chirish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mb-4 ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600')
  }, "Haqiqatan ham ", /*#__PURE__*/_react["default"].createElement("strong", null, employee.name), " xodimini o'chirmoqchimisiz?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 rounded-xl mb-6 ".concat(settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold"
  }, employee.name.charAt(0).toUpperCase()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-900')
  }, employee.name), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600')
  }, employee.position, " \u2022 ", employee.branchName), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600')
  }, employee.phone)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 rounded-xl mb-6 ".concat(settings.theme === 'dark' ? 'bg-yellow-900/30 border border-yellow-700/50' : 'bg-yellow-50 border border-yellow-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800')
  }, "Diqqat!"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700')
  }, "Xodim o'chirilganda uning login hisobi ham o'chiriladi va qayta tiklab bo'lmaydi."))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-3 p-6 pt-0"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: onClose,
    disabled: loading,
    className: "flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ".concat(settings.theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200', " disabled:opacity-50 disabled:cursor-not-allowed")
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: handleDelete,
    disabled: loading,
    className: "flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  }, loading ? 'O\'chirilmoqda...' : 'Ha, o\'chirish'))));
}