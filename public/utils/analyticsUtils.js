"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnalyticsData = exports.calculateUserRating = void 0;
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
// Function to calculate user rating
var calculateUserRating = exports.calculateUserRating = function calculateUserRating(creditor, debts) {
  var userDebts = debts.filter(function (debt) {
    return debt.creditor === creditor;
  });
  if (userDebts.length === 0) return {
    score: 0,
    status: 'unknown',
    color: 'gray'
  };
  var paidDebts = userDebts.filter(function (debt) {
    return debt.status === 'paid';
  });
  var pendingDebts = userDebts.filter(function (debt) {
    return debt.status === 'pending';
  });

  // Calculate payment score based on paid vs total debts
  var paymentScore = paidDebts.length / userDebts.length * 100;

  // Calculate average delay for paid debts
  var totalDelay = 0;
  var delayedPayments = 0;
  paidDebts.forEach(function (debt) {
    if (debt.paidAt && debt.debtDate) {
      var debtDate = new Date(debt.debtDate);
      var paidDate = new Date(debt.paidAt);
      var delay = Math.max(0, (paidDate - debtDate) / (1000 * 60 * 60 * 24));
      if (delay > 0) {
        totalDelay += delay;
        delayedPayments++;
      }
    }
  });
  var averageDelay = delayedPayments > 0 ? totalDelay / delayedPayments : 0;

  // Determine rating based on payment score and delay
  var status, color;
  if (paymentScore >= 90 && averageDelay <= 1) {
    status = 'excellent';
    color = 'green';
  } else if (paymentScore >= 70 && averageDelay <= 7) {
    status = 'good';
    color = 'blue';
  } else if (paymentScore >= 50) {
    status = 'fair';
    color = 'yellow';
  } else {
    status = 'poor';
    color = 'red';
  }
  return {
    score: Math.round(paymentScore),
    status: status,
    color: color,
    averageDelay: Math.round(averageDelay),
    totalDebts: userDebts.length,
    paidDebts: paidDebts.length,
    pendingDebts: pendingDebts.length
  };
};

// Function to get analytics data
var getAnalyticsData = exports.getAnalyticsData = function getAnalyticsData(debts, analyticsPeriod) {
  var debtAdjustments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var userTier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'free';
  var debtLimit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;
  var now = new Date();
  var periodStart = new Date();
  switch (analyticsPeriod) {
    case 'week':
      periodStart.setDate(now.getDate() - 7);
      break;
    case 'month':
      periodStart.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      periodStart.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      periodStart.setFullYear(now.getFullYear() - 1);
      break;
  }
  var periodDebts = debts.filter(function (debt) {
    return new Date(debt.createdAt) >= periodStart;
  });

  // For free tier, only consider manageable debts for statistics
  var manageableDebts = userTier === 'free' && debtLimit !== Infinity ? periodDebts.slice(0, debtLimit) : periodDebts;

  // Calculate statistics - show all debts but note manageable ones
  var totalAmount = periodDebts.reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var manageableTotalAmount = manageableDebts.reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var pendingAmount = periodDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var manageablePendingAmount = manageableDebts.filter(function (debt) {
    return debt.status === 'pending';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);

  // Calculate paid amount including debt adjustments
  var directlyPaidAmount = periodDebts.filter(function (debt) {
    return debt.status === 'paid';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var manageableDirectlyPaidAmount = manageableDebts.filter(function (debt) {
    return debt.status === 'paid';
  }).reduce(function (sum, debt) {
    return sum + debt.amount;
  }, 0);
  var adjustmentAmount = debtAdjustments.filter(function (adjustment) {
    return new Date(adjustment.createdAt) >= periodStart;
  }).reduce(function (sum, adjustment) {
    return sum + adjustment.adjustmentAmount;
  }, 0);
  var paidAmount = directlyPaidAmount + adjustmentAmount;
  var manageablePaidAmount = manageableDirectlyPaidAmount + adjustmentAmount;

  // Top creditors - use manageable debts for statistics
  var creditorStats = {};
  manageableDebts.forEach(function (debt) {
    if (!creditorStats[debt.creditor]) {
      creditorStats[debt.creditor] = {
        total: 0,
        pending: 0,
        paid: 0,
        count: 0
      };
    }
    creditorStats[debt.creditor].total += debt.amount;
    creditorStats[debt.creditor].count += 1;
    if (debt.status === 'pending') {
      creditorStats[debt.creditor].pending += debt.amount;
    } else {
      creditorStats[debt.creditor].paid += debt.amount;
    }
  });

  // Add adjustment amounts to creditor stats
  debtAdjustments.filter(function (adjustment) {
    return new Date(adjustment.createdAt) >= periodStart;
  }).forEach(function (adjustment) {
    if (!creditorStats[adjustment.creditor]) {
      creditorStats[adjustment.creditor] = {
        total: 0,
        pending: 0,
        paid: 0,
        count: 0
      };
    }
    creditorStats[adjustment.creditor].paid += adjustment.adjustmentAmount;
  });
  var topCreditors = Object.entries(creditorStats).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      stats = _ref2[1];
    return _objectSpread({
      name: name
    }, stats);
  }).sort(function (a, b) {
    return b.total - a.total;
  }).slice(0, 5);

  // Monthly trends - use manageable debts for statistics
  var monthlyData = {};
  manageableDebts.forEach(function (debt) {
    var month = new Date(debt.createdAt).toISOString().slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = {
        pending: 0,
        paid: 0,
        count: 0
      };
    }
    monthlyData[month].count += 1;
    if (debt.status === 'pending') {
      monthlyData[month].pending += debt.amount;
    } else {
      monthlyData[month].paid += debt.amount;
    }
  });

  // Add adjustment amounts to monthly trends
  debtAdjustments.filter(function (adjustment) {
    return new Date(adjustment.createdAt) >= periodStart;
  }).forEach(function (adjustment) {
    var month = new Date(adjustment.createdAt).toISOString().slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = {
        pending: 0,
        paid: 0,
        count: 0
      };
    }
    monthlyData[month].paid += adjustment.adjustmentAmount;
  });
  var monthlyTrends = Object.entries(monthlyData).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      month = _ref4[0],
      data = _ref4[1];
    return _objectSpread({
      month: month
    }, data);
  }).sort(function (a, b) {
    return a.month.localeCompare(b.month);
  });

  // Payment speed analysis - use manageable debts for statistics
  var paidDebts = manageableDebts.filter(function (debt) {
    return debt.status === 'paid' && debt.paidAt;
  });
  var paymentSpeeds = paidDebts.map(function (debt) {
    var created = new Date(debt.createdAt);
    var paid = new Date(debt.paidAt);
    return Math.ceil((paid - created) / (1000 * 60 * 60 * 24)); // days
  });
  var avgPaymentDays = paymentSpeeds.length > 0 ? Math.round(paymentSpeeds.reduce(function (sum, days) {
    return sum + days;
  }, 0) / paymentSpeeds.length) : 0;
  return {
    // All debts data (for display)
    totalAmount: totalAmount,
    pendingAmount: pendingAmount,
    paidAmount: paidAmount,
    totalDebts: periodDebts.length,
    pendingDebts: periodDebts.filter(function (d) {
      return d.status === 'pending';
    }).length,
    paidDebts: periodDebts.filter(function (d) {
      return d.status === 'paid';
    }).length,
    // Manageable debts data (for statistics)
    manageableTotalAmount: manageableTotalAmount,
    manageablePendingAmount: manageablePendingAmount,
    manageablePaidAmount: manageablePaidAmount,
    manageableTotalDebts: manageableDebts.length,
    manageablePendingDebts: manageableDebts.filter(function (d) {
      return d.status === 'pending';
    }).length,
    manageablePaidDebts: manageableDebts.filter(function (d) {
      return d.status === 'paid';
    }).length,
    topCreditors: topCreditors,
    monthlyTrends: monthlyTrends,
    avgPaymentDays: avgPaymentDays,
    paymentSpeeds: paymentSpeeds,
    adjustmentAmount: adjustmentAmount,
    // Include adjustment amount in the returned data

    // Tier information
    userTier: userTier,
    debtLimit: debtLimit,
    isLimited: userTier === 'free' && debtLimit !== Infinity
  };
};