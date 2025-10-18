import { useEffect } from 'react';
import { formatPhoneNumber, formatCurrency } from '../../utils/debtUtils';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';

export function DebtDetailsModal({ 
  debt, 
  isOpen, 
  onClose, 
  onMarkAsPaid, 
  onEdit, 
  onViewHistory, 
  onDelete 
}) {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
  const t = useTranslation(language);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !debt) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === 'details-modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="details-modal-backdrop"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/20 dark:border-gray-700/30 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-t-3xl blur opacity-30"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {debt.creditor.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {debt.creditor}
                </h3>
                <p className="text-white/90 text-lg font-semibold">
                  {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-xl transition-all duration-200 hover:scale-110"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Status and Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.status', 'Holat')}</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                    debt.status === 'paid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  }`}>
                    {debt.status === 'paid'
                      ? t('common.paid', 'To\'langan')
                      : t('common.pending', 'Kutilmoqda')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.debtDate', 'Qarz sanasi')}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {new Date(debt.debtDate).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.phone', 'Telefon')}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {debt.phone 
                      ? formatPhoneNumber(debt.phone, debt.countryCode)
                      : <span className="text-gray-400 italic">{t('common.notAvailable', 'Mavjud emas')}</span>
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {debt.description && (
            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{t('debts.form.description', 'Izoh')}</p>
                  <p className="text-sm text-gray-800 dark:text-white leading-relaxed">
                    {debt.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {debt.paidAt && (
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.paidDate', 'To\'langan sana')}</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {new Date(debt.paidAt).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-600/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('debts.form.createdDate', 'Yaratilgan')}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {new Date(debt.createdAt).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {debt.status === 'pending' && (
              <>
                <button
                  onClick={async () => {
                    await onMarkAsPaid(debt._id);
                    onClose();
                  }}
                  className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  title={t('common.markAsPaid', 'To\'langan deb belgilash')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onEdit(debt);
                    onClose();
                  }}
                  className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  title={t('common.edit', 'Tahrirlash')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </>
            )}
            <button
              onClick={() => onViewHistory(debt._id)}
              className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              title={t('debts.form.viewHistory', 'Tarixni ko\'rish')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={async () => {
                await onDelete(debt._id);
                onClose();
              }}
              className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              title={t('common.delete', 'O\'chirish')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}