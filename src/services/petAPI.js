import axios from "axios";
import API_URL from "./localhostAPI";

// Добавление питомца (для seller)
export const addPet = async (petData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(API_URL('pets'), petData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error.response?.data || error.message);
    throw error;
  }
};

// Получение всех питомцев
export const getPets = async () => {
  try {
    const response = await axios.get(API_URL('pets'));
    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error.response?.data || error.message);
    throw error;
  }
};

// Получение питомца по ID
export const getPetById = async (petId) => {
  try {
    const response = await axios.get(API_URL(`pets/${petId}`));
    return response.data;
  } catch (error) {
    console.error("Error fetching pet by ID:", error.response?.data || error.message);
    throw error;
  }
};

// Обновление питомца (для seller/admin)
export const updatePet = async (petId, petData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(API_URL(`pets/${petId}`), petData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating pet:", error.response?.data || error.message);
    throw error;
  }
};

// Удаление питомца (для seller/admin)
export const deletePet = async (petId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.delete(API_URL(`pets/${petId}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting pet:", error.response?.data || error.message);
    throw error;
  }
};

// Покупка питомца (для customer)
export const buyPet = async (petId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(API_URL(`pets/buy/${petId}`), {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error buying pet:", error.response?.data || error.message);
    throw error;
  }
};
