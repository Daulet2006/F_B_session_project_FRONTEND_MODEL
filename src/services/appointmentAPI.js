import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/appointments';  // URL вашего Flask API

// Получение записей для текущего пользователя
export const getAppointments = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error.response?.data || error.message);
    throw error;
  }
};

// Создание новой записи (для customer)
export const createAppointment = async (appointmentData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(API_URL, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error.response?.data || error.message);
    throw error;
  }
};

// Обновление статуса записи (для vet и admin)
export const updateAppointment = async (appointmentId, status) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(`${API_URL}/${appointmentId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error.response?.data || error.message);
    throw error;
  }
};

// Удаление записи (для admin или владельца записи)
export const deleteAppointment = async (appointmentId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.delete(`${API_URL}/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error.response?.data || error.message);
    throw error;
  }
};
