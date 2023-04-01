import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ContextProvider } from "./context/Context";
import AppThemeProvider from "./styles/AppThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
