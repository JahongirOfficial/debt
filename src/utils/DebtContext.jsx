import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useBranches } from './BranchContext';
import { apiFetch } from './api';

// Create the context
const DebtContext = createContext();

// Provider component
export const DebtProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { activeBranch } = useBranches();
  const [debts, setDebts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier, setUserTier] = useState('free');
  const [debtLimit, setDebtLimit] = useState(20);

  // Fetch debts from backend (with loading state for initial load)
  const fetchDebts = async () => {
    if (!user || !activeBranch) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/branches/${activeBranch._id}/debts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDebts(data.debts);
        setUserTier(data.userTier || 'free');
        setDebtLimit(data.debtLimit || 20);
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

  // Refresh debts without loading state (for updates after CRUD operations)
  const refreshDebts = async () => {
    if (!user || !activeBranch) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/branches/${activeBranch._id}/debts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDebts(data.debts);
        setUserTier(data.userTier || 'free');
        setDebtLimit(data.debtLimit || 20);
      } else {
        console.error('Failed to refresh debts:', data.message);
      }
    } catch (err) {
      console.error('Refresh debts error:', err);
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
    if (!user || !activeBranch) return { success: false, message: 'User not authenticated or no active branch' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/branches/${activeBranch._id}/debts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(debtData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Optimistically update the local state immediately
        setDebts(prevDebts => [...prevDebts, data.debt]);
        
        // Return immediately after successful creation
        const result = { success: true, debt: data.debt };
        
        // Update ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating ratings:', error);
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
        // Optimistically update the local state immediately
        setDebts(prevDebts => 
          prevDebts.map(debt => 
            debt._id === id ? { ...debt, ...data.debt } : debt
          )
        );
        
        // Return immediately after successful update
        const result = { success: true, debt: data.debt };
        
        // Update ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating ratings:', error);
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
        // Optimistically remove the debt from local state immediately
        setDebts(prevDebts => prevDebts.filter(debt => debt._id !== id));
        
        // Return immediately after successful deletion
        const result = { success: true };
        
        // Update ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating ratings:', error);
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
        // Optimistically update the local state immediately
        setDebts(prevDebts => 
          prevDebts.map(debt => 
            debt._id === id ? { ...debt, ...data.debt } : debt
          )
        );
        
        // Return immediately after successful operation
        const result = { success: true, debt: data.debt };
        
        // Update ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating ratings:', error);
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

  // Adjust debt amount (add or subtract)
  const adjustDebtAmount = async (id, adjustmentData) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch(`/debts/${id}/adjust`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustmentData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Optimistically update the local state immediately
        setDebts(prevDebts => 
          prevDebts.map(debt => 
            debt._id === id ? { ...debt, ...data.debt } : debt
          )
        );
        
        // Return immediately after successful operation
        const result = { success: true, debt: data.debt };
        
        // Update ratings in the background without blocking
        setTimeout(async () => {
          try {
            // Recalculate ratings
            await calculateRatings();
          } catch (error) {
            console.error('Error updating ratings:', error);
          }
        }, 0);
        
        return result;
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Adjust debt amount error:', err);
      return { success: false, message: 'Network error while adjusting debt amount' };
    }
  };

  // Fetch debts and ratings when user is authenticated and branch is active
  useEffect(() => {
    if (user && !authLoading && activeBranch) {
      fetchDebts();
      fetchRatings();
    } else if (!user && !authLoading) {
      // Clear debts and ratings when user logs out
      setDebts([]);
      setRatings([]);
      setLoading(false);
    } else if (user && !activeBranch) {
      // Clear debts when no active branch
      setDebts([]);
      setLoading(false);
    }
  }, [user, authLoading, activeBranch]);

  // Refresh debts when active branch changes
  useEffect(() => {
    if (user && activeBranch) {
      refreshDebts();
    }
  }, [activeBranch]);

  // Context value
  const value = {
    debts,
    ratings,
    loading,
    error,
    userTier,
    debtLimit,
    fetchDebts,
    fetchRatings,
    calculateRatings,
    createDebt,
    updateDebt,
    deleteDebt,
    fetchDebtHistory,
    markDebtAsPaid,
    adjustDebtAmount
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