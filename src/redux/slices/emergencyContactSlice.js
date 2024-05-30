import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  emergencyContacts: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the emergencyContacts
export const fetchEmergencyContacts = createAsyncThunk(
  "fetchEmergencyContacts/emergencyContacts",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`users/emergency-contacts`, {
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

// TODO: create emergencyContact
export const createEmergencyContact = createAsyncThunk(
  "createEmergencyContact/emergencyContacts",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(
        `users/emergency-contacts`,
        data
      );

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

// TODO: update emergencyContact
export const updateEmergencyContact = createAsyncThunk(
  "updateEmergencyContact/emergencyContacts",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(
        `users/emergency-contacts/${id}`,
        data
      );

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

// TODO: delete emergencyContact
export const deleteEmergencyContact = createAsyncThunk(
  "deleteEmergencyContact/emergencyContacts",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`users/emergency-contacts/${id}`);
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

const emergencyContactslice = createSlice({
  name: "emergencyContact",
  initialState,
  extraReducers: (builder) => {
    // TODO: create emergencyContact
    builder.addCase(fetchEmergencyContacts.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchEmergencyContacts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.emergencyContacts = action.payload;
    });

    builder.addCase(fetchEmergencyContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create emergencyContact
    builder.addCase(createEmergencyContact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createEmergencyContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.emergencyContacts.data = [
        action.payload.data,
        ...state.emergencyContacts.data,
      ];
      state.emergencyContacts.meta.total =
        state.emergencyContacts.meta.total + 1;
      action.payload.enqueueSnackbar(
        "Emergency contact is created successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createEmergencyContact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update emergencyContact
    builder.addCase(updateEmergencyContact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateEmergencyContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.emergencyContacts.data = state.emergencyContacts.data.map(
        (emergencyContact) => {
          if (emergencyContact.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return emergencyContact;
          }
        }
      );
      action.payload.enqueueSnackbar(
        "Emergency contact is updated successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateEmergencyContact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete emergencyContact
    builder.addCase(deleteEmergencyContact.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteEmergencyContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.emergencyContacts.data = state.emergencyContacts.data.filter(
        (emergencyContact) => emergencyContact.id !== action.payload.data
      );
      action.payload.enqueueSnackbar(
        "Emergency contact is deleted successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteEmergencyContact.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default emergencyContactslice.reducer;
