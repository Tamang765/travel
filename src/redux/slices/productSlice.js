import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  products: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the products
export const fetchProducts = createAsyncThunk(
  "fetchProducts/products",
  async (
    { enqueueSnackbar, limit, page = 0, filter, search, tabFilter },
    thunkApi
  ) => {
    console.log(filter, "filter");
    try {
      const response = await axiosInstance.get(`products`, {
        params: {
          page: page + 1,
          limit,
          ...(filter &&
            filter.category_id && {
              category_id: filter.category_id,
            }),

          ...(filter &&
            filter.brand_id && {
              brand_id: filter.brand_id,
            }),

          ...(filter &&
            (filter.status === 1
              ? {
                  status: 1,
                }
              : filter.status === 0
              ? {
                  status: 0,
                }
              : null)),

          ...(search !== "" && {
            search,
          }),

          ...(tabFilter && tabFilter === "trending"
            ? {
                trending: 1,
              }
            : tabFilter === "featured"
            ? {
                featured: 1,
              }
            : tabFilter === "new"
            ? { new: 1 }
            : null),
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

// TODO: create product
export const createProduct = createAsyncThunk(
  "createProduct/products",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`products`, data);

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

// TODO: update product
export const updateProduct = createAsyncThunk(
  "updateProduct/products",
  async ({ data, enqueueSnackbar, handleClose, id, setRefresh }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`products/${id}`, data);

      return {
        data: response.data.data,
        handleClose,
        enqueueSnackbar,
        setRefresh,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: update productStatus
export const updateProductStatus = createAsyncThunk(
  "updateProductStatus/products",
  async ({ data, enqueueSnackbar, slug }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`update-status/${slug}`, data);

      return {
        data: response.data.data,
        enqueueSnackbar,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct/products",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`products/${id}`);
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

const productslice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // TODO: create product
    builder.addCase(fetchProducts.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create product
    builder.addCase(createProduct.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.data = [action.payload.data, ...state.products.data];
      state.products.meta.total = state.products.meta.total + 1;
      action.payload.enqueueSnackbar("Product is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update product status
    builder.addCase(updateProductStatus.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateProductStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.data = state.products.data.map((product) => {
        if (product.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return product;
        }
      });
      action.payload.enqueueSnackbar("Product is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateProductStatus.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update product
    builder.addCase(updateProduct.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.data = state.products.data.map((product) => {
        if (product.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return product;
        }
      });
      action.payload.enqueueSnackbar("Product is updated successfully.", {
        variant: "success",
      });
      action.payload.setRefresh && action.payload.setRefresh((prev) => !prev);
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete product
    builder.addCase(deleteProduct.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.data = state.products.data.filter(
        (product) => product.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Product is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default productslice.reducer;
