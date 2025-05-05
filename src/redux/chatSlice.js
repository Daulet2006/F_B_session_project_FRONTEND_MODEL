// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChatHistory, sendMessage } from '../services/apiService';

export const fetchChatHistoryThunk = createAsyncThunk(
  'chat/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchChatHistory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить историю чата');
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, file }, { rejectWithValue }) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('message', message);
        formData.append('file', file);
        const response = await sendMessage(formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await sendMessage({ message });
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Не удалось отправить сообщение');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
    sendingMessage: false,
    sendError: null
  },
  reducers: {
    clearChatErrors: (state) => {
      state.error = null;
      state.sendError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessageThunk.pending, (state) => {
        state.sendingMessage = true;
        state.sendError = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.sendingMessage = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.sendingMessage = false;
        state.sendError = action.payload;
      });
  },
});

export const { clearChatErrors } = chatSlice.actions;
export default chatSlice.reducer;