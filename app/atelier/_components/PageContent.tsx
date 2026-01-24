'use client'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import index from './index.json'

export default function PageContent() {
  return (
    <Box>
      <Box component='ul' sx={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {index.map((item) => (
          <MuiLink key={item.title} component={Link} href={item.path} color='inherit' underline='hover'>
            <Box
              component='li'
              sx={{
                padding: '12px 0',
                display: { xs: 'block', sm: 'flex' },
                alignItems: 'center',
                gap: '8px',
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <Typography component='h4' variant='h4' sx={{ flex: '0 0 256px' }}>
                {item.title}
              </Typography>
              <Typography component='p' variant='body1' sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                {item.description}
              </Typography>
            </Box>
          </MuiLink>
        ))}
      </Box>
    </Box>
  )
}
