import { redirect } from "next/navigation"

const DEFAULT_SECTION = "explore"

export default function VideoPageRoot() {
  redirect(`/video/${DEFAULT_SECTION}`)
}
