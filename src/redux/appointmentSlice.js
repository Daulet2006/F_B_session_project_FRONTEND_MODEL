// src/redux/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/apiService';

export const fetchAppointmentsAsync = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token found');
      const response = await fetchAppointments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createAppointmentAsync = createAsyncThunk(
  'appointments/createAppointment',
  async (appointmentData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token found');
      const response = await createAppointment(appointmentData);
      toast.success('Запись успешно создана!');
      return response.data.appointment;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(`Ошибка создания записи: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const updateAppointmentAsync = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ appointmentId, updateData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token found');
      const response = await updateAppointment(appointmentId, updateData);
      toast.success('Запись успешно обновлена!');
      return { id: appointmentId, changes: response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(`Ошибка обновления записи: ${message}`);
      return rejectWithValue(message);
    }
  }
);

export const deleteAppointmentAsync = createAsyncThunk(
  'appointments/deleteAppointment',
  async (appointmentId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token found');
      await deleteAppointment(appointmentId);
      toast.success('Запись успешно удалена!');
      return appointmentId;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(`Ошибка удаления записи: ${message}`);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointmentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAppointmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.changes };
        }
      })
      .addCase(updateAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAppointmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(app => app.id !== action.payload);
      })
      .addCase(deleteAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;