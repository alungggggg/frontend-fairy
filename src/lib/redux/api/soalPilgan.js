import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getSoalPilgan = createAsyncThunk(
  "soalPilgan/getSoalPilgan",
  async () => {
    try {
      const responses = await fairyApi.get("/get-soal-pilgan");
      if (responses) {
        return responses.data;
      }

      throw new Error("Failed to get a data");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const deleteSoalPilgan = createAsyncThunk(
  "soalPilgan/deleteSoalPilgan",
  async (payload) => {
    try {
      const responses = await fairyApi.delete(`/delete-soal-pilgan/${payload}`);
      if (responses) {
        return payload;
      }

      throw new Error("Failed to delete a data");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const addSoalPilgan = createAsyncThunk(
  "soalPilgan/addSoalPilgan",
  async (payload) => {
    try {
      const responses = await fairyApi.post("/set-soal-pilgan", payload);
      if (responses) {
        return responses.data;
      }

      throw new Error("Failed to add a data");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const editSoalPilgan = createAsyncThunk(
  "soalPilgan/editSoalPilgan",
  async (payload) => {
    try {
      const responses = await fairyApi.patch(
        `/update-soal-pilgan/${payload.id}`,
        payload
      );
      if (responses) {
        return responses.data;
      }

      throw new Error("Failed to edit a data");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

const pilganSlice = createSlice({
  name: "soalPilgan",
  initialState: {
    soalPilgan: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSoalPilgan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalPilgan = action.payload;
      })
      .addCase(getSoalPilgan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.soalPilgan = []
      })
      .addCase(getSoalPilgan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSoalPilgan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.soalPilgan = state.soalPilgan.filter(
          (data) => data.id !== action.payload
        );
      })
      .addCase(deleteSoalPilgan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.soalPilgan = []
      })
      .addCase(deleteSoalPilgan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSoalPilgan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // getSoalPilgan();
      })
      .addCase(addSoalPilgan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addSoalPilgan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editSoalPilgan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // getSoalPilgan();
      })
      .addCase(editSoalPilgan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.soalPilgan = []
      })
      .addCase(editSoalPilgan.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default pilganSlice.reducer;
