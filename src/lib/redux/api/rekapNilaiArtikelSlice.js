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

export const addRekapNillai = createAsyncThunk(
  "addRekapNillai",
  async (data) => {
    try {
      const response = await fairyApi.post("/nilai", data);

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

export const getNilaiByArtikelAndUsers = createAsyncThunk(
  "getNilaiByArtikelAndUsers",
  async ({ id_artikel, id_user }) => {
    try {
      const response = await fairyApi.get(
        `/nilai?id_artikel=${id_artikel}&id_user=${id_user}`
      );

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

export const deleteNilaiArtikel = createAsyncThunk(
  "deleteNilaiArtikel",
  async (data) => {
    try {
      const response = await fairyApi.delete(`/nilai/${data?.id}`);

      if (response.data) {
        return data;
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
      })
      .addCase(addRekapNillai.pending, (state, action) => {
        state.isLoading = true;
        state.data = [];
        state.error = "";
      })
      .addCase(addRekapNillai.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(addRekapNillai.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = [];
      })
      .addCase(getNilaiByArtikelAndUsers.pending, (state, action) => {
        state.isLoading = true;
        state.data = [];
        state.error = "";
      })
      .addCase(getNilaiByArtikelAndUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(getNilaiByArtikelAndUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = [];
      })
      .addCase(deleteNilaiArtikel.pending, (state, action) => {
        state.isLoading = true;
        state.data = [];
        state.error = "";
      })
      .addCase(deleteNilaiArtikel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(deleteNilaiArtikel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.data = state.data.filter(
          (item) => item.id !== action.payload?.id
        );
      });
  },
});

export default rekapNilaiArtikelSlice.reducer;
