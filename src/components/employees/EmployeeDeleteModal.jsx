import React, { useState } from 'react';
import { useEmployees } from '../../utils/EmployeeContext';
import { useToast } from '../../utils/ToastContext';
import { useAuth } from '../../utils/AuthContext';

export function EmployeeDeleteModal({ isOpen, onClose, onEmployeeDeleted, employee }) {
  const { deleteEmployee } = useEmployees();
  const { showError } = useToast();
  const { settings } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!employee) return;

    setLoading(true);
    
    try {
      const result = await deleteEmployee(employee._id);
      
      if (result.success) {
        onEmployeeDeleted();
      } else {
        showError(result.message || 'Xodimni o\'chirishda xatolik');
      }
    } catch (error) {
      showError('Xodimni o\'chirishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl ${settings.theme === 'dark'
        ? 'bg-slate-800 border border-slate-700'
        : 'bg-white border border-gray-200'
        }`}>
        
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          
          <h2 className={`text-xl font-bold mb-2 ${settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
            Xodimni o'chirish
          </h2>
          
          <p className={`text-sm mb-4 ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
            Haqiqatan ham <strong>{employee.name}</strong> xodimini o'chirmoqchimisiz?
          </p>

          {/* Employee Info */}
          <div className={`p-4 rounded-xl mb-6 ${settings.theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className={`font-medium ${settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-900'}`}>
                  {employee.name}
                </p>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {employee.position} • {employee.branchName}
                </p>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {employee.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className={`p-4 rounded-xl mb-6 ${settings.theme === 'dark' ? 'bg-yellow-900/30 border border-yellow-700/50' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-left">
                <p className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                  Diqqat!
                </p>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Xodim o'chirilganda uning login hisobi ham o'chiriladi va qayta tiklab bo'lmaydi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${settings.theme === 'dark'
              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'O\'chirilmoqda...' : 'Ha, o\'chirish'}
          </button>
        </div>
      </div>
    </div>
  );
}