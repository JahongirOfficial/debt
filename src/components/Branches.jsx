import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranches } from '../utils/BranchContext';
import { useAuth } from '../utils/AuthContext';
import { useTranslation } from '../utils/translationUtils';
import { useLanguage } from '../utils/LanguageContext';
import { useToast } from '../utils/ToastContext';
import { BranchCreateModal } from './branches/BranchCreateModal';
import { BranchSettingsModal } from './branches/BranchSettingsModal';
import { BranchDeleteModal } from './branches/BranchDeleteModal';
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarBranches() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { settings, user } = useAuth();
  const { branches, activeBranch, loading, canCreateBranch, branchLimit, switchBranch } = useBranches();
  const { showSuccess } = useToast();
  const t = useTranslation(language);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deletingBranch, setDeletingBranch] = useState(null);

  // Get branch icon
  const getBranchIcon = (iconName) => {
    const icons = {
      building: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      store: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      office: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2H8V6" />
        </svg>
      ),
      home: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      factory: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      warehouse: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 1L20 7l-8 4" />
        </svg>
      )
    };
    return icons[iconName] || icons.building;
  };

  // Handle branch actions
  const handleBranchClick = (branch) => {
    if (branch._id !== activeBranch?._id) {
      switchBranch(branch);
    }
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
  };

  const handleDeleteBranch = (branch) => {
    setDeletingBranch(branch);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <SkeletonLoader type="branches" />
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
              Filiallar boshqaruvi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base font-medium">
              <span className="hidden sm:inline">Filiallaringizni yarating va boshqaring</span>
              <span className="sm:hidden">Filiallar boshqaruvi</span>
            </p>
          </div>


        </div>

        {/* Subscription Info */}
        <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
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
                  {user?.subscriptionTier === 'pro' ? 'Pro' :
                   user?.subscriptionTier === 'standard' ? 'Standard' :
                   user?.subscriptionTier === 'lite' ? 'Lite' : 'Free'} tarif
                </h3>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {branches.length}/{branchLimit} filial ishlatilmoqda
                </p>
              </div>
            </div>
            {!canCreateBranch && (
              <button 
                onClick={() => navigate('/pricing')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Tarifni yangilash
              </button>
            )}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch._id}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                branch.isDisabled 
                  ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/30'
                  : activeBranch?._id === branch._id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                    : settings.theme === 'dark'
                      ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                      : 'border-gray-200 bg-white/80 hover:border-gray-300 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
              }`}
              onClick={() => !branch.isDisabled && handleBranchClick(branch)}
            >
              {/* Active Badge */}
              {activeBranch?._id === branch._id && !branch.isDisabled && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Faol
                </div>
              )}

              {/* Disabled Badge */}
              {branch.isDisabled && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Muzlatilgan
                </div>
              )}

              {/* Branch Header */}
              <div className="flex items-center space-x-4 mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: branch.color || '#3B82F6' }}
                >
                  {getBranchIcon(branch.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg truncate ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {branch.name}
                  </h3>
                  {branch.description && (
                    <p className={`text-sm truncate ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {branch.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Branch Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Valyuta
                  </span>
                  <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {branch.currency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Yaratilgan
                  </span>
                  <span className={`text-sm font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(branch.createdAt).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {branch.isDisabled ? (
                <div className="flex justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/pricing');
                    }}
                    className="px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/40 transition-colors"
                  >
                    Tarifni yangilang
                  </button>
                </div>
              ) : (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditBranch(branch);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    title="Tahrirlash"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {branches.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBranch(branch);
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      title="O'chirish"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Create Branch Card */}
          {canCreateBranch && (
            <div
              onClick={() => setShowCreateModal(true)}
              className={`p-4 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] ${
                settings.theme === 'dark'
                  ? 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50'
                  : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-100/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full min-h-[160px] space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <svg className={`w-6 h-6 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className={`font-semibold mb-1 ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Yangi filial yaratish
                  </h3>
                  <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Yangi filial qo'shish uchun bosing
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {branches.length === 0 && (
          <div className="text-center py-12">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
              settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <svg className={`w-8 h-8 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Hali filiallar yo'q
            </h3>
            <p className={`text-gray-500 dark:text-gray-400 mb-6`}>
              Birinchi filialingizni yarating va qarzlarni boshqarishni boshlang
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Birinchi filial yaratish
            </button>
          </div>
        )}

        {/* Modals */}
        <BranchCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />

        <BranchSettingsModal
          isOpen={!!editingBranch}
          branch={editingBranch}
          onClose={() => setEditingBranch(null)}
          onSuccess={() => setEditingBranch(null)}
          onDelete={(branch) => {
            setEditingBranch(null);
            setDeletingBranch(branch);
          }}
        />

        <BranchDeleteModal
          isOpen={!!deletingBranch}
          branch={deletingBranch}
          onClose={() => setDeletingBranch(null)}
          onSuccess={() => setDeletingBranch(null)}
        />
      </div>
    </div>
  );
}