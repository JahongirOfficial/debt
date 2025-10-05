import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function Analytics() {
  const [analytics, setAnalytics] = useState({
    userActivity: [],
    debtTrends: [],
    subscriptionAnalytics: {},
    deviceStats: {},
    locationStats: {}
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/admin/analytics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Analytics data received:', data.analytics);
        setAnalytics(data.analytics);
      } else {
        console.error('Failed to fetch analytics:', response.status);
        // Fallback ma'lumotlar
        setAnalytics({
          userActivity: { growth: 0, newUsers: 0 },
          debtTrends: { revenueGrowth: 0, debtGrowth: 0 },
          subscriptionAnalytics: { plans: [] },
          deviceStats: { devices: [] }
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback ma'lumotlar
      setAnalytics({
        userActivity: { growth: 0, newUsers: 0 },
        debtTrends: { revenueGrowth: 0, debtGrowth: 0 },
        subscriptionAnalytics: { plans: [] },
        deviceStats: { devices: [] }
      });
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-1/2"></div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-20 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analitika</h1>
            <p className="text-pink-100 text-lg">
              Loyiha bo'yicha batafsil tahlil va ko'rsatkichlar
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 border border-white border-opacity-30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
              >
                <option value="7d" className="text-gray-900">So'nggi 7 kun</option>
                <option value="30d" className="text-gray-900">So'nggi 30 kun</option>
                <option value="90d" className="text-gray-900">So'nggi 90 kun</option>
                <option value="1y" className="text-gray-900">So'nggi yil</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faollik o'sishi</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.userActivity?.growth || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daromad o'sishi</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.debtTrends?.revenueGrowth || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Qarzlar o'sishi</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.debtTrends?.debtGrowth || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Yangi foydalanuvchilar</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics.userActivity?.newUsers || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Foydalanuvchilar faolligi</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Faollik</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Grafik bu yerda ko'rsatiladi</p>
              <p className="text-sm mt-2">Foydalanuvchilar faollik dinamikasi</p>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Daromad tendensiyasi</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Daromad</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-lg font-medium">Grafik bu yerda ko'rsatiladi</p>
              <p className="text-sm mt-2">Daromad o'sish tendensiyasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subscription Analytics */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tariflar tahlili</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Tarif taqsimoti</span>
            </div>
          </div>
          <div className="space-y-6">
            {analytics.subscriptionAnalytics?.plans?.length > 0 ? analytics.subscriptionAnalytics.plans.map((plan, index) => {
              const colors = ['from-gray-500 to-gray-600', 'from-blue-500 to-blue-600', 'from-purple-500 to-purple-600'];
              const gradient = colors[index] || 'from-gray-500 to-gray-600';
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{plan.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{plan.count}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({plan.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${plan.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Ma'lumot yo'q</p>
                <p className="text-sm mt-1">Tariflar ma'lumoti topilmadi</p>
              </div>
            )}
          </div>
        </div>

        {/* Device Statistics */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Qurilmalar statistikasi</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Qurilma turlari</span>
            </div>
          </div>
          <div className="space-y-6">
            {analytics.deviceStats?.devices?.length > 0 ? analytics.deviceStats.devices.map((device, index) => {
              const colors = ['from-green-500 to-green-600', 'from-blue-500 to-blue-600', 'from-orange-500 to-red-500'];
              const gradient = colors[index] || 'from-gray-500 to-gray-600';
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradient}`}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{device.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{device.count}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({device.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium">Ma'lumot yo'q</p>
                <p className="text-sm mt-1">Qurilmalar ma'lumoti topilmadi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

