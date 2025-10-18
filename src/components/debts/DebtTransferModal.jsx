import React, { useState, useEffect } from 'react';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';
import { useTranslation } from '../../utils/translationUtils';
import { useLanguage } from '../../utils/LanguageContext';
import { formatNumberWithSpaces } from '../../utils/formatUtils';

export function DebtTransferModal({ isOpen, debt, onClose, onSuccess }) {
  const { language } = useLanguage();
  const { settings } = useAuth();
  const { branches, activeBranch } = useBranches();
  const t = useTranslation(language);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [reason, setReason] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Get available branches (exclude current branch)
  const availableBranches = branches.filter(branch => branch._id !== activeBranch?._id);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedBranch(availableBranches.length > 0 ? availableBranches[0]._id : '');
      setReason('');
      setIsTransferring(false);
    }
  }, [isOpen, availableBranches]);

  // Handle transfer
  const handleTransfer = async () => {
    if (!debt || !selectedBranch) return;

    setIsTransferring(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/debts/${debt._id}/transfer`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          targetBranchId: selectedBranch,
          reason: reason.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        onClose();
        if (onSuccess) {
          onSuccess(data.debt);
        }
      } else {
        console.error('Transfer failed:', data.message);
      }
    } catch (error) {
      console.error('Error transferring debt:', error);
    } finally {
      setIsTransferring(false);
    }
  };

  // Get branch icon
  const getBranchIcon = (iconName) => {
    const icons = {
      building: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      store: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      office: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2H8V6" />
        </svg>
      ),
      home: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      factory: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      warehouse: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4" />
        </svg>
      )
    };
    return icons[iconName] || icons.building;
  };

  if (!isOpen || !debt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl ${
        settings.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Qarzni ko'chirish
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              settings.theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Debt Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className={`font-semibold mb-2 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ko'chiriladigan qarz
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {debt.creditor}
                </p>
                {debt.description && (
                  <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {debt.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumberWithSpaces(debt.amount)} {debt.currency}
                </p>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(debt.debtDate).toLocaleDateString('uz-UZ')}
                </p>
              </div>
            </div>
          </div>

          {/* Current Branch */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Joriy filial
            </label>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: activeBranch?.color || '#3B82F6' }}
              >
                {getBranchIcon(activeBranch?.icon)}
              </div>
              <div>
                <p className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {activeBranch?.name}
                </p>
                {activeBranch?.description && (
                  <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activeBranch.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Target Branch Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Qaysi filialga ko'chirish *
            </label>
            {availableBranches.length > 0 ? (
              <div className="space-y-2">
                {availableBranches.map(branch => (
                  <label key={branch._id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="targetBranch"
                      value={branch._id}
                      checked={selectedBranch === branch._id}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-3 flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: branch.color || '#3B82F6' }}
                      >
                        {getBranchIcon(branch.icon)}
                      </div>
                      <div>
                        <p className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {branch.name}
                        </p>
                        {branch.description && (
                          <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {branch.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Ko'chirish uchun boshqa filial mavjud emas.
                </p>
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Ko'chirish sababi (ixtiyoriy)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Qarzni nima uchun ko'chiryapsiz?"
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                settings.theme === 'dark'
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Bekor qilish
            </button>
            <button
              onClick={handleTransfer}
              disabled={!selectedBranch || isTransferring || availableBranches.length === 0}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                !selectedBranch || isTransferring || availableBranches.length === 0
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isTransferring ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ko'chirilmoqda...</span>
                </div>
              ) : (
                'Ko\'chirish'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}