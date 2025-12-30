"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarEmployees = QarzdaftarEmployees;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _EmployeeContext = require("../utils/EmployeeContext");
var _BranchContext = require("../utils/BranchContext");
var _AuthContext = require("../utils/AuthContext");
var _translationUtils = require("../utils/translationUtils");
var _LanguageContext = require("../utils/LanguageContext");
var _ToastContext = require("../utils/ToastContext");
var _subscriptionUtils = require("../utils/subscriptionUtils");
var _EmployeeCreateModal = require("./employees/EmployeeCreateModal");
var _EmployeeEditModal = require("./employees/EmployeeEditModal");
var _EmployeeDeleteModal = require("./employees/EmployeeDeleteModal");
var _SkeletonLoader = require("./SkeletonLoader");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarEmployees() {
  var _user$subscriptionTie;
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings,
    user = _useAuth.user;
  var _useEmployees = (0, _EmployeeContext.useEmployees)(),
    employees = _useEmployees.employees,
    loading = _useEmployees.loading,
    canCreateEmployee = _useEmployees.canCreateEmployee,
    employeeLimit = _useEmployees.employeeLimit;
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches;
  var _useToast = (0, _ToastContext.useToast)(),
    showSuccess = _useToast.showSuccess;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showCreateModal = _useState2[0],
    setShowCreateModal = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showEditModal = _useState4[0],
    setShowEditModal = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showDeleteModal = _useState6[0],
    setShowDeleteModal = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedEmployee = _useState8[0],
    setSelectedEmployee = _useState8[1];
  var handleEditEmployee = function handleEditEmployee(employee) {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };
  var handleDeleteEmployee = function handleDeleteEmployee(employee) {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };
  var handleEmployeeCreated = function handleEmployeeCreated() {
    setShowCreateModal(false);
    showSuccess('Xodim muvaffaqiyatli qo\'shildi');
  };
  var handleEmployeeUpdated = function handleEmployeeUpdated() {
    setShowEditModal(false);
    setSelectedEmployee(null);
    showSuccess('Xodim ma\'lumotlari muvaffaqiyatli yangilandi');
  };
  var handleEmployeeDeleted = function handleEmployeeDeleted() {
    setShowDeleteModal(false);
    setSelectedEmployee(null);
    showSuccess('Xodim o\'chirildi');
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-7xl mx-auto space-y-6"
    }, /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "pageHeader"
    }), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "cardGrid"
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-3xl p-6 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 border border-slate-700/50' : 'bg-gradient-to-br from-white via-blue-50 to-white border border-gray-200', " shadow-2xl")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col md:flex-row md:items-center md:justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 md:mb-0"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, t('employees.title', 'Xodimlar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-lg ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, t('employees.subtitle', 'Xodimlarni boshqaring va ruxsatlarni sozlang'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 py-2 rounded-xl ".concat(settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100')
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
  }, employees.length, "/", employeeLimit, " xodim")), canCreateEmployee ? /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowCreateModal(true);
    },
    className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  })), t('employees.addEmployee', 'Xodim qo\'shish')) : /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return navigate('/pricing');
    },
    className: "bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  })), t('employees.upgrade', 'Tarifni oshiring')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 pt-6 border-t border-gray-200/20"
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
  }, employees.length, "/", employeeLimit, " xodim ishlatilmoqda"))), !canCreateEmployee && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return navigate('/pricing');
    },
    className: "text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
  }, "Ko'proq xodim qo'shish \u2192")))), employees.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-2xl p-12 text-center ".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200', " shadow-xl")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-12 h-12 text-blue-600",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-semibold mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, t('employees.noEmployees', 'Hali xodimlar yo\'q')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 mb-6 ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
  }, t('employees.noEmployeesDesc', 'Birinchi xodimingizni qo\'shing va ruxsatlarni sozlang')), canCreateEmployee && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowCreateModal(true);
    },
    className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  })), t('employees.addFirstEmployee', 'Birinchi xodimni qo\'shish'))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, employees.map(function (employee) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: employee._id,
      className: "rounded-2xl p-6 transition-all duration-300 hover:scale-105 ".concat(settings.theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70' : 'bg-white border border-gray-200 hover:shadow-xl', " shadow-lg")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
    }, employee.name.charAt(0).toUpperCase()), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-semibold ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
    }, employee.name), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
    }, employee.position))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleEditEmployee(employee);
      },
      className: "p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
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
    }))), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleDeleteEmployee(employee);
      },
      className: "p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    }))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3 mb-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-gray-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
    }, employee.phone)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-gray-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
    }, employee.branchName)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-gray-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
    }, new Date(employee.hireDate).toLocaleDateString('uz-UZ')))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mb-4"
    }, /*#__PURE__*/_react["default"].createElement("h4", {
      className: "text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-700')
    }, "Ruxsatlar:"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-wrap gap-1"
    }, Object.entries(employee.permissions).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (!value) return null;
      var permissionLabels = {
        canAddDebt: 'Qarz qo\'shish',
        canEditDebt: 'Tahrirlash',
        canDeleteDebt: 'O\'chirish',
        canViewDebts: 'Ko\'rish',
        canManagePayments: 'To\'lovlar',
        canViewReports: 'Hisobotlar',
        canManageCreditors: 'Kreditorlar'
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: key,
        className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      }, permissionLabels[key]);
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "p-3 rounded-lg ".concat(settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50')
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs font-medium ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600')
    }, "Login: ", employee.employeeUsername), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-xs ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500')
    }, "Parol: ", employee.generatedPassword)), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        navigator.clipboard.writeText("Login: ".concat(employee.employeeUsername, "\nParol: ").concat(employee.generatedPassword));
        showSuccess('Login ma\'lumotlari nusxalandi');
      },
      className: "p-1 text-gray-400 hover:text-gray-600 transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    }))))));
  })), /*#__PURE__*/_react["default"].createElement(_EmployeeCreateModal.EmployeeCreateModal, {
    isOpen: showCreateModal,
    onClose: function onClose() {
      return setShowCreateModal(false);
    },
    onEmployeeCreated: handleEmployeeCreated,
    branches: branches
  }), /*#__PURE__*/_react["default"].createElement(_EmployeeEditModal.EmployeeEditModal, {
    isOpen: showEditModal,
    onClose: function onClose() {
      setShowEditModal(false);
      setSelectedEmployee(null);
    },
    onEmployeeUpdated: handleEmployeeUpdated,
    employee: selectedEmployee,
    branches: branches
  }), /*#__PURE__*/_react["default"].createElement(_EmployeeDeleteModal.EmployeeDeleteModal, {
    isOpen: showDeleteModal,
    onClose: function onClose() {
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    },
    onEmployeeDeleted: handleEmployeeDeleted,
    employee: selectedEmployee
  }));
}