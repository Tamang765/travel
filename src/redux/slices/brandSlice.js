import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  brands: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the brands
export const fetchBrands = createAsyncThunk(
  "fetchBrands/brands",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`brands`, {
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

// TODO: create brand
export const createBrand = createAsyncThunk(
  "createBrand/brands",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`brands`, data);

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

// TODO: update brand
export const updateBrand = createAsyncThunk(
  "updateBrand/brands",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`brands/${id}`, data);

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

// TODO: delete brand
export const deleteBrand = createAsyncThunk(
  "deleteBrand/brands",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`brands/${id}`);
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

const brandSlice = createSlice({
  name: "brand",
  initialState,
  extraReducers: (builder) => {
    // TODO: create brand
    builder.addCase(fetchBrands.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.brands = action.payload;
    });

    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create brand
    builder.addCase(createBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands.data = [action.payload.data, ...state.brands.data];
      state.brands.meta.total = state.brands.meta.total + 1;
      action.payload.enqueueSnackbar("Brand is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update brand
    builder.addCase(updateBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands.data = state.brands.data.map((brand) => {
        if (brand.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return brand;
        }
      });
      action.payload.enqueueSnackbar("Brand is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete brand
    builder.addCase(deleteBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands.data = state.brands.data.filter(
        (brand) => brand.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Brand is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default brandSlice.reducer;
