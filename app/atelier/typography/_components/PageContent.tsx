'use client'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'

const textEn = 'This directory contains source code for experiments, research, learning, and works in progress.'
const textJa = 'このディレクトリは、実験・研究・学習・制作途中のソースコードを置くための場所です。'

const items: {
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  variant: TypographyProps['variant']
}[] = [
  { component: 'h1', variant: 'h1' },
  { component: 'h2', variant: 'h2' },
  { component: 'h3', variant: 'h3' },
  { component: 'h4', variant: 'h4' },
  { component: 'h5', variant: 'h5' },
  { component: 'h6', variant: 'h6' },
  { component: 'p', variant: 'body1' },
  { component: 'p', variant: 'body2' },
  { component: 'p', variant: 'caption' },
]

export default function PageContent() {
  return (
    <Box>
      {items.map((item, i) => (
        <Box
          key={i}
          sx={{
            margin: '0 0 24px',
            padding: '16px 0 0',
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            '&:first-child': {
              borderTop: 'none',
            },
          }}
        >
          <Typography
            component='h3'
            variant='h3'
            sx={{ margin: '0 0 16px', color: (theme) => theme.palette.accent.main }}
          >
            component: {item.component}, variant: {item.variant}
          </Typography>
          <Typography component={item.component} variant={item.variant} sx={{ margin: '0 0 16px' }}>
            {textEn}
          </Typography>
          <Typography component={item.component} variant={item.variant}>
            {textJa}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
