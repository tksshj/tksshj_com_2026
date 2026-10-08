import ThoughtPage from '@/app/thoughts/_common/ThoughtPage'
import type { Metadata } from 'next'
import PageContent from './_components/PageContent'
import metadataJson from './_components/metadata.json'

export const metadata: Metadata = {
  title: `${metadataJson.title} | thoughts | tksshj.com`,
  description: metadataJson.description,
}

export default function page() {
  return (
    <ThoughtPage>
      <PageContent />
    </ThoughtPage>
  )
}
