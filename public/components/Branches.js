"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarBranches = QarzdaftarBranches;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _BranchContext = require("../utils/BranchContext");
var _AuthContext = require("../utils/AuthContext");
var _translationUtils = require("../utils/translationUtils");
var _LanguageContext = require("../utils/LanguageContext");
var _ToastContext = require("../utils/ToastContext");
var _BranchCreateModal = require("./branches/BranchCreateModal");
var _BranchSettingsModal = require("./branches/BranchSettingsModal");
var _BranchDeleteModal = require("./branches/BranchDeleteModal");
var _SkeletonLoader = require("./SkeletonLoader");
var _subscriptionUtils = require("../utils/subscriptionUtils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarBranches() {
  var _user$subscriptionTie;
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings,
    user = _useAuth.user;
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches,
    activeBranch = _useBranches.activeBranch,
    loading = _useBranches.loading,
    canCreateBranch = _useBranches.canCreateBranch,
    branchLimit = _useBranches.branchLimit,
    switchBranch = _useBranches.switchBranch;
  var _useToast = (0, _ToastContext.useToast)(),
    showSuccess = _useToast.showSuccess;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showCreateModal = _useState2[0],
    setShowCreateModal = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    editingBranch = _useState4[0],
    setEditingBranch = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    deletingBranch = _useState6[0],
    setDeletingBranch = _useState6[1];

  // Get branch icon
  var getBranchIcon = function getBranchIcon(iconName) {
    var icons = {
      building: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      })),
      store: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      })),
      office: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2H8V6"
      })),
      home: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      })),
      factory: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      })),
      warehouse: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4"
      }))
    };
    return icons[iconName] || icons.building;
  };

  // Handle branch actions
  var handleBranchClick = function handleBranchClick(branch) {
    if (branch._id !== (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id)) {
      switchBranch(branch);
    }
  };
  var handleEditBranch = function handleEditBranch(branch) {
    if ((user === null || user === void 0 ? void 0 : user.role) === 'employee') {
      showSuccess('Xodimlar filial sozlamalarini o\'zgartira olmaydi');
      return;
    }
    setEditingBranch(branch);
  };
  var handleDeleteBranch = function handleDeleteBranch(branch) {
    if ((user === null || user === void 0 ? void 0 : user.role) === 'employee') {
      showSuccess('Xodimlar filialni o\'chira olmaydi');
      return;
    }
    setDeletingBranch(branch);
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-6xl mx-auto p-4 md:p-6"
    }, /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "branches"
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-6xl mx-auto p-4 md:p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
  }, "Filiallar boshqaruvi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base font-medium"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "hidden sm:inline"
  }, "Filiallaringizni yarating va boshqaring"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "sm:hidden"
  }, "Filiallar boshqaruvi")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 rounded-lg bg-gradient-to-br ".concat((user === null || user === void 0 ? void 0 : user.subscriptionTier) === 'pro' ? 'from-purple-500 to-pink-500' : (user === null || user === void 0 ? void 0 : user.subscriptionTier) === 'standard' ? 'from-blue-500 to-indigo-500' : (user === null || user === void 0 ? void 0 : user.subscriptionTier) === 'lite' ? 'from-green-500 to-emerald-500' : 'from-gray-500 to-gray-600', " flex items-center justify-center text-white font-bold")
  }, (user === null || user === void 0 || (_user$subscriptionTie = user.subscriptionTier) === null || _user$subscriptionTie === void 0 ? void 0 : _user$subscriptionTie.charAt(0).toUpperCase()) || 'F'), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, (0, _subscriptionUtils.getTierDisplayName)(user === null || user === void 0 ? void 0 : user.subscriptionTier), " tarif"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, branches.length, "/", branchLimit, " filial ishlatilmoqda"))), !canCreateBranch && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return navigate('/pricing');
    },
    className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
  }, "Tarifni yangilash"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, branches.map(function (branch) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: branch._id,
      className: "relative p-4 rounded-2xl border-2 transition-all duration-300 ".concat(branch.isDisabled ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/30' : (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id) === branch._id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02]' : settings.theme === 'dark' ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600 cursor-pointer hover:shadow-xl hover:scale-[1.02]' : 'border-gray-200 bg-white/80 hover:border-gray-300 cursor-pointer hover:shadow-xl hover:scale-[1.02]'),
      onClick: function onClick() {
        return !branch.isDisabled && handleBranchClick(branch);
      }
    }, (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id) === branch._id && !branch.isDisabled && /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold"
    }, "Faol"), branch.isDisabled && /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
    }, "Muzlatilgan"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-4 mb-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
      style: {
        backgroundColor: branch.color || '#3B82F6'
      }
    }, getBranchIcon(branch.icon)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-bold text-lg truncate ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
    }, branch.name), branch.description && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm truncate ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, branch.description))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-2 mb-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, "Valyuta"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
    }, branch.currency)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, "Yaratilgan"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
    }, new Date(branch.createdAt).toLocaleDateString('uz-UZ')))), branch.isDisabled ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-center"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        navigate('/pricing');
      },
      className: "px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/40 transition-colors"
    }, "Tarifni yangilang")) : (user === null || user === void 0 ? void 0 : user.role) !== 'employee' ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-end space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        handleEditBranch(branch);
      },
      className: "p-2 rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'),
      title: "Tahrirlash"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    }))), branches.length > 1 && /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        handleDeleteBranch(branch);
      },
      className: "p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors",
      title: "O'chirish"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
    })))) : /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-end"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm px-3 py-1 rounded-full ".concat((user === null || user === void 0 ? void 0 : user.assignedBranchId) === branch._id ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400')
    }, (user === null || user === void 0 ? void 0 : user.assignedBranchId) === branch._id ? 'Tayinlangan filial' : 'Ko\'rish uchun')));
  }), canCreateBranch && (user === null || user === void 0 ? void 0 : user.role) !== 'employee' && /*#__PURE__*/_react["default"].createElement("div", {
    onClick: function onClick() {
      return setShowCreateModal(true);
    },
    className: "p-4 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] ".concat(settings.theme === 'dark' ? 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50' : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-100/50')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center justify-center h-full min-h-[160px] space-y-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 rounded-xl flex items-center justify-center ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'),
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold mb-1 ".concat(settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700')
  }, "Yangi filial yaratish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-500')
  }, "Yangi filial qo'shish uchun bosing"))))), branches.length === 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ".concat(settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'),
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-semibold mb-2 ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Hali filiallar yo'q"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400 mb-6"
  }, "Birinchi filialingizni yarating va qarzlarni boshqarishni boshlang"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowCreateModal(true);
    },
    className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
  }, "Birinchi filial yaratish")), /*#__PURE__*/_react["default"].createElement(_BranchCreateModal.BranchCreateModal, {
    isOpen: showCreateModal,
    onClose: function onClose() {
      return setShowCreateModal(false);
    },
    onSuccess: function onSuccess() {
      return setShowCreateModal(false);
    }
  }), /*#__PURE__*/_react["default"].createElement(_BranchSettingsModal.BranchSettingsModal, {
    isOpen: !!editingBranch,
    branch: editingBranch,
    onClose: function onClose() {
      return setEditingBranch(null);
    },
    onSuccess: function onSuccess() {
      return setEditingBranch(null);
    },
    onDelete: function onDelete(branch) {
      setEditingBranch(null);
      setDeletingBranch(branch);
    }
  }), /*#__PURE__*/_react["default"].createElement(_BranchDeleteModal.BranchDeleteModal, {
    isOpen: !!deletingBranch,
    branch: deletingBranch,
    onClose: function onClose() {
      return setDeletingBranch(null);
    },
    onSuccess: function onSuccess() {
      return setDeletingBranch(null);
    }
  })));
}