import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";

export const getSoalUraianPanjang = createAsyncThunk(
  "soalUraianPanjang/getSoalUraianPanjang",
  async () => {
    try {
      const response = await fairyApi.get("/get-soal-uraian-panjang");
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

export const deleteSoalUraianPanjang = createAsyncThunk(
  "soalUraianPanjang/deleteSoalUraianPanjang",
  async (payload) => {
    try {
      const response = await fairyApi.delete(
        `/delete-soal-uraian-panjang/${payload}`
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

export const addSoalUraianPanjang = createAsyncThunk(
  "soalUraianPanjang/addSoalUraianPanjang",
  async (payload) => {
    try {
      const response = await fairyApi.post("/set-soal-uraian-panjang", payload);
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

export const editSoalUraianPanjang = createAsyncThunk(
  "soalUraianPanjang/editSoalUraianPanjang",
  async (payload) => {
    try {
      const response = await fairyApi.patch(
        `/update-soal-uraian-panjang/${payload.id}`,
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

const soalUraianPanjangSlice = createSlice({
  name: "soalUraianPanjang",
  initialState: {
    soalUraianPanjang: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSoalUraianPanjang.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalUraianPanjang = action.payload;
      })
      .addCase(getSoalUraianPanjang.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSoalUraianPanjang.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteSoalUraianPanjang.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalUraianPanjang = state.soalUraianPanjang.filter(
          (data) => data.id !== action.payload
        );
      })
      .addCase(deleteSoalUraianPanjang.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSoalUraianPanjang.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addSoalUraianPanjang.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.soalUraianPanjang.push(action.payload);
      })
      .addCase(addSoalUraianPanjang.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addSoalUraianPanjang.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editSoalUraianPanjang.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editSoalUraianPanjang.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editSoalUraianPanjang.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default soalUraianPanjangSlice.reducer;
