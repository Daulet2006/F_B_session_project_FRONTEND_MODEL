import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../services/authAPI'; // Импортируем API запрос

// Асинхронный экшен для логина
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });
      return data; // Возвращаем данные от API
    } catch (error) {
      return rejectWithValue(error.message); // Если ошибка, возвращаем сообщение об ошибке
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || null, // Получаем токен из localStorage при старте
  user: null,
  isAuthenticated: false,
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
        state.error = action.payload; // Устанавливаем ошибку при отказе
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
