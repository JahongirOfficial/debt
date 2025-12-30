"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarDashboard = QarzdaftarDashboard;
var _react = _interopRequireWildcard(require("react"));
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _debtUtils = require("../utils/debtUtils");
var _DebtContext = require("../utils/DebtContext");
var _AuthContext = require("../utils/AuthContext");
var _BranchContext = require("../utils/BranchContext");
var _SkeletonLoader = require("./SkeletonLoader");
var _subscriptionUtils = require("../utils/subscriptionUtils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarDashboard() {
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useStoredState3 = (0, _storageUtils.useStoredState)('qarzdaftar_currency', 'UZS'),
    _useStoredState4 = _slicedToArray(_useStoredState3, 1),
    currency = _useStoredState4[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var _useDebts = (0, _DebtContext.useDebts)(),
    debts = _useDebts.debts,
    loading = _useDebts.loading,
    error = _useDebts.error,
    userTier = _useDebts.userTier,
    debtLimit = _useDebts.debtLimit;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    settings = _useAuth.settings;
  var _useBranches = (0, _BranchContext.useBranches)(),
    activeBranch = _useBranches.activeBranch;
  var _useState = (0, _react.useState)(new Date()),
    _useState2 = _slicedToArray(_useState, 2),
    currentTime = _useState2[0],
    setCurrentTime = _useState2[1];

  // Update time every minute
  (0, _react.useEffect)(function () {
    var timer = setInterval(function () {
      setCurrentTime(new Date());
    }, 60000);
    return function () {
      return clearInterval(timer);
    };
  }, []);

  // Show loading state
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-4xl mx-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "mb-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-5 w-64 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "dashboardStats"
    }));
  }

  // Show error state
  if (error) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-4xl mx-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
      role: "alert"
    }, /*#__PURE__*/_react["default"].createElement("strong", {
      className: "font-bold"
    }, "Xato! "), /*#__PURE__*/_react["default"].createElement("span", {
      className: "block sm:inline"
    }, error)));
  }

  // Calculate statistics for dashboard
  // For employees, filter debts by their assigned branch
  var filteredDebts = debts;
  if ((user === null || user === void 0 ? void 0 : user.role) === 'employee' && user !== null && user !== void 0 && user.assignedBranchId) {
    // Employee sees only debts from their assigned branch
    console.log('Dashboard: Filtering debts for employee');
    console.log('Total debts:', debts.length);
    console.log('Assigned branch ID:', user.assignedBranchId);
    console.log('Active branch:', activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id);
    filteredDebts = debts.filter(function (debt) {
      return debt.branchId === user.assignedBranchId;
    });
    console.log('Filtered debts:', filteredDebts.length);
  }

  // For any tier, only consider manageable debts for statistics if limit is exceeded
  var tierFeatures = (0, _subscriptionUtils.getTierFeatures)(userTier);
  var actualLimit = tierFeatures.debtLimit;
  var manageableDebts = actualLimit !== Infinity && filteredDebts.length > actualLimit ? filteredDebts.slice(0, actualLimit) : filteredDebts;
  var totalDebt = filteredDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var manageableTotalDebt = manageableDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var paidDebts = filteredDebts.filter(function (debt) {
    return debt.status === 'paid';
  });
  var manageablePaidDebts = manageableDebts.filter(function (debt) {
    return debt.status === 'paid';
  });
  var pendingDebtsCount = filteredDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).length;
  var paidDebtsCount = paidDebts.length;
  var totalDebtsCount = filteredDebts.length;
  var manageablePendingDebtsCount = manageableDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).length;
  var manageablePaidDebtsCount = manageablePaidDebts.length;
  var manageableTotalDebtsCount = manageableDebts.length;

  // Get paid amount trend data (last 7 days) - REMOVED as per user request

  // Get current time formatted
  var getGreeting = function getGreeting() {
    var hour = currentTime.getHours();
    if (hour < 12) return t('dashboard.goodMorning', 'Xayrli tong');
    if (hour < 18) return t('dashboard.goodAfternoon', 'Xayrli kun');
    return t('dashboard.goodEvening', 'Xayrli kech');
  };
  var formatTime = function formatTime() {
    return currentTime.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  var formatDate = function formatDate() {
    return currentTime.toLocaleDateString('uz-UZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate additional statistics
  var totalPaidAmount = paidDebts.reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var manageableTotalPaidAmount = manageablePaidDebts.reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var averageDebtAmount = debts.length > 0 ? totalDebt / pendingDebtsCount || 0 : 0;
  var manageableAverageDebtAmount = manageableDebts.length > 0 ? manageableTotalDebt / manageablePendingDebtsCount || 0 : 0;
  var completionRate = totalDebtsCount > 0 ? Math.round(paidDebtsCount / totalDebtsCount * 100) : 0;
  var manageableCompletionRate = manageableTotalDebtsCount > 0 ? Math.round(manageablePaidDebtsCount / manageableTotalDebtsCount * 100) : 0;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden rounded-3xl p-8 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 border border-slate-700/50' : 'bg-gradient-to-br from-white via-blue-50 to-white border border-gray-200', " shadow-2xl")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative z-10"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center md:justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 md:mb-0"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl md:text-4xl font-bold mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, getGreeting(), ", ", (user === null || user === void 0 ? void 0 : user.username) || 'Foydalanuvchi', "! \uD83D\uDC4B"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-lg hidden md:block ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.subtitle', 'Qarzlar va moliyaviy ma\'lumotlar'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-blue-600')
  }, formatTime()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
  }, formatDate())))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 opacity-10"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full blur-3xl"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden rounded-2xl p-6 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200', " shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full"
  }, "QARZ"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium mb-1 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.totalDebt', 'Umumiy qarz')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-red-600 mb-2"
  }, (0, _debtUtils.formatCurrency)(totalDebt, currency, language)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center text-xs text-gray-500"
  }, /*#__PURE__*/_react["default"].createElement("span", null, pendingDebtsCount, " ta faol qarz")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden rounded-2xl p-6 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200', " shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full"
  }, "TO'LANGAN"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium mb-1 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.totalPaid', 'Jami to\'langan')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-green-600 mb-2"
  }, (0, _debtUtils.formatCurrency)(totalPaidAmount, currency, language)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center text-xs text-gray-500"
  }, /*#__PURE__*/_react["default"].createElement("span", null, paidDebtsCount, " ta to'langan qarz")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden rounded-2xl p-6 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200', " shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
  }, "FOIZ"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium mb-1 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.completionRate', 'Bajarilish foizi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-blue-600 mb-2"
  }, completionRate, "%"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full rounded-full h-2 ".concat(settings.theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500",
    style: {
      width: "".concat(completionRate, "%")
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative overflow-hidden rounded-2xl p-6 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200', " shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full"
  }, "O'RTACHA"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium mb-1 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.averageDebt', 'O\'rtacha qarz')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-purple-600 mb-2"
  }, (0, _debtUtils.formatCurrency)(averageDebtAmount, currency, language)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center text-xs text-gray-500"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "Har bir qarz uchun"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-3xl p-4 md:p-8 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50' : 'bg-white border border-gray-200', " shadow-2xl")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4 md:mb-6"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg md:text-2xl font-bold ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, t('dashboard.recentActivity', 'So\'nggi faoliyat')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs md:text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
  }, "Jonli"))), debts.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-8 md:py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 md:w-12 md:h-12 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-base md:text-lg font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('dashboard.noActivity', 'Hali faoliyat yo\'q')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-500' : 'text-gray-400')
  }, "Birinchi qarzingizni qo'shing")) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3 md:space-y-4"
  }, debts.slice(0, 5).map(function (debt, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: debt._id,
      className: "flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-[1.02] ".concat(settings.theme === 'dark' ? 'bg-slate-700/60 hover:bg-slate-700/80' : 'bg-gray-50 hover:bg-gray-100', " border ").concat(settings.theme === 'dark' ? 'border-slate-600/50' : 'border-gray-200'),
      style: {
        animationDelay: "".concat(index * 100, "ms")
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3 md:space-x-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg ".concat(debt.status === 'pending' ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gradient-to-br from-green-500 to-emerald-500')
    }, debt.creditor.charAt(0).toUpperCase(), debt.status === 'pending' && /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full flex items-center justify-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
    }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-semibold text-sm md:text-lg ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
    }, debt.creditor), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs md:text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
    }, new Date(debt.createdAt).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm md:text-xl font-bold mb-1 ".concat(debt.status === 'pending' ? 'text-red-600' : 'text-green-600')
    }, (0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency, language)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium ".concat(debt.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800')
    }, debt.status === 'pending' ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mr-1 md:mr-2 animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "hidden md:inline"
    }, t('common.pending', 'Kutilmoqda')), /*#__PURE__*/_react["default"].createElement("span", {
      className: "md:hidden"
    }, "Kutish")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-1 md:mr-2"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "hidden md:inline"
    }, t('common.paid', 'To\'langan')), /*#__PURE__*/_react["default"].createElement("span", {
      className: "md:hidden"
    }, "To'landi")))));
  }))));
}