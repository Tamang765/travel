import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  faqs: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the faqs
export const fetchFaqs = createAsyncThunk(
  "fetchFaqs/faqs",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`faq`, {
        page: page + 1,
        limit,
      });

      return {
        data: response.data.data.items,
        meta: {
          total: response.data.data.items.length,
        },
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: create faq
export const createFaq = createAsyncThunk(
  "createFaq/faqs",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`faq`, data);

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

// TODO: update faq
export const updateFaq = createAsyncThunk(
  "updateFaq/faqs",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`faq/${id}`, data);

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

// TODO: delete faq
export const deleteFaq = createAsyncThunk(
  "deleteFaq/faqs",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`faq/${id}`);
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

const faqslice = createSlice({
  name: "faq",
  initialState,
  extraReducers: (builder) => {
    // TODO: create faq
    builder.addCase(fetchFaqs.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchFaqs.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.faqs = action.payload;
    });

    builder.addCase(fetchFaqs.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create faq
    builder.addCase(createFaq.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createFaq.fulfilled, (state, action) => {
      state.isLoading = false;
      state.faqs.data = [action.payload.data, ...state.faqs.data];
      state.faqs.meta.total = state.faqs.meta.total + 1;
      action.payload.enqueueSnackbar("FAQ is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createFaq.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update faq
    builder.addCase(updateFaq.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateFaq.fulfilled, (state, action) => {
      state.isLoading = false;
      state.faqs.data = state.faqs.data.map((faq) => {
        if (faq.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return faq;
        }
      });
      action.payload.enqueueSnackbar("FAQ is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateFaq.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete faq
    builder.addCase(deleteFaq.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      state.isLoading = false;
      state.faqs.data = state.faqs.data.filter(
        (faq) => faq.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("FAQ is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteFaq.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default faqslice.reducer;
