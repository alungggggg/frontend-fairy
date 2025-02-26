import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";

export const getNewsData = createAsyncThunk(
  "getNews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fairyApi.get("/news");

      if (res.data) {
        return res.data;
      }

      throw new Error("Failed to get a data");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewsData = createAsyncThunk(
  "addNews",
  async (newsData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("judul", newsData.judul);
      formData.append("gambar", newsData.gambar);
      formData.append("description", newsData.deskripsi);

      const response = await fairyApi.post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        return response.data;
      }
      throw new Error("Failed to add a data");
    } catch (error) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);

export const deleteNewsData = createAsyncThunk(
  "deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fairyApi.delete(`/news`, {
        id,
      });

      if (res.data) {
        return res.data;
      }

      throw new Error("Failed to delete a data");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsData.pending, (state) => {
        state.isLoading = true;
        state.data = [];
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(getNewsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "";
      })
      .addCase(addNewsData.pending, (state) => {
        state.isLoading = true;
        state.data = [];
      })
      .addCase(addNewsData.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        state.error = "";
      })
      .addCase(addNewsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "";
      })
      .addCase(deleteNewsData.pending, (state) => {
        state.isLoading = true;
        state.data = [];
      })
      .addCase(deleteNewsData.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        state.error = "";
      })
      .addCase(deleteNewsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "";
      });
  },
});

export default newsSlice.reducer;
