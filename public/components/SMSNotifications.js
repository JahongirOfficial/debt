"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarSMSNotifications = QarzdaftarSMSNotifications;
var _react = _interopRequireWildcard(require("react"));
var _LanguageContext = require("../utils/LanguageContext");
var _translationUtils = require("../utils/translationUtils");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Modern animations CSS
var style = "\n  @keyframes float {\n    0%, 100% { transform: translateY(0px); }\n    50% { transform: translateY(-10px); }\n  }\n  .animate-float {\n    animation: float 3s ease-in-out infinite;\n  }\n  \n  @keyframes pulse-glow {\n    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }\n    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }\n  }\n  .animate-pulse-glow {\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n  \n  @keyframes slideInUp {\n    from { opacity: 0; transform: translateY(30px); }\n    to { opacity: 1; transform: translateY(0); }\n  }\n  .animate-slide-in-up {\n    animation: slideInUp 0.6s ease-out forwards;\n  }\n";
function QarzdaftarSMSNotifications() {
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    settings = _useAuth.settings;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)('settings'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];

  // Check if user has access to SMS features
  var hasAccess = (user === null || user === void 0 ? void 0 : user.subscriptionTier) && user.subscriptionTier !== 'free';

  // Mock data for demonstration
  var smsStats = {
    sent: 45,
    remaining: (user === null || user === void 0 ? void 0 : user.subscriptionTier) === 'pro' ? 'Cheksiz' : 15,
    thisMonth: 45,
    successRate: 98.5
  };
  var recentNotifications = [{
    id: 1,
    recipient: '+998 90 123 45 67',
    message: 'Qarzdorlik eslatmasi: 500,000 UZS',
    status: 'delivered',
    timestamp: '2024-01-15 14:30',
    type: 'reminder'
  }, {
    id: 2,
    recipient: '+998 91 234 56 78',
    message: 'To\'lov muddati yaqinlashmoqda',
    status: 'pending',
    timestamp: '2024-01-15 13:15',
    type: 'warning'
  }, {
    id: 3,
    recipient: '+998 93 345 67 89',
    message: 'To\'lov qabul qilindi. Rahmat!',
    status: 'delivered',
    timestamp: '2024-01-15 12:00',
    type: 'confirmation'
  }];
  var getStatusIcon = function getStatusIcon(status) {
    switch (status) {
      case 'delivered':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-2 h-2 bg-green-500 rounded-full"
        });
      case 'pending':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
        });
      case 'failed':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-2 h-2 bg-red-500 rounded-full"
        });
      default:
        return null;
    }
  };
  var getTypeIcon = function getTypeIcon(type) {
    switch (type) {
      case 'reminder':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          className: "w-4 h-4 text-blue-600 dark:text-blue-400",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        })));
      case 'warning':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center"
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          className: "w-4 h-4 text-yellow-600 dark:text-yellow-400",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        })));
      case 'confirmation':
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          className: "w-4 h-4 text-green-600 dark:text-green-400",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M5 13l4 4L19 7"
        })));
      default:
        return null;
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto w-full space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("style", null, style), /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-slide-in-up"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-3xl md:text-4xl font-bold text-gray-800 mb-2 dark:text-white"
  }, t('smsNotifications.title', 'SMS Eslatmalar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-300 text-lg"
  }, t('smsNotifications.subtitle', 'SMS xabarlarini boshqaring va kuzatib boring'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-up",
    style: {
      animationDelay: '0.1s'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-2xl font-bold text-gray-800 dark:text-white"
  }, smsStats.sent)), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('smsNotifications.stats.sent', 'Yuborilgan')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('smsNotifications.stats.thisMonth', 'Shu oy'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-2xl font-bold text-gray-800 dark:text-white"
  }, smsStats.remaining)), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('smsNotifications.stats.remaining', 'Qolgan')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('smsNotifications.stats.thisMonth', 'Shu oy'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-2xl font-bold text-gray-800 dark:text-white"
  }, smsStats.successRate, "%")), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('smsNotifications.stats.successRate', 'Muvaffaqiyat')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('smsNotifications.stats.deliveryRate', 'Yetkazish foizi'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-orange-800/50 to-orange-900/50 border-orange-700/50' : 'bg-gradient-to-br from-orange-50/80 to-orange-100/80 border-orange-200/50', " backdrop-blur-lg border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer animate-pulse-glow")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  })))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold text-orange-600 dark:text-orange-400 mb-1"
  }, t('smsNotifications.quickAction.title', 'Yangi SMS')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-orange-500 dark:text-orange-300"
  }, t('smsNotifications.quickAction.subtitle', 'Tezkor yuborish')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-slide-in-up",
    style: {
      animationDelay: '0.2s'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-2")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-1"
  }, [{
    id: 'settings',
    label: t('smsNotifications.tabs.settings', 'Sozlamalar'),
    icon: 'cog'
  }, {
    id: 'history',
    label: t('smsNotifications.tabs.history', 'Tarix'),
    icon: 'clock'
  }, {
    id: 'templates',
    label: t('smsNotifications.tabs.templates', 'Shablonlar'),
    icon: 'template'
  }].map(function (tab) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: tab.id,
      onClick: function onClick() {
        return setActiveTab(tab.id);
      },
      className: "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ".concat(activeTab === tab.id ? settings.theme === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-500 text-white shadow-lg' : settings.theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50')
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, tab.icon === 'cog' && /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }), tab.icon === 'clock' && /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }), tab.icon === 'template' && /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })), tab.label);
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-slide-in-up",
    style: {
      animationDelay: '0.3s'
    }
  }, activeTab === 'history' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6")
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white mb-6"
  }, t('smsNotifications.history.title', 'So\'nggi SMS xabarlar')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, recentNotifications.map(function (notification) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: notification.id,
      className: "".concat(settings.theme === 'dark' ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50', " rounded-xl p-4 transition-all duration-300 hover:shadow-lg")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-start gap-4"
    }, getTypeIcon(notification.type), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-2 mb-2"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-medium text-gray-800 dark:text-white"
    }, notification.recipient), getStatusIcon(notification.status), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-xs px-2 py-1 rounded-full ".concat(notification.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400')
    }, notification.status === 'delivered' ? 'Yetkazildi' : notification.status === 'pending' ? 'Kutilmoqda' : 'Xatolik')), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-gray-600 dark:text-gray-300 mb-2"
    }, notification.message), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, notification.timestamp))));
  }))), activeTab === 'settings' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6")
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white mb-6"
  }, t('smsNotifications.settings.title', 'SMS sozlamalari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-12 h-12 text-blue-600 dark:text-blue-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
  }))), /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-2xl font-bold text-gray-800 mb-4 dark:text-white"
  }, t('smsNotifications.comingSoon.title', 'Tez orada mavjud bo\'ladi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 mb-6 dark:text-gray-300 max-w-md mx-auto"
  }, t('smsNotifications.comingSoon.description', 'SMS xabarlar orqali qarzlaringizni kuzatib boring. Bu funksiya yaqin orada mavjud bo\'ladi.')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "inline-flex items-center text-blue-600 font-medium dark:text-blue-400"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "flex h-3 w-3 relative mr-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "relative inline-flex rounded-full h-3 w-3 bg-blue-500"
  })), t('smsNotifications.comingSoon.status', 'Ishlab chiqish jarayonida')))), activeTab === 'templates' && /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-gray-200/50', " backdrop-blur-lg border rounded-2xl p-6")
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white mb-6"
  }, t('smsNotifications.templates.title', 'SMS shablonlari')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, [{
    title: 'Qarzdorlik eslatmasi',
    preview: 'Hurmatli {ism}, sizning {summa} UZS qarzdorligingiz {sana} gacha to\'lanishi kerak.',
    type: 'reminder'
  }, {
    title: 'To\'lov muddati',
    preview: 'Diqqat! {ism}, {summa} UZS qarzdorligingiz muddati {sana} da tugaydi.',
    type: 'warning'
  }, {
    title: 'To\'lov tasdiqi',
    preview: 'Rahmat! {ism}, {summa} UZS to\'lovingiz qabul qilindi. Sana: {sana}',
    type: 'confirmation'
  }, {
    title: 'Yangi qarz',
    preview: 'Yangi qarz: {ism} - {summa} UZS. Muddat: {sana}. Tafsilotlar uchun bog\'laning.',
    type: 'new'
  }].map(function (template, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "".concat(settings.theme === 'dark' ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50', " rounded-xl p-4 transition-all duration-300 hover:shadow-lg")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-3 mb-3"
    }, getTypeIcon(template.type), /*#__PURE__*/_react["default"].createElement("h4", {
      className: "font-semibold text-gray-800 dark:text-white"
    }, template.title)), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800/50 rounded-lg p-3"
    }, template.preview));
  })))));
}