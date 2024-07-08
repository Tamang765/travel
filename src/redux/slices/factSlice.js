import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  facts: {
    data: [],
    meta: {
      total: 0,
    },
  },

  mainFacts: [],
};

// TODO: fetch all the facts
export const fetchFacts = createAsyncThunk(
  "fetchFacts/facts",
  async ({ enqueueSnackbar, search }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`facts`, {
        params: {
          ...(search !== "" && {
            search,
          }),
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

// TODO: create fact
export const createFact = createAsyncThunk(
  "createFact/facts",
  async (
    { data, enqueueSnackbar, handleClose, activeTab, setActiveTab },
    thunkApi
  ) => {
    try {
      const response = await axiosInstance.post(`facts`, data);
      handleClose();

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

// TODO: update fact
export const updateFact = createAsyncThunk(
  "updateFact/facts",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`facts/${id}`, data);

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

// TODO: delete fact
export const deleteFact = createAsyncThunk(
  "deleteFact/facts",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`facts/${id}`);
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

const factslice = createSlice({
  name: "fact",
  initialState,
  reducers: {
    resetLoadings: (state) => {
      state.isLoading = false;
      state.fetchLoading = false;
    },
  },
  extraReducers: (builder) => {
    // TODO: get fact
    builder.addCase(fetchFacts.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchFacts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.facts = action.payload;
    });

    builder.addCase(fetchFacts.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create fact
    builder.addCase(createFact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createFact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.facts.data = [action.payload.data, ...state.facts.data];
      state.facts.meta.total = state.facts.meta.total + 1;
      action.payload.enqueueSnackbar("Fact is created successfully.", {
        variant: "success",
      });
    });

    builder.addCase(createFact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update fact
    builder.addCase(updateFact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateFact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.facts.data = state.facts.data.map((fact) => {
        if (fact.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return fact;
        }
      });
      action.payload.enqueueSnackbar("Fact is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateFact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete fact
    builder.addCase(deleteFact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteFact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.facts.data = state.facts.data.filter(
        (fact) => fact.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Fact is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteFact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default factslice.reducer;

export const { resetLoadings } = factslice.actions;
