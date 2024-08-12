import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import fairyApi from "../../axios";

export const signIn = createAsyncThunk("auth/login", async (user) => {
  const { email, password } = user;
  try {
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    if (response.data.data.status) {
      return response.data;
    }

    throw new Error("login failed");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.status : error.message;
    }
    throw error;
  }
});

export const signOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("http://localhost:5000/api/logout", {
      refreshToken: getCookie("refreshToken"),
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw error.response ? error.response.status : error.message;
    }
    throw error;
  }
});

export const getValidationCode = createAsyncThunk(
  "auth/get-validation-code",
  async (email) => {
    try {
      const response = await fairyApi.post("/forgot-password", { email });
      if (response.data) {
        return response.data;
      }

      throw new Error("Failed to get a token");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/get-new-access-token",
  async () => {
    let { refreshToken } = getCookies("refreshToken");
    console.log(refreshToken);
    try {
      const response = await fairyApi.post("/refresh-token", {
        refreshToken,
      });
      if (response.data) {
        return response.data;
      }

      throw new Error("Failed to get a token");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response ? error.response.status : error.message;
      }
      throw error;
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    token: getCookie("token"),
    validationToken: null,
    status: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = true;
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token.accessToken;
        setCookie("token", action.payload.token.accessToken);
        setCookie("refreshToken", action.payload.token.refreshToken);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = false;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        deleteCookie("token");
        deleteCookie("refreshToken");
        window.location.replace("/login");
      })
      .addCase(getValidationCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getValidationCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.validationToken = action.payload;
      })
      .addCase(getValidationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.status = false;
        state.error = action.error.message;
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
        state.status = true;
        state.token = action.payload.accessToken;
        console.log("token", action.payload.refreshToken);
        setCookie("refreshToken", action.payload.refreshToken);
        setCookie("token", action.payload.accessToken);
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        console.log(action.error.message);
        state.token = null;
        deleteCookie("token");
        deleteCookie("refreshToken");
        window.location.replace("/login");
      });
  },
});

export default authSlice.reducer;
