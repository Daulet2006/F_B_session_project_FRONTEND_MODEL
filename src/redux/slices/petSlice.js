import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/api";

// Initial state
const initialState = {
  pets: [],
  pet: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPets = createAsyncThunk("pets/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/pets");
    return response.data;
  } catch (error) {
    console.error("fetchPets error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Не удалось загрузить питомцев");
  }
});

export const fetchPetById = createAsyncThunk("pets/fetchById", async (id, { rejectWithValue }) => {
  try {
    if (!id || id === "undefined") {
      throw new Error("Invalid pet ID");
    }
    const response = await api.get(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error("fetchPetById error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Не удалось загрузить питомца");
  }
});

export const createPet = createAsyncThunk("pets/create", async (petData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      if (key === "image" && petData[key] instanceof File) {
        formData.append(key, petData[key]);
      } else if (petData[key] !== undefined && petData[key] !== null) {
        formData.append(key, petData[key]);
      }
    });

    const response = await api.post("/pets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.pet; // Backend returns {message, pet}
  } catch (error) {
    console.error("createPet error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Не удалось создать питомца");
  }
});

export const updatePet = createAsyncThunk("pets/update", async ({ id, petData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("updatePet JWT Payload:", payload);
    }

    const formData = new FormData();
    Object.keys(petData).forEach((key) => {
      if (key === "image" && petData[key] instanceof File) {
        formData.append(key, petData[key]);
      } else if (petData[key] !== undefined && petData[key] !== null) {
        formData.append(key, petData[key]);
      }
    });

    const response = await api.put(`/pets/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.pet; // Backend returns {message, pet}
  } catch (error) {
    console.error("updatePet error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Не удалось обновить питомца");
  }
});

export const deletePet = createAsyncThunk("pets/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/pets/${id}`);
    return id;
  } catch (error) {
    console.error("deletePet error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data?.message || "Не удалось удалить питомца");
  }
});

// Pet slice
const petSlice = createSlice({
  initialState,
  name: "pets",
  reducers: {
    clearPetState: (state) => {
      state.pet = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all pets
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch pet by ID
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Create pet
      .addCase(createPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload); // Backend returns pet with id
        toast.success("Питомец успешно создан!");
      })
      .addCase(createPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update pet
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pets.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
        state.pet = action.payload;
        toast.success("Питомец успешно обновлён!");
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete pet
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter((p) => p.id !== action.payload);
        toast.success("Питомец успешно удалён!");
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearPetState } = petSlice.actions;

export default petSlice.reducer;