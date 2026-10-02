import { getComponentProvenance } from "@/lib/component-provenance.generated"
import { components, type ComponentEntry } from "@/lib/components"
import { getInstallCommand } from "@/lib/install-command"
import { getComponentDependencies } from "@/lib/registry-dependencies"
import { repoUrl, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

function bullets(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n")
}

function componentSection(component: ComponentEntry) {
  const { packages, components: registryComponents } = getComponentDependencies(
    component.slug
  )
  const dependencies = [...packages, ...registryComponents]
  const usedIn = getComponentProvenance(component.slug).map(({ name }) => name)
  const guide = component.guide

  return [
    `## ${component.title}`,
    component.summary,
    [
      `Docs: ${siteUrl}/components/${component.slug}`,
      `Install: ${getInstallCommand(component.slug)}`,
      `Also installs: ${dependencies.length > 0 ? dependencies.join(", ") : "nothing else"}`,
      ...(usedIn.length > 0 ? [`Used in: ${usedIn.join(", ")}`] : []),
      `Updated: ${component.updated}`,
    ].join("\n"),
    `### When to use it\n${bullets(component.useCases)}`,
    `### Behavior\n${bullets(component.behaviors)}`,
    ...(guide
      ? [
          `### ${guide.title}\n${guide.intro}`,
          guide.steps
            .map((step, index) => `${index + 1}. ${step.title}. ${step.body}`)
            .join("\n"),
          `${guide.codeTitle}:\n\n\`\`\`tsx\n${guide.code}\n\`\`\``,
          ...(guide.note ? [guide.note] : []),
        ]
      : []),
    `### Props\n${bullets(
      component.props.map(
        (prop) =>
          `${prop.name} (${prop.type}${prop.required ? ", required" : prop.default ? `, default ${prop.default}` : ""}): ${prop.description}`
      )
    )}`,
    `### Accessibility\n${bullets(component.accessibility)}`,
    `### Usage\n\n\`\`\`tsx\n${component.usage}\n\`\`\``,
    `### FAQ\n${component.faqs
      .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
      .join("\n\n")}`,
  ].join("\n\n")
}

export function GET() {
  const header = [
    "# STARCK UI: full component reference",
    `> Open-source shadcn/ui components taken from products that shipped, like SessionWatcher and Moorline. ${components.length} components, installable with the shadcn CLI. MIT licensed.`,
    `Every component installs as source through the @starck shadcn namespace: pnpm dlx shadcn@latest add @starck/<name>. Prefer the most specific existing component and edit the installed source when needed.\n\nIndex: ${siteUrl}/llms.txt\nSource: ${repoUrl}`,
  ].join("\n\n")

  return new Response(
    `${header}\n\n${components.map(componentSection).join("\n\n")}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } }
  )
}
