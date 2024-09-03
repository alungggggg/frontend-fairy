import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getForumQuiz = createAsyncThunk(
  "forumQuiz/getForumQuiz",
  async () => {
    // throw new Error();
    try {
      const response = await fairyApi.get("/get-all-quiz");
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

export const addForumQuiz = createAsyncThunk(
  "forumQuiz/addForumQuiz",
  async (payload) => {
    console.log(payload);
    try {
      const response = await fairyApi.post("/create-quiz", payload);
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
export const getForumQuizById = createAsyncThunk(
  "forumQuiz/getForumQuizById",
  async (payload) => {
    try {
      const response = await fairyApi.get(`/get-quiz/${payload}`);
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

export const deleteForumQuiz = createAsyncThunk(
  "forumQuiz/deleteForumQuiz",
  async (payload) => {
    try {
      const response = await fairyApi.delete(`/delete-quiz/${payload}`);
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

export const editForumQuiz = createAsyncThunk(
  "forumQuiz/editForumQuiz",
  async (payload) => {
    try {
      const response = await fairyApi.patch(
        `/update-quiz/${payload.id}`,
        payload
      );
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
      .addCase(getForumQuiz.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.forumQuiz = [];
        state.error = action.error.message;
      })
      .addCase(getForumQuiz.fulfilled, (state, action) => {
        state.forumQuiz = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getForumQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addForumQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addForumQuiz.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(addForumQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForumQuizById.fulfilled, (state, action) => {
        state.forumQuiz = [];
        state.forumQuiz.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getForumQuizById.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(getForumQuizById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForumQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteForumQuiz.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(deleteForumQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editForumQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editForumQuiz.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(editForumQuiz.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default forumQuizSlice.reducer;
