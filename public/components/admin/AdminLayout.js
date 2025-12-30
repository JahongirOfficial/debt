"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminLayout = AdminLayout;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../../utils/AuthContext");
var _LanguageContext = require("../../utils/LanguageContext");
var _translationUtils = require("../../utils/translationUtils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function AdminLayout() {
  var _user$username, _user$username2;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    darkMode = _useState4[0],
    setDarkMode = _useState4[1];
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    logout = _useAuth.logout;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var t = (0, _translationUtils.useTranslation)(language);
  var navigate = (0, _reactRouterDom.useNavigate)();
  var location = (0, _reactRouterDom.useLocation)();

  // Check if user is authenticated and has admin role
  (0, _react.useEffect)(function () {
    console.log('🔍 AdminLayout - Checking user:', user);
    console.log('🔍 AdminLayout - User role:', user === null || user === void 0 ? void 0 : user.role);
    if (!user) {
      console.log('❌ No user - redirecting to login');
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      console.log('❌ User is not admin - redirecting to dashboard');
      navigate('/dashboard');
      return;
    }
    console.log('✅ User is admin - allowing access to admin panel');
  }, [user, navigate]);
  var handleLogout = function handleLogout() {
    logout();
    navigate('/login');
  };
  var toggleDarkMode = function toggleDarkMode() {
    setDarkMode(!darkMode);
  };

  // Show loading while checking authentication
  if (!user) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "relative"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto",
      style: {
        animationDirection: 'reverse',
        animationDuration: '1.5s'
      }
    })), /*#__PURE__*/_react["default"].createElement("p", {
      className: "mt-6 text-gray-700 dark:text-gray-300 font-medium"
    }, "Yuklanmoqda...")));
  }

  // Show access denied if user is not admin
  if (user.role !== 'admin') {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-8 h-8 text-red-600 dark:text-red-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    }))), /*#__PURE__*/_react["default"].createElement("h2", {
      className: "text-2xl font-bold text-gray-900 dark:text-white mb-4"
    }, "Kirish taqiqlangan"), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-gray-600 dark:text-gray-400 mb-6"
    }, "Sizda admin paneliga kirish huquqi yo'q"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return navigate('/dashboard');
      },
      className: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
    }, "Dashboardga qaytish")));
  }
  var navigation = [{
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    gradient: 'from-blue-500 to-blue-600'
  }, {
    name: 'Biznes Egalari',
    href: '/admin/business-owners',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    gradient: 'from-indigo-500 to-purple-600'
  }, {
    name: 'Xodimlar',
    href: '/admin/employees',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    gradient: 'from-green-500 to-emerald-600'
  }, {
    name: 'SMS Eslatmalar',
    href: '/admin/sms-reminders',
    icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
    gradient: 'from-teal-500 to-cyan-600'
  }, {
    name: 'Foydalanuvchilar',
    href: '/admin/users',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    gradient: 'from-orange-500 to-red-600'
  }, {
    name: 'Tariflar',
    href: '/admin/pricing',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    gradient: 'from-purple-500 to-pink-600'
  }, {
    name: 'Hisobotlar',
    href: '/admin/reports',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    gradient: 'from-yellow-500 to-orange-600'
  }, {
    name: 'Analitika',
    href: '/admin/analytics',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    gradient: 'from-rose-500 to-pink-600'
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex h-screen ".concat(darkMode ? 'dark' : '')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 z-50 md:hidden ".concat(sidebarOpen ? 'block' : 'hidden')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm",
    onClick: function onClick() {
      return setSidebarOpen(false);
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 shadow-2xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-0 right-0 -mr-12 pt-2"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
    onClick: function onClick() {
      return setSidebarOpen(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "Close sidebar"), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-gray-600 dark:text-gray-300",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 flex items-center px-6 mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
  }, "Admin Panel"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "Boshqaruv paneli")))), /*#__PURE__*/_react["default"].createElement("nav", {
    className: "px-4 space-y-2"
  }, navigation.map(function (item) {
    var isActive = location.pathname === item.href;
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      key: item.name,
      to: item.href,
      onClick: function onClick() {
        return setSidebarOpen(false);
      },
      className: "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ".concat(isActive ? "bg-gradient-to-r ".concat(item.gradient, " text-white shadow-lg transform scale-105") : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white')
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "mr-3 flex-shrink-0 h-5 w-5 ".concat(isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'),
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: item.icon
    })), item.name);
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-40"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-7 h-7 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
  }, "Admin Panel"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "Boshqaruv paneli"))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: toggleDarkMode,
    className: "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
  }, darkMode ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-yellow-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-gray-600",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 flex flex-col pt-6 pb-4 overflow-y-auto"
  }, /*#__PURE__*/_react["default"].createElement("nav", {
    className: "px-4 space-y-2"
  }, navigation.map(function (item) {
    var isActive = location.pathname === item.href;
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
      key: item.name,
      to: item.href,
      className: "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ".concat(isActive ? "bg-gradient-to-r ".concat(item.gradient, " text-white shadow-lg transform scale-105") : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white')
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "mr-3 flex-shrink-0 h-5 w-5 ".concat(isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'),
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: item.icon
    })), item.name, isActive && /*#__PURE__*/_react["default"].createElement("div", {
      className: "ml-auto w-2 h-2 bg-white rounded-full"
    }));
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-white font-semibold text-sm"
  }, (user === null || user === void 0 || (_user$username = user.username) === null || _user$username === void 0 ? void 0 : _user$username.charAt(0).toUpperCase()) || 'A')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm font-medium text-gray-900 dark:text-white truncate"
  }, (user === null || user === void 0 ? void 0 : user.username) || 'Admin'), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "Administrator")), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleLogout,
    className: "p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200",
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
  }))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "md:pl-72 flex flex-col flex-1 bg-gray-50 dark:bg-gray-900"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "sticky top-0 z-30 md:hidden bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between px-4 py-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
    onClick: function onClick() {
      return setSidebarOpen(true);
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sr-only"
  }, "Open sidebar"), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: toggleDarkMode,
    className: "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
  }, darkMode ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-yellow-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-gray-600",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-white font-semibold text-sm"
  }, (user === null || user === void 0 || (_user$username2 = user.username) === null || _user$username2 === void 0 ? void 0 : _user$username2.charAt(0).toUpperCase()) || 'A'))))), /*#__PURE__*/_react["default"].createElement("main", {
    className: "flex-1 overflow-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Outlet, null)))));
}