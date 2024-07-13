import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  pricing: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the pricing
export const fetchPricing = createAsyncThunk(
  "fetchPricing/pricing",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`pricings`, {
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

// TODO: create pricing
export const createPricing = createAsyncThunk(
  "createPricing/pricing",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`pricings`, data);

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

// TODO: update pricing
export const updatePricing = createAsyncThunk(
  "updatePricing/pricing",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`pricings/${id}`, data);

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

// TODO: delete pricing
export const deletePricing = createAsyncThunk(
  "deletePricing/pricing",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`pricings/${id}`);
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

const pricinglice = createSlice({
  name: "pricing",
  initialState,
  extraReducers: (builder) => {
    // TODO: create pricing
    builder.addCase(fetchPricing.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchPricing.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.pricing = action.payload;
    });

    builder.addCase(fetchPricing.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create pricing
    builder.addCase(createPricing.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createPricing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pricing.data = [
        action.payload.data,
        ...state.pricing.data,
      ];
      state.pricing.meta.total = state.pricing.meta.total + 1;
      action.payload.enqueueSnackbar("Pricing is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createPricing.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update pricing
    builder.addCase(updatePricing.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updatePricing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pricing.data = state.pricing.data.map((pricing) => {
        if (pricing.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return pricing;
        }
      });
      action.payload.enqueueSnackbar("Pricing is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updatePricing.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete pricing
    builder.addCase(deletePricing.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deletePricing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pricing.data = state.pricing.data.filter(
        (pricing) => pricing.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Pricing is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deletePricing.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default pricinglice.reducer;
