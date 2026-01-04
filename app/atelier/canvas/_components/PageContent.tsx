'use client'
import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'

const WIDTH = 1024
const HEIGHT = 1024

export default function PageContent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }
    canvas.width = WIDTH
    canvas.height = HEIGHT
    context.clearRect(0, 0, WIDTH, HEIGHT)

    context.fillStyle = '#1e2636'
    context.fillRect(0, 0, WIDTH, HEIGHT)

    context.fillStyle = '#e91e63'
    context.fillRect(100, 100, 100, 100)
  }, [canvasRef])

  return (
    <Box sx={{ padding: '24px' }}>
      <Box component='canvas' ref={canvasRef} sx={{ width: '100%' }} />
    </Box>
  )
}
