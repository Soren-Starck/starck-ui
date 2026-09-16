"use client"

import * as React from "react"
import Image from "next/image"

import { blueCtaButtonExample, liquidGlassNavbarExample } from "@/lib/examples"
import { BlueCtaButton } from "@/registry/default/blue-cta-button"
import type { BlueCtaTone } from "@/registry/default/blue-cta-button"
import { LiquidGlassNavbar } from "@/registry/default/liquid-glass-navbar"
import type { NavbarWidthBehavior } from "@/registry/default/liquid-glass-navbar"

// Free stock photographs from Unsplash. Source pages:
// https://unsplash.com/photos/-Ksr263JEa8
// https://unsplash.com/photos/5aXEo-hGwU0
// https://unsplash.com/photos/lEzMTXWjnFo

type ComponentPreviewProps = {
  slug: string
  blueCtaTone: BlueCtaTone
  navbarWidthBehavior: NavbarWidthBehavior
}

function ComponentPreview({
  slug,
  blueCtaTone,
  navbarWidthBehavior,
}: ComponentPreviewProps) {
  if (slug === "blue-cta-button") {
    return (
      <div className="preview-grid flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border">
        <BlueCtaButton tone={blueCtaTone}>
          {blueCtaButtonExample.label}
        </BlueCtaButton>
      </div>
    )
  }

  return <LiquidGlassNavbarPreview widthBehavior={navbarWidthBehavior} />
}

function LiquidGlassNavbarPreview({
  widthBehavior,
}: {
  widthBehavior: NavbarWidthBehavior
}) {
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
          widthBehavior={widthBehavior}
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
              Watch detail bend through glass.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-4xl">
            <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_80px_-32px_rgba(37,99,235,0.55)]">
              <Image
                src="/preview/glass-architecture.webp"
                alt="Colorful glass architecture"
                width={1400}
                height={1000}
                priority
                sizes="(min-width: 768px) 800px, 90vw"
                className="h-[360px] w-full object-cover sm:h-[430px]"
              />
            </figure>

            <section className="my-12 grid gap-5 text-left sm:my-16 sm:grid-cols-[0.7fr_1.3fr] sm:gap-10">
              <p className="pt-1 text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Designed in motion
              </p>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                  Clarity that changes with context.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  The surface picks up color, edges, and detail from whatever
                  moves behind it. Navigation stays readable while the page
                  remains visibly alive beneath the glass.
                </p>
              </div>
            </section>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_70px_-36px_rgba(37,99,235,0.5)]">
                <Image
                  src="/preview/flowers.webp"
                  alt="Colorful flowers in a garden"
                  width={900}
                  height={900}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-square size-full object-cover"
                />
              </figure>
              <figure className="overflow-hidden rounded-3xl border border-white/20 bg-sky-500 shadow-[0_24px_70px_-36px_rgba(124,58,237,0.45)]">
                <Image
                  src="/preview/colorful-windows.webp"
                  alt="A geometric facade with colorful windows"
                  width={900}
                  height={900}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-square size-full object-cover"
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
