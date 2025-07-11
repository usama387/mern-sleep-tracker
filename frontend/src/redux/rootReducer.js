import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "@/featues/api/authApi";
import { sleepApi } from "@/featues/api/sleepApi";

// Combine all reducers into a single root reducer and the passed in store.js.
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [sleepApi.reducerPath]: sleepApi.reducer,
  auth: authReducer,
});

export default rootReducer;
