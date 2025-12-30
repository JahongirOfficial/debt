"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditDebtModal = EditDebtModal;
var _react = require("react");
var _formatUtils = require("../../utils/formatUtils");
var _translationUtils = require("../../utils/translationUtils");
var _storageUtils = require("../../utils/storageUtils");
var _BranchContext = require("../../utils/BranchContext");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function EditDebtModal(_ref) {
  var isOpen = _ref.isOpen,
    debt = _ref.debt,
    onClose = _ref.onClose,
    onSave = _ref.onSave;
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useBranches = (0, _BranchContext.useBranches)(),
    activeBranch = _useBranches.activeBranch;
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)({
      amount: '',
      phone: '',
      countryCode: '+998',
      reason: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    editForm = _useState2[0],
    setEditForm = _useState2[1];

  // Country codes with flags
  var countryCodes = [{
    code: '+998',
    country: 'UZ',
    flag: '🇺🇿',
    name: 'Uzbekistan'
  }, {
    code: '+7',
    country: 'RU',
    flag: '🇷🇺',
    name: 'Russia'
  }, {
    code: '+992',
    country: 'TJ',
    flag: '🇹🇯',
    name: 'Tajikistan'
  }, {
    code: '+1',
    country: 'US',
    flag: '🇺🇸',
    name: 'USA'
  }, {
    code: '+44',
    country: 'GB',
    flag: '🇬🇧',
    name: 'UK'
  }, {
    code: '+77',
    country: 'KZ',
    flag: '🇰🇿',
    name: 'Kazakhstan'
  }];

  // Initialize form when debt changes
  (0, _react.useEffect)(function () {
    if (debt) {
      setEditForm({
        amount: (0, _formatUtils.formatNumberWithSpaces)(debt.amount.toString()),
        phone: debt.phone || '',
        countryCode: debt.countryCode || '+998',
        reason: ''
      });
    }
  }, [debt]);

  // Handle phone number input change
  var handlePhoneChange = function handlePhoneChange(e) {
    var inputValue = e.target.value;
    var currentCountryCode = editForm.countryCode;
    var digitsOnly = inputValue.replace(/\D/g, '');
    var formattedNumber = '';
    var maxDigits = 9;
    if (currentCountryCode === '+998') {
      maxDigits = 9;
      var limitedDigits = digitsOnly.slice(0, maxDigits);
      if (limitedDigits.length > 0) {
        formattedNumber += limitedDigits.slice(0, 2);
        if (limitedDigits.length > 2) formattedNumber += ' ' + limitedDigits.slice(2, 5);
        if (limitedDigits.length > 5) formattedNumber += ' ' + limitedDigits.slice(5, 7);
        if (limitedDigits.length > 7) formattedNumber += ' ' + limitedDigits.slice(7, 9);
      }
    } else if (currentCountryCode === '+7' || currentCountryCode === '+77') {
      maxDigits = 10;
      var _limitedDigits = digitsOnly.slice(0, maxDigits);
      if (_limitedDigits.length > 0) {
        formattedNumber += _limitedDigits.slice(0, 3);
        if (_limitedDigits.length > 3) formattedNumber += ' ' + _limitedDigits.slice(3, 6);
        if (_limitedDigits.length > 6) formattedNumber += ' ' + _limitedDigits.slice(6, 8);
        if (_limitedDigits.length > 8) formattedNumber += ' ' + _limitedDigits.slice(8, 10);
      }
    } else if (currentCountryCode === '+992') {
      maxDigits = 9;
      var _limitedDigits2 = digitsOnly.slice(0, maxDigits);
      if (_limitedDigits2.length > 0) {
        formattedNumber += _limitedDigits2.slice(0, 2);
        if (_limitedDigits2.length > 2) formattedNumber += ' ' + _limitedDigits2.slice(2, 5);
        if (_limitedDigits2.length > 5) formattedNumber += ' ' + _limitedDigits2.slice(5, 7);
        if (_limitedDigits2.length > 7) formattedNumber += ' ' + _limitedDigits2.slice(7, 9);
      }
    } else {
      maxDigits = 10;
      var _limitedDigits3 = digitsOnly.slice(0, maxDigits);
      if (_limitedDigits3.length > 0) {
        formattedNumber += _limitedDigits3.slice(0, 3);
        if (_limitedDigits3.length > 3) formattedNumber += ' ' + _limitedDigits3.slice(3, 6);
        if (_limitedDigits3.length > 6) formattedNumber += ' ' + _limitedDigits3.slice(6, 10);
      }
    }
    setEditForm(_objectSpread(_objectSpread({}, editForm), {}, {
      phone: formattedNumber
    }));
  };

  // Handle amount change
  var handleAmountChange = function handleAmountChange(e) {
    var inputValue = e.target.value;
    var formattedValue = (0, _formatUtils.formatNumberWithSpaces)(inputValue);
    setEditForm(_objectSpread(_objectSpread({}, editForm), {}, {
      amount: formattedValue
    }));
  };

  // Handle country code change
  var handleCountryCodeChange = function handleCountryCodeChange(newCountryCode) {
    setEditForm(_objectSpread(_objectSpread({}, editForm), {}, {
      countryCode: newCountryCode,
      phone: ''
    }));
  };

  // Handle form submission
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var updateData;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            if (editForm.amount.trim()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            updateData = {
              amount: (0, _formatUtils.parseFormattedNumber)(editForm.amount),
              phone: editForm.phone,
              countryCode: editForm.countryCode,
              reason: editForm.reason
            }; // Close modal immediately for better UX
            onClose();

            // Reset form
            setEditForm({
              amount: '',
              phone: '',
              countryCode: '+998',
              reason: ''
            });

            // Call API in background
            _context.n = 2;
            return onSave(updateData);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

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
    if (e.target.id === 'edit-modal-backdrop') {
      onClose();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "edit-modal-backdrop",
    className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn",
    onClick: handleBackdropClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-[443px] max-h-[92vh] overflow-hidden animate-slideUp",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 backdrop-blur-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-white mb-1"
  }, t('debts.form.editDebt', 'Qarzni tahrirlash')), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 text-xs"
  }, debt.creditor, " uchun qarz ma'lumotlarini yangilash")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
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
  }))))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 space-y-3.5 max-h-[calc(92vh-140px)] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-3.5 w-3.5 text-blue-500",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  })), t('debts.form.creditor', 'Kreditor nomi'))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: debt.creditor,
    disabled: true,
    className: "w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium cursor-not-allowed text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-3.5 w-3.5 text-indigo-500",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
  })), t('debts.form.amount', 'Qarz miqdori'), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*"))), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: t('debts.form.amountPlaceholder', 'Masalan: 1 000 000'),
    value: editForm.amount,
    onChange: handleAmountChange,
    className: "w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400 text-sm",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium text-xs"
  }, debt.currency || 'UZS'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-3.5 w-3.5 text-purple-500",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  })), t('debts.form.phone', 'Telefon raqami'), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-xs"
  }, "(", t('debts.form.optional', 'ixtiyoriy'), ")"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-32"
  }, /*#__PURE__*/React.createElement("select", {
    value: editForm.countryCode,
    onChange: function onChange(e) {
      return handleCountryCodeChange(e.target.value);
    },
    className: "w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400 appearance-none cursor-pointer text-sm"
  }, countryCodes.map(function (country) {
    return /*#__PURE__*/React.createElement("option", {
      key: country.code,
      value: country.code
    }, country.flag, " ", country.code);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "XX XXX XX XX",
    value: editForm.phone,
    onChange: handlePhoneChange,
    className: "w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400 text-sm"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-3.5 w-3.5 text-gray-500",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  })), t('debts.form.reason', 'Sabab'), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-xs"
  }, "(", t('debts.form.optional', 'ixtiyoriy'), ")"))), /*#__PURE__*/React.createElement("textarea", {
    placeholder: t('debts.form.reasonPlaceholder', 'O\'zgarish sababi'),
    value: editForm.reason,
    onChange: function onChange(e) {
      return setEditForm(_objectSpread(_objectSpread({}, editForm), {}, {
        reason: e.target.value
      }));
    },
    className: "w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-white font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-400 resize-none text-sm",
    rows: "2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 text-sm"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })), t('common.cancel', 'Bekor qilish')), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1.5 shadow-lg hover:shadow-xl text-sm"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-4 w-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  })), t('common.save', 'Saqlash')))))));
}