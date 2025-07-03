import apiClient from '../Axios/axios';

/**
 * Crea un nuevo método de pago.
 * POST /payment-methods
 * @param {Object} data { userId, type, details, defaultMethod, visible }
 * @returns Promise<PaymentMethodDTO>
 */
export function createPaymentMethod(data) {
  return apiClient.post('/payment-methods', data);
}

/**
 * Obtiene un método de pago por su ID.
 * GET /payment-methods/{id}
 * @param {number} id
 * @returns Promise<PaymentMethodDTO>
 */
export function getPaymentMethodById(id) {
  return apiClient.get(`/payment-methods/${id}`);
}

/**
 * Lista todos los métodos de pago visibles.
 * GET /payment-methods
 * @returns Promise<PaymentMethodDTO[]>
 */
export function getAllPaymentMethods() {
  return apiClient.get('/payment-methods');
}

/**
 * Lista métodos de pago de un usuario.
 * GET /payment-methods/user/{userId}
 * @param {number} userId
 * @returns Promise<PaymentMethodDTO[]>
 */
export function getPaymentMethodsByUser(userId) {
  return apiClient.get(`/payment-methods/user/${userId}`);
}

/**
 * Actualiza un método de pago.
 * PUT /payment-methods/{id}
 * @param {number} id
 * @param {Object} data
 * @returns Promise<PaymentMethodDTO>
 */
export function updatePaymentMethod(id, data) {
  return apiClient.put(`/payment-methods/${id}`, data);
}

/**
 * "Elimina" (marca visible=false) un método de pago.
 * DELETE /payment-methods/{id}
 * @param {number} id
 * @returns Promise<void>
 */
export function deletePaymentMethod(id) {
  return apiClient.delete(`/payment-methods/${id}`);
}
