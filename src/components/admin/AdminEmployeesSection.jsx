import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

export function AdminEmployeesSection() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/admin/all-employees', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.employees || []);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.phone?.includes(searchTerm) ||
                         employee.ownerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && employee.isActive) ||
                         (filterStatus === 'inactive' && !employee.isActive);
    return matchesSearch && matchesStatus;
  });

  const getPermissionCount = (permissions) => {
    if (!permissions) return 0;
    return Object.values(permissions).filter(Boolean).length;
  };

  const getPermissionBadgeColor = (count) => {
    if (count >= 5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (count >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
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
            👥 Xodimlar
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Barcha biznes egalari xodimlari ro'yxati
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {filteredEmployees.filter(e => e.isActive).length} faol
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            {filteredEmployees.length} jami
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
              placeholder="Xodim ismi, telefon yoki egasi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Barcha xodimlar</option>
            <option value="active">Faol xodimlar</option>
            <option value="inactive">Nofaol xodimlar</option>
          </select>
        </div>
      </div>

      {/* Employees List */}
      <div className="space-y-4">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Xodimlar topilmadi
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Qidiruv mezonlaringizga mos xodimlar yo'q
            </p>
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {employee.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {employee.name || 'Noma\'lum'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {employee.phone || 'Telefon yo\'q'} • {employee.position || 'Lavozim yo\'q'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Egasi: {employee.ownerName || 'Noma\'lum'} • Filial: {employee.branchName || 'Noma\'lum'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Permissions */}
                <div className="hidden sm:block">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionBadgeColor(getPermissionCount(employee.permissions))}`}>
                    {getPermissionCount(employee.permissions)} ruxsat
                  </span>
                </div>

                {/* Hire Date */}
                <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                  {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'}
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    employee.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className={`ml-2 text-sm font-medium ${
                    employee.isActive 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {employee.isActive ? 'Faol' : 'Nofaol'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
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
      {filteredEmployees.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {filteredEmployees.filter(e => e.isActive).length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Faol</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {filteredEmployees.filter(e => !e.isActive).length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Nofaol</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(filteredEmployees.reduce((sum, e) => sum + getPermissionCount(e.permissions), 0) / filteredEmployees.length) || 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">O'rtacha ruxsat</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {new Set(filteredEmployees.map(e => e.ownerId)).size}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Biznes egalar</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}