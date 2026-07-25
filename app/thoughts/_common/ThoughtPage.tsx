'use client'
import Breadcrumbs from '@/app/_common/Breadcrumbs'
import Header from '@/app/_common/Header'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ReactNode } from 'react'

export default function ThoughtPage({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth='md'>
      <Header />
      <Breadcrumbs />
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
