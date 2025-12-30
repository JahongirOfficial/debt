"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebts = exports.DebtProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("./AuthContext");
var _BranchContext = require("./BranchContext");
var _api = require("./api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t14 in e) "default" !== _t14 && {}.hasOwnProperty.call(e, _t14) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t14)) && (i.get || i.set) ? o(f, _t14, i) : f[_t14] = e[_t14]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
// Create the context
var DebtContext = /*#__PURE__*/(0, _react.createContext)();

// Provider component
var DebtProvider = exports.DebtProvider = function DebtProvider(_ref) {
  var children = _ref.children;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    authLoading = _useAuth.loading;
  var _useBranches = (0, _BranchContext.useBranches)(),
    activeBranch = _useBranches.activeBranch;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    debts = _useState2[0],
    setDebts = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    ratings = _useState4[0],
    setRatings = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var _useState9 = (0, _react.useState)('free'),
    _useState0 = _slicedToArray(_useState9, 2),
    userTier = _useState0[0],
    setUserTier = _useState0[1];
  var _useState1 = (0, _react.useState)(20),
    _useState10 = _slicedToArray(_useState1, 2),
    debtLimit = _useState10[0],
    setDebtLimit = _useState10[1];

  // Fetch debts from backend (with loading state for initial load)
  var fetchDebts = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, data, branchDebts, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (user) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!(user.role !== 'employee' && !activeBranch)) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            _context.p = 2;
            setLoading(true);
            token = localStorage.getItem('token');
            _context.n = 3;
            return (0, _api.apiFetch)("/debts", {
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
              console.log('DebtContext: Fetched debts:', data.debts.length);
              console.log('User role:', user === null || user === void 0 ? void 0 : user.role);
              console.log('Assigned branch:', user === null || user === void 0 ? void 0 : user.assignedBranchId);
              if ((user === null || user === void 0 ? void 0 : user.role) === 'employee') {
                branchDebts = data.debts.filter(function (debt) {
                  return debt.branchId === user.assignedBranchId;
                });
                console.log('Employee branch debts:', branchDebts.length);
              }
              setDebts(data.debts);
              setUserTier(data.userTier || 'free');
              setDebtLimit(data.debtLimit || 20);
            } else {
              setError(data.message || 'Failed to fetch debts');
            }
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            setError('Network error while fetching debts');
            console.error('Fetch debts error:', _t);
          case 6:
            _context.p = 6;
            setLoading(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[2, 5, 6, 7]]);
    }));
    return function fetchDebts() {
      return _ref2.apply(this, arguments);
    };
  }();

  // Refresh debts without loading state (for updates after CRUD operations)
  var refreshDebts = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var token, response, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (user) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            if (!(user.role !== 'employee' && !activeBranch)) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2);
          case 2:
            _context2.p = 2;
            token = localStorage.getItem('token');
            _context2.n = 3;
            return (0, _api.apiFetch)("/debts", {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 3:
            response = _context2.v;
            _context2.n = 4;
            return response.json();
          case 4:
            data = _context2.v;
            if (data.success) {
              setDebts(data.debts);
              setUserTier(data.userTier || 'free');
              setDebtLimit(data.debtLimit || 20);
            } else {
              console.error('Failed to refresh debts:', data.message);
            }
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error('Refresh debts error:', _t2);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 5]]);
    }));
    return function refreshDebts() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Fetch creditor ratings from backend
  var fetchRatings = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var token, response, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (user) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.p = 1;
            token = localStorage.getItem('token');
            _context3.n = 2;
            return (0, _api.apiFetch)('/ratings', {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context3.v;
            _context3.n = 3;
            return response.json();
          case 3:
            data = _context3.v;
            if (data.success) {
              setRatings(data.ratings);
            } else {
              console.error('Failed to fetch ratings:', data.message);
              // Set empty array if fetch fails
              setRatings([]);
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.error('Fetch ratings error:', _t3);
            // Set empty array if fetch fails
            setRatings([]);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4]]);
    }));
    return function fetchRatings() {
      return _ref4.apply(this, arguments);
    };
  }();

  // Calculate and update creditor ratings
  var calculateRatings = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var token, response, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (user) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context4.p = 1;
            token = localStorage.getItem('token');
            _context4.n = 2;
            return (0, _api.apiFetch)('/ratings/calculate', {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context4.v;
            _context4.n = 3;
            return response.json();
          case 3:
            data = _context4.v;
            if (!data.success) {
              _context4.n = 5;
              break;
            }
            _context4.n = 4;
            return fetchRatings();
          case 4:
            return _context4.a(2, {
              success: true
            });
          case 5:
            console.error('Failed to calculate ratings:', data.message);
            return _context4.a(2, {
              success: false,
              message: data.message
            });
          case 6:
            _context4.n = 8;
            break;
          case 7:
            _context4.p = 7;
            _t4 = _context4.v;
            console.error('Calculate ratings error:', _t4);
            return _context4.a(2, {
              success: false,
              message: 'Network error while calculating ratings'
            });
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 7]]);
    }));
    return function calculateRatings() {
      return _ref5.apply(this, arguments);
    };
  }();

  // Create a new debt
  var createDebt = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(debtData) {
      var branchId, token, response, data, result, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (user) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            if (!(user.role === 'employee' && user.assignedBranchId)) {
              _context6.n = 2;
              break;
            }
            branchId = user.assignedBranchId;
            _context6.n = 4;
            break;
          case 2:
            if (!activeBranch) {
              _context6.n = 3;
              break;
            }
            branchId = activeBranch._id;
            _context6.n = 4;
            break;
          case 3:
            return _context6.a(2, {
              success: false,
              message: 'No active branch selected'
            });
          case 4:
            _context6.p = 4;
            token = localStorage.getItem('token');
            _context6.n = 5;
            return (0, _api.apiFetch)("/debts", {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(_objectSpread(_objectSpread({}, debtData), {}, {
                branchId: branchId
              }))
            });
          case 5:
            response = _context6.v;
            _context6.n = 6;
            return response.json();
          case 6:
            data = _context6.v;
            if (!data.success) {
              _context6.n = 7;
              break;
            }
            // Optimistically update the local state immediately
            setDebts(function (prevDebts) {
              return [].concat(_toConsumableArray(prevDebts), [data.debt]);
            });

            // Return immediately after successful creation
            result = {
              success: true,
              debt: data.debt
            }; // Update ratings in the background without blocking
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
              var _t5;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.p = _context5.n) {
                  case 0:
                    _context5.p = 0;
                    _context5.n = 1;
                    return calculateRatings();
                  case 1:
                    _context5.n = 3;
                    break;
                  case 2:
                    _context5.p = 2;
                    _t5 = _context5.v;
                    console.error('Error updating ratings:', _t5);
                  case 3:
                    return _context5.a(2);
                }
              }, _callee5, null, [[0, 2]]);
            })), 0);
            return _context6.a(2, result);
          case 7:
            return _context6.a(2, {
              success: false,
              message: data.message
            });
          case 8:
            _context6.n = 10;
            break;
          case 9:
            _context6.p = 9;
            _t6 = _context6.v;
            console.error('Create debt error:', _t6);
            return _context6.a(2, {
              success: false,
              message: 'Network error while creating debt'
            });
          case 10:
            return _context6.a(2);
        }
      }, _callee6, null, [[4, 9]]);
    }));
    return function createDebt(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  // Update an existing debt
  var updateDebt = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id, debtData) {
      var token, response, data, result, _t8;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (user) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context8.p = 1;
            token = localStorage.getItem('token');
            _context8.n = 2;
            return (0, _api.apiFetch)("/debts/".concat(id), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(debtData)
            });
          case 2:
            response = _context8.v;
            _context8.n = 3;
            return response.json();
          case 3:
            data = _context8.v;
            if (!data.success) {
              _context8.n = 4;
              break;
            }
            // Optimistically update the local state immediately
            setDebts(function (prevDebts) {
              return prevDebts.map(function (debt) {
                return debt._id === id ? _objectSpread(_objectSpread({}, debt), data.debt) : debt;
              });
            });

            // Return immediately after successful update
            result = {
              success: true,
              debt: data.debt
            }; // Update ratings in the background without blocking
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
              var _t7;
              return _regenerator().w(function (_context7) {
                while (1) switch (_context7.p = _context7.n) {
                  case 0:
                    _context7.p = 0;
                    _context7.n = 1;
                    return calculateRatings();
                  case 1:
                    _context7.n = 3;
                    break;
                  case 2:
                    _context7.p = 2;
                    _t7 = _context7.v;
                    console.error('Error updating ratings:', _t7);
                  case 3:
                    return _context7.a(2);
                }
              }, _callee7, null, [[0, 2]]);
            })), 0);
            return _context8.a(2, result);
          case 4:
            return _context8.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context8.n = 7;
            break;
          case 6:
            _context8.p = 6;
            _t8 = _context8.v;
            console.error('Update debt error:', _t8);
            return _context8.a(2, {
              success: false,
              message: 'Network error while updating debt'
            });
          case 7:
            return _context8.a(2);
        }
      }, _callee8, null, [[1, 6]]);
    }));
    return function updateDebt(_x2, _x3) {
      return _ref8.apply(this, arguments);
    };
  }();

  // Delete a debt
  var deleteDebt = /*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
      var reason,
        token,
        response,
        data,
        result,
        _args0 = arguments,
        _t0;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            reason = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : '';
            if (user) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context0.p = 1;
            token = localStorage.getItem('token');
            _context0.n = 2;
            return (0, _api.apiFetch)("/debts/".concat(id), {
              method: 'DELETE',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                reason: reason
              }) // Pass reason in request body
            });
          case 2:
            response = _context0.v;
            _context0.n = 3;
            return response.json();
          case 3:
            data = _context0.v;
            if (!data.success) {
              _context0.n = 4;
              break;
            }
            // Optimistically remove the debt from local state immediately
            setDebts(function (prevDebts) {
              return prevDebts.filter(function (debt) {
                return debt._id !== id;
              });
            });

            // Return immediately after successful deletion
            result = {
              success: true
            }; // Update ratings in the background without blocking
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
              var _t9;
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.p = _context9.n) {
                  case 0:
                    _context9.p = 0;
                    _context9.n = 1;
                    return calculateRatings();
                  case 1:
                    _context9.n = 3;
                    break;
                  case 2:
                    _context9.p = 2;
                    _t9 = _context9.v;
                    console.error('Error updating ratings:', _t9);
                  case 3:
                    return _context9.a(2);
                }
              }, _callee9, null, [[0, 2]]);
            })), 0);
            return _context0.a(2, result);
          case 4:
            return _context0.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context0.n = 7;
            break;
          case 6:
            _context0.p = 6;
            _t0 = _context0.v;
            console.error('Delete debt error:', _t0);
            return _context0.a(2, {
              success: false,
              message: 'Network error while deleting debt'
            });
          case 7:
            return _context0.a(2);
        }
      }, _callee0, null, [[1, 6]]);
    }));
    return function deleteDebt(_x4) {
      return _ref0.apply(this, arguments);
    };
  }();

  // Fetch debt history
  var fetchDebtHistory = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(debtId) {
      var token, response, data, _t1;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            if (user) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context1.p = 1;
            token = localStorage.getItem('token');
            _context1.n = 2;
            return (0, _api.apiFetch)("/debts/".concat(debtId, "/history"), {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context1.v;
            _context1.n = 3;
            return response.json();
          case 3:
            data = _context1.v;
            if (!data.success) {
              _context1.n = 4;
              break;
            }
            return _context1.a(2, {
              success: true,
              history: data.history
            });
          case 4:
            return _context1.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context1.n = 7;
            break;
          case 6:
            _context1.p = 6;
            _t1 = _context1.v;
            console.error('Fetch debt history error:', _t1);
            return _context1.a(2, {
              success: false,
              message: 'Network error while fetching debt history'
            });
          case 7:
            return _context1.a(2);
        }
      }, _callee1, null, [[1, 6]]);
    }));
    return function fetchDebtHistory(_x5) {
      return _ref10.apply(this, arguments);
    };
  }();

  // Mark a debt as paid
  var markDebtAsPaid = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(id) {
      var reason,
        token,
        response,
        data,
        result,
        _args11 = arguments,
        _t11;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            reason = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : '';
            if (user) {
              _context11.n = 1;
              break;
            }
            return _context11.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context11.p = 1;
            token = localStorage.getItem('token');
            _context11.n = 2;
            return (0, _api.apiFetch)("/debts/".concat(id, "/paid"), {
              method: 'PATCH',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                reason: reason
              }) // Pass reason in request body
            });
          case 2:
            response = _context11.v;
            _context11.n = 3;
            return response.json();
          case 3:
            data = _context11.v;
            if (!data.success) {
              _context11.n = 4;
              break;
            }
            // Optimistically update the local state immediately
            setDebts(function (prevDebts) {
              return prevDebts.map(function (debt) {
                return debt._id === id ? _objectSpread(_objectSpread({}, debt), data.debt) : debt;
              });
            });

            // Return immediately after successful operation
            result = {
              success: true,
              debt: data.debt
            }; // Update ratings in the background without blocking
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
              var _t10;
              return _regenerator().w(function (_context10) {
                while (1) switch (_context10.p = _context10.n) {
                  case 0:
                    _context10.p = 0;
                    _context10.n = 1;
                    return calculateRatings();
                  case 1:
                    _context10.n = 3;
                    break;
                  case 2:
                    _context10.p = 2;
                    _t10 = _context10.v;
                    console.error('Error updating ratings:', _t10);
                  case 3:
                    return _context10.a(2);
                }
              }, _callee10, null, [[0, 2]]);
            })), 0);
            return _context11.a(2, result);
          case 4:
            return _context11.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context11.n = 7;
            break;
          case 6:
            _context11.p = 6;
            _t11 = _context11.v;
            console.error('Mark as paid error:', _t11);
            return _context11.a(2, {
              success: false,
              message: 'Network error while marking debt as paid'
            });
          case 7:
            return _context11.a(2);
        }
      }, _callee11, null, [[1, 6]]);
    }));
    return function markDebtAsPaid(_x6) {
      return _ref11.apply(this, arguments);
    };
  }();

  // Adjust debt amount (add or subtract)
  var adjustDebtAmount = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(id, adjustmentData) {
      var token, response, data, result, _t13;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            if (user) {
              _context13.n = 1;
              break;
            }
            return _context13.a(2, {
              success: false,
              message: 'User not authenticated'
            });
          case 1:
            _context13.p = 1;
            token = localStorage.getItem('token');
            _context13.n = 2;
            return (0, _api.apiFetch)("/debts/".concat(id, "/adjust"), {
              method: 'PATCH',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(adjustmentData)
            });
          case 2:
            response = _context13.v;
            _context13.n = 3;
            return response.json();
          case 3:
            data = _context13.v;
            if (!data.success) {
              _context13.n = 4;
              break;
            }
            // Optimistically update the local state immediately
            setDebts(function (prevDebts) {
              return prevDebts.map(function (debt) {
                return debt._id === id ? _objectSpread(_objectSpread({}, debt), data.debt) : debt;
              });
            });

            // Return immediately after successful operation
            result = {
              success: true,
              debt: data.debt
            }; // Update ratings in the background without blocking
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
              var _t12;
              return _regenerator().w(function (_context12) {
                while (1) switch (_context12.p = _context12.n) {
                  case 0:
                    _context12.p = 0;
                    _context12.n = 1;
                    return calculateRatings();
                  case 1:
                    _context12.n = 3;
                    break;
                  case 2:
                    _context12.p = 2;
                    _t12 = _context12.v;
                    console.error('Error updating ratings:', _t12);
                  case 3:
                    return _context12.a(2);
                }
              }, _callee12, null, [[0, 2]]);
            })), 0);
            return _context13.a(2, result);
          case 4:
            return _context13.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context13.n = 7;
            break;
          case 6:
            _context13.p = 6;
            _t13 = _context13.v;
            console.error('Adjust debt amount error:', _t13);
            return _context13.a(2, {
              success: false,
              message: 'Network error while adjusting debt amount'
            });
          case 7:
            return _context13.a(2);
        }
      }, _callee13, null, [[1, 6]]);
    }));
    return function adjustDebtAmount(_x7, _x8) {
      return _ref13.apply(this, arguments);
    };
  }();

  // Fetch debts and ratings when user is authenticated and branch is active
  (0, _react.useEffect)(function () {
    if (user && !authLoading) {
      // For employees, fetch debts immediately (they don't need activeBranch)
      // For regular users, wait for activeBranch
      if (user.role === 'employee' || activeBranch) {
        fetchDebts();
        fetchRatings();
      }
    } else if (!user && !authLoading) {
      // Clear debts and ratings when user logs out
      setDebts([]);
      setRatings([]);
      setLoading(false);
    } else if (user && user.role !== 'employee' && !activeBranch) {
      // Clear debts when no active branch (only for non-employees)
      setDebts([]);
      setLoading(false);
    }
  }, [user, authLoading, activeBranch]);

  // Refresh debts when active branch changes
  (0, _react.useEffect)(function () {
    if (user && activeBranch) {
      refreshDebts();
    }
  }, [activeBranch]);

  // Context value
  var value = {
    debts: debts,
    ratings: ratings,
    loading: loading,
    error: error,
    userTier: userTier,
    debtLimit: debtLimit,
    fetchDebts: fetchDebts,
    fetchRatings: fetchRatings,
    calculateRatings: calculateRatings,
    createDebt: createDebt,
    updateDebt: updateDebt,
    deleteDebt: deleteDebt,
    fetchDebtHistory: fetchDebtHistory,
    markDebtAsPaid: markDebtAsPaid,
    adjustDebtAmount: adjustDebtAmount
  };
  return /*#__PURE__*/_react["default"].createElement(DebtContext.Provider, {
    value: value
  }, children);
};

// Custom hook to use the debt context
var useDebts = exports.useDebts = function useDebts() {
  var context = (0, _react.useContext)(DebtContext);
  if (!context) {
    throw new Error('useDebts must be used within a DebtProvider');
  }
  return context;
};