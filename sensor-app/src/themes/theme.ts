import { PaletteMode } from '@mui/material';
import {createTheme} from '@mui/material/styles'
import { Theme, ThemeOptions } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface CustomTheme extends Theme {
      chart: {
        ticks: string;
        gridLines: string;
        title: string;
      };
    }
 
    interface CustomThemeOptions extends ThemeOptions {
      chart?: {
        ticks?: string;
        gridLines?: string;
        title?: string;
      };
    }
 
    // export function createTheme(options?: CustomThemeOptions): CustomTheme;
  }
 


export const createChartTheme = (mode: PaletteMode) => {

    return createTheme(
      {
        palette: {
          mode,
        },
      },
      {
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
