import { redirect } from "next/navigation"

const DEFAULT_SECTION = "kham-pha"

export default function VideoPageRoot() {
  redirect(`/video/${DEFAULT_SECTION}`)
}
