"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtTransferModal = DebtTransferModal;
var _react = _interopRequireWildcard(require("react"));
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
var _translationUtils = require("../../utils/translationUtils");
var _LanguageContext = require("../../utils/LanguageContext");
var _formatUtils = require("../../utils/formatUtils");
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
function DebtTransferModal(_ref) {
  var isOpen = _ref.isOpen,
    debt = _ref.debt,
    onClose = _ref.onClose,
    onSuccess = _ref.onSuccess;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches,
    activeBranch = _useBranches.activeBranch;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    selectedBranch = _useState2[0],
    setSelectedBranch = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    reason = _useState4[0],
    setReason = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isTransferring = _useState6[0],
    setIsTransferring = _useState6[1];

  // Get available branches (exclude current branch)
  var availableBranches = branches.filter(function (branch) {
    return branch._id !== (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch._id);
  });

  // Reset form when modal opens
  (0, _react.useEffect)(function () {
    if (isOpen) {
      setSelectedBranch(availableBranches.length > 0 ? availableBranches[0]._id : '');
      setReason('');
      setIsTransferring(false);
    }
  }, [isOpen, availableBranches]);

  // Handle transfer
  var handleTransfer = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var token, response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(!debt || !selectedBranch)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setIsTransferring(true);
            _context.p = 2;
            token = localStorage.getItem('token');
            _context.n = 3;
            return fetch("/api/debts/".concat(debt._id, "/transfer"), {
              method: 'PATCH',
              headers: {
                'Authorization': "Bearer ".concat(token),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                targetBranchId: selectedBranch,
                reason: reason.trim()
              })
            });
          case 3:
            response = _context.v;
            _context.n = 4;
            return response.json();
          case 4:
            data = _context.v;
            if (data.success) {
              onClose();
              if (onSuccess) {
                onSuccess(data.debt);
              }
            } else {
              console.error('Transfer failed:', data.message);
            }
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Error transferring debt:', _t);
          case 6:
            _context.p = 6;
            setIsTransferring(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[2, 5, 6, 7]]);
    }));
    return function handleTransfer() {
      return _ref2.apply(this, arguments);
    };
  }();

  // Get branch icon
  var getBranchIcon = function getBranchIcon(iconName) {
    var icons = {
      building: /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-4 h-4",
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
        className: "w-4 h-4",
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
        className: "w-4 h-4",
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
        className: "w-4 h-4",
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
        className: "w-4 h-4",
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
        className: "w-4 h-4",
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
  if (!isOpen || !debt) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-md rounded-2xl shadow-2xl ".concat(settings.theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-blue-600 dark:text-blue-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
  }))), /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-bold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Qarzni ko'chirish")), /*#__PURE__*/_react["default"].createElement("button", {
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
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold mb-2 ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Ko'chiriladigan qarz"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-800')
  }, debt.creditor), debt.description && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, debt.description)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-bold text-lg ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, (0, _formatUtils.formatNumberWithSpaces)(debt.amount), " ", debt.currency), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, new Date(debt.debtDate).toLocaleDateString('uz-UZ'))))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Joriy filial"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 rounded-lg flex items-center justify-center text-white",
    style: {
      backgroundColor: (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch.color) || '#3B82F6'
    }
  }, getBranchIcon(activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch.icon)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch.name), (activeBranch === null || activeBranch === void 0 ? void 0 : activeBranch.description) && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, activeBranch.description)))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Qaysi filialga ko'chirish *"), availableBranches.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-2"
  }, availableBranches.map(function (branch) {
    return /*#__PURE__*/_react["default"].createElement("label", {
      key: branch._id,
      className: "flex items-center space-x-3 cursor-pointer"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "radio",
      name: "targetBranch",
      value: branch._id,
      checked: selectedBranch === branch._id,
      onChange: function onChange(e) {
        return setSelectedBranch(e.target.value);
      },
      className: "text-blue-600 focus:ring-blue-500"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3 flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white",
      style: {
        backgroundColor: branch.color || '#3B82F6'
      }
    }, getBranchIcon(branch.icon)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
      className: "font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
    }, branch.name), branch.description && /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
    }, branch.description))));
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-yellow-700 dark:text-yellow-300"
  }, "Ko'chirish uchun boshqa filial mavjud emas."))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium mb-2 ".concat(settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700')
  }, "Ko'chirish sababi (ixtiyoriy)"), /*#__PURE__*/_react["default"].createElement("textarea", {
    value: reason,
    onChange: function onChange(e) {
      return setReason(e.target.value);
    },
    placeholder: "Qarzni nima uchun ko'chiryapsiz?",
    rows: 3,
    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ".concat(settings.theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500')
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex-1 px-4 py-3 rounded-lg font-medium transition-colors ".concat(settings.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleTransfer,
    disabled: !selectedBranch || isTransferring || availableBranches.length === 0,
    className: "flex-1 px-4 py-3 rounded-lg font-medium transition-colors ".concat(!selectedBranch || isTransferring || availableBranches.length === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
  }, isTransferring ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "Ko'chirilmoqda...")) : 'Ko\'chirish')))));
}