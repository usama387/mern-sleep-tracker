import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./redux/store";
import { Toaster } from "./components/ui/sonner";
import { Loader2 } from "lucide-react";
import { useGetUserProfileDetailsQuery } from "./featues/api/authApi";

// this component is rendered when rtk query fetches user and saves in user  slice reducer
const Custom = ({ children }) => {
  const { isLoading } = useGetUserProfileDetailsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-500 mb-2" />
        <p className="text-green-500 font-semibold">Just a moment...</p>
      </div>
    );
  }

  return <>{children}</>;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </BrowserRouter>
);
