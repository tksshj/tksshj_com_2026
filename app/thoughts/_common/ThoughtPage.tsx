'use client'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function ThoughtPage({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <Container maxWidth='md'>
      <Box
        component='header'
        sx={{
          position: 'sticky',
          left: '0',
          top: '0',
          height: '80px',
          zIndex: '100',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <MuiLink component={Link} href='/' underline='none'>
          <Typography component='h1' variant='h1' sx={{ fontWeight: '300' }}>
            tksshj.com
          </Typography>
        </MuiLink>
        <Breadcrumbs aria-label='breadcrumb'>
          {segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/')
            const isLast = index === segments.length - 1

            return isLast ? (
              <Typography key={href} color='text.primary'>
                {decodeURIComponent(segment)}
              </Typography>
            ) : (
              <MuiLink key={href} component={Link} href={href} color='inherit'>
                {decodeURIComponent(segment)}
              </MuiLink>
            )
          })}
        </Breadcrumbs>
      </Box>
      <Box
        component='main'
        sx={{
          article: {
            padding: '4px 0',
            h1: {
              margin: '1em 0',
              fontSize: '24px',
              fontWeight: '300',
            },
            p: {
              margin: '1em 0',
              fontSize: '16px',
              fontWeight: '300',
              lineHeight: '2em',
              letterSpacing: '0.01em',
            },
          },
        }}
      >
        {children}
      </Box>
    </Container>
  )
}
