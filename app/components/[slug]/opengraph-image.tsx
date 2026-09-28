import { ImageResponse } from "next/og"

import { OgCard, ogSize } from "@/components/og/og-card"
import { components, getComponent } from "@/lib/components"

export const alt = "STARCK UI component"
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = getComponent(slug)
  return new ImageResponse(
    <OgCard
      eyebrow="Component for shadcn/ui"
      title={component?.title ?? "STARCK UI"}
      description={
        component?.description ?? "Components from products that shipped."
      }
      command={`pnpm dlx shadcn@latest add @starck/${slug}`}
    />,
    size
  )
}
