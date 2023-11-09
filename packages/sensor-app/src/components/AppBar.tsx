import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MUIWrapperContext } from "../contexts/mui-theme-wrapper";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useTheme } from "@mui/material";


export default function ButtonAppBar() {

  const theme = useTheme()

  const {toggleColorMode} = useContext(MUIWrapperContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ⚡ Sensor Home ⚡
          </Typography>
          <IconButton
          onClick={toggleColorMode}

          >
{theme.palette.mode === 'dark' ? <LightMode/> : <DarkMode sx={{color: '#fff'}}/>}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
