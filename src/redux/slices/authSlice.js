import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
};

// TODO: change password
export const changePassword = createAsyncThunk(
  "changePassword/auth",
  async ({ enqueueSnackbar, data, reset }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`change-password`, data);

      return {
        enqueueSnackbar,
        data: response.data,
        reset,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

const authlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // TODO: change pw
    builder.addCase(changePassword.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.reset && action.payload.reset();
      action.payload.enqueueSnackbar &&
        action.payload.enqueueSnackbar("Password is changed successfully");
    });

    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar &&
        action.payload.enqueueSnackbar(
          JSON.stringify(
            action.payload.error ||
              action.payload.error.errors ||
              action.payload.error.message
          ),
          {
            variant: "error",
          }
        );
    });
  },
});

export default authlice.reducer;
