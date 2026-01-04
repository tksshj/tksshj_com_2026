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
    hover: hepeuNavy[50],
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
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2.0rem',
          fontWeight: '400',
          lineHeight: 1.5,
        },
        h2: {
          fontSize: '1.5rem',
          fontWeight: '400',
          lineHeight: 1.5,
        },
        h3: {
          fontSize: '1.25rem',
          fontWeight: '600',
          lineHeight: 1.5,
        },
        h4: {
          fontSize: '1.05rem',
          fontWeight: '600',
          lineHeight: 1.5,
        },
        h5: {
          fontSize: '0.9rem',
          fontWeight: '600',
          lineHeight: 1.5,
        },
        h6: {
          fontSize: '0.75rem',
          fontWeight: '600',
          lineHeight: 1.5,
        },
        body1: {
          fontSize: '0.9rem',
          lineHeight: '1.5em',
        },
        body2: {
          fontSize: '0.75rem',
          lineHeight: '1.5em',
        },
        caption: {
          fontSize: '0.65rem',
          lineHeight: '1em',
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
