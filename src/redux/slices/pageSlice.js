import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  pages: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the pages
export const fetchPages = createAsyncThunk(
  "fetchPages/pages",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`pages`, {
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

// TODO: create page
export const createPage = createAsyncThunk(
  "createPage/pages",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`pages`, data);

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

// TODO: update page
export const updatePage = createAsyncThunk(
  "updatePage/pages",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`pages/${id}`, data);

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

// TODO: delete page
export const deletePage = createAsyncThunk(
  "deletePage/pages",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`pages/${id}`);
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

const pageslice = createSlice({
  name: "page",
  initialState,
  extraReducers: (builder) => {
    // TODO: create page
    builder.addCase(fetchPages.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchPages.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.pages = action.payload;
    });

    builder.addCase(fetchPages.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create page
    builder.addCase(createPage.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pages.data.data = [action.payload.data, ...state.pages.data.data];
      state.pages.meta.total = state.pages.meta.total + 1;
      action.payload.enqueueSnackbar("Page is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createPage.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update page
    builder.addCase(updatePage.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updatePage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pages.data.data = state.pages.data.data.map((page) => {
        if (page.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return page;
        }
      });
      action.payload.enqueueSnackbar("Page is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updatePage.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete page
    builder.addCase(deletePage.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deletePage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pages.data.data = state.pages.data.data.filter(
        (page) => page.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Page is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deletePage.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default pageslice.reducer;
