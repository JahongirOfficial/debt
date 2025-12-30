"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminSMSRemindersPage = AdminSMSRemindersPage;
var _react = require("react");
var _api = require("../../utils/api");
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
function AdminSMSRemindersPage() {
  // State variables
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    debts = _useState2[0],
    setDebts = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    filteredDebts = _useState4[0],
    setFilteredDebts = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var _useState9 = (0, _react.useState)('all'),
    _useState0 = _slicedToArray(_useState9, 2),
    selectedPeriod = _useState0[0],
    setSelectedPeriod = _useState0[1];
  var _useState1 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    selectedDebts = _useState10[0],
    setSelectedDebts = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showPreview = _useState12[0],
    setShowPreview = _useState12[1];
  var _useState13 = (0, _react.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    previewMessages = _useState14[0],
    setPreviewMessages = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    copyingId = _useState16[0],
    setCopyingId = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    copyingAll = _useState18[0],
    setCopyingAll = _useState18[1];

  // SMS Templates
  var _useState19 = (0, _react.useState)({
      overdue: 'Hurmatli {name}, sizning {amount} UZS miqdoridagi qarzingiz {days} kun kechikmoqda. Iltimos, imkon qadar tezroq to\'lang.',
      reminder: 'Hurmatli {name}, sizning {amount} UZS miqdoridagi qarzingiz {date} sanasida tugaydi. Iltimos, vaqtida to\'lang.',
      urgent: 'DIQQAT! {name}, sizning {amount} UZS qarzingiz {days} kundan beri kechikmoqda. Zudlik bilan to\'lang!'
    }),
    _useState20 = _slicedToArray(_useState19, 1),
    smsTemplates = _useState20[0];

  // Load data on component mount
  (0, _react.useEffect)(function () {
    loadDebtsData();
  }, []);

  // Filter debts when data or period changes
  (0, _react.useEffect)(function () {
    applyFilter();
  }, [debts, selectedPeriod]);

  // API call to fetch all debts
  var loadDebtsData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, result, errorResult, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            setError(null);
            console.log('🔄 Loading debts from API...');
            _context.n = 1;
            return (0, _api.apiFetch)('/admin/all-debts', {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token'))
              }
            });
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 5;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            result = _context.v;
            console.log('✅ API Response:', result);
            if (!(result.success && Array.isArray(result.debts))) {
              _context.n = 3;
              break;
            }
            console.log("\uD83D\uDCCA Loaded ".concat(result.debts.length, " debts"));
            setDebts(result.debts);
            _context.n = 4;
            break;
          case 3:
            throw new Error('Invalid API response format');
          case 4:
            _context.n = 7;
            break;
          case 5:
            _context.n = 6;
            return response.json();
          case 6:
            errorResult = _context.v;
            throw new Error(errorResult.message || 'Failed to load debts');
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            console.error('❌ Error loading debts:', _t);
            setError(_t.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi');
          case 9:
            _context.p = 9;
            setLoading(false);
            return _context.f(9);
          case 10:
            return _context.a(2);
        }
      }, _callee, null, [[0, 8, 9, 10]]);
    }));
    return function loadDebtsData() {
      return _ref.apply(this, arguments);
    };
  }();

  // Helper function to get creditor name with fallbacks
  var getCreditorName = function getCreditorName(debt) {
    var _debt$debtor;
    // Try different name fields in order of preference
    if (debt.creditorName && debt.creditorName.trim()) {
      return debt.creditorName.trim();
    }
    if (debt.debtorName && debt.debtorName.trim()) {
      return debt.debtorName.trim();
    }
    if ((_debt$debtor = debt.debtor) !== null && _debt$debtor !== void 0 && _debt$debtor.name && debt.debtor.name.trim()) {
      return debt.debtor.name.trim();
    }
    return 'Noma\'lum';
  };

  // Helper function to get creditor phone with fallbacks
  var getCreditorPhone = function getCreditorPhone(debt) {
    var _debt$debtor2;
    // Try different phone fields in order of preference
    if (debt.creditorPhone && debt.creditorPhone.trim()) {
      return debt.creditorPhone.trim();
    }
    if (debt.debtorPhone && debt.debtorPhone.trim()) {
      return debt.debtorPhone.trim();
    }
    if ((_debt$debtor2 = debt.debtor) !== null && _debt$debtor2 !== void 0 && _debt$debtor2.phone && debt.debtor.phone.trim()) {
      return debt.debtor.phone.trim();
    }
    return 'Telefon yo\'q';
  };

  // Helper function to format amount
  var formatAmount = function formatAmount(amount) {
    if (!amount || isNaN(amount)) return '0';
    return Number(amount).toLocaleString('uz-UZ');
  };

  // Helper function to format date
  var formatDate = function formatDate(dateString) {
    if (!dateString) return 'Sana yo\'q';
    try {
      var date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Noto\'g\'ri sana';
      }
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Noto\'g\'ri sana';
    }
  };

  // Helper function to calculate days overdue
  var getDaysOverdue = function getDaysOverdue(dueDate) {
    if (!dueDate) return 0;
    var now = new Date();
    var due = new Date(dueDate);
    var diffTime = now - due;
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Helper function to get status text
  var getStatusText = function getStatusText(debt) {
    if (!debt.dueDate) return 'Sana yo\'q';
    var daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 0) {
      return "".concat(daysOverdue, " kun kechikdi");
    }
    var dueDate = new Date(debt.dueDate);
    var now = new Date();
    var daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    if (daysUntilDue === 0) return 'Bugun tugaydi';
    if (daysUntilDue > 0) return "".concat(daysUntilDue, " kun qoldi");
    return 'Muddati o\'tgan';
  };

  // Helper function to get status color
  var getStatusColor = function getStatusColor(debt) {
    var daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 7) return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
    if (daysOverdue > 0) return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
  };

  // Filter debts based on selected period
  var applyFilter = function applyFilter() {
    if (!debts || debts.length === 0) {
      setFilteredDebts([]);
      return;
    }
    console.log("\uD83D\uDD0D Filtering ".concat(debts.length, " debts by period: ").concat(selectedPeriod));
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var filtered = [];
    switch (selectedPeriod) {
      case 'overdue':
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate < now && debt.status !== 'paid';
        });
        break;
      case 'due_today':
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === now.getTime() && debt.status !== 'paid';
        });
        break;
      case 'due_1day':
        var tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === tomorrow.getTime() && debt.status !== 'paid';
        });
        break;
      case 'due_2days':
        var twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === twoDaysLater.getTime() && debt.status !== 'paid';
        });
        break;
      case 'due_3days':
        var threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === threeDaysLater.getTime() && debt.status !== 'paid';
        });
        break;
      case 'due_week':
        var weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        filtered = debts.filter(function (debt) {
          if (!debt.dueDate) return false;
          var dueDate = new Date(debt.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate >= now && dueDate <= weekLater && debt.status !== 'paid';
        });
        break;
      default:
        // 'all'
        filtered = debts.filter(function (debt) {
          return debt.status !== 'paid';
        });
        break;
    }
    console.log("\u2705 Filter result: ".concat(filtered.length, " debts"));
    setFilteredDebts(filtered);
    setSelectedDebts([]); // Reset selection when filter changes
  };

  // Generate SMS message for a debt
  var generateSMSMessage = function generateSMSMessage(debt, templateType) {
    var template = smsTemplates[templateType];
    var daysOverdue = getDaysOverdue(debt.dueDate);
    var creditorName = getCreditorName(debt);
    var amount = formatAmount(debt.amount);
    var date = formatDate(debt.dueDate);
    return template.replace('{name}', creditorName).replace('{amount}', amount).replace('{days}', daysOverdue).replace('{date}', date);
  };

  // Get template type based on debt status
  var getTemplateType = function getTemplateType(debt) {
    var daysOverdue = getDaysOverdue(debt.dueDate);
    if (daysOverdue > 7) return 'urgent';
    if (daysOverdue > 0) return 'overdue';
    return 'reminder';
  };

  // Handle debt selection
  var handleSelectDebt = function handleSelectDebt(debtId) {
    setSelectedDebts(function (prev) {
      return prev.includes(debtId) ? prev.filter(function (id) {
        return id !== debtId;
      }) : [].concat(_toConsumableArray(prev), [debtId]);
    });
  };

  // Handle select all debts
  var handleSelectAll = function handleSelectAll() {
    if (selectedDebts.length === filteredDebts.length && filteredDebts.length > 0) {
      setSelectedDebts([]);
    } else {
      setSelectedDebts(filteredDebts.map(function (debt) {
        return debt.id;
      }));
    }
  };

  // Generate preview messages
  var generatePreview = function generatePreview() {
    var messages = filteredDebts.filter(function (debt) {
      return selectedDebts.includes(debt.id);
    }).map(function (debt) {
      return {
        debt: debt,
        message: generateSMSMessage(debt, getTemplateType(debt)),
        templateType: getTemplateType(debt)
      };
    });
    setPreviewMessages(messages);
    setShowPreview(true);
  };

  // Show notification
  var showNotification = function showNotification(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
    var notification = document.createElement('div');
    var bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    notification.className = "fixed top-4 right-4 ".concat(bgColor, " text-white px-6 py-3 rounded-xl shadow-2xl z-50 transform transition-all duration-300");
    notification.innerHTML = "\n      <div class=\"flex items-center gap-2\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n          ".concat(type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>', "\n        </svg>\n        <span>").concat(message, "</span>\n      </div>\n    ");
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.style.transform = 'translateX(0) scale(1)';
    }, 10);
    setTimeout(function () {
      notification.style.transform = 'translateX(100%) scale(0.8)';
      setTimeout(function () {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Copy text to clipboard
  var copyToClipboard = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text) {
      var debtId,
        textArea,
        _args2 = arguments,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            debtId = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
            if (debtId) setCopyingId(debtId);
            _context2.p = 1;
            if (!(navigator.clipboard && window.isSecureContext)) {
              _context2.n = 3;
              break;
            }
            _context2.n = 2;
            return navigator.clipboard.writeText(text);
          case 2:
            _context2.n = 4;
            break;
          case 3:
            // Fallback for older browsers
            textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return _context2.a(2, new Promise(function (resolve, reject) {
              if (document.execCommand('copy')) {
                document.body.removeChild(textArea);
                resolve();
              } else {
                document.body.removeChild(textArea);
                reject(new Error('Copy failed'));
              }
            }));
          case 4:
            showNotification('Nusxa muvaffaqiyatli olindi!', 'success');
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error('Copy failed:', _t2);
            showNotification('Nusxa olishda xatolik', 'error');
          case 6:
            _context2.p = 6;
            if (debtId) setCopyingId(null);
            return _context2.f(6);
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 5, 6, 7]]);
    }));
    return function copyToClipboard(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Copy all messages
  var copyAllMessages = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var allMessages;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            setCopyingAll(true);
            _context3.p = 1;
            allMessages = previewMessages.map(function (item, index) {
              var creditorName = getCreditorName(item.debt);
              var phone = getCreditorPhone(item.debt);
              return "".concat(index + 1, ". ").concat(creditorName, " (").concat(phone, "):\n").concat(item.message);
            }).join('\n\n');
            _context3.n = 2;
            return copyToClipboard(allMessages);
          case 2:
            _context3.p = 2;
            setCopyingAll(false);
            return _context3.f(2);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[1,, 2, 3]]);
    }));
    return function copyAllMessages() {
      return _ref3.apply(this, arguments);
    };
  }();

  // Loading state
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto space-y-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-32 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl"
    })), /*#__PURE__*/React.createElement("div", {
      className: "animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-10 w-48 bg-gray-300 dark:bg-gray-600 rounded-xl"
    }), /*#__PURE__*/React.createElement("div", {
      className: "h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-4"
    }), /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, _toConsumableArray(Array(5)).map(function (_, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "flex items-center space-x-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"
      }), /*#__PURE__*/React.createElement("div", {
        className: "h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"
      }), /*#__PURE__*/React.createElement("div", {
        className: "h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"
      }), /*#__PURE__*/React.createElement("div", {
        className: "h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"
      }), /*#__PURE__*/React.createElement("div", {
        className: "h-4 flex-1 bg-gray-300 dark:bg-gray-600 rounded"
      }));
    })))));
  }

  // Error state
  if (error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "max-w-7xl mx-auto space-y-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-3xl font-bold mb-2"
    }, "\uD83D\uDCF1 SMS Eslatmalar"), /*#__PURE__*/React.createElement("p", {
      className: "text-teal-100 text-lg"
    }, "Muddatiga moslab kreditorlarga SMS eslatma yuborish")), /*#__PURE__*/React.createElement("div", {
      className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4"
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-8 h-8 text-red-600 dark:text-red-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    }))), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-gray-900 dark:text-white mb-2"
    }, "Xatolik yuz berdi"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 dark:text-gray-400 mb-6"
    }, error), /*#__PURE__*/React.createElement("button", {
      onClick: loadDebtsData,
      className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
    }, "Qayta urinish"))));
  }

  // Main render
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "\uD83D\uDCF1 SMS Eslatmalar"), /*#__PURE__*/React.createElement("p", {
    className: "text-teal-100 text-lg"
  }, "Muddatiga moslab kreditorlarga SMS eslatma yuborish")), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-10 h-10 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4"
  }, /*#__PURE__*/React.createElement("select", {
    value: selectedPeriod,
    onChange: function onChange(e) {
      return setSelectedPeriod(e.target.value);
    },
    className: "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "Barcha qarzlar"), /*#__PURE__*/React.createElement("option", {
    value: "overdue"
  }, "Muddati o'tgan"), /*#__PURE__*/React.createElement("option", {
    value: "due_today"
  }, "Bugun tugaydi"), /*#__PURE__*/React.createElement("option", {
    value: "due_1day"
  }, "1 kun qoldi"), /*#__PURE__*/React.createElement("option", {
    value: "due_2days"
  }, "2 kun qoldi"), /*#__PURE__*/React.createElement("option", {
    value: "due_3days"
  }, "3 kun qoldi"), /*#__PURE__*/React.createElement("option", {
    value: "due_week"
  }, "1 hafta ichida")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, filteredDebts.length, " ta qarz topildi"), selectedDebts.length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-teal-600 dark:text-teal-400"
  }, "(", selectedDebts.length, " ta tanlangan)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleSelectAll,
    disabled: filteredDebts.length === 0,
    className: "px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  }, selectedDebts.length === filteredDebts.length && filteredDebts.length > 0 ? 'Barchasini bekor qilish' : 'Barchasini tanlash'), selectedDebts.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: generatePreview,
    className: "px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
  }, "SMS Ko'rish (", selectedDebts.length, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-white"
  }, "Qarzlar ro'yxati")), filteredDebts.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 dark:bg-gray-900"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selectedDebts.length === filteredDebts.length && filteredDebts.length > 0,
    onChange: handleSelectAll,
    className: "rounded border-gray-300 text-teal-600 focus:ring-teal-500"
  })), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Kreditor"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Qarz miqdori"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Muddat"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "Holat"), /*#__PURE__*/React.createElement("th", {
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
  }, "SMS Matn"))), /*#__PURE__*/React.createElement("tbody", {
    className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
  }, filteredDebts.map(function (debt) {
    return /*#__PURE__*/React.createElement("tr", {
      key: debt.id,
      className: "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
    }, /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: selectedDebts.includes(debt.id),
      onChange: function onChange() {
        return handleSelectDebt(debt.id);
      },
      className: "rounded border-gray-300 text-teal-600 focus:ring-teal-500"
    })), /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm font-medium text-gray-900 dark:text-white"
    }, getCreditorName(debt)), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500 dark:text-gray-400"
    }, getCreditorPhone(debt))), /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm font-medium text-gray-900 dark:text-white"
    }, formatAmount(debt.amount), " UZS")), /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-900 dark:text-white"
    }, formatDate(debt.dueDate))), /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4 whitespace-nowrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full border ".concat(getStatusColor(debt))
    }, getStatusText(debt))), /*#__PURE__*/React.createElement("td", {
      className: "px-6 py-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-xs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-600 dark:text-gray-400 truncate"
    }, generateSMSMessage(debt, getTemplateType(debt))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return copyToClipboard(generateSMSMessage(debt, getTemplateType(debt)), debt.id);
      },
      disabled: copyingId === debt.id,
      className: "mt-1 flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    }, copyingId === debt.id ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
      className: "w-3 h-3 animate-spin",
      fill: "none",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("circle", {
      className: "opacity-25",
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4"
    }), /*#__PURE__*/React.createElement("path", {
      className: "opacity-75",
      fill: "currentColor",
      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })), "Nusxa olinmoqda...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
      className: "w-3 h-3",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    })), "Nusxa olish")))));
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "mx-auto h-12 w-12 text-gray-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "mt-2 text-sm font-medium text-gray-900 dark:text-white"
  }, "Qarzlar topilmadi"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm text-gray-500 dark:text-gray-400"
  }, "Tanlangan filtr bo'yicha qarzlar mavjud emas."))), showPreview && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-gray-900 dark:text-white"
  }, "SMS Xabarlar Ko'rinishi (", previewMessages.length, " ta)"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: copyAllMessages,
    disabled: copyingAll,
    className: "px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
  }, copyingAll ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 animate-spin",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Nusxa olinmoqda...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
  })), "Barchasini nusxa olish")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowPreview(false);
    },
    className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 overflow-y-auto max-h-[60vh]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, previewMessages.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-gray-900 dark:text-white"
    }, getCreditorName(item.debt)), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-500 dark:text-gray-400 ml-2"
    }, "(", getCreditorPhone(item.debt), ")"), /*#__PURE__*/React.createElement("span", {
      className: "px-2 py-1 text-xs rounded-full ".concat(item.templateType === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : item.templateType === 'overdue' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300')
    }, item.templateType === 'urgent' ? 'Shoshilinch' : item.templateType === 'overdue' ? 'Kechikkan' : 'Eslatma')), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return copyToClipboard(item.message, "preview-".concat(index));
      },
      disabled: copyingId === "preview-".concat(index),
      className: "text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 p-1 rounded hover:bg-teal-50 dark:hover:bg-teal-900",
      title: "Nusxa olish"
    }, copyingId === "preview-".concat(index) ? /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4 animate-spin",
      fill: "none",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("circle", {
      className: "opacity-25",
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "4"
    }), /*#__PURE__*/React.createElement("path", {
      className: "opacity-75",
      fill: "currentColor",
      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })) : /*#__PURE__*/React.createElement("svg", {
      className: "w-4 h-4",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    })))), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
    }, item.message));
  }))))));
}