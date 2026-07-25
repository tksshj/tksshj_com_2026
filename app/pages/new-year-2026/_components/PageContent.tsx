'use client'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import Canvas from './Canvas'

export default function PageContent() {
  const nLvh = 5
  const lvhRef = useRef(0)
  const posRef = useRef(0)
  const iconContainerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    if (lvhRef.current == 0) {
      return
    }
    posRef.current = Math.min(1.0, window.scrollY / (lvhRef.current * nLvh * 0.9))
    if (0.05 < posRef.current && iconContainerRef.current) {
      iconContainerRef.current.style.display = 'none'
    }
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
        ref={iconContainerRef}
        sx={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100vw',
          height: '100vh',
          zIndex: '100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowDownwardIcon sx={{ fontSize: '20vw', color: 'white' }} />
      </Box>

      <span
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          fontFamily: '"Hina Mincho", serif',
        }}
      >
        佳境
      </span>
      <Box
        sx={{
          position: 'sticky',
          left: '0',
          top: '0',
          width: '100vw',
          height: '100lvh',
          overflow: 'hidden',
        }}
      >
        <Canvas posRef={posRef} />
      </Box>
    </Box>
  )
}
