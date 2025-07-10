import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./redux/store";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
