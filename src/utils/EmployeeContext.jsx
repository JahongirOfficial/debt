import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Employee limits by subscription tier
  const EMPLOYEE_LIMITS = {
    free: 1,
    lite: 2,
    standard: 3,
    pro: 5
  };

  const employeeLimit = user ? EMPLOYEE_LIMITS[user.subscriptionTier] || 1 : 1;
  const canCreateEmployee = employees.length < employeeLimit;

  // Fetch employees
  const fetchEmployees = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setEmployees(data.employees);
      } else {
        setError(data.message || 'Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Network error while fetching employees');
    } finally {
      setLoading(false);
    }
  };

  // Add employee
  const addEmployee = async (employeeData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });

      const data = await response.json();

      if (data.success) {
        setEmployees(prev => [data.employee, ...prev]);
        return { success: true, employee: data.employee };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      return { success: false, message: 'Network error while adding employee' };
    }
  };

  // Update employee
  const updateEmployee = async (employeeId, updateData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.success) {
        setEmployees(prev => 
          prev.map(emp => emp._id === employeeId ? data.employee : emp)
        );
        return { success: true, employee: data.employee };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      return { success: false, message: 'Network error while updating employee' };
    }
  };

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setEmployees(prev => prev.filter(emp => emp._id !== employeeId));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      return { success: false, message: 'Network error while deleting employee' };
    }
  };

  // Get employee by ID
  const getEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/employees/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, employee: data.employee };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      return { success: false, message: 'Network error while fetching employee' };
    }
  };

  // Fetch employees when user changes
  useEffect(() => {
    if (user) {
      fetchEmployees();
    } else {
      setEmployees([]);
    }
  }, [user]);

  const value = {
    employees,
    loading,
    error,
    employeeLimit,
    canCreateEmployee,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};