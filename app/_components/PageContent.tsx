'use client'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import Canvas from '../atelier/new-year-2026-06/_components/Canvas'

export default function PageContent() {
  const [w, setW] = useState(0)
  const [h, setH] = useState(0)
  const nPoints = 50

  useEffect(() => {
    setW(window.innerWidth * 0.2)
    setH(window.innerHeight * 0.2)
  }, [])

  return <Box>{0 < w && 0 < h && <Canvas w={w} h={h} nPoints={nPoints * 0.01 * 8192} />}</Box>
}
