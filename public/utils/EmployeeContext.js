"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEmployees = exports.EmployeeProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("./AuthContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t6 in e) "default" !== _t6 && {}.hasOwnProperty.call(e, _t6) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t6)) && (i.get || i.set) ? o(f, _t6, i) : f[_t6] = e[_t6]); return f; })(e, t); }
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
var EmployeeContext = /*#__PURE__*/(0, _react.createContext)();
var useEmployees = exports.useEmployees = function useEmployees() {
  var context = (0, _react.useContext)(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
var EmployeeProvider = exports.EmployeeProvider = function EmployeeProvider(_ref) {
  var children = _ref.children;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    employees = _useState2[0],
    setEmployees = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];

  // Employee limits by subscription tier
  var EMPLOYEE_LIMITS = {
    free: 1,
    lite: 2,
    standard: 3,
    pro: 5
  };
  var employeeLimit = user ? EMPLOYEE_LIMITS[user.subscriptionTier] || 1 : 1;
  var canCreateEmployee = employees.length < employeeLimit;

  // Fetch employees
  var fetchEmployees = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (user) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setLoading(true);
            setError(null);
            _context.p = 2;
            token = localStorage.getItem('token');
            _context.n = 3;
            return fetch('/api/employees', {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 3:
            response = _context.v;
            _context.n = 4;
            return response.json();
          case 4:
            data = _context.v;
            if (data.success) {
              setEmployees(data.employees);
            } else {
              setError(data.message || 'Failed to fetch employees');
            }
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Error fetching employees:', _t);
            setError('Network error while fetching employees');
          case 6:
            _context.p = 6;
            setLoading(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[2, 5, 6, 7]]);
    }));
    return function fetchEmployees() {
      return _ref2.apply(this, arguments);
    };
  }();

  // Add employee
  var addEmployee = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(employeeData) {
      var token, response, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            token = localStorage.getItem('token');
            _context2.n = 1;
            return fetch('/api/employees', {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(employeeData)
            });
          case 1:
            response = _context2.v;
            _context2.n = 2;
            return response.json();
          case 2:
            data = _context2.v;
            if (!data.success) {
              _context2.n = 3;
              break;
            }
            setEmployees(function (prev) {
              return [data.employee].concat(_toConsumableArray(prev));
            });
            return _context2.a(2, {
              success: true,
              employee: data.employee
            });
          case 3:
            return _context2.a(2, {
              success: false,
              message: data.message
            });
          case 4:
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error('Error adding employee:', _t2);
            return _context2.a(2, {
              success: false,
              message: 'Network error while adding employee'
            });
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 5]]);
    }));
    return function addEmployee(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Update employee
  var updateEmployee = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(employeeId, updateData) {
      var token, response, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            token = localStorage.getItem('token');
            _context3.n = 1;
            return fetch("/api/employees/".concat(employeeId), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updateData)
            });
          case 1:
            response = _context3.v;
            _context3.n = 2;
            return response.json();
          case 2:
            data = _context3.v;
            if (!data.success) {
              _context3.n = 3;
              break;
            }
            setEmployees(function (prev) {
              return prev.map(function (emp) {
                return emp._id === employeeId ? data.employee : emp;
              });
            });
            return _context3.a(2, {
              success: true,
              employee: data.employee
            });
          case 3:
            return _context3.a(2, {
              success: false,
              message: data.message
            });
          case 4:
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            console.error('Error updating employee:', _t3);
            return _context3.a(2, {
              success: false,
              message: 'Network error while updating employee'
            });
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 5]]);
    }));
    return function updateEmployee(_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Delete employee
  var deleteEmployee = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(employeeId) {
      var token, response, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            token = localStorage.getItem('token');
            _context4.n = 1;
            return fetch("/api/employees/".concat(employeeId), {
              method: 'DELETE',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context4.v;
            _context4.n = 2;
            return response.json();
          case 2:
            data = _context4.v;
            if (!data.success) {
              _context4.n = 3;
              break;
            }
            setEmployees(function (prev) {
              return prev.filter(function (emp) {
                return emp._id !== employeeId;
              });
            });
            return _context4.a(2, {
              success: true
            });
          case 3:
            return _context4.a(2, {
              success: false,
              message: data.message
            });
          case 4:
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t4 = _context4.v;
            console.error('Error deleting employee:', _t4);
            return _context4.a(2, {
              success: false,
              message: 'Network error while deleting employee'
            });
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 5]]);
    }));
    return function deleteEmployee(_x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  // Get employee by ID
  var getEmployee = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(employeeId) {
      var token, response, data, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            token = localStorage.getItem('token');
            _context5.n = 1;
            return fetch("/api/employees/".concat(employeeId), {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context5.v;
            _context5.n = 2;
            return response.json();
          case 2:
            data = _context5.v;
            if (!data.success) {
              _context5.n = 3;
              break;
            }
            return _context5.a(2, {
              success: true,
              employee: data.employee
            });
          case 3:
            return _context5.a(2, {
              success: false,
              message: data.message
            });
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t5 = _context5.v;
            console.error('Error fetching employee:', _t5);
            return _context5.a(2, {
              success: false,
              message: 'Network error while fetching employee'
            });
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 5]]);
    }));
    return function getEmployee(_x5) {
      return _ref6.apply(this, arguments);
    };
  }();

  // Fetch employees when user changes
  (0, _react.useEffect)(function () {
    if (user) {
      fetchEmployees();
    } else {
      setEmployees([]);
    }
  }, [user]);
  var value = {
    employees: employees,
    loading: loading,
    error: error,
    employeeLimit: employeeLimit,
    canCreateEmployee: canCreateEmployee,
    fetchEmployees: fetchEmployees,
    addEmployee: addEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    getEmployee: getEmployee
  };
  return /*#__PURE__*/_react["default"].createElement(EmployeeContext.Provider, {
    value: value
  }, children);
};