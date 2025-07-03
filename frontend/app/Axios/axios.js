// app/Axios/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token JWT a cada solicitud
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un estado de error (4xx, 5xx)
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
      if (error.response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('authToken');
        // Redirigir al login, pero con un mensaje más claro
        window.location.href = '/login?sessionExpired=true';
      }
      // Propagar el error con un mensaje más específico si está disponible
      return Promise.reject(new Error(error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`));
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta (Network Error)
      console.error('Network Error: No response received from server.', error.request);
      return Promise.reject(new Error('Error de conexión con el servidor. Por favor, verifica tu conexión a internet o que el servidor esté funcionando.'));
    } else {
      // Algo sucedió al configurar la solicitud que provocó un error
      console.error('Request Setup Error:', error.message);
      return Promise.reject(new Error(`Error al configurar la solicitud: ${error.message}`));
    }
  }
);

export default apiClient;