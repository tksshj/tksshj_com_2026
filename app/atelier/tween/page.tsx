import AtelierPage from '@/app/atelier/_common/AtelierPage'
import type { Metadata } from 'next'
import PageContent from './_components/PageContent'

export const metadata: Metadata = {
  title: 'scroll | tksshj.com/atelier',
}

export default function page() {
  return (
    <AtelierPage>
      <PageContent />
    </AtelierPage>
  )
}
