import { formatPhoneNumber, formatCurrency } from '../../utils/debtUtils';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';

export function DebtCard({
    debt,
    index,
    isOverLimit,
    onCardClick,
    onAdjustClick,
    onMarkAsPaid,
    onExtendDate,
    showBranchIndicator = false
}) {
    const [language] = useStoredState('qarzdaftar_language', 'uz');
    const [currency] = useStoredState('qarzdaftar_currency', 'UZS');
    const { branches } = useBranches();
    const { user } = useAuth();
    const t = useTranslation(language);

    // Get branch info if debt has branchId
    const debtBranch = debt.branchId ? branches.find(b => b._id === debt.branchId) : null;

    // Check employee permissions
    const hasPermission = (permission) => {
        if (user?.role !== 'employee') return true;
        return user?.employeeInfo?.permissions?.[permission] || false;
    };

    const canEdit = hasPermission('canEditDebt');
    const canDelete = hasPermission('canDeleteDebt');
    const canManagePayments = hasPermission('canManagePayments');

    return (
        <div
            onClick={() => !isOverLimit && onCardClick(debt)}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 ${isOverLimit
                ? 'opacity-40 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                : 'border-orange-200 dark:border-orange-800/30 hover:shadow-xl hover:scale-[1.02] cursor-pointer'
                }`}
        >
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0">
                        {debt.creditor.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">
                            {debt.creditor}
                        </h3>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                #{index + 1}
                            </p>
                            {/* Branch Indicator */}
                            {showBranchIndicator && debtBranch && (
                                <div className="flex items-center gap-1">
                                    <div 
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: debtBranch.color || '#3B82F6' }}
                                    ></div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20">
                                        {debtBranch.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2 ${debt.status === 'paid'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                    {debt.status === 'paid' ? t('common.paid', 'To\'langan') : t('common.pending', 'Kutilmoqda')}
                </span>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
                {/* Amount */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('debts.form.amount', 'Summa')}
                    </span>
                    <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {formatCurrency(debt.amount, debt.currency || currency || 'UZS', language)}
                    </span>
                </div>

                {/* Phone */}
                {debt.phone && (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('debts.form.phone', 'Telefon')}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatPhoneNumber(debt.phone, debt.countryCode)}
                        </span>
                    </div>
                )}

                {/* Debt Date */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('debts.form.debtDate', 'To\'lov sanasi')}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(debt.debtDate).toLocaleDateString()}
                    </span>
                </div>

                {/* Actions */}
                {debt.status === 'pending' && !isOverLimit && (
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-3">
                        {/* Qo'shish */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (canEdit) onAdjustClick(debt, 'add');
                            }}
                            disabled={!canEdit}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                                canEdit 
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                            title={canEdit ? "Qo'shish" : "Ruxsat yo'q"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>

                        {/* Ayirish */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (canEdit) onAdjustClick(debt, 'subtract');
                            }}
                            disabled={!canEdit}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                                canEdit 
                                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                            title={canEdit ? "Ayirish" : "Ruxsat yo'q"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>

                        {/* To'landi */}
                        <button
                            onClick={async (e) => {
                                e.stopPropagation();
                                if (canManagePayments) await onMarkAsPaid(debt._id);
                            }}
                            disabled={!canManagePayments}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                                canManagePayments 
                                    ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                            title={canManagePayments ? "To'landi" : "Ruxsat yo'q"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>

                        {/* Muddatni uzaytirish */}
                        {canEdit && onExtendDate && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onExtendDate(debt);
                                }}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white hover:shadow-lg hover:scale-110 cursor-pointer"
                                title="Muddatni uzaytirish"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}