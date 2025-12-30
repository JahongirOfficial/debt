"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchSelector = BranchSelector;
var _react = _interopRequireWildcard(require("react"));
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
var _translationUtils = require("../../utils/translationUtils");
var _LanguageContext = require("../../utils/LanguageContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function BranchSelector(_ref) {
  var onCreateBranch = _ref.onCreateBranch;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings,
    user = _useAuth.user;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches,
    activeBranch = _useBranches.activeBranch,
    switchBranch = _useBranches.switchBranch,
    canCreateBranch = _useBranches.canCreateBranch,
    branchLimit = _useBranches.branchLimit,
    loading = _useBranches.loading;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    searchTerm = _useState4[0],
    setSearchTerm = _useState4[1];
  var dropdownRef = (0, _react.useRef)(null);
  var searchInputRef = (0, _react.useRef)(null);

  // Keyboard shortcuts handler
  var handleKeyboardShortcuts = (0, _react.useCallback)(function (event) {
    // Only handle shortcuts when not in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    // Ctrl/Cmd + 1-5 for quick branch switching
    if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '5') {
      event.preventDefault();
      var branchIndex = parseInt(event.key) - 1;
      if (branches[branchIndex] && branches[branchIndex]._id !== (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id)) {
        handleBranchSelect(branches[branchIndex]);
      }
    }

    // Ctrl/Cmd + B to open branch selector
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      setIsOpen(true);
      // Focus search input after a brief delay
      setTimeout(function () {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }

    // Escape to close dropdown
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      setSearchTerm('');
    }
  }, [branches, activeBranch, isOpen]);

  // Add keyboard event listeners
  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return function () {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [handleKeyboardShortcuts]);

  // Close dropdown when clicking outside
  (0, _react.useEffect)(function () {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter branches based on search term
  var filteredBranches = branches.filter(function (branch) {
    return branch.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle branch selection
  var handleBranchSelect = function handleBranchSelect(branch) {
    switchBranch(branch);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle create branch
  var handleCreateBranch = function handleCreateBranch() {
    setIsOpen(false);
    if (onCreateBranch) {
      onCreateBranch();
    }
  };

  // Get branch icon
  var getBranchIcon = function getBranchIcon(iconName) {
    var icons = {
      building: /*#__PURE__*/_react["default"].createElement("svg", {
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
      store: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-5 h-5",
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
        className: "w-5 h-5",
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
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      }))
    };
    return icons[iconName] || icons.building;
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
    }));
  }

  // Don't show selector if only one branch exists
  if (branches.length <= 1) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3"
    }, activeBranch && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg",
      style: {
        backgroundColor: activeBranch.color || '#3B82F6'
      }
    }, getBranchIcon(activeBranch.icon)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-semibold text-sm ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
    }, activeBranch.name), activeBranch.description && /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-xs ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, activeBranch.description))));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative",
    ref: dropdownRef
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setIsOpen(!isOpen);
    },
    className: "flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg ".concat(settings.theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50' : 'bg-white/80 hover:bg-white border border-gray-200/50', " backdrop-blur-sm")
  }, activeBranch && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg",
    style: {
      backgroundColor: activeBranch.color || '#3B82F6'
    }
  }, getBranchIcon(activeBranch.icon)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-start"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-semibold text-sm ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, activeBranch.name), activeBranch.description && /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, activeBranch.description))), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4 transition-transform duration-200 ".concat(isOpen ? 'rotate-180' : '', " ").concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'),
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 9l-7 7-7-7"
  }))), isOpen && /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-full left-0 mt-2 w-80 rounded-xl shadow-2xl border z-50 ".concat(settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200', " backdrop-blur-sm")
  }, branches.length > 2 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  })), /*#__PURE__*/_react["default"].createElement("input", {
    ref: searchInputRef,
    type: "text",
    placeholder: "Filial qidirish... (Ctrl+B)",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    },
    className: "w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ".concat(settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500')
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-h-64 overflow-y-auto"
  }, filteredBranches.map(function (branch, index) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: branch._id,
      onClick: function onClick() {
        return !branch.isDisabled && handleBranchSelect(branch);
      },
      disabled: branch.isDisabled,
      className: "w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-150 ".concat(branch.isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id) === branch._id ? settings.theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600' : settings.theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700')
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0",
      style: {
        backgroundColor: branch.color || '#3B82F6'
      }
    }, getBranchIcon(branch.icon)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-medium text-sm truncate"
    }, branch.name), branch.isDisabled && /*#__PURE__*/_react["default"].createElement("span", {
      className: "px-1 py-0.5 text-xs font-semibold rounded bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
    }, "Muzlatilgan"), index < 5 && !searchTerm && !branch.isDisabled && /*#__PURE__*/_react["default"].createElement("kbd", {
      className: "px-1 py-0.5 text-xs font-semibold rounded ".concat(settings.theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600')
    }, "Ctrl+", index + 1)), branch.description && /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-xs truncate ".concat((activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id) === branch._id ? settings.theme === 'dark' ? 'text-blue-300' : 'text-blue-500' : settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, branch.description)), (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id) === branch._id && /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 text-blue-500",
      fill: "currentColor",
      viewBox: "0 0 20 20"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      fillRule: "evenodd",
      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      clipRule: "evenodd"
    })));
  }), filteredBranches.length === 0 && searchTerm && /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 py-6 text-center ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-8 h-8 mx-auto mb-2 opacity-50",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm"
  }, "Filial topilmadi"))), canCreateBranch && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 border-t border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleCreateBranch,
    className: "w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-150 ".concat(settings.theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white')
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
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, "Yangi filial yaratish"))), !canCreateBranch && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 border-t border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-center ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, branches.length, "/", branchLimit, " filial ishlatilmoqda", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-blue-500 hover:text-blue-600 cursor-pointer"
  }, "Ko'proq filial uchun tarifni yangilang")))));
}