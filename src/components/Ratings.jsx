import React, { useState, useEffect } from 'react';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { useDebts } from '../utils/DebtContext';
import { useAuth } from '../utils/AuthContext'; // Add AuthContext import
import { SkeletonLoader } from './SkeletonLoader';

export function QarzdaftarRatings() {
  const [language] = useStoredState('qarzdaftar_language', 'uz');
  const { settings } = useAuth(); // Get theme settings
  const t = useTranslation(language);
  const { ratings, loading, fetchRatings, calculateRatings } = useDebts();
  const [ratingsSearch, setRatingsSearch] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  // Get filtered creditors for ratings
  const getFilteredRatings = () => {
    if (!ratingsSearch) {
      return ratings;
    }
    
    const searchTerm = ratingsSearch.toLowerCase();
    return ratings.filter(rating => 
      rating.creditor.toLowerCase().includes(searchTerm)
    );
  };

  // Calculate rating stats
  const getRatingStats = () => {
    const stats = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0
    };
    
    ratings.forEach(rating => {
      if (rating.ratingStatus === 'excellent') stats.excellent++;
      else if (rating.ratingStatus === 'good') stats.good++;
      else if (rating.ratingStatus === 'fair') stats.fair++;
      else if (rating.ratingStatus === 'poor') stats.poor++;
    });
    
    return stats;
  };

  const getRatingIcon = (status) => {
    switch (status) {
      case 'excellent':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6" />
          </svg>
        );
      case 'good':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'fair':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'poor':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
    }
  };

  const getRatingText = (status) => {
    switch (status) {
      case 'excellent':
        return t('ratings.status.excellent', 'Ajoyib');
      case 'good':
        return t('ratings.status.good', 'Yaxshi');
      case 'fair':
        return t('ratings.status.fair', 'O\'rta');
      case 'poor':
        return t('ratings.status.poor', 'Yomon');
      default:
        return t('ratings.status.unknown', 'Noma\'lum');
    }
  };

  const getRatingColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'green';
      case 'good':
        return 'blue';
      case 'fair':
        return 'yellow';
      case 'poor':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Calculate ratings on component mount
  useEffect(() => {
    if (initialLoad && !loading) {
      calculateRatings().then((result) => {
        if (!result.success) {
          console.error('Failed to calculate ratings:', result.message);
        }
        setInitialLoad(false);
      }).catch((error) => {
        console.error('Error calculating ratings:', error);
        setInitialLoad(false);
      });
    }
  }, [calculateRatings, loading, initialLoad]);

  const ratingStats = getRatingStats();
  const filteredRatings = getFilteredRatings();
  
  // Determine if dark mode is active
  const isDarkMode = settings.theme === 'dark';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t('ratings.title', 'Kreditorlar reytingi')}</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{t('ratings.subtitle', 'To\'lash xulq-atvori bo\'yicha reyting')}</p>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={ratingsSearch}
            onChange={(e) => setRatingsSearch(e.target.value)}
            className={`w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-500' 
                : 'border-gray-300 text-gray-800 focus:border-orange-500'
            }`}
            placeholder={t('ratings.searchPlaceholder', 'Foydalanuvchi nomini izlash...')}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {ratingsSearch && (
          <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            "{ratingsSearch}" {t('debts.resultsCount', 'bo\'yicha {count} ta natija topildi').replace('{count}', filteredRatings.length)}
          </div>
        )}
      </div>
      
      {/* Rating Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`rounded-xl p-4 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('ratings.status.excellent', 'Ajoyib')}</p>
              <p className="text-2xl font-bold text-green-600">
                {ratingStats.excellent}
              </p>
            </div>
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl p-4 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('ratings.status.good', 'Yaxshi')}</p>
              <p className="text-2xl font-bold text-blue-600">
                {ratingStats.good}
              </p>
            </div>
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-4 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('ratings.status.fair', 'O\'rta')}</p>
              <p className="text-2xl font-bold text-yellow-600">
                {ratingStats.fair}
              </p>
            </div>
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-4 shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('ratings.status.poor', 'Yomon')}</p>
              <p className="text-2xl font-bold text-red-600">
                {ratingStats.poor}
              </p>
            </div>
            <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ratings Table */}
      {loading && initialLoad ? (
        <div>
          <div className="mb-6">
            <div className={`h-8 w-64 rounded mb-2 animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-5 w-80 rounded animate-pulse ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
          <SkeletonLoader type="ratingsStats" />
          <SkeletonLoader type="ratingsList" />
        </div>
      ) : ratings.length === 0 ? (
        <div className="text-center py-12">
          <div className={`rounded-xl p-8 shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-600 text-lg'}>{t('ratings.noRatings', 'Hali reytinglar yo\'q')}</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('ratings.addDebtsToSeeRatings', 'Qarzlar qo\'shish orqali reytinglarni ko\'ring')}</p>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('ratings.ifIssuePersists', 'Agar muammo davom etsa, tizim administratori bilan bog\'laning')}</p>
          </div>
        </div>
      ) : filteredRatings.length === 0 ? (
        <div className="text-center py-12">
          <div className={`rounded-xl p-8 shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-600 text-lg'}>{t('ratings.noSearchResults', 'Qidiruv natijasi topilmadi')}</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>"{ratingsSearch}" {t('ratings.searchResults', 'bo\'yicha foydalanuvchi topilmadi')}</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg">#</th>
                <th className="py-3 px-4 text-left">{t('ratings.creditor', 'Kreditor')}</th>
                <th className="py-3 px-4 text-left">{t('ratings.score', 'Reyting')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('ratings.totalDebts', 'Jami')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('ratings.paidDebts', 'To\'langan')}</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">{t('ratings.pendingDebts', 'Kutilayotgan')}</th>
                <th className="py-3 px-4 text-left rounded-tr-lg">{t('ratings.status.title', 'Holat')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRatings.map((rating, index) => {
                const color = getRatingColor(rating.ratingStatus);
                return (
                  <tr 
                    key={rating._id || index} 
                    className={`${
                      index % 2 === 0 
                        ? 'bg-white dark:bg-gray-800' 
                        : 'bg-gray-50 dark:bg-gray-700'
                    } hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors`}
                  >
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-mono">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-2 ${
                          color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                          color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
                          color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                          color === 'red' ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                          'bg-gradient-to-br from-gray-500 to-gray-600'
                        }`}>
                          {rating.creditor.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium">{rating.creditor}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-800 dark:text-white">
                      {rating.ratingScore}%
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                      {rating.totalDebts}
                    </td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400 hidden md:table-cell">
                      {rating.paidDebts}
                    </td>
                    <td className="py-3 px-4 text-orange-600 dark:text-orange-400 hidden md:table-cell">
                      {rating.pendingDebts}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {getRatingIcon(rating.ratingStatus)}
                        {getRatingText(rating.ratingStatus)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}