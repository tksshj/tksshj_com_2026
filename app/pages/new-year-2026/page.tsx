import { Metadata } from 'next'
import PageContent from './_components/PageContent'

const title = '書き初め - tksshj.com'

export const metadata: Metadata = {
  title: `${title} - tksshj.com`,
}

export default function Page() {
  return <PageContent />
}
