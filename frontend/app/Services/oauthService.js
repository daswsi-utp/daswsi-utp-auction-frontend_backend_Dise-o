// app/Services/oauthService.js
import apiClient from '../Axios/axios';

const OAUTH_ENDPOINT = '/oauth2'; // Esto se concatenará con la baseURL del apiClient

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get(`${OAUTH_ENDPOINT}/user-info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const oauthSuccess = async () => {
  try {
    const response = await apiClient.get(`${OAUTH_ENDPOINT}/success`);
    return response.data;
  } catch (error) {
    console.error('Error handling OAuth success:', error);
    throw error;
  }
};