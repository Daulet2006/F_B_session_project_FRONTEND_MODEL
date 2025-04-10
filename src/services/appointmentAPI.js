// src/services/appointmentAPI.js
import axios from 'axios';
import API_URL from "./localhostAPI";
// Централизованная обработка ошибок
const handleError = (error) => {
  if (error.response) {
    return error.response.data?.message || error.response.data || 'Server error';
  } else if (error.request) {
    return 'No response from server. Please try again later.';
  }
  return error.message;
};

// Получение всех записей для текущего пользователя
export const getAppointments = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(API_URL('appointments'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error fetching appointments:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Получение одной записи по ID
export const getAppointmentById = async (appointmentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(API_URL(`appointments/${appointmentId}`), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error fetching appointment by ID:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Создание новой записи (только для customer)
export const createAppointment = async (appointmentData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // Проверка обязательных полей
    if (!appointmentData.vet_id || !appointmentData.date) {
      throw new Error('Vet ID and date are required');
    }

    // Проверка формата даты
    if (isNaN(new Date(appointmentData.date).getTime())) {
      throw new Error('Invalid date format');
    }

    const response = await axios.post(API_URL('appointments'), appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error creating appointment:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Обновление статуса записи (для vet и admin)
export const updateAppointment = async (appointmentId, status) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    if (!status) {
      throw new Error('Status is required');
    }

    const response = await axios.put(API_URL(`appointments/${appointmentId}`), { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error updating appointment:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Удаление записи (для admin или владельца записи)
export const deleteAppointment = async (appointmentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.delete(API_URL(`appointments/${appointmentId}`), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error deleting appointment:', errorMessage);
    throw new Error(errorMessage);
  }
};
