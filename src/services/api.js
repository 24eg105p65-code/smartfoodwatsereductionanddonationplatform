// Central API configuration and fetch wrapper for future Java Spring Boot Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const DEMO_MODE = import.meta.env.VITE_ENABLE_DEMO_MODE !== 'false';

export const apiClient = async (endpoint, options = {}) => {
  if (DEMO_MODE) {
    console.log(`[Demo Mode API Call] ${options.method || 'GET'} ${endpoint}`);
    return null; // Handled by mock service layer
  }

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
