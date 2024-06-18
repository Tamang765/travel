import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  sizes: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the sizes
export const fetchSizes = createAsyncThunk(
  "fetchSizes/sizes",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`sizes`, {
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

// TODO: create size
export const createSize = createAsyncThunk(
  "createSize/sizes",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`sizes`, data);

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

// TODO: update size
export const updateSize = createAsyncThunk(
  "updateSize/sizes",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`sizes/${id}`, data);

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

// TODO: delete size
export const deleteSize = createAsyncThunk(
  "deleteSize/sizes",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`sizes/${id}`);
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

const sizeSlice = createSlice({
  name: "size",
  initialState,
  extraReducers: (builder) => {
    // TODO: create size
    builder.addCase(fetchSizes.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchSizes.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.sizes = action.payload;
    });

    builder.addCase(fetchSizes.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create size
    builder.addCase(createSize.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createSize.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sizes.data = [action.payload.data, ...state.sizes.data];
      state.sizes.meta.total = state.sizes.meta.total + 1;
      action.payload.enqueueSnackbar("Size is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createSize.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update size
    builder.addCase(updateSize.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateSize.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sizes.data = state.sizes.data.map((size) => {
        if (size.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return size;
        }
      });
      action.payload.enqueueSnackbar("Size is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateSize.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete size
    builder.addCase(deleteSize.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteSize.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sizes.data = state.sizes.data.filter(
        (size) => size.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Size is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteSize.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default sizeSlice.reducer;
