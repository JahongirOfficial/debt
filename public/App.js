"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarApp = QarzdaftarApp;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Dashboard = require("./components/Dashboard");
var _Debts = require("./components/Debts");
var _Branches = require("./components/Branches");
var _Employees = require("./components/Employees");
var _Calculator = require("./components/Calculator");
var _Ratings = require("./components/Ratings");
var _Analytics = require("./components/Analytics");
var _Settings = require("./components/Settings");
var _SMSNotifications = require("./components/SMSNotifications");
var _PricingPlans = _interopRequireDefault(require("./components/PricingPlans.jsx"));
var _Login = require("./components/auth/Login");
var _Register = require("./components/auth/Register");
var _AdminLayout = require("./components/admin/AdminLayout");
var _AdminDashboard = require("./components/admin/AdminDashboard");
var _UserManagement = require("./components/admin/UserManagement");
var _PricingManagement = require("./components/admin/PricingManagement");
var _Reports = require("./components/admin/Reports");
var _Analytics2 = require("./components/admin/Analytics");
var _AdminBusinessOwnersPage = require("./components/admin/AdminBusinessOwnersPage");
var _AdminEmployeesPage = require("./components/admin/AdminEmployeesPage");
var _AdminSMSRemindersPage = require("./components/admin/AdminSMSRemindersPage");
var _ModernSidebar = require("./components/ModernSidebar");
var _PWAInstallPrompt = require("./components/PWAInstallPrompt");
var _translationUtils = require("./utils/translationUtils");
var _LanguageContext = require("./utils/LanguageContext.jsx");
var _AuthContext = require("./utils/AuthContext.jsx");
var _BranchContext = require("./utils/BranchContext.jsx");
var _DebtContext = require("./utils/DebtContext.jsx");
var _EmployeeContext = require("./utils/EmployeeContext.jsx");
var _ToastContext = require("./utils/ToastContext.jsx");
var _SkeletonLoader = require("./components/SkeletonLoader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Add CSS for modern animations
var style = "\n  @keyframes fadeInOut {\n    0% { opacity: 0; transform: translateY(10px); }\n    10% { opacity: 1; transform: translateY(0); }\n    90% { opacity: 1; transform: translateY(0); }\n    100% { opacity: 0; transform: translateY(10px); }\n  }\n  .animate-fade-in-out {\n    animation: fadeInOut 5s ease-in-out forwards;\n  }\n  @keyframes bounceIn {\n    0% { \n      opacity: 0; \n      transform: translateY(20px) scale(0.8); \n    }\n    50% { \n      opacity: 1; \n      transform: translateY(-5px) scale(1.05); \n    }\n    100% { \n      opacity: 1; \n      transform: translateY(0) scale(1); \n    }\n  }\n  .animate-bounce-in {\n    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;\n  }\n  @keyframes pulse-glow {\n    0%, 100% { \n      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); \n    }\n    50% { \n      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); \n    }\n  }\n  .animate-pulse-glow {\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n";
function QarzdaftarApp() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var location = (0, _reactRouterDom.useLocation)();
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user,
    loading = _useAuth.loading,
    settings = _useAuth.settings; // Get settings from AuthContext
  var t = (0, _translationUtils.useTranslation)(language);

  // Set active section based on current route
  var _useState = (0, _react.useState)(function () {
      switch (location.pathname) {
        case '/dashboard':
          return 'dashboard';
        case '/debts':
          return 'debts';
        case '/branches':
          return 'branches';
        case '/employees':
          return 'employees';
        case '/calculator':
          return 'calculator';
        case '/ratings':
          return 'ratings';
        case '/analytics':
          return 'analytics';
        case '/sms-notifications':
          return 'sms-notifications';
        case '/pricing':
          return 'pricing';
        case '/settings':
          return 'settings';
        default:
          return 'dashboard';
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    activeSection = _useState2[0],
    setActiveSection = _useState2[1];

  // State for mobile sidebar
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isMobileSidebarOpen = _useState4[0],
    setIsMobileSidebarOpen = _useState4[1];

  // State for sidebar collapse
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSidebarCollapsed = _useState6[0],
    setIsSidebarCollapsed = _useState6[1];

  // State for modern suggestion notification
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showSuggestionNotification = _useState8[0],
    setShowSuggestionNotification = _useState8[1];

  // State for Telegram connection modal
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showTelegramModal = _useState0[0],
    setShowTelegramModal = _useState0[1];

  // Update active section when route changes
  (0, _react.useEffect)(function () {
    switch (location.pathname) {
      case '/dashboard':
        setActiveSection('dashboard');
        break;
      case '/debts':
        setActiveSection('debts');
        break;
      case '/branches':
        setActiveSection('branches');
        break;
      case '/employees':
        setActiveSection('employees');
        break;
      case '/calculator':
        setActiveSection('calculator');
        break;
      case '/ratings':
        setActiveSection('ratings');
        break;
      case '/analytics':
        setActiveSection('analytics');
        break;
      case '/sms-notifications':
        setActiveSection('sms-notifications');
        break;
      case '/pricing':
        setActiveSection('pricing');
        break;
      case '/settings':
        setActiveSection('settings');
        break;
      case '/admin':
      case '/admin/dashboard':
        setActiveSection('admin-dashboard');
        break;
      case '/admin/users':
        setActiveSection('admin-users');
        break;
      case '/admin/pricing':
        setActiveSection('admin-pricing');
        break;
      case '/admin/reports':
        setActiveSection('admin-reports');
        break;
      case '/admin/analytics':
        setActiveSection('admin-analytics');
        break;
      default:
        // Don't redirect if on admin routes
        if (location.pathname.startsWith('/admin')) {
          // Let admin routes handle themselves
          break;
        }
        // Only navigate to dashboard if we're not already on an auth route or admin route
        if (!['/login', '/register'].includes(location.pathname)) {
          navigate('/dashboard');
        }
        break;
    }
  }, [location.pathname, navigate]);

  // Handle navigation for unauthenticated users trying to access protected routes
  (0, _react.useEffect)(function () {
    var protectedRoutes = ['/dashboard', '/debts', '/branches', '/calculator', '/ratings', '/analytics', '/pricing', '/settings'];
    var isAdminRoute = location.pathname.startsWith('/admin');
    if (!user && (protectedRoutes.includes(location.pathname) || isAdminRoute)) {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]);

  // Handle navigation for authenticated users trying to access auth routes
  (0, _react.useEffect)(function () {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      // Redirect admin users to admin panel, regular users to dashboard
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, location.pathname, navigate]);

  // Handle admin route access control
  (0, _react.useEffect)(function () {
    if (user && location.pathname.startsWith('/admin') && user.role !== 'admin') {
      console.log('❌ Non-admin user trying to access admin route - redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, location.pathname, navigate]);

  // Function to switch sections and close mobile menu if open
  var switchSection = function switchSection(route) {
    // Extract section name from route for activeSection state
    var sectionName = route.replace('/', '') || 'dashboard';
    setActiveSection(sectionName);
    navigate(route);
    // If we're on mobile and the menu is open, close it
    if (window.innerWidth < 768 && activeSection === 'mobile-menu') {
      // Menu will close automatically when activeSection changes
    }
  };

  // Function to show modern suggestion notification

  // Function to handle suggestion notification click - redirect to Telegram
  var handleSuggestionClick = function handleSuggestionClick() {
    window.open('https://t.me/opscoder', '_blank');
    setShowSuggestionNotification(false); // Hide notification immediately after click
  };

  // Automatically show suggestion notification every 30 seconds
  (0, _react.useEffect)(function () {
    var interval = setInterval(function () {
      setShowSuggestionNotification(true);
      // Hide the notification after 8 seconds
      setTimeout(function () {
        setShowSuggestionNotification(false);
      }, 8000);
    }, 120000); // 30 seconds

    return function () {
      return clearInterval(interval);
    };
  }, []);

  // Show Telegram connection modal after 5 seconds if user hasn't connected
  (0, _react.useEffect)(function () {
    var checkTelegramConnection = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var token, response, contentType, data, lastSkipped, now, oneDayInMs, timer, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(!user || !user.id)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              token = localStorage.getItem('token');
              if (token) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _context.n = 3;
              return fetch('/api/telegram/status', {
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 3:
              response = _context.v;
              if (response.ok) {
                _context.n = 4;
                break;
              }
              return _context.a(2);
            case 4:
              contentType = response.headers.get('content-type');
              if (!(!contentType || !contentType.includes('application/json'))) {
                _context.n = 5;
                break;
              }
              return _context.a(2);
            case 5:
              _context.n = 6;
              return response.json();
            case 6:
              data = _context.v;
              if (!(data.success && !data.connected)) {
                _context.n = 7;
                break;
              }
              // Check if modal was skipped in last 24 hours
              lastSkipped = localStorage.getItem('telegramModalSkipped');
              now = Date.now();
              oneDayInMs = 24 * 60 * 60 * 1000;
              if (!(!lastSkipped || now - parseInt(lastSkipped) > oneDayInMs)) {
                _context.n = 7;
                break;
              }
              // Show modal after 5 seconds
              timer = setTimeout(function () {
                setShowTelegramModal(true);
              }, 5000);
              return _context.a(2, function () {
                return clearTimeout(timer);
              });
            case 7:
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              console.error('Error checking Telegram status:', _t);
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[1, 8]]);
      }));
      return function checkTelegramConnection() {
        return _ref.apply(this, arguments);
      };
    }();
    checkTelegramConnection();
  }, [user]);

  // Show loading state while checking auth
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center dark:from-gray-900 dark:via-blue-900 dark:to-gray-900"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-full max-w-md p-6"
    }, /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "authForm"
    }), /*#__PURE__*/_react["default"].createElement("p", {
      className: "mt-4 text-center text-gray-600 dark:text-gray-300"
    }, t('common.loading', 'Yuklanmoqda...'))));
  }

  // If user is not authenticated, show login/register routes
  if (!user) {
    return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
      path: "/login",
      element: /*#__PURE__*/_react["default"].createElement(_Login.Login, null)
    }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
      path: "/register",
      element: /*#__PURE__*/_react["default"].createElement(_Register.Register, null)
    }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
      path: "*",
      element: /*#__PURE__*/_react["default"].createElement(_Login.Login, null)
    }));
  }

  // If user is authenticated, show the main app
  return /*#__PURE__*/_react["default"].createElement(_ToastContext.ToastProvider, null, /*#__PURE__*/_react["default"].createElement(_BranchContext.BranchProvider, null, /*#__PURE__*/_react["default"].createElement(_DebtContext.DebtProvider, null, /*#__PURE__*/_react["default"].createElement(_EmployeeContext.EmployeeProvider, null, /*#__PURE__*/_react["default"].createElement("style", null, style), location.pathname.startsWith('/admin') ?
  /*#__PURE__*/
  // Admin Layout - No main sidebar, only admin layout
  _react["default"].createElement("div", {
    className: "min-h-screen transition-colors duration-300 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-100')
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/admin",
    element: /*#__PURE__*/_react["default"].createElement(_AdminLayout.AdminLayout, null)
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "dashboard",
    element: /*#__PURE__*/_react["default"].createElement(_AdminDashboard.AdminDashboard, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "business-owners",
    element: /*#__PURE__*/_react["default"].createElement(_AdminBusinessOwnersPage.AdminBusinessOwnersPage, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "employees",
    element: /*#__PURE__*/_react["default"].createElement(_AdminEmployeesPage.AdminEmployeesPage, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "sms-reminders",
    element: /*#__PURE__*/_react["default"].createElement(_AdminSMSRemindersPage.AdminSMSRemindersPage, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "users",
    element: /*#__PURE__*/_react["default"].createElement(_UserManagement.UserManagement, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "pricing",
    element: /*#__PURE__*/_react["default"].createElement(_PricingManagement.PricingManagement, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "reports",
    element: /*#__PURE__*/_react["default"].createElement(_Reports.Reports, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "analytics",
    element: /*#__PURE__*/_react["default"].createElement(_Analytics2.Analytics, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    index: true,
    element: /*#__PURE__*/_react["default"].createElement(_AdminDashboard.AdminDashboard, null)
  })))) :
  /*#__PURE__*/
  // Regular User Layout - With modern sidebar
  _react["default"].createElement("div", {
    className: "min-h-screen transition-colors duration-300 ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-orange-50 via-red-50 to-orange-100')
  }, /*#__PURE__*/_react["default"].createElement(_ModernSidebar.ModernSidebar, {
    activeSection: activeSection,
    switchSection: switchSection,
    isOpen: isMobileSidebarOpen,
    onClose: function onClose() {
      return setIsMobileSidebarOpen(false);
    },
    onCollapseChange: setIsSidebarCollapsed
  }), /*#__PURE__*/_react["default"].createElement("button", {
    className: "md:hidden fixed top-4 right-4 z-30 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
    onClick: function onClick() {
      return setIsMobileSidebarOpen(!isMobileSidebarOpen);
    },
    "aria-label": isMobileSidebarOpen ? 'Close menu' : 'Open menu'
  }, isMobileSidebarOpen ? /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-gray-700 dark:text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })) : /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-gray-700 dark:text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 p-4 md:p-8 overflow-auto transition-all duration-300 ".concat(isSidebarCollapsed ? 'md:ml-16' : 'md:ml-72')
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/_react["default"].createElement(_Login.Login, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/register",
    element: /*#__PURE__*/_react["default"].createElement(_Register.Register, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/dashboard",
    element: /*#__PURE__*/_react["default"].createElement(_Dashboard.QarzdaftarDashboard, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/debts",
    element: /*#__PURE__*/_react["default"].createElement(_Debts.QarzdaftarDebts, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/branches",
    element: /*#__PURE__*/_react["default"].createElement(_Branches.QarzdaftarBranches, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/employees",
    element: /*#__PURE__*/_react["default"].createElement(_Employees.QarzdaftarEmployees, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/calculator",
    element: /*#__PURE__*/_react["default"].createElement(_Calculator.QarzdaftarCalculator, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/ratings",
    element: /*#__PURE__*/_react["default"].createElement(_Ratings.QarzdaftarRatings, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/analytics",
    element: /*#__PURE__*/_react["default"].createElement(_Analytics.QarzdaftarAnalytics, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/sms-notifications",
    element: /*#__PURE__*/_react["default"].createElement(_SMSNotifications.QarzdaftarSMSNotifications, null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/pricing",
    element: /*#__PURE__*/_react["default"].createElement(_PricingPlans["default"], null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/settings",
    element: /*#__PURE__*/_react["default"].createElement(_Settings.QarzdaftarSettings, null)
  })))), showSuggestionNotification && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed bottom-6 right-6 z-50 animate-bounce-in hidden md:block"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: handleSuggestionClick,
    className: "group relative cursor-pointer transform transition-all duration-500 hover:scale-105 animate-pulse-glow ".concat(settings.theme === 'dark' ? 'bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 border border-slate-600/30' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 border border-gray-200/50', " rounded-2xl p-5 shadow-2xl hover:shadow-3xl backdrop-blur-lg max-w-xs")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 overflow-hidden rounded-2xl"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-4 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping",
    style: {
      animationDelay: '0.5s'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute top-6 right-6 w-1 h-1 bg-pink-400 rounded-full animate-ping",
    style: {
      animationDelay: '1s'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-start gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-6 h-6 text-white",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-bold text-base leading-tight ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, "Taklifingiz bormi?"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-1 leading-relaxed ".concat(settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600')
  }, "Telegram orqali bog'laning"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-1 mt-2"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs font-medium ".concat(settings.theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
  }, "@opscoder"), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 ".concat(settings.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  }))))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      setShowSuggestionNotification(false);
    },
    className: "absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 ".concat(settings.theme === 'dark' ? 'bg-slate-700/90 hover:bg-slate-600 text-slate-300 border border-slate-600/50' : 'bg-gray-100/90 hover:bg-gray-200 text-gray-600 border border-gray-200', " shadow-lg backdrop-blur-sm")
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/_react["default"].createElement(_PWAInstallPrompt.PWAInstallPrompt, null), /*#__PURE__*/_react["default"].createElement(_PWAInstallPrompt.PWAUpdatePrompt, null)))));
}