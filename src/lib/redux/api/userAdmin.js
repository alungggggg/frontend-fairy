import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fairyApi from "../../axios";
import { AxiosError } from "axios";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const response = await fairyApi.get("/users");
    if (response.data) {
      return response.data;
    }
    throw new Error();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.status : error.message;
    }
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload) => {
    try {
      const response = await fairyApi.patch(`users/${payload.id}`, payload);
      if (response.data) {
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

export const getUsersById = createAsyncThunk(
  "users/getUsersById",
  async (paylaod) => {
    try {
      const response = await fairyApi.get(`users/${paylaod}`);

      if (response.data) {
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

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (payload) => {
    try {
      const response = await fairyApi.delete(`users/${payload}`);
      if (response.data) {
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

export const addUsers = createAsyncThunk("users/addUsers", async (payload) => {
  try {
    const response = await fairyApi.post("/users", payload);
    if (response.data) {
      return response.data;
    }
    throw new Error();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.status : error.message;
    }
    throw error;
  }
});

const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        // state.users = [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.users = [action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUsersById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersById.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        // state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        // state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsers.rejected, (state, action) => {
        if (action.error.message !== "401") {
          state.isLoading = false;
        }
        state.error = action.error.message;
      });
  },
});

export default userAdminSlice.reducer;
