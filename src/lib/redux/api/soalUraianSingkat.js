import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getSoalUraianSingkat = createAsyncThunk(
  "soalUraianSingkat/getSoalUraianSingkat",
  async () => {
    try {
      const response = await fairyApi.get("/get-soal-uraian-singkat");
      if (response) {
        return response.data;
      }

      throw new Error();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const deleteSoalUraianSingkat = createAsyncThunk(
  "soalUraianSingkat/deleteSoalUraianSingkat",
  async (payload) => {
    try {
      const response = await fairyApi.delete(
        `/delete-soal-uraian-singkat/${payload}`
      );
      if (response) {
        return payload;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const addSoalUraianSingkat = createAsyncThunk(
  "soalUraianSingkat/addSoalUraianSingkat",
  async (payload) => {
    try {
      const response = await fairyApi.post("/set-soal-uraian-singkat", payload);
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const editSoalUraianSingkat = createAsyncThunk(
  "soalUraianSingkat/editSoalUraianSingkat",
  async (payload) => {
    try {
      const response = await fairyApi.patch(
        `/update-soal-uraian-singkat/${payload.id}`,
        payload
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

const uraianSingkatSlice = createSlice({
  name: "soalUraianSingkat",
  initialState: {
    soalUraianSingkat: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSoalUraianSingkat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalUraianSingkat = action.payload;
      })
      .addCase(getSoalUraianSingkat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSoalUraianSingkat.rejected, (state, action) => {
        if (state.error !== "401") {
          state.isLoading = false;
        }
        state.error = action.error;
      })
      .addCase(deleteSoalUraianSingkat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalUraianSingkat = state.soalUraianSingkat.filter(
          (data) => data.id !== action.payload
        );
      })
      .addCase(deleteSoalUraianSingkat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSoalUraianSingkat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addSoalUraianSingkat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.soalUraianSingkat.push(action.payload);
      })
      .addCase(addSoalUraianSingkat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSoalUraianSingkat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editSoalUraianSingkat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editSoalUraianSingkat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSoalUraianSingkat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default uraianSingkatSlice.reducer;
