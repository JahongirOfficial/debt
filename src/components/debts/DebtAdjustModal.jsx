import { useState, useEffect } from 'react';
import { formatNumberWithSpaces, parseFormattedNumber } from '../../utils/formatUtils';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';
import { formatCurrency } from '../../utils/debtUtils';
import { useToast } from '../../utils/ToastContext';

export function DebtAdjustModal({ isOpen, debt, type, onClose, onSave }) {
    const [language] = useStoredState('qarzdaftar_language', 'uz');
    const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
    const t = useTranslation(language);
    const { showSuccess, showError } = useToast();

    const [adjustForm, setAdjustForm] = useState({
        amount: '',
        reason: '',
        type: 'add'
    });

    // Initialize form when debt or type changes
    useEffect(() => {
        if (debt && type) {
            setAdjustForm({
                amount: '',
                reason: '',
                type: type
            });
        }
    }, [debt, type]);

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
        if (e.target.id === 'adjust-modal-backdrop') {
            onClose();
        }
    };

    const handleSave = async () => {
        if (!adjustForm.amount) return;

        const adjustmentAmount = parseFormattedNumber(adjustForm.amount);
        if (adjustForm.type === 'subtract' && adjustmentAmount > debt.amount) {
            return;
        }

        const adjustmentData = {
            amount: adjustmentAmount,
            type: adjustForm.type,
            reason: adjustForm.reason || `Qarz miqdori ${adjustForm.type === 'add' ? 'oshirildi' : 'kamaytirildi'}`
        };

        // Store data before closing modal
        const adjustmentType = adjustForm.type;

        // Close modal immediately for better UX
        onClose();
        setAdjustForm({ amount: '', reason: '', type: 'add' });

        // Show loading notification
        showSuccess('Jarayon amalga oshirilmoqda...');

        try {
            await onSave(adjustmentData);

            // Show success message
            showSuccess(
                adjustmentType === 'add'
                    ? `Qarz miqdori ${formatNumberWithSpaces(adjustmentAmount.toString())} ${debt.currency || currency} ga oshirildi`
                    : `Qarz miqdori ${formatNumberWithSpaces(adjustmentAmount.toString())} ${debt.currency || currency} ga kamaytirildi`
            );
        } catch (error) {
            console.error('Error adjusting debt amount:', error);
            showError('Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
        }
    };

    return (
        <div
            id="adjust-modal-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div
                className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-full max-w-md animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`relative p-4 ${adjustForm.type === 'add'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    }`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {adjustForm.type === 'add'
                                    ? t('debts.form.increaseAmount', 'Qarz miqdorini oshirish')
                                    : t('debts.form.decreaseAmount', 'Qarz miqdorini kamaytirish')
                                }
                            </h3>
                            <p className="text-white/80 text-sm">
                                {debt.creditor} uchun
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Form */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('debts.form.currentAmount', 'Hozirgi miqdor')}
                        </label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-lg font-bold text-gray-800 dark:text-white">
                                {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {adjustForm.type === 'add'
                                ? t('debts.form.amountToAdd', 'Qo\'shiladigan miqdor')
                                : t('debts.form.amountToSubtract', 'Ayiriladigan miqdor')
                            } <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={adjustForm.amount}
                            onChange={(e) => {
                                const formattedValue = formatNumberWithSpaces(e.target.value);
                                setAdjustForm({ ...adjustForm, amount: formattedValue });
                            }}
                            placeholder="0"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('debts.form.adjustmentReason', 'Sabab')}
                        </label>
                        <textarea
                            value={adjustForm.reason}
                            onChange={(e) => setAdjustForm({ ...adjustForm, reason: e.target.value })}
                            placeholder={t('debts.form.adjustmentReasonPlaceholder', 'O\'zgartirish sababini kiriting...')}
                            rows={3}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {adjustForm.type === 'subtract' && parseFormattedNumber(adjustForm.amount) > debt.amount && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-700 dark:text-red-300 text-sm">
                                {t('debts.form.adjustmentError', 'Ayiriladigan miqdor hozirgi qarz miqdoridan katta bo\'lishi mumkin emas.')}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            {t('common.cancel', 'Bekor qilish')}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!adjustForm.amount || (adjustForm.type === 'subtract' && parseFormattedNumber(adjustForm.amount) > debt.amount)}
                            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${adjustForm.type === 'add'
                                ? 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400'
                                : 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400'
                                } disabled:cursor-not-allowed`}
                        >
                            {adjustForm.type === 'add'
                                ? t('debts.form.addAmount', 'Qo\'shish')
                                : t('debts.form.subtractAmount', 'Ayirish')
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}