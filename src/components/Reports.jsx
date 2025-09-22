import React, { useState } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarReports() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading } = useDebts();
  
  // Reports state
  const [reportType, setReportType] = useState('pending'); // 'pending', 'paid', 'monthly'
  const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex space-x-4 mb-6">
          <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <SkeletonLoader type="reportsList" />
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
    
    reportData.forEach((debt, rowIndex) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('reports.title', 'Hisobotlar')}</h2>
        <p className="text-gray-600">{t('reports.subtitle', 'Qarzlar haqida batafsil hisobotlar yarating')}</p>
      </div>
      
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
      
      {/* Report Generation Buttons */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl dark:bg-gray-800/80 mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">
          {t('reports.generateReport', 'Hisobot yaratish')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={generatePNGReport}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{t('reports.generatePNG', 'PNG rasm')}</span>
          </button>
          
          <button
            onClick={generateExcelReport}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">{t('reports.generateExcel', 'Excel jadval')}</span>
          </button>
          
          <button
            onClick={printReport}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span className="font-medium">{t('reports.printReport', 'Chop etish')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}