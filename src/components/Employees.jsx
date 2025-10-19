import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../utils/EmployeeContext';
import { useBranches } from '../utils/BranchContext';
import { useAuth } from '../utils/AuthContext';
import { useTranslation } from '../utils/translationUtils';
import { useLanguage } from '../utils/LanguageContext';
import { useToast } from '../utils/ToastContext';
import { getTierDisplayName } from '../utils/subscriptionUtils';
import { EmployeeCreateModal } from './employees/EmployeeCreateModal';
import { EmployeeEditModal } from './employees/EmployeeEditModal';
import { EmployeeDeleteModal } from './employees/EmployeeDeleteModal';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarEmployees() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { settings, user } = useAuth();
  const { employees, loading, canCreateEmployee, employeeLimit } = useEmployees();
  const { branches } = useBranches();
  const { showSuccess } = useToast();
  const t = useTranslation(language);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleEmployeeCreated = () => {
    setShowCreateModal(false);
    showSuccess('Xodim muvaffaqiyatli qo\'shildi');
  };

  const handleEmployeeUpdated = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
    showSuccess('Xodim ma\'lumotlari muvaffaqiyatli yangilandi');
  };

  const handleEmployeeDeleted = () => {
    setShowDeleteModal(false);
    setSelectedEmployee(null);
    showSuccess('Xodim o\'chirildi');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <SkeletonLoader type="pageHeader" />
        <SkeletonLoader type="cardGrid" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className={`rounded-3xl p-6 ${settings.theme === 'dark'
        ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 border border-slate-700/50'
        : 'bg-gradient-to-br from-white via-blue-50 to-white border border-gray-200'
        } shadow-2xl`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className={`text-3xl font-bold mb-2 ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
              {t('employees.title', 'Xodimlar')}
            </h1>
            <p className={`text-lg ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {t('employees.subtitle', 'Xodimlarni boshqaring va ruxsatlarni sozlang')}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-xl ${settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
              <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                {employees.length}/{employeeLimit} xodim
              </span>
            </div>
            
            {canCreateEmployee ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('employees.addEmployee', 'Xodim qo\'shish')}
              </button>
            ) : (
              <button
                onClick={() => navigate('/pricing')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('employees.upgrade', 'Tarifni oshiring')}
              </button>
            )}
          </div>
        </div>

        {/* Subscription Info */}
        <div className="mt-6 pt-6 border-t border-gray-200/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                user?.subscriptionTier === 'pro' ? 'from-purple-500 to-pink-500' :
                user?.subscriptionTier === 'standard' ? 'from-blue-500 to-indigo-500' :
                user?.subscriptionTier === 'lite' ? 'from-green-500 to-emerald-500' :
                'from-gray-500 to-gray-600'
              } flex items-center justify-center text-white font-bold`}>
                {user?.subscriptionTier?.charAt(0).toUpperCase() || 'F'}
              </div>
              <div>
                <h3 className={`font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {getTierDisplayName(user?.subscriptionTier)} tarif
                </h3>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {employees.length}/{employeeLimit} xodim ishlatilmoqda
                </p>
              </div>
            </div>
            {!canCreateEmployee && (
              <button 
                onClick={() => navigate('/pricing')}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
              >
                Ko'proq xodim qo'shish →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      {employees.length === 0 ? (
        <div className={`rounded-2xl p-12 text-center ${settings.theme === 'dark'
          ? 'bg-slate-800/50 border border-slate-700/50'
          : 'bg-white border border-gray-200'
          } shadow-xl`}>
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
            {t('employees.noEmployees', 'Hali xodimlar yo\'q')}
          </h3>
          <p className={`text-gray-500 mb-6 ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            {t('employees.noEmployeesDesc', 'Birinchi xodimingizni qo\'shing va ruxsatlarni sozlang')}
          </p>
          {canCreateEmployee && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('employees.addFirstEmployee', 'Birinchi xodimni qo\'shish')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${settings.theme === 'dark'
                ? 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70'
                : 'bg-white border border-gray-200 hover:shadow-xl'
                } shadow-lg`}
            >
              {/* Employee Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
                      {employee.name}
                    </h3>
                    <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                      {employee.position}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Employee Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className={`text-sm ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                    {employee.phone}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className={`text-sm ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                    {employee.branchName}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`text-sm ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                    {new Date(employee.hireDate).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <h4 className={`text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-700'}`}>
                  Ruxsatlar:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(employee.permissions).map(([key, value]) => {
                    if (!value) return null;
                    
                    const permissionLabels = {
                      canAddDebt: 'Qarz qo\'shish',
                      canEditDebt: 'Tahrirlash',
                      canDeleteDebt: 'O\'chirish',
                      canViewDebts: 'Ko\'rish',
                      canManagePayments: 'To\'lovlar',
                      canViewReports: 'Hisobotlar',
                      canManageCreditors: 'Kreditorlar'
                    };

                    return (
                      <span
                        key={key}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {permissionLabels[key]}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Login Info */}
              <div className={`p-3 rounded-lg ${settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-medium ${settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                      Login: {employee.employeeUsername}
                    </p>
                    <p className={`text-xs ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                      Parol: {employee.generatedPassword}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Login: ${employee.employeeUsername}\nParol: ${employee.generatedPassword}`);
                      showSuccess('Login ma\'lumotlari nusxalandi');
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <EmployeeCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEmployeeCreated={handleEmployeeCreated}
        branches={branches}
      />

      <EmployeeEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedEmployee(null);
        }}
        onEmployeeUpdated={handleEmployeeUpdated}
        employee={selectedEmployee}
        branches={branches}
      />

      <EmployeeDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedEmployee(null);
        }}
        onEmployeeDeleted={handleEmployeeDeleted}
        employee={selectedEmployee}
      />
    </div>
  );
}