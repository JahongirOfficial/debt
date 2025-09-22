import React from 'react';

export function SkeletonLoader({ type = 'default', className = '' }) {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const skeletonTypes = {
    // Dashboard stats cards
    dashboardStats: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className={`${baseClasses} h-4 w-24 mb-2`}></div>
                <div className={`${baseClasses} h-6 w-32`}></div>
              </div>
              <div className={`${baseClasses} w-12 h-12 rounded-xl`}></div>
            </div>
          </div>
        ))}
      </div>
    ),
    
    // Dashboard chart
    dashboardChart: (
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-8">
        <div className={`${baseClasses} h-6 w-48 mb-4`}></div>
        <div className={`${baseClasses} h-64 w-full rounded-lg`}></div>
      </div>
    ),
    
    // Dashboard recent activity
    dashboardActivity: (
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className={`${baseClasses} h-6 w-48 mb-4`}></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`${baseClasses} w-10 h-10 rounded-full`}></div>
                <div>
                  <div className={`${baseClasses} h-4 w-24 mb-1`}></div>
                  <div className={`${baseClasses} h-3 w-16`}></div>
                </div>
              </div>
              <div className="text-right">
                <div className={`${baseClasses} h-4 w-20 mb-1`}></div>
                <div className={`${baseClasses} h-3 w-16`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Debts list
    debtsList: (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <div className={`${baseClasses} h-8 w-48`}></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${baseClasses} w-12 h-12 rounded-full`}></div>
                  <div>
                    <div className={`${baseClasses} h-5 w-32 mb-1`}></div>
                    <div className={`${baseClasses} h-4 w-24`}></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${baseClasses} h-6 w-24 mb-1`}></div>
                  <div className={`${baseClasses} h-4 w-20`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Analytics summary cards
    analyticsStats: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className={`${baseClasses} h-4 w-24 mb-2`}></div>
                <div className={`${baseClasses} h-8 w-32`}></div>
              </div>
              <div className={`${baseClasses} w-12 h-12 rounded-xl`}></div>
            </div>
          </div>
        ))}
      </div>
    ),
    
    // Analytics charts
    analyticsCharts: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className={`${baseClasses} h-6 w-40 mb-4`}></div>
          <div className="flex items-center justify-center">
            <div className={`${baseClasses} w-48 h-48 rounded-full`}></div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className={`${baseClasses} w-4 h-4 rounded-full`}></div>
              <div className={`${baseClasses} h-4 w-24`}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`${baseClasses} w-4 h-4 rounded-full`}></div>
              <div className={`${baseClasses} h-4 w-24`}></div>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className={`${baseClasses} h-6 w-40 mb-4`}></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className={`${baseClasses} h-4 w-20`}></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`${baseClasses} w-3 h-3 rounded-full`}></div>
                    <div className={`${baseClasses} h-4 w-8`}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`${baseClasses} w-3 h-3 rounded-full`}></div>
                    <div className={`${baseClasses} h-4 w-8`}></div>
                  </div>
                  <div className={`${baseClasses} h-4 w-20`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    
    // Analytics creditors
    analyticsCreditors: (
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className={`${baseClasses} h-6 w-64 mb-4`}></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`${baseClasses} w-8 h-8 rounded-full`}></div>
                <div>
                  <div className={`${baseClasses} h-5 w-32 mb-1`}></div>
                  <div className={`${baseClasses} h-4 w-20`}></div>
                </div>
              </div>
              <div className="text-right">
                <div className={`${baseClasses} h-6 w-24 mb-1`}></div>
                <div className={`${baseClasses} h-4 w-32`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Reports list
    reportsList: (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${baseClasses} w-12 h-12 rounded-full`}></div>
                  <div>
                    <div className={`${baseClasses} h-5 w-32 mb-1`}></div>
                    <div className={`${baseClasses} h-4 w-24`}></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${baseClasses} h-6 w-24 mb-1`}></div>
                  <div className={`${baseClasses} h-4 w-20`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Ratings stats
    ratingsStats: (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className={`${baseClasses} h-4 w-20 mb-2`}></div>
                <div className={`${baseClasses} h-8 w-12`}></div>
              </div>
              <div className={`${baseClasses} w-12 h-12 rounded-xl`}></div>
            </div>
          </div>
        ))}
      </div>
    ),
    
    // Ratings list
    ratingsList: (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="backdrop-blur-lg border rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className={`${baseClasses} w-12 h-12 rounded-full`}></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${baseClasses} h-6 w-32`}></div>
                  <div className={`${baseClasses} h-5 w-20 rounded-full`}></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[1, 2, 3, 4].map((subItem) => (
                    <div key={subItem}>
                      <div className={`${baseClasses} h-4 w-16 mb-1`}></div>
                      <div className={`${baseClasses} h-5 w-8`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    
    // Auth form
    authForm: (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
          <div className={`${baseClasses} h-8 w-32 mx-auto`}></div>
          <div className={`${baseClasses} h-5 w-40 mt-2 mx-auto`}></div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className={`${baseClasses} h-4 w-16 mb-2`}></div>
                <div className={`${baseClasses} h-12 w-full rounded-lg`}></div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${baseClasses} w-4 h-4 rounded`}></div>
                <div className={`${baseClasses} h-4 w-20 ml-2`}></div>
              </div>
              <div className={`${baseClasses} h-4 w-24`}></div>
            </div>
            <div className={`${baseClasses} h-12 w-full rounded-lg`}></div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className={`${baseClasses} h-4 w-64 mx-auto`}></div>
          </div>
        </div>
      </div>
    ),
    
    // Default skeleton
    default: (
      <div className="flex justify-center items-center h-64">
        <div className={`${baseClasses} rounded-full h-12 w-12`}></div>
      </div>
    )
  };

  return (
    <div className={className}>
      {skeletonTypes[type] || skeletonTypes.default}
    </div>
  );
}