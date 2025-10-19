import { DebtCard } from './DebtCard';
import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';
import { useAuth } from '../../utils/AuthContext';

export function DebtList({ 
  debts, 
  onCardClick, 
  onAdjustClick, 
  onMarkAsPaid, 
  onAddNew 
}) {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const { user } = useAuth();
  const t = useTranslation(language);

  // Check employee permissions
  const hasPermission = (permission) => {
    if (user?.role !== 'employee') return true;
    return user?.employeeInfo?.permissions?.[permission] || false;
  };

  const canAddDebt = hasPermission('canAddDebt');

  if (debts.length === 0) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {t('debts.noDebts', 'Hali qarzlar qo\'shilmagan')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {t('debts.noDebtsSubtitle', 'Yuqoridagi tugma orqali yangi qarz qo\'shing')}
        </p>
        {canAddDebt && (
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            {t('debts.addNew', 'Yangi qarz qo\'shish')}
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          {debts.length} {t('debts.results', 'ta qarz topildi')}
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {debts.map((debt, index) => (
          <DebtCard
            key={debt._id}
            debt={debt}
            index={index}
            isOverLimit={!debt.isManageable}
            onCardClick={onCardClick}
            onAdjustClick={onAdjustClick}
            onMarkAsPaid={onMarkAsPaid}
          />
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {debts.map((debt, index) => (
          <DebtCard
            key={debt._id}
            debt={debt}
            index={index}
            isOverLimit={!debt.isManageable}
            onCardClick={onCardClick}
            onAdjustClick={onAdjustClick}
            onMarkAsPaid={onMarkAsPaid}
          />
        ))}
      </div>
    </>
  );
}