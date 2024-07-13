import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  vehicles: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the vehicles
export const fetchVehicles = createAsyncThunk(
  "fetchVehicles/vehicles",
  async (
    { enqueueSnackbar, limit, page = 0, filter,  },
    thunkApi
  ) => {
    console.log(filter, "filter");
    try {
      const response = await axiosInstance.get(`vehicles`);

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

// TODO: create vehicle
export const createVehicle = createAsyncThunk(
  "createVehicle/vehicles",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`vehicles`, data);

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

// TODO: update vehicle
export const updateVehicle = createAsyncThunk(
  "updateVehicle/vehicles",
  async ({ data, enqueueSnackbar, handleClose, id, setRefresh }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`vehicles/${id}`, data);

      return {
        data: response.data.data,
        handleClose,
        enqueueSnackbar,
        setRefresh,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: update vehiclestatus
export const updateVehiclestatus = createAsyncThunk(
  "updateVehiclestatus/vehicles",
  async ({ data, enqueueSnackbar, slug }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`update-status/${slug}`, data);

      return {
        data: response.data.data,
        enqueueSnackbar,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ error, enqueueSnackbar });
    }
  }
);

// TODO: delete vehicle
export const deleteVehicle = createAsyncThunk(
  "deleteVehicle/vehicles",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`vehicles/${id}`);
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

const vehicleslice = createSlice({
  name: "vehicle",
  initialState,
  extraReducers: (builder) => {
    // TODO: create vehicle
    builder.addCase(fetchVehicles.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicles = action.payload;
    });

    builder.addCase(fetchVehicles.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicle
    builder.addCase(createVehicle.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicles.data = [action.payload.data, ...state.vehicles.data];
      state.vehicles.meta.total = state.vehicles.meta.total + 1;
      action.payload.enqueueSnackbar("Vehicle is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicle.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicle status
    builder.addCase(updateVehiclestatus.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehiclestatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicles.data = state.vehicles.data.map((vehicle) => {
        if (vehicle.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return vehicle;
        }
      });
      action.payload.enqueueSnackbar("Vehicle is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehiclestatus.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicle
    builder.addCase(updateVehicle.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicles.data = state.vehicles.data.map((vehicle) => {
        if (vehicle.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return vehicle;
        }
      });
      action.payload.enqueueSnackbar("Vehicle is updated successfully.", {
        variant: "success",
      });
      action.payload.setRefresh && action.payload.setRefresh((prev) => !prev);
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicle.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicle
    builder.addCase(deleteVehicle.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicles.data = state.vehicles.data.filter(
        (vehicle) => vehicle.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Vehicle is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicle.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default vehicleslice.reducer;
