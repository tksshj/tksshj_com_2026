'use client'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Box from '@mui/material/Box'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Canvas from './Canvas'

export default function PageContent() {
  const nLvh = 5
  const lvhRef = useRef(0)
  const posRef = useRef(0)
  const iconContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const [canvasKey, setCanvasKey] = useState(Date.now())
  const resizeTimerRef = useRef<number | null>(null)

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
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useLayoutEffect(() => {
    const element = canvasContainerRef.current
    if (!element) {
      return
    }
    const observer = new ResizeObserver(() => {
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current)
      }
      resizeTimerRef.current = window.setTimeout(() => {
        setCanvasKey(Date.now())
        resizeTimerRef.current = null
      }, 150)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current)
      }
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
        ref={canvasContainerRef}
        sx={{
          position: 'sticky',
          left: '0',
          top: '0',
          width: '100vw',
          height: '100lvh',
          overflow: 'hidden',
        }}
      >
        <Canvas key={canvasKey} posRef={posRef} />
      </Box>
    </Box>
  )
}
