// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers, updateUserRole } from '../services/apiService';

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserRoleAsync = createAsyncThunk(
  'users/updateUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await updateUserRole(id, role);
      return response.data;
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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRoleAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateUserRoleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;