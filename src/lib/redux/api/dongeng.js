import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import fairyApi from "../../axios";

export const getAllDongeng = createAsyncThunk(
  "dongeng/getAllDongeng",
  async () => {
    try {
      const response = await fairyApi.get("/dongeng");

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

const dongengSlice = createSlice({
  name: "dongeng",
  initialState: {
    dongeng: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDongeng.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dongeng = action.payload;
      })
      .addCase(getAllDongeng.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllDongeng.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default dongengSlice.reducer;
