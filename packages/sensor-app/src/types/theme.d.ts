 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import { ThemeOptions, Theme } from '@mui/material/styles';

 declare module '@mui/material/styles' {
   interface ThemeOptions {
     chart: {
       ticks: string;
       gridLines: string;
       title: string;
     };
   }

   interface Theme {
    chart: {
      ticks: string;
      gridLines: string;
      title: string;
    };
  }

  //  interface CustomThemeOptions extends ThemeOptions {
  //    chart?: {
  //      ticks?: string;
  //      gridLines?: string;
  //      title?: string;
  //    };
  //  }

  //  export function createTheme(options?: CustomThemeOptions): CustomTheme;
 }
