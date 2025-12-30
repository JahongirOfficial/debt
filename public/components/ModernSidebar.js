"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModernSidebar = ModernSidebar;
var _react = _interopRequireWildcard(require("react"));
var _translationUtils = require("../utils/translationUtils");
var _LanguageContext = require("../utils/LanguageContext.jsx");
var _AuthContext = require("../utils/AuthContext.jsx");
var _DebtContext = require("../utils/DebtContext.jsx");
var _BranchContext = require("../utils/BranchContext.jsx");
var _reactRouterDom = require("react-router-dom");
var _BranchSelector = require("./branches/BranchSelector");
var _BranchCreateModal = require("./branches/BranchCreateModal");
var _subscriptionUtils = require("../utils/subscriptionUtils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ModernSidebar(_ref) {
  var _user$username, _branches$find, _user$employeeInfo2, _user$employeeInfo3;
  var activeSection = _ref.activeSection,
    switchSection = _ref.switchSection,
    isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onCollapseChange = _ref.onCollapseChange;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    settings = _useAuth.settings,
    logout = _useAuth.logout;
  var _useDebts = (0, _DebtContext.useDebts)(),
    debts = _useDebts.debts,
    userTier = _useDebts.userTier,
    debtLimit = _useDebts.debtLimit;
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches;
  var navigate = (0, _reactRouterDom.useNavigate)();
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isCollapsed = _useState2[0],
    setIsCollapsed = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showCreateBranchModal = _useState4[0],
    setShowCreateBranchModal = _useState4[1];

  // Check if user has reached the pending debt limit for their tier
  var pendingDebtsCount = debts ? debts.filter(function (debt) {
    return debt.status === 'pending';
  }).length : 0;
  var tierFeatures = (0, _subscriptionUtils.getTierFeatures)(userTier);
  var actualLimit = tierFeatures.debtLimit;
  var hasReachedLimit = actualLimit !== Infinity && pendingDebtsCount >= actualLimit;
  var handleCollapseToggle = function handleCollapseToggle() {
    var newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };
  var allMenuItems = [{
    id: 'dashboard',
    route: '/dashboard',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    })),
    label: t('navigation.dashboard', 'Dashboard'),
    badge: null,
    allowedRoles: ['user', 'admin', 'employee']
  }, {
    id: 'debts',
    route: '/debts',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    label: t('navigation.debts', 'Qarzlar'),
    badge: null,
    allowedRoles: ['user', 'admin', 'employee']
  }, {
    id: 'branches',
    route: '/branches',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    })),
    label: t('navigation.branches', 'Filiallar'),
    badge: null,
    allowedRoles: ['user', 'admin']
  }, {
    id: 'employees',
    route: '/employees',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    })),
    label: t('navigation.employees', 'Xodimlar'),
    badge: null,
    allowedRoles: ['user', 'admin']
  }, {
    id: 'calculator',
    route: '/calculator',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    })),
    label: t('navigation.calculator', 'Kalkulyator'),
    badge: null,
    allowedRoles: ['user', 'admin', 'employee']
  }, {
    id: 'ratings',
    route: '/ratings',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.538-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    })),
    label: t('navigation.ratings', 'Reytinglar'),
    badge: null,
    allowedRoles: ['user', 'admin', 'employee']
  }, {
    id: 'analytics',
    route: '/analytics',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    })),
    label: t('navigation.analytics', 'Analitika'),
    badge: null,
    allowedRoles: ['user', 'admin']
  }, {
    id: 'sms-notifications',
    route: '/sms-notifications',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
    })),
    label: t('navigation.smsNotifications', 'SMS Eslatmalar'),
    badge: (user === null || user === void 0 ? void 0 : user.subscriptionTier) === 'free' ? 'PRO' : null,
    allowedRoles: ['user', 'admin']
  }, {
    id: 'admin-business-owners',
    route: '/admin/business-owners',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    })),
    label: 'Biznes Egalari',
    badge: null,
    allowedRoles: ['admin']
  }, {
    id: 'admin-employees',
    route: '/admin/employees',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    })),
    label: 'Xodimlar',
    badge: null,
    allowedRoles: ['admin']
  }, {
    id: 'admin-sms-reminders',
    route: '/admin/sms-reminders',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    })),
    label: 'SMS Eslatmalar',
    badge: null,
    allowedRoles: ['admin']
  }, {
    id: 'pricing',
    route: '/pricing',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    label: t('navigation.pricing', 'Tariflar'),
    badge: null,
    allowedRoles: ['user', 'admin']
  }, {
    id: 'settings',
    route: '/settings',
    icon: /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
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
    })),
    label: t('navigation.settings', 'Sozlamalar'),
    badge: null,
    allowedRoles: ['user', 'admin', 'employee']
  }];

  // Filter menu items based on user role and permissions
  var menuItems = allMenuItems.filter(function (item) {
    var _user$employeeInfo;
    // Check basic role access
    if (!item.allowedRoles.includes((user === null || user === void 0 ? void 0 : user.role) || 'user')) {
      return false;
    }

    // For employees, check specific permissions
    if ((user === null || user === void 0 ? void 0 : user.role) === 'employee' && user !== null && user !== void 0 && (_user$employeeInfo = user.employeeInfo) !== null && _user$employeeInfo !== void 0 && _user$employeeInfo.permissions) {
      var permissions = user.employeeInfo.permissions;

      // Analytics requires canViewReports permission
      if (item.id === 'analytics' && !permissions.canViewReports) {
        return false;
      }
    }
    return true;
  });
  var getSubscriptionColor = function getSubscriptionColor(tier, role) {
    if (role === 'employee') {
      return 'from-orange-500 to-amber-500';
    }
    switch (tier) {
      case 'pro':
        return 'from-purple-500 to-pink-500';
      case 'standard':
        return 'from-blue-500 to-indigo-500';
      case 'lite':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  var getSubscriptionLabel = function getSubscriptionLabel(tier, role) {
    if (role === 'employee') {
      return 'XODIM';
    }
    switch (tier) {
      case 'pro':
        return 'PRO';
      case 'standard':
        return 'STANDARD';
      case 'lite':
        return 'LITE';
      default:
        return 'FREE';
    }
  };
  var getUserIcon = function getUserIcon(role) {
    if (role === 'employee') {
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      }));
    }
    return /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-6 h-6 text-white",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }));
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
    onClick: onClose
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "\n        fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out flex flex-col\n        ".concat(isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0', "\n        ").concat(isCollapsed ? 'w-16' : 'w-[267px]', "\n        ").concat(settings.theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700' : 'bg-white/95 backdrop-blur-xl border-r border-gray-200/50', "\n        shadow-2xl\n      ")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200/20"
  }, !isCollapsed && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 rounded-xl bg-gradient-to-br ".concat(getSubscriptionColor(user === null || user === void 0 ? void 0 : user.subscriptionTier, user === null || user === void 0 ? void 0 : user.role), " flex items-center justify-center shadow-lg")
  }, getUserIcon(user === null || user === void 0 ? void 0 : user.role)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-xl font-bold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, t('app.title', 'Qarzdaftar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, "Qarz boshqaruvi"))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleCollapseToggle,
    className: "hidden md:flex w-8 h-8 items-center justify-center rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 transition-transform ".concat(isCollapsed ? 'rotate-180' : ''),
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11 19l-7-7 7-7m8 14l-7-7 7-7"
  }))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose,
    className: "md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), !isCollapsed && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 p-4 border-b border-gray-200/20"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 rounded-full bg-gradient-to-br ".concat(getSubscriptionColor(user === null || user === void 0 ? void 0 : user.subscriptionTier, user === null || user === void 0 ? void 0 : user.role), " flex items-center justify-center text-white font-semibold text-lg shadow-lg")
  }, (user === null || user === void 0 ? void 0 : user.role) === 'employee' ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  })) : (user === null || user === void 0 || (_user$username = user.username) === null || _user$username === void 0 ? void 0 : _user$username.charAt(0).toUpperCase()) || 'U'), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-semibold truncate ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, (user === null || user === void 0 ? void 0 : user.username) || 'Foydalanuvchi'), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ".concat(getSubscriptionColor(user === null || user === void 0 ? void 0 : user.subscriptionTier, user === null || user === void 0 ? void 0 : user.role), " text-white")
  }, getSubscriptionLabel(user === null || user === void 0 ? void 0 : user.subscriptionTier, user === null || user === void 0 ? void 0 : user.role)))))), !isCollapsed && branches.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 p-4 border-b border-gray-200/20"
  }, (user === null || user === void 0 ? void 0 : user.role) === 'employee' ?
  /*#__PURE__*/
  // Employee: Show assigned branch info only
  _react["default"].createElement("div", {
    className: "p-3 rounded-lg ".concat(settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 rounded-lg flex items-center justify-center text-white",
    style: {
      backgroundColor: ((_branches$find = branches.find(function (b) {
        return b._id === user.assignedBranchId;
      })) === null || _branches$find === void 0 ? void 0 : _branches$find.color) || '#3B82F6'
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium truncate ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-900')
  }, ((_user$employeeInfo2 = user.employeeInfo) === null || _user$employeeInfo2 === void 0 ? void 0 : _user$employeeInfo2.assignedBranchName) || 'Tayinlangan filial'), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
  }, ((_user$employeeInfo3 = user.employeeInfo) === null || _user$employeeInfo3 === void 0 ? void 0 : _user$employeeInfo3.position) || 'Xodim')))) :
  /*#__PURE__*/
  // Regular user: Show branch selector
  _react["default"].createElement(_BranchSelector.BranchSelector, {
    onCreateBranch: function onCreateBranch() {
      return setShowCreateBranchModal(true);
    }
  })), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "flex-1 p-4 space-y-2 overflow-y-auto min-h-0"
  }, menuItems.map(function (item) {
    var isActive = activeSection === item.id;
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: item.id,
      onClick: function onClick() {
        switchSection(item.route);
        if (window.innerWidth < 768) onClose();
      },
      className: "\n                  w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative\n                  ".concat(isActive ? settings.theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25' : settings.theme === 'dark' ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', "\n                  ").concat(isCollapsed ? 'justify-center' : '', "\n                "),
      title: isCollapsed ? item.label : ''
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-shrink-0 ".concat(isActive ? 'scale-110' : 'group-hover:scale-105', " transition-transform")
    }, item.icon), !isCollapsed && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-medium truncate"
    }, item.label), item.badge && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ml-auto px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
    }, item.badge)), isActive && /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-l-full ".concat(settings.theme === 'dark' ? 'bg-cyan-400' : 'bg-white')
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 border-t border-gray-200/20"
  }, !isCollapsed && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: logout,
    className: "w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ".concat(settings.theme === 'dark' ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, "Chiqish")), isCollapsed && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: logout,
    className: "w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 ".concat(settings.theme === 'dark' ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'),
    title: "Chiqish"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  }))))), /*#__PURE__*/_react["default"].createElement(_BranchCreateModal.BranchCreateModal, {
    isOpen: showCreateBranchModal,
    onClose: function onClose() {
      return setShowCreateBranchModal(false);
    },
    onSuccess: function onSuccess() {
      setShowCreateBranchModal(false);
    }
  }));
}