"use client"

import * as React from "react"
import Image from "next/image"

import {
  blueCtaButtonExample,
  gradientFaqExample,
  liquidGlassNavbarExample,
  macbookMockupExample,
  morphingDownloadIconExample,
  pricingBlockExample,
  providerOrbitExample,
  releaseHistoryExample,
  scrollRevealExample,
  singlePricingCardExample,
  socialProofExample,
  stickyProductCtaExample,
  terminalCommandExample,
  testimonialsGridExample,
  whatsNewCardExample,
} from "@/lib/examples"
import { BlueCtaButton } from "@/registry/default/blue-cta-button"
import type { BlueCtaTone } from "@/registry/default/blue-cta-button"
import { GradientFaq } from "@/registry/default/gradient-faq"
import { LiquidGlassNavbar } from "@/registry/default/liquid-glass-navbar"
import type { NavbarWidthBehavior } from "@/registry/default/liquid-glass-navbar"
import { MacbookMockup } from "@/registry/default/macbook-mockup"
import { MorphingDownloadIcon } from "@/registry/default/morphing-download-icon"
import { PricingBlock } from "@/registry/default/pricing-block"
import { ProviderOrbit } from "@/registry/default/provider-orbit"
import { ReleaseHistoryDialog } from "@/registry/default/release-history-dialog"
import { Reveal, Stagger, StaggerItem } from "@/registry/default/scroll-reveal"
import { SinglePricingCard } from "@/registry/default/single-pricing-card"
import { SocialProof } from "@/registry/default/social-proof"
import { StickyProductCta } from "@/registry/default/sticky-product-cta"
import { TerminalCommand } from "@/registry/default/terminal-command"
import { TestimonialsGrid } from "@/registry/default/testimonials-grid"
import { WhatsNewCard } from "@/registry/default/whats-new-card"

// Free stock photographs from Unsplash. Source pages:
// https://unsplash.com/photos/-Ksr263JEa8
// https://unsplash.com/photos/5aXEo-hGwU0
// https://unsplash.com/photos/lEzMTXWjnFo

type ComponentPreviewProps = {
  slug: string
  blueCtaTone: BlueCtaTone
  navbarWidthBehavior: NavbarWidthBehavior
  controls?: React.ReactNode
}

function ComponentPreview({
  slug,
  blueCtaTone,
  navbarWidthBehavior,
  controls,
}: ComponentPreviewProps) {
  if (slug === "blue-cta-button") {
    return (
      <div className="preview-grid relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border">
        <BlueCtaButton tone={blueCtaTone}>
          {blueCtaButtonExample.label}
        </BlueCtaButton>
        {controls ? (
          <div className="absolute bottom-4 left-4">{controls}</div>
        ) : null}
      </div>
    )
  }

  if (slug === "gradient-faq") {
    return (
      <PreviewSurface>
        <div className="w-full max-w-2xl">
          <GradientFaq {...gradientFaqExample} />
        </div>
      </PreviewSurface>
    )
  }

  if (slug === "scroll-reveal") {
    return (
      <PreviewSurface className="min-h-[24rem]">
        <Reveal className="w-full max-w-3xl text-center">
          <p className="text-3xl font-semibold tracking-[-0.04em]">
            {scrollRevealExample.heading}
          </p>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
            {scrollRevealExample.cards.map((card) => (
              <StaggerItem
                key={card}
                className="rounded-2xl border bg-background p-5 text-sm text-muted-foreground shadow-sm"
              >
                {card}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </PreviewSurface>
    )
  }

  if (slug === "terminal-command") {
    return (
      <PreviewSurface>
        <TerminalCommand
          {...terminalCommandExample}
          className="w-full max-w-2xl"
        />
      </PreviewSurface>
    )
  }

  if (slug === "macbook-mockup") {
    return (
      <PreviewSurface className="min-h-[30rem]">
        <MacbookMockup className="w-full max-w-3xl">
          <ProductPreview />
        </MacbookMockup>
      </PreviewSurface>
    )
  }

  if (slug === "sticky-product-cta") {
    return (
      <PreviewSurface className="min-h-[22rem] pb-24">
        <div className="max-w-lg text-center">
          <p className="text-3xl font-semibold tracking-[-0.04em]">
            Keep the next action close.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The contained preview uses the same component without attaching it
            to the documentation viewport.
          </p>
        </div>
        <StickyProductCta
          title={stickyProductCtaExample.title}
          description={stickyProductCtaExample.description}
          showAfter={stickyProductCtaExample.showAfter}
          contained={stickyProductCtaExample.contained}
          secondaryAction={
            <a href="#source" className="text-xs font-medium text-zinc-600">
              {stickyProductCtaExample.secondaryLabel}
            </a>
          }
          primaryAction={
            <a
              href="#install"
              className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white"
            >
              {stickyProductCtaExample.primaryLabel}
            </a>
          }
        />
      </PreviewSurface>
    )
  }

  if (slug === "social-proof") {
    return (
      <PreviewSurface>
        <SocialProof {...socialProofExample} />
      </PreviewSurface>
    )
  }

  if (slug === "testimonials-grid") {
    return (
      <PreviewSurface className="min-h-[34rem] items-stretch">
        <TestimonialsGrid
          {...testimonialsGridExample}
          className="mx-auto w-full max-w-4xl"
        />
      </PreviewSurface>
    )
  }

  if (slug === "whats-new-card") {
    return (
      <PreviewSurface>
        <WhatsNewCard {...whatsNewCardExample} className="w-full max-w-sm" />
      </PreviewSurface>
    )
  }

  if (slug === "release-history-dialog") {
    return (
      <PreviewSurface>
        <ReleaseHistoryDialog {...releaseHistoryExample} />
      </PreviewSurface>
    )
  }

  if (slug === "single-pricing-card") {
    return (
      <PreviewSurface className="min-h-[36rem]">
        <SinglePricingCard
          {...singlePricingCardExample}
          className="w-full max-w-sm"
        />
      </PreviewSurface>
    )
  }

  if (slug === "pricing-block") {
    return (
      <PreviewSurface className="min-h-[38rem] items-stretch">
        <PricingBlock
          plans={pricingBlockExample.plans}
          className="mx-auto w-full max-w-3xl"
        />
      </PreviewSurface>
    )
  }

  if (slug === "provider-orbit") {
    return (
      <PreviewSurface className="min-h-[34rem]">
        <ProviderOrbit
          center={providerOrbitExample.center}
          duration={providerOrbitExample.duration}
          items={providerOrbitExample.items.map((item) => ({
            name: item.name,
            icon: <span style={{ color: item.color }}>{item.initials}</span>,
          }))}
        />
      </PreviewSurface>
    )
  }

  if (slug === "morphing-download-icon") {
    return (
      <PreviewSurface>
        <MorphingDownloadButton />
      </PreviewSurface>
    )
  }

  if (slug !== "liquid-glass-navbar") {
    return null
  }

  return (
    <LiquidGlassNavbarPreview
      widthBehavior={navbarWidthBehavior}
      controls={controls}
    />
  )
}

function PreviewSurface({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`preview-grid relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl border p-6 sm:p-10 ${className}`}
    >
      {children}
    </div>
  )
}

function ProductPreview() {
  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-100 p-[7%]">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-red-400" />
        <span className="size-2 rounded-full bg-amber-400" />
        <span className="size-2 rounded-full bg-emerald-400" />
      </div>
      <div className="m-auto max-w-md text-center">
        <p className="text-[clamp(8px,1.4vw,14px)] text-zinc-500">
          {macbookMockupExample.eyebrow}
        </p>
        <p className="mt-2 text-[clamp(14px,3vw,34px)] leading-tight font-semibold tracking-[-0.04em] text-zinc-950">
          {macbookMockupExample.title}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          {macbookMockupExample.stats.map((stat) => (
            <span
              key={stat}
              className="rounded-full bg-white/80 px-2.5 py-1 text-[clamp(6px,1vw,11px)] text-zinc-600 shadow-sm"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MorphingDownloadButton() {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-lg"
    >
      <MorphingDownloadIcon hover={hovered} />
      {morphingDownloadIconExample.label}
    </button>
  )
}

function LiquidGlassNavbarPreview({
  widthBehavior,
  controls,
}: {
  widthBehavior: NavbarWidthBehavior
  controls?: React.ReactNode
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
      {controls ? (
        <div className="absolute bottom-4 left-4 z-30">{controls}</div>
      ) : null}
    </div>
  )
}

export { ComponentPreview }
