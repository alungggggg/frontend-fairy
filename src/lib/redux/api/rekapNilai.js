import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

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

export const joinForumQuiz = createAsyncThunk(
  "rekapNilai/joinForumQuiz",
  async (payload) => {
    try {
      const response = await fairyApi.post("/join-forum", payload);
      if (response) {
        return response.data;
      }

      throw new Error();
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.data : error.message;
      }
      throw error;
    }
  }
);

export const updateNilaiForum = createAsyncThunk(
  "rekapNilai/updateNilaiForum",
  async (payload) => {
    try {
      const response = await fairyApi.post("/update-nilai-quiz", payload);
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

export const getForumQuizByUserId = createAsyncThunk(
  "rekapNilai/getForumQuizByUserId",
  async (payload) => {
    try {
      const response = await fairyApi.get(`/get-forum-by-userid/${payload}`);
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
        // console.log(action.payload);
        state.rekapNilai = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getRekapNilaiByIdForum.rejected, (state, action) => {
        console.log(action.error.message);
        if (!action.error.message === "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(joinForumQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinForumQuiz.fulfilled, (state) => {
        // console.log(action.payload);
        // state.rekapNilai = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(joinForumQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateNilaiForum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNilaiForum.fulfilled, (state) => {
        // console.log(action.payload);
        // state.rekapNilai = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateNilaiForum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getForumQuizByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForumQuizByUserId.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.rekapNilai = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getForumQuizByUserId.rejected, (state, action) => {
        if (!action.error.message === "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      });
  },
});

export default rekapNilaiSlice.reducer;
