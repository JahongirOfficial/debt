import React, { useState, useEffect } from 'react';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';
import { useTranslation } from '../../utils/translationUtils';
import { useLanguage } from '../../utils/LanguageContext';

export function BranchDeleteModal({ isOpen, branch, onClose, onSuccess }) {
  const { language } = useLanguage();
  const { settings } = useAuth();
  const { deleteBranch, branches, loading } = useBranches();
  const t = useTranslation(language);

  const [isDeleting, setIsDeleting] = useState(false);
  const [debtCount, setDebtCount] = useState(0);
  const [transferToBranch, setTransferToBranch] = useState('');
  const [deleteOption, setDeleteOption] = useState('transfer'); // 'transfer' or 'delete'

  // Fetch debt count for the branch
  useEffect(() => {
    const fetchDebtCount = async () => {
      if (isOpen && branch) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`/api/branches/${branch._id}/debts/count`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          const data = await response.json();
          if (data.success) {
            setDebtCount(data.count || 0);
          }
        } catch (error) {
          console.error('Error fetching debt count:', error);
          setDebtCount(0);
        }
      }
    };

    fetchDebtCount();
  }, [isOpen, branch]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsDeleting(false);
      setTransferToBranch('');
      setDeleteOption('transfer');
      
      // Set default transfer branch (first available branch that's not the current one)
      const availableBranches = branches.filter(b => b._id !== branch?._id);
      if (availableBranches.length > 0) {
        setTransferToBranch(availableBranches[0]._id);
      }
    }
  }, [isOpen, branch, branches]);

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!branch) return;

    setIsDeleting(true);

    try {
      let result;
      
      if (debtCount > 0 && deleteOption === 'transfer' && transferToBranch) {
        // Transfer debts to another branch before deleting
        const transferResponse = await fetch(`/api/branches/${branch._id}/transfer-debts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ targetBranchId: transferToBranch })
        });

        const transferData = await transferResponse.json();
        if (!transferData.success) {
          throw new Error(transferData.message || 'Failed to transfer debts');
        }
        
        // Delete the branch after transferring debts
        result = await deleteBranch(branch._id);
      } else if (debtCount > 0 && deleteOption === 'delete') {
        // Delete branch with all debts using context function
        result = await deleteBranch(branch._id, true);
      } else {
        // Delete branch normally (no debts)
        result = await deleteBranch(branch._id);
      }

      if (result.success) {
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Get available branches for transfer
  const availableBranches = branches.filter(b => b._id !== branch?._id);

  if (!isOpen || !branch) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
        settings.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className={`text-xl font-bold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Filialni o'chirish
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
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Branch Info & Warnings */}
            <div className="space-y-6">
              {/* Branch Info */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: branch.color || '#3B82F6' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {branch.name}
                  </h3>
                  {branch.description && (
                    <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {branch.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Diqqat! Bu amalni bekor qilib bo'lmaydi
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Filial o'chirilgandan keyin uni qayta tiklab bo'lmaydi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Debt Count Info */}
              {debtCount > 0 && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Bu filialda {debtCount} ta qarz mavjud
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Qarzlarni boshqa filialga ko'chirish yoki ularni ham o'chirish kerak.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Debt Options */}
            <div className="space-y-6">
              {/* Debt Transfer Options */}
              {debtCount > 0 && availableBranches.length > 0 && (
                <div className="space-y-4">
                  <h4 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Qarzlar bilan nima qilish kerak?
                  </h4>
                  
                  {/* Transfer Option */}
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deleteOption"
                      value="transfer"
                      checked={deleteOption === 'transfer'}
                      onChange={(e) => setDeleteOption(e.target.value)}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Qarzlarni boshqa filialga ko'chirish
                      </span>
                      <p className={`text-sm mt-1 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Barcha qarzlar tanlangan filialga ko'chiriladi
                      </p>
                      
                      {deleteOption === 'transfer' && (
                        <select
                          value={transferToBranch}
                          onChange={(e) => setTransferToBranch(e.target.value)}
                          className={`mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            settings.theme === 'dark'
                              ? 'bg-gray-700 text-white'
                              : 'bg-white text-gray-900'
                          }`}
                        >
                          {availableBranches.map(b => (
                            <option key={b._id} value={b._id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </label>

                  {/* Delete Option */}
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deleteOption"
                      value="delete"
                      checked={deleteOption === 'delete'}
                      onChange={(e) => setDeleteOption(e.target.value)}
                      className="mt-1 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <span className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Qarzlarni ham o'chirish
                      </span>
                      <p className={`text-sm mt-1 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Filial va barcha qarzlar butunlay o'chiriladi
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* No available branches warning */}
              {debtCount > 0 && availableBranches.length === 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Qarzlarni ko'chirish uchun boshqa filial mavjud emas. 
                    Filial o'chirilganda barcha qarzlar ham o'chiriladi.
                  </p>
                </div>
              )}
            </div>
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
              onClick={handleDelete}
              disabled={isDeleting || loading || (debtCount > 0 && deleteOption === 'transfer' && !transferToBranch)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                isDeleting || loading || (debtCount > 0 && deleteOption === 'transfer' && !transferToBranch)
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isDeleting || loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>O'chirilmoqda...</span>
                </div>
              ) : (
                'Ha, o\'chirish'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}