"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QarzdaftarReports = QarzdaftarReports;
var _react = _interopRequireWildcard(require("react"));
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _debtUtils = require("../utils/debtUtils");
var _DebtContext = require("../utils/DebtContext");
var _SkeletonLoader = require("./SkeletonLoader");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function QarzdaftarReports() {
  var _useStoredState = (0, _storageUtils.useStoredState)('qarzdaftar_language', 'uz'),
    _useStoredState2 = _slicedToArray(_useStoredState, 1),
    language = _useStoredState2[0];
  var _useStoredState3 = (0, _storageUtils.useStoredState)('qarzdaftar_currency', 'UZS'),
    _useStoredState4 = _slicedToArray(_useStoredState3, 1),
    currency = _useStoredState4[0];
  var t = (0, _translationUtils.useTranslation)(language);
  var _useDebts = (0, _DebtContext.useDebts)(),
    debts = _useDebts.debts,
    loading = _useDebts.loading;

  // Reports state
  var _useState = (0, _react.useState)('pending'),
    _useState2 = _slicedToArray(_useState, 2),
    reportType = _useState2[0],
    setReportType = _useState2[1]; // 'pending', 'paid', 'monthly'
  var _useState3 = (0, _react.useState)(new Date().toISOString().slice(0, 7)),
    _useState4 = _slicedToArray(_useState3, 2),
    reportMonth = _useState4[0],
    setReportMonth = _useState4[1]; // YYYY-MM format

  // Show loading state
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-4xl mx-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "mb-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-5 w-64 bg-gray-200 rounded animate-pulse"
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex space-x-4 mb-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-10 w-24 bg-gray-200 rounded-full animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-10 w-24 bg-gray-200 rounded-full animate-pulse"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-10 w-24 bg-gray-200 rounded-full animate-pulse"
    })), /*#__PURE__*/_react["default"].createElement(_SkeletonLoader.SkeletonLoader, {
      type: "reportsList"
    }));
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
    reportData.forEach(function (debt, rowIndex) {
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/_react["default"].createElement("h2", {
    className: "text-3xl font-bold text-gray-800 mb-2"
  }, t('reports.title', 'Hisobotlar')), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-gray-600"
  }, t('reports.subtitle', 'Qarzlar haqida batafsil hisobotlar yarating'))), /*#__PURE__*/_react["default"].createElement("div", {
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
    className: "bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl dark:bg-gray-800/80 mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 mb-4 dark:text-white"
  }, t('reports.generateReport', 'Hisobot yaratish')), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: generatePNGReport,
    className: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-8 w-8 mb-2",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, t('reports.generatePNG', 'PNG rasm'))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: generateExcelReport,
    className: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-8 w-8 mb-2",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, t('reports.generateExcel', 'Excel jadval'))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: printReport,
    className: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-8 w-8 mb-2",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "font-medium"
  }, t('reports.printReport', 'Chop etish'))))));
}