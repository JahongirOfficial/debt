import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDebts: 0,
    totalRevenue: 0,
    newUsersToday: 0,
    newDebtsToday: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await apiFetch('/admin/dashboard-stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, gradient, fontSize = "text-3xl" }) => (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <p className={`${fontSize} font-bold text-gray-900 dark:text-white`}>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
        
        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Qarzdaftar admin paneliga xush kelibsiz
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Barcha Foydalanuvchilar"
          value={stats.totalUsers.toLocaleString()}
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Barcha Qarzlar"
          value={stats.totalDebts.toLocaleString() + " ta"}
          icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          gradient="from-green-500 to-green-600"
        />
        <StatCard
          title="Umumiy Qarz Summasi"
          value={`${stats.totalRevenue.toLocaleString()} UZS`}
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          gradient="from-purple-500 to-pink-500"
          fontSize="text-xl"
        />
      </div>

      {/* Additional Stats */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Qo'shimcha Ma'lumotlar</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Tizim statistikasi</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bugungi yangi foydalanuvchilar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.newUsersToday}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bugungi yangi qarzlar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.newDebtsToday}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faol foydalanuvchilar</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faollik darajasi</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tezkor amallar</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center space-x-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-200">
            <div className="p-2 bg-blue-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="font-medium text-blue-700 dark:text-blue-300">Foydalanuvchilar</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-xl bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200">
            <div className="p-2 bg-green-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-medium text-green-700 dark:text-green-300">Tariflar</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200">
            <div className="p-2 bg-purple-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-medium text-purple-700 dark:text-purple-300">Hisobotlar</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors duration-200">
            <div className="p-2 bg-orange-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="font-medium text-orange-700 dark:text-orange-300">Analitika</span>
          </button>
        </div>
      </div>
    </div>
  );
}

