import React, { useState } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { groupDebtsByDate, formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarDashboard() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, error } = useDebts();
  
  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <SkeletonLoader type="dashboardStats" />
        <SkeletonLoader type="dashboardActivity" />
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Xato! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }
  
  // Calculate statistics for dashboard
  const totalDebt = debts
    .filter(debt => debt.status === 'pending')
    .reduce((sum, debt) => sum + debt.amount, 0);

  const paidDebts = debts.filter(debt => debt.status === 'paid');
  
  const pendingDebtsCount = debts.filter(debt => debt.status === 'pending').length;
  const paidDebtsCount = paidDebts.length;
  const totalDebtsCount = debts.length;
  
  // Get paid amount trend data (last 7 days)
  const paidTrendData = debts
    .filter(debt => debt.status === 'paid')
    .slice(-7)
    .map(debt => ({
      date: debt.paidAt || debt.updatedAt || debt.createdAt,
      amount: debt.amount
    }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.title', 'Bosh sahifa')}</h2>
        <p className="text-gray-600">{t('dashboard.subtitle', 'Qarzlar va moliyaviy ma\'lumotlar')}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{t('dashboard.totalDebt', 'Umumiy qarz')}</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDebt, currency, language)}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{t('dashboard.pending', 'Kutilayotgan')}</p>
              <p className="text-2xl font-bold text-orange-600">{pendingDebtsCount}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{t('dashboard.paid', 'To\'langan')}</p>
              <p className="text-2xl font-bold text-green-600">{paidDebtsCount}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Paid Amount Trend Visualization */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.totalPaid', 'To\'langan summa')}</h3>
          <span className="text-sm text-gray-500">{t('dashboard.last7Days', 'Oxirgi 7 kun')}</span>
        </div>
        
        {paidTrendData.length > 0 ? (
          <div className="flex items-end justify-between h-32 gap-2 mt-6">
            {paidTrendData.map((item, index) => {
              // Calculate bar height based on amount (max height is 100px)
              const maxAmount = Math.max(...paidTrendData.map(d => d.amount), 1);
              const barHeight = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
              
              // Format date for display
              const date = new Date(item.date);
              const day = date.toLocaleDateString('uz-UZ', { day: 'numeric' });
              const weekday = date.toLocaleDateString('uz-UZ', { weekday: 'short' });
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center w-full">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-md transition-all duration-300 hover:opacity-75"
                      style={{ height: `${barHeight}%`, minHeight: barHeight > 0 ? '4px' : '0px' }}
                    ></div>
                    <div className="mt-2 text-center">
                      <div className="text-xs font-medium text-gray-700">{day}</div>
                      <div className="text-xs text-gray-500">{weekday}</div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-gray-800">
                    {formatCurrency(item.amount, currency, language)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <p className="text-gray-500">{t('dashboard.noPaidData', 'To\'langan qarzlar mavjud emas')}</p>
          </div>
        )}
      </div>
      

      
      {/* Recent Activity */}
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{t('dashboard.recentActivity', 'So\'nggi faoliyat')}</h3>
        {debts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('dashboard.noActivity', 'Hali faoliyat yo\'q')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {debts.slice(0, 5).map(debt => (
              <div key={debt._id} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    debt.status === 'pending' 
                      ? 'bg-gradient-to-br from-orange-500 to-red-500'
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    {debt.creditor.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{debt.creditor}</p>
                    <p className="text-sm text-gray-600">{new Date(debt.createdAt).toLocaleDateString('uz-UZ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    debt.status === 'pending' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatCurrency(debt.amount, debt.currency || currency, language)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {debt.status === 'pending' ? t('common.pending', 'Kutilmoqda') : t('common.paid', 'To\'langan')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}