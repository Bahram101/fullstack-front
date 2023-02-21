import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params, { rejectWithValue }) => {
    try { 
      const { data } = await axios.post("/login", params); 
      return data;
    } catch (error) {
      return error.response.data
    }
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=>{
      state.data = null
    }
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
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); 
export const {logout} = authSlice.actions

export const authReducer = authSlice.reducer;
