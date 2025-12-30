"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuth = exports.AuthProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _api = require("./api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t8 in e) "default" !== _t8 && {}.hasOwnProperty.call(e, _t8) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t8)) && (i.get || i.set) ? o(f, _t8, i) : f[_t8] = e[_t8]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
// Import the api utility

// Create the context
var AuthContext = /*#__PURE__*/(0, _react.createContext)();

// Provider component
var AuthProvider = exports.AuthProvider = function AuthProvider(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    user = _useState2[0],
    setUser = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)({
      language: 'uz',
      currency: 'UZS',
      theme: 'light'
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    settings = _useState6[0],
    setSettings = _useState6[1];
  var _useState7 = (0, _react.useState)(true),
    _useState8 = _slicedToArray(_useState7, 2),
    backendAvailable = _useState8[0],
    setBackendAvailable = _useState8[1];

  // Check if backend is available
  (0, _react.useEffect)(function () {
    var checkBackendAvailability = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              console.log('Checking backend availability');
              _context.n = 1;
              return (0, _api.apiFetch)('/health', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            case 1:
              response = _context.v;
              if (response.ok) {
                setBackendAvailable(true);
                console.log('Backend is available');
              } else {
                setBackendAvailable(false);
                console.error('Backend returned non-ok status:', response.status);
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Backend not available:', _t);
              setBackendAvailable(false);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function checkBackendAvailability() {
        return _ref2.apply(this, arguments);
      };
    }();
    checkBackendAvailability();
  }, []);

  // Verify token with backend
  var verifyToken = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(token) {
      var response, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return (0, _api.apiFetch)('/profile', {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context2.v;
            if (!response.ok) {
              _context2.n = 3;
              break;
            }
            _context2.n = 2;
            return response.json();
          case 2:
            data = _context2.v;
            return _context2.a(2, data.user);
          case 3:
            return _context2.a(2, null);
          case 4:
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error('Error verifying token:', _t2);
            return _context2.a(2, null);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 5]]);
    }));
    return function verifyToken(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Check if user is logged in on initial load
  (0, _react.useEffect)(function () {
    var checkUserStatus = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var token, userData, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              token = localStorage.getItem('token');
              if (!(token && backendAvailable)) {
                _context3.n = 7;
                break;
              }
              _context3.p = 1;
              _context3.n = 2;
              return verifyToken(token);
            case 2:
              userData = _context3.v;
              if (!userData) {
                _context3.n = 4;
                break;
              }
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));
              // Fetch user settings
              _context3.n = 3;
              return fetchUserSettings(token, userData);
            case 3:
              _context3.n = 5;
              break;
            case 4:
              // Token is invalid, clear storage
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            case 5:
              _context3.n = 7;
              break;
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              console.error('Error verifying user token:', _t3);
              // Clear invalid token
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            case 7:
              setLoading(false);
            case 8:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 6]]);
      }));
      return function checkUserStatus() {
        return _ref4.apply(this, arguments);
      };
    }();
    checkUserStatus();
  }, [backendAvailable]);

  // Fetch user settings from backend
  var fetchUserSettings = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(token, userData) {
      var response, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return (0, _api.apiFetch)('/settings', {
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              }
            });
          case 1:
            response = _context4.v;
            _context4.n = 2;
            return response.json();
          case 2:
            data = _context4.v;
            if (data.success && data.settings) {
              setSettings({
                language: data.settings.language || 'uz',
                currency: data.settings.currency || 'UZS',
                theme: data.settings.theme || 'light'
              });

              // Apply theme immediately
              if (data.settings.theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            console.error('Error fetching user settings:', _t4);
          case 4:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 3]]);
    }));
    return function fetchUserSettings(_x2, _x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  // Update user settings
  var updateUserSettings = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(newSettings) {
      var token, response, data, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (backendAvailable) {
              _context5.n = 1;
              break;
            }
            setSettings(newSettings);

            // Apply theme immediately if it exists in the new settings
            if (newSettings.theme) {
              if (newSettings.theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            return _context5.a(2, {
              success: true
            });
          case 1:
            _context5.p = 1;
            token = localStorage.getItem('token');
            _context5.n = 2;
            return (0, _api.apiFetch)('/settings', {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newSettings)
            });
          case 2:
            response = _context5.v;
            _context5.n = 3;
            return response.json();
          case 3:
            data = _context5.v;
            if (!(data.success && data.settings)) {
              _context5.n = 4;
              break;
            }
            // Preserve existing settings that might not be in the response
            setSettings(function (prevSettings) {
              return _objectSpread(_objectSpread({}, prevSettings), data.settings);
            });

            // Apply theme immediately if it exists in the response
            if (data.settings.theme) {
              if (data.settings.theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            return _context5.a(2, {
              success: true
            });
          case 4:
            return _context5.a(2, {
              success: false,
              message: data.message
            });
          case 5:
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t5 = _context5.v;
            console.error('Error updating user settings:', _t5);
            return _context5.a(2, {
              success: false,
              message: 'Network error while updating settings'
            });
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 6]]);
    }));
    return function updateUserSettings(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  // Login function
  var login = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(fullPhoneNumber, password) {
      var mockUser, mockAdminUser, response, responseData, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (backendAvailable) {
              _context6.n = 5;
              break;
            }
            if (!(!fullPhoneNumber || !password)) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, {
              success: false,
              message: 'Phone number and password are required'
            });
          case 1:
            if (fullPhoneNumber.startsWith('+')) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, {
              success: false,
              message: 'Phone number must start with country code (e.g., +998)'
            });
          case 2:
            if (!(fullPhoneNumber === '+998901234567' && password === 'password123')) {
              _context6.n = 3;
              break;
            }
            // Create a mock user for the test account
            mockUser = {
              id: 'test-user-id',
              username: 'testuser',
              phone: '+998901234567',
              subscriptionTier: 'free',
              avatarColor: 'bg-gradient-to-br from-blue-500 to-indigo-500',
              role: 'user'
            };
            console.log('🔐 Test Login successful - User data:', mockUser);
            console.log('👤 Test User role:', mockUser.role);
            localStorage.setItem('token', 'test-token');
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return _context6.a(2, {
              success: true,
              user: mockUser
            });
          case 3:
            if (!(fullPhoneNumber === '+998901234568' && password === 'admin123')) {
              _context6.n = 4;
              break;
            }
            // Admin test account
            mockAdminUser = {
              id: 'admin-user-id',
              username: 'admin',
              phone: '+998901234568',
              subscriptionTier: 'pro',
              role: 'admin',
              avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
            };
            console.log('🔐 Test Admin Login successful - User data:', mockAdminUser);
            console.log('👤 Test Admin User role:', mockAdminUser.role);
            localStorage.setItem('token', 'admin-test-token');
            localStorage.setItem('user', JSON.stringify(mockAdminUser));
            setUser(mockAdminUser);
            return _context6.a(2, {
              success: true,
              user: mockAdminUser
            });
          case 4:
            return _context6.a(2, {
              success: false,
              message: 'Invalid credentials'
            });
          case 5:
            _context6.p = 5;
            if (fullPhoneNumber.startsWith('+')) {
              _context6.n = 6;
              break;
            }
            return _context6.a(2, {
              success: false,
              message: 'Phone number must start with country code (e.g., +998)'
            });
          case 6:
            _context6.n = 7;
            return (0, _api.apiFetch)('/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                phone: fullPhoneNumber,
                password: password
              })
            });
          case 7:
            response = _context6.v;
            _context6.n = 8;
            return response.clone().json();
          case 8:
            responseData = _context6.v;
            if (!responseData.success) {
              _context6.n = 10;
              break;
            }
            console.log('🔐 Login successful - User data:', responseData.user);
            console.log('👤 User role:', responseData.user.role);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            setUser(responseData.user);

            // Fetch user settings
            _context6.n = 9;
            return fetchUserSettings(responseData.token, responseData.user);
          case 9:
            return _context6.a(2, {
              success: true,
              user: responseData.user
            });
          case 10:
            return _context6.a(2, {
              success: false,
              message: responseData.message
            });
          case 11:
            _context6.n = 13;
            break;
          case 12:
            _context6.p = 12;
            _t6 = _context6.v;
            console.error('Login error:', _t6);
            return _context6.a(2, {
              success: false,
              message: 'Network error during login'
            });
          case 13:
            return _context6.a(2);
        }
      }, _callee6, null, [[5, 12]]);
    }));
    return function login(_x5, _x6) {
      return _ref7.apply(this, arguments);
    };
  }();

  // Register function
  var register = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(username, fullPhoneNumber, password) {
      var mockUser, response, responseData, _t7;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            if (backendAvailable) {
              _context7.n = 5;
              break;
            }
            if (!(!username || !fullPhoneNumber || !password)) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2, {
              success: false,
              message: 'All fields are required'
            });
          case 1:
            if (!(password.length < 6)) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, {
              success: false,
              message: 'Password must be at least 6 characters long'
            });
          case 2:
            if (fullPhoneNumber.startsWith('+')) {
              _context7.n = 3;
              break;
            }
            return _context7.a(2, {
              success: false,
              message: 'Phone number must start with country code (e.g., +998)'
            });
          case 3:
            if (!(username === 'testuser' && fullPhoneNumber === '+998901234567' && password === 'password123')) {
              _context7.n = 4;
              break;
            }
            // Create a mock user for the test account
            mockUser = {
              id: 'test-user-id',
              username: 'testuser',
              phone: '+998901234567',
              subscriptionTier: 'free',
              avatarColor: 'bg-gradient-to-br from-blue-500 to-indigo-500',
              role: 'user'
            };
            localStorage.setItem('token', 'test-token');
            localStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return _context7.a(2, {
              success: true,
              user: mockUser
            });
          case 4:
            return _context7.a(2, {
              success: false,
              message: 'Registration is disabled in test mode. Use +998901234567 / password123 to login.'
            });
          case 5:
            _context7.p = 5;
            if (fullPhoneNumber.startsWith('+')) {
              _context7.n = 6;
              break;
            }
            return _context7.a(2, {
              success: false,
              message: 'Phone number must start with country code (e.g., +998)'
            });
          case 6:
            _context7.n = 7;
            return (0, _api.apiFetch)('/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                phone: fullPhoneNumber,
                password: password
              })
            });
          case 7:
            response = _context7.v;
            _context7.n = 8;
            return response.clone().json();
          case 8:
            responseData = _context7.v;
            if (!responseData.success) {
              _context7.n = 10;
              break;
            }
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            setUser(responseData.user);

            // Fetch user settings
            _context7.n = 9;
            return fetchUserSettings(responseData.token, responseData.user);
          case 9:
            return _context7.a(2, {
              success: true,
              user: responseData.user
            });
          case 10:
            return _context7.a(2, {
              success: false,
              message: responseData.message
            });
          case 11:
            _context7.n = 13;
            break;
          case 12:
            _context7.p = 12;
            _t7 = _context7.v;
            console.error('Registration error:', _t7);
            return _context7.a(2, {
              success: false,
              message: 'Network error during registration'
            });
          case 13:
            return _context7.a(2);
        }
      }, _callee7, null, [[5, 12]]);
    }));
    return function register(_x7, _x8, _x9) {
      return _ref8.apply(this, arguments);
    };
  }();

  // Logout function
  var logout = function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSettings({
      language: 'uz',
      currency: 'UZS',
      theme: 'light'
    });
    document.documentElement.classList.remove('dark');
  };

  // Context value
  var value = {
    user: user,
    loading: loading,
    settings: settings,
    backendAvailable: backendAvailable,
    login: login,
    register: register,
    logout: logout,
    updateUserSettings: updateUserSettings
  };
  return /*#__PURE__*/_react["default"].createElement(AuthContext.Provider, {
    value: value
  }, children);
};

// Custom hook to use the AuthContext
var useAuth = exports.useAuth = function useAuth() {
  var context = (0, _react.useContext)(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};