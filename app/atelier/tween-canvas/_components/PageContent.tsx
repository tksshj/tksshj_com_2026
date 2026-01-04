'use client'
import Box from '@mui/material/Box'
import TWEEN from '@tweenjs/tween.js'
import { useEffect, useRef } from 'react'

const WIDTH = 1024
const HEIGHT = 1024
const DURATION = 4000

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

    const state = { value: 0 }
    const tween = new TWEEN.Tween(state)
      .to({ value: 1 }, DURATION)
      .easing(TWEEN.Easing.Bounce.Out)
      .onUpdate(() => {
        context.clearRect(0, 0, WIDTH, HEIGHT)

        context.fillStyle = '#1e2636'
        context.fillRect(0, 0, WIDTH, HEIGHT)

        context.fillStyle = '#e91e63'
        const w = WIDTH * 0.8
        const l = WIDTH * 0.1 + w * state.value * 0.5
        context.fillRect((WIDTH - l) * 0.5, (WIDTH - l) * 0.5, l, l)
      })
      .onComplete(() => {
        console.log('done')
      })
      .start()

    let raf = 0
    let startTime = performance.now()
    const draw = (now: number) => {
      const elapsed = now - startTime
      const reverse = 1 <= (elapsed % (DURATION * 2)) / DURATION
      const time = reverse ? DURATION - (elapsed % DURATION) : elapsed % DURATION
      tween.update(time)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Box sx={{ padding: '20px 0 0' }}>
      <Box component='canvas' ref={canvasRef} sx={{ width: '100%' }} />
    </Box>
  )
}
