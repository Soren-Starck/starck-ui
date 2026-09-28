import type { Metadata } from "next"

import { InstallCommand } from "@/components/install-command"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Add STARCK UI to a shadcn/ui project: initialize shadcn, then install one component from the @starck registry and own its source.",
  alternates: { canonical: "/getting-started" },
}

export default function GettingStartedPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-[-0.035em]">
        Install the source.
      </h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Start with a shadcn project, add only the component you need, then own
        every line that lands in your codebase.
      </p>

      <Separator className="my-10" />

      <section className="space-y-4">
        <h2 className="text-lg font-medium">1. Initialize shadcn</h2>
        <pre className="overflow-x-auto rounded-xl border bg-muted/55 p-4 font-mono text-xs">
          <code>pnpm dlx shadcn@latest init</code>
        </pre>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">2. Add one component</h2>
        <InstallCommand slug="blue-cta-button" />
        <p className="text-sm leading-6 text-muted-foreground">
          STARCK UI is listed in the{" "}
          <a
            href="https://ui.shadcn.com/docs/directory"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            shadcn registry directory ↗
          </a>
          , so the CLI resolves <code className="font-mono">@starck</code> with
          no extra setup.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-medium">That&apos;s it.</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          No runtime package and no theme to adopt. Components enter STARCK UI
          only after a real product has proved they are worth reusing.
        </p>
      </section>
    </main>
  )
}
