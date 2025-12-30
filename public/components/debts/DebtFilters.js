"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtFilters = DebtFilters;
var _translationUtils = require("../../utils/translationUtils");
var _storageUtils = require("../../utils/storageUtils");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function DebtFilters(_ref) {
  var activeTab = _ref.activeTab,
    onTabChange = _ref.onTabChange,
    searchValue = _ref.searchValue,
    onSearchChange = _ref.onSearchChange;
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var tabs = [{
    id: 'dueToday',
    label: t('debts.dueToday', 'Bugungi')
  }, {
    id: 'dueTomorrow',
    label: t('debts.dueTomorrow', 'Ertaga')
  }, {
    id: 'threeDaysLeft',
    label: t('debts.threeDaysLeft', '3 kun qoldi')
  }, {
    id: 'overdue',
    label: t('debts.overdue', 'Qarz')
  }, {
    id: 'pending',
    label: t('debts.pending', 'Kutilayotgan')
  }, {
    id: 'paid',
    label: t('debts.paid', 'To\'langan')
  }, {
    id: 'all',
    label: t('debts.all', 'Barchasi')
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg hover:shadow-xl focus-within:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: t('debts.searchPlaceholder', 'Qarzlarni izlash...'),
    value: searchValue,
    onChange: function onChange(e) {
      return onSearchChange(e.target.value);
    },
    className: "w-full p-4 pl-14 pr-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base md:text-lg font-medium"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }))), searchValue && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onSearchChange('');
    },
    className: "absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-2 shadow-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, tabs.map(function (tab) {
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: function onClick() {
        return onTabChange(tab.id);
      },
      className: "relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ".concat(activeTab === tab.id ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30' : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white')
    }, activeTab === tab.id && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"
    }), /*#__PURE__*/React.createElement("span", {
      className: "relative"
    }, tab.label));
  }))));
}