import { InstallCommand } from "@/components/install-command"
import { Separator } from "@/components/ui/separator"

export const metadata = { title: "Usage" }

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
        Usage
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em]">
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
