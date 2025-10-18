import React from 'react';
import { useAuth } from '../../utils/AuthContext';

export function BranchSkeleton() {
  const { settings } = useAuth();

  return (
    <div className="flex items-center space-x-3 px-4 py-2 rounded-xl animate-pulse">
      {/* Branch Icon Skeleton */}
      <div className={`w-8 h-8 rounded-lg ${
        settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}></div>
      
      {/* Branch Info Skeleton */}
      <div className="flex-1">
        <div className={`h-4 rounded mb-1 ${
          settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`} style={{ width: '60%' }}></div>
        <div className={`h-3 rounded ${
          settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`} style={{ width: '40%' }}></div>
      </div>
      
      {/* Dropdown Arrow Skeleton */}
      <div className={`w-4 h-4 rounded ${
        settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}></div>
    </div>
  );
}

export function BranchListSkeleton({ count = 3 }) {
  const { settings } = useAuth();

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 px-4 py-3 animate-pulse">
          {/* Branch Icon Skeleton */}
          <div className={`w-8 h-8 rounded-lg ${
            settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
          
          {/* Branch Info Skeleton */}
          <div className="flex-1">
            <div className={`h-4 rounded mb-1 ${
              settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`} style={{ width: `${60 + Math.random() * 20}%` }}></div>
            <div className={`h-3 rounded ${
              settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`} style={{ width: `${30 + Math.random() * 20}%` }}></div>
          </div>
          
          {/* Check Icon Skeleton */}
          <div className={`w-4 h-4 rounded ${
            settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
        </div>
      ))}
    </div>
  );
}