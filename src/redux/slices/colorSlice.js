import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  colors: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the colors
export const fetchColors = createAsyncThunk(
  "fetchColors/colors",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    console.log(limit, page);
    try {
      const response = await axiosInstance.get(`colors`, {
        params: {
          page: page + 1,
          limit,
        },
      });

      return {
        data: response.data.data.data,
        meta: {
          total: response.data.data.total,
        },
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create color
export const createColor = createAsyncThunk(
  "createColor/colors",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`colors`, data);

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

// TODO: update color
export const updateColor = createAsyncThunk(
  "updateColor/colors",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`colors/${id}`, data);

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

// TODO: delete color
export const deleteColor = createAsyncThunk(
  "deleteColor/colors",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`colors/${id}`);
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

const colorSlice = createSlice({
  name: "color",
  initialState,
  extraReducers: (builder) => {
    // TODO: create color
    builder.addCase(fetchColors.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.colors = action.payload;
    });

    builder.addCase(fetchColors.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar &&
        action.payload.enqueueSnackbar(action.payload.error.message, {
          variant: "error",
        });
    });

    // TODO: create color
    builder.addCase(createColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.colors.data = [action.payload.data, ...state.colors.data];
      state.colors.meta.total = state.colors.meta.total + 1;
      action.payload.enqueueSnackbar("Color is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update color
    builder.addCase(updateColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.colors.data = state.colors.data.map((color) => {
        if (color.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return color;
        }
      });
      action.payload.enqueueSnackbar("Color is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete color
    builder.addCase(deleteColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.colors.data = state.colors.data.filter(
        (color) => color.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Color is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default colorSlice.reducer;
