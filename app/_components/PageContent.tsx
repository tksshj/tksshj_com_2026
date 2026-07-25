'use client'
import Header from '@/app/_common/Header'
import PageIndex, { Index } from '@/app/_common/PageIndex'
import Canvas from '@/app/atelier/polar-coordinates-02/_components/Canvas'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiLink from '@mui/material/Link'
import Link from 'next/link'

const index: Index = [
  {
    path: '/pages/new-year-2026',
    title: 'new-year-2026',
    description: '書き初めです。',
  },
  {
    path: '/atelier',
    title: 'atelier/',
    description: 'お絵描き的なものです。',
  },
  {
    path: '/thought',
    title: 'thought/',
    description: 'テキストです。お気持ちです。',
  },
  {
    path: '/pages',
    title: 'pages/',
    description: 'それ以外のいろいろです。',
  },
]

export default function PageContent() {
  return (
    <Container maxWidth='md'>
      <Header />
      <Box component='main'>
        <MuiLink component={Link} href='./atelier/polar-coordinates-02'>
          <Canvas />
        </MuiLink>
      </Box>
      <PageIndex index={index} isHome />
    </Container>
  )
}
