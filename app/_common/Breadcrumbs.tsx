import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <MuiBreadcrumbs aria-label='breadcrumb' sx={{ margin: '8px 0' }}>
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        const isLast = index === segments.length - 1

        return isLast ? (
          <Typography key={href} color='text.primary'>
            {decodeURIComponent(segment)}
          </Typography>
        ) : (
          <MuiLink key={href} component={Link} href={href} color='inherit'>
            {decodeURIComponent(segment)}
          </MuiLink>
        )
      })}
    </MuiBreadcrumbs>
  )
}
