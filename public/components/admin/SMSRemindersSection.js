"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SMSRemindersSection = SMSRemindersSection;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function SMSRemindersSection() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    smsData = _useState2[0],
    setSmsData = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)('3days'),
    _useState6 = _slicedToArray(_useState5, 2),
    selectedTemplate = _useState6[0],
    setSelectedTemplate = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    copiedIndex = _useState8[0],
    setCopiedIndex = _useState8[1];
  (0, _react.useEffect)(function () {
    fetchSMSReminders();
  }, [selectedTemplate]);
  var fetchSMSReminders = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return (0, _api.apiFetch)("/admin/sms-reminders?template=".concat(selectedTemplate), {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token'))
              }
            });
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            data = _context.v;
            setSmsData(data.smsData || []);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching SMS reminders:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchSMSReminders() {
      return _ref.apply(this, arguments);
    };
  }();
  var copyToClipboard = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text, index) {
      var _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return navigator.clipboard.writeText(text);
          case 1:
            setCopiedIndex(index);
            setTimeout(function () {
              return setCopiedIndex(null);
            }, 2000);
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Failed to copy text:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function copyToClipboard(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getSMSTemplate = function getSMSTemplate(daysLeft, debtorName, amount, dueDate) {
    var templates = {
      '3days': "Hurmatli ".concat(debtorName, "! Sizning ").concat(amount.toLocaleString(), " UZS qarzingiz ").concat(dueDate, " sanasida, ya'ni 3 kun ichida to'lanishi kerak. Iltimos, o'z vaqtida to'lang. Qarzdaftar.uz"),
      '1day': "Diqqat! ".concat(debtorName, ", sizning ").concat(amount.toLocaleString(), " UZS qarzingiz ertaga (").concat(dueDate, ") to'lanishi kerak. Iltimos, kechiktirmang. Qarzdaftar.uz"),
      'overdue': "".concat(debtorName, "! Sizning ").concat(amount.toLocaleString(), " UZS qarzingiz muddati o'tib ketdi (").concat(dueDate, "). Zudlik bilan to'lang. Qarzdaftar.uz"),
      'weekly': "Eslatma: ".concat(debtorName, ", sizning ").concat(amount.toLocaleString(), " UZS qarzingiz ").concat(dueDate, " sanasida to'lanishi kerak. Qarzdaftar.uz")
    };
    return templates[selectedTemplate] || templates['3days'];
  };
  var getTemplateInfo = function getTemplateInfo(template) {
    var info = {
      '3days': {
        title: '3 kun qolgan qarzlar',
        color: 'yellow',
        icon: '⏰'
      },
      '1day': {
        title: '1 kun qolgan qarzlar',
        color: 'orange',
        icon: '🚨'
      },
      'overdue': {
        title: 'Muddati o\'tgan qarzlar',
        color: 'red',
        icon: '❌'
      },
      'weekly': {
        title: 'Haftalik eslatma',
        color: 'blue',
        icon: '📅'
      }
    };
    return info[template] || info['3days'];
  };
  var templateInfo = getTemplateInfo(selectedTemplate);
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, _toConsumableArray(Array(5)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "h-20 bg-gray-300 dark:bg-gray-600 rounded"
      });
    }))));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-2xl font-bold text-gray-900 dark:text-white mb-2"
  }, "\uD83D\uDCF1 SMS Eslatmalar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, "Foydalanuvchilar uchun SMS eslatma xabarlari")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-4 sm:mt-0"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ".concat(templateInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : templateInfo.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' : templateInfo.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300')
  }, templateInfo.icon, " ", smsData.length, " ta xabar"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-wrap gap-2"
  }, [{
    key: '3days',
    label: '3 kun qolgan',
    icon: '⏰'
  }, {
    key: '1day',
    label: '1 kun qolgan',
    icon: '🚨'
  }, {
    key: 'overdue',
    label: 'Muddati o\'tgan',
    icon: '❌'
  }, {
    key: 'weekly',
    label: 'Haftalik',
    icon: '📅'
  }].map(function (template) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      key: template.key,
      onClick: function onClick() {
        return setSelectedTemplate(template.key);
      },
      className: "px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ".concat(selectedTemplate === template.key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600')
    }, /*#__PURE__*/_react["default"].createElement("span", null, template.icon), /*#__PURE__*/_react["default"].createElement("span", null, template.label));
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, smsData.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-12 h-12 text-gray-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  }))), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg font-medium text-gray-900 dark:text-white mb-2"
  }, "SMS xabarlari yo'q"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400"
  }, templateInfo.title, " uchun SMS xabarlari topilmadi")) : smsData.map(function (item, index) {
    var _item$debtorName, _item$amount;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(item.userId, "-").concat(item.debtId, "-").concat(index),
      className: "bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-start justify-between"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-3 mb-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold"
    }, ((_item$debtorName = item.debtorName) === null || _item$debtorName === void 0 || (_item$debtorName = _item$debtorName.charAt(0)) === null || _item$debtorName === void 0 ? void 0 : _item$debtorName.toUpperCase()) || '?'), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, item.debtorName || 'Noma\'lum'), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, item.phone || 'Telefon yo\'q', " \u2022 Egasi: ", item.ownerName || 'Noma\'lum'))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, "Qarz miqdori"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, ((_item$amount = item.amount) === null || _item$amount === void 0 ? void 0 : _item$amount.toLocaleString()) || 0, " UZS")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, "Muddat"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, "Qolgan kunlar"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-semibold ".concat(item.daysLeft < 0 ? 'text-red-600 dark:text-red-400' : item.daysLeft <= 1 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400')
    }, item.daysLeft < 0 ? "".concat(Math.abs(item.daysLeft), " kun kechikdi") : "".concat(item.daysLeft, " kun")))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-medium text-gray-700 dark:text-gray-300"
    }, "SMS Xabari:"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return copyToClipboard(getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'), index);
      },
      className: "px-3 py-1 rounded-lg text-sm font-medium transition-colors ".concat(copiedIndex === index ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800')
    }, copiedIndex === index ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 inline mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M5 13l4 4L19 7"
    })), "Nusxalandi") : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-4 h-4 inline mr-1",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    })), "Nusxalash"))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-gray-900 dark:text-white text-sm leading-relaxed"
    }, getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum')), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-2 text-xs text-gray-500 dark:text-gray-400"
    }, "Xabar uzunligi: ", getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum').length, " belgi")))));
  })), smsData.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, smsData.length), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Jami xabarlar")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, smsData.reduce(function (sum, item) {
    return sum + getSMSTemplate(item.daysLeft, item.debtorName, item.amount, item.dueDate ? new Date(item.dueDate).toLocaleDateString('uz-UZ') : 'Noma\'lum').length;
  }, 0)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Jami belgilar")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, new Set(smsData.map(function (item) {
    return item.userId;
  })).size), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Foydalanuvchilar")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-900 dark:text-white"
  }, smsData.reduce(function (sum, item) {
    return sum + (item.amount || 0);
  }, 0).toLocaleString()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Jami qarz (UZS)")))));
}