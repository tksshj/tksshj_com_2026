'use client'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import index from './index.json'

export default function PageContent() {
  return (
    <Box>
      <Box component='ul'>
        {index.map((item) => (
          <Box key={item.title} component='li' sx={{ margin: '0 0 16px' }}>
            <MuiLink component={Link} href={item.path} color='inherit'>
              <Typography component='p' variant='body1'>
                {item.title}
              </Typography>
            </MuiLink>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
