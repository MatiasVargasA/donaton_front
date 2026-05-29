import axios from 'axios';

// Función para crear instancias con el interceptor de token
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor para añadir el token a las peticiones
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('donaton_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para manejar errores 401 (token expirado)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const isLoginRequest = error.config && error.config.url && error.config.url.includes('/auth/login');
        if (!isLoginRequest) {
          localStorage.removeItem('donaton_token');
          localStorage.removeItem('donaton_user');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Exportamos las instancias para cada microservicio
export const apiAuth = createInstance(import.meta.env.VITE_API_URL || 'http://localhost:8083');
export const apiDonaciones = createInstance('http://localhost:8080');
export const apiNecesidades = createInstance('http://localhost:8081');
export const apiLogistica = createInstance('http://localhost:8082');

// Auth
export default apiAuth;
