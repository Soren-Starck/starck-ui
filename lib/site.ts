export const siteUrl = "https://ui.starck.studio"
export const repoUrl = "https://github.com/Soren-Starck/starck-ui"
export const siteName = "STARCK UI"

/** Serialize JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") }
}
