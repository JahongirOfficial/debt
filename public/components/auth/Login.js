"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = Login;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../../utils/AuthContext");
var _LanguageContext = require("../../utils/LanguageContext");
var _translationUtils = require("../../utils/translationUtils");
var _CountryCodeSelector = require("./CountryCodeSelector");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
function Login() {
  var _useState = (0, _react.useState)('+998'),
    _useState2 = _slicedToArray(_useState, 2),
    countryCode = _useState2[0],
    setCountryCode = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    phone = _useState4[0],
    setPhone = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    password = _useState6[0],
    setPassword = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState1, 2),
    lastClickTime = _useState10[0],
    setLastClickTime = _useState10[1]; // Track last click time for double click detection

  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useAuth = (0, _AuthContext.useAuth)(),
    login = _useAuth.login,
    user = _useAuth.user;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var t = (0, _translationUtils.useTranslation)(language);
  var handleTitleClick = function handleTitleClick() {
    var currentTime = new Date().getTime();
    var timeDiff = currentTime - lastClickTime;

    // If second click within 500ms, show admin login info
    if (timeDiff < 500 && timeDiff > 0) {
      setError('Admin login: +998901234568 / admin123');
    }
    setLastClickTime(currentTime);
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var fullPhoneNumber, result, _result$user;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            setLoading(true);
            setError('');
            if (!(!phone || !password)) {
              _context.n = 1;
              break;
            }
            setError(t('auth.login.allFieldsRequired', 'All fields are required'));
            setLoading(false);
            return _context.a(2);
          case 1:
            // Combine country code with phone number
            fullPhoneNumber = countryCode + phone.replace(/\D/g, '');
            _context.n = 2;
            return login(fullPhoneNumber, password);
          case 2:
            result = _context.v;
            if (!result.success) {
              setError(result.message);
            } else {
              console.log('🚀 Login result:', result);
              console.log('🎯 User role from result:', (_result$user = result.user) === null || _result$user === void 0 ? void 0 : _result$user.role);

              // Check if user has admin role and redirect accordingly
              if (result.user && result.user.role === 'admin') {
                console.log('✅ Admin user detected - redirecting to admin panel');
                // User has admin role, redirect to admin panel
                navigate('/admin/dashboard');
              } else {
                console.log('✅ Regular user detected - redirecting to dashboard');
                // Regular user, redirect to dashboard
                navigate('/dashboard');
              }
            }
            setLoading(false);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center p-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold text-white cursor-pointer select-none",
    onClick: handleTitleClick
  }, t('app.title', 'Qarzdaftar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-orange-100 mt-2"
  }, t('auth.login.title', 'Tizimga kirish'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-8"
  }, error && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r text-red-700"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-medium"
  }, error)), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "phone",
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, t('auth.login.phone', 'Telefon raqam')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-1/3"
  }, /*#__PURE__*/_react["default"].createElement(_CountryCodeSelector.CountryCodeSelector, {
    selectedCode: countryCode,
    onCodeChange: setCountryCode,
    language: language
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-2/3 relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
  }))), /*#__PURE__*/_react["default"].createElement("input", {
    id: "phone",
    type: "tel",
    value: phone,
    onChange: function onChange(e) {
      return setPhone(e.target.value);
    },
    className: "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all",
    placeholder: t('auth.login.phonePlaceholder', 'Telefon raqam')
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "password",
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, t('auth.login.password', 'Parol')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
    clipRule: "evenodd"
  }))), /*#__PURE__*/_react["default"].createElement("input", {
    id: "password",
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    className: "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all",
    placeholder: t('auth.login.passwordPlaceholder', 'Parolingizni kiriting')
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "remember-me",
    name: "remember-me",
    type: "checkbox",
    className: "h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
  }), /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "remember-me",
    className: "ml-2 block text-sm text-gray-700"
  }, t('auth.login.rememberMe', 'Eslab qolish'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#",
    className: "font-medium text-orange-600 hover:text-orange-500"
  }, t('auth.login.forgotPassword', 'Parolni unutdingizmi?')))), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: loading,
    className: "w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-red-600 disabled:opacity-70 disabled:cursor-not-allowed"
  }, loading ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"
  }), t('auth.login.loggingIn', 'Kirish...')) : t('auth.login.button', 'Kirish'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-8 pt-6 border-t border-gray-200"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 text-center text-sm"
  }, t('auth.login.noAccount', "Hisobingiz yo'qmi?"), ' ', /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return navigate('/register');
    },
    className: "text-orange-600 font-medium hover:text-orange-500 transition-colors"
  }, t('auth.login.registerLink', 'Ro\'yxatdan o\'ting')))))));
}