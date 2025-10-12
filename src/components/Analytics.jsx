import React, { useState, useEffect } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { getAnalyticsData } from '../utils/analyticsUtils';
import { formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { apiFetch } from '../utils/api'; // Import apiFetch utility
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarAnalytics() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, userTier, debtLimit } = useDebts();
  const [debtAdjustments, setDebtAdjustments] = useState([]);
  const [adjustmentsLoading, setAdjustmentsLoading] = useState(true);

  // Reports state
  const [reportType, setReportType] = useState('pending'); // 'pending', 'paid', 'monthly'
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  // Fixed period to 'month' since we're removing the selection UI
  const analyticsPeriod = 'month';

  // Fetch debt adjustments
  useEffect(() => {
    const fetchDebtAdjustments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await apiFetch('/debt-adjustments', { // Use apiFetch instead of fetch
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setDebtAdjustments(data.adjustments);
        }
      } catch (error) {
        console.error('Error fetching debt adjustments:', error);
      } finally {
        setAdjustmentsLoading(false);
      }
    };

    if (!loading) {
      fetchDebtAdjustments();
    }
  }, [loading]);

  // Show loading state
  if (loading || adjustmentsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <div className="h-10 w-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <SkeletonLoader type="analyticsStats" />
          <SkeletonLoader type="analyticsCharts" />
        </div>
      </div>
    );
  }

  // Reports functions
  const getReportData = () => {
    let reportDebts = debts;

    if (reportType === 'pending') {
      reportDebts = debts.filter(debt => debt.status === 'pending');
    } else if (reportType === 'paid') {
      reportDebts = debts.filter(debt => debt.status === 'paid');
    } else if (reportType === 'monthly') {
      const [year, month] = reportMonth.split('-');
      reportDebts = debts.filter(debt => {
        const debtDate = new Date(debt.debtDate || debt.createdAt);
        return debtDate.getFullYear() == year && debtDate.getMonth() + 1 == month;
      });
    }

    return reportDebts;
  };

  const generatePNGReport = () => {
    const reportData = getReportData();
    // Limit PNG report to only 15 people
    const limitedReportData = reportData.slice(0, 15);
    const reportTitle = getReportTitle();

    // Create high-resolution landscape canvas for PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 2400; // High resolution landscape width
    canvas.height = 1600; // High resolution landscape height
    const scale = 2; // Scale factor for high DPI

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
    const tableY = 100;
    const tableWidth = canvas.width / scale - 100;
    const tableHeight = canvas.height / scale - 150;
    const rowHeight = 40;
    const colWidths = [200, 180, 150, 220, 180, 180];

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
    const headers = [
      t('debts.form.creditor', 'Kreditor'),
      t('debts.form.amount', 'Summa'),
      t('debts.form.status', 'Holat'),
      t('debts.form.phone', 'Telefon'),
      t('debts.form.debtDate', 'Qarz sanasi'),
      t('debts.form.paidDate', 'To\'langan sana')
    ];

    headers.forEach((header, index) => {
      const x = 50 + colWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
      ctx.fillText(header, x + colWidths[index] / 2, tableY + 25);
    });

    // Table data
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';

    limitedReportData.forEach((debt, rowIndex) => {
      const rowY = tableY + rowHeight + (rowIndex * rowHeight);

      // Alternate row colors
      if (rowIndex % 2 === 0) {
        ctx.fillStyle = '#fff7ed';
        ctx.fillRect(50, rowY, tableWidth, rowHeight);
      }

      // Row data
      const rowData = [
        debt.creditor.length > 25 ? debt.creditor.substring(0, 25) + '...' : debt.creditor,
        formatCurrency(debt.amount, debt.currency || currency, language),
        debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan'),
        debt.phone ? debt.phone : t('common.notAvailable', 'Mavjud emas'),
        debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas'),
        debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'
      ];

      rowData.forEach((cell, colIndex) => {
        const x = 50 + colWidths.slice(0, colIndex).reduce((sum, width) => sum + width, 0);
        ctx.fillStyle = colIndex === 2 ? (debt.status === 'pending' ? '#f97316' : '#10b981') : '#374151';
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
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png', 1.0); // High quality PNG
  };

  const generateExcelReport = () => {
    const reportData = getReportData();
    const reportTitle = getReportTitle();

    // Create clean Excel-like table with improved styling
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportTitle}</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f9fafb;
          }
          .container { 
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #f97316, #ef4444);
            color: white;
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title { 
            font-size: 24px;
            font-weight: 700;
          }
          .date { 
            font-size: 16px;
            opacity: 0.9;
          }
          table { 
            width: 100%;
            border-collapse: collapse;
          }
          th { 
            background: #fff7ed;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #f97316;
            border-bottom: 2px solid #f97316;
          }
          td { 
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
          }
          tr:nth-child(even) {
            background-color: #fff7ed;
          }
          .status-pending { 
            color: #f97316; 
            font-weight: 600;
          }
          .status-paid { 
            color: #10b981; 
            font-weight: 600;
          }
          .footer {
            text-align: center;
            padding: 15px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
          }
          .app-name {
            font-weight: 600;
            color: #f97316;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .container {
              box-shadow: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">${reportTitle}</div>
            <div class="date">${new Date().toLocaleDateString('uz-UZ')}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>${t('debts.form.creditor', 'Kreditor')}</th>
                <th>${t('debts.form.amount', 'Summa')}</th>
                <th>${t('debts.form.status', 'Holat')}</th>
                <th>${t('debts.form.phone', 'Telefon')}</th>
                <th>${t('debts.form.debtDate', 'Qarz sanasi')}</th>
                <th>${t('debts.form.paidDate', 'To\'langan sana')}</th>
              </tr>
            </thead>
            <tbody>
    `;

    // Add table rows
    reportData.forEach(debt => {
      htmlContent += `
        <tr>
          <td>${debt.creditor}</td>
          <td>${formatCurrency(debt.amount, debt.currency || currency, language)}</td>
          <td class="status-${debt.status}">${debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}</td>
          <td>${debt.phone || t('common.notAvailable', 'Mavjud emas')}</td>
          <td>${debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas')}</td>
          <td>${debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'}</td>
        </tr>
      `;
    });

    // Close HTML
    htmlContent += `
            </tbody>
          </table>
          
          <div class="footer">
            <div>${t('reports.generated', 'Yaratilgan')}: ${new Date().toLocaleString('uz-UZ')}</div>
            <div class="app-name">${t('app.title', 'Qarzdaftar')} ${new Date().getFullYear()}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download Excel file
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportTitle.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printReport = () => {
    const reportData = getReportData();
    const reportTitle = getReportTitle();

    // Create HTML content for printing with improved design
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportTitle}</title>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f9fafb;
          }
          .container { 
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #f97316, #ef4444);
            color: white;
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .title { 
            font-size: 24px;
            font-weight: 700;
          }
          .date { 
            font-size: 16px;
            opacity: 0.9;
          }
          table { 
            width: 100%;
            border-collapse: collapse;
          }
          th { 
            background: #fff7ed;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #f97316;
            border-bottom: 2px solid #f97316;
          }
          td { 
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 14px;
          }
          tr:nth-child(even) {
            background-color: #fff7ed;
          }
          .status-pending { 
            color: #f97316; 
            font-weight: 600;
          }
          .status-paid { 
            color: #10b981; 
            font-weight: 600;
          }
          .footer {
            text-align: center;
            padding: 15px;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
            background: #f9fafb;
          }
          .app-name {
            font-weight: 600;
            color: #f97316;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .container {
              box-shadow: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">${reportTitle}</div>
            <div class="date">${new Date().toLocaleDateString('uz-UZ')}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>${t('debts.form.creditor', 'Kreditor')}</th>
                <th>${t('debts.form.amount', 'Summa')}</th>
                <th>${t('debts.form.status', 'Holat')}</th>
                <th>${t('debts.form.phone', 'Telefon')}</th>
                <th>${t('debts.form.debtDate', 'Qarz sanasi')}</th>
                <th>${t('debts.form.paidDate', 'To\'langan sana')}</th>
              </tr>
            </thead>
            <tbody>
    `;

    // Add table rows
    reportData.forEach(debt => {
      htmlContent += `
        <tr>
          <td>${debt.creditor}</td>
          <td>${formatCurrency(debt.amount, debt.currency || currency, language)}</td>
          <td class="status-${debt.status}">${debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}</td>
          <td>${debt.phone || t('common.notAvailable', 'Mavjud emas')}</td>
          <td>${debt.debtDate ? new Date(debt.debtDate).toLocaleDateString('uz-UZ') : t('common.notAvailable', 'Mavjud emas')}</td>
          <td>${debt.paidAt ? new Date(debt.paidAt).toLocaleDateString('uz-UZ') : '-'}</td>
        </tr>
      `;
    });

    // Close HTML
    htmlContent += `
            </tbody>
          </table>
          
          <div class="footer">
            <div>${t('reports.generated', 'Yaratilgan')}: ${new Date().toLocaleString('uz-UZ')}</div>
            <div class="app-name">${t('app.title', 'Qarzdaftar')} ${new Date().getFullYear()}</div>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
  };

  const getReportTitle = () => {
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
  const analyticsData = getAnalyticsData(debts, analyticsPeriod, debtAdjustments, userTier, debtLimit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {t('analytics.title', 'Kengaytirilgan Analitika')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
              {t('analytics.subtitle', 'Qarzlar haqida chuqur tahlil va statistikalar')}
            </p>
          </div>
        </div>

        {/* Analytics Data */}
        <>
          {/* Modern Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">{t('analytics.totalAmount', 'Jami summa')}</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 break-words leading-tight">{formatCurrency(analyticsData.totalAmount)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">{t('analytics.pendingAmount', 'Kutilayotgan')}</p>
                  <p className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 break-words leading-tight">{formatCurrency(analyticsData.pendingAmount)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">{t('analytics.paidAmount', 'To\'langan')}</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 break-words leading-tight">{formatCurrency(analyticsData.paidAmount)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">{t('analytics.avgPaymentDays', 'O\'rtacha to\'lov')}</p>
                  <p className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 break-words leading-tight">{analyticsData.avgPaymentDays} {t('analytics.days', 'kun')}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Enhanced Circular Chart - Payment Status */}
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  {t('analytics.paymentStatus', 'To\'lov holati')}
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-56 h-56">
                    <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle with gradient */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="6"
                      />
                      {/* Pending arc with gradient */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#pendingGradient)"
                        strokeWidth="6"
                        strokeDasharray={`${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Paid arc with gradient */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#paidGradient)"
                        strokeWidth="6"
                        strokeDasharray={`${(analyticsData.paidAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                        strokeDashoffset={`-${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2}`}
                        strokeLinecap="round"
                      />
                      {/* Gradient definitions */}
                      <defs>
                        <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                        <linearGradient id="paidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                        <div className="text-2xl font-bold text-gray-800 dark:text-white">{analyticsData.totalDebts}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('analytics.totalDebts', 'Jami qarzlar')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-8 mt-6">
                  <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                    <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t('analytics.pending', 'Kutilayotgan')} ({analyticsData.pendingDebts})</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t('analytics.paid', 'To\'langan')} ({analyticsData.paidDebts})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Trend Chart - Monthly Trends */}
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  {t('analytics.monthlyTrends', 'Oylik trendlar')}
                </h3>
                {analyticsData.monthlyTrends.length > 0 ? (
                  <div className="space-y-4">
                    {analyticsData.monthlyTrends.slice(-6).map((trend, index) => (
                      <div key={trend.month} className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-gray-600/40 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {new Date(trend.month + '-01').toLocaleDateString('uz-UZ', { month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round((trend.paid / (trend.pending + trend.paid)) * 100)}% to'langan
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{formatCurrency(trend.pending)}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{formatCurrency(trend.paid)}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${(trend.paid / (trend.pending + trend.paid)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">{t('analytics.noData', 'Ma\'lumotlar mavjud emas')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>

        {/* Creditors Ranking */}
        {/* Removed as per user request */}

        {/* Reports Section - Added below analytics */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('reports.reportType', 'Hisobot turi')}
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-no-repeat bg-right-center bg-[length:20px_20px] transition-all duration-200 hover:border-orange-400"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center'
                }}
              >
                <option value="pending">{t('reports.pendingDebts', 'Kutilayotgan qarzlar')}</option>
                <option value="paid">{t('reports.paidDebts', 'To\'langan qarzlar')}</option>
                <option value="monthly">{t('reports.monthlyReport', 'Oylik hisobot')}</option>
              </select>
            </div>

            {reportType === 'monthly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('reports.selectMonth', 'Oy tanlang')}
                </label>
                <input
                  type="month"
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
                />
              </div>
            )}
          </div>

          {/* Report Generation Buttons - Modernized Design */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('reports.generateReport', 'Hisobot yaratish')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* PNG Report Card */}
              <div
                onClick={generatePNGReport}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-500 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{t('reports.generatePNG', 'PNG rasm')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('reports.pngDesc', 'Yuqori sifatli rasm')}</p>
              </div>

              {/* Excel Report Card */}
              <div
                onClick={generateExcelReport}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-500 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{t('reports.generateExcel', 'Excel jadval')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('reports.excelDesc', 'Jadval sifatida')}</p>
              </div>

              {/* Print Report Card */}
              <div
                onClick={printReport}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{t('reports.printReport', 'Chop etish')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('reports.printDesc', 'Bosma uchun tayyor')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}