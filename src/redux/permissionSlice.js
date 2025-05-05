// src/redux/permissionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserPermissions } from '../services/apiService'; // Ensure this function uses the correct endpoint '/api/user/permissions'
import { ROLE_SECTIONS, ROLE_ACTIONS } from '../constants/ROLE_PERMISSIONS';

export const fetchUserPermissionsThunk = createAsyncThunk(
  'permissions/fetchUserPermissions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.token) return null; // No token, no permissions to fetch

      try {
        // Call the corrected API service function
        const response = await fetchUserPermissions();
        // Assuming the backend returns permissions directly under response.data
        // Adjust if the backend structure is different (e.g., response.data.permissions)
        return response.data; 
      } catch (apiError) {
        // Fallback to local permissions if API fails
        console.warn('API fetch failed, falling back to local permissions based on user role:', apiError);
        if (auth.user && auth.user.role) {
          return {
            interface_sections: ROLE_SECTIONS[auth.user.role] || [],
            actions: ROLE_ACTIONS[auth.user.role] || []
          };
        }
      }

      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  interface_sections: [],
  actions: [],
  loading: false,
  error: null
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.interface_sections = [];
      state.actions = [];
      state.error = null;
    },
    setPermissions: (state, action) => {
      state.interface_sections = action.payload.interface_sections || [];
      state.actions = action.payload.actions || [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermissionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPermissionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // Ensure payload structure matches what the API (or fallback) provides
          state.interface_sections = action.payload.interface_sections || [];
          state.actions = action.payload.actions || [];
        } else {
          state.interface_sections = [];
          state.actions = [];
        }
      })
      .addCase(fetchUserPermissionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearPermissions, setPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;

export const selectPermissions = (state) => state.permissions;
export const selectInterfaceSections = (state) => state.permissions.interface_sections;
export const selectActions = (state) => state.permissions.actions;

export const selectCanAccessSection = (state, section) => {
  if (!state.auth.user) {
    return ['products', 'pets'].includes(section);
  }
  return state.permissions.interface_sections.includes(section);
};

export const selectCanPerformAction = (state, action) => {
  if (!state.auth.user) {
    return ['view_products', 'view_pets'].includes(action);
  }
  return state.permissions.actions.includes(action);
};

export const selectCanAccessSectionAndPerformAction = (state, section, action) => {
  return selectCanAccessSection(state, section) && selectCanPerformAction(state, action);
};

export const selectAvailableSections = (state) => {
  const { user } = state.auth;
  if (!user) return ['products', 'pets'];
  return user.role && ROLE_SECTIONS[user.role] ? ROLE_SECTIONS[user.role] : [];
};

export const selectAvailableActions = (state) => {
  const { user } = state.auth;
  if (!user) return ['view_products', 'view_pets'];
  return user.role && ROLE_ACTIONS[user.role] ? ROLE_ACTIONS[user.role] : [];
};
