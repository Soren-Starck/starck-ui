import type { BlueCtaTone } from "@/registry/default/blue-cta-button"
import type { NavbarWidthBehavior } from "@/registry/default/liquid-glass-navbar"

const liquidGlassNavbarExample = {
  brand: "SessionWatcher",
  version: "v7.3.0",
  logoSrc: "https://sessionwatcher.com/img/NewLogoModernBlack.png",
  links: [
    { href: "#pricing", label: "Pricing" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" },
  ],
  ctaHref: "#pricing",
  ctaLabel: "Get SessionWatcher",
  widthBehavior: "expand" as NavbarWidthBehavior,
} as const

const blueCtaButtonExample = {
  label: "Get SessionWatcher",
  tone: "blue" as BlueCtaTone,
} as const

function liquidGlassNavbarUsage(
  widthBehavior: NavbarWidthBehavior = liquidGlassNavbarExample.widthBehavior
) {
  const links = liquidGlassNavbarExample.links
    .map(({ href, label }) => `    { href: "${href}", label: "${label}" },`)
    .join("\n")

  return `<LiquidGlassNavbar
  brand="${liquidGlassNavbarExample.brand}"
  version="${liquidGlassNavbarExample.version}"
  logoSrc="${liquidGlassNavbarExample.logoSrc}"
  links={[
${links}
  ]}
  ctaHref="${liquidGlassNavbarExample.ctaHref}"
  ctaLabel="${liquidGlassNavbarExample.ctaLabel}"
  widthBehavior="${widthBehavior}"
/>`
}

function blueCtaButtonUsage(tone: BlueCtaTone = blueCtaButtonExample.tone) {
  return `<BlueCtaButton tone="${tone}">\n  ${blueCtaButtonExample.label}\n</BlueCtaButton>`
}

export {
  blueCtaButtonExample,
  blueCtaButtonUsage,
  liquidGlassNavbarExample,
  liquidGlassNavbarUsage,
}
