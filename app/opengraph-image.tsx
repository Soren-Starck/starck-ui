import { ImageResponse } from "next/og"

import { OgCard, ogSize } from "@/components/og/og-card"
import { components } from "@/lib/components"

export const alt = "STARCK UI: shadcn/ui components from shipped products"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Open source"
      title="The components we use to ship software."
      description={`${components.length} shadcn/ui components taken from products that shipped. Open code, installable with the shadcn CLI.`}
      command="pnpm dlx shadcn@latest add @starck/..."
    />,
    size
  )
}
