import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  contacts: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the contacts
export const fetchContacts = createAsyncThunk(
  "fetchContacts/contacts",
  async ({ enqueueSnackbar, limit, page = 0 }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`contacts`, {
        params: {
          page: page + 1,
          limit,
        },
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
  "createEmergencyContact/contacts",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(
        `contacts`,
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
  "updateEmergencyContact/contacts",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(
        `contacts/${id}`,
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
  "deleteEmergencyContact/contacts",
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

const contactslice = createSlice({
  name: "emergencyContact",
  initialState,
  extraReducers: (builder) => {
    // TODO: create emergencyContact
    builder.addCase(fetchContacts.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.contacts = action.payload;
    });

    builder.addCase(fetchContacts.rejected, (state, action) => {
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
      state.contacts.data = [
        action.payload.data,
        ...state.contacts.data,
      ];
      state.contacts.meta.total =
        state.contacts.meta.total + 1;
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
      state.contacts.data = state.contacts.data.map(
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
      state.contacts.data = state.contacts.data.filter(
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

export default contactslice.reducer;
