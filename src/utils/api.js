import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = "https://api-inventory.isavralabel.com/central-blessindo/api";
export const API_BASE_URL_IMAGE = "https://api-inventory.isavralabel.com/central-blessindo";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  
  // Categories
  categories: '/categories',
  createCategory: '/categories',
  updateCategory: (id) => `/categories/${id}`,
  deleteCategory: (id) => `/categories/${id}`,
  
  // Products
  products: '/products',
  publicProducts: '/products/public',
  publicProductById: (id) => `/products/public/${id}`,
  createProduct: '/products',
  updateProduct: (id) => `/products/${id}`,
  deleteProduct: (id) => `/products/${id}`,
  uploadProductImage: '/products/upload-image',
  
  // Admin Settings
  settings: '/settings',
  updateSettings: '/settings',
  
  // Dashboard Stats
  dashboardStats: '/dashboard/stats',
  
  // Clients
  clients: '/clients',
  publicClients: '/clients/public',
  createClient: '/clients',
  updateClient: (id) => `/clients/${id}`,
  deleteClient: (id) => `/clients/${id}`,
  uploadClientLogo: '/clients/upload-logo',
};

// API functions
export const authAPI = {
  login: (credentials) => api.post(endpoints.login, credentials),
  logout: () => {
    localStorage.removeItem('admin_token');
    return Promise.resolve();
  },
  isAuthenticated: () => !!localStorage.getItem('admin_token'),
};

export const categoriesAPI = {
  getAll: () => api.get(endpoints.categories),
  create: (data) => api.post(endpoints.createCategory, data),
  update: (id, data) => api.put(endpoints.updateCategory(id), data),
  delete: (id) => api.delete(endpoints.deleteCategory(id)),
};

export const productsAPI = {
  getAll: (page = 1, limit = 10, category = '') => 
    api.get(`${endpoints.products}?page=${page}&limit=${limit}&category=${category}`),
  getPublic: (page = 1, limit = 10, category = '') => 
    api.get(`${endpoints.publicProducts}?page=${page}&limit=${limit}&category=${category}`),
  getById: (id) => api.get(endpoints.publicProductById(id)),
  create: (data) => api.post(endpoints.createProduct, data),
  update: (id, data) => api.put(endpoints.updateProduct(id), data),
  delete: (id) => api.delete(endpoints.deleteProduct(id)),
  uploadImage: (formData) => api.post(endpoints.uploadProductImage, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export const settingsAPI = {
  get: () => api.get(endpoints.settings),
  update: (data) => api.put(endpoints.updateSettings, data),
};

export const dashboardAPI = {
  getStats: () => api.get(endpoints.dashboardStats),
};

export const clientsAPI = {
  getAll: () => api.get(endpoints.clients),
  getPublic: () => api.get(endpoints.publicClients),
  create: (data) => api.post(endpoints.createClient, data),
  update: (id, data) => api.put(endpoints.updateClient(id), data),
  delete: (id) => api.delete(endpoints.deleteClient(id)),
  uploadLogo: (formData) => api.post(endpoints.uploadClientLogo, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;