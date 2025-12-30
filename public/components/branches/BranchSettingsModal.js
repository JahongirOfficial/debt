"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchSettingsModal = BranchSettingsModal;
var _react = _interopRequireWildcard(require("react"));
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
var _translationUtils = require("../../utils/translationUtils");
var _LanguageContext = require("../../utils/LanguageContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
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
var BRANCH_COLORS = ['#3B82F6',
// Blue
'#10B981',
// Green
'#F59E0B',
// Yellow
'#EF4444',
// Red
'#8B5CF6',
// Purple
'#06B6D4',
// Cyan
'#F97316',
// Orange
'#84CC16',
// Lime
'#EC4899',
// Pink
'#6B7280' // Gray
];
var BRANCH_ICONS = [{
  name: 'building',
  label: 'Bino'
}, {
  name: 'store',
  label: 'Do\'kon'
}, {
  name: 'office',
  label: 'Ofis'
}, {
  name: 'home',
  label: 'Uy'
}, {
  name: 'factory',
  label: 'Zavod'
}, {
  name: 'warehouse',
  label: 'Ombor'
}];
var CURRENCIES = [{
  code: 'UZS',
  name: 'O\'zbek so\'mi',
  symbol: 'so\'m'
}, {
  code: 'USD',
  name: 'AQSH dollari',
  symbol: '$'
}, {
  code: 'EUR',
  name: 'Yevro',
  symbol: '€'
}, {
  code: 'RUB',
  name: 'Rossiya rubli',
  symbol: '₽'
}, {
  code: 'TJS',
  name: 'Tojik somoni',
  symbol: 'SM'
}];
function BranchSettingsModal(_ref) {
  var isOpen = _ref.isOpen,
    branch = _ref.branch,
    onClose = _ref.onClose,
    onSuccess = _ref.onSuccess,
    onDelete = _ref.onDelete;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  var _useBranches = (0, _BranchContext.useBranches)(),
    updateBranch = _useBranches.updateBranch,
    loading = _useBranches.loading;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)({
      name: '',
      description: '',
      currency: 'UZS',
      color: BRANCH_COLORS[0],
      icon: 'building'
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showDeleteConfirm = _useState8[0],
    setShowDeleteConfirm = _useState8[1];

  // Initialize form data when branch changes
  (0, _react.useEffect)(function () {
    if (isOpen && branch) {
      setFormData({
        name: branch.name || '',
        description: branch.description || '',
        currency: branch.currency || 'UZS',
        color: branch.color || BRANCH_COLORS[0],
        icon: branch.icon || 'building'
      });
      setErrors({});
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  }, [isOpen, branch]);

  // Validate form
  var validateForm = function validateForm() {
    var newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Filial nomi kiritilishi shart';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Filial nomi kamida 2 ta belgidan iborat bo\'lishi kerak';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Filial nomi 100 ta belgidan oshmasligi kerak';
    }
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Tavsif 500 ta belgidan oshmasligi kerak';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (!(!validateForm() || !branch)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setIsSubmitting(true);
            _context.p = 2;
            _context.n = 3;
            return updateBranch(branch._id, {
              name: formData.name.trim(),
              description: formData.description.trim(),
              currency: formData.currency,
              color: formData.color,
              icon: formData.icon
            });
          case 3:
            result = _context.v;
            if (result.success) {
              onClose();
              if (onSuccess) {
                onSuccess(result.branch);
              }
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error updating branch:', _t);
          case 5:
            _context.p = 5;
            setIsSubmitting(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Handle input changes
  var handleInputChange = function handleInputChange(field, value) {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, value));
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, ''));
      });
    }
  };

  // Handle delete confirmation
  var handleDeleteConfirm = function handleDeleteConfirm() {
    if (onDelete && branch) {
      onDelete(branch);
      onClose();
    }
  };

  // Get branch icon SVG
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
      })),
      factory: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-5 h-5",
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
        className: "w-5 h-5",
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
  if (!isOpen || !branch) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl ".concat(settings.theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-lg sm:text-xl font-bold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Filial sozlamalari"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose,
    className: "p-2 rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700')
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
  })))), showDeleteConfirm && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-3 sm:p-4 mx-4 sm:mx-6 mt-3 sm:mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-red-600 dark:text-red-400 mt-0.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-red-800 dark:text-red-200"
  }, "Filialni o'chirish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-red-700 dark:text-red-300 mt-1"
  }, "Bu amalni bekor qilib bo'lmaydi. Filial va unga tegishli barcha qarzlar o'chiriladi."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-2 mt-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleDeleteConfirm,
    className: "px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
  }, "Ha, o'chirish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowDeleteConfirm(false);
    },
    className: "px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-lg transition-colors"
  }, "Bekor qilish"))))), /*#__PURE__*/_react["default"].createElement("form", {
    onSubmit: handleSubmit,
    className: "p-4 sm:p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4 sm:space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Filial nomi *"), /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: formData.name,
    onChange: function onChange(e) {
      return handleInputChange('name', e.target.value);
    },
    placeholder: "Masalan: Markaziy filial",
    className: "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors ".concat(errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500', " focus:ring-2 focus:border-transparent ").concat(settings.theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500')
  }), errors.name && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-red-500 text-sm mt-1"
  }, errors.name)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Tavsif (ixtiyoriy)"), /*#__PURE__*/_react["default"].createElement("textarea", {
    value: formData.description,
    onChange: function onChange(e) {
      return handleInputChange('description', e.target.value);
    },
    placeholder: "Filial haqida qisqacha ma'lumot...",
    rows: 3,
    className: "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors ".concat(errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500', " focus:ring-2 focus:border-transparent resize-none ").concat(settings.theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500')
  }), errors.description && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-red-500 text-sm mt-1"
  }, errors.description)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Asosiy valyuta"), /*#__PURE__*/_react["default"].createElement("select", {
    value: formData.currency,
    onChange: function onChange(e) {
      return handleInputChange('currency', e.target.value);
    },
    className: "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent ".concat(settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900')
  }, CURRENCIES.map(function (currency) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: currency.code,
      value: currency.code
    }, currency.name, " (", currency.symbol, ")");
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4 sm:space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-3 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Filial rangi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3"
  }, BRANCH_COLORS.map(function (color) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: color,
      type: "button",
      onClick: function onClick() {
        return handleInputChange('color', color);
      },
      className: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg transition-all duration-200 ".concat(formData.color === color ? 'ring-2 sm:ring-4 ring-blue-500 ring-opacity-50 scale-105 sm:scale-110' : 'hover:scale-105'),
      style: {
        backgroundColor: color
      }
    }, formData.color === color && /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto",
      fill: "currentColor",
      viewBox: "0 0 20 20"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      fillRule: "evenodd",
      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      clipRule: "evenodd"
    })));
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-3 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Filial belgisi"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
  }, BRANCH_ICONS.map(function (icon) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: icon.name,
      type: "button",
      onClick: function onClick() {
        return handleInputChange('icon', icon.name);
      },
      className: "flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 ".concat(formData.icon === icon.name ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : settings.theme === 'dark' ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50')
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white",
      style: {
        backgroundColor: formData.color
      }
    }, getBranchIcon(icon.name)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-xs font-medium ".concat(formData.icon === icon.name ? 'text-blue-600 dark:text-blue-400' : settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600')
    }, icon.label));
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col space-y-3 pt-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    type: "submit",
    disabled: isSubmitting || loading,
    className: "flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ".concat(isSubmitting || loading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
  }, isSubmitting || loading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "Saqlanmoqda...")) : 'Saqlash')), onDelete && /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setShowDeleteConfirm(true);
    },
    className: "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white"
  }, "Filialni o'chirish")))));
}