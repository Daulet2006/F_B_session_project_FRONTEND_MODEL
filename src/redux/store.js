import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import petReducer from "./slices/petSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice";
import appointmentReducer from "./slices/appointmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    pets: petReducer,
    categories: categoryReducer,
    orders: orderReducer,
    chat: chatReducer,
    users: userReducer,
    appointments: appointmentReducer,
  },
});

export default store;