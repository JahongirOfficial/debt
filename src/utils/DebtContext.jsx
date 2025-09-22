import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create the context
const DebtContext = createContext();

// Provider component
export const DebtProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [debts, setDebts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendPort, setBackendPort] = useState(5000); // Default port

  // Get backend port from Electron in desktop app
  useEffect(() => {
    const getBackendPort = async () => {
      if (window.electronAPI && window.electronAPI.getBackendPort) {
        try {
          const port = await window.electronAPI.getBackendPort();
          setBackendPort(port);
        } catch (error) {
          console.error('Error getting backend port:', error);
        }
      }
    };
    
    getBackendPort();
  }, []);

  // Fetch debts from backend
  const fetchDebts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:${backendPort}/api/debts`, {
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
      const response = await fetch(`http://localhost:${backendPort}/api/ratings`, {
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
      }
    } catch (err) {
      console.error('Fetch ratings error:', err);
    }
  };

  // Calculate and update creditor ratings
  const calculateRatings = async () => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:${backendPort}/api/ratings/calculate`, {
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
      const response = await fetch(`http://localhost:${backendPort}/api/debts`, {
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
      const response = await fetch(`http://localhost:${backendPort}/api/debts/${id}`, {
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
  const deleteDebt = async (id) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:${backendPort}/api/debts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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

  // Mark debt as paid
  const markAsPaid = async (id) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:${backendPort}/api/debts/${id}/pay`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
    markAsPaid
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