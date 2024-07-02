import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  inclusive: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the inclusive
export const fetchInclusive = createAsyncThunk(
  "fetchInclusive/inclusive",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`inclusives`, {
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

// TODO: create inclusive
export const createInclusive = createAsyncThunk(
  "createInclusive/inclusive",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`inclusives`, data);

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

// TODO: update inclusive
export const updateInclusive = createAsyncThunk(
  "updateInclusive/inclusive",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`inclusives/${id}`, data);

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

// TODO: delete inclusive
export const deleteInclusive = createAsyncThunk(
  "deleteInclusive/inclusive",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`inclusives/${id}`);
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

const inclusivelice = createSlice({
  name: "inclusive",
  initialState,
  extraReducers: (builder) => {
    // TODO: create inclusive
    builder.addCase(fetchInclusive.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchInclusive.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.inclusive = action.payload;
    });

    builder.addCase(fetchInclusive.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create inclusive
    builder.addCase(createInclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createInclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inclusive.data = [action.payload.data, ...state.inclusive.data];
      state.inclusive.meta.total = state.inclusive.meta.total + 1;
      action.payload.enqueueSnackbar("Inclusive is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createInclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update inclusive
    builder.addCase(updateInclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateInclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inclusive.data = state.inclusive.data.map((inclusive) => {
        if (inclusive.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return inclusive;
        }
      });
      action.payload.enqueueSnackbar("Inclusive is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateInclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete inclusive
    builder.addCase(deleteInclusive.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteInclusive.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inclusive.data = state.inclusive.data.filter(
        (inclusive) => inclusive.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Inclusive is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteInclusive.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default inclusivelice.reducer;
