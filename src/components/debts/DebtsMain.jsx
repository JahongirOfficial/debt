import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoredState } from '../../utils/storageUtils';
import { useTranslation } from '../../utils/translationUtils';
import { useDebts } from '../../utils/DebtContext';
import { useBranches } from '../../utils/BranchContext';
import { useAuth } from '../../utils/AuthContext';

import { useToast } from '../../utils/ToastContext';
import { SkeletonLoader } from '../SkeletonLoader';
import { DebtFilters } from './DebtFilters';
import { DebtList } from './DebtList';
import { AddDebtModal } from './AddDebtModal';
import { DebtDetailsModal } from './DebtDetailsModal';
import { EditDebtModal } from './EditDebtModal';
import { DebtHistoryModal } from './DebtHistoryModal';
import { DebtAdjustModal } from './DebtAdjustModal';
import { parseFormattedNumber } from '../../utils/formatUtils';

export function QarzdaftarDebts() {
  const navigate = useNavigate();
  const [language] = useStoredState('qarzdaftar_language', 'uz');

  const t = useTranslation(language);
  const { debts, loading, error, userTier, debtLimit, createDebt, updateDebt, markDebtAsPaid, adjustDebtAmount, deleteDebt, fetchDebtHistory } = useDebts();
  const { activeBranch } = useBranches();
  const { user } = useAuth();

  // Check employee permissions
  const hasPermission = (permission) => {
    if (user?.role !== 'employee') return true;
    return user?.employeeInfo?.permissions?.[permission] || false;
  };

  const canAddDebt = hasPermission('canAddDebt');
  const { showSuccess, showError } = useToast();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [editingDebt, setEditingDebt] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(null);
  const [debtHistory, setDebtHistory] = useState([]);
  const [showAdjustModal, setShowAdjustModal] = useState(null);
  const [adjustType, setAdjustType] = useState('add');
  const [activeTab, setActiveTab] = useState('dueToday');
  const [debtSearch, setDebtSearch] = useState('');


  // Filter debts based on current filters and active tab
  const getFilteredDebts = () => {
    let filteredDebts = debts;

    // For employees, filter debts by their assigned branch
    if (user?.role === 'employee' && user?.assignedBranchId) {
      filteredDebts = filteredDebts.filter(debt => debt.branchId === user.assignedBranchId);
    }

    // Filter by status (tab)
    if (activeTab === 'dueToday') {
      const todayFormatted = new Date().toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate) return false;
        const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debt.status === 'pending' && debtDateFormatted === todayFormatted;
      });
    } else if (activeTab === 'dueTomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted === tomorrowFormatted;
      });
    } else if (activeTab === 'threeDaysLeft') {
      const today = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(today.getDate() + 3);
      const todayFormatted = today.toISOString().split('T')[0];
      const threeDaysLaterFormatted = threeDaysLater.toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted >= todayFormatted && debtDateFormatted <= threeDaysLaterFormatted;
      });
    } else if (activeTab === 'overdue') {
      const todayFormatted = new Date().toISOString().split('T')[0];
      filteredDebts = filteredDebts.filter(debt => {
        if (!debt.debtDate || debt.status !== 'pending') return false;
        const debtDateFormatted = new Date(debt.debtDate).toISOString().split('T')[0];
        return debtDateFormatted < todayFormatted;
      });
    } else if (activeTab === 'pending') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'pending');
    } else if (activeTab === 'paid') {
      filteredDebts = filteredDebts.filter(debt => debt.status === 'paid');
    }

    // Search filter
    if (debtSearch) {
      const term = debtSearch.toLowerCase();
      filteredDebts = filteredDebts.filter(debt =>
        debt.creditor.toLowerCase().includes(term) ||
        (debt.description && debt.description.toLowerCase().includes(term))
      );
    }

    return filteredDebts;
  };

  const filteredDebts = getFilteredDebts();

  // For free tier users, sort pending debts by creation date (oldest first) and limit management to first 20
  const getManageableDebts = () => {
    if (userTier === 'free' && debtLimit !== Infinity) {
      const pendingDebts = filteredDebts.filter(debt => debt.status === 'pending');
      const paidDebts = filteredDebts.filter(debt => debt.status === 'paid');

      // Sort pending debts by creation date (oldest first)
      const sortedPendingDebts = [...pendingDebts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      // Mark which debts are manageable (first 20 pending debts)
      const debtsWithManageability = sortedPendingDebts.map((debt, index) => ({
        ...debt,
        isManageable: index < debtLimit
      }));

      // Combine with paid debts (all paid debts are always manageable)
      const allPaidDebts = paidDebts.map(debt => ({ ...debt, isManageable: true }));

      return [...debtsWithManageability, ...allPaidDebts];
    }

    // For premium users, all debts are manageable
    return filteredDebts.map(debt => ({ ...debt, isManageable: true }));
  };

  const manageableDebts = getManageableDebts();

  // Handlers
  const handleCardClick = (debt) => {
    setShowDetailsModal(debt);
  };

  const handleAdjustClick = (debt, type) => {
    setShowAdjustModal(debt);
    setAdjustType(type);
  };

  const handleMarkAsPaid = async (debtId) => {
    // Show loading notification immediately
    showSuccess('To\'langan deb belgilanmoqda...');

    try {
      const result = await markDebtAsPaid(debtId, '');
      if (result && result.success) {
        showSuccess('Qarz to\'langan deb belgilandi');
      } else {
        showError(result?.message || 'Qarzni to\'langan deb belgilashda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error marking debt as paid:', error);
      showError('Qarzni to\'langan deb belgilashda xatolik yuz berdi');
    }
  };

  const handleEdit = (debt) => {
    setEditingDebt(debt);
  };

  const handleViewHistory = async (debt) => {
    try {
      const result = await fetchDebtHistory(debt._id);
      if (result && result.success) {
        setDebtHistory(result.history);
        setShowHistoryModal(debt);
      } else {
        showError(result?.message || 'Qarz tarixini olishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error fetching debt history:', error);
      showError('Qarz tarixini olishda xatolik yuz berdi');
    }
  };

  // Handle add debt
  const handleAddDebt = async (debtData) => {
    // Show loading notification
    showSuccess('Qarz qo\'shilmoqda...');

    try {
      const result = await createDebt({
        ...debtData,
        amount: parseFormattedNumber(debtData.amount),
        status: 'pending'
      });

      if (result && result.success) {
        showSuccess(`${debtData.creditor} uchun qarz muvaffaqiyatli qo'shildi`);
      } else {
        showError(result?.message || 'Qarz qo\'shishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error creating debt:', error);
      showError('Qarz qo\'shishda xatolik yuz berdi');
    }
  };

  // Handle edit debt
  const handleSaveEdit = async (updateData) => {
    if (!editingDebt) return;

    // Store debt ID before clearing state
    const debtId = editingDebt._id;

    // Clear editing state immediately
    setEditingDebt(null);

    // Show loading notification
    showSuccess('Yangilanmoqda...');

    try {
      const result = await updateDebt(debtId, updateData);
      if (result && result.success) {
        showSuccess('Qarz ma\'lumotlari muvaffaqiyatli yangilandi');
      } else {
        showError(result?.message || 'Qarzni yangilashda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error updating debt:', error);
      showError('Qarzni yangilashda xatolik yuz berdi');
    }
  };

  // Handle debt adjustment
  const handleSaveAdjustment = async (adjustmentData) => {
    if (!showAdjustModal) return;

    // Store debt ID before clearing state
    const debtId = showAdjustModal._id;

    // Clear adjustment state immediately
    setShowAdjustModal(null);

    try {
      const result = await adjustDebtAmount(debtId, adjustmentData);
      if (result && result.success) {
        showSuccess('Qarz miqdori muvaffaqiyatli o\'zgartirildi');
      } else {
        showError(result?.message || 'Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error adjusting debt amount:', error);
      showError('Qarz miqdorini o\'zgartirishda xatolik yuz berdi');
    }
  };

  const handleDelete = async (debtId) => {
    // Show loading notification immediately
    showSuccess('O\'chirilmoqda...');

    try {
      const result = await deleteDebt(debtId, '');
      if (result && result.success) {
        showSuccess('Qarz muvaffaqiyatli o\'chirildi');
      } else {
        showError(result?.message || 'Qarzni o\'chirishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error deleting debt:', error);
      showError('Qarzni o\'chirishda xatolik yuz berdi');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <SkeletonLoader type="debts" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-600 mb-2">Xatolik yuz berdi</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {t('debts.title', 'Qarzlar ro\'yhati')}
            </h1>
            <div className="flex items-center gap-4">
              <p className="hidden md:block text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
                {t('debts.subtitle', 'Qarzlaringizni boshqaring va kuzatib boring')}
              </p>
              {/* Active Branch Info */}
              {activeBranch && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeBranch.color || '#3B82F6' }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {activeBranch.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({debts.length} ta qarz)
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => canAddDebt && setShowAddForm(true)}
            disabled={!canAddDebt}
            className={`group relative p-4 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
              canAddDebt 
                ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
            }`}
            title={canAddDebt ? "Qarz qo'shish" : "Ruxsat yo'q"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="relative h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Limit warning for free tier users */}
        {userTier === 'free' && debtLimit !== Infinity && debts.filter(debt => debt.status === 'pending').length >= debtLimit && (
          <div className="mb-6 p-6 bg-amber-50/80 dark:bg-amber-900/30 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-800/50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  Free tarif limiti to'lgan!
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  Faqat {debtLimit} ta qarzni boshqarishingiz mumkin.{' '}
                  <button
                    className="inline text-orange-600 font-semibold hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline decoration-2 underline-offset-2"
                    onClick={() => navigate('/pricing')}
                  >
                    Tarifni yangilang
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <DebtFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={debtSearch}
          onSearchChange={setDebtSearch}
        />

        {/* Debt List */}
        <div className="mt-8">
          <DebtList
            debts={manageableDebts}
            onCardClick={handleCardClick}
            onAdjustClick={handleAdjustClick}
            onMarkAsPaid={handleMarkAsPaid}
            onAddNew={() => setShowAddForm(true)}
          />
        </div>
      </div>

      {/* Debt Details Modal */}
      <DebtDetailsModal
        debt={showDetailsModal}
        isOpen={!!showDetailsModal}
        onClose={() => setShowDetailsModal(null)}
        onMarkAsPaid={() => showDetailsModal && handleMarkAsPaid(showDetailsModal._id)}
        onEdit={() => showDetailsModal && handleEdit(showDetailsModal)}
        onViewHistory={() => showDetailsModal && handleViewHistory(showDetailsModal)}
        onDelete={handleDelete}
      />

      {/* Add Debt Modal */}
      <AddDebtModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddDebt}
      />

      {/* Edit Debt Modal */}
      <EditDebtModal
        isOpen={!!editingDebt}
        debt={editingDebt}
        onClose={() => setEditingDebt(null)}
        onSave={handleSaveEdit}
      />

      {/* Debt History Modal */}
      <DebtHistoryModal
        isOpen={!!showHistoryModal}
        debt={showHistoryModal}
        history={debtHistory}
        onClose={() => {
          setShowHistoryModal(null);
          setDebtHistory([]);
        }}
      />

      {/* Debt Adjust Modal */}
      <DebtAdjustModal
        isOpen={!!showAdjustModal}
        debt={showAdjustModal}
        type={adjustType}
        onClose={() => setShowAdjustModal(null)}
        onSave={handleSaveAdjustment}
      />


    </div>
  );
}