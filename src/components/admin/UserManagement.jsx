import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { UserProfileModal } from './UserProfileModal';

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    subscription: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [subscriptionModal, setSubscriptionModal] = useState(null); // { userId, username, currentTier }
  const [profileModal, setProfileModal] = useState(null); // { userId, username }
  const [reportModal, setReportModal] = useState(null); // { userId, username }
  const [sendingReport, setSendingReport] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page]);

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Real-time search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPagination({ ...pagination, page: 1 });
      fetchUsers();
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.status, filters.subscription]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const response = await apiFetch(`/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setPagination(prev => ({ ...prev, total: data.total }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      // Validate userId
      if (!userId || userId === 'undefined') {
        console.error('Invalid user ID:', userId);
        return;
      }

      // Optimistic update - darhol UI'ni yangilaymiz
      const originalUsers = [...users];
      setUsers(users.map(user =>
        (user.id || user._id) === userId ? { ...user, status: newStatus } : user
      ));

      const response = await apiFetch(`/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // Agar xatolik bo'lsa, asl holatga qaytaramiz
        setUsers(originalUsers);
        console.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      // Xatolik bo'lsa, asl holatga qaytaramiz
      fetchUsers();
    }
  };

  const updateUserSubscription = async (userId, newSubscription, expirationDays = 30) => {
    try {
      // Validate userId
      if (!userId || userId === 'undefined') {
        console.error('Invalid user ID:', userId);
        return;
      }

      // Calculate expiration date for UI update
      let subscriptionExpiresAt = null;
      let subscriptionStartedAt = null;
      
      if (newSubscription !== 'free') {
        subscriptionStartedAt = new Date();
        subscriptionExpiresAt = new Date();
        subscriptionExpiresAt.setDate(subscriptionExpiresAt.getDate() + expirationDays);
      }

      // Optimistic update - darhol UI'ni yangilaymiz
      const originalUsers = [...users];
      setUsers(users.map(user =>
        (user.id || user._id) === userId ? { 
          ...user, 
          subscriptionTier: newSubscription,
          subscriptionExpiresAt,
          subscriptionStartedAt
        } : user
      ));

      const response = await apiFetch(`/admin/users/${userId}/subscription`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          subscription: newSubscription,
          expirationDays: expirationDays
        }),
      });

      if (!response.ok) {
        // Agar xatolik bo'lsa, asl holatga qaytaramiz
        setUsers(originalUsers);
        console.error('Failed to update user subscription');
        // Bu yerda toast notification ko'rsatish mumkin
      }
    } catch (error) {
      console.error('Error updating user subscription:', error);
      // Xatolik bo'lsa, asl holatga qaytaramiz
      fetchUsers();
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (!userId || userId === 'undefined') {
        console.error('Invalid user ID:', userId);
        return;
      }

      const response = await apiFetch(`/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove user from local state
        setUsers(users.filter(user => (user.id || user._id) !== userId));
        setDeleteConfirm(null);
        setOpenDropdown(null);

        // Update pagination total
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        console.error('Failed to delete user');
        alert('Foydalanuvchini o\'chirishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Server bilan bog\'lanishda xatolik');
    }
  };

  const handleDeleteClick = (userId, username) => {
    setDeleteConfirm({ userId, username });
    setOpenDropdown(null);
  };

  const handleSendReport = (userId, username) => {
    setReportModal({ userId, username });
    setOpenDropdown(null);
  };

  const sendReportToUser = async () => {
    if (!reportModal) return;

    try {
      setSendingReport(true);
      
      const response = await apiFetch(`/admin/users/${reportModal.userId}/send-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(`✅ ${data.message}`);
        setReportModal(null);
      } else {
        const errorData = await response.json();
        alert(`❌ Xatolik: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert('❌ Server bilan bog\'lanishda xatolik yuz berdi');
    } finally {
      setSendingReport(false);
    }
  };

  const handleSubscriptionChange = (userId, username, currentTier, newTier) => {
    if (newTier === 'free') {
      // For free tier, no expiration needed
      updateUserSubscription(userId, newTier);
    } else {
      // For paid tiers, show modal to select expiration
      setSubscriptionModal({ userId, username, currentTier, newTier });
    }
    setOpenDropdown(null);
  };

  const confirmSubscriptionChange = (expirationDays) => {
    if (subscriptionModal) {
      updateUserSubscription(subscriptionModal.userId, subscriptionModal.newTier, expirationDays);
      setSubscriptionModal(null);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteUser(deleteConfirm.userId);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        text: 'Faol',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      suspended: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        text: 'Bloklangan',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      }
    };
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
        </svg>
        {config.text}
      </span>
    );
  };

  const getSubscriptionBadge = (subscription) => {
    const subConfig = {
      free: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        text: 'Bepul',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      lite: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        text: 'Lite',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
      },
      standard: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        text: 'Standart',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      },
      pro: {
        color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700',
        text: 'Professional',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
      }
    };
    const config = subConfig[subscription] || subConfig.free;
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${config.color} transition-all duration-200 hover:scale-105`}>
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
        </svg>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-1/2"></div>
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users list skeleton */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6">
                <div className="animate-pulse flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="space-y-2">
                      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"></div>
                      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                      <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Foydalanuvchilarni Boshqarish</h1>
            <p className="text-green-100 text-lg">
              Foydalanuvchilarni ko'rish va boshqarish
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filtrlar</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Qidirish va filtrlash</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Qidirish</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ism yoki telefon..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              {filters.search && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Holat</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Barchasi</option>
              <option value="active">Faol</option>
              <option value="suspended">Bloklangan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tarif</label>
            <select
              value={filters.subscription}
              onChange={(e) => setFilters({ ...filters, subscription: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">Barchasi</option>
              <option value="free">Bepul</option>
              <option value="standard">Standart</option>
              <option value="pro">Professional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Foydalanuvchilar ro'yxati</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Jami: {users.length} ta</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <div key={user.id || user._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-semibold text-white">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-3">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {user.username}
                      </p>
                      <div className="flex space-x-2">
                        {getStatusBadge(user.status)}
                        {getSubscriptionBadge(user.subscriptionTier)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {user.phone}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4m-4-8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        Ro'yxatdan o'tgan: {new Date(user.createdAt).toLocaleDateString('uz-UZ')}
                      </p>
                      {user.subscriptionExpiresAt && user.subscriptionTier !== 'free' && (
                        <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Tugaydi: {new Date(user.subscriptionExpiresAt).toLocaleDateString('uz-UZ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex flex-col space-y-2">
                    <div className="relative">
                      <select
                        value={user.status}
                        onChange={(e) => updateUserStatus(user.id || user._id, e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-green-400 appearance-none"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="active">Faol</option>
                        <option value="suspended">Bloklangan</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        value={user.subscriptionTier}
                        onChange={(e) => handleSubscriptionChange(user.id || user._id, user.username, user.subscriptionTier, e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-purple-400 appearance-none"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="free">Bepul</option>
                        <option value="lite">Lite</option>
                        <option value="standard">Standart</option>
                        <option value="pro">Professional</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => setProfileModal({ userId: user.id || user._id, username: user.username })}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200"
                      title="Profil ko'rish"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === (user.id || user._id) ? null : (user.id || user._id))}
                        className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>

                      {/* Dropdown Content */}
                      {openDropdown === (user.id || user._id) && (
                        <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleSendReport(user.id || user._id, user.username)}
                              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Hisobot yuborish
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user.id || user._id, user.username)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              O'chirish
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination.total > pagination.limit && (
        <div className="bg-white dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Oldingi
            </button>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page * pagination.limit >= pagination.total}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Keyingi
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span>
                {' - '}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>
                {' '}dan{' '}
                <span className="font-medium">{pagination.total}</span>
                {' '}natija
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Oldingi
                </button>

                <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {pagination.page} / {Math.ceil(pagination.total / pagination.limit)}
                </div>

                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page * pagination.limit >= pagination.total}
                  className="relative inline-flex items-center px-4 py-2 rounded-r-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Keyingi
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              Foydalanuvchini o'chirish
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              <span className="font-medium">{deleteConfirm.username}</span> foydalanuvchisini o'chirishni xohlaysizmi?
              Bu amal qaytarib bo'lmaydi va barcha ma'lumotlar o'chib ketadi.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Expiration Modal */}
      {subscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Obuna Muddatini Belgilash
              </h3>
              <button
                onClick={() => setSubscriptionModal(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-semibold">{subscriptionModal.username}</span> foydalanuvchisining obunasini{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {subscriptionModal.newTier === 'standard' ? 'Standart' : 'Professional'}
                </span>{' '}
                rejimiga o'zgartirmoqdasiz.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Obuna muddati tugagach, foydalanuvchi avtomatik ravishda bepul rejimga qaytadi.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Obuna muddati (kunlarda):
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => confirmSubscriptionChange(7)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">7 kun</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Sinov</div>
                </button>
                <button
                  onClick={() => confirmSubscriptionChange(30)}
                  className="p-3 border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-center"
                >
                  <div className="font-semibold text-purple-600 dark:text-purple-400">30 kun</div>
                  <div className="text-xs text-purple-500 dark:text-purple-400">Standart</div>
                </button>
                <button
                  onClick={() => confirmSubscriptionChange(90)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">90 kun</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 oy</div>
                </button>
                <button
                  onClick={() => confirmSubscriptionChange(365)}
                  className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">365 kun</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">1 yil</div>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSubscriptionModal(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Foydalanuvchini O'chirish
              </h3>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{deleteConfirm.username}</span> foydalanuvchisini butunlay o'chirishni xohlaysizmi?
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                Bu amal qaytarib bo'lmaydi!
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              Hisobot Yuborish
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              <span className="font-medium">{reportModal.username}</span> foydalanuvchisiga ertaga to'lanishi kerak bo'lgan qarzlar hisobotini Telegram orqali yuborasizmi?
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Hisobot tarkibi:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Ertaga to'lanishi kerak bo'lgan qarzlar ro'yxati</li>
                    <li>Har bir qarz uchun: qarzdor nomi, summa, tavsif</li>
                    <li>Jami summa va qarzlar soni</li>
                    <li>Excel fayl (CSV format)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setReportModal(null)}
                disabled={sendingReport}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={sendReportToUser}
                disabled={sendingReport}
                className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center disabled:opacity-50"
              >
                {sendingReport ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Yuborish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={!!profileModal}
        userId={profileModal?.userId}
        username={profileModal?.username}
        onClose={() => setProfileModal(null)}
      />
    </div>
  );
}

