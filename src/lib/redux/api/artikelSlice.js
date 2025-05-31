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
      });
  },
});

export default artikelSlice.reducer;
