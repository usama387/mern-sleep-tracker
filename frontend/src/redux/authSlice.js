import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false; 
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
