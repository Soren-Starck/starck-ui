"use client"

import * as React from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

import {
  AppleMark,
  blueCtaClassName,
  blueCtaStyle,
} from "@/components/blue-cta-button"
import { createLiquidGlass } from "@/lib/liquid-glass"

type NavLink = {
  href: string
  label: string
}

type LiquidGlassNavbarProps = {
  brand?: string
  version?: string
  logoSrc?: string
  logoAlt?: string
  links?: readonly NavLink[]
  ctaHref?: string
  ctaLabel?: string
  fixedWidth?: boolean
  contained?: boolean
  scrollContainerRef?: React.RefObject<HTMLElement | null>
  className?: string
}

const defaultLinks: NavLink[] = [
  { href: "#pricing", label: "Pricing" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
]

function BrandLogo({
  src,
  alt,
  className,
}: {
  src?: string
  alt: string
  className: string
}) {
  if (src) {
    return (
      // This registry component is framework-neutral, so Next Image is not used.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`${className} rounded-[9px] object-cover`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`flex ${className} items-center justify-center rounded-[9px] bg-zinc-950 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950`}
    >
      S
    </span>
  )
}

function LiquidGlassNavbar({
  brand = "SessionWatcher",
  version = "v7.3.0",
  logoSrc = "https://sessionwatcher.com/img/NewLogoModernBlack.png",
  logoAlt,
  links = defaultLinks,
  ctaHref = "#",
  ctaLabel = "Get SessionWatcher",
  fixedWidth = false,
  contained = false,
  scrollContainerRef,
  className,
}: LiquidGlassNavbarProps) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll({ container: scrollContainerRef })
  const animatedWidth = useTransform(
    scrollY,
    [0, 400],
    [fixedWidth ? "100%" : "50%", "120%"]
  )
  const staticWidth = fixedWidth ? "100%" : "85%"
  const containedWidth = useTransform(scrollY, [0, 320], ["92%", "100%"])
  const mobileNav = React.useRef<HTMLElement>(null)
  const desktopNav = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    let active = true
    let instance: ReturnType<typeof createLiquidGlass> | null = null
    const media = window.matchMedia("(min-width: 640px)")

    const mount = () => {
      instance?.destroy()
      instance = null
      const element = media.matches ? desktopNav.current : mobileNav.current

      if (active && element && element.offsetWidth > 0) {
        instance = createLiquidGlass(element, {
          borderRadius: Math.round(element.offsetHeight / 2),
          blur: 9,
          scale: -110,
          aberration: [0, 6, 12],
          saturation: 1.3,
          frost: 0.05,
        })
      }
    }

    media.addEventListener("change", mount)
    mount()

    return () => {
      active = false
      instance?.destroy()
      media.removeEventListener("change", mount)
    }
  }, [])

  const positioning = contained
    ? "sticky top-4 inset-x-0 h-0"
    : "fixed top-4 inset-x-0"

  return (
    <header
      role="banner"
      className={[
        positioning,
        "z-50 flex justify-center px-4 transition-opacity duration-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav
        ref={mobileNav}
        aria-label="Main navigation"
        className="block w-full max-w-4xl rounded-full px-4 py-3 backdrop-blur-md sm:hidden"
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex shrink-0 items-center gap-1.5">
            <BrandLogo
              src={logoSrc}
              alt={logoAlt ?? brand}
              className="size-6"
            />
            <span className="relative text-lg leading-6 font-bold tracking-tighter whitespace-nowrap">
              {brand}
              {version ? (
                <span className="absolute -top-2 -right-2 rounded-full border border-border/60 bg-foreground/[0.04] px-2 py-0.5 text-[11px] leading-none font-medium text-muted-foreground">
                  {version}
                </span>
              ) : null}
            </span>
          </a>
          <a
            href={ctaHref}
            className={`${blueCtaClassName} px-3.5 py-1.5 pl-2.5 text-xs`}
            style={blueCtaStyle}
          >
            <AppleMark className="size-3.5" />
            {ctaLabel}
          </a>
        </div>
      </nav>

      <motion.nav
        ref={desktopNav}
        aria-label="Main navigation"
        className="hidden max-w-[1200px] rounded-full px-3 py-3 pl-4 backdrop-blur-md sm:block"
        style={{
          width: contained
            ? prefersReducedMotion
              ? "100%"
              : containedWidth
            : prefersReducedMotion
              ? staticWidth
              : animatedWidth,
        }}
      >
        <div className="relative flex items-center justify-between">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <BrandLogo
              src={logoSrc}
              alt={logoAlt ?? brand}
              className="size-8"
            />
            <span className="relative text-2xl leading-8 font-bold tracking-tighter whitespace-nowrap">
              {brand}
              {version ? (
                <span className="absolute -top-2.5 -right-2 rounded-full border border-border/60 bg-foreground/[0.04] px-2 py-0.5 text-[12px] leading-none font-medium text-muted-foreground">
                  {version}
                </span>
              ) : null}
            </span>
          </a>
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-5">
            {links.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={ctaHref}
            className={`${blueCtaClassName} shrink-0`}
            style={blueCtaStyle}
          >
            <AppleMark className="size-[15px]" />
            {ctaLabel}
          </a>
        </div>
      </motion.nav>
    </header>
  )
}

export { LiquidGlassNavbar }
export type { LiquidGlassNavbarProps, NavLink }
