import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export type IndexItem = {
  path: string
  title: string
  description: string
}

export type Index = IndexItem[]

export default function PageIndex({ index, isHome = false }: { index: Index; isHome?: boolean }) {
  return (
    <Box component='nav'>
      <Box component='ul' sx={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {index.map((item) => (
          <Box
            key={item.title}
            component='li'
            sx={{
              padding: '12px 0',
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              '&:first-child': {
                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
              },
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <MuiLink
              component={Link}
              href={item.path}
              color='inherit'
              underline='hover'
              sx={{
                display: { xs: isHome ? 'flex' : 'block', sm: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Typography component='h4' variant='h4'>
                {item.title}
              </Typography>
              <Typography component='p' variant='body1' sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                {item.description}
              </Typography>
            </MuiLink>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
