import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import fairyApi from "../../axios";
import Swal from "sweetalert2";

export const signIn = createAsyncThunk("auth/login", async (user) => {
  const { credential, password } = user;
  try {
    const response = await axios.post("https://test-backend-pink.vercel.app/api/login", {
      credential,
      password,
    });
    if (response.data.data.status) {
      console.log(response.data);
      Swal.fire({
        title: "Berhasil",
        text: "Kamu telah login!",
        icon: "success",
      })
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
    await axios.post("https://test-backend-pink.vercel.app/api/logout", {
      refreshToken: getCookie("refreshToken"),
    });
  } catch (error) {
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
      const response = await axios.post(
        "https://test-backend-pink.vercel.app/api/forgot-password",
        { email }
      );
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
    user: {},
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
        setCookie("accessToken", action.payload.token.accessToken);
        setCookie("refreshToken", action.payload.token.refreshToken, {
          maxAge: 7 * 24 * 60 * 60,
        });
        setCookie("userID", action.payload.data.id, {
          maxAge: 7 * 24 * 60 * 60,
        });
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = false;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("userID");
        window.location.replace("/");
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
        setCookie("accessToken", action.payload.accessToken);
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
        console.log(action.error.message);
        state.token = null;
        window.location.replace("/login");
      });
  },
});

export default authSlice.reducer;
