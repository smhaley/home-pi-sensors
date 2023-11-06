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

   export function createTheme(options?: CustomThemeOptions): CustomTheme;
 }
