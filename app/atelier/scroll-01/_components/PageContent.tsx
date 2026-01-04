'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'

export default function PageContent() {
  const nLvh = 5
  const lvhRef = useRef(0)
  const posRef = useRef(0)
  const [pos, setPos] = useState(0)

  const handleScroll = () => {
    if (lvhRef.current == 0) {
      return
    }
    posRef.current = window.scrollY / (lvhRef.current * nLvh)
    setPos(posRef.current)
  }

  useEffect(() => {
    const docEl = document.documentElement
    const scrollableHeight = docEl.scrollHeight - docEl.clientHeight
    lvhRef.current = scrollableHeight / nLvh

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        height: `${100 * nLvh}lvh`,
      }}
    >
      <Box
        component='main'
        sx={{
          position: 'sticky',
          left: '0',
          top: '80px',
          width: '100%',
          height: 'calc(100lvh - 80px)',
          overflow: 'hidden',
        }}
      >
        <Typography component='p' variant='h1' sx={{ margin: '20lvh 0 0' }}>
          {pos}
        </Typography>
      </Box>
    </Box>
  )
}
