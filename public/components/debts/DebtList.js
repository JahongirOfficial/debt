"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtList = DebtList;
var _DebtCard = require("./DebtCard");
var _translationUtils = require("../../utils/translationUtils");
var _storageUtils = require("../../utils/storageUtils");
var _AuthContext = require("../../utils/AuthContext");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function DebtList(_ref) {
  var debts = _ref.debts,
    onCardClick = _ref.onCardClick,
    onAdjustClick = _ref.onAdjustClick,
    onMarkAsPaid = _ref.onMarkAsPaid,
    onAddNew = _ref.onAddNew;
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;
  var t = (0, _translationUtils.useTranslation)(language);

  // Check employee permissions
  var hasPermission = function hasPermission(permission) {
    var _user$employeeInfo;
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'employee') return true;
    return (user === null || user === void 0 || (_user$employeeInfo = user.employeeInfo) === null || _user$employeeInfo === void 0 || (_user$employeeInfo = _user$employeeInfo.permissions) === null || _user$employeeInfo === void 0 ? void 0 : _user$employeeInfo[permission]) || false;
  };
  var canAddDebt = hasPermission('canAddDebt');
  if (debts.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "text-center py-12"
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-16 w-16 mx-auto text-gray-400 mb-4",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z"
    })), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2"
    }, t('debts.noDebts', 'Hali qarzlar qo\'shilmagan')), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-500 dark:text-gray-400 mb-4"
    }, t('debts.noDebtsSubtitle', 'Yuqoridagi tugma orqali yangi qarz qo\'shing')), canAddDebt && /*#__PURE__*/React.createElement("button", {
      onClick: onAddNew,
      className: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
    }, t('debts.addNew', 'Yangi qarz qo\'shish')));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 dark:text-gray-300"
  }, debts.length, " ", t('debts.results', 'ta qarz topildi'))), /*#__PURE__*/React.createElement("div", {
    className: "md:hidden space-y-4"
  }, debts.map(function (debt, index) {
    return /*#__PURE__*/React.createElement(_DebtCard.DebtCard, {
      key: debt._id,
      debt: debt,
      index: index,
      isOverLimit: !debt.isManageable,
      onCardClick: onCardClick,
      onAdjustClick: onAdjustClick,
      onMarkAsPaid: onMarkAsPaid
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4"
  }, debts.map(function (debt, index) {
    return /*#__PURE__*/React.createElement(_DebtCard.DebtCard, {
      key: debt._id,
      debt: debt,
      index: index,
      isOverLimit: !debt.isManageable,
      onCardClick: onCardClick,
      onAdjustClick: onAdjustClick,
      onMarkAsPaid: onMarkAsPaid
    });
  })));
}