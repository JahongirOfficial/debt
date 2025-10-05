import React, { useState, useEffect } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { groupDebtsByDate, formatCurrency } from '../utils/debtUtils';
import { useDebts } from '../utils/DebtContext';
import { useAuth } from '../utils/AuthContext';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarDashboard() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);
  const { debts, loading, error } = useDebts();
  const { user, settings } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <SkeletonLoader type="dashboardStats" />
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

  // Get paid amount trend data (last 7 days) - REMOVED as per user request

  // Get current time formatted
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t('dashboard.goodMorning', 'Xayrli tong');
    if (hour < 18) return t('dashboard.goodAfternoon', 'Xayrli kun');
    return t('dashboard.goodEvening', 'Xayrli kech');
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('uz-UZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate additional statistics
  const totalPaidAmount = paidDebts.reduce((sum, debt) => sum + debt.amount, 0);
  const averageDebtAmount = debts.length > 0 ? totalDebt / pendingDebtsCount || 0 : 0;
  const completionRate = totalDebtsCount > 0 ? Math.round((paidDebtsCount / totalDebtsCount) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Modern Header with Greeting */}
      <div className={`relative overflow-hidden rounded-3xl p-8 ${settings.theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 border border-slate-700/50'
        : 'bg-gradient-to-br from-white via-blue-50 to-white border border-gray-200'
        } shadow-2xl`}>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                }`}>
                {getGreeting()}, {user?.username || 'Foydalanuvchi'}! 👋
              </h1>
              <p className={`text-lg ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                }`}>
                {t('dashboard.subtitle', 'Qarzlar va moliyaviy ma\'lumotlar')}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-slate-200' : 'text-blue-600'
                }`}>
                {formatTime()}
              </div>
              <div className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}>
                {formatDate()}
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Debt Card */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
          : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200'
          } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                QARZ
              </div>
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
              {t('dashboard.totalDebt', 'Umumiy qarz')}
            </p>
            <p className="text-2xl font-bold text-red-600 mb-2">
              {formatCurrency(totalDebt, currency, language)}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{pendingDebtsCount} ta faol qarz</span>
            </div>
          </div>
        </div>

        {/* Paid Amount Card */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
          } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                TO'LANGAN
              </div>
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
              {t('dashboard.totalPaid', 'Jami to\'langan')}
            </p>
            <p className="text-2xl font-bold text-green-600 mb-2">
              {formatCurrency(totalPaidAmount, currency, language)}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{paidDebtsCount} ta to'langan qarz</span>
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
          } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                FOIZ
              </div>
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
              {t('dashboard.completionRate', 'Bajarilish foizi')}
            </p>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              {completionRate}%
            </p>
            <div className={`w-full rounded-full h-2 ${settings.theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Average Debt Card */}
        <div className={`relative overflow-hidden rounded-2xl p-6 ${settings.theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
          : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
          } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                O'RTACHA
              </div>
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
              {t('dashboard.averageDebt', 'O\'rtacha qarz')}
            </p>
            <p className="text-2xl font-bold text-purple-600 mb-2">
              {formatCurrency(averageDebtAmount, currency, language)}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>Har bir qarz uchun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity with Modern Design */}
      <div className={`rounded-3xl p-8 ${settings.theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50'
        : 'bg-white border border-gray-200'
        } shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-2xl font-bold ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
            }`}>
            {t('dashboard.recentActivity', 'So\'nggi faoliyat')}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}>
              Jonli
            </span>
          </div>
        </div>

        {debts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className={`text-lg font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}>
              {t('dashboard.noActivity', 'Hali faoliyat yo\'q')}
            </p>
            <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
              }`}>
              Birinchi qarzingizni qo'shing
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {debts.slice(0, 5).map((debt, index) => (
              <div
                key={debt._id}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${settings.theme === 'dark'
                  ? 'bg-slate-700/60 hover:bg-slate-700/80'
                  : 'bg-gray-50 hover:bg-gray-100'
                  } border ${settings.theme === 'dark' ? 'border-slate-600/50' : 'border-gray-200'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${debt.status === 'pending'
                    ? 'bg-gradient-to-br from-orange-500 to-red-500'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                    {debt.creditor.charAt(0).toUpperCase()}
                    {debt.status === 'pending' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold text-lg ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                      }`}>
                      {debt.creditor}
                    </p>
                    <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                      {new Date(debt.createdAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold mb-1 ${debt.status === 'pending' ? 'text-red-600' : 'text-green-600'
                    }`}>
                    {formatCurrency(debt.amount, debt.currency || currency, language)}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${debt.status === 'pending'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                    }`}>
                    {debt.status === 'pending' ? (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        {t('common.pending', 'Kutilmoqda')}
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {t('common.paid', 'To\'langan')}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {debts.length > 5 && (
              <div className="text-center pt-4">
                <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${settings.theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } shadow-lg hover:shadow-xl`}>
                  Barchasini ko'rish ({debts.length - 5} ta qolgan)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}