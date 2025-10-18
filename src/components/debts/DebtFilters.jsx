import { useTranslation } from '../../utils/translationUtils';
import { useStoredState } from '../../utils/storageUtils';

export function DebtFilters({ activeTab, onTabChange, searchValue, onSearchChange }) {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const t = useTranslation(language);

  const tabs = [
    { id: 'dueToday', label: t('debts.dueToday', 'Bugungi') },
    { id: 'dueTomorrow', label: t('debts.dueTomorrow', 'Ertaga') },
    { id: 'threeDaysLeft', label: t('debts.threeDaysLeft', '3 kun qoldi') },
    { id: 'overdue', label: t('debts.overdue', 'Qarz') },
    { id: 'pending', label: t('debts.pending', 'Kutilayotgan') },
    { id: 'paid', label: t('debts.paid', 'To\'langan') },
    { id: 'all', label: t('debts.all', 'Barchasi') }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg hover:shadow-xl focus-within:shadow-2xl transition-all duration-300">
          <input
            type="text"
            placeholder={t('debts.searchPlaceholder', 'Qarzlarni izlash...')}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-4 pl-14 pr-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base md:text-lg font-medium"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchValue && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl p-2 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl blur opacity-30"></div>
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}