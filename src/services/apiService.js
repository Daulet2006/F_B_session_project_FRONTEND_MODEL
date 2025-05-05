// src/services/apiService.js
import axios from 'axios';
import store from '../redux/store';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic GET method
export const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Specific API functions
export const fetchVets = async (params) => {
  return await api.get('/vets', { params });
};

export const createVet = async (vetData) => {
  return await api.post('/vets', vetData);
};

export const updateVet = async (id, vetData) => {
  return await api.put(`/vets/${id}`, vetData);
};

export const deleteVet = async (id) => {
  return await api.delete(`/vets/${id}`);
};

export const fetchPets = async () => {
  return await api.get('/pets');
};

export const createPet = async (petData) => {
  return await api.post('/pets', petData);
};

export const updatePet = async (id, petData) => {
  return await api.put(`/pets/${id}`, petData);
};

export const deletePet = async (id) => {
  return await api.delete(`/pets/${id}`);
};

export const fetchProducts = async () => {
  return await api.get('/products');
};

export const createProduct = async (productData) => {
  return await api.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
  return await api.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`);
};

export const fetchCategories = async () => {
  return await api.get('/categories');
};

export const createCategory = async (categoryData) => {
  return await api.post('/categories', categoryData);
};

export const updateCategory = async (id, categoryData) => {
  return await api.put(`/categories/${id}`, categoryData);
};

export const deleteCategory = async (id) => {
  return await api.delete(`/categories/${id}`);
};

export const fetchAppointments = async () => {
  return await api.get('/appointments');
};

export const createAppointment = async (appointmentData) => {
  return await api.post('/appointments', appointmentData);
};

export const updateAppointment = async (id, appointmentData) => {
  return await api.put(`/appointments/${id}`, appointmentData);
};

export const deleteAppointment = async (id) => {
  return await api.delete(`/appointments/${id}`);
};

export const fetchOrders = async () => {
  // Fetches orders based on user role (own for client, all for admin/owner)
  return await api.get('/orders');
};

// fetchAllOrders removed as /orders handles role-based fetching

export const fetchOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

export const createOrder = async (orderData) => {
  return await api.post('/orders', orderData);
};

export const updateOrderStatus = async (id, status) => {
  // Corrected endpoint: PUT /orders/:id
  return await api.put(`/orders/${id}`, { status });
};

export const deleteOrder = async (id) => {
  return await api.delete(`/orders/${id}`);
};

// fetchUserProfile removed - User data should come from auth state after login

// updateUserProfile removed - User updates might be handled differently (e.g., admin only)

export const fetchUsers = async () => {
  return await api.get('/users');
};

export const updateUserRole = async (id, role) => {
  // Corrected endpoint: PUT /api/user/:id/role
  return await api.put(`/api/user/${id}/role`, { role });
};

export const fetchUserPermissions = async () => {
  // Corrected endpoint: GET /api/user/permissions
  return await api.get('/api/user/permissions');
};

export const fetchChatHistory = async () => {
  return await api.get('/chat/history');
};

export const sendMessage = async (messageData) => {
  return await api.post('/chat', messageData);
};

export const fetchSalesStatistics = async () => {
  return await api.get('/statistics/sales');
};

export default api;