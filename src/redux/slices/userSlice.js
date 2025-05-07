// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api from "../../utils/api"

// Initial state
const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/users")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users")
  }
})

export const fetchUserById = createAsyncThunk("users/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user")
  }
})

export const createUser = createAsyncThunk("users/create", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/users", userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create user")
  }
})

export const updateUser = createAsyncThunk("users/update", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update user")
  }
})

export const deleteUser = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/users/${id}`)
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete user")
  }
})

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch users")
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch user")
      })

      // Create user
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
        toast.success("User created successfully!")
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to create user")
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex((u) => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
        state.user = action.payload
        toast.success("User updated successfully!")
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to update user")
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((u) => u.id !== action.payload)
        toast.success("User deleted successfully!")
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to delete user")
      })
  },
})

export const { clearUserState } = userSlice.actions

export default userSlice.reducer
