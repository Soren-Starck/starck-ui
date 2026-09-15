"use client"

import * as React from "react"

import { blueCtaButtonExample, liquidGlassNavbarExample } from "@/lib/examples"
import { BlueCtaButton } from "@/registry/default/blue-cta-button"
import { LiquidGlassNavbar } from "@/registry/default/liquid-glass-navbar"

function ComponentPreview({ slug }: { slug: string }) {
  if (slug === "blue-cta-button") {
    return (
      <div className="preview-grid flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border">
        <BlueCtaButton>{blueCtaButtonExample.label}</BlueCtaButton>
      </div>
    )
  }

  return <LiquidGlassNavbarPreview />
}

function LiquidGlassNavbarPreview() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="preview-grid relative -mx-5 h-[28rem] overflow-hidden border-y sm:mx-0 sm:rounded-2xl sm:border">
      <div
        ref={containerRef}
        className="preview-scroll relative h-full overflow-y-auto overscroll-contain"
        aria-label="Scrollable liquid glass navbar preview"
      >
        <LiquidGlassNavbar
          {...liquidGlassNavbarExample}
          contained
          scrollContainerRef={containerRef}
        />

        <div className="relative min-h-[940px] overflow-hidden px-6 pt-36 sm:px-12">
          <div className="absolute top-4 left-[12%] size-56 rounded-full bg-blue-400/45 blur-3xl" />
          <div className="absolute top-72 right-[8%] size-64 rounded-full bg-violet-400/40 blur-3xl" />
          <div className="absolute bottom-20 left-[22%] size-56 rounded-full bg-cyan-300/35 blur-3xl" />

          <div className="relative mx-auto max-w-xl text-center">
            <p className="text-sm text-muted-foreground">Scroll this preview</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Watch the page move through the glass.
            </p>
          </div>

          <div className="relative mx-auto mt-28 grid max-w-2xl gap-8">
            <div className="ml-auto w-3/4 rounded-2xl border border-blue-300/50 bg-blue-400/35 p-7 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-medium tracking-[0.08em] uppercase">
                Refraction
              </p>
              <p className="mt-2 text-sm leading-6">
                Color and grid lines bend as this surface passes beneath the
                navbar.
              </p>
            </div>
            <div className="w-4/5 rounded-2xl border border-violet-300/50 bg-violet-400/35 p-7 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-medium tracking-[0.08em] uppercase">
                Chromatic edge
              </p>
              <p className="mt-2 text-sm leading-6">
                Separate RGB displacement passes create the subtle color fringe.
              </p>
            </div>
            <div className="mx-auto w-2/3 rounded-2xl border bg-background/75 p-7 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-medium tracking-[0.08em] uppercase">
                Responsive
              </p>
              <p className="mt-2 text-sm leading-6">
                Resize the page to see the compact mobile navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ComponentPreview }
