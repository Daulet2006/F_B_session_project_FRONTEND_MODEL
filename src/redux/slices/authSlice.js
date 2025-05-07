// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api from "../../utils/api"

// Check if user is already logged in from localStorage
const checkLocalStorage = () => {
  const user = localStorage.getItem("user")
  const token = localStorage.getItem("token")

  if (user && token) {
    return { user: JSON.parse(user), token }
  }

  return { user: null, token: null }
}

const { user, token } = checkLocalStorage()

// Initial state
const initialState = {
  user: user,
  token: token,
  isAuthenticated: !!token,
  loading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials)

    // Store in localStorage
    localStorage.setItem("token", response.data.access_token)
    localStorage.setItem("user", JSON.stringify(response.data.user))

    return {
      token: response.data.access_token,
      user: response.data.user
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed")
  }
})

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/register", userData)

    // Store in localStorage
    localStorage.setItem("token", response.data.access_token)
    localStorage.setItem("user", JSON.stringify(response.data.user))

    return {
      token: response.data.access_token,
      user: response.data.user
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed")
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  // Clear localStorage
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  return null
})

export const checkAuth = createAsyncThunk("auth/check", async (_, { getState }) => {
  const { auth } = getState()

  if (auth.token) {
    // In a real app, you would validate the token with the server
    return { user: auth.user, token: auth.token }
  }

  return null
})

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        toast.success("Login successful!")
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Login failed")
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        toast.success("Registration successful!")
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Registration failed")
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        toast.info("Logged out successfully")
      })

      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isAuthenticated = true
        } else {
          state.user = null
          state.token = null
          state.isAuthenticated = false
        }
      })
  },
})

export default authSlice.reducer