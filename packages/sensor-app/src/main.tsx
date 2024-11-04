import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MuiWrapper from "./contexts/mui-theme-wrapper.tsx";
import { SettingsProvider } from "./providers/settings-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiWrapper>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </MuiWrapper>
    </LocalizationProvider>
  </React.StrictMode>
);
