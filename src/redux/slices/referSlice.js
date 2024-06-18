import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  refer: null,
};

// TODO: fetch all the refer
export const fetchRefer = createAsyncThunk(
  "fetchRefer/refer",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`settings`, {
        params: {
          page: page + 1,
          limit,
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create refer
export const createRefer = createAsyncThunk(
  "createRefer/refer",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`settings/${id}`, data);

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

// TODO: update refer
export const updateRefer = createAsyncThunk(
  "updateRefer/refer",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`settings/${id}`, data);

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

// TODO: delete refer
export const deleteRefer = createAsyncThunk(
  "deleteRefer/refer",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`settings/${id}`);
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

const referlice = createSlice({
  name: "refer",
  initialState,
  extraReducers: (builder) => {
    // TODO: create refer
    builder.addCase(fetchRefer.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchRefer.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.refer = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchRefer.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create refer
    builder.addCase(createRefer.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createRefer.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar("Setting is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createRefer.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update refer
    builder.addCase(updateRefer.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateRefer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.refer.data = state.refer.data.map((refer) => {
        if (refer.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return refer;
        }
      });
      action.payload.enqueueSnackbar("REFER is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateRefer.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete refer
    builder.addCase(deleteRefer.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteRefer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.refer.data = state.refer.data.filter(
        (refer) => refer.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("REFER is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteRefer.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default referlice.reducer;
