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
  const t = useTranslation(language);
  const { debts, loading } = useDebts();
  const [debtAdjustments, setDebtAdjustments] = useState([]);
  const [adjustmentsLoading, setAdjustmentsLoading] = useState(true);
  
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-5 w-80 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <SkeletonLoader type="analyticsStats" />
        <SkeletonLoader type="analyticsCharts" />
      </div>
    );
  }

  // Calculate analytics data based on MongoDB data
  const analyticsData = getAnalyticsData(debts, analyticsPeriod, debtAdjustments);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('analytics.title', 'Kengaytirilgan Analitika')}</h2>
        <p className="text-gray-600">{t('analytics.subtitle', 'Qarzlar haqida chuqur tahlil va statistikalar')}</p>
      </div>
      
      {/* Analytics Data */}
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('analytics.totalAmount', 'Jami summa')}</p>
                <p className="text-xl font-bold text-blue-600 truncate">{formatCurrency(analyticsData.totalAmount)}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('analytics.pendingAmount', 'Kutilayotgan')}</p>
                <p className="text-xl font-bold text-orange-600 truncate">{formatCurrency(analyticsData.pendingAmount)}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('analytics.paidAmount', 'To\'langan')}</p>
                <p className="text-xl font-bold text-green-600 truncate">{formatCurrency(analyticsData.paidAmount)}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{t('analytics.avgPaymentDays', 'O\'rtacha to\'lov')}</p>
                <p className="text-xl font-bold text-purple-600">{analyticsData.avgPaymentDays} {t('analytics.days', 'kun')}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Circular Chart - Payment Status */}
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              {t('analytics.paymentStatus', 'To\'lov holati')}
            </h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Pending arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeDasharray={`${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  {/* Paid arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${(analyticsData.paidAmount / analyticsData.totalAmount) * 251.2} 251.2`}
                    strokeDashoffset={`-${(analyticsData.pendingAmount / analyticsData.totalAmount) * 251.2}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{analyticsData.totalDebts}</div>
                    <div className="text-sm text-gray-600">{t('analytics.totalDebts', 'Jami qarzlar')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t('analytics.pending', 'Kutilayotgan')} ({analyticsData.pendingDebts})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{t('analytics.paid', 'To\'langan')} ({analyticsData.paidDebts})</span>
              </div>
            </div>
          </div>
          
          {/* Trend Chart - Monthly Trends */}
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {t('analytics.monthlyTrends', 'Oylik trendlar')}
            </h3>
            {analyticsData.monthlyTrends.length > 0 ? (
              <div className="space-y-3">
                {analyticsData.monthlyTrends.slice(-6).map((trend, index) => (
                  <div key={trend.month} className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {new Date(trend.month + '-01').toLocaleDateString('uz-UZ', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm truncate max-w-[80px]">{formatCurrency(trend.pending)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm truncate max-w-[80px]">{formatCurrency(trend.paid)}</span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full" 
                          style={{ width: `${(trend.paid / (trend.pending + trend.paid)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('analytics.noData', 'Ma\'lumotlar mavjud emas')}
              </div>
            )}
          </div>
        </div>
        
        {/* Creditors Ranking */}
        {/* Removed as per user request */}
      </>
    </div>
  );
}