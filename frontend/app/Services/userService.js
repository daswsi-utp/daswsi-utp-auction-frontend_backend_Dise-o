import apiClient from '../Axios/axios';

/**
 * Crea un nuevo usuario.
 * POST /users
 * @param {Object} userData { name, email, passwordHash, ... }
 * @returns Promise<UserDTO>
 */
export function createUser(userData) {
  return apiClient.post('/users', userData);
}

/**
 * Obtiene un usuario por su ID.
 * GET /users/{id}
 * @param {number} userId
 * @returns Promise<UserDTO>
 */
export function getUserById(userId) {
  return apiClient.get(`/users/${userId}`);
}

/**
 * Lista todos los usuarios visibles.
 * GET /users
 * @returns Promise<UserDTO[]>
 */
export function getAllUsers() {
  return apiClient.get('/users');
}

/**
 * Lista usuarios por estado (ACTIVE o SUSPENDED).
 * GET /users/status/{status}
 * @param {string} status // e.g. 'ACTIVE'
 * @returns Promise<UserDTO[]>
 */
export function getUsersByStatus(status) {
  return apiClient.get(`/users/status/${status}`);
}

/**
 * Actualiza un usuario existente.
 * PUT /users/{id}
 * @param {number} userId
 * @param {Object} userData
 * @returns Promise<UserDTO>
 */
export function updateUser(userId, userData) {
  return apiClient.put(`/users/${userId}`, userData);
}

/**
 * "Elimina" (marca como visible=false) un usuario.
 * DELETE /users/{id}
 * @param {number} userId
 * @returns Promise<void>
 */
export function deleteUser(userId) {
  return apiClient.delete(`/users/${userId}`);
}
