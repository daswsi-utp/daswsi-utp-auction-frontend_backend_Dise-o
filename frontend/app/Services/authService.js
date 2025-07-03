// app/Services/authService.js
import apiClient from '../Axios/axios';

const AUTH_ENDPOINT = '/api/auth'; // Esto se concatenará con la baseURL del apiClient

export const register = async (userData) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    // El interceptor de Axios ya maneja la creación de un nuevo Error con un mensaje descriptivo
    throw error; 
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const initiatePasswordReset = async (email) => {
  try {
    // Para enviar el email como query parameter, se usa el objeto params
    const response = await apiClient.post(`${AUTH_ENDPOINT}/password-reset/initiate`, null, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw error;
  }
};

export const completePasswordReset = async (token, newPassword) => {
  try {
    // Para enviar token y newPassword como query parameters
    const response = await apiClient.post(`${AUTH_ENDPOINT}/password-reset/complete`, null, {
      params: { token, newPassword }
    });
    return response.data;
  } catch (error) {
    console.error('Error completing password reset:', error);
    throw error;
  }
};