import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function BusinessOwnersSection() {
  const [businessOwners, setBusinessOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [ownerDebts, setOwnerDebts] = useState([]);
  const [debtsLoading, setDebtsLoading] = useState(false);
  const [showDebtsModal, setShowDebtsModal] = useState(false);

  useEffect(() => {
    fetchBusinessOwners();
  }, []);

  const fetchBusinessOwners = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/admin/business-owners', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBusinessOwners(data.businessOwners || []);
      }
    } catch (error) {
      console.error('Error fetching business owners:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOwners = businessOwners.filter(owner => {
    const matchesSearch = owner.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         owner.phone?.includes(searchTerm);
    const matchesTier = filterTier === 'all' || owner.subscriptionTier === filterTier;
    // Faqat faol biznes egalarini ko'rsatish
    return matchesSearch && matchesTier && owner.isActive !== false;
  });

  const getTierColor = (tier) => {
    switch (tier) {
      case 'pro': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'standard': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'lite': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'free': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'pro': return '👑';
      case 'standard': return '⭐';
      case 'lite': return '🌟';
      case 'free': return '👤';
      default: return '👤';
    }
  };

  const handleViewDebts = async (ownerId) => {
    try {
      setDebtsLoading(true);
      setShowDebtsModal(true);
      
      const owner = businessOwners.find(o => o._id === ownerId);
      setSelectedOwner(owner);

      const response = await apiFetch(`/admin/business-owner-debts/${ownerId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOwnerDebts(data.debts || []);
      }
    } catch (error) {
      console.error('Error fetching owner debts:', error);
    } finally {
      setDebtsLoading(false);
    }
  };

  const formatAmount = (amount) => {
    if (!amount || isNaN(amount)) return '0';
    return Number(amount).toLocaleString('uz-UZ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sana yo\'q';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Noto\'g\'ri sana';
      return date.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return 'Noto\'g\'ri sana';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            👨‍💼 Biznes Egalari
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Barcha biznes egalari va ularning ma'lumotlari
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {filteredOwners.length} ta egalar
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Ism yoki telefon bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Barcha tariflar</option>
            <option value="free">Free</option>
            <option value="lite">Lite</option>
            <option value="standard">Standard</option>
            <option value="pro">Pro</option>
          </select>
        </div>
      </div>

      {/* Business Owners List */}
      <div className="space-y-4">
        {filteredOwners.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Biznes egalari topilmadi
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Qidiruv mezonlaringizga mos biznes egalari yo'q
            </p>
          </div>
        ) : (
          filteredOwners.map((owner) => (
            <div
              key={owner._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {owner.username?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {owner.username || 'Noma\'lum'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {owner.phone || 'Telefon yo\'q'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Statistics with Limits */}
                <div className="hidden sm:flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className={`font-semibold ${owner.isOverLimit?.debts ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                      {owner.usage?.debts || owner.stats?.totalDebts || 0}
                      {owner.limits?.debts !== 'Cheksiz' && (
                        <span className="text-gray-400 text-xs">/{owner.limits?.debts}</span>
                      )}
                      {owner.isOverLimit?.debts && (
                        <span className="ml-1 text-red-500">⚠️</span>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Qarzlar</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${owner.isOverLimit?.employees ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                      {owner.usage?.employees || owner.stats?.totalEmployees || 0}
                      {owner.limits?.employees !== 'Cheksiz' && (
                        <span className="text-gray-400 text-xs">/{owner.limits?.employees}</span>
                      )}
                      {owner.isOverLimit?.employees && (
                        <span className="ml-1 text-red-500">⚠️</span>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Xodimlar</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${owner.isOverLimit?.branches ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                      {owner.usage?.branches || owner.stats?.totalBranches || 0}
                      {owner.limits?.branches !== 'Cheksiz' && (
                        <span className="text-gray-400 text-xs">/{owner.limits?.branches}</span>
                      )}
                      {owner.isOverLimit?.branches && (
                        <span className="ml-1 text-red-500">⚠️</span>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Filiallar</div>
                  </div>
                </div>

                {/* Subscription Tier */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTierIcon(owner.subscriptionTier)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(owner.subscriptionTier)}`}>
                    {owner.subscriptionTier?.toUpperCase() || 'FREE'}
                  </span>
                </div>

                {/* Registration Date */}
                <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                  {owner.createdAt ? new Date(owner.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum'}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewDebts(owner._id)}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                    title="Qarzlarni ko'rish"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredOwners.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredOwners.filter(o => o.subscriptionTier === 'free').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Free</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredOwners.filter(o => o.subscriptionTier === 'lite').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Lite</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredOwners.filter(o => o.subscriptionTier === 'standard').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Standard</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredOwners.filter(o => o.subscriptionTier === 'pro').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Pro</div>
            </div>
          </div>
        </div>
      )}

      {/* Debts Modal */}
      {showDebtsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedOwner?.username} - Qarzlar ro'yxati
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Tarif: <span className="font-medium">{selectedOwner?.subscriptionTier?.toUpperCase()}</span>
                  {selectedOwner?.limits?.debts !== 'Cheksiz' && (
                    <span className="ml-2">
                      Limit: {selectedOwner?.usage?.debts || 0}/{selectedOwner?.limits?.debts}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowDebtsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {debtsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : ownerDebts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Qarzdor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Miqdor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Muddat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Holat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {ownerDebts.map((debt) => (
                        <tr 
                          key={debt._id} 
                          className={`${debt.isOverLimit 
                            ? 'opacity-50 bg-gray-100 dark:bg-gray-700' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          } transition-colors duration-150`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-sm font-medium ${debt.isOverLimit 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-gray-900 dark:text-white'
                              }`}>
                                {debt.debtIndex}
                              </span>
                              {debt.isOverLimit && (
                                <span className="ml-2 text-red-500" title="Limitdan oshgan">⚠️</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${debt.isOverLimit 
                              ? 'text-gray-500 dark:text-gray-400' 
                              : 'text-gray-900 dark:text-white'
                            }`}>
                              {debt.debtorName || 'Noma\'lum'}
                            </div>
                            <div className={`text-sm ${debt.isOverLimit 
                              ? 'text-gray-400 dark:text-gray-500' 
                              : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {debt.debtorPhone || 'Telefon yo\'q'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${debt.isOverLimit 
                              ? 'text-gray-500 dark:text-gray-400' 
                              : 'text-gray-900 dark:text-white'
                            }`}>
                              {formatAmount(debt.amount)} UZS
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${debt.isOverLimit 
                              ? 'text-gray-500 dark:text-gray-400' 
                              : 'text-gray-900 dark:text-white'
                            }`}>
                              {formatDate(debt.dueDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              debt.isOverLimit 
                                ? 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400' 
                                : debt.status === 'active' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {debt.isOverLimit ? 'Limitdan tashqari' : (debt.status === 'active' ? 'Faol' : 'Kutilmoqda')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Qarzlar topilmadi
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Bu biznes egasining hozircha qarzlari yo'q
                  </p>
                </div>
              )}
            </div>

            {ownerDebts.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600 dark:text-gray-400">
                    Jami qarzlar: <span className="font-medium">{ownerDebts.length}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Limitdan tashqari: <span className="font-medium text-red-600 dark:text-red-400">
                      {ownerDebts.filter(d => d.isOverLimit).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}