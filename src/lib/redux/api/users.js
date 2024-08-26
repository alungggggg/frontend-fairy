import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async () =>{
        try {
            
        } catch (error) {
            
        }
    }
)

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder
    // .addCase
  },
});

export default usersSlice.reducer
