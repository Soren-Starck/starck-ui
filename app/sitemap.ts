import type { MetadataRoute } from "next"

import { components } from "@/lib/components"

const siteUrl = "https://ui.starck.studio"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/guide` },
    ...components.map(({ slug }) => ({
      url: `${siteUrl}/components/${slug}`,
    })),
  ]
}
