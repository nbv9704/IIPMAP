import ZoneDetailPageClient from "./ZoneDetailPageClient"

type ZonePageParams = { slug?: string | string[] }

export default function ZoneDetailPage({ params }: { params: ZonePageParams }) {
  return <ZoneDetailPageClient params={params} />
}
