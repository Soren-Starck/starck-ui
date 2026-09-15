import Link from "next/link"

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
        <div className="divide-y rounded-2xl border">
          {components.map((component, index) => (
            <Link
              key={component.slug}
              href={`/components/${component.slug}`}
              className="group grid gap-3 p-6 transition-colors hover:bg-muted/45 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <h3 className="font-medium">{component.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {component.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                {String(index + 1).padStart(2, "0")} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
