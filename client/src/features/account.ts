import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserProfile } from '../types/types';

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/profile", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      if (window.location.pathname !== '/login') {
        window.location.href = "/login";
      }
      return thunkAPI.rejectWithValue(
        "Something went wrong please try again later.",
      );
    }
  },
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: undefined as undefined | IUserProfile,
    loading: "idle",
    error: undefined as undefined | any,
    image: null,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLoginState } = userSlice.actions;

export default userSlice.reducer;
