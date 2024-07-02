import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  exclusive: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the exclusive
export const fetchExclusive = createAsyncThunk(
  "fetchExclusive/exclusive",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`exclusives`, {
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

// TODO: create exclusive
export const createExclusive = createAsyncThunk(
  "createExclusive/exclusive",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`exclusives`, data);

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

// TODO: update exclusive
export const updateExclusive = createAsyncThunk(
  "updateExclusive/exclusive",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`exclusives/${id}`, data);

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

// TODO: delete exclusive
export const deleteExclusive = createAsyncThunk(
  "deleteExclusive/exclusive",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`exclusives/${id}`);
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

const exclusiveslice = createSlice({
  name: "exclusive",
  initialState,
  extraReducers: (builder) => {
    // TODO: create exclusive
    builder.addCase(fetchExclusive.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchExclusive.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.exclusive = action.payload;
    });

    builder.addCase(fetchExclusive.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create exclusive
    builder.addCase(createExclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createExclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exclusive.data = [action.payload.data, ...state.exclusive.data];
      state.exclusive.meta.total = state.exclusive.meta.total + 1;
      action.payload.enqueueSnackbar("Exclusive is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createExclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update exclusive
    builder.addCase(updateExclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateExclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exclusive.data = state.exclusive.data.map((exclusive) => {
        if (exclusive.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return exclusive;
        }
      });
      action.payload.enqueueSnackbar("Exclusive is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateExclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete exclusive
    builder.addCase(deleteExclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteExclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.exclusive.data = state.exclusive.data.filter(
        (exclusive) => exclusive.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Exclusive is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteExclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default exclusiveslice.reducer;
