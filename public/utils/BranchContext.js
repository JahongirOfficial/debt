"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchProvider = exports.BranchContext = void 0;
exports.useBranches = useBranches;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("./AuthContext");
var _ToastContext = require("./ToastContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t6 in e) "default" !== _t6 && {}.hasOwnProperty.call(e, _t6) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t6)) && (i.get || i.set) ? o(f, _t6, i) : f[_t6] = e[_t6]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
// Create the context
var BranchContext = exports.BranchContext = /*#__PURE__*/(0, _react.createContext)();

// Branch limits by subscription tier
var BRANCH_LIMITS = {
  free: 1,
  lite: 2,
  standard: 3,
  pro: 5
};

// Provider component
var BranchProvider = exports.BranchProvider = function BranchProvider(_ref) {
  var children = _ref.children;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0, _ToastContext.useToast)(),
    showSuccess = _useToast.showSuccess,
    showError = _useToast.showError;
  var location = (0, _reactRouterDom.useLocation)();
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    branches = _useState2[0],
    setBranches = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    activeBranch = _useState4[0],
    setActiveBranch = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState0 = _slicedToArray(_useState9, 2),
    lastSwitchTime = _useState0[0],
    setLastSwitchTime = _useState0[1];

  // Get branch limit for current user
  var branchLimit = user ? BRANCH_LIMITS[user.subscriptionTier] || 1 : 1;
  var canCreateBranch = branches.length < branchLimit;

  // Load active branch from localStorage
  (0, _react.useEffect)(function () {
    if (user && branches.length > 0) {
      // For employees, always set their assigned branch as active
      if (user.role === 'employee' && user.assignedBranchId) {
        var assignedBranch = branches.find(function (b) {
          return b._id === user.assignedBranchId;
        });
        if (assignedBranch && (!activeBranch || activeBranch._id !== assignedBranch._id)) {
          setActiveBranch(assignedBranch);
          localStorage.setItem("activeBranchId_".concat(user.id), assignedBranch._id);
        }
        return;
      }

      // For regular users, use saved branch or first branch
      var savedActiveBranchId = localStorage.getItem("activeBranchId_".concat(user.id));
      if (savedActiveBranchId) {
        var savedBranch = branches.find(function (b) {
          return b._id === savedActiveBranchId;
        });
        if (savedBranch) {
          setActiveBranch(savedBranch);
          return;
        }
      }

      // If no saved branch or saved branch not found, use first branch
      if (!activeBranch && branches.length > 0) {
        setActiveBranch(branches[0]);
        localStorage.setItem("activeBranchId_".concat(user.id), branches[0]._id);
      }
    }
  }, [user, branches, activeBranch]);

  // Fetch branches from API
  var fetchBranches = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, data, sortedBranches, processedBranches, _t;
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
            return fetch('/api/branches', {
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
            if (!data.success) {
              _context.n = 6;
              break;
            }
            // Sort branches by creation date and mark excess branches as disabled
            sortedBranches = data.branches.sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
            processedBranches = sortedBranches.map(function (branch, index) {
              return _objectSpread(_objectSpread({}, branch), {}, {
                isDisabled: index >= branchLimit // Disable branches beyond the limit
              });
            });
            setBranches(processedBranches);

            // If no branches exist, create a default one
            if (!(data.branches.length === 0)) {
              _context.n = 5;
              break;
            }
            _context.n = 5;
            return createDefaultBranch();
          case 5:
            _context.n = 7;
            break;
          case 6:
            throw new Error(data.message || 'Failed to fetch branches');
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            console.error('Error fetching branches:', _t);
            setError(_t.message);
            showError('Filiallarni yuklashda xatolik yuz berdi');
          case 9:
            _context.p = 9;
            setLoading(false);
            return _context.f(9);
          case 10:
            return _context.a(2);
        }
      }, _callee, null, [[2, 8, 9, 10]]);
    }));
    return function fetchBranches() {
      return _ref2.apply(this, arguments);
    };
  }();

  // Create default branch for new users
  var createDefaultBranch = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var defaultBranch, result, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            defaultBranch = {
              name: 'Asosiy filial',
              description: 'Sizning asosiy filialingiz',
              currency: 'UZS',
              color: '#3B82F6',
              icon: 'building'
            };
            _context2.n = 1;
            return createBranch(defaultBranch);
          case 1:
            result = _context2.v;
            if (result.success) {
              console.log('Default branch created successfully');
            }
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error creating default branch:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function createDefaultBranch() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Create new branch
  var createBranch = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(branchData) {
      var token, response, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (canCreateBranch) {
              _context3.n = 1;
              break;
            }
            showError("Sizning tarifingizda faqat ".concat(branchLimit, " ta filial yaratish mumkin"));
            return _context3.a(2, {
              success: false,
              message: 'Branch limit exceeded'
            });
          case 1:
            setLoading(true);
            _context3.p = 2;
            token = localStorage.getItem('token');
            _context3.n = 3;
            return fetch('/api/branches', {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(branchData)
            });
          case 3:
            response = _context3.v;
            _context3.n = 4;
            return response.json();
          case 4:
            data = _context3.v;
            if (!data.success) {
              _context3.n = 5;
              break;
            }
            setBranches(function (prev) {
              return [].concat(_toConsumableArray(prev), [data.branch]);
            });

            // If this is the first branch, set it as active
            if (branches.length === 0) {
              setActiveBranch(data.branch);
              localStorage.setItem("activeBranchId_".concat(user.id), data.branch._id);
            }
            showSuccess('Filial muvaffaqiyatli yaratildi');
            return _context3.a(2, {
              success: true,
              branch: data.branch
            });
          case 5:
            if (data.upgradeRequired) {
              showError("Filiallar soni chegarasi oshdi. Tarifni yangilang.");
            } else {
              showError(data.message || 'Filial yaratishda xatolik yuz berdi');
            }
            return _context3.a(2, {
              success: false,
              message: data.message
            });
          case 6:
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            console.error('Error creating branch:', _t3);
            showError('Filial yaratishda xatolik yuz berdi');
            return _context3.a(2, {
              success: false,
              message: _t3.message
            });
          case 8:
            _context3.p = 8;
            setLoading(false);
            return _context3.f(8);
          case 9:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 7, 8, 9]]);
    }));
    return function createBranch(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Update branch
  var updateBranch = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(branchId, updateData) {
      var token, response, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            setLoading(true);
            _context4.p = 1;
            token = localStorage.getItem('token');
            _context4.n = 2;
            return fetch("/api/branches/".concat(branchId), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updateData)
            });
          case 2:
            response = _context4.v;
            _context4.n = 3;
            return response.json();
          case 3:
            data = _context4.v;
            if (!data.success) {
              _context4.n = 4;
              break;
            }
            setBranches(function (prev) {
              return prev.map(function (branch) {
                return branch._id === branchId ? data.branch : branch;
              });
            });

            // Update active branch if it's the one being updated
            if (activeBranch && activeBranch._id === branchId) {
              setActiveBranch(data.branch);
            }
            showSuccess('Filial muvaffaqiyatli yangilandi');
            return _context4.a(2, {
              success: true,
              branch: data.branch
            });
          case 4:
            showError(data.message || 'Filial yangilashda xatolik yuz berdi');
            return _context4.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            console.error('Error updating branch:', _t4);
            showError('Filial yangilashda xatolik yuz berdi');
            return _context4.a(2, {
              success: false,
              message: _t4.message
            });
          case 7:
            _context4.p = 7;
            setLoading(false);
            return _context4.f(7);
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 6, 7, 8]]);
    }));
    return function updateBranch(_x2, _x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  // Delete branch
  var deleteBranch = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(branchId) {
      var forceDelete,
        token,
        url,
        response,
        data,
        remainingBranches,
        message,
        _args5 = arguments,
        _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            forceDelete = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
            setLoading(true);
            _context5.p = 1;
            token = localStorage.getItem('token');
            url = forceDelete ? "/api/branches/".concat(branchId, "?forceDelete=true") : "/api/branches/".concat(branchId);
            _context5.n = 2;
            return fetch(url, {
              method: 'DELETE',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context5.v;
            _context5.n = 3;
            return response.json();
          case 3:
            data = _context5.v;
            if (!data.success) {
              _context5.n = 4;
              break;
            }
            setBranches(function (prev) {
              return prev.filter(function (branch) {
                return branch._id !== branchId;
              });
            });

            // If deleted branch was active, switch to another branch
            if (activeBranch && activeBranch._id === branchId) {
              remainingBranches = branches.filter(function (branch) {
                return branch._id !== branchId;
              });
              if (remainingBranches.length > 0) {
                setActiveBranch(remainingBranches[0]);
                localStorage.setItem("activeBranchId_".concat(user.id), remainingBranches[0]._id);
              } else {
                setActiveBranch(null);
                localStorage.removeItem("activeBranchId_".concat(user.id));
              }
            }
            message = data.deletedDebts > 0 ? "Filial va ".concat(data.deletedDebts, " ta qarz muvaffaqiyatli o'chirildi") : 'Filial muvaffaqiyatli o\'chirildi';
            showSuccess(message);
            return _context5.a(2, {
              success: true
            });
          case 4:
            showError(data.message || 'Filial o\'chirishda xatolik yuz berdi');
            return _context5.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t5 = _context5.v;
            console.error('Error deleting branch:', _t5);
            showError('Filial o\'chirishda xatolik yuz berdi');
            return _context5.a(2, {
              success: false,
              message: _t5.message
            });
          case 7:
            _context5.p = 7;
            setLoading(false);
            return _context5.f(7);
          case 8:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 6, 7, 8]]);
    }));
    return function deleteBranch(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  // Switch active branch with URL routing support
  var switchBranch = function switchBranch(branch) {
    var updateUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var showToast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (!branch || branch._id === (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id)) return;

    // Prevent switching to disabled branches
    if (branch.isDisabled) {
      showError('Bu filial sizning tarif limitingizdan tashqarida. Tarifni yangilang yoki boshqa filialni tanlang.');
      return;
    }

    // Prevent employees from switching to branches they're not assigned to
    if ((user === null || user === void 0 ? void 0 : user.role) === 'employee' && user !== null && user !== void 0 && user.assignedBranchId && branch._id !== user.assignedBranchId) {
      showError('Siz faqat tayinlangan filialingizda ishlashingiz mumkin.');
      return;
    }
    setActiveBranch(branch);
    localStorage.setItem("activeBranchId_".concat(user.id), branch._id);

    // Update URL if needed (for deep linking support)
    if (updateUrl && location.pathname !== '/login' && location.pathname !== '/register') {
      // Add branch parameter to current URL without changing the route
      var currentPath = location.pathname;
      var searchParams = new URLSearchParams(location.search);
      searchParams.set('branch', branch._id);

      // Use replace to avoid adding to browser history for every branch switch
      navigate("".concat(currentPath, "?").concat(searchParams.toString()), {
        replace: true
      });
    }

    // Only show toast if explicitly requested and prevent duplicate toasts
    if (showToast) {
      var now = Date.now();
      // Prevent showing toast if last switch was less than 500ms ago
      if (now - lastSwitchTime > 500) {
        showSuccess("".concat(branch.name, " filialiga o'tildi"));
        setLastSwitchTime(now);
      }
    }
  };

  // Handle URL branch parameter changes
  (0, _react.useEffect)(function () {
    if (user && branches.length > 0) {
      var searchParams = new URLSearchParams(location.search);
      var branchIdFromUrl = searchParams.get('branch');
      if (branchIdFromUrl && branchIdFromUrl !== (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id)) {
        var branchFromUrl = branches.find(function (b) {
          return b._id === branchIdFromUrl;
        });
        if (branchFromUrl) {
          // Switch branch without updating URL and without showing toast to avoid infinite loop
          switchBranch(branchFromUrl, false, false);
        }
      }
    }
  }, [location.search, branches, user, activeBranch]);

  // Fetch branches when user changes
  (0, _react.useEffect)(function () {
    if (user) {
      fetchBranches();
    } else {
      setBranches([]);
      setActiveBranch(null);
      setError(null);
    }
  }, [user]);
  var value = {
    // State
    branches: branches,
    activeBranch: activeBranch,
    loading: loading,
    error: error,
    // Actions
    createBranch: createBranch,
    updateBranch: updateBranch,
    deleteBranch: deleteBranch,
    switchBranch: switchBranch,
    fetchBranches: fetchBranches,
    // Subscription limits
    canCreateBranch: canCreateBranch,
    branchLimit: branchLimit
  };
  return /*#__PURE__*/_react["default"].createElement(BranchContext.Provider, {
    value: value
  }, children);
};
function useBranches() {
  var context = (0, _react.useContext)(BranchContext);
  if (!context) {
    throw new Error('useBranches must be used within a BranchProvider');
  }
  return context;
}