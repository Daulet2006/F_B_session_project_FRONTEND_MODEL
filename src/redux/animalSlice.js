// src/redux/animalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPets, createPet, updatePet, deletePet } from '../services/apiService';

export const fetchAnimalsThunk = createAsyncThunk(
  'animals/fetchAnimals',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchPets(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addAnimalAsync = createAsyncThunk(
  'animals/addAnimalAsync',
  async (newAnimal, { rejectWithValue }) => {
    try {
      const response = await createPet(newAnimal);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAnimalAsync = createAsyncThunk(
  'animals/updateAnimalAsync',
  async ({ id, ...animal }, { rejectWithValue }) => {
    try {
      const response = await updatePet(id, animal);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAnimalAsync = createAsyncThunk(
  'animals/deleteAnimalAsync',
  async (id, { rejectWithValue }) => {
    try {
      await deletePet(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const animalSlice = createSlice({
  name: 'animals',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimalsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAnimalsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAnimalAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAnimalAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteAnimalAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export const { setLoading, setError } = animalSlice.actions;
export default animalSlice.reducer;