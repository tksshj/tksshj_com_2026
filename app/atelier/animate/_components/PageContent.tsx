'use client'
import { Box, Button } from '@mui/material'
import { useRef, useState } from 'react'

export default function PageContent() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [clicked, setClicked] = useState(false)

  const handleButtonClick = () => {
    if (!buttonRef.current) {
      return
    }
    const from = clicked ? '100px' : '0px'
    const to = clicked ? '0px' : '100px'
    buttonRef.current.animate([{ transform: `translateY(${from})` }, { transform: `translateY(${to})` }], {
      duration: 250,
      easing: 'ease-out',
      fill: 'forwards',
    })
    setClicked((current) => !current)
  }

  return (
    <Box sx={{ padding: '40px 0' }}>
      <Button ref={buttonRef} variant='contained' onClick={handleButtonClick}>
        Button
      </Button>
    </Box>
  )
}
