import {  CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { createChartTheme } from "../themes/theme";

const MODE = 'mode'

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});


export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const existingMode = localStorage.getItem(MODE) as PaletteMode ?? 'light'
  const [mode, setMode] = useState<PaletteMode>(existingMode);
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>{
      localStorage.setItem(MODE, mode)
      return createChartTheme(mode)},
    [mode]
  );
  
  return (
    <MUIWrapperContext.Provider value={muiWrapperUtils}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
        </ThemeProvider>
    </MUIWrapperContext.Provider>
  );
}