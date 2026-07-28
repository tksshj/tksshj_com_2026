'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Canvas from './Canvas'

export default function PageContent() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '500lvh',
        background: 'linear-gradient(182deg, #00000000, #00000000, #000000E0, #00000000)',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100vw',
          height: '100dvh',
        }}
      >
        <Canvas />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100vw',
          height: { xs: '80lvh', md: '85lvh' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mixBlendMode: 'overlay',
        }}
      >
        <Typography
          component='h1'
          variant='h1'
          sx={{
            fontWeight: '900',
            fontSize: `20vmin`,

            animation: 'fadeIn 2s ease-out forwards',
            '@keyframes fadeIn': {
              '0%': {
                opacity: '0',
                transform: 'translateY(3vmin) scale(0.9)',
              },
              '10%': {
                opacity: '0.2',
                transform: 'translateY(0), scale(1.0)',
              },
              '20%': {
                opacity: '0.4',
              },
              '100%': {
                opacity: '0.6',
                transform: 'translateY(0), scale(1.0)',
              },
            },
          }}
        >
          HEPEU
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          right: '8px',
          bottom: '16px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'column',
          textAlign: 'right',
          color: 'white',
          filter: 'drop-shadow(0 0 0.3rem rgba(0, 0.04, 0.04, 0.5))',
        }}
      >
        <Typography component='h1' variant='h1' sx={{ fontSize: { xs: '20px', md: '24px' }, margin: '0 0 0.25em' }}>
          へペウ合同会社
        </Typography>
        <Typography component='h2' variant='h2' sx={{ fontSize: { xs: '12px', md: '14px' } }}>
          ソフトウェア受託開発
        </Typography>
        <Typography component='p' variant='body1' sx={{ fontSize: { xs: '12px', md: '14px' }, margin: '0.5em 0' }}>
          info@hepeu.com
        </Typography>
        <Typography component='p' variant='body1' sx={{ fontSize: { xs: '10px', md: '12px' } }}>
          〒150-0031
          <br />
          東京都渋谷区桜丘町23-17
          <br />
          シティコート桜丘408
        </Typography>
      </Box>
    </Box>
  )
}
