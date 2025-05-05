// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import animalReducer from './animalSlice';
import vetReducer from './vetSlice';
import orderReducer from './orderSlice';
import cartReducer from './cartSlice';
import appointmentReducer from './appointmentSlice';
import chatReducer from './chatSlice';
import permissionReducer from './permissionSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    animals: animalReducer,
    vets: vetReducer,
    orders: orderReducer,
    cart: cartReducer,
    appointments: appointmentReducer,
    chat: chatReducer,
    permissions: permissionReducer,
    users: userReducer,
  },
});

export default store;