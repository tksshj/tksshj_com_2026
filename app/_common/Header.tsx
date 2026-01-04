'use client'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Header() {
  return (
    <Box
      component='header'
      sx={{
        position: 'fixed',
        left: '0',
        top: '0',
        height: '80px',
        zIndex: '100',
      }}
    >
      <MuiLink component={Link} href='/' underline='none'>
        <Typography component='h1' variant='h1' sx={{ fontSize: '32px' }}>
          tksshj.com
        </Typography>
      </MuiLink>
    </Box>
  )
}
