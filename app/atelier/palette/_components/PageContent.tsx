'use client'
import theme, { hepeuNavy } from '@/app/_common/theme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const items = [
  { color: theme.palette.primary.main, text: 'theme.palette.primary.main' },
  { color: theme.palette.primary.light, text: 'theme.palette.primary.light' },
  { color: theme.palette.primary.dark, text: 'theme.palette.primary.dark' },
  { color: theme.palette.accent.main, text: 'theme.palette.accent.main' },
  { color: theme.palette.accent.subtle, text: 'theme.palette.accent.subtle' },
  { color: theme.palette.background.default, text: 'theme.palette.background.default' },
  { color: theme.palette.background.paper, text: 'theme.palette.background.paper' },
  { color: theme.palette.text.primary, text: 'theme.palette.text.primary' },
  { color: theme.palette.text.secondary, text: 'theme.palette.text.secondary' },
  { color: theme.palette.text.disabled, text: 'theme.palette.text.disabled' },
  { color: theme.palette.divider, text: 'theme.palette.divider' },
  { color: theme.palette.action.hover, text: 'theme.palette.action.hover' },
  { color: theme.palette.action.selected, text: 'theme.palette.action.selected' },
  { color: theme.palette.action.disabled, text: 'theme.palette.action.disabled' },
  { color: theme.palette.action.disabledBackground, text: 'theme.palette.action.disabledBackground' },
  { color: hepeuNavy[50], text: 'hepeuNavy[50]' },
  { color: hepeuNavy[100], text: 'hepeuNavy[100]' },
  { color: hepeuNavy[200], text: 'hepeuNavy[200]' },
  { color: hepeuNavy[300], text: 'hepeuNavy[300]' },
  { color: hepeuNavy[400], text: 'hepeuNavy[400]' },
  { color: hepeuNavy[500], text: 'hepeuNavy[500]' },
  { color: hepeuNavy[600], text: 'hepeuNavy[600]' },
  { color: hepeuNavy[700], text: 'hepeuNavy[700]' },
  { color: hepeuNavy[800], text: 'hepeuNavy[800]' },
  { color: hepeuNavy[900], text: 'hepeuNavy[900]' },
]

export default function PageContent() {
  return (
    <Box sx={{ margin: '20px 0', padding: '16px', backgroundColor: 'white' }}>
      {items.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '8px',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          <Box sx={{ flex: '0 0 80px', aspectRatio: '1', backgroundColor: item.color }} />
          <Typography component='h3' variant='h3' sx={{ flex: '0 0 256px' }}>
            {item.color}
          </Typography>
          <Typography component='h3' variant='h3'>
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
