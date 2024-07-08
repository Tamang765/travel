import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  gallerys: {
    data: [],
    meta: {
      total: 0,
    },
  },

  mainGallerys: [],
};

// TODO: fetch all the gallerys
export const fetchGallerys = createAsyncThunk(
  "fetchGallerys/gallerys",
  async ({ enqueueSnackbar, search }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`gallerys`, {
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

// TODO: create gallery
export const createGallery = createAsyncThunk(
  "createGallery/gallerys",
  async (
    { data, enqueueSnackbar, handleClose, activeTab, setActiveTab },
    thunkApi
  ) => {
    try {
      const response = await axiosInstance.post(`gallerys`, data);
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

// TODO: update gallery
export const updateGallery = createAsyncThunk(
  "updateGallery/gallerys",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`gallerys/${id}`, data);

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

// TODO: delete gallery
export const deleteGallery = createAsyncThunk(
  "deleteGallery/gallerys",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`gallerys/${id}`);
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

const galleryslice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    resetLoadings: (state) => {
      state.isLoading = false;
      state.fetchLoading = false;
    },
  },
  extraReducers: (builder) => {
    // TODO: get gallery
    builder.addCase(fetchGallerys.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchGallerys.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.gallerys = action.payload;
    });

    builder.addCase(fetchGallerys.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create gallery
    builder.addCase(createGallery.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createGallery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.gallerys.data.data = [action.payload.data, ...state.gallerys.data.data];
      state.gallerys.meta.total = state.gallerys.meta.total + 1;
      action.payload.enqueueSnackbar("Gallery is created successfully.", {
        variant: "success",
      });
    });

    builder.addCase(createGallery.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update gallery
    builder.addCase(updateGallery.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateGallery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.gallerys.data = state.gallerys.data.map((gallery) => {
        if (gallery.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return gallery;
        }
      });
      action.payload.enqueueSnackbar("Gallery is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateGallery.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete gallery
    builder.addCase(deleteGallery.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteGallery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.gallerys.data.data = state.gallerys.data.data.filter(
        (gallery) => gallery.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Gallery is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteGallery.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default galleryslice.reducer;

export const { resetLoadings } = galleryslice.actions;
