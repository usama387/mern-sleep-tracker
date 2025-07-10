import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "@/featues/api/authApi";

// Combine all reducers into a single root reducer and the passed in store.js.
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

export default rootReducer;
