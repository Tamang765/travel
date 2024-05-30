import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  vehicleBrands: {
    data: [],
    meta: {
      total: 0,
    },
  },

  vehicleCCs: {
    data: [],
    meta: {
      total: 0,
    },
  },

  vehicleColors: {
    data: [],
    meta: {
      total: 0,
    },
  },

  vehicleSymbols: {
    data: [],
    meta: {
      total: 0,
    },
  },

  vehicleModels: {
    data: [],
    meta: {
      total: 0,
    },
  },
};

// TODO: fetch all the vehicleBrands
export const fetchVehicleBrands = createAsyncThunk(
  "fetchVehicleBrands/vehicleBrands",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`brands`, {
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

// TODO: create vehicleBrand
export const createVehicleBrand = createAsyncThunk(
  "createVehicleBrand/vehicleBrands",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`brands`, data);

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

// TODO: update vehicleBrand
export const updateVehicleBrand = createAsyncThunk(
  "updateVehicleBrand/vehicleBrands",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`brands/${id}`, data);

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

// TODO: delete vehicleBrand
export const deleteVehicleBrand = createAsyncThunk(
  "deleteVehicleBrand/vehicleBrands",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`brands/${id}`);
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
// TODO: =====================

// TODO: fetch all the vehicleCCs
export const fetchVehicleCCs = createAsyncThunk(
  "fetchVehicleCCs/vehicleCC",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`vehicles-cc`, {
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

// TODO: create vehicleCCs
export const createVehicleCC = createAsyncThunk(
  "createVehicleCCs/vehicleCCss",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`vehicles-cc`, data);

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

// TODO: update vehicleCC
export const updateVehicleCC = createAsyncThunk(
  "updateVehicleCC/vehicleCCs",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`vehicles-cc/${id}`, data);

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

// TODO: delete vehicleCC
export const deleteVehicleCC = createAsyncThunk(
  "deleteVehicleCC/vehicleCCs",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`vehicles-cc/${id}`);
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

// TODO: =====================

// TODO: fetch all the vehicleColors
export const fetchVehicleColors = createAsyncThunk(
  "fetchVehicleColors/vehicleColor",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`vehicles-color`, {
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

// TODO: create vehicleColors
export const createVehicleColor = createAsyncThunk(
  "createVehicleColor/vehicleColors",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`vehicles-color`, data);

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

// TODO: update vehicleColor
export const updateVehicleColor = createAsyncThunk(
  "updateVehicleColor/vehicleColors",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`vehicles-color/${id}`, data);

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

// TODO: delete vehicleColor
export const deleteVehicleColor = createAsyncThunk(
  "deleteVehicleColor/vehicleColors",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`vehicles-color/${id}`);
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

// TODO: =====================

// TODO: fetch all the vehicleSymbols
export const fetchVehicleSymbols = createAsyncThunk(
  "fetchVehicleSymbols/vehicleSymbol",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`vehicles-symbol`, {
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

// TODO: create vehicleSymbols
export const createVehicleSymbol = createAsyncThunk(
  "createVehicleSymbol/vehicleSymbols",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`vehicles-symbol`, data);

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

// TODO: update vehicleSymbol
export const updateVehicleSymbol = createAsyncThunk(
  "updateVehicleSymbol/vehicleSymbols",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`vehicles-symbol/${id}`, data);

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

// TODO: delete vehicleSymbol
export const deleteVehicleSymbol = createAsyncThunk(
  "deleteVehicleSymbol/vehicleSymbols",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`vehicles-symbol/${id}`);
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

// TODO: =====================

// TODO: fetch all the vehicleModels
export const fetchVehicleModels = createAsyncThunk(
  "fetchVehicleModels/vehicleModel",
  async ({ enqueueSnackbar, limit, page }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`models`, {
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

// TODO: create vehicleModels
export const createVehicleModel = createAsyncThunk(
  "createVehicleModel/vehicleModels",
  async ({ data, enqueueSnackbar, handleClose }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`models`, data);

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

// TODO: update vehicleModel
export const updateVehicleModel = createAsyncThunk(
  "updateVehicleModel/vehicleModels",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.patch(`models/${id}`, data);

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

// TODO: delete vehicleModel
export const deleteVehicleModel = createAsyncThunk(
  "deleteVehicleModel/vehicleModels",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`models/${id}`);
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

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  extraReducers: (builder) => {
    // TODO: create vehicleBrand
    builder.addCase(fetchVehicleBrands.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicleBrands.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicleBrands = action.payload;
    });

    builder.addCase(fetchVehicleBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicleBrand
    builder.addCase(createVehicleBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicleBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleBrands.data = [
        action.payload.data,
        ...state.vehicleBrands.data,
      ];
      state.vehicleBrands.meta.total = state.vehicleBrands.meta.total + 1;
      action.payload.enqueueSnackbar("Vehicle brand is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicleBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicleBrand
    builder.addCase(updateVehicleBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicleBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleBrands.data = state.vehicleBrands.data.map(
        (vehicleBrand) => {
          if (vehicleBrand.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return vehicleBrand;
          }
        }
      );
      action.payload.enqueueSnackbar("Vehicle brand is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicleBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicleBrand
    builder.addCase(deleteVehicleBrand.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicleBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleBrands.data = state.vehicleBrands.data.filter(
        (vehicleBrand) => vehicleBrand.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Vehicle brand is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicleBrand.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO:==========================

    // TODO: create vehicleCC
    builder.addCase(fetchVehicleCCs.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicleCCs.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicleCCs = action.payload;
    });

    builder.addCase(fetchVehicleCCs.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicleCC
    builder.addCase(createVehicleCC.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicleCC.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleCCs.data = [action.payload.data, ...state.vehicleCCs.data];
      state.vehicleCCs.meta.total = state.vehicleCCs.meta.total + 1;
      action.payload.enqueueSnackbar("Vehicle cc is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicleCC.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicleCC
    builder.addCase(updateVehicleCC.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicleCC.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleCCs.data = state.vehicleCCs.data.map((vehicleCC) => {
        if (vehicleCC.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return vehicleCC;
        }
      });
      action.payload.enqueueSnackbar("Vehicle cc is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicleCC.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicleCC
    builder.addCase(deleteVehicleCC.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicleCC.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleCCs.data = state.vehicleCCs.data.filter(
        (vehicleCC) => vehicleCC.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Vehicle cc is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicleCC.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO:===========

    // TODO: create vehicleColor
    builder.addCase(fetchVehicleColors.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicleColors.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicleColors = action.payload;
    });

    builder.addCase(fetchVehicleColors.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicleColor
    builder.addCase(createVehicleColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicleColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleColors.data = [
        action.payload.data,
        ...state.vehicleColors.data,
      ];
      state.vehicleColors.meta.total = state.vehicleColors.meta.total + 1;
      action.payload.enqueueSnackbar("Vehicle color is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicleColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicleColor
    builder.addCase(updateVehicleColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicleColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleColors.data = state.vehicleColors.data.map(
        (vehicleColor) => {
          if (vehicleColor.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return vehicleColor;
          }
        }
      );
      action.payload.enqueueSnackbar("Vehicle color is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicleColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicleColor
    builder.addCase(deleteVehicleColor.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicleColor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleColors.data = state.vehicleColors.data.filter(
        (vehicleColor) => vehicleColor.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Vehicle color is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicleColor.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO:===========

    // TODO: create vehicleSymbol
    builder.addCase(fetchVehicleSymbols.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicleSymbols.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicleSymbols = action.payload;
    });

    builder.addCase(fetchVehicleSymbols.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicleSymbol
    builder.addCase(createVehicleSymbol.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicleSymbol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleSymbols.data = [
        action.payload.data,
        ...state.vehicleSymbols.data,
      ];
      state.vehicleSymbols.meta.total = state.vehicleSymbols.meta.total + 1;
      action.payload.enqueueSnackbar(
        "Vehicle symbol is created successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicleSymbol.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicleSymbol
    builder.addCase(updateVehicleSymbol.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicleSymbol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleSymbols.data = state.vehicleSymbols.data.map(
        (vehicleSymbol) => {
          if (vehicleSymbol.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return vehicleSymbol;
          }
        }
      );
      action.payload.enqueueSnackbar(
        "Vehicle symbol is updated successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicleSymbol.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicleSymbol
    builder.addCase(deleteVehicleSymbol.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicleSymbol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleSymbols.data = state.vehicleSymbols.data.filter(
        (vehicleSymbol) => vehicleSymbol.id !== action.payload.data
      );
      action.payload.enqueueSnackbar(
        "Vehicle symbol is deleted successfully.",
        {
          variant: "success",
        }
      );
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicleSymbol.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO:==========================

    // TODO: fetch vehicleModel
    builder.addCase(fetchVehicleModels.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchVehicleModels.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.vehicleModels = action.payload;
    });

    builder.addCase(fetchVehicleModels.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create vehicleModel
    builder.addCase(createVehicleModel.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createVehicleModel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleModels.data = [
        action.payload.data,
        ...state.vehicleModels.data,
      ];
      state.vehicleModels.meta.total = state.vehicleModels.meta.total + 1;
      action.payload.enqueueSnackbar("Vehicle model is created successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(createVehicleModel.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update vehicleModel
    builder.addCase(updateVehicleModel.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateVehicleModel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleModels.data = state.vehicleModels.data.map(
        (vehicleModel) => {
          if (vehicleModel.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return vehicleModel;
          }
        }
      );
      action.payload.enqueueSnackbar("Vehicle model is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateVehicleModel.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete vehicleModel
    builder.addCase(deleteVehicleModel.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteVehicleModel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vehicleModels.data = state.vehicleModels.data.filter(
        (vehicleModel) => vehicleModel.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Vehicle model is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteVehicleModel.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default vehicleSlice.reducer;
