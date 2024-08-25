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

      throw new Error();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const updateDongeng = createAsyncThunk(
  "dongeng/updateDongeng",
  async (payload) => {
    try {
      const response = await fairyApi.patch(`dongeng/${payload.id}`, payload);

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

export const getDongengById = createAsyncThunk(
  "dongeng/getDongengById",
  async (payload) => {
    try {
      const response = await fairyApi.get(`dongeng/${payload}`);
      if (response) {
        response.data;
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

export const addDongeng = createAsyncThunk(
  "dongeng/addDongeng",
  async (payload) => {
    try {
      const response = await fairyApi.post("/dongeng", payload, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });
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
        state.dongeng = [];
      })
      .addCase(getAllDongeng.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateDongeng.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateDongeng.fulfilled, (state, action) => {
        state.dongeng = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateDongeng.rejected, (state, action) => {
        state.isLoading = false;
        state.dongeng = [];
        state.error = action.error.message;
      })
      .addCase(getDongengById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDongengById.fulfilled, (state, action) => {
        state.dongeng = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getDongengById.rejected, (state, action) => {
        state.isLoading = false;
        state.dongeng = [];
        state.error = action.error.message;
      });
  },
});

export default dongengSlice.reducer;