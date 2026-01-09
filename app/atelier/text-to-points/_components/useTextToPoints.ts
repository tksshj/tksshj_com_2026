'use client'
import { useEffect, useRef, useState } from 'react'

export type Vec3 = { x: number; y: number; z: number }

const WIDTH = 1024
const HEIGHT = 1024
const FONTSIZE = 256
const TARGET_POINTS = 5000

export default function useTextToPoints(text: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [points, setPoints] = useState<Vec3[]>([])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      await document.fonts.ready
      if (cancelled) {
        return
      }
      const canvas = document.createElement('canvas')
      canvasRef.current = canvas
      const context = canvas.getContext('2d')
      if (!context) {
        return
      }
      canvas.width = WIDTH
      canvas.height = HEIGHT
      context.clearRect(0, 0, WIDTH, HEIGHT)

      context.fillStyle = '#1e2636'
      context.font = `${FONTSIZE}px "Hina Mincho", serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(text, WIDTH * 0.5, HEIGHT * 0.5)

      const imageData = context.getImageData(0, 0, WIDTH, HEIGHT)
      const data = imageData.data
      const raw: { x: number; y: number }[] = []
      for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
          const i = (y * WIDTH + x) * 4
          if (data[i + 3] > 0) {
            raw.push({ x, y })
          }
        }
      }
      const ratio = TARGET_POINTS / raw.length
      const sampled = raw.filter(() => Math.random() < ratio)

      const normalized: Vec3[] = sampled.map((p) => ({
        x: (p.x / WIDTH) * 2 - 1,
        y: -(p.y / HEIGHT) * 2 + 1,
        z: 0,
      }))

      if (!cancelled) {
        setPoints(normalized)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return {
    canvas: canvasRef.current,
    points: points,
  }
}
