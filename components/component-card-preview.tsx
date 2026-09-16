"use client"

import * as React from "react"

import { ComponentPreview } from "@/components/component-preview"
import { blueCtaButtonExample, liquidGlassNavbarExample } from "@/lib/examples"
import { BlueCtaButton } from "@/registry/default/blue-cta-button"

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
    <div
      ref={frameRef}
      className="component-card-stage preview-grid relative h-56 overflow-hidden"
    >
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
  if (slug === "blue-cta-button") {
    return <BlueCtaCardPreview />
  }

  return <ScaledComponentCardPreview slug={slug} />
}

export { ComponentCardPreview }
