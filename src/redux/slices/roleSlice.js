import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  roles: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the roles
export const fetchRoles = createAsyncThunk(
  "fetchRoles/roles",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`auth/users/roles`, {
        params: {
          page: page + 1,
          limit,
        },
      });

      return {
        data: response.data.data.items,
        meta: {
          total: response.data.data.items.length,
        },
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create role
export const createRole = createAsyncThunk(
  "createRole/roles",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`acl/roles`, data);

      return {
        data: response.data.data,
        handleClose,
        enqueueSnackbar,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: update role
export const updateRole = createAsyncThunk(
  "updateRole/roles",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`acl/roles/${id}`, data);

      return {
        data: response.data.data,
        handleClose,
        enqueueSnackbar,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: delete role
export const deleteRole = createAsyncThunk(
  "deleteRole/roles",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`acl/roles/${id}`);
      return {
        data: id,
        handleClose,
        enqueueSnackbar,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    // TODO: create role
    builder.addCase(fetchRoles.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.roles = action.payload;
    });

    builder.addCase(fetchRoles.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create role
    builder.addCase(createRole.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roles.data = [action.payload.data, ...state.roles.data];
      state.roles.meta.total = state.roles.meta.total + 1;
      action.payload.enqueueSnackbar("Role is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createRole.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update role
    builder.addCase(updateRole.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roles.data = state.roles.data.map((role) => {
        if (role.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return role;
        }
      });
      action.payload.enqueueSnackbar("Role is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateRole.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete role
    builder.addCase(deleteRole.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roles.data = state.roles.data.filter(
        (role) => role.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Role is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteRole.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default roleSlice.reducer;
