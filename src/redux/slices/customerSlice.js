import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  teams: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the customer
export const fetchCustomers = createAsyncThunk(
  "fetchCustomers/teams",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`users`, {
        params: {
          limit,
          page: page + 1,
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

const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    // TODO: fetch customer
    builder.addCase(fetchCustomers.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.teams = action.payload;
    });

    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.fetchLoading = false;
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default teamSlice.reducer;
