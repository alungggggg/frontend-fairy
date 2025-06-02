import { AxiosError } from "axios";
import fairyApi from "../../axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSoalArtikel = createAsyncThunk(
  "soalArtikel/getSoalArtikel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fairyApi.get("/soal");
      if (response.data) {
        return response.data;
      }

      throw new Error("Failed to fetch data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("An error occurred while editing data.");
    }
  }
);

export const deleteSoalArtikel = createAsyncThunk(
  "soalArtikel/deleteSoalArtikel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fairyApi.delete(`/soal/${data.id}`);
      if (response.data) {
        return data;
      }

      throw new Error("Failed to delete data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("An error occurred while deleting data.");
    }
  }
);

export const addSoalArtikel = createAsyncThunk(
  "soalArtikel/addSoalArtikel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fairyApi.post("/soal?method=PATCH", data);
      if (response.data) {
        return response.data;
      }

      throw new Error("Failed to add data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("An error occurred while adding data.");
    }
  }
);

export const editSoalArtikel = createAsyncThunk(
  "soalArtikel/editSoalArtikel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fairyApi.patch(`/soal/${data.id}`, data);
      if (response.data) {
        return response.data;
      }

      throw new Error("Failed to edit data");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("An error occurred while editing data.");
    }
  }
)

const soalArtikelSlice = createSlice({
  name: "soalArtikel",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSoalArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSoalArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(getSoalArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "An error occurred while fetching data.";
      })
      .addCase(deleteSoalArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSoalArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((item) => item.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteSoalArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "An error occurred while deleting data.";
      })
      .addCase(addSoalArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSoalArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload.data);
        state.error = null;
      })
      .addCase(addSoalArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred while adding data.";
      })
      .addCase(editSoalArtikel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editSoalArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.data.id);
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(editSoalArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred while editing data.";
      });
  },
});

export default soalArtikelSlice.reducer;
