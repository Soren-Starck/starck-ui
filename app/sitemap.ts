import type { MetadataRoute } from "next"

import { components } from "@/lib/components"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/getting-started`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...components.map(({ slug }) => ({
      url: `${siteUrl}/components/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
