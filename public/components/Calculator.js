"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarCalculator = QarzdaftarCalculator;
var _react = _interopRequireWildcard(require("react"));
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _formatUtils = require("../utils/formatUtils");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarCalculator() {
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings; // Get theme settings
  var t = (0, _translationUtils.useTranslation)(language);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showCalculator = _useState2[0],
    setShowCalculator = _useState2[1];
  var _useState3 = (0, _react.useState)('0'),
    _useState4 = _slicedToArray(_useState3, 2),
    calculatorValue = _useState4[0],
    setCalculatorValue = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    calculatorHistory = _useState6[0],
    setCalculatorHistory = _useState6[1];
  var _useState7 = (0, _react.useState)('UZS'),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedCurrency = _useState8[0],
    setSelectedCurrency = _useState8[1];
  var _useState9 = (0, _react.useState)({
      USD: 12300,
      // 1 USD = 12,300 UZS (updated to accurate rate)
      EUR: 13400,
      // 1 EUR = 13,400 UZS
      RUB: 145,
      // 1 RUB = 145 UZS
      TJS: 1150,
      // 1 TJS (Tajikistan Somoni) = 1,150 UZS
      UZS: 1 // Base currency
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    exchangeRates = _useState0[0],
    setExchangeRates = _useState0[1];

  // Calculator history state
  var _useState1 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    calculationHistory = _useState10[0],
    setCalculationHistory = _useState10[1];

  // Sidebar Calculator states
  var _useState11 = (0, _react.useState)('0'),
    _useState12 = _slicedToArray(_useState11, 2),
    sidebarCalculatorValue = _useState12[0],
    setSidebarCalculatorValue = _useState12[1];
  var _useState13 = (0, _react.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    sidebarCalculatorHistory = _useState14[0],
    setSidebarCalculatorHistory = _useState14[1];

  // Calculator functions
  var handleCalculatorInput = function handleCalculatorInput(value) {
    if (calculatorValue === '0' && value !== '.') {
      setCalculatorValue(value);
    } else {
      setCalculatorValue(calculatorValue + value);
    }
  };
  var handleCalculatorOperation = function handleCalculatorOperation(operation) {
    if (operation === 'C') {
      setCalculatorValue('0');
      setCalculatorHistory('');
    } else if (operation === '=') {
      try {
        // Replace × with * and ÷ with / for eval
        var expression = calculatorHistory + calculatorValue;
        var sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        var result = eval(sanitizedExpression);

        // Add to calculation history
        var calculation = {
          expression: expression,
          result: result,
          timestamp: new Date()
        };

        // Add to history (limit to 10 items)
        setCalculationHistory(function (prev) {
          var newHistory = [calculation].concat(_toConsumableArray(prev));
          return newHistory.slice(0, 10);
        });
        setCalculatorValue(result.toString());
        setCalculatorHistory('');
      } catch (error) {
        setCalculatorValue('Error');
      }
    } else {
      setCalculatorHistory(calculatorHistory + calculatorValue + operation);
      setCalculatorValue('0');
    }
  };
  var convertCurrency = function convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    // Exchange rates show how many UZS = 1 unit of foreign currency
    // So to convert FROM UZS TO foreign currency: UZS_amount / exchange_rate
    // To convert FROM foreign currency TO UZS: foreign_amount * exchange_rate

    var result;
    if (fromCurrency === 'UZS' && toCurrency !== 'UZS') {
      // Converting from UZS to foreign currency: divide by exchange rate
      result = amount / exchangeRates[toCurrency];
    } else if (fromCurrency !== 'UZS' && toCurrency === 'UZS') {
      // Converting from foreign currency to UZS: multiply by exchange rate
      result = amount * exchangeRates[fromCurrency];
    } else if (fromCurrency !== 'UZS' && toCurrency !== 'UZS') {
      // Converting between two foreign currencies: go through UZS
      var amountInUZS = amount * exchangeRates[fromCurrency];
      result = amountInUZS / exchangeRates[toCurrency];
    } else {
      result = amount; // UZS to UZS
    }
    return Math.round(result * 100) / 100; // Round to 2 decimal places
  };
  var handleCurrencyConversion = function handleCurrencyConversion(currency) {
    var currentAmount = parseFloat(calculatorValue) || 0;
    var convertedAmount = convertCurrency(currentAmount, selectedCurrency, currency);
    setCalculatorValue(convertedAmount.toString());
    setSelectedCurrency(currency);
  };
  var getCurrencySymbol = function getCurrencySymbol(currency) {
    var symbols = {
      USD: '$',
      EUR: '€',
      RUB: '₽',
      TJS: 'с.',
      UZS: 'so\'m'
    };
    return symbols[currency] || currency;
  };
  var applyCalculatorResult = function applyCalculatorResult() {
    var result = parseFloat(calculatorValue) || 0;
    var formattedResult = (0, _formatUtils.formatNumberWithSpaces)(result.toString());
    // In a real app, we would pass this result to wherever it's needed
    setShowCalculator(false);
  };

  // Sidebar Calculator functions
  var handleSidebarCalculatorInput = function handleSidebarCalculatorInput(value) {
    if (sidebarCalculatorValue === '0' && value !== '.') {
      setSidebarCalculatorValue(value);
    } else {
      setSidebarCalculatorValue(sidebarCalculatorValue + value);
    }
  };
  var handleSidebarCalculatorOperation = function handleSidebarCalculatorOperation(operation) {
    if (operation === 'C') {
      setSidebarCalculatorValue('0');
      setSidebarCalculatorHistory('');
    } else if (operation === '=') {
      try {
        // Replace × with * and ÷ with / for eval
        var expression = sidebarCalculatorHistory + sidebarCalculatorValue;
        var sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        var result = eval(sanitizedExpression);

        // Add to calculation history
        var calculation = {
          expression: expression,
          result: result,
          timestamp: new Date()
        };

        // Add to history (limit to 10 items)
        setCalculationHistory(function (prev) {
          var newHistory = [calculation].concat(_toConsumableArray(prev));
          return newHistory.slice(0, 10);
        });
        setSidebarCalculatorValue(result.toString());
        setSidebarCalculatorHistory('');
      } catch (error) {
        setSidebarCalculatorValue('Error');
      }
    } else {
      setSidebarCalculatorHistory(sidebarCalculatorHistory + sidebarCalculatorValue + operation);
      setSidebarCalculatorValue('0');
    }
  };

  // Function to clear history
  var clearHistory = function clearHistory() {
    setCalculationHistory([]);
  };

  // Determine if dark mode is active
  var isDarkMode = settings.theme === 'dark';

  // Keyboard event handler for calculator
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      // Prevent default behavior for keys we're handling
      if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(event.key)) {
        event.preventDefault();
      }

      // Handle number keys
      if (/[0-9]/.test(event.key)) {
        handleCalculatorInput(event.key);
      }
      // Handle operator keys
      else if (event.key === '+') {
        handleCalculatorOperation('+');
      } else if (event.key === '-') {
        handleCalculatorOperation('-');
      } else if (event.key === '*') {
        handleCalculatorOperation('×');
      } else if (event.key === '/') {
        handleCalculatorOperation('÷');
      }
      // Handle decimal point
      else if (event.key === '.') {
        handleCalculatorInput('.');
      }
      // Handle Enter/Return for equals
      else if (event.key === 'Enter' || event.key === '=') {
        handleCalculatorOperation('=');
      }
      // Handle Escape for clear
      else if (event.key === 'Escape') {
        handleCalculatorOperation('C');
      }
      // Handle Backspace for deleting last character
      else if (event.key === 'Backspace') {
        if (calculatorValue.length > 1) {
          setCalculatorValue(calculatorValue.slice(0, -1));
        } else {
          setCalculatorValue('0');
        }
      }
    };

    // Add event listener when calculator is open
    if (showCalculator) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup event listener
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCalculator, calculatorValue, calculatorHistory]);

  // Keyboard event handler for sidebar calculator
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      // Prevent default behavior for keys we're handling
      if (/[0-9+\-*/.=]|Enter|Escape|Backspace/.test(event.key)) {
        event.preventDefault();
      }

      // Handle number keys
      if (/[0-9]/.test(event.key)) {
        handleSidebarCalculatorInput(event.key);
      }
      // Handle operator keys
      else if (event.key === '+') {
        handleSidebarCalculatorOperation('+');
      } else if (event.key === '-') {
        handleSidebarCalculatorOperation('-');
      } else if (event.key === '*') {
        handleSidebarCalculatorOperation('×');
      } else if (event.key === '/') {
        handleSidebarCalculatorOperation('÷');
      }
      // Handle decimal point
      else if (event.key === '.') {
        handleSidebarCalculatorInput('.');
      }
      // Handle Enter/Return for equals
      else if (event.key === 'Enter' || event.key === '=') {
        handleSidebarCalculatorOperation('=');
      }
      // Handle Escape for clear
      else if (event.key === 'Escape') {
        handleSidebarCalculatorOperation('C');
      }
      // Handle Backspace for deleting last character
      else if (event.key === 'Backspace') {
        if (sidebarCalculatorValue.length > 1) {
          setSidebarCalculatorValue(sidebarCalculatorValue.slice(0, -1));
        } else {
          setSidebarCalculatorValue('0');
        }
      }
    };

    // Add event listener for sidebar calculator
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarCalculatorValue, sidebarCalculatorHistory]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-3xl font-bold text-gray-800 mb-2 dark:text-white"
  }, t('calculator.title', 'Kalkulyator')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-300"
  }, t('calculator.subtitle', 'Asosiy matematik hisob-kitoblar'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col lg:flex-row gap-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "order-1 lg:order-2 lg:w-2/3 rounded-2xl p-6 shadow-xl ".concat(isDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/30 border border-white/20')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 mb-4 text-right ".concat(isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm mb-1 h-6 ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, sidebarCalculatorHistory), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-3xl font-bold ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
  }, (0, _formatUtils.formatNumberWithSpaces)(sidebarCalculatorValue))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('7');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonSeven', '7')
  }, t('calculator.buttonSeven', '7')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('8');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonEight', '8')
  }, t('calculator.buttonEight', '8')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('9');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonNine', '9')
  }, t('calculator.buttonNine', '9')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('÷');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'),
    title: t('calculator.buttonDivide', 'Bo\'lish')
  }, t('calculator.buttonDivide', '÷')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('4');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonFour', '4')
  }, t('calculator.buttonFour', '4')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('5');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonFive', '5')
  }, t('calculator.buttonFive', '5')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('6');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonSix', '6')
  }, t('calculator.buttonSix', '6')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('×');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'),
    title: t('calculator.buttonMultiply', 'Ko\'paytirish')
  }, t('calculator.buttonMultiply', '×')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('1');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonOne', '1')
  }, t('calculator.buttonOne', '1')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('2');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonTwo', '2')
  }, t('calculator.buttonTwo', '2')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('3');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonThree', '3')
  }, t('calculator.buttonThree', '3')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('-');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'),
    title: t('calculator.buttonSubtract', 'Ayirish')
  }, t('calculator.buttonSubtract', '-')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('0');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonZero', '0')
  }, t('calculator.buttonZero', '0')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorInput('.');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonDecimal', 'Nuqta')
  }, t('calculator.buttonDecimal', '.')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('C');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'),
    title: t('calculator.buttonClear', 'Tozalash')
  }, t('calculator.buttonClear', 'C')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('+');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'),
    title: t('calculator.buttonAdd', 'Qo\'shish')
  }, t('calculator.buttonAdd', '+')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleSidebarCalculatorOperation('=');
    },
    className: "col-span-4 p-3 rounded-lg font-semibold transition-all ".concat(isDarkMode ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'),
    title: t('calculator.buttonEquals', 'Hisoblash')
  }, t('calculator.buttonEquals', '=')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "order-2 lg:order-1 lg:w-1/3 rounded-2xl p-6 shadow-xl ".concat(isDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/30 border border-white/20')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center mb-4"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
  }, t('calculator.history', 'Hisoblash tarixi')), calculationHistory.length > 0 && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: clearHistory,
    className: "text-sm px-3 py-1 rounded-lg ".concat(isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white')
  }, t('common.clear', 'Tozalash'))), calculationHistory.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-12 w-12 mx-auto mb-3 ".concat(isDarkMode ? 'text-gray-500' : 'text-gray-400'),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: isDarkMode ? 'text-gray-400' : 'text-gray-500'
  }, t('calculator.noHistory', 'Hali hisoblash amalga oshirilmagan'))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-3 max-h-[500px] overflow-y-auto pr-2"
  }, calculationHistory.map(function (calc, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "p-4 rounded-xl transition-all hover:scale-[1.02] ".concat(isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white hover:bg-gray-50')
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-mono ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
    }, calc.expression, " ="), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-xl font-bold mt-1 ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
    }, (0, _formatUtils.formatNumberWithSpaces)(calc.result.toString())), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-xs mt-2 ".concat(isDarkMode ? 'text-gray-400' : 'text-gray-500')
    }, calc.timestamp.toLocaleTimeString()));
  })))), showCalculator && /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
    onClick: function onClick(e) {
      return e.target.id === 'calculator-backdrop' && setShowCalculator(false);
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "calculator-backdrop",
    className: "rounded-2xl p-6 shadow-xl w-full max-w-sm ".concat(isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center mb-4"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
  }, t('calculator.title', 'Kalkulyator')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setShowCalculator(false);
    },
    className: "hover:text-gray-700 ".concat(isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'),
    title: t('common.close', 'Yopish')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 text-right ".concat(isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm mb-1 ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, calculatorHistory, " ", getCurrencySymbol(selectedCurrency)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
  }, (0, _formatUtils.formatNumberWithSpaces)(calculatorValue), " ", getCurrencySymbol(selectedCurrency)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-4 p-3 rounded-lg ".concat(isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-xs mb-2 ".concat(isDarkMode ? 'text-blue-300' : 'text-gray-600')
  }, t('calculator.exchangeRates', 'Valyuta kurslari:')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 gap-1 text-xs"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: isDarkMode ? 'text-white' : 'text-gray-800'
  }, "1 USD = ", exchangeRates.USD.toLocaleString(), " UZS"), /*#__PURE__*/_react["default"].createElement("div", {
    className: isDarkMode ? 'text-white' : 'text-gray-800'
  }, "1 EUR = ", exchangeRates.EUR.toLocaleString(), " UZS"), /*#__PURE__*/_react["default"].createElement("div", {
    className: isDarkMode ? 'text-white' : 'text-gray-800'
  }, "1 RUB = ", exchangeRates.RUB, " UZS"), /*#__PURE__*/_react["default"].createElement("div", {
    className: isDarkMode ? 'text-white' : 'text-gray-800'
  }, "1 TJS = ", exchangeRates.TJS.toLocaleString(), " UZS"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-4 gap-2 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('1');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonOne', '1')
  }, t('calculator.buttonOne', '1')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('2');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonTwo', '2')
  }, t('calculator.buttonTwo', '2')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('3');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonThree', '3')
  }, t('calculator.buttonThree', '3')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('C');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'),
    title: t('calculator.buttonClear', 'Tozalash')
  }, t('calculator.buttonClear', 'C')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('4');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonFour', '4')
  }, t('calculator.buttonFour', '4')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('5');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonFive', '5')
  }, t('calculator.buttonFive', '5')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('6');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonSix', '6')
  }, t('calculator.buttonSix', '6')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCurrencyConversion('USD');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'),
    title: t('calculator.convertToUSD', 'USD ga konvertatsiya')
  }, t('common.USD', 'USD')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('7');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonSeven', '7')
  }, t('calculator.buttonSeven', '7')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('8');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonEight', '8')
  }, t('calculator.buttonEight', '8')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('9');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonNine', '9')
  }, t('calculator.buttonNine', '9')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCurrencyConversion('EUR');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'),
    title: t('calculator.convertToEUR', 'EUR ga konvertatsiya')
  }, t('common.EUR', 'EUR')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('0');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonZero', '0')
  }, t('calculator.buttonZero', '0')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorInput('.');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'),
    title: t('calculator.buttonDecimal', 'Nuqta')
  }, t('calculator.buttonDecimal', '.')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('=');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'),
    title: t('calculator.buttonEquals', 'Hisoblash')
  }, t('calculator.buttonEquals', '=')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCurrencyConversion('RUB');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'),
    title: t('calculator.convertToRUB', 'RUB ga konvertatsiya')
  }, t('common.RUB', 'RUB'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 gap-2 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCurrencyConversion('TJS');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'),
    title: t('calculator.convertToTJS', 'TJS (Tojikiston somoni) ga konvertatsiya')
  }, t('common.TJS', 'TJS')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCurrencyConversion('UZS');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'),
    title: t('calculator.convertToUZS', 'UZS ga konvertatsiya')
  }, t('common.UZS', 'UZS'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-4 gap-2 mb-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('+');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'),
    title: t('calculator.buttonAdd', 'Qo\'shish')
  }, t('calculator.buttonAdd', '+')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('-');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'),
    title: t('calculator.buttonSubtract', 'Ayirish')
  }, t('calculator.buttonSubtract', '-')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('×');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'),
    title: t('calculator.buttonMultiply', 'Ko\'paytirish')
  }, t('calculator.buttonMultiply', '×')), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return handleCalculatorOperation('÷');
    },
    className: "p-3 rounded-lg font-semibold transition-colors ".concat(isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'),
    title: t('calculator.buttonDivide', 'Bo\'lish')
  }, t('calculator.buttonDivide', '÷'))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: applyCalculatorResult,
    className: "w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 ".concat(isDarkMode ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'),
    title: t('calculator.applyResult', 'Natijani qo\'llash')
  }, t('calculator.applyResult', 'Natijani qo\'llash')))));
}