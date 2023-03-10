import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    try {
      const { data } = await axios.post("/login", params);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/getMe");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = "error";
      state.data = action.payload;
    },
    //fetAuthMe
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      console.log('getMe', action)
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = "error";
      state.data = action.payload;
    },
  },
});

export const selectIsAuth = (state) =>
  state.auth.data?.hasOwnProperty("fullName") ? true : false;

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
