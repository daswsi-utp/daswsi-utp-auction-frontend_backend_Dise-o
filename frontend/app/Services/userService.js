//app\Services\userService.js
import apiClient from '../Axios/axios';

const USER_ENDPOINT = '/api/users';

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`${USER_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`${USER_ENDPOINT}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`${USER_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};