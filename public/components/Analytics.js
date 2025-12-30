"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarAnalytics = QarzdaftarAnalytics;
var _react = _interopRequireWildcard(require("react"));
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _analyticsUtils = require("../utils/analyticsUtils");
var _debtUtils = require("../utils/debtUtils");
var _DebtContext = require("../utils/DebtContext");
var _api = require("../utils/api");
var _SkeletonLoader = require("./SkeletonLoader");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Import apiFetch utility
function QarzdaftarAnalytics() {
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useStoredState3 = (0, _storageUtils.useStoredState)('qarzdaftar_currency', 'UZS'),
    _useStoredState4 = _slicedToArray(_useStoredState3, 1),
    currency = _useStoredState4[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var _useDebts = (0, _DebtContext.useDebts)(),
    debts = _useDebts.debts,
    loading = _useDebts.loading,
    userTier = _useDebts.userTier,
    debtLimit = _useDebts.debtLimit;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    debtAdjustments = _useState2[0],
    setDebtAdjustments = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    adjustmentsLoading = _useState4[0],
    setAdjustmentsLoading = _useState4[1];

  // Reports state
  var _useState5 = (0, _react.useState)('pending'),
    _useState6 = _slicedToArray(_useState5, 2),
    reportType = _useState6[0],
    setReportType = _useState6[1]; // 'pending', 'paid', 'monthly'
  var _useState7 = (0, _react.useState)(new Date().toISOString().slice(0, 7)),
    _useState8 = _slicedToArray(_useState7, 2),
    reportMonth = _useState8[0],
    setReportMonth = _useState8[1]; // YYYY-MM format

  // Fixed period to 'month' since we're removing the selection UI
  var analyticsPeriod = 'month';

  // Set adjustments loading to false since we don't need to fetch them separately
  (0, _react.useEffect)(function () {
    if (!loading) {
      setAdjustmentsLoading(false);
    }
  }, [loading]);

  // Show loading state
  if (loading || adjustmentsLoading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-6xl mx-auto p-4 md:p-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "mb-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-10 w-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-2"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-5 w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
    })), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "analyticsStats"
    }), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "analyticsCharts"
    })));
  }

  // Reports functions
  var getReportData = function getReportData() {
    var reportDebts = debts;
    if (reportType === 'pending') {
      reportDebts = debts.filter(function (debt) {
        return debt.status === 'pending';
      });
    } else if (reportType === 'paid') {
      reportDebts = debts.filter(function (debt) {
        return debt.status === 'paid';
      });
    } else if (reportType === 'monthly') {
      var _reportMonth$split = reportMonth.split('-'),
        _reportMonth$split2 = _slicedToArray(_reportMonth$split, 2),
        year = _reportMonth$split2[0],
        month = _reportMonth$split2[1];
      reportDebts = debts.filter(function (debt) {
        var debtDate = new Date(debt.debtDate || debt.createdAt);
        return debtDate.getFullYear() == year && debtDate.getMonth() + 1 == month;
      });
    }
    return reportDebts;
  };
  var generatePNGReport = function generatePNGReport() {
    var reportData = getReportData();
    // Limit PNG report to only 15 people
    var limitedReportData = reportData.slice(0, 15);
    var reportTitle = getReportTitle();

    // Create high-resolution landscape canvas for PNG
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 2400; // High resolution landscape width
    canvas.height = 1600; // High resolution landscape height
    var scale = 2; // Scale factor for high DPI

    // Scale the context for high DPI
    ctx.scale(scale, scale);

    // Clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

    // Header section
    ctx.fillStyle = '#f97316';
    ctx.fillRect(0, 0, canvas.width / scale, 80);

    // Title
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(reportTitle, canvas.width / (2 * scale), 35);

    // Date
    ctx.font = '18px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(new Date().toLocaleDateString('uz-UZ'), canvas.width / (2 * scale), 60);

    // Table section
    var tableY = 100;
    var tableWidth = canvas.width / scale - 100;
    var tableHeight = canvas.height / scale - 150;
    var rowHeight = 40;
    var colWidths = [200, 180, 150, 220, 180, 180];

    // Table background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, tableY, tableWidth, tableHeight);

    // Table border
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, tableY, tableWidth, tableHeight);

    // Table header
    ctx.fillStyle = '#f97316';
    ctx.fillRect(50, tableY, tableWidth, rowHeight);

    // Header text
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    var headers = [t('debts.form.creditor', 'Kreditor'), t('debts.form.amount', 'Summa'), t('debts.form.status', 'Holat'), t('debts.form.phone', 'Telefon'), t('debts.form.debtDate', 'Qarz sanasi'), t('debts.form.paidDate', 'To\'langan sana')];
    headers.forEach(function (header, index) {
      var x = 50 + colWidths.slice(0, index).reduce(function (sum, width) {
        return sum + width;
      }, 0);
      ctx.fillText(header, x + colWidths[index] / 2, tableY + 25);
    });

    // Table data
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    limitedReportData.forEach(function (debt, rowIndex) {
      var rowY = tableY + rowHeight + rowIndex * rowHeight;

      // Alternate row colors
      if (rowIndex % 2 === 0) {
        ctx.fillStyle = '#fff7ed';
        ctx.fillRect(50, rowY, tableWidth, rowHeight);
      }

      // Row data
      var rowData = [debt.creditor.length > 25 ? debt.creditor.substring(0, 25) + '...' : debt.creditor, (0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency, language), debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'), debt.phone ? debt.phone : t('common.notAvailable', 'Mavjud emas'), debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'), debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'];
      rowData.forEach(function (cell, colIndex) {
        var x = 50 + colWidths.slice(0, colIndex).reduce(function (sum, width) {
          return sum + width;
        }, 0);
        ctx.fillStyle = colIndex === 2 ? debt.status === 'pending' ? '#f97316' : '#10b981' : '#374151';
        ctx.fillText(cell, x + colWidths[colIndex] / 2, rowY + 25);
      });

      // Row border
      ctx.strokeStyle = '#fdba74';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(50, rowY + rowHeight);
      ctx.lineTo(50 + tableWidth, rowY + rowHeight);
      ctx.stroke();
    });

    // Footer
    ctx.font = '14px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.fillText(t('app.title', 'Qarzdaftar') + ' ' + new Date().getFullYear(), canvas.width / (2 * scale), canvas.height / scale - 20);

    // Convert canvas to PNG and download
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = "".concat(reportTitle.replace(/\s+/g, '_'), "_").concat(new Date().toISOString().slice(0, 10), ".png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0); // High quality PNG
  };
  var generateExcelReport = function generateExcelReport() {
    var reportData = getReportData();
    var reportTitle = getReportTitle();

    // Create clean Excel-like table with improved styling
    var htmlContent = "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>".concat(reportTitle, "</title>\n        <meta charset=\"UTF-8\">\n        <style>\n          body { \n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n            margin: 0;\n            padding: 20px;\n            background: #f9fafb;\n          }\n          .container { \n            max-width: 1000px;\n            margin: 0 auto;\n            background: white;\n            border-radius: 12px;\n            box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n            overflow: hidden;\n          }\n          .header { \n            background: linear-gradient(135deg, #f97316, #ef4444);\n            color: white;\n            padding: 25px 30px;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n          }\n          .title { \n            font-size: 24px;\n            font-weight: 700;\n          }\n          .date { \n            font-size: 16px;\n            opacity: 0.9;\n          }\n          table { \n            width: 100%;\n            border-collapse: collapse;\n          }\n          th { \n            background: #fff7ed;\n            padding: 15px;\n            text-align: left;\n            font-weight: 600;\n            color: #f97316;\n            border-bottom: 2px solid #f97316;\n          }\n          td { \n            padding: 12px;\n            border-bottom: 1px solid #e5e7eb;\n            font-size: 14px;\n          }\n          tr:nth-child(even) {\n            background-color: #fff7ed;\n          }\n          .status-pending { \n            color: #f97316; \n            font-weight: 600;\n          }\n          .status-paid { \n            color: #10b981; \n            font-weight: 600;\n          }\n          .footer {\n            text-align: center;\n            padding: 15px;\n            color: #6b7280;\n            font-size: 14px;\n            border-top: 1px solid #e5e7eb;\n            background: #f9fafb;\n          }\n          .app-name {\n            font-weight: 600;\n            color: #f97316;\n          }\n          @media print {\n            body {\n              background: white;\n              padding: 0;\n            }\n            .container {\n              box-shadow: none;\n              border-radius: 0;\n            }\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <div class=\"header\">\n            <div class=\"title\">").concat(reportTitle, "</div>\n            <div class=\"date\">").concat(new Date().toLocaleDateString('uz-UZ'), "</div>\n          </div>\n          \n          <table>\n            <thead>\n              <tr>\n                <th>").concat(t('debts.form.creditor', 'Kreditor'), "</th>\n                <th>").concat(t('debts.form.amount', 'Summa'), "</th>\n                <th>").concat(t('debts.form.status', 'Holat'), "</th>\n                <th>").concat(t('debts.form.phone', 'Telefon'), "</th>\n                <th>").concat(t('debts.form.debtDate', 'Qarz sanasi'), "</th>\n                <th>").concat(t('debts.form.paidDate', 'To\'langan sana'), "</th>\n              </tr>\n            </thead>\n            <tbody>\n    ");

    // Add table rows
    reportData.forEach(function (debt) {
      htmlContent += "\n        <tr>\n          <td>".concat(debt.creditor, "</td>\n          <td>").concat((0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency, language), "</td>\n          <td class=\"status-").concat(debt.status, "\">").concat(debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'), "</td>\n          <td>").concat(debt.phone || t('common.notAvailable', 'Mavjud emas'), "</td>\n          <td>").concat(debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'), "</td>\n          <td>").concat(debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-', "</td>\n        </tr>\n      ");
    });

    // Close HTML
    htmlContent += "\n            </tbody>\n          </table>\n          \n          <div class=\"footer\">\n            <div>".concat(t('reports.generated', 'Yaratilgan'), ": ").concat(new Date().toLocaleString('uz-UZ'), "</div>\n            <div class=\"app-name\">").concat(t('app.title', 'Qarzdaftar'), " ").concat(new Date().getFullYear(), "</div>\n          </div>\n        </div>\n      </body>\n      </html>\n    ");

    // Create and download Excel file
    var blob = new Blob([htmlContent], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', "".concat(reportTitle.replace(/\s+/g, '_'), "_").concat(new Date().toISOString().slice(0, 10), ".xls"));
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  var printReport = function printReport() {
    var reportData = getReportData();
    var reportTitle = getReportTitle();

    // Create HTML content for printing with improved design
    var htmlContent = "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>".concat(reportTitle, "</title>\n        <meta charset=\"UTF-8\">\n        <style>\n          body { \n            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n            margin: 0;\n            padding: 20px;\n            background: #f9fafb;\n          }\n          .container { \n            max-width: 1000px;\n            margin: 0 auto;\n            background: white;\n            border-radius: 12px;\n            box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n            overflow: hidden;\n          }\n          .header { \n            background: linear-gradient(135deg, #f97316, #ef4444);\n            color: white;\n            padding: 25px 30px;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n          }\n          .title { \n            font-size: 24px;\n            font-weight: 700;\n          }\n          .date { \n            font-size: 16px;\n            opacity: 0.9;\n          }\n          table { \n            width: 100%;\n            border-collapse: collapse;\n          }\n          th { \n            background: #fff7ed;\n            padding: 15px;\n            text-align: left;\n            font-weight: 600;\n            color: #f97316;\n            border-bottom: 2px solid #f97316;\n          }\n          td { \n            padding: 12px;\n            border-bottom: 1px solid #e5e7eb;\n            font-size: 14px;\n          }\n          tr:nth-child(even) {\n            background-color: #fff7ed;\n          }\n          .status-pending { \n            color: #f97316; \n            font-weight: 600;\n          }\n          .status-paid { \n            color: #10b981; \n            font-weight: 600;\n          }\n          .footer {\n            text-align: center;\n            padding: 15px;\n            color: #6b7280;\n            font-size: 14px;\n            border-top: 1px solid #e5e7eb;\n            background: #f9fafb;\n          }\n          .app-name {\n            font-weight: 600;\n            color: #f97316;\n          }\n          @media print {\n            body {\n              background: white;\n              padding: 0;\n            }\n            .container {\n              box-shadow: none;\n              border-radius: 0;\n            }\n          }\n        </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <div class=\"header\">\n            <div class=\"title\">").concat(reportTitle, "</div>\n            <div class=\"date\">").concat(new Date().toLocaleDateString('uz-UZ'), "</div>\n          </div>\n          \n          <table>\n            <thead>\n              <tr>\n                <th>").concat(t('debts.form.creditor', 'Kreditor'), "</th>\n                <th>").concat(t('debts.form.amount', 'Summa'), "</th>\n                <th>").concat(t('debts.form.status', 'Holat'), "</th>\n                <th>").concat(t('debts.form.phone', 'Telefon'), "</th>\n                <th>").concat(t('debts.form.debtDate', 'Qarz sanasi'), "</th>\n                <th>").concat(t('debts.form.paidDate', 'To\'langan sana'), "</th>\n              </tr>\n            </thead>\n            <tbody>\n    ");

    // Add table rows
    reportData.forEach(function (debt) {
      htmlContent += "\n        <tr>\n          <td>".concat(debt.creditor, "</td>\n          <td>").concat((0, _debtUtils.formatCurrency)(debt.amount, debt.currency || currency, language), "</td>\n          <td class=\"status-").concat(debt.status, "\">").concat(debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'), "</td>\n          <td>").concat(debt.phone || t('common.notAvailable', 'Mavjud emas'), "</td>\n          <td>").concat(debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'), "</td>\n          <td>").concat(debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-', "</td>\n        </tr>\n      ");
    });

    // Close HTML
    htmlContent += "\n            </tbody>\n          </table>\n          \n          <div class=\"footer\">\n            <div>".concat(t('reports.generated', 'Yaratilgan'), ": ").concat(new Date().toLocaleString('uz-UZ'), "</div>\n            <div class=\"app-name\">").concat(t('app.title', 'Qarzdaftar'), " ").concat(new Date().getFullYear(), "</div>\n          </div>\n        </div>\n        \n        <script>\n          window.onload = function() {\n            window.print();\n          }\n        </script>\n      </body>\n      </html>\n    ");

    // Open in new window for printing
    var printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };
  var getReportTitle = function getReportTitle() {
    switch (reportType) {
      case 'pending':
        return t('reports.pendingDebts', 'Kutilayotgan Qarzlar Hisoboti');
      case 'paid':
        return t('reports.paidDebts', 'To\'langan Qarzlar Hisoboti');
      case 'monthly':
        return t('reports.monthlyReport', 'Oylik Hisobot');
      default:
        return t('reports.allDebts', 'Barcha Qarzlar Hisoboti');
    }
  };

  // Calculate analytics data based on MongoDB data
  var analyticsData = (0, _analyticsUtils.getAnalyticsData)(debts, analyticsPeriod, debtAdjustments, userTier, debtLimit);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-6xl mx-auto p-4 md:p-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
  }, t('analytics.title', 'Kengaytirilgan Analitika')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium"
  }, t('analytics.subtitle', 'Qarzlar haqida chuqur tahlil va statistikalar')))), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] md:hover:scale-[1.02] md:hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-start justify-between gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-xs font-medium mb-1"
  }, t('analytics.totalAmount', 'Jami summa')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm sm:text-base md:text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400 break-words leading-tight"
  }, (0, _debtUtils.formatCurrency)(analyticsData.totalAmount))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg flex-shrink-0"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] md:hover:scale-[1.02] md:hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-start justify-between gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-xs font-medium mb-1"
  }, t('analytics.pendingAmount', 'Kutilayotgan')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm sm:text-base md:text-lg lg:text-xl font-bold text-orange-600 dark:text-orange-400 break-words leading-tight"
  }, (0, _debtUtils.formatCurrency)(analyticsData.pendingAmount))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg flex-shrink-0"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] md:hover:scale-[1.02] md:hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-start justify-between gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-xs font-medium mb-1"
  }, t('analytics.paidAmount', 'To\'langan')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm sm:text-base md:text-lg lg:text-xl font-bold text-green-600 dark:text-green-400 break-words leading-tight"
  }, (0, _debtUtils.formatCurrency)(analyticsData.paidAmount))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg flex-shrink-0"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] md:hover:scale-[1.02] md:hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-600/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative flex items-start justify-between gap-2 md:gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600 dark:text-gray-400 text-xs font-medium mb-1"
  }, t('analytics.avgPaymentDays', 'O\'rtacha to\'lov')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm sm:text-base md:text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400 break-words leading-tight"
  }, analyticsData.avgPaymentDays, " ", t('analytics.days', 'kun'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md md:shadow-lg flex-shrink-0"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-4 h-4 md:w-5 md:h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-orange-500/5 via-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-5 h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
  }))), t('analytics.paymentStatus', 'To\'lov holati')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative w-56 h-56"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-56 h-56 transform -rotate-90",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    fill: "none",
    stroke: "#e5e7eb",
    strokeWidth: "6"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    fill: "none",
    stroke: "url(#pendingGradient)",
    strokeWidth: "6",
    strokeDasharray: "".concat(analyticsData.pendingAmount / analyticsData.totalAmount * 251.2, " 251.2"),
    strokeDashoffset: "0",
    strokeLinecap: "round"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    fill: "none",
    stroke: "url(#paidGradient)",
    strokeWidth: "6",
    strokeDasharray: "".concat(analyticsData.paidAmount / analyticsData.totalAmount * 251.2, " 251.2"),
    strokeDashoffset: "-".concat(analyticsData.pendingAmount / analyticsData.totalAmount * 251.2),
    strokeLinecap: "round"
  }), /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("linearGradient", {
    id: "pendingGradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "0%",
    stopColor: "#f97316"
  }), /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "100%",
    stopColor: "#ef4444"
  })), /*#__PURE__*/_react["default"].createElement("linearGradient", {
    id: "paidGradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "0%",
    stopColor: "#10b981"
  }), /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "100%",
    stopColor: "#059669"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-2xl font-bold text-gray-800 dark:text-white"
  }, analyticsData.totalDebts), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-sm text-gray-600 dark:text-gray-400 font-medium"
  }, t('analytics.totalDebts', 'Jami qarzlar')))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center gap-8 mt-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-sm text-gray-700 dark:text-gray-300 font-medium"
  }, t('analytics.pending', 'Kutilayotgan'), " (", analyticsData.pendingDebts, ")")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center gap-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-sm text-gray-700 dark:text-gray-300 font-medium"
  }, t('analytics.paid', 'To\'langan'), " (", analyticsData.paidDebts, ")"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-5 h-5 text-white",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), t('analytics.monthlyTrends', 'Oylik trendlar')), analyticsData.monthlyTrends.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, analyticsData.monthlyTrends.slice(-6).map(function (trend, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: trend.month,
      className: "bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-gray-600/40 hover:shadow-md transition-all duration-200"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between mb-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-sm font-semibold text-gray-700 dark:text-gray-300"
    }, new Date(trend.month + '-01').toLocaleDateString('uz-UZ', {
      month: 'short',
      year: 'numeric'
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-xs text-gray-500 dark:text-gray-400"
    }, Math.round(trend.paid / (trend.pending + trend.paid) * 100), "% to'langan")), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-4 mb-3"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-2 flex-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm text-gray-600 dark:text-gray-400 truncate"
    }, (0, _debtUtils.formatCurrency)(trend.pending))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-2 flex-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm text-gray-600 dark:text-gray-400 truncate"
    }, (0, _debtUtils.formatCurrency)(trend.paid)))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm",
      style: {
        width: "".concat(trend.paid / (trend.pending + trend.paid) * 100, "%")
      }
    })));
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-8 w-8 text-gray-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  }))), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-500 dark:text-gray-400 font-medium"
  }, t('analytics.noData', 'Ma\'lumotlar mavjud emas'))))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-12 pt-8 border-t border-gray-200"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, t('reports.reportType', 'Hisobot turi')), /*#__PURE__*/_react["default"].createElement("select", {
    value: reportType,
    onChange: function onChange(e) {
      return setReportType(e.target.value);
    },
    className: "w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400",
    style: {
      backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
      backgroundPosition: 'right 0.75rem center'
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "pending"
  }, t('reports.pendingDebts', 'Kutilayotgan qarzlar')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "paid"
  }, t('reports.paidDebts', 'To\'langan qarzlar')), /*#__PURE__*/_react["default"].createElement("option", {
    value: "monthly"
  }, t('reports.monthlyReport', 'Oylik hisobot')))), reportType === 'monthly' && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, t('reports.selectMonth', 'Oy tanlang')), /*#__PURE__*/_react["default"].createElement("input", {
    type: "month",
    value: reportMonth,
    onChange: function onChange(e) {
      return setReportMonth(e.target.value);
    },
    className: "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 mb-6 dark:text-white flex items-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6 mr-2 text-orange-500",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })), t('reports.generateReport', 'Hisobot yaratish')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-5"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onClick: generatePNGReport,
    className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-500 flex flex-col items-center text-center group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-7 w-7 text-orange-600 dark:text-orange-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  }))), /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('reports.generatePNG', 'PNG rasm')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('reports.pngDesc', 'Yuqori sifatli rasm'))), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: generateExcelReport,
    className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-500 flex flex-col items-center text-center group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-7 w-7 text-green-600 dark:text-green-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  }))), /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('reports.generateExcel', 'Excel jadval')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('reports.excelDesc', 'Jadval sifatida'))), /*#__PURE__*/_react["default"].createElement("div", {
    onClick: printReport,
    className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 flex flex-col items-center text-center group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-7 w-7 text-blue-600 dark:text-blue-400",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
  }))), /*#__PURE__*/_react["default"].createElement("h4", {
    className: "font-semibold text-gray-800 dark:text-white mb-1"
  }, t('reports.printReport', 'Chop etish')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, t('reports.printDesc', 'Bosma uchun tayyor'))))))));
}