'use client'

import { alpha, createTheme, PaletteOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string
      subtle: string
    }
  }
  interface PaletteOptions {
    accent?: {
      main: string
      subtle: string
    }
  }
}

export const hepeuNavy = {
  50: '#f4f5f7',
  100: '#e4e7ec',
  200: '#c7cdd6',
  300: '#a3adbc',
  400: '#7a889d',
  500: '#5b677d',
  600: '#434f66',
  700: '#2f394d',
  800: '#1e2636',
  900: '#0f1420',
}

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: hepeuNavy[600],
    light: hepeuNavy[400],
    dark: hepeuNavy[800],
    contrastText: '#ffffff',
  },
  accent: {
    main: '#e91e63',
    subtle: alpha('#e91e63', 0.04),
  },
  background: {
    default: hepeuNavy[100],
    paper: '#ffffff',
  },
  text: {
    primary: hepeuNavy[800],
    secondary: hepeuNavy[600],
    disabled: hepeuNavy[400],
  },
  divider: hepeuNavy[200],
  action: {
    hover: 'rgb(0 0 0 / 0.05)', // hepeuNavy[50],
    selected: 'rgba(0,0,0,0.08)',
    disabled: 'rgba(0,0,0,0.26)',
    disabledBackground: alpha(hepeuNavy[100], 0.75),
  },
}

const theme = createTheme({
  cssVariables: true,
  palette: palette,
  typography: {
    fontFamily: 'var(--font-noto-sans-jp)',
    htmlFontSize: 16,
    fontSize: 13,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: (theme) => ({
    //     html: {
    //       fontSize: '14px',
    //       [theme.breakpoints.up('md')]: {
    //         fontSize: '16px',
    //       },
    //     },
    //   }),
    // },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '1.8rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        h2: {
          fontSize: '1.5rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        h3: {
          fontSize: '1.3rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        h4: {
          fontSize: '1.1rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        h5: {
          fontSize: '1.0rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        h6: {
          fontSize: '0.8rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        body1: {
          fontSize: '1.0rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.85rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
        caption: {
          fontSize: '0.7rem',
          fontWeight: '300',
          lineHeight: 1.5,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '14px',
          '@media (max-width:600px)': {
            fontSize: '16px',
          },
        },
      },
    },
  },
})

export default theme
