"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserManagement = UserManagement;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
var _UserProfileModal = require("./UserProfileModal");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t6 in e) "default" !== _t6 && {}.hasOwnProperty.call(e, _t6) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t6)) && (i.get || i.set) ? o(f, _t6, i) : f[_t6] = e[_t6]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function UserManagement() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    users = _useState2[0],
    setUsers = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)({
      status: 'all',
      subscription: 'all',
      search: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    filters = _useState6[0],
    setFilters = _useState6[1];
  var _useState7 = (0, _react.useState)({
      page: 1,
      limit: 10,
      total: 0
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    pagination = _useState8[0],
    setPagination = _useState8[1];
  var _useState9 = (0, _react.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    openDropdown = _useState0[0],
    setOpenDropdown = _useState0[1];
  var _useState1 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    deleteConfirm = _useState10[0],
    setDeleteConfirm = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    subscriptionModal = _useState12[0],
    setSubscriptionModal = _useState12[1]; // { userId, username, currentTier }
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    profileModal = _useState14[0],
    setProfileModal = _useState14[1]; // { userId, username }
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    reportModal = _useState16[0],
    setReportModal = _useState16[1]; // { userId, username }
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    sendingReport = _useState18[0],
    setSendingReport = _useState18[1];
  (0, _react.useEffect)(function () {
    fetchUsers();
  }, [pagination.page]);

  // Initial load
  (0, _react.useEffect)(function () {
    fetchUsers();
  }, []);

  // Real-time search effect
  (0, _react.useEffect)(function () {
    var timeoutId = setTimeout(function () {
      setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: 1
      }));
      fetchUsers();
    }, 500); // 500ms debounce

    return function () {
      return clearTimeout(timeoutId);
    };
  }, [filters.search, filters.status, filters.subscription]);

  // Close dropdown when clicking outside
  (0, _react.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (openDropdown && !event.target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);
  var fetchUsers = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var params, response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            params = new URLSearchParams(_objectSpread({
              page: pagination.page.toString(),
              limit: pagination.limit.toString()
            }, filters));
            _context.n = 1;
            return (0, _api.apiFetch)("/admin/users?".concat(params), {
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
            setUsers(data.users);
            setPagination(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, {
                total: data.total
              });
            });
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching users:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchUsers() {
      return _ref.apply(this, arguments);
    };
  }();
  var updateUserStatus = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId, newStatus) {
      var originalUsers, response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            if (!(!userId || userId === 'undefined')) {
              _context2.n = 1;
              break;
            }
            console.error('Invalid user ID:', userId);
            return _context2.a(2);
          case 1:
            // Optimistic update - darhol UI'ni yangilaymiz
            originalUsers = _toConsumableArray(users);
            setUsers(users.map(function (user) {
              return (user.id || user._id) === userId ? _objectSpread(_objectSpread({}, user), {}, {
                status: newStatus
              }) : user;
            }));
            _context2.n = 2;
            return (0, _api.apiFetch)("/admin/users/".concat(userId, "/status"), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                status: newStatus
              })
            });
          case 2:
            response = _context2.v;
            if (!response.ok) {
              // Agar xatolik bo'lsa, asl holatga qaytaramiz
              setUsers(originalUsers);
              console.error('Failed to update user status');
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.error('Error updating user status:', _t2);
            // Xatolik bo'lsa, asl holatga qaytaramiz
            fetchUsers();
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 3]]);
    }));
    return function updateUserStatus(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var updateUserSubscription = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId, newSubscription) {
      var expirationDays,
        subscriptionExpiresAt,
        subscriptionStartedAt,
        originalUsers,
        response,
        _args3 = arguments,
        _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            expirationDays = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 30;
            _context3.p = 1;
            if (!(!userId || userId === 'undefined')) {
              _context3.n = 2;
              break;
            }
            console.error('Invalid user ID:', userId);
            return _context3.a(2);
          case 2:
            // Calculate expiration date for UI update
            subscriptionExpiresAt = null;
            subscriptionStartedAt = null;
            if (newSubscription !== 'free') {
              subscriptionStartedAt = new Date();
              subscriptionExpiresAt = new Date();
              subscriptionExpiresAt.setDate(subscriptionExpiresAt.getDate() + expirationDays);
            }

            // Optimistic update - darhol UI'ni yangilaymiz
            originalUsers = _toConsumableArray(users);
            setUsers(users.map(function (user) {
              return (user.id || user._id) === userId ? _objectSpread(_objectSpread({}, user), {}, {
                subscriptionTier: newSubscription,
                subscriptionExpiresAt: subscriptionExpiresAt,
                subscriptionStartedAt: subscriptionStartedAt
              }) : user;
            }));
            _context3.n = 3;
            return (0, _api.apiFetch)("/admin/users/".concat(userId, "/subscription"), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                subscription: newSubscription,
                expirationDays: expirationDays
              })
            });
          case 3:
            response = _context3.v;
            if (!response.ok) {
              // Agar xatolik bo'lsa, asl holatga qaytaramiz
              setUsers(originalUsers);
              console.error('Failed to update user subscription');
              // Bu yerda toast notification ko'rsatish mumkin
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.error('Error updating user subscription:', _t3);
            // Xatolik bo'lsa, asl holatga qaytaramiz
            fetchUsers();
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4]]);
    }));
    return function updateUserSubscription(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  var deleteUser = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId) {
      var response, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            if (!(!userId || userId === 'undefined')) {
              _context4.n = 1;
              break;
            }
            console.error('Invalid user ID:', userId);
            return _context4.a(2);
          case 1:
            _context4.n = 2;
            return (0, _api.apiFetch)("/admin/users/".concat(userId), {
              method: 'DELETE',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context4.v;
            if (response.ok) {
              // Remove user from local state
              setUsers(users.filter(function (user) {
                return (user.id || user._id) !== userId;
              }));
              setDeleteConfirm(null);
              setOpenDropdown(null);

              // Update pagination total
              setPagination(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  total: prev.total - 1
                });
              });
            } else {
              console.error('Failed to delete user');
              alert('Foydalanuvchini o\'chirishda xatolik yuz berdi');
            }
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            console.error('Error deleting user:', _t4);
            alert('Server bilan bog\'lanishda xatolik');
          case 4:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 3]]);
    }));
    return function deleteUser(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleDeleteClick = function handleDeleteClick(userId, username) {
    setDeleteConfirm({
      userId: userId,
      username: username
    });
    setOpenDropdown(null);
  };
  var handleSendReport = function handleSendReport(userId, username) {
    setReportModal({
      userId: userId,
      username: username
    });
    setOpenDropdown(null);
  };
  var sendReportToUser = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var response, data, errorData, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (reportModal) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            _context5.p = 1;
            setSendingReport(true);
            _context5.n = 2;
            return (0, _api.apiFetch)("/admin/users/".concat(reportModal.userId, "/send-report"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              }
            });
          case 2:
            response = _context5.v;
            if (!response.ok) {
              _context5.n = 4;
              break;
            }
            _context5.n = 3;
            return response.json();
          case 3:
            data = _context5.v;
            alert("\u2705 ".concat(data.message));
            setReportModal(null);
            _context5.n = 6;
            break;
          case 4:
            _context5.n = 5;
            return response.json();
          case 5:
            errorData = _context5.v;
            alert("\u274C Xatolik: ".concat(errorData.message));
          case 6:
            _context5.n = 8;
            break;
          case 7:
            _context5.p = 7;
            _t5 = _context5.v;
            console.error('Error sending report:', _t5);
            alert('❌ Server bilan bog\'lanishda xatolik yuz berdi');
          case 8:
            _context5.p = 8;
            setSendingReport(false);
            return _context5.f(8);
          case 9:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 7, 8, 9]]);
    }));
    return function sendReportToUser() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleSubscriptionChange = function handleSubscriptionChange(userId, username, currentTier, newTier) {
    if (newTier === 'free') {
      // For free tier, no expiration needed
      updateUserSubscription(userId, newTier);
    } else {
      // For paid tiers, show modal to select expiration
      setSubscriptionModal({
        userId: userId,
        username: username,
        currentTier: currentTier,
        newTier: newTier
      });
    }
    setOpenDropdown(null);
  };
  var confirmSubscriptionChange = function confirmSubscriptionChange(expirationDays) {
    if (subscriptionModal) {
      updateUserSubscription(subscriptionModal.userId, subscriptionModal.newTier, expirationDays);
      setSubscriptionModal(null);
    }
  };
  var confirmDelete = function confirmDelete() {
    if (deleteConfirm) {
      deleteUser(deleteConfirm.userId);
    }
  };
  var cancelDelete = function cancelDelete() {
    setDeleteConfirm(null);
  };
  var getStatusBadge = function getStatusBadge(status) {
    var statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        text: 'Faol',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      suspended: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        text: 'Bloklangan',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      }
    };
    var config = statusConfig[status] || statusConfig.active;
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ".concat(config.color)
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-3 h-3 mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: config.icon
    })), config.text);
  };
  var getSubscriptionBadge = function getSubscriptionBadge(subscription) {
    var subConfig = {
      free: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        text: 'Bepul',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      lite: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        text: 'Lite',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
      },
      standard: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        text: 'Standart',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      },
      pro: {
        color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700',
        text: 'Professional',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
      }
    };
    var config = subConfig[subscription] || subConfig.free;
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ".concat(config.color, " transition-all duration-200 hover:scale-105")
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-3 h-3 mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: config.icon
    })), config.text);
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-4 bg-white bg-opacity-20 rounded w-1/2"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-4 gap-6"
    }, _toConsumableArray(Array(4)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "space-y-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"
      }));
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "px-6 py-4 border-b border-gray-200 dark:border-gray-700"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "divide-y divide-gray-200 dark:divide-gray-700"
    }, _toConsumableArray(Array(5)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "p-6"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "animate-pulse flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center space-x-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "space-y-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-3 bg-gray-300 dark:bg-gray-600 rounded w-40"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center space-x-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "space-y-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "space-y-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg"
      })))));
    }))));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "Foydalanuvchilarni Boshqarish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-green-100 text-lg"
  }, "Foydalanuvchilarni ko'rish va boshqarish")), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-semibold text-gray-900 dark:text-white"
  }, "Filtrlar"), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
  })), /*#__PURE__*/_react["default"].createElement("span", null, "Qidirish va filtrlash"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, "Qidirish"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }))), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Ism yoki telefon...",
    value: filters.search,
    onChange: function onChange(e) {
      return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
        search: e.target.value
      }));
    },
    className: "w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
  }), filters.search && /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 right-0 pr-3 flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, "Holat"), /*#__PURE__*/_react["default"].createElement("select", {
    value: filters.status,
    onChange: function onChange(e) {
      return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
        status: e.target.value
      }));
    },
    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Barchasi"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "active"
  }, "Faol"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "suspended"
  }, "Bloklangan"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, "Tarif"), /*#__PURE__*/_react["default"].createElement("select", {
    value: filters.subscription,
    onChange: function onChange(e) {
      return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
        subscription: e.target.value
      }));
    },
    className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, "Barchasi"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "free"
  }, "Bepul"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "standard"
  }, "Standart"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "pro"
  }, "Professional"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-6 py-4 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 dark:text-white"
  }, "Foydalanuvchilar ro'yxati"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Jami: ", users.length, " ta")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "divide-y divide-gray-200 dark:divide-gray-700"
  }, users.map(function (user) {
    var _user$username;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: user.id || user._id,
      className: "p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-shrink-0"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-lg font-semibold text-white"
    }, ((_user$username = user.username) === null || _user$username === void 0 ? void 0 : _user$username.charAt(0).toUpperCase()) || 'U'))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-lg font-semibold text-gray-900 dark:text-white truncate"
    }, user.username), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex space-x-2"
    }, getStatusBadge(user.status), getSubscriptionBadge(user.subscriptionTier))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4 mt-1"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-600 dark:text-gray-400 flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    })), user.phone), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-500 dark:text-gray-400 flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4m-4-8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
    })), "Ro'yxatdan o'tgan: ", new Date(user.createdAt).toLocaleDateString('uz-UZ')), user.subscriptionExpiresAt && user.subscriptionTier !== 'free' && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-orange-600 dark:text-orange-400 flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    })), "Tugaydi: ", new Date(user.subscriptionExpiresAt).toLocaleDateString('uz-UZ'))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col space-y-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "relative"
    }, /*#__PURE__*/_react["default"].createElement("select", {
      value: user.status,
      onChange: function onChange(e) {
        return updateUserStatus(user.id || user._id, e.target.value);
      },
      className: "text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-green-400 appearance-none",
      style: {
        backgroundImage: 'none'
      }
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "active"
    }, "Faol"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "suspended"
    }, "Bloklangan")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-green-500",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "relative"
    }, /*#__PURE__*/_react["default"].createElement("select", {
      value: user.subscriptionTier,
      onChange: function onChange(e) {
        return handleSubscriptionChange(user.id || user._id, user.username, user.subscriptionTier, e.target.value);
      },
      className: "text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-purple-400 appearance-none",
      style: {
        backgroundImage: 'none'
      }
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "free"
    }, "Bepul"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "lite"
    }, "Lite"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "standard"
    }, "Standart"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "pro"
    }, "Professional")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-purple-500",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col space-y-2"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return setProfileModal({
          userId: user.id || user._id,
          username: user.username
        });
      },
      className: "p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200",
      title: "Profil ko'rish"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
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
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "relative"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return setOpenDropdown(openDropdown === (user.id || user._id) ? null : user.id || user._id);
      },
      className: "p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    }))), openDropdown === (user.id || user._id) && /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "py-1"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleSendReport(user.id || user._id, user.username);
      },
      className: "w-full text-left px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 mr-2",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })), "Hisobot yuborish"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleDeleteClick(user.id || user._id, user.username);
      },
      className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200 flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 mr-2",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })), "O'chirish"))))))));
  }))), pagination.total > pagination.limit && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 rounded-b-2xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 flex justify-between sm:hidden"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: pagination.page - 1
      }));
    },
    disabled: pagination.page === 1,
    className: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 19l-7-7 7-7"
  })), "Oldingi"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: pagination.page + 1
      }));
    },
    disabled: pagination.page * pagination.limit >= pagination.total,
    className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  }, "Keyingi", /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 ml-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-700 dark:text-gray-300"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, (pagination.page - 1) * pagination.limit + 1), ' - ', /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, Math.min(pagination.page * pagination.limit, pagination.total)), ' ', "dan", ' ', /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, pagination.total), ' ', "natija")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("nav", {
    className: "relative z-0 inline-flex rounded-xl shadow-sm -space-x-px"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: pagination.page - 1
      }));
    },
    disabled: pagination.page === 1,
    className: "relative inline-flex items-center px-4 py-2 rounded-l-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 mr-1",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M15 19l-7-7 7-7"
  })), "Oldingi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300"
  }, pagination.page, " / ", Math.ceil(pagination.total / pagination.limit)), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
        page: pagination.page + 1
      }));
    },
    disabled: pagination.page * pagination.limit >= pagination.total,
    className: "relative inline-flex items-center px-4 py-2 rounded-r-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  }, "Keyingi", /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 ml-1",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  }))))))), deleteConfirm && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-red-600 dark:text-red-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 dark:text-white text-center mb-2"
  }, "Foydalanuvchini o'chirish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-center mb-6"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, deleteConfirm.username), " foydalanuvchisini o'chirishni xohlaysizmi? Bu amal qaytarib bo'lmaydi va barcha ma'lumotlar o'chib ketadi."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: cancelDelete,
    className: "flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: confirmDelete,
    className: "flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
  })), "O'chirish")))), subscriptionModal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-white"
  }, "Obuna Muddatini Belgilash"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSubscriptionModal(null);
    },
    className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-300 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-semibold"
  }, subscriptionModal.username), " foydalanuvchisining obunasini", ' ', /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-semibold text-purple-600 dark:text-purple-400"
  }, subscriptionModal.newTier === 'standard' ? 'Standart' : 'Professional'), ' ', "rejimiga o'zgartirmoqdasiz."), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Obuna muddati tugagach, foydalanuvchi avtomatik ravishda bepul rejimga qaytadi.")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
  }, "Obuna muddati (kunlarda):"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirmSubscriptionChange(7);
    },
    className: "p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "font-semibold text-gray-900 dark:text-white"
  }, "7 kun"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "Sinov")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirmSubscriptionChange(30);
    },
    className: "p-3 border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "font-semibold text-purple-600 dark:text-purple-400"
  }, "30 kun"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-purple-500 dark:text-purple-400"
  }, "Standart")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirmSubscriptionChange(90);
    },
    className: "p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "font-semibold text-gray-900 dark:text-white"
  }, "90 kun"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "3 oy")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return confirmSubscriptionChange(365);
    },
    className: "p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "font-semibold text-gray-900 dark:text-white"
  }, "365 kun"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "1 yil")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-end space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setSubscriptionModal(null);
    },
    className: "px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
  }, "Bekor qilish")))), deleteConfirm && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-red-600 dark:text-red-400"
  }, "Foydalanuvchini O'chirish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: cancelDelete,
    className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-300"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-semibold"
  }, deleteConfirm.username), " foydalanuvchisini butunlay o'chirishni xohlaysizmi?"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-red-600 dark:text-red-400 mt-2"
  }, "Bu amal qaytarib bo'lmaydi!")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-end space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: cancelDelete,
    className: "px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: confirmDelete,
    className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
  }, "O'chirish")))), reportModal && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-blue-600 dark:text-blue-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-semibold text-gray-900 dark:text-white text-center mb-2"
  }, "Hisobot Yuborish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-center mb-6"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, reportModal.username), " foydalanuvchisiga ertaga to'lanishi kerak bo'lgan qarzlar hisobotini Telegram orqali yuborasizmi?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-blue-800 dark:text-blue-200"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-medium mb-1"
  }, "Hisobot tarkibi:"), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "list-disc list-inside space-y-1 text-xs"
  }, /*#__PURE__*/_react["default"].createElement("li", null, "Ertaga to'lanishi kerak bo'lgan qarzlar ro'yxati"), /*#__PURE__*/_react["default"].createElement("li", null, "Har bir qarz uchun: qarzdor nomi, summa, tavsif"), /*#__PURE__*/_react["default"].createElement("li", null, "Jami summa va qarzlar soni"), /*#__PURE__*/_react["default"].createElement("li", null, "Excel fayl (CSV format)"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setReportModal(null);
    },
    disabled: sendingReport,
    className: "flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: sendReportToUser,
    disabled: sendingReport,
    className: "flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center disabled:opacity-50"
  }, sendingReport ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"
  }), "Yuborilmoqda...") : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 mr-2",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
  })), "Yuborish"))))), /*#__PURE__*/_react["default"].createElement(_UserProfileModal.UserProfileModal, {
    isOpen: !!profileModal,
    userId: profileModal === null || profileModal === void 0 ? void 0 : profileModal.userId,
    username: profileModal === null || profileModal === void 0 ? void 0 : profileModal.username,
    onClose: function onClose() {
      return setProfileModal(null);
    }
  }));
}