import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QarzdaftarRatings } from './Ratings';
import { useStoredState } from '../utils/storageUtils';
import { useTranslation } from '../utils/translationUtils';
import { useDebts } from '../utils/DebtContext';
import { useAuth } from '../utils/AuthContext';

// Mock the hooks
jest.mock('../utils/storageUtils');
jest.mock('../utils/translationUtils');
jest.mock('../utils/DebtContext');
jest.mock('../utils/AuthContext');

describe('QarzdaftarRatings', () => {
  const mockRatings = [
    {
      _id: '1',
      creditor: 'John Doe',
      ratingScore: 95,
      totalDebts: 5,
      paidDebts: 4,
      pendingDebts: 1,
      averageDelay: 0,
      ratingStatus: 'excellent'
    },
    {
      _id: '2',
      creditor: 'Jane Smith',
      ratingScore: 75,
      totalDebts: 8,
      paidDebts: 6,
      pendingDebts: 2,
      averageDelay: 2,
      ratingStatus: 'good'
    }
  ];

  beforeEach(() => {
    useStoredState.mockImplementation((key, defaultValue) => {
      if (key === 'qarzdaftar_language') return ['uz', jest.fn()];
      return [defaultValue, jest.fn()];
    });
    
    useAuth.mockReturnValue({
      settings: { theme: 'light' }
    });
    
    useTranslation.mockReturnValue(jest.fn((key, fallback) => fallback));
    
    useDebts.mockReturnValue({
      ratings: mockRatings,
      loading: false,
      fetchRatings: jest.fn(),
      calculateRatings: jest.fn()
    });
  });

  test('renders ratings table with correct data', () => {
    render(<QarzdaftarRatings />);
    
    // Check if table headers are present
    expect(screen.getByText('Kreditor')).toBeInTheDocument();
    expect(screen.getByText('Reyting')).toBeInTheDocument();
    expect(screen.getByText('Jami')).toBeInTheDocument();
    expect(screen.getByText('To\'langan')).toBeInTheDocument();
    expect(screen.getByText('Kutilayotgan')).toBeInTheDocument();
    expect(screen.getByText('Kechikish')).toBeInTheDocument();
    expect(screen.getByText('Holat')).toBeInTheDocument();
    
    // Check if data is rendered correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument(); // No delay for John
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('2 kun')).toBeInTheDocument(); // 2 days delay for Jane
  });

  test('renders rating status with correct colors', () => {
    render(<QarzdaftarRatings />);
    
    // Check if rating status badges are present with correct classes
    const excellentBadge = screen.getByText('Ajoyib');
    const goodBadge = screen.getByText('Yaxshi');
    
    expect(excellentBadge).toBeInTheDocument();
    expect(goodBadge).toBeInTheDocument();
  });
});