import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getForumQuiz = createAsyncThunk(
  "forumQuiz/getForumQuiz",
  async () => {
    try {
      const response = await fairyApi.get("/get-all-quiz");
      if (response) {
        return response.data;
      }

      throw new Error();
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

const forumQuizSlice = createSlice({
  name: "forumQuiz",
  initialState: {
    forumQuiz: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForumQuiz.fulfilled, (state, action) => {
        state.forumQuiz = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getForumQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getForumQuiz.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default forumQuizSlice.reducer;
