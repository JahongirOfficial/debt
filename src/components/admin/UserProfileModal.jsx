import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function UserProfileModal({ isOpen, userId, username, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserProfile();
    }
  }, [isOpen, userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFetch(`/admin/users/${userId}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      } else {
        setError('Foydalanuvchi ma\'lumotlarini olishda xatolik');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Server bilan bog\'lanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency = 'UZS') => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' ' + currency;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionBadge = (subscription) => {
    const config = {
      free: { color: 'bg-gray-100 text-gray-800', text: 'Bepul' },
      lite: { color: 'bg-green-100 text-green-800', text: 'Lite' },
      standard: { color: 'bg-blue-100 text-blue-800', text: 'Standart' },
      pro: { color: 'bg-purple-100 text-purple-800', text: 'Professional' }
    };
    const sub = config[subscription] || config.free;
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${sub.color}`}>
        {sub.text}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-green-100 text-green-800', text: 'Faol' },
      suspended: { color: 'bg-red-100 text-red-800', text: 'Bloklangan' }
    };
    const stat = config[status] || config.active;
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${stat.color}`}>
        {stat.text}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {username || 'Foydalanuvchi'} profili
                  </h3>
                  <p className="text-blue-100">To'liq ma'lumotlar</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Xatolik yuz berdi</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
              </div>
            ) : profile ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Foydalanuvchi ma'lumotlari
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Foydalanuvchi nomi</label>
                      <p className="text-gray-900 dark:text-white font-semibold">{profile.user.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Telefon</label>
                      <p className="text-gray-900 dark:text-white font-semibold">{profile.user.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Holat</label>
                      <div className="mt-1">
                        {getStatusBadge(profile.user.status)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Obuna</label>
                      <div className="mt-1">
                        {getSubscriptionBadge(profile.user.subscriptionTier)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Ro'yxatdan o'tgan</label>
                      <p className="text-gray-900 dark:text-white">{formatDate(profile.user.createdAt)}</p>
                    </div>
                    {profile.user.subscriptionExpiresAt && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Obuna tugaydi</label>
                        <p className="text-orange-600 dark:text-orange-400 font-semibold">
                          {formatDate(profile.user.subscriptionExpiresAt)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Telegram Info */}
                  {profile.user.telegramId && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Telegram</h5>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 dark:text-green-400">✓ Ulangan</span>
                        {profile.user.telegramUsername && (
                          <span className="text-gray-600 dark:text-gray-400">@{profile.user.telegramUsername}</span>
                        )}
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatDate(profile.user.telegramConnectedAt)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {profile.stats.totalDebts}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Jami qarzlar</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {profile.stats.pendingDebts}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">To'lanmagan</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {profile.stats.paidDebts}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">To'langan</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {profile.stats.dueTodayCount}
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400">Bugun</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {profile.stats.dueTomorrowCount}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Ertaga</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-xl">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(profile.stats.totalAmount)}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Jami summa</div>
                  </div>
                </div>

                {/* Due Today */}
                {profile.dueToday.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Bugun qarz keltiruvchilar ({profile.stats.dueTodayCount} kishi)
                    </h4>
                    <div className="space-y-3">
                      {profile.dueToday.map((debt, index) => (
                        <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{debt.creditor}</p>
                            {debt.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{debt.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600 dark:text-red-400">
                              {formatCurrency(debt.amount, debt.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Due Tomorrow */}
                {profile.dueTomorrow.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Ertaga qarz keltiruvchilar ({profile.stats.dueTomorrowCount} kishi)
                    </h4>
                    <div className="space-y-3">
                      {profile.dueTomorrow.map((debt, index) => (
                        <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{debt.creditor}</p>
                            {debt.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{debt.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-yellow-600 dark:text-yellow-400">
                              {formatCurrency(debt.amount, debt.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overdue */}
                {profile.overdue.length > 0 && (
                  <div className="bg-red-100 dark:bg-red-900 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Muddati o'tgan qarzdorlar ({profile.stats.overdueCount} kishi)
                    </h4>
                    <div className="space-y-3">
                      {profile.overdue.map((debt, index) => (
                        <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{debt.creditor}</p>
                            {debt.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{debt.description}</p>
                            )}
                            <p className="text-xs text-red-600 dark:text-red-400">
                              {debt.daysOverdue} kun kechikkan
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600 dark:text-red-400">
                              {formatCurrency(debt.amount, debt.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No debts message */}
                {profile.stats.totalDebts === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Qarzlar yo'q</h3>
                    <p className="text-gray-600 dark:text-gray-400">Bu foydalanuvchida hech qanday qarz yo'q</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}