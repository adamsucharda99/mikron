import { extendTheme } from '@mui/joy';

declare module '@mui/joy/styles' {
  interface Palette {
    mikron: string;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mikron: '#012F87',
      },
    },
  },
});
