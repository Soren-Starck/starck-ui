import type { MetadataRoute } from "next"

import { components } from "@/lib/components"
import { siteUrl } from "@/lib/site"

// lastModified comes from each component's `updated` date. The home page lists
// every component's description, so it changes whenever one of them does. The
// getting-started page has no tracked date, so it carries none.
const latestComponentUpdate = components
  .map(({ updated }) => updated)
  .reduce((latest, updated) => (updated > latest ? updated : latest))

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: latestComponentUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/getting-started`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...components.map(({ slug, updated }) => ({
      url: `${siteUrl}/components/${slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
