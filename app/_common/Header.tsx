'use client'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <Box
      component='header'
      sx={{
        position: 'sticky',
        left: '0',
        top: '0',
        height: '64px',
        zIndex: '100',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <MuiLink component={Link} href='/' underline='none'>
        <Typography component={isHome ? 'h1' : 'div'} variant='h1' sx={{ fontWeight: '300', lineHeight: '64px' }}>
          tksshj.com
        </Typography>
      </MuiLink>
    </Box>
  )
}
