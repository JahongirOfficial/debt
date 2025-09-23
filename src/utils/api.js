// api.js - Utility for handling API calls with proper base URL

const getApiBaseUrl = () => {
  // In production, use the domain-based URL
  if (import.meta.env.PROD) {
    return 'https://debt-tracker.prox.uz/api';
  }
  // In development, use localhost with the appropriate port
  const backendPort = import.meta.env.VITE_BACKEND_PORT || 5001;
  return `http://localhost:${backendPort}/api`;
};

export const apiBaseUrl = getApiBaseUrl();

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${apiBaseUrl}${endpoint}`;
  return fetch(url, options);
};