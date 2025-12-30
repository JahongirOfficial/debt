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
  const login = async (fullPhoneNumber, password) => {
    // If backend is not available, simulate login with credential validation
    if (!backendAvailable) {
      // In test mode, we still want to validate credentials
      // For demo purposes, we'll accept any non-empty phone and password
      if (!fullPhoneNumber || !password) {
        return { success: false, message: 'Phone number and password are required' };
      }
      
      // Validate phone number format
      if (!fullPhoneNumber.startsWith('+')) {
        return { success: false, message: 'Phone number must start with country code (e.g., +998)' };
      }
      
      // For demo purposes, we'll accept a specific test account
      // In a real application, you would implement proper validation
      if (fullPhoneNumber === '+998901234567' && password === 'password123') {
        // Create a mock user for the test account
        const mockUser = {
          id: 'test-user-id',
          username: 'testuser',
          phone: '+998901234567',
          subscriptionTier: 'free',
          avatarColor: 'bg-gradient-to-br from-blue-500 to-indigo-500',
          role: 'user'
        };
        
        console.log('🔐 Test Login successful - User data:', mockUser);
        console.log('👤 Test User role:', mockUser.role);
        
        localStorage.setItem('token', 'test-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        
        return { success: true, user: mockUser };
      } else if (fullPhoneNumber === '+998901234568' && password === 'admin123') {
        // Admin test account
        const mockAdminUser = {
          id: 'admin-user-id',
          username: 'admin',
          phone: '+998901234568',
          subscriptionTier: 'pro',
          role: 'admin',
          avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
        };
        
        console.log('🔐 Test Admin Login successful - User data:', mockAdminUser);
        console.log('👤 Test Admin User role:', mockAdminUser.role);
        
        localStorage.setItem('token', 'admin-test-token');
        localStorage.setItem('user', JSON.stringify(mockAdminUser));
        setUser(mockAdminUser);
        
        return { success: true, user: mockAdminUser };
      } else {
        // Invalid credentials
        return { success: false, message: 'Invalid credentials' };
      }
    }
    
    try {
      // Validate phone number format
      if (!fullPhoneNumber.startsWith('+')) {
        return { success: false, message: 'Phone number must start with country code (e.g., +998)' };
      }
      
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: fullPhoneNumber, password }),
      });

      // Clone the response to avoid "body stream already read" error
      const responseData = await response.clone().json();

      if (responseData.success) {
        console.log('🔐 Login successful - User data:', responseData.user);
        console.log('👤 User role:', responseData.user.role);
        
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        setUser(responseData.user);
        
        // Fetch user settings
        await fetchUserSettings(responseData.token, responseData.user);
        
        return { success: true, user: responseData.user };
      } else {
        return { success: false, message: responseData.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error during login' };
    }
  };

  // Register function
  const register = async (name, fullPhoneNumber, password) => {
    // If backend is not available, simulate registration with validation
    if (!backendAvailable) {
      // Validate input
      if (!name || !fullPhoneNumber || !password) {
        return { success: false, message: 'All fields are required' };
      }
      
      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long' };
      }
      
      // Validate phone number format
      if (!fullPhoneNumber.startsWith('+')) {
        return { success: false, message: 'Phone number must start with country code (e.g., +998)' };
      }
      
      // Don't allow registration in test mode
      return { success: false, message: 'Registration is disabled in test mode.' };
    }
    
    try {
      // Validate phone number format
      if (!fullPhoneNumber.startsWith('+')) {
        return { success: false, message: 'Phone number must start with country code (e.g., +998)' };
      }
      
      const response = await apiFetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone: fullPhoneNumber, password }),
      });

      // Clone the response to avoid "body stream already read" error
      const responseData = await response.clone().json();

      if (responseData.success) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('user', JSON.stringify(responseData.user));
        setUser(responseData.user);
        
        // Fetch user settings
        await fetchUserSettings(responseData.token, responseData.user);
        
        return { success: true, user: responseData.user };
      } else {
        return { success: false, message: responseData.message };
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

  // Update user profile (name)
  const updateProfile = async (profileData) => {
    if (!backendAvailable) {
      // Update local user data
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, message: 'Network error while updating profile' };
    }
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
    updateUserSettings,
    updateProfile
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