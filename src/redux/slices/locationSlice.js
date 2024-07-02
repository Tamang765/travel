import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  location: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the location
export const fetchLocation = createAsyncThunk(
  "fetchLocation/location",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`locations`, {
        params: {
          page: page + 1,
          limit,
        },
      });

      return {
        data: response.data.data,
        meta: {
          total: response.data.data.length,
        },
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create location
export const createLocation = createAsyncThunk(
  "createLocation/location",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`locations`, data);

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

// TODO: update location
export const updateLocation = createAsyncThunk(
  "updateLocation/location",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`locations/${id}`, data);

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

// TODO: delete location
export const deleteLocation = createAsyncThunk(
  "deleteLocation/location",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`locations/${id}`);
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

const locationslice = createSlice({
  name: "location",
  initialState,
  extraReducers: (builder) => {
    // TODO: create location
    builder.addCase(fetchLocation.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.location = action.payload;
    });

    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create location
    builder.addCase(createLocation.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location.data = [action.payload.data, ...state.location.data];
      state.location.meta.total = state.location.meta.total + 1;
      action.payload.enqueueSnackbar("Location is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createLocation.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update location
    builder.addCase(updateLocation.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location.data = state.location.data.map((location) => {
        if (location.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return location;
        }
      });
      action.payload.enqueueSnackbar("Location is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateLocation.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete location
    builder.addCase(deleteLocation.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location.data = state.location.data.filter(
        (location) => location.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Location is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteLocation.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default locationslice.reducer;
