'use client'
import Header from '@/app/_common/Header'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Link from 'next/link'
import Canvas from '../atelier/polar-coordinates-02/_components/Canvas'

export default function PageContent() {
  return (
    <Container maxWidth='md'>
      <Header />
      <Box component='main'>
        <MuiLink component={Link} href='./atelier/polar-coordinates-02'>
          <Canvas />
        </MuiLink>
      </Box>
    </Container>
  )
}
