import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ComponentWorkbench } from "@/components/component-workbench"
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
              <span
                key={project.href}
                className="inline-flex items-center gap-2"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                ) : null}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                >
                  {project.iconSrc ? (
                    <Image
                      src={project.iconSrc}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 rounded-[4px]"
                    />
                  ) : null}
                  <span>{project.name} ↗</span>
                </a>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <ComponentWorkbench
        slug={component.slug}
        title={component.title}
        description={component.description}
        defaultUsage={component.usage}
        sources={sources}
      />
    </main>
  )
}
