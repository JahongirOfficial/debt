"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtCard = DebtCard;
var _debtUtils = require("../../utils/debtUtils");
var _translationUtils = require("../../utils/translationUtils");
var _storageUtils = require("../../utils/storageUtils");
var _BranchContext = require("../../utils/BranchContext");
var _AuthContext = require("../../utils/AuthContext");
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
function DebtCard(_ref) {
  var debt = _ref.debt,
    index = _ref.index,
    isOverLimit = _ref.isOverLimit,
    onCardClick = _ref.onCardClick,
    onAdjustClick = _ref.onAdjustClick,
    onMarkAsPaid = _ref.onMarkAsPaid,
    _ref$showBranchIndica = _ref.showBranchIndicator,
    showBranchIndicator = _ref$showBranchIndica === void 0 ? false : _ref$showBranchIndica;
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useStoredState3 = (0, _storageUtils.useStoredState)('qarzdaftar_currency', 'UZS'),
    _useStoredState4 = _slicedToArray(_useStoredState3, 1),
    currency = _useStoredState4[0];
  var _useBranches = (0, _BranchContext.useBranches)(),
    branches = _useBranches.branches;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;
  var t = (0, _translationUtils.useTranslation)(language);

  // Get branch info if debt has branchId
  var debtBranch = debt.branchId ? branches.find(function (b) {
    return b._id === debt.branchId;
  }) : null;

  // Check employee permissions
  var hasPermission = function hasPermission(permission) {
    var _user$employeeInfo;
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'employee') return true;
    return (user === null || user === void 0 || (_user$employeeInfo = user.employeeInfo) === null || _user$employeeInfo === void 0 || (_user$employeeInfo = _user$employeeInfo.permissions) === null || _user$employeeInfo === void 0 ? void 0 : _user$employeeInfo[permission]) || false;
  };
  var canEdit = hasPermission('canEditDebt');
  var canDelete = hasPermission('canDeleteDebt');
  var canManagePayments = hasPermission('canManagePayments');
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return !isOverLimit && onCardClick(debt);
    },
    className: "relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 ".concat(isOverLimit ? 'opacity-40 border-gray-200 dark:border-gray-700 cursor-not-allowed' : 'border-orange-200 dark:border-orange-800/30 hover:shadow-xl hover:scale-[1.02] cursor-pointer')
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-blue-500 to-indigo-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0"
  }, debt.creditor.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-gray-900 dark:text-white text-base truncate"
  }, debt.creditor), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 dark:text-gray-400"
  }, "#", index + 1), showBranchIndicator && debtBranch && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 rounded-full",
    style: {
      backgroundColor: debtBranch.color || '#3B82F6'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500 dark:text-gray-400 truncate max-w-20"
  }, debtBranch.name))))), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ".concat(debt.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200')
  }, debt.status === 'paid' ? t('common.paid', 'To\'langan') : t('common.pending', 'Kutilmoqda'))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('debts.form.amount', 'Summa')), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
  }, (0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency || 'UZS', language))), debt.phone && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('debts.form.phone', 'Telefon')), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-900 dark:text-white"
  }, (0, _debtUtils.formatPhoneNumber)(debt.phone, debt.countryCode))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('debts.form.debtDate', 'Qarz sanasi')), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-900 dark:text-white"
  }, new Date(debt.debtDate).toLocaleDateString())), debt.status === 'pending' && !isOverLimit && /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      if (canEdit) onAdjustClick(debt, 'add');
    },
    disabled: !canEdit,
    className: "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ".concat(canEdit ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'),
    title: canEdit ? "Qo'shish" : "Ruxsat yo'q"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      if (canEdit) onAdjustClick(debt, 'subtract');
    },
    disabled: !canEdit,
    className: "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ".concat(canEdit ? 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'),
    title: canEdit ? "Ayirish" : "Ruxsat yo'q"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20 12H4"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: (/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e.stopPropagation();
              if (!canManagePayments) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return onMarkAsPaid(debt._id);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()),
    disabled: !canManagePayments,
    className: "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ".concat(canManagePayments ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'),
    title: canManagePayments ? "To'landi" : "Ruxsat yo'q"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  }))))));
}