import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiFetch } from './api';

// Create the context
const DebtContext = createContext();

// Provider component
export const DebtProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [debts, setDebts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch debts from backend
  const fetchDebts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiFetch('/debts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDebts(data.debts);
      } else {
        setError(data.message || 'Failed to fetch debts');
      }
    } catch (err) {
      setError('Network error while fetching debts');
      console.error('Fetch debts error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch creditor ratings from backend
  const fetchRatings = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/ratings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRatings(data.ratings);
      } else {
        console.error('Failed to fetch ratings:', data.message);
        // Set empty array if fetch fails
        setRatings([]);
      }
    } catch (err) {
      console.error('Fetch ratings error:', err);
      // Set empty array if fetch fails
      setRatings([]);
    }
  };

  // Calculate and update creditor ratings
  const calculateRatings = async () => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/ratings/calculate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh ratings list
        await fetchRatings();
        return { success: true };
      } else {
        console.error('Failed to calculate ratings:', data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Calculate ratings error:', err);
      return { success: false, message: 'Network error while calculating ratings' };
    }
  };

  // Create a new debt
  const createDebt = async (debtData) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/debts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debtData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Return immediately after successful creation
        const result = { success: true, debt: data.debt };
        
        // Update debts list and ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Refresh debts list
            await fetchDebts();
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating debts list and ratings:', error);
          }
        }, 0);
        
        return result;
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Create debt error:', err);
      return { success: false, message: 'Network error while creating debt' };
    }
  };

  // Update an existing debt
  const updateDebt = async (id, debtData) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/debts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debtData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Return immediately after successful update
        const result = { success: true, debt: data.debt };
        
        // Update debts list and ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Refresh debts list
            await fetchDebts();
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating debts list and ratings:', error);
          }
        }, 0);
        
        return result;
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Update debt error:', err);
      return { success: false, message: 'Network error while updating debt' };
    }
  };

  // Delete a debt
  const deleteDebt = async (id, reason = '') => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/debts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }), // Pass reason in request body
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Return immediately after successful deletion
        const result = { success: true };
        
        // Update debts list and ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Refresh debts list
            await fetchDebts();
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating debts list and ratings:', error);
          }
        }, 0);
        
        return result;
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Delete debt error:', err);
      return { success: false, message: 'Network error while deleting debt' };
    }
  };

  // Fetch debt history
  const fetchDebtHistory = async (debtId) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/debts/${debtId}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { success: true, history: data.history };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Fetch debt history error:', err);
      return { success: false, message: 'Network error while fetching debt history' };
    }
  };

  // Mark a debt as paid
  const markDebtAsPaid = async (id, reason = '') => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/debts/${id}/pay`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }), // Pass reason in request body
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Return immediately after successful operation
        const result = { success: true, debt: data.debt };
        
        // Update debts list and ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Refresh debts list
            await fetchDebts();
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating debts list and ratings:', error);
          }
        }, 0);
        
        return result;
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Mark as paid error:', err);
      return { success: false, message: 'Network error while marking debt as paid' };
    }
  };

  // Fetch debts and ratings when user is authenticated
  useEffect(() => {
    if (user && !authLoading) {
      fetchDebts();
      fetchRatings();
    } else if (!user && !authLoading) {
      // Clear debts and ratings when user logs out
      setDebts([]);
      setRatings([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  // Context value
  const value = {
    debts,
    ratings,
    loading,
    error,
    fetchDebts,
    fetchRatings,
    calculateRatings,
    createDebt,
    updateDebt,
    deleteDebt,
    fetchDebtHistory,
    markDebtAsPaid
  };

  return (
    <DebtContext.Provider value={value}>
      {children}
    </DebtContext.Provider>
  );
};

// Custom hook to use the debt context
export const useDebts = () => {
  const context = useContext(DebtContext);
  if (!context) {
    throw new Error('useDebts must be used within a DebtProvider');
  }
  return context;
};