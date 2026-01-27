'use client'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import Canvas from './Canvas'

export default function PageContent() {
  const [wPos, setWPos] = useState(100)
  const [hPos, setHPos] = useState((1080 / 1920) * 100)

  return (
    <Box sx={{ width: '100%', padding: '20px 0 0' }}>
      <Canvas w={wPos * 1920 * 0.01} h={hPos * 1920 * 0.01} />
      <Box sx={{ margin: '40px 0 20px', display: 'flex', alignItems: 'center' }}>
        <Slider value={wPos} onChange={(_, newValue) => setWPos(newValue)} sx={{ flex: '0 0 90%' }} />
        <Typography component='p' variant='h1' sx={{ flex: '1 1 30%', textAlign: 'right' }}>
          {wPos * 0.01 * 1920}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Slider value={hPos} onChange={(_, newValue) => setHPos(newValue)} sx={{ flex: '0 0 90%' }} />
        <Typography component='p' variant='h1' sx={{ flex: '1 1 30%', textAlign: 'right' }}>
          {hPos * 0.01 * 1920}
        </Typography>
      </Box>
    </Box>
  )
}
