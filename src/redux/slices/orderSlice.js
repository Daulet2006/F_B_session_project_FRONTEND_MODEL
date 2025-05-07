// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api from "../../utils/api"

// Initial state
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchOrders = createAsyncThunk("orders/fetchAll", async (_, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState()
    let url = "/orders"

    // If user is a client, only fetch their orders
    if (auth.user.role === "client") {
      url = `/orders?userId=${auth.user.id}`
    }

    const response = await api.get(url)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch orders")
  }
})

export const fetchOrderById = createAsyncThunk("orders/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/orders/${id}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch order")
  }
})

export const createOrder = createAsyncThunk("orders/create", async (orderData, { rejectWithValue }) => {
  try {
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create order")
  }
})

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/orders/${id}`, { status })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order status")
    }
  },
)

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.order = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch orders")
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch order")
      })

      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
        toast.success("Order created successfully!")
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to create order")
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const index = state.orders.findIndex((o) => o.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        state.order = action.payload
        toast.success("Order status updated successfully!")
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to update order status")
      })
  },
})

export const { clearOrderState } = orderSlice.actions

export default orderSlice.reducer
