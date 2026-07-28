import PagesPage from '@/app/pages/_common/PagesPage'
import { Metadata } from 'next'
import PageContent from './_components/PageContent'
import metadataJson from './_components/metadata.json'

export const metadata: Metadata = {
  title: `${metadataJson.title} | pages | tksshj.com`,
  description: metadataJson.description,
}

export default function Page() {
  return (
    <PagesPage>
      <PageContent />
    </PagesPage>
  )
}
