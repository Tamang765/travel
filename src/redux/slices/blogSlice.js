import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
// utils

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  fetchLoading: false,
  blogs: {
    data: [],
    meta: {
      total: 0,
    },
  },

  mainBlogs: [],
};

// TODO: fetch all the blogs
export const fetchBlogs = createAsyncThunk(
  "fetchBlogs/blogs",
  async ({ enqueueSnackbar, search }, thunkApi) => {
    try {
      const response = await axiosInstance.get(`blogs`, {
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

// TODO: create blog
export const createBlog = createAsyncThunk(
  "createBlog/blogs",
  async (
    { data, enqueueSnackbar, handleClose, activeTab, setActiveTab },
    thunkApi
  ) => {
    try {
      const response = await axiosInstance.post(`blogs`, data);
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

// TODO: update blog
export const updateBlog = createAsyncThunk(
  "updateBlog/blogs",
  async ({ data, enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      const response = await axiosInstance.post(`blogs/${id}`, data);

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

// TODO: delete blog
export const deleteBlog = createAsyncThunk(
  "deleteBlog/blogs",
  async ({ enqueueSnackbar, handleClose, id }, thunkApi) => {
    try {
      await axiosInstance.delete(`blogs/${id}`);
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetLoadings: (state) => {
      state.isLoading = false;
      state.fetchLoading = false;
    },
  },
  extraReducers: (builder) => {
    // TODO: get blog
    builder.addCase(fetchBlogs.pending, (state, _) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.blogs = action.payload;
    });

    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.fetchLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: create blog
    builder.addCase(createBlog.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs.data.data = [action.payload.data, ...state.blogs.data.data];
      state.blogs.meta.total = state.blogs.meta.total + 1;
      action.payload.enqueueSnackbar("Blog is created successfully.", {
        variant: "success",
      });
    });

    builder.addCase(createBlog.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: update blog
    builder.addCase(updateBlog.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs.data.data = state.blogs.data.data.map((blog) => {
        if (blog.id === action.payload.data.id) {
          return action.payload.data;
        } else {
          return blog;
        }
      });
      action.payload.enqueueSnackbar("Blog is updated successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(updateBlog.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });

    // TODO: delete blog
    builder.addCase(deleteBlog.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs.data.data = state.blogs.data.data.filter(
        (blog) => blog.id !== action.payload.data
      );
      action.payload.enqueueSnackbar("Blog is deleted successfully.", {
        variant: "success",
      });
      action.payload.handleClose && action.payload.handleClose();
    });

    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      action.payload.enqueueSnackbar(action.payload.error.message, {
        variant: "error",
      });
    });
  },
});

export default blogSlice.reducer;

export const { resetLoadings } = blogSlice.actions;
