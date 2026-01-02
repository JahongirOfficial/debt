// api.js - Utility for handling API calls with proper base URL

const getApiBaseUrl = () => {
  // In production, use the domain-based URL
  if (import.meta.env.PROD) {
    return 'https://nolqarz.uz/api';
  }
  // In development, use localhost with the appropriate port
  // Changed from 5002 to 5003 to match the backend server port
  const backendPort = import.meta.env.VITE_BACKEND_PORT || 5002;
  return `http://localhost:${backendPort}/api`;
};

const apiBaseUrl = getApiBaseUrl();

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${apiBaseUrl}${endpoint}`;

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(`API error ${endpoint}:`, error);
    throw error;
  }
};
