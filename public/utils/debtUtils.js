"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupDebtsByDate = exports.formatPhoneNumber = exports.formatCurrency = void 0;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Helper function to group debts by date
var groupDebtsByDate = exports.groupDebtsByDate = function groupDebtsByDate(debts) {
  // Handle empty debts array
  if (!debts || debts.length === 0) {
    return [];
  }
  var grouped = {};
  debts.forEach(function (debt) {
    try {
      // Group by date (YYYY-MM-DD)
      var date = new Date(debt.createdAt).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = {
          pending: 0,
          paid: 0
        };
      }
      if (debt.status === 'pending') {
        grouped[date].pending += debt.amount || 0;
      } else {
        grouped[date].paid += debt.amount || 0;
      }
    } catch (error) {
      console.error('Error processing debt:', debt, error);
    }
  });

  // Convert to array and sort by date
  return Object.entries(grouped).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      date = _ref2[0],
      amounts = _ref2[1];
    return {
      date: date,
      pending: amounts.pending,
      paid: amounts.paid,
      total: amounts.pending + amounts.paid
    };
  }).sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
};

// Function to format phone number
var formatPhoneNumber = exports.formatPhoneNumber = function formatPhoneNumber(value) {
  // Remove all non-digit characters except +
  var phoneNumber = value.replace(/[^\d+]/g, '');

  // If the value is empty or just +, return +998
  if (!phoneNumber || phoneNumber === '+') {
    return '+998 ';
  }

  // Ensure it starts with +998
  if (!phoneNumber.startsWith('+998')) {
    // If it starts with 998, add the +
    if (phoneNumber.startsWith('998')) {
      phoneNumber = '+' + phoneNumber;
    }
    // If it starts with + but not +998, replace with +998
    else if (phoneNumber.startsWith('+')) {
      // Remove any extra 998 occurrences
      phoneNumber = phoneNumber.replace(/\+998/g, '');
      phoneNumber = '+998' + phoneNumber;
    }
    // Otherwise, prepend +998
    else {
      phoneNumber = '+998' + phoneNumber;
    }
  }

  // Remove any duplicate +998 occurrences
  if (phoneNumber.indexOf('+998') !== phoneNumber.lastIndexOf('+998')) {
    phoneNumber = phoneNumber.substring(0, phoneNumber.lastIndexOf('+998')) + phoneNumber.substring(phoneNumber.lastIndexOf('+998') + 4);
  }

  // Format the number after +998
  if (phoneNumber.startsWith('+998') && phoneNumber.length > 4) {
    var digits = phoneNumber.slice(4).replace(/\D/g, ''); // Get only the digits after +998
    var formatted = '+998';

    // Add space after +998
    formatted += ' ';

    // Add the first group (2 digits)
    if (digits.length >= 2) {
      formatted += digits.slice(0, 2) + ' ';
    } else if (digits.length > 0) {
      formatted += digits;
    }

    // Add the second group (3 digits)
    if (digits.length >= 4) {
      formatted += digits.slice(2, 5) + ' ';
    } else if (digits.length > 2) {
      formatted += digits.slice(2);
    }

    // Add the third group (2 digits)
    if (digits.length >= 6) {
      formatted += digits.slice(5, 7) + ' ';
    } else if (digits.length > 5) {
      formatted += digits.slice(5);
    }

    // Add the last group (2 digits)
    if (digits.length >= 8) {
      formatted += digits.slice(7, 9);
    } else if (digits.length > 7) {
      formatted += digits.slice(7);
    }
    return formatted;
  }

  // Return +998 with a space if we only have the prefix
  return '+998 ';
};

// Function to format currency
var formatCurrency = exports.formatCurrency = function formatCurrency(amount) {
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'UZS';
  // Map of currency codes to locale settings
  var currencySettings = {
    'UZS': {
      locale: 'uz-UZ',
      currency: 'UZS'
    },
    'USD': {
      locale: 'en-US',
      currency: 'USD'
    },
    'EUR': {
      locale: 'de-DE',
      currency: 'EUR'
    },
    'RUB': {
      locale: 'ru-RU',
      currency: 'RUB'
    },
    'TJS': {
      locale: 'tg-TJ',
      currency: 'TJS'
    }
  };
  var settings = currencySettings[currency] || currencySettings['UZS'];
  return new Intl.NumberFormat(settings.locale, {
    style: 'currency',
    currency: settings.currency,
    minimumFractionDigits: 0
  }).format(amount);
};