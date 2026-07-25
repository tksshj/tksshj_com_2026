'use client'
import Breadcrumbs from '@/app/_common/Breadcrumbs'
import Header from '@/app/_common/Header'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function AtelierPage({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const githubUrl = `https://github.com/tksshj/tksshj_com_2026/tree/main/app${pathname}`

  return (
    <Container maxWidth='md'>
      <Header />
      <Box component='main'>
        <Breadcrumbs />
        <Box>{children}</Box>
        <Typography component='p' variant='body1' sx={{ margin: '64px 0 24px', textAlign: 'right' }}>
          <MuiLink href={githubUrl} target='_blank' rel='noopener noreferrer'>
            src
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  )
}
