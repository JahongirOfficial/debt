"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarRatings = QarzdaftarRatings;
var _react = _interopRequireWildcard(require("react"));
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _DebtContext = require("../utils/DebtContext");
var _AuthContext = require("../utils/AuthContext");
var _SkeletonLoader = require("./SkeletonLoader");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Add AuthContext import
function QarzdaftarRatings() {
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings; // Get theme settings
  var t = (0, _translationUtils.useTranslation)(language);
  var _useDebts = (0, _DebtContext.useDebts)(),
    ratings = _useDebts.ratings,
    loading = _useDebts.loading,
    fetchRatings = _useDebts.fetchRatings,
    calculateRatings = _useDebts.calculateRatings;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    ratingsSearch = _useState2[0],
    setRatingsSearch = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    initialLoad = _useState4[0],
    setInitialLoad = _useState4[1];

  // Get filtered creditors for ratings
  var getFilteredRatings = function getFilteredRatings() {
    if (!ratingsSearch) {
      return ratings;
    }
    var searchTerm = ratingsSearch.toLowerCase();
    return ratings.filter(function (rating) {
      return rating.creditor.toLowerCase().includes(searchTerm);
    });
  };

  // Calculate rating stats
  var getRatingStats = function getRatingStats() {
    var stats = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0
    };
    ratings.forEach(function (rating) {
      if (rating.ratingStatus === 'excellent') stats.excellent++;else if (rating.ratingStatus === 'good') stats.good++;else if (rating.ratingStatus === 'fair') stats.fair++;else if (rating.ratingStatus === 'poor') stats.poor++;
    });
    return stats;
  };
  var getRatingIcon = function getRatingIcon(status) {
    switch (status) {
      case 'excellent':
        return /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M13 7h8m0 0v8m0-8l-8 8-4 4-6 6"
        }));
      case 'good':
        return /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M5 13l4 4L19 7"
        }));
      case 'fair':
        return /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        }));
      case 'poor':
        return /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
        }));
      default:
        return /*#__PURE__*/_react["default"].createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          className: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        }));
    }
  };
  var getRatingText = function getRatingText(status) {
    switch (status) {
      case 'excellent':
        return t('ratings.status.excellent', 'Ajoyib');
      case 'good':
        return t('ratings.status.good', 'Yaxshi');
      case 'fair':
        return t('ratings.status.fair', 'O\'rta');
      case 'poor':
        return t('ratings.status.poor', 'Yomon');
      default:
        return t('ratings.status.unknown', 'Noma\'lum');
    }
  };
  var getRatingColor = function getRatingColor(status) {
    switch (status) {
      case 'excellent':
        return 'green';
      case 'good':
        return 'blue';
      case 'fair':
        return 'yellow';
      case 'poor':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Calculate ratings on component mount
  (0, _react.useEffect)(function () {
    if (initialLoad && !loading) {
      calculateRatings().then(function (result) {
        if (!result.success) {
          console.error('Failed to calculate ratings:', result.message);
        }
        setInitialLoad(false);
      })["catch"](function (error) {
        console.error('Error calculating ratings:', error);
        setInitialLoad(false);
      });
    }
  }, [calculateRatings, loading, initialLoad]);
  var ratingStats = getRatingStats();
  var filteredRatings = getFilteredRatings();

  // Determine if dark mode is active
  var isDarkMode = settings.theme === 'dark';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-6xl mx-auto p-4 md:p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-2xl font-bold ".concat(isDarkMode ? 'text-white' : 'text-gray-800')
  }, t('ratings.title', 'Kreditorlar reytingi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: isDarkMode ? 'text-gray-300' : 'text-gray-600'
  }, t('ratings.subtitle', 'To\'lash xulq-atvori bo\'yicha reyting')))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: ratingsSearch,
    onChange: function onChange(e) {
      return setRatingsSearch(e.target.value);
    },
    className: "w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ".concat(isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-500' : 'border-gray-300 text-gray-800 focus:border-orange-500'),
    placeholder: t('ratings.searchPlaceholder', 'Foydalanuvchi nomini izlash...')
  }), /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ".concat(isDarkMode ? 'text-gray-400' : 'text-gray-400'),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  }))), ratingsSearch && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-2 text-sm ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, "\"", ratingsSearch, "\" ", t('debts.resultsCount', 'bo\'yicha {count} ta natija topildi').replace('{count}', filteredRatings.length))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, t('ratings.status.excellent', 'Ajoyib')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-green-600"
  }, ratingStats.excellent)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 7h8m0 0v8m0-8l-8 8-4 4-6 6"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, t('ratings.status.good', 'Yaxshi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-blue-600"
  }, ratingStats.good)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, t('ratings.status.fair', 'O\'rta')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-yellow-600"
  }, ratingStats.fair)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-4 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm font-medium ".concat(isDarkMode ? 'text-gray-300' : 'text-gray-600')
  }, t('ratings.status.poor', 'Yomon')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-2xl font-bold text-red-600"
  }, ratingStats.poor)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-6 h-6 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
  })))))), loading && initialLoad ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-8 w-64 rounded mb-2 animate-pulse ".concat(isDarkMode ? 'bg-gray-700' : 'bg-gray-200')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-5 w-80 rounded animate-pulse ".concat(isDarkMode ? 'bg-gray-700' : 'bg-gray-200')
  })), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
    type: "ratingsStats"
  }), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
    type: "ratingsList"
  })) : ratings.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-8 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-16 h-16 mx-auto mb-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-600 text-lg'
  }, t('ratings.noRatings', 'Hali reytinglar yo\'q')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-2 ".concat(isDarkMode ? 'text-gray-400' : 'text-gray-500')
  }, t('ratings.addDebtsToSeeRatings', 'Qarzlar qo\'shish orqali reytinglarni ko\'ring')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-xs mt-2 ".concat(isDarkMode ? 'text-gray-500' : 'text-gray-400')
  }, t('ratings.ifIssuePersists', 'Agar muammo davom etsa, tizim administratori bilan bog\'laning')))) : filteredRatings.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-xl p-8 shadow-lg ".concat(isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-16 h-16 mx-auto mb-4",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-600 text-lg'
  }, t('ratings.noSearchResults', 'Qidiruv natijasi topilmadi')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm mt-2 ".concat(isDarkMode ? 'text-gray-400' : 'text-gray-500')
  }, "\"", ratingsSearch, "\" ", t('ratings.searchResults', 'bo\'yicha foydalanuvchi topilmadi')))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "min-w-full bg-white dark:bg-gray-800"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", {
    className: "bg-gradient-to-r from-orange-500 to-red-500 text-white"
  }, /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left rounded-tl-lg"
  }, "#"), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left"
  }, t('ratings.creditor', 'Kreditor')), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left"
  }, t('ratings.score', 'Reyting')), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left hidden md:table-cell"
  }, t('ratings.totalDebts', 'Jami')), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left hidden md:table-cell"
  }, t('ratings.paidDebts', 'To\'langan')), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left hidden md:table-cell"
  }, t('ratings.pendingDebts', 'Kutilayotgan')), /*#__PURE__*/_react["default"].createElement("th", {
    className: "py-3 px-4 text-left rounded-tr-lg"
  }, t('ratings.status.title', 'Holat')))), /*#__PURE__*/_react["default"].createElement("tbody", {
    className: "divide-y divide-gray-200 dark:divide-gray-700"
  }, filteredRatings.map(function (rating, index) {
    var color = getRatingColor(rating.ratingStatus);
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: rating._id || index,
      className: "".concat(index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700', " hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors")
    }, /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 text-gray-600 dark:text-gray-300 font-mono"
    }, index + 1), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 font-medium text-gray-800 dark:text-white"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2 ".concat(color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-500' : color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : color === 'red' ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-gray-500 to-gray-600')
    }, rating.creditor.charAt(0).toUpperCase()), /*#__PURE__*/_react["default"].createElement("div", {
      className: "font-medium"
    }, rating.creditor))), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 font-bold text-gray-800 dark:text-white"
    }, rating.ratingScore, "%"), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell"
    }, rating.totalDebts), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 text-green-600 dark:text-green-400 hidden md:table-cell"
    }, rating.paidDebts), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4 text-orange-600 dark:text-orange-400 hidden md:table-cell"
    }, rating.pendingDebts), /*#__PURE__*/_react["default"].createElement("td", {
      className: "py-3 px-4"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ".concat(color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200')
    }, getRatingIcon(rating.ratingStatus), getRatingText(rating.ratingStatus))));
  })))));
}