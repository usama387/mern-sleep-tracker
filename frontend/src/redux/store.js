import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/featues/api/authApi";
import { setAuthLoading, userLoggedIn, userLoggedOut } from "./authSlice";
import { sleepApi } from "@/featues/api/sleepApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, sleepApi.middleware),
});

// This API endpoint is hit when the page is reloaded to keep the user authenticated
const initializeApp = async () => {
  try {
    // Set loading true at start (optional)
    appStore.dispatch(setAuthLoading(true));

    const result = await appStore.dispatch(
      authApi.endpoints.getUserProfileDetails.initiate({}, { forceRefetch: true })
    );

    if ("data" in result) {
      appStore.dispatch(userLoggedIn({ user: result.data }));
    } else if (result?.error?.status === 401) {
      appStore.dispatch(userLoggedOut());
    } else {
      console.error("Unexpected error while fetching user:", result.error);
      appStore.dispatch(setAuthLoading(false));
    }
  } catch (err) {
    console.error("Error in initializeApp:", err);
    appStore.dispatch(setAuthLoading(false));
  }
};
initializeApp();
