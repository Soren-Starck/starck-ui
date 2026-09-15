"use client"

import * as React from "react"
import Image from "next/image"

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

        <div className="relative min-h-[1240px] overflow-hidden px-6 pt-32 pb-16 sm:px-12">
          <div className="absolute top-4 left-[12%] size-56 rounded-full bg-blue-400/45 blur-3xl" />
          <div className="absolute top-72 right-[8%] size-64 rounded-full bg-violet-400/40 blur-3xl" />
          <div className="absolute bottom-20 left-[22%] size-56 rounded-full bg-cyan-300/35 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">Scroll this preview</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Real interface. Real refraction.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl">
            <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_80px_-32px_rgba(37,99,235,0.55)]">
              <Image
                src="/preview/sessionwatcher-overview.webp"
                alt="SessionWatcher interface on a blue macOS desktop"
                width={900}
                height={900}
                priority
                sizes="(min-width: 768px) 800px, 90vw"
                className="h-[360px] w-full object-cover object-[68%_28%] sm:h-[430px]"
              />
            </figure>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_70px_-36px_rgba(37,99,235,0.5)]">
                <Image
                  src="/preview/sessionwatcher-codex.webp"
                  alt="SessionWatcher showing Codex usage"
                  width={900}
                  height={900}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-square size-full object-cover object-[70%_30%]"
                />
              </figure>
              <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_70px_-36px_rgba(124,58,237,0.45)]">
                <Image
                  src="/preview/sessionwatcher-claude.webp"
                  alt="SessionWatcher showing Claude usage"
                  width={900}
                  height={900}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-square size-full object-cover object-[70%_30%]"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ComponentPreview }
