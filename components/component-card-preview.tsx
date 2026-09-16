"use client"

import * as React from "react"

import { ComponentPreview } from "@/components/component-preview"
import { blueCtaButtonExample, liquidGlassNavbarExample } from "@/lib/examples"
import { BlueCtaButton } from "@/registry/default/blue-cta-button"
import { LiquidGlassNavbar } from "@/registry/default/liquid-glass-navbar"

function BlueCtaCardPreview() {
  return (
    <div className="preview-grid relative flex h-56 items-center justify-center overflow-hidden">
      <div className="absolute -top-12 -left-10 size-36 rounded-full bg-blue-400/25 blur-3xl transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-4 motion-reduce:transition-none" />
      <div className="absolute -right-8 -bottom-14 size-40 rounded-full bg-violet-400/20 blur-3xl transition-transform duration-700 group-hover:-translate-x-8 group-hover:-translate-y-4 motion-reduce:transition-none" />
      <BlueCtaButton tone={blueCtaButtonExample.tone}>
        {blueCtaButtonExample.label}
      </BlueCtaButton>
    </div>
  )
}

function LiquidGlassNavbarCardPreview() {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.5)

  React.useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const update = () => {
      setScale(Math.min(Math.max((frame.clientWidth - 24) / 900, 0.32), 0.72))
    }
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    update()
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frameRef} className="preview-grid relative h-56 overflow-hidden">
      <div
        className="absolute top-2 left-1/2 overflow-hidden rounded-2xl"
        style={{
          width: 900 * scale,
          height: 460 * scale,
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="h-[460px] w-[900px] origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            ref={scrollRef}
            className="relative h-full overflow-hidden"
            aria-hidden="true"
          >
            <LiquidGlassNavbar
              {...liquidGlassNavbarExample}
              widthBehavior="expand"
              contained
              scrollContainerRef={scrollRef}
            />
            <div className="relative min-h-[700px] overflow-hidden px-14 pt-36">
              <div className="absolute top-8 left-16 size-56 rounded-full bg-blue-400/45 blur-3xl" />
              <div className="absolute top-40 right-12 size-60 rounded-full bg-violet-400/40 blur-3xl" />
              <div className="relative mx-auto grid max-w-3xl grid-cols-[1.15fr_0.85fr] gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Liquid interface
                  </p>
                  <p className="mt-3 text-5xl leading-[0.95] font-semibold tracking-[-0.05em]">
                    Navigation with depth.
                  </p>
                </div>
                <div className="grid gap-4 pt-2">
                  <div className="h-28 rounded-3xl bg-blue-500/70" />
                  <div className="h-20 rounded-3xl bg-violet-500/55" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScaledComponentCardPreview({ slug }: { slug: string }) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.52)

  React.useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const update = () =>
      setScale(Math.min(Math.max((frame.clientWidth - 24) / 800, 0.34), 0.64))
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    update()
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frameRef} className="preview-grid relative h-56 overflow-hidden">
      <div
        className="absolute top-3 left-1/2 overflow-hidden"
        style={{
          width: 800 * scale,
          height: 560 * scale,
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="w-[800px] origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          <ComponentPreview
            slug={slug}
            blueCtaTone={blueCtaButtonExample.tone}
            navbarWidthBehavior={liquidGlassNavbarExample.widthBehavior}
          />
        </div>
      </div>
    </div>
  )
}

function ComponentCardPreview({ slug }: { slug: string }) {
  if (slug === "liquid-glass-navbar") {
    return <LiquidGlassNavbarCardPreview />
  }

  if (slug === "blue-cta-button") {
    return <BlueCtaCardPreview />
  }

  return <ScaledComponentCardPreview slug={slug} />
}

export { ComponentCardPreview }
