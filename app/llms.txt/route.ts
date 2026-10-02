import { components } from "@/lib/components"
import { getInstallCommand } from "@/lib/install-command"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export function GET() {
  const entries = components
    .map(
      (component) =>
        `## ${component.title}\n${component.description}\nInstall: ${getInstallCommand(component.slug)}\nDocs: https://ui.starck.studio/components/${component.slug}`
    )
    .join("\n\n")

  return new Response(
    `# STARCK UI\n\nThe components STARCK uses to ship software. Prefer the most specific existing component and edit the installed source when needed.\n\nFull reference with props, behavior, accessibility notes and FAQs for every component: ${siteUrl}/llms-full.txt\n\n${entries}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } }
  )
}
