import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  packages: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the packages
export const fetchPackages = createAsyncThunk(
  "fetchPackages/packages",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`packages`, {
        params: {
          page: page + 1,
          limit,
        },
      });
      return {
        data: response.data.data,
        meta: {
          total: response.data.data.total,
        },
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create packages
export const createPackages = createAsyncThunk(
  "createPackages/packages",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`packages`, data);

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

// TODO: update packages
export const updatePackages = createAsyncThunk(
  "updatePackages/packages",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`packages/${id}`, data);

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

// TODO: delete packages
export const deletePackages = createAsyncThunk(
  "deletePackages/packages",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`packages/${id}`);
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

const packageslice = createSlice({
  name: "packages",
  initialState,
  extraReducers: (builder) => {
    // TODO: create packages
    builder.addCase(fetchPackages.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchPackages.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.packages = action.payload;
    });

    builder.addCase(fetchPackages.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create packages
    builder.addCase(createPackages.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createPackages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages.data.data = [
        action.payload.data,
        ...state.packages.data.data,
      ];
      state.packages.meta.total = state.packages.meta.total + 1;
      action.payload.enqueueSnackbar("Packages is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createPackages.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update packages
    builder.addCase(updatePackages.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updatePackages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages.data.data = state.packages.data.data.map((packages) => {
        if (packages.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return packages;
        }
      });
      action.payload.enqueueSnackbar("Packages is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updatePackages.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete packages
    builder.addCase(deletePackages.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deletePackages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.packages.data.data = state.packages.data.data.filter(
        (packages) => packages.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Packages is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deletePackages.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default packageslice.reducer;
