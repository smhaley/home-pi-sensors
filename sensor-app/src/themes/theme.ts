import { PaletteMode } from '@mui/material';
import {createTheme} from '@mui/material/styles'


export const createChartTheme = (mode: PaletteMode) => {

    return createTheme(
      {
        palette: {
          mode,
        },
        chart: (mode === 'dark') ? {
          ticks: '#fff',
          gridLines: '#6b6a6a',
          title: '#fff',
        } : {
          ticks: 'gba(0, 0, 0, 0.87)',
          gridLines: 'lightgrey',
          title: 'rgba(0, 0, 0, 0.87)',
        }
      }
    );
  }
