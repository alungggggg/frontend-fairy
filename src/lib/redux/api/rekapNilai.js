import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";

export const getRekapNilaiByIdForum = createAsyncThunk(
  "rekapNilai/getRekapNilaiByIdForum",
  async (payload) => {
    try {
      const response = await fairyApi.get(`/get-rekap/${payload}`);
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

const rekapNilaiSlice = createSlice({
  name: "rekapNilai",
  initialState: {
    rekapNilai: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRekapNilaiByIdForum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRekapNilaiByIdForum.fulfilled, (state, action) => {
        state.rekapNilai = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRekapNilaiByIdForum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default rekapNilaiSlice.reducer;
