import { BlueCtaButton } from "@/registry/default/blue-cta-button"
import { LiquidGlassNavbar } from "@/registry/default/liquid-glass-navbar"

function ComponentPreview({ slug }: { slug: string }) {
  if (slug === "blue-cta-button") {
    return (
      <div className="preview-grid flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border">
        <BlueCtaButton>Get SessionWatcher</BlueCtaButton>
      </div>
    )
  }

  return (
    <div className="preview-grid relative min-h-96 overflow-hidden rounded-2xl border">
      <div className="absolute top-6 left-[18%] size-48 rounded-full bg-blue-400/35 blur-3xl" />
      <div className="absolute right-[12%] bottom-0 size-56 rounded-full bg-violet-400/30 blur-3xl" />
      <LiquidGlassNavbar contained fixedWidth />
      <div className="absolute inset-x-0 top-36 mx-auto max-w-lg px-8 text-center">
        <p className="text-sm text-muted-foreground">Scroll-ready navigation</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          One glance. Then back to work.
        </p>
      </div>
    </div>
  )
}

export { ComponentPreview }
