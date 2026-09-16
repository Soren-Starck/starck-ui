import Link from "next/link"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ComponentCardPreview } from "@/components/component-card-preview"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { components } from "@/lib/components"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <section className="max-w-3xl">
        <Badge variant="outline">Open source</Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
          The components we use to ship software.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Beautiful, opinionated components built on shadcn. Open code. Copy
          them, change them, make them yours.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/components/liquid-glass-navbar"
            className={cn(buttonVariants(), "rounded-full")}
          >
            Browse components
          </Link>
          <Link
            href="/guide"
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-full")}
          >
            Usage
          </Link>
        </div>
      </section>

      <Separator className="my-16 sm:my-20" />

      <section id="components" aria-labelledby="components-title">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
              From real products
            </p>
            <h2
              id="components-title"
              className="mt-2 text-2xl font-semibold tracking-tight"
            >
              Components
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {components.length} total
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {components.map((component) => (
            <article
              key={component.slug}
              className="group relative overflow-hidden rounded-3xl border bg-card transition-[transform,box-shadow,border-color] duration-300 focus-within:border-foreground/20 focus-within:ring-2 focus-within:ring-ring/30 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_24px_70px_-42px_rgba(0,0,0,0.45)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div
                className="pointer-events-none border-b"
                aria-hidden="true"
                inert
              >
                <ComponentCardPreview slug={component.slug} />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-medium tracking-[-0.015em]">
                    {component.title}
                  </h3>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border text-muted-foreground transition-[color,transform,border-color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:text-foreground motion-reduce:transform-none">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {component.description}
                </p>
              </div>
              <Link
                href={`/components/${component.slug}`}
                aria-label={`View ${component.title}`}
                className="absolute inset-0 rounded-3xl focus-visible:outline-none"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
