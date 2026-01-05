'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TWEEN from '@tweenjs/tween.js'
import { useEffect, useState } from 'react'

export default function PageContent() {
  const [pos, setPos] = useState(0)

  useEffect(() => {
    const state = { value: 0 }
    const tween = new TWEEN.Tween(state)
      .to({ value: 1 }, 10000)
      .easing(TWEEN.Easing.Elastic.Out)
      .onUpdate(() => {
        setPos(state.value)
      })
      .onComplete(() => {
        console.log('done')
      })
      .start(0)

    let raf = 0
    let startTime = performance.now()
    const draw = (now: number) => {
      const elapsed = (now - startTime) % 10000
      tween.update(elapsed)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Box>
      <Typography component='p' variant='h1' sx={{ margin: '20lvh 0 0' }}>
        {pos}
      </Typography>
    </Box>
  )
}
