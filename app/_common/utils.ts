import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export function useIsMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}

export function isMobileByUserAgent() {
  if (typeof navigator === 'undefined') {
    return false
  }
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}
