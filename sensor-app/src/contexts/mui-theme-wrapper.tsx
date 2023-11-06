import {  CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { createChartTheme } from "../themes/theme";

export const MUIWrapperContext = createContext({
  toggleColorMode: () => {},
});


export default function MUIWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const muiWrapperUtils = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createChartTheme(mode),
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