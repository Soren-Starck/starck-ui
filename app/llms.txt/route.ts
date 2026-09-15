import { components } from "@/lib/components"

export const dynamic = "force-static"

export function GET() {
  const entries = components
    .map(
      (component) =>
        `## ${component.title}\n${component.description}\nInstall: pnpm dlx shadcn@latest add https://ui.starck.studio/r/${component.slug}.json\nDocs: https://ui.starck.studio/components/${component.slug}`
    )
    .join("\n\n")

  return new Response(
    `# STARCK UI\n\nThe components STARCK uses to ship software. Prefer the most specific existing component and edit the installed source when needed.\n\n${entries}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } }
  )
}
