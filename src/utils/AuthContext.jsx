import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from './api'; // Import the api utility

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    language: 'uz',
    currency: 'UZS',
    theme: 'light'
  });
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Check if backend is available
  useEffect(() => {
    const checkBackendAvailability = async () => {
      try {
        console.log('Checking backend availability');
        const response = await apiFetch('/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setBackendAvailable(true);
          console.log('Backend is available');
        } else {
          setBackendAvailable(false);
          console.error('Backend returned non-ok status:', response.status);
        }
      } catch (error) {
        console.error('Backend not available:', error);
        setBackendAvailable(false);
      }
    };
    
    checkBackendAvailability();
  }, []);

  // Verify token with backend
  const verifyToken = async (token) => {
    try {
      const response = await apiFetch('/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        // Token is invalid or expired
        return null;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem('token');
      if (token && backendAvailable) {
        // Verify the token with the backend
        try {
          const userData = await verifyToken(token);
          if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            // Fetch user settings
            await fetchUserSettings(token, userData);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error verifying user token:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkUserStatus();
  }, [backendAvailable]);

  // Fetch user settings from backend
  const fetchUserSettings = async (token, userData) => {
    try {
      const response = await apiFetch('/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.settings) {
        setSettings({
          language: data.settings.language || 'uz',
          currency: data.settings.currency || 'UZS',
          theme: data.settings.theme || 'light'
        });
        
        // Apply theme immediately
        if (data.settings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  // Update user settings
  const updateUserSettings = async (newSettings) => {
    // If backend is not available, just update local settings
    if (!backendAvailable) {
      setSettings(newSettings);
      
      // Apply theme immediately if it exists in the new settings
      if (newSettings.theme) {
        if (newSettings.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return { success: true };
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      const data = await response.json();

      if (data.success && data.settings) {
        // Preserve existing settings that might not be in the response
        setSettings(prevSettings => ({
          ...prevSettings,
          ...data.settings
        }));
        
        // Apply theme immediately if it exists in the response
        if (data.settings.theme) {
          if (data.settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error updating user settings:', error);
      return { success: false, message: 'Network error while updating settings' };
    }
  };

  // Login function
  const login = async (email, password) => {
    // If backend is not available, simulate login with credential validation
    if (!backendAvailable) {
      // In test mode, we still want to validate credentials
      // For demo purposes, we'll accept any non-empty email and password
      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }
      
      // For demo purposes, we'll accept a specific test account
      // In a real application, you would implement proper validation
      if (email === 'test@example.com' && password === 'password123') {
        // Create a mock user for the test account
        const mockUser = {
          id: 'test-user-id',
          username: 'testuser',
          email: 'test@example.com',
          subscriptionTier: 'free',
          avatarColor: 'bg-gradient-to-br from-blue-500 to-indigo-500'
        };
        
        localStorage.setItem('token', 'test-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { success: true };
      } else {
        // Invalid credentials
        return { success: false, message: 'Invalid credentials' };
      }
    }
    
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Fetch user settings
        await fetchUserSettings(data.token, data.user);
        
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error during login' };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    // If backend is not available, simulate registration with validation
    if (!backendAvailable) {
      // Validate input
      if (!username || !email || !password) {
        return { success: false, message: 'All fields are required' };
      }
      
      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long' };
      }
      
      // For demo purposes, we'll accept a specific test account
      if (email === 'test@example.com' && username === 'testuser' && password === 'password123') {
        // Create a mock user for the test account
        const mockUser = {
          id: 'test-user-id',
          username: 'testuser',
          email: 'test@example.com',
          subscriptionTier: 'free',
          avatarColor: 'bg-gradient-to-br from-blue-500 to-indigo-500'
        };
        
        localStorage.setItem('token', 'test-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { success: true };
      } else {
        // Don't allow registration of other accounts in test mode
        return { success: false, message: 'Registration is disabled in test mode. Use test@example.com / password123 to login.' };
      }
    }
    
    try {
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Fetch user settings
        await fetchUserSettings(data.token, data.user);
        
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error during registration' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSettings({
      language: 'uz',
      currency: 'UZS',
      theme: 'light'
    });
    document.documentElement.classList.remove('dark');
  };

  // Context value
  const value = {
    user,
    loading,
    settings,
    backendAvailable,
    login,
    register,
    logout,
    updateUserSettings
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};