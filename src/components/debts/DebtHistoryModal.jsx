import { useEffect } from 'react';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';
import { formatCurrency } from '../../utils/debtUtils';

export function DebtHistoryModal({ isOpen, debt, history, onClose }) {
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
        if (e.target.id === 'history-modal-backdrop') {
            onClose();
        }
    };

    return (
        <div
            id="history-modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-slideUp">
                {/* Gradient Header */}
                <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 backdrop-blur-sm"></div>
                    <div className="relative flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {t('debts.debtHistory', 'Qarz tarixi')}
                            </h3>
                            <p className="text-white/80 text-xs">
                                Barcha o'zgarishlar va harakatlar tarixi
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {/* History Content */}
                <div className="p-4 max-h-[calc(85vh-120px)] overflow-y-auto">
                    <div className="space-y-3">
                        {history && history.length > 0 ? (
                            history.map((historyItem, index) => (
                                <div key={index} className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 hover:shadow-lg">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            {/* Action Icon */}
                                            <div className={`p-2 rounded-lg ${historyItem.action === 'created' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                                historyItem.action === 'updated' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                                    historyItem.action === 'paid' ? 'bg-green-100 dark:bg-green-900/30' :
                                                        historyItem.action === 'deleted' ? 'bg-red-100 dark:bg-red-900/30' :
                                                            historyItem.action === 'adjustment' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                                                'bg-gray-100 dark:bg-gray-700/30'
                                                }`}>
                                                {historyItem.action === 'created' && (
                                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                )}
                                                {historyItem.action === 'updated' && (
                                                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                )}
                                                {historyItem.action === 'paid' && (
                                                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                                {historyItem.action === 'deleted' && (
                                                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                                {historyItem.action === 'adjustment' && (
                                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Action Badge */}
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${historyItem.action === 'created' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                                                historyItem.action === 'updated' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                                    historyItem.action === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                                        historyItem.action === 'deleted' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                                                            historyItem.action === 'adjustment' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                                                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                }`}>
                                                {t(`debts.action.${historyItem.action}`, t(`debts.${historyItem.action}`, historyItem.action))}
                                            </span>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="text-right">
                                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                {new Date(historyItem.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                {new Date(historyItem.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action description */}
                                    <div className="mt-2">
                                        {historyItem.action === 'created' && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {historyItem.creditor} uchun {formatCurrency(historyItem.amount, historyItem.currency || currency || 'UZS', language)} qarz yaratildi
                                            </p>
                                        )}

                                        {historyItem.action === 'updated' && historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                                            <div>
                                                {historyItem.newAmount > historyItem.previousAmount ? (
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                            {formatCurrency(historyItem.newAmount - historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} qo'shildi
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                                        </p>
                                                    </div>
                                                ) : historyItem.newAmount < historyItem.previousAmount ? (
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                            {formatCurrency(historyItem.previousAmount - historyItem.newAmount, historyItem.currency || currency || 'UZS', language)} to'landi
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Qarz miqdori o'zgartirilmadi
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {historyItem.action === 'adjustment' && historyItem.previousAmount !== undefined && historyItem.newAmount !== undefined && (
                                            <div>
                                                {historyItem.newAmount > historyItem.previousAmount ? (
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                            {formatCurrency(historyItem.newAmount - historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} qo'shildi
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                                        </p>
                                                    </div>
                                                ) : historyItem.newAmount < historyItem.previousAmount ? (
                                                    <div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                                            {formatCurrency(historyItem.previousAmount - historyItem.newAmount, historyItem.currency || currency || 'UZS', language)} to'landi
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {formatCurrency(historyItem.previousAmount, historyItem.currency || currency || 'UZS', language)} → {formatCurrency(historyItem.newAmount, historyItem.currency || currency || 'UZS', language)}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        Qarz miqdori o'zgartirilmadi
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {historyItem.action === 'paid' && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Qarz to'langan deb belgilandi
                                            </p>
                                        )}

                                        {historyItem.action === 'deleted' && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Qarz o'chirildi
                                            </p>
                                        )}
                                    </div>

                                    {historyItem.reason && (
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            <p className="font-medium text-xs">{t('debts.form.reason', 'Sabab')}:</p>
                                            <p className="pl-2 border-l-2 border-gray-200 dark:border-gray-700 text-sm">{historyItem.reason}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    {t('debts.noHistoryAvailable', 'Tarix mavjud emas')}
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                                    {t('debts.historyWillBeCreated', 'Qarzni tahrirlash yoki to\'lash orqali tarix yaratiladi')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}