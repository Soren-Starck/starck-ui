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
} as const

const blueCtaButtonExample = {
  label: "Get SessionWatcher",
} as const

function liquidGlassNavbarUsage() {
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
/>`
}

function blueCtaButtonUsage() {
  return `<BlueCtaButton>\n  ${blueCtaButtonExample.label}\n</BlueCtaButton>`
}

export {
  blueCtaButtonExample,
  blueCtaButtonUsage,
  liquidGlassNavbarExample,
  liquidGlassNavbarUsage,
}
