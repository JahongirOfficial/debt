"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarDebts = QarzdaftarDebts;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _storageUtils = require("../../utils/storageUtils");
var _translationUtils = require("../../utils/translationUtils");
var _DebtContext = require("../../utils/DebtContext");
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
var _ToastContext = require("../../utils/ToastContext");
var _SkeletonLoader = require("../SkeletonLoader");
var _DebtFilters = require("./DebtFilters");
var _DebtList = require("./DebtList");
var _AddDebtModal = require("./AddDebtModal");
var _DebtDetailsModal = require("./DebtDetailsModal");
var _EditDebtModal = require("./EditDebtModal");
var _DebtHistoryModal = require("./DebtHistoryModal");
var _DebtAdjustModal = require("./DebtAdjustModal");
var _formatUtils = require("../../utils/formatUtils");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarDebts() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var _useDebts = (0, _DebtContext.useDebts)(),
    debts = _useDebts.debts,
    loading = _useDebts.loading,
    error = _useDebts.error,
    userTier = _useDebts.userTier,
    debtLimit = _useDebts.debtLimit,
    createDebt = _useDebts.createDebt,
    updateDebt = _useDebts.updateDebt,
    markDebtAsPaid = _useDebts.markDebtAsPaid,
    adjustDebtAmount = _useDebts.adjustDebtAmount,
    deleteDebt = _useDebts.deleteDebt,
    fetchDebtHistory = _useDebts.fetchDebtHistory;
  var _useBranches = (0, _BranchContext.useBranches)(),
    activeBranch = _useBranches.activeBranch;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;

  // Check employee permissions
  var hasPermission = function hasPermission(permission) {
    var _user$employeeInfo;
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'employee') return true;
    return (user === null || user === void 0 || (_user$employeeInfo = user.employeeInfo) === null || _user$employeeInfo === void 0 || (_user$employeeInfo = _user$employeeInfo.permissions) === null || _user$employeeInfo === void 0 ? void 0 : _user$employeeInfo[permission]) || false;
  };
  var canAddDebt = hasPermission('canAddDebt');
  var _useToast = (0, _ToastContext.useToast)(),
    showSuccess = _useToast.showSuccess,
    showError = _useToast.showError;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showAddForm = _useState2[0],
    setShowAddForm = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    showDetailsModal = _useState4[0],
    setShowDetailsModal = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    editingDebt = _useState6[0],
    setEditingDebt = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    showHistoryModal = _useState8[0],
    setShowHistoryModal = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    debtHistory = _useState0[0],
    setDebtHistory = _useState0[1];
  var _useState1 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    showAdjustModal = _useState10[0],
    setShowAdjustModal = _useState10[1];
  var _useState11 = (0, _react.useState)('add'),
    _useState12 = _slicedToArray(_useState11, 2),
    adjustType = _useState12[0],
    setAdjustType = _useState12[1];
  var _useState13 = (0, _react.useState)('dueToday'),
    _useState14 = _slicedToArray(_useState13, 2),
    activeTab = _useState14[0],
    setActiveTab = _useState14[1];
  var _useState15 = (0, _react.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    debtSearch = _useState16[0],
    setDebtSearch = _useState16[1];

  // Filter debts based on current filters and active tab
  var getFilteredDebts = function getFilteredDebts() {
    var filteredDebts = debts;

    // For employees, filter debts by their assigned branch
    if ((user === null || user === void 0 ? void 0 : user.role) === 'employee' && user !== null && user !== void 0 && user.assignedBranchId) {
      filteredDebts = filteredDebts.filter(function (debt) {
        return debt.branchId === user.assignedBranchId;
      });
    }

    // Filter by status (tab)
    if (activeTab === 'dueToday') {
      var todayFormatted = new Date().toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(function (debt) {
        if (!debt.debtDate) return false;
        var debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debt.status === 'pending' && debtDateFormatted === todayFormatted;
      });
    } else if (activeTab === 'dueTomorrow') {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var tomorrowFormatted = tomorrow.toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(function (debt) {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        var debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted === tomorrowFormatted;
      });
    } else if (activeTab === 'threeDaysLeft') {
      var today = new Date();
      var threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);
      var _todayFormatted = today.toISOString().split('T')[0];
      var threeDaysLaterFormatted = threeDaysLater.toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(function (debt) {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        var debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted >= _todayFormatted && debtDateFormatted <= threeDaysLaterFormatted;
      });
    } else if (activeTab === 'overdue') {
      var _todayFormatted2 = new Date().toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(function (debt) {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        var debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted < _todayFormatted2;
      });
    } else if (activeTab === 'pending') {
      filteredDebts = filteredDebts.filter(function (debt) {
        return debt.status === 'pending';
      });
    } else if (activeTab === 'paid') {
      filteredDebts = filteredDebts.filter(function (debt) {
        return debt.status === 'paid';
      });
    }

    // Search filter
    if (debtSearch) {
      var term = debtSearch.toLowerCase();
      filteredDebts = filteredDebts.filter(function (debt) {
        return debt.creditor.toLowerCase().includes(term) || debt.description && debt.description.toLowerCase().includes(term);
      });
    }
    return filteredDebts;
  };
  var filteredDebts = getFilteredDebts();

  // For free tier users, sort pending debts by creation date (oldest first) and limit management to first 20
  var getManageableDebts = function getManageableDebts() {
    if (userTier === 'free' && debtLimit !== Infinity) {
      var pendingDebts = filteredDebts.filter(function (debt) {
        return debt.status === 'pending';
      });
      var paidDebts = filteredDebts.filter(function (debt) {
        return debt.status === 'paid';
      });

      // Sort pending debts by creation date (oldest first)
      var sortedPendingDebts = _toConsumableArray(pendingDebts).sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      // Mark which debts are manageable (first 20 pending debts)
      var debtsWithManageability = sortedPendingDebts.map(function (debt, index) {
        return _objectSpread(_objectSpread({}, debt), {}, {
          isManageable: index < debtLimit
        });
      });

      // Combine with paid debts (all paid debts are always manageable)
      var allPaidDebts = paidDebts.map(function (debt) {
        return _objectSpread(_objectSpread({}, debt), {}, {
          isManageable: true
        });
      });
      return [].concat(_toConsumableArray(debtsWithManageability), _toConsumableArray(allPaidDebts));
    }

    // For premium users, all debts are manageable
    return filteredDebts.map(function (debt) {
      return _objectSpread(_objectSpread({}, debt), {}, {
        isManageable: true
      });
    });
  };
  var manageableDebts = getManageableDebts();

  // Handlers
  var handleCardClick = function handleCardClick(debt) {
    setShowDetailsModal(debt);
  };
  var handleAdjustClick = function handleAdjustClick(debt, type) {
    setShowAdjustModal(debt);
    setAdjustType(type);
  };
  var handleMarkAsPaid = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(debtId) {
      var result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            // Show loading notification immediately
            showSuccess('To\'langan deb belgilanmoqda...');
            _context.p = 1;
            _context.n = 2;
            return markDebtAsPaid(debtId, '');
          case 2:
            result = _context.v;
            if (result && result.success) {
              showSuccess('Qarz to\'langan deb belgilandi');
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarzni to\'langan deb belgilashda xatolik yuz berdi');
            }
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('Error marking debt as paid:', _t);
            showError('Qarzni to\'langan deb belgilashda xatolik yuz berdi');
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleMarkAsPaid(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var handleEdit = function handleEdit(debt) {
    setEditingDebt(debt);
  };
  var handleViewHistory = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(debt) {
      var result, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return fetchDebtHistory(debt._id);
          case 1:
            result = _context2.v;
            if (result && result.success) {
              setDebtHistory(result.history);
              setShowHistoryModal(debt);
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarz tarixini olishda xatolik yuz berdi');
            }
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching debt history:', _t2);
            showError('Qarz tarixini olishda xatolik yuz berdi');
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function handleViewHistory(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Handle add debt
  var handleAddDebt = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(debtData) {
      var result, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            // Show loading notification
            showSuccess('Qarz qo\'shilmoqda...');
            _context3.p = 1;
            _context3.n = 2;
            return createDebt(_objectSpread(_objectSpread({}, debtData), {}, {
              amount: (0, _formatUtils.parseFormattedNumber)(debtData.amount),
              status: 'pending'
            }));
          case 2:
            result = _context3.v;
            if (result && result.success) {
              showSuccess("".concat(debtData.creditor, " uchun qarz muvaffaqiyatli qo'shildi"));
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarz qo\'shishda xatolik yuz berdi');
            }
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            console.error('Error creating debt:', _t3);
            showError('Qarz qo\'shishda xatolik yuz berdi');
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return function handleAddDebt(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Handle edit debt
  var handleSaveEdit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(updateData) {
      var debtId, result, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (editingDebt) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            // Store debt ID before clearing state
            debtId = editingDebt._id; // Clear editing state immediately
            setEditingDebt(null);

            // Show loading notification
            showSuccess('Yangilanmoqda...');
            _context4.p = 2;
            _context4.n = 3;
            return updateDebt(debtId, updateData);
          case 3:
            result = _context4.v;
            if (result && result.success) {
              showSuccess('Qarz ma\'lumotlari muvaffaqiyatli yangilandi');
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarzni yangilashda xatolik yuz berdi');
            }
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t4 = _context4.v;
            console.error('Error updating debt:', _t4);
            showError('Qarzni yangilashda xatolik yuz berdi');
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return function handleSaveEdit(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Handle debt adjustment
  var handleSaveAdjustment = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(adjustmentData) {
      var debtId, result, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (showAdjustModal) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            // Store debt ID before clearing state
            debtId = showAdjustModal._id; // Clear adjustment state immediately
            setShowAdjustModal(null);
            _context5.p = 2;
            _context5.n = 3;
            return adjustDebtAmount(debtId, adjustmentData);
          case 3:
            result = _context5.v;
            if (result && result.success) {
              showSuccess('Qarz miqdori muvaffaqiyatli o\'zgartirildi');
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
            }
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t5 = _context5.v;
            console.error('Error adjusting debt amount:', _t5);
            showError('Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
          case 5:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 4]]);
    }));
    return function handleSaveAdjustment(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleDelete = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(debtId) {
      var result, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            // Show loading notification immediately
            showSuccess('O\'chirilmoqda...');
            _context6.p = 1;
            _context6.n = 2;
            return deleteDebt(debtId, '');
          case 2:
            result = _context6.v;
            if (result && result.success) {
              showSuccess('Qarz muvaffaqiyatli o\'chirildi');
            } else {
              showError((result === null || result === void 0 ? void 0 : result.message) || 'Qarzni o\'chirishda xatolik yuz berdi');
            }
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t6 = _context6.v;
            console.error('Error deleting debt:', _t6);
            showError('Qarzni o\'chirishda xatolik yuz berdi');
          case 4:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 3]]);
    }));
    return function handleDelete(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-6xl mx-auto p-4 md:p-6"
    }, /*#__PURE__*/React.createElement(_SkeletonLoader.SkeletonLoader, {
      type: "debts"
    })));
  }
  if (error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-6xl mx-auto p-4 md:p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center py-12"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold text-red-600 mb-2"
    }, "Xatolik yuz berdi"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 dark:text-gray-400"
    }, error))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto p-4 md:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
  }, t('debts.title', 'Qarzlar ro\'yhati')), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hidden md:block text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium"
  }, t('debts.subtitle', 'Qarzlaringizni boshqaring va kuzatib boring')), activeBranch && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded-full",
    style: {
      backgroundColor: activeBranch.color || '#3B82F6'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700 dark:text-gray-300"
  }, activeBranch.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "(", debts.length, " ta qarz)")))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return canAddDebt && setShowAddForm(true);
    },
    disabled: !canAddDebt,
    className: "group relative p-4 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ".concat(canAddDebt ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 cursor-pointer' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'),
    title: canAddDebt ? "Qarz qo'shish" : "Ruxsat yo'q"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"
  }), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "relative h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2.5,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  })))), userTier === 'free' && debtLimit !== Infinity && debts.filter(function (debt) {
    return debt.status === 'pending';
  }).length >= debtLimit && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 p-6 bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 rounded-xl shadow-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-800/50 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6 text-amber-600 dark:text-amber-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2"
  }, "Free tarif limiti to'lgan!"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-amber-700 dark:text-amber-300 leading-relaxed"
  }, "Faqat ", debtLimit, " ta qarzni boshqarishingiz mumkin.", ' ', /*#__PURE__*/React.createElement("button", {
    className: "inline text-orange-600 font-semibold hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline decoration-2 underline-offset-2",
    onClick: function onClick() {
      return navigate('/pricing');
    }
  }, "Tarifni yangilang"), ".")))), /*#__PURE__*/React.createElement(_DebtFilters.DebtFilters, {
    activeTab: activeTab,
    onTabChange: setActiveTab,
    searchValue: debtSearch,
    onSearchChange: setDebtSearch
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(_DebtList.DebtList, {
    debts: manageableDebts,
    onCardClick: handleCardClick,
    onAdjustClick: handleAdjustClick,
    onMarkAsPaid: handleMarkAsPaid,
    onAddNew: function onAddNew() {
      return setShowAddForm(true);
    }
  }))), /*#__PURE__*/React.createElement(_DebtDetailsModal.DebtDetailsModal, {
    debt: showDetailsModal,
    isOpen: !!showDetailsModal,
    onClose: function onClose() {
      return setShowDetailsModal(null);
    },
    onMarkAsPaid: function onMarkAsPaid() {
      return showDetailsModal && handleMarkAsPaid(showDetailsModal._id);
    },
    onEdit: function onEdit() {
      return showDetailsModal && handleEdit(showDetailsModal);
    },
    onViewHistory: function onViewHistory() {
      return showDetailsModal && handleViewHistory(showDetailsModal);
    },
    onDelete: handleDelete
  }), /*#__PURE__*/React.createElement(_AddDebtModal.AddDebtModal, {
    isOpen: showAddForm,
    onClose: function onClose() {
      return setShowAddForm(false);
    },
    onSubmit: handleAddDebt
  }), /*#__PURE__*/React.createElement(_EditDebtModal.EditDebtModal, {
    isOpen: !!editingDebt,
    debt: editingDebt,
    onClose: function onClose() {
      return setEditingDebt(null);
    },
    onSave: handleSaveEdit
  }), /*#__PURE__*/React.createElement(_DebtHistoryModal.DebtHistoryModal, {
    isOpen: !!showHistoryModal,
    debt: showHistoryModal,
    history: debtHistory,
    onClose: function onClose() {
      setShowHistoryModal(null);
      setDebtHistory([]);
    }
  }), /*#__PURE__*/React.createElement(_DebtAdjustModal.DebtAdjustModal, {
    isOpen: !!showAdjustModal,
    debt: showAdjustModal,
    type: adjustType,
    onClose: function onClose() {
      return setShowAdjustModal(null);
    },
    onSave: handleSaveAdjustment
  }));
}