'use client'
import Breadcrumbs from '@/app/_common/Breadcrumbs'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function PagesPage({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth={false}>
      <Box
        component='header'
        sx={{
          position: 'sticky',
          left: '0',
          top: '0',
          height: '64px',
          zIndex: '100',
        }}
      >
        <MuiLink component={Link} href='/' underline='none'>
          <Typography component='div' variant='h1' sx={{ fontWeight: '300', lineHeight: '64px' }}>
            tksshj.com
          </Typography>
        </MuiLink>
        <Breadcrumbs />
      </Box>
      <Box component='main' sx={{ position: 'relative', margin: '-64px 0 0' }}>
        <Box sx={{ position: 'relative' }}>{children}</Box>
      </Box>
    </Container>
  )
}
