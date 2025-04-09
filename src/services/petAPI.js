import axios from "axios";

const API_URL = "http://127.0.0.1:5000/pets"; // URL вашего Flask API

// Функция для добавления питомца (для роли seller)
export const addPet = async (petData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(`${API_URL}/`, petData, {
      headers: {
        Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error.response?.data || error.message);
    throw error;
  }
};

// Функция для покупки питомца (для роли customer)
export const buyPet = async (petId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(
      `${API_URL}/buy/${petId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error buying pet:", error.response?.data || error.message);
    throw error;
  }
};
