import axios from "axios";

const API_URL = "http://127.0.0.1:5000/products"; // URL вашего Flask API

// Получение всех продуктов
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Фильтрация продуктов по имени
export const filterProducts = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error filtering products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Добавление нового продукта (для seller)
export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(API_URL, productData, {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Обновление продукта (для seller или admin)
export const updateProduct = async (productId, productData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.put(`${API_URL}/${productId}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Удаление продукта (для seller или admin)
export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.delete(`${API_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Покупка продукта (для customer)
export const buyProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      `${API_URL}/buy/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error buying product:",
      error.response?.data || error.message
    );
    throw error;
  }
};
