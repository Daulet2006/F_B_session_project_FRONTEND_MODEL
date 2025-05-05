// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: savedUser ? savedUser.user : null,
    role: savedUser ? savedUser.role : null,
    token: savedToken ? savedToken : null, // Load token from localStorage
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token; // Save token to state
      localStorage.setItem('user', JSON.stringify({
        user: action.payload.user,
        role: action.payload.role
      }));
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null; // Clear token from state
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    changeRole: (state, action) => {
      // Обновляем роль пользователя (для демонстрации)
      state.role = action.payload;
      if (state.user) {
        state.user = { ...state.user, role: action.payload };
        localStorage.setItem('user', JSON.stringify({
          user: state.user,
          role: action.payload
        }));
      }
    },
  },
});

export const { login, logout, changeRole } = userSlice.actions;
export default userSlice.reducer;