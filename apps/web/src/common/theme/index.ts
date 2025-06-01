import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    row: {
      odd: string;
      even: string;
      hover: string;
    };
    state: {
      selected: string;
      inserted: string;
      updated: string;
    };
    threat: {
      high: string;
      medium: string;
      low: string;
    };
  }
  interface PaletteOptions {
    row?: {
      odd: string;
      even: string;
      hover: string;
    };
    threat?: {
      high: string;
      medium: string;
      low: string;
    };
    state?: {
      selected: string;
      inserted: string;
      updated: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#f1f5f9',
    },
    primary: {
      main: '#4a7c89',
    },
    background: {
      default: '#f0f4f7',
    },
    threat: {
      high: '#b91c1c',
      medium: '#d97706',
      low: '#15803d',
    },
    row: {
      odd: '#38414e',
      even: '#323b47',
      hover: '#4b5563',
    },
    state: {
      selected: 'rgba(30, 64, 175, 0.4)',
      inserted: 'rgba(20, 83, 45, 0.4)',
      updated: 'rgba(146, 64, 14, 0.4)',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      fontWeight: 600,
    },
  },
});

export default theme;
