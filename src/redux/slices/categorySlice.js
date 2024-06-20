import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  fetchSubCategoryLoading: false,
  categories: {
    data: [],
    meta: {
      total: 0,
    },
  },

  filteredCategories: {
    data: [],
    meta: {
      total: 0,
    },
  },

  subCategories: {
    data: [],
    meta: {
      total: 0,
    },
  },

  mainCategories: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the categories
export const fetchCategories = createAsyncThunk(
  "fetchCategories/categories",
  async ({ enqueueSnackbar, limit, page = 0, search }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`categories`, {
        params: {
          page: page + 1,
          limit,
          ...(search !== "" && {
            search,
          }),
          // parent: false,
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

// TODO: fetch all main categories
export const fetchMainCategories = createAsyncThunk(
  "fetchMainCategories/categories",
  async ({ enqueueSnackbar, limit = 50, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`categories`, {
        params: {
          page: page + 1,
          limit,
          parent: false,
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

// / TODO: fetch all filtered categories
export const fetchFilteredCategories = createAsyncThunk(
  "fetchFilteredCategories/categories",
  async ({ enqueueSnackbar, limit, page = 0, parent_id, search }, thunkApi) => {
    console.log(parent_id, "parent ");
    try {
      const response = await axiosInstance.get(`categories`, {
        params: {
          page: page + 1,
          limit,
          parent_id,
          ...(search !== "" && {
            search,
          }),
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

// / TODO: fetch all sub categories
export const fetchSubCategories = createAsyncThunk(
  "fetchSubCategories/categories",
  async ({ enqueueSnackbar, limit, page = 0, parent_id }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`categories`, {
        params: {
          page: page + 1,
          limit,
          parent_id,
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

// TODO: create category
export const createCategory = createAsyncThunk(
  "createCategory/categories",
  async (
    { data, enqueueSnackbar, handleClose, activeTab, setActiveTab },
    thunkApi
  ) => {
    try {
      const response = await axiosInstance.post(`categories`, data);

      return {
        data: response.data.data,
        handleClose,
        enqueueSnackbar,
        activeTab,
        setActiveTab,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: update category
export const updateCategory = createAsyncThunk(
  "updateCategory/categories",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`categories/${id}`, data);

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

// TODO: delete category
export const deleteCategory = createAsyncThunk(
  "deleteCategory/categories",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`categories/${id}`);
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    // TODO: get category
    builder.addCase(fetchCategories.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: get main category
    builder.addCase(fetchMainCategories.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchMainCategories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.mainCategories = action.payload;
    });

    builder.addCase(fetchMainCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: filtered category
    builder.addCase(fetchFilteredCategories.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchFilteredCategories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.filteredCategories = action.payload;
    });

    builder.addCase(fetchFilteredCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: sub category
    builder.addCase(fetchSubCategories.pending, (state, _) => {
      state.fetchSubCategoryLoading = true;
    });

    builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
      state.fetchSubCategoryLoading = false;
      state.subCategories = action.payload;
    });

    builder.addCase(fetchSubCategories.rejected, (state, action) => {
      state.fetchSubCategoryLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create category
    builder.addCase(createCategory.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.activeTab === "all") {
        state.categories.data = [action.payload.data, ...state.categories.data];
      } else {
        state.filteredCategories.data = [
          action.payload.data,
          ...state.filteredCategories.data,
        ];
      }
      state.categories.meta.total = state.categories.meta.total + 1;
      action.payload.enqueueSnackbar("Category is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
      action.payload.setActiveTab(action.payload.activeTab);
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update category
    builder.addCase(updateCategory.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories.data = state.categories.data.map((category) => {
        if (category.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return category;
        }
      });
      action.payload.enqueueSnackbar("Category is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete category
    builder.addCase(deleteCategory.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories.data = state.categories.data.filter(
        (category) => category.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Category is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default categorySlice.reducer;
