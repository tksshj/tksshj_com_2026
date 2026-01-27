import ThoughtPage from '@/app/thoughts/_common/ThoughtPage'
import type { Metadata } from 'next'
import PageContent from './_components/PageContent'

export const metadata: Metadata = {
  title: 'atelier | tksshj.com',
}

export default function page() {
  return (
    <ThoughtPage>
      <PageContent />
    </ThoughtPage>
  )
}
