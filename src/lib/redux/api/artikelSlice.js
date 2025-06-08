import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getArtikelData = createAsyncThunk(
  "artikel/getArtikelData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fairyApi.get("/artikel");
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);

export const getArtikelDataById = createAsyncThunk(
  "artikel/getArtikelDataById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fairyApi.get(`/artikel?id=${id}`);
      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while fetching data.");
    }
  }
);

export const addArtikelData = createAsyncThunk(
  "artikel/addArtikelData",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("artikel_link", data.artikel_link);
      formData.append("judul", data.judul);
      formData.append("gambar", data.gambar);
      formData.append("type", data.type);
      formData.append("deskripsi", data.deskripsi);

      const response = await fairyApi.post("/artikel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return response.data.data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("An error occurred while adding data.");
    }
  }
);

export const editArtikelData = createAsyncThunk(
  "artikel/editArtikelData",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("artikel_link", data.artikel_link);
      formData.append("judul", data.judul);
      if (data.gambar) {
        formData.append("gambar", data.gambar);
      }
      formData.append("type", data.type);
      formData.append("deskripsi", data.deskripsi);
      formData.append("_method", "PATCH");
      const response = await fairyApi.post(`/artikel/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        return response.data.data;
      }
      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while editing data.");
    }
  }
);

export const deleteArtikelData = createAsyncThunk(
  "artikel/deleteArtikelData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fairyApi.delete(`/artikel/${data.id}`);
      if (response.data) {
        return data;
      }

      throw new Error("No data found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("An error occurred while deleting data.");
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  data: [],
};

const artikelSlice = createSlice({
  initialState,
  name: "artikelSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtikelData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getArtikelData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || false;
        state.data = action.payload;
      })
      .addCase(getArtikelData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
        console.error("Error fetching artikel data:", action.payload);
      })
      .addCase(getArtikelDataById.pending, (state) => {
        state.isLoading = true;
        state.error = "";
        state.data = [];
      })
      .addCase(getArtikelDataById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || false;
        state.data = [action.payload];
      })
      .addCase(getArtikelDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
        console.error("Error fetching artikel data by ID:", action.payload);
      })
      .addCase(addArtikelData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addArtikelData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || false;
        state.data.push(action.payload);
      })
      .addCase(addArtikelData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
        console.error("Error adding artikel data:", action.payload);
      })
      .addCase(deleteArtikelData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteArtikelData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || false;
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteArtikelData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
        console.error("Error deleting artikel data:", action.payload);
      })
      .addCase(editArtikelData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(editArtikelData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editArtikelData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || true;
        console.error("Error editing artikel data:", action.payload);
      });
  },
});

export default artikelSlice.reducer;
