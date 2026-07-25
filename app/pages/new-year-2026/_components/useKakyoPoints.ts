'use client'
import { useEffect, useRef, useState } from 'react'

export type Vec3 = { x: number; y: number; z: number }

const TARGET_POINTS = 5000
const TEXT = '佳境'

export default function useCanvasMaskPoints() {
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
      const width = window.innerWidth
      const height = window.innerHeight
      const fontSize = height * 0.25

      canvas.width = width
      canvas.height = height
      context.clearRect(0, 0, width, height)

      context.fillStyle = '#1e2636'
      context.font = `${fontSize}px "Hina Mincho", serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const chars = TEXT.split('')
      const centerX = width / 2
      const centerY = height / 2
      const lineHeight = fontSize * 1.25
      const startY = centerY - ((chars.length - 1) * lineHeight) / 2 - height * 0.0525

      chars.forEach((char, i) => {
        context.fillText(char, centerX, startY + i * lineHeight)
      })

      const imageData = context.getImageData(0, 0, width, height)
      const data = imageData.data
      const raw: { x: number; y: number }[] = []
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4
          if (data[i + 3] > 0) {
            raw.push({ x, y })
          }
        }
      }
      const ratio = TARGET_POINTS / raw.length
      const sampled = raw.filter(() => Math.random() < ratio)

      const normalized: Vec3[] = sampled.map((p) => {
        let x = (p.x / width) * 2 - 1
        let y = -(p.y / height) * 2 + 1
        return { x, y, z: 0 }
      })

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
