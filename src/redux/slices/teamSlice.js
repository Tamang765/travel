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

// TODO: fetch all the team members
export const fetchTeamMembers = createAsyncThunk(
  "fetchTeamMembers/teams",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
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

// TODO: create the team members
export const createTeamMembers = createAsyncThunk(
  "createTeamMembers/teams",
  async ({ enqueueSnackbar, data, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`users/register`, data);
      return {
        data: response.data.data,
        meta: {
          total: response.data.data.length,
        },
        handleClose,
        enqueueSnackbar,
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
    // TODO: fetch team members
    builder.addCase(fetchTeamMembers.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchTeamMembers.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.teams = action.payload;
    });

    builder.addCase(fetchTeamMembers.rejected, (state, action) => {
      state.fetchLoading = false;
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create team member
    builder.addCase(createTeamMembers.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createTeamMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams.data = [action.payload, ...state.teams.data];
      action.payload.enqueueSnackbar("Team member is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createTeamMembers.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default teamSlice.reducer;
