import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentActions } from "@/components/component-actions"
import { ComponentPreview } from "@/components/component-preview"
import { CopyButton } from "@/components/copy-button"
import { InstallCommand } from "@/components/install-command"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getComponentProvenance } from "@/lib/component-provenance.generated"
import { components, getComponent } from "@/lib/components"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const component = getComponent((await params).slug)
  if (!component) return {}

  return {
    title: component.title,
    description: component.description,
  }
}

export default async function ComponentPage({ params }: Props) {
  const component = getComponent((await params).slug)
  if (!component) notFound()
  const provenance = getComponentProvenance(component.slug)

  const sources = await Promise.all(
    component.sourceFiles.map(async (sourcePath) => ({
      path: sourcePath,
      content: await readFile(
        path.join(
          process.cwd(),
          "registry",
          "default",
          path.basename(sourcePath)
        ),
        "utf8"
      ),
    }))
  )

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
            Component
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em]">
            {component.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {component.description}
          </p>
          {provenance.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">Used in</span>
              {provenance.map((project, index) => (
                <span key={project.href} className="inline-flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-border">
                      ·
                    </span>
                  ) : null}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {project.name} ↗
                  </a>
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <ComponentActions
          slug={component.slug}
          title={component.title}
          description={component.description}
          usage={component.usage}
        />
      </div>

      <div className="mt-10">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="source">Source</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="pt-3">
            <ComponentPreview slug={component.slug} />
          </TabsContent>
          <TabsContent value="source" className="pt-3">
            <div className="relative overflow-hidden rounded-2xl border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {sources[0].path}
                </span>
                <CopyButton
                  value={sources.map(({ content }) => content).join("\n\n")}
                />
              </div>
              <pre className="max-h-[640px] overflow-auto p-5 font-mono text-xs leading-5">
                <code>
                  {sources
                    .map(
                      (source) =>
                        `// ${source.path}\n\n${source.content.trim()}`
                    )
                    .join("\n\n")}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-12" />

      <section>
        <h2 className="text-lg font-medium">Install</h2>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          Add the source directly to your shadcn project.
        </p>
        <InstallCommand slug={component.slug} />
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">Usage</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border bg-muted/55 p-5 font-mono text-xs leading-5">
          <code>{component.usage}</code>
        </pre>
      </section>
    </main>
  )
}
