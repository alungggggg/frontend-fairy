import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import fairyApi from "../../axios";

export const getRekapNilaiArtikel = createAsyncThunk(
  "getRekapNilaiArtikel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fairyApi.get("/nilai");

      if (response.data) {
        return response.data;
      }

      throw new Error("data not found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while editing data.");
    }
  }
);

export const getRekapNilaiByIdArtikel = createAsyncThunk(
  "getRekapNilaiByIdArtikel",
  async (id_artikel, { rejectWithValue }) => {
    try {
      const response = await fairyApi.get("/nilai?id_artikel=" + id_artikel);

      if (response.data) {
        return response.data;
      }

      throw new Error("data not found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while editing data.");
    }
  }
);

const rekapNilaiArtikelSlice = createSlice({
  name: "rekapNilaiArtikelSlice",
  initialState: {
    isLoading: false,
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRekapNilaiArtikel.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.error = "";
      })
      .addCase(getRekapNilaiArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.data = [];
      })
      .addCase(getRekapNilaiArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = action.payload.data;
      })
      .addCase(getRekapNilaiByIdArtikel.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.error = "";
      })
      .addCase(getRekapNilaiByIdArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.data = [];
      })
      .addCase(getRekapNilaiByIdArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = [action.payload.data];
      });
  },
});

export default rekapNilaiArtikelSlice.reducer;
