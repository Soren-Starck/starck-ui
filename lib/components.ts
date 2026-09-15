const components = [
  {
    slug: "liquid-glass-navbar",
    title: "Liquid Glass Navbar",
    description:
      "The SessionWatcher navbar, including responsive layouts, scroll expansion, Chromium refraction, and a graceful blur fallback.",
    sourceFiles: [
      "registry/default/liquid-glass-navbar.tsx",
      "registry/default/liquid-glass.ts",
    ],
    usage: `<LiquidGlassNavbar
  brand="SessionWatcher"
  version="v7.3.0"
  logoSrc="/sessionwatcher-logo.png"
  ctaHref="#pricing"
/>`,
  },
  {
    slug: "blue-cta-button",
    title: "Blue CTA Button",
    description:
      "SessionWatcher's dimensional blue CTA: sampled gradient, specular rim, soft glow, and a quick press state.",
    sourceFiles: ["registry/default/blue-cta-button.tsx"],
    usage: `<BlueCtaButton onClick={() => console.log("Ship it")}>\n  Get SessionWatcher\n</BlueCtaButton>`,
  },
] as const

type ComponentEntry = (typeof components)[number]

function getComponent(slug: string) {
  return components.find((component) => component.slug === slug)
}

export { components, getComponent }
export type { ComponentEntry }
