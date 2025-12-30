"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtAdjustModal = DebtAdjustModal;
var _react = require("react");
var _formatUtils = require("../../utils/formatUtils");
var _translationUtils = require("../../utils/translationUtils");
var _storageUtils = require("../../utils/storageUtils");
var _debtUtils = require("../../utils/debtUtils");
var _ToastContext = require("../../utils/ToastContext");
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
function DebtAdjustModal(_ref) {
  var isOpen = _ref.isOpen,
    debt = _ref.debt,
    type = _ref.type,
    onClose = _ref.onClose,
    onSave = _ref.onSave;
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useStoredState3 = (0, _storageUtils.useStoredState)('qarzdaftar_currency', 'UZS'),
    _useStoredState4 = _slicedToArray(_useStoredState3, 1),
    currency = _useStoredState4[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var _useToast = (0, _ToastContext.useToast)(),
    showSuccess = _useToast.showSuccess,
    showError = _useToast.showError;
  var _useState = (0, _react.useState)({
      amount: '',
      reason: '',
      type: 'add'
    }),
    _useState2 = _slicedToArray(_useState, 2),
    adjustForm = _useState2[0],
    setAdjustForm = _useState2[1];

  // Initialize form when debt or type changes
  (0, _react.useEffect)(function () {
    if (debt && type) {
      setAdjustForm({
        amount: '',
        reason: '',
        type: type
      });
    }
  }, [debt, type]);

  // Handle ESC key press
  (0, _react.useEffect)(function () {
    var handleEscKey = function handleEscKey(e) {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return function () {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  if (!isOpen || !debt) return null;
  var handleBackdropClick = function handleBackdropClick(e) {
    if (e.target.id === 'adjust-modal-backdrop') {
      onClose();
    }
  };
  var handleSave = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var adjustmentAmount, adjustmentData, adjustmentType, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (adjustForm.amount) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            adjustmentAmount = (0, _formatUtils.parseFormattedNumber)(adjustForm.amount);
            if (!(adjustForm.type === 'subtract' && adjustmentAmount > debt.amount)) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            adjustmentData = {
              amount: adjustmentAmount,
              type: adjustForm.type,
              reason: adjustForm.reason || "Qarz miqdori ".concat(adjustForm.type === 'add' ? 'oshirildi' : 'kamaytirildi')
            }; // Store data before closing modal
            adjustmentType = adjustForm.type; // Close modal immediately for better UX
            onClose();
            setAdjustForm({
              amount: '',
              reason: '',
              type: 'add'
            });

            // Show loading notification
            showSuccess('Jarayon amalga oshirilmoqda...');
            _context.p = 3;
            _context.n = 4;
            return onSave(adjustmentData);
          case 4:
            // Show success message
            showSuccess(adjustmentType === 'add' ? "Qarz miqdori ".concat((0, _formatUtils.formatNumberWithSpaces)(adjustmentAmount.toString()), " ").concat(debt.currency || currency, " ga oshirildi") : "Qarz miqdori ".concat((0, _formatUtils.formatNumberWithSpaces)(adjustmentAmount.toString()), " ").concat(debt.currency || currency, " ga kamaytirildi"));
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Error adjusting debt amount:', _t);
            showError('Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[3, 5]]);
    }));
    return function handleSave() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    id: "adjust-modal-backdrop",
    className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn",
    onClick: handleBackdropClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-md animate-slideUp",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative p-4 ".concat(adjustForm.type === 'add' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500')
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white"
  }, adjustForm.type === 'add' ? t('debts.form.increaseAmount', 'Qarz miqdorini oshirish') : t('debts.form.decreaseAmount', 'Qarz miqdorini kamaytirish')), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-sm"
  }, debt.creditor, " uchun")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, t('debts.form.currentAmount', 'Hozirgi miqdor')), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold text-gray-800 dark:text-white"
  }, (0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency || 'UZS', language)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, adjustForm.type === 'add' ? t('debts.form.amountToAdd', 'Qo\'shiladigan miqdor') : t('debts.form.amountToSubtract', 'Ayiriladigan miqdor'), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: adjustForm.amount,
    onChange: function onChange(e) {
      var formattedValue = (0, _formatUtils.formatNumberWithSpaces)(e.target.value);
      setAdjustForm(_objectSpread(_objectSpread({}, adjustForm), {}, {
        amount: formattedValue
      }));
    },
    placeholder: "0",
    className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  }, t('debts.form.adjustmentReason', 'Sabab')), /*#__PURE__*/React.createElement("textarea", {
    value: adjustForm.reason,
    onChange: function onChange(e) {
      return setAdjustForm(_objectSpread(_objectSpread({}, adjustForm), {}, {
        reason: e.target.value
      }));
    },
    placeholder: t('debts.form.adjustmentReasonPlaceholder', 'O\'zgartirish sababini kiriting...'),
    rows: 3,
    className: "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
  })), adjustForm.type === 'subtract' && (0, _formatUtils.parseFormattedNumber)(adjustForm.amount) > debt.amount && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-red-700 dark:text-red-300 text-sm"
  }, t('debts.form.adjustmentError', 'Ayiriladigan miqdor hozirgi qarz miqdoridan katta bo\'lishi mumkin emas.'))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
  }, t('common.cancel', 'Bekor qilish')), /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    disabled: !adjustForm.amount || adjustForm.type === 'subtract' && (0, _formatUtils.parseFormattedNumber)(adjustForm.amount) > debt.amount,
    className: "flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ".concat(adjustForm.type === 'add' ? 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400', " disabled:cursor-not-allowed")
  }, adjustForm.type === 'add' ? t('debts.form.addAmount', 'Qo\'shish') : t('debts.form.subtractAmount', 'Ayirish'))))));
}