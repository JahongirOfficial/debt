"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebtTrendChart = DebtTrendChart;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Custom SVG Line Chart Component
function DebtTrendChart(_ref) {
  var data = _ref.data,
    t = _ref.t;
  // Handle empty or insufficient data
  if (!data || data.length === 0) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-64 flex items-center justify-center bg-white/20 rounded-xl"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-12 h-12 text-gray-400 mx-auto mb-2",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    })), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-gray-500"
    }, t('dashboard.noData', 'Grafik uchun yetarli ma\'lumot yo\'q'))));
  }

  // Chart dimensions
  var width = 600;
  var height = 200;
  var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 50
  };
  var innerWidth = width - margin.left - margin.right;
  var innerHeight = height - margin.top - margin.bottom;

  // Get min and max values for scaling
  var allValues = data.flatMap(function (d) {
    return [d.pending, d.paid, d.total];
  });
  var maxValue = Math.max.apply(Math, _toConsumableArray(allValues).concat([1]));
  var minValue = Math.min.apply(Math, _toConsumableArray(allValues).concat([0]));

  // Create scales
  var xScale = function xScale(index) {
    if (data.length <= 1) return innerWidth / 2;
    return index / (data.length - 1) * innerWidth;
  };
  var yScale = function yScale(value) {
    if (maxValue === minValue) return innerHeight / 2;
    return innerHeight - (value - minValue) / (maxValue - minValue) * innerHeight;
  };

  // Format currency for display
  var formatCurrencyShort = function formatCurrencyShort(amount) {
    if (amount >= 1000000) {
      return "".concat((amount / 1000000).toFixed(1), "M");
    } else if (amount >= 1000) {
      return "".concat((amount / 1000).toFixed(1), "K");
    }
    return amount.toString();
  };

  // Format date for display
  var formatDate = function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Generate path data for lines
  var generatePath = function generatePath(data, key) {
    if (data.length === 0) return '';

    // Filter out any data points with invalid values
    var validData = data.filter(function (d) {
      return d[key] !== null && d[key] !== undefined && !isNaN(d[key]);
    });
    if (validData.length === 0) return '';
    var points = validData.map(function (d, i) {
      var x = xScale(data.indexOf(d)); // Use original index for proper positioning
      var y = yScale(d[key]);
      return "".concat(x, ",").concat(y);
    });
    return "M".concat(points.join(' L'));
  };

  // Generate circles for data points
  var generateCircles = function generateCircles(data, key, color) {
    return data.map(function (d, i) {
      // Skip invalid data points
      if (d[key] === null || d[key] === undefined || isNaN(d[key])) {
        return null;
      }
      var cx = xScale(i);
      var cy = yScale(d[key]);
      return /*#__PURE__*/_react["default"].createElement("circle", {
        key: "".concat(key, "-").concat(i),
        cx: cx,
        cy: cy,
        r: "4",
        fill: color,
        stroke: "white",
        strokeWidth: "2"
      });
    }).filter(Boolean); // Remove null values
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: width,
    height: height,
    className: "min-w-full"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(".concat(margin.left, ", ").concat(margin.top, ")")
  }, [0, 0.25, 0.5, 0.75, 1].map(function (ratio, i) {
    var y = ratio * innerHeight;
    var value = minValue + (maxValue - minValue) * (1 - ratio);
    return /*#__PURE__*/_react["default"].createElement("g", {
      key: i
    }, /*#__PURE__*/_react["default"].createElement("line", {
      x1: "0",
      y1: y,
      x2: innerWidth,
      y2: y,
      stroke: "#e5e7eb",
      strokeDasharray: "4"
    }), /*#__PURE__*/_react["default"].createElement("text", {
      x: "-10",
      y: y + 4,
      textAnchor: "end",
      fill: "#6b7280",
      fontSize: "10"
    }, formatCurrencyShort(value)));
  }), data.map(function (d, i) {
    var x = xScale(i);
    // Show every nth label to avoid crowding
    var showLabel = data.length <= 7 || i % Math.ceil(data.length / 7) === 0;
    return showLabel ? /*#__PURE__*/_react["default"].createElement("text", {
      key: i,
      x: x,
      y: innerHeight + 20,
      textAnchor: "middle",
      fill: "#6b7280",
      fontSize: "10"
    }, formatDate(d.date)) : null;
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: generatePath(data, 'pending'),
    fill: "none",
    stroke: "#f97316",
    strokeWidth: "2"
  }), generateCircles(data, 'pending', '#f97316'), /*#__PURE__*/_react["default"].createElement("path", {
    d: generatePath(data, 'paid'),
    fill: "none",
    stroke: "#10b981",
    strokeWidth: "2"
  }), generateCircles(data, 'paid', '#10b981'), /*#__PURE__*/_react["default"].createElement("path", {
    d: generatePath(data, 'total'),
    fill: "none",
    stroke: "#3b82f6",
    strokeWidth: "2"
  }), generateCircles(data, 'total', '#3b82f6'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center gap-4 mt-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-3 h-3 rounded-full bg-orange-500"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs text-gray-600"
  }, t('dashboard.pending', 'Kutilayotgan'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-3 h-3 rounded-full bg-green-500"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs text-gray-600"
  }, t('dashboard.paid', 'To\'langan'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-3 h-3 rounded-full bg-blue-500"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-xs text-gray-600"
  }, t('dashboard.totalAmount', 'Jami')))));
}