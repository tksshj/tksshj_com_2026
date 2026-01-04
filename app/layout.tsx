import theme from '@/app/_common/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { Metadata } from 'next'
import { Hina_Mincho, Noto_Sans_JP } from 'next/font/google'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-not-sans-jp',
})

const hinaMincho = Hina_Mincho({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-hina-mincho',
})

export const metadata: Metadata = {
  title: 'tksshj.com',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' className={hinaMincho.variable}>
      <body className={notoSansJp.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
