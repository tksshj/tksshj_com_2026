'use client'
import Box from '@mui/material/Box'
import Canvas from './Canvas'

export default function PageContent() {
  return (
    <Box sx={{ width: '100%', padding: '24px 0 0' }}>
      <Canvas />
    </Box>
  )
}
