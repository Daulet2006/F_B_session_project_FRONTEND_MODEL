// src/services/authAPI.js
import axios from 'axios';
import API_URL from "./localhostAPI";

// Обработка ошибок централизованно
const handleError = (error) => {
  if (error.response) {
    // Ошибка от сервера (например, 400, 500 и т.д.)
    return error.response?.data || error.message;
  } else if (error.request) {
    // Ошибка при отправке запроса
    return 'No response from server. Please try again later.';
  } else {
    // Общая ошибка (например, неправильная настройка)
    return error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL('auth/register'), userData);
    return response.data; // Возвращаем ответ от сервера
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error registering user:', errorMessage);
    throw new Error(errorMessage); // Бросаем ошибку для обработки в компоненте
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(API_URL('auth/login'), credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error logging in:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Функция для получения текущего пользователя (если токен валиден)
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(API_URL('auth/profile'), {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error getting current user:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Функция для выхода из системы
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(API_URL('auth/logout'), {}, {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });
    localStorage.removeItem('token'); // Удаляем токен из локального хранилища
    localStorage.removeItem('user'); // Remove user data from localStorage
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error logging out:', errorMessage);
    throw new Error(errorMessage);
  }
};
