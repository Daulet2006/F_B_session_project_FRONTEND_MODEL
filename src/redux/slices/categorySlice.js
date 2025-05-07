// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import api from "../../utils/api"

// Initial state
const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
}

// Async thunks
export const fetchCategories = createAsyncThunk("categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/categories")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch categories")
  }
})

export const fetchCategoryById = createAsyncThunk("categories/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch category")
  }
})

export const createCategory = createAsyncThunk("categories/create", async (categoryData, { rejectWithValue }) => {
  try {
    const response = await api.post("/categories", categoryData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create category")
  }
})

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category")
    }
  },
)

export const deleteCategory = createAsyncThunk("categories/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/categories/${id}`)
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete category")
  }
})

// Category slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.category = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch categories")
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.category = action.payload
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to fetch category")
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories.push(action.payload)
        toast.success("Category created successfully!")
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to create category")
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        const index = state.categories.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.categories[index] = action.payload
        }
        state.category = action.payload
        toast.success("Category updated successfully!")
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to update category")
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categories = state.categories.filter((c) => c.id !== action.payload)
        toast.success("Category deleted successfully!")
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to delete category")
      })
  },
})

export const { clearCategoryState } = categorySlice.actions

export default categorySlice.reducer
