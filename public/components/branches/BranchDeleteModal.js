"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchDeleteModal = BranchDeleteModal;
var _react = _interopRequireWildcard(require("react"));
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
var _translationUtils = require("../../utils/translationUtils");
var _LanguageContext = require("../../utils/LanguageContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
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
function BranchDeleteModal(_ref) {
  var isOpen = _ref.isOpen,
    branch = _ref.branch,
    onClose = _ref.onClose,
    onSuccess = _ref.onSuccess;
  var _useLanguage = (0, _LanguageContext.useLanguage)(),
    language = _useLanguage.language;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  var _useBranches = (0, _BranchContext.useBranches)(),
    deleteBranch = _useBranches.deleteBranch,
    branches = _useBranches.branches,
    loading = _useBranches.loading;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDeleting = _useState2[0],
    setIsDeleting = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    debtCount = _useState4[0],
    setDebtCount = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    transferToBranch = _useState6[0],
    setTransferToBranch = _useState6[1];
  var _useState7 = (0, _react.useState)('transfer'),
    _useState8 = _slicedToArray(_useState7, 2),
    deleteOption = _useState8[0],
    setDeleteOption = _useState8[1]; // 'transfer' or 'delete'

  // Fetch debt count for the branch
  (0, _react.useEffect)(function () {
    var fetchDebtCount = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var token, response, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(isOpen && branch)) {
                _context.n = 5;
                break;
              }
              _context.p = 1;
              token = localStorage.getItem('token');
              _context.n = 2;
              return fetch("/api/branches/".concat(branch._id, "/debts/count"), {
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 2:
              response = _context.v;
              _context.n = 3;
              return response.json();
            case 3:
              data = _context.v;
              if (data.success) {
                setDebtCount(data.count || 0);
              }
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error('Error fetching debt count:', _t);
              setDebtCount(0);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[1, 4]]);
      }));
      return function fetchDebtCount() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchDebtCount();
  }, [isOpen, branch]);

  // Reset state when modal opens
  (0, _react.useEffect)(function () {
    if (isOpen) {
      setIsDeleting(false);
      setTransferToBranch('');
      setDeleteOption('transfer');

      // Set default transfer branch (first available branch that's not the current one)
      var _availableBranches = branches.filter(function (b) {
        return b._id !== (branch === null || branch === void 0 ? void 0 : branch._id);
      });
      if (_availableBranches.length > 0) {
        setTransferToBranch(_availableBranches[0]._id);
      }
    }
  }, [isOpen, branch, branches]);

  // Handle delete confirmation
  var handleDelete = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var result, transferResponse, transferData, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (branch) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setIsDeleting(true);
            _context2.p = 2;
            if (!(debtCount > 0 && deleteOption === 'transfer' && transferToBranch)) {
              _context2.n = 7;
              break;
            }
            _context2.n = 3;
            return fetch("/api/branches/".concat(branch._id, "/transfer-debts"), {
              method: 'POST',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                targetBranchId: transferToBranch
              })
            });
          case 3:
            transferResponse = _context2.v;
            _context2.n = 4;
            return transferResponse.json();
          case 4:
            transferData = _context2.v;
            if (transferData.success) {
              _context2.n = 5;
              break;
            }
            throw new Error(transferData.message || 'Failed to transfer debts');
          case 5:
            _context2.n = 6;
            return deleteBranch(branch._id);
          case 6:
            result = _context2.v;
            _context2.n = 11;
            break;
          case 7:
            if (!(debtCount > 0 && deleteOption === 'delete')) {
              _context2.n = 9;
              break;
            }
            _context2.n = 8;
            return deleteBranch(branch._id, true);
          case 8:
            result = _context2.v;
            _context2.n = 11;
            break;
          case 9:
            _context2.n = 10;
            return deleteBranch(branch._id);
          case 10:
            result = _context2.v;
          case 11:
            if (result.success) {
              onClose();
              if (onSuccess) {
                onSuccess();
              }
            }
            _context2.n = 13;
            break;
          case 12:
            _context2.p = 12;
            _t2 = _context2.v;
            console.error('Error deleting branch:', _t2);
          case 13:
            _context2.p = 13;
            setIsDeleting(false);
            return _context2.f(13);
          case 14:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 12, 13, 14]]);
    }));
    return function handleDelete() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Get available branches for transfer
  var availableBranches = branches.filter(function (b) {
    return b._id !== (branch === null || branch === void 0 ? void 0 : branch._id);
  });
  if (!isOpen || !branch) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-full max-w-2xl rounded-2xl shadow-2xl ".concat(settings.theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-red-600 dark:text-red-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
  }))), /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-xl font-bold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Filialni o'chirish")), /*#__PURE__*/_react["default"].createElement("button", {
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
    className: "p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg",
    style: {
      backgroundColor: branch.color || '#3B82F6'
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "font-semibold ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, branch.name), branch.description && /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, branch.description))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
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
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-red-800 dark:text-red-200"
  }, "Diqqat! Bu amalni bekor qilib bo'lmaydi"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-red-700 dark:text-red-300 mt-1"
  }, "Filial o'chirilgandan keyin uni qayta tiklab bo'lmaydi.")))), debtCount > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-start space-x-3"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium text-yellow-800 dark:text-yellow-200"
  }, "Bu filialda ", debtCount, " ta qarz mavjud"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-yellow-700 dark:text-yellow-300 mt-1"
  }, "Qarzlarni boshqa filialga ko'chirish yoki ularni ham o'chirish kerak."))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-6"
  }, debtCount > 0 && availableBranches.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Qarzlar bilan nima qilish kerak?"), /*#__PURE__*/_react["default"].createElement("label", {
    className: "flex items-start space-x-3 cursor-pointer"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "deleteOption",
    value: "transfer",
    checked: deleteOption === 'transfer',
    onChange: function onChange(e) {
      return setDeleteOption(e.target.value);
    },
    className: "mt-1 text-blue-600 focus:ring-blue-500"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Qarzlarni boshqa filialga ko'chirish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-1 ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, "Barcha qarzlar tanlangan filialga ko'chiriladi"), deleteOption === 'transfer' && /*#__PURE__*/_react["default"].createElement("select", {
    value: transferToBranch,
    onChange: function onChange(e) {
      return setTransferToBranch(e.target.value);
    },
    className: "mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent ".concat(settings.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900')
  }, availableBranches.map(function (b) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: b._id,
      value: b._id
    }, b.name);
  })))), /*#__PURE__*/_react["default"].createElement("label", {
    className: "flex items-start space-x-3 cursor-pointer"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "radio",
    name: "deleteOption",
    value: "delete",
    checked: deleteOption === 'delete',
    onChange: function onChange(e) {
      return setDeleteOption(e.target.value);
    },
    className: "mt-1 text-red-600 focus:ring-red-500"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium ".concat(settings.theme === 'dark' ? 'text-white' : 'text-gray-900')
  }, "Qarzlarni ham o'chirish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-1 ".concat(settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500')
  }, "Filial va barcha qarzlar butunlay o'chiriladi")))), debtCount > 0 && availableBranches.length === 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-red-700 dark:text-red-300"
  }, "Qarzlarni ko'chirish uchun boshqa filial mavjud emas. Filial o'chirilganda barcha qarzlar ham o'chiriladi.")))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex space-x-3 pt-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex-1 px-4 py-3 rounded-lg font-medium transition-colors ".concat(settings.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
  }, "Bekor qilish"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleDelete,
    disabled: isDeleting || loading || debtCount > 0 && deleteOption === 'transfer' && !transferToBranch,
    className: "flex-1 px-4 py-3 rounded-lg font-medium transition-colors ".concat(isDeleting || loading || debtCount > 0 && deleteOption === 'transfer' && !transferToBranch ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-red-600 hover:bg-red-700 text-white')
  }, isDeleting || loading ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center space-x-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "O'chirilmoqda...")) : 'Ha, o\'chirish')))));
}