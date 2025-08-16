import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAutheticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAutheticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAutheticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
