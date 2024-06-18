import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
};

// TODO: change profilePic
export const changeProfilePic = createAsyncThunk(
  "changeProfilePic/user",
  async ({ enqueueSnackbar, data, updateMe }, thunkApi) => {
    try {
      const response = await axiosInstance.post(
        `users/upload-profile-image`,
        data
      );

      updateMe(response.data.data);

      return {
        enqueueSnackbar,
        data: response.data,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: update profile
export const updateProfile = createAsyncThunk(
  "updateProfile/user",
  async ({ enqueueSnackbar, data, updateMe }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`users/update-profile`, data);

      updateMe(response.data.data);

      return {
        enqueueSnackbar,
        data: response.data,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // TODO: change pw
    builder.addCase(changeProfilePic.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(changeProfilePic.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar &&
        action.payload.enqueueSnackbar(
          "Profile picture is changed successfully",
          {
            vairant: "success",
          }
        );
    });

    builder.addCase(changeProfilePic.rejected, (state, action) => {
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

    // TODO: change profile
    builder.addCase(updateProfile.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar &&
        action.payload.enqueueSnackbar(
          "Personal informations are updated successfully",
          {
            vairant: "success",
          }
        );
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
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

export default userSlice.reducer;
