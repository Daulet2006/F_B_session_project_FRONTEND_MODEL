// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, getCurrentUser } from '../../services/authAPI';

// Async login thunk
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });
      const user = await getCurrentUser();
      return { access_token: data.access_token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Parse the user inf,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;