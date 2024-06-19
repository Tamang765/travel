import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  userTypes: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the userTypes
export const fetchUserTypes = createAsyncThunk(
  "fetchUserTypes/userTypes",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`users/types`, {
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

// TODO: create userType
export const createUserType = createAsyncThunk(
  "createUserType/userTypes",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`users/types`, data);

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

// TODO: update userType
export const updateUserType = createAsyncThunk(
  "updateUserType/userTypes",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`users/types/${id}`, data);

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

// TODO: delete userType
export const deleteUserType = createAsyncThunk(
  "deleteUserType/userTypes",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`users/types/${id}`);
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

const userTypeslice = createSlice({
  name: "userType",
  initialState,
  extraReducers: (builder) => {
    // TODO: create userType
    builder.addCase(fetchUserTypes.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchUserTypes.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.userTypes = action.payload;
    });

    builder.addCase(fetchUserTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create userType
    builder.addCase(createUserType.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createUserType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userTypes.data = [action.payload.data, ...state.userTypes.data];
      state.userTypes.meta.total = state.userTypes.meta.total + 1;
      action.payload.enqueueSnackbar("UserType is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createUserType.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update userType
    builder.addCase(updateUserType.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateUserType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userTypes.data = state.userTypes.data.map((userType) => {
        if (userType.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return userType;
        }
      });
      action.payload.enqueueSnackbar("UserType is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateUserType.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete userType
    builder.addCase(deleteUserType.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteUserType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userTypes.data = state.userTypes.data.filter(
        (userType) => userType.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("UserType is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteUserType.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default userTypeslice.reducer;
