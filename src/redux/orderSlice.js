// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createOrder, fetchOrders, fetchOrderById, updateOrderStatus, deleteOrder } from '../services/apiService';

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      toast.success(response.data.message || 'Заказ успешно создан!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create order';
      toast.error(`Ошибка создания заказа: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchOrders(params);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch orders';
      return rejectWithValue(message);
    }
  }
);

export const fetchOrderByIdAsync = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetchOrderById(orderId);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch order';
      return rejectWithValue(message);
    }
  }
);

export const updateOrderStatusAsync = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      toast.success('Статус заказа успешно обновлен!');
      return { orderId, status: response.data.status || status };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update order status';
      toast.error(`Ошибка обновления статуса: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await deleteOrder(orderId);
      toast.success('Заказ успешно удален!');
      return orderId;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete order';
      toast.error(`Ошибка удаления заказа: ${message}`);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const index = state.items.findIndex(order => order.id === orderId);
        if (index !== -1) {
          state.items[index].status = status;
        }
        if (state.currentOrder && state.currentOrder.id === orderId) {
          state.currentOrder.status = status;
        }
      })
      .addCase(updateOrderStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(order => order.id !== action.payload);
        if (state.currentOrder && state.currentOrder.id === action.payload) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;