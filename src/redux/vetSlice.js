// src/redux/vetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVets, createVet, updateVet, deleteVet } from '../services/apiService';

export const fetchVetsThunk = createAsyncThunk(
  'vets/fetchVets',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchVets(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addVetAsync = createAsyncThunk(
  'vets/addVetAsync',
  async (vetData, { rejectWithValue }) => {
    try {
      const response = await createVet(vetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateVetAsync = createAsyncThunk(
  'vets/updateVetAsync',
  async ({ id, vetData }, { rejectWithValue }) => {
    try {
      const response = await updateVet(id, vetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteVetAsync = createAsyncThunk(
  'vets/deleteVetAsync',
  async (id, { rejectWithValue }) => {
    try {
      await deleteVet(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const vetSlice = createSlice({
  name: 'vets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVetsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVetsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVetAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVetAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addVetAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVetAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVetAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateVetAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVetAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVetAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteVetAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vetSlice.reducer;