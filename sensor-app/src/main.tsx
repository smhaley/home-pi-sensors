import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
    },
  },
  {
    chartDark: {
      ticks: "#fff",
      gridLines: "#6b6a6a",
      title: '#fff"',
    },
  },
  {
    chartLight: {
      ticks: "rgba(0, 0, 0, 0.87)",
      gridLines: "rgba(134, 130, 130, 0.87)",
      title: 'rgba(0, 0, 0, 0.87)"',
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
        <App />
      {/* </ThemeProvider> */}
    </LocalizationProvider>
  </React.StrictMode>
);
