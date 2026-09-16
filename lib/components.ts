import {
  blueCtaButtonUsage,
  gradientFaqUsage,
  liquidGlassNavbarUsage,
  macbookMockupUsage,
  morphingDownloadIconUsage,
  pricingBlockUsage,
  providerOrbitUsage,
  releaseHistoryUsage,
  scrollRevealUsage,
  singlePricingCardUsage,
  socialProofUsage,
  stickyProductCtaUsage,
  terminalCommandUsage,
  testimonialsGridUsage,
  whatsNewCardUsage,
} from "@/lib/examples"

const components = [
  {
    slug: "liquid-glass-navbar",
    title: "Liquid Glass Navbar",
    description:
      "The SessionWatcher navbar, including responsive layouts, expandable or fixed width, Chromium refraction, and a graceful blur fallback.",
    sourceFiles: [
      "registry/default/liquid-glass-navbar.tsx",
      "registry/default/liquid-glass.ts",
    ],
    usage: liquidGlassNavbarUsage(),
  },
  {
    slug: "blue-cta-button",
    title: "Blue CTA Button",
    description:
      "SessionWatcher's dimensional CTA: sampled color tones, specular rim, soft glow, and a quick press state.",
    sourceFiles: ["registry/default/blue-cta-button.tsx"],
    usage: blueCtaButtonUsage(),
  },
  {
    slug: "gradient-faq",
    title: "Gradient FAQ",
    description:
      "An animated, crawlable accordion proven across SessionWatcher and Moorline.",
    sourceFiles: ["registry/default/gradient-faq.tsx"],
    usage: gradientFaqUsage,
  },
  {
    slug: "scroll-reveal",
    title: "Scroll Reveal",
    description:
      "Progressively enhanced reveal and stagger primitives with reduced-motion support.",
    sourceFiles: ["registry/default/scroll-reveal.tsx"],
    usage: scrollRevealUsage,
  },
  {
    slug: "terminal-command",
    title: "Terminal Command",
    description:
      "A copyable terminal command block with stable feedback and familiar macOS chrome.",
    sourceFiles: ["registry/default/terminal-command.tsx"],
    usage: terminalCommandUsage,
  },
  {
    slug: "macbook-mockup",
    title: "MacBook Mockup",
    description:
      "A responsive CSS device frame with an accessible optional fullscreen preview.",
    sourceFiles: ["registry/default/macbook-mockup.tsx"],
    usage: macbookMockupUsage,
  },
  {
    slug: "sticky-product-cta",
    title: "Sticky Product CTA",
    description:
      "A compact scroll-aware product bar for keeping the next action within reach.",
    sourceFiles: ["registry/default/sticky-product-cta.tsx"],
    usage: stickyProductCtaUsage,
  },
  {
    slug: "social-proof",
    title: "Social Proof",
    description:
      "An accessible avatar stack, rating, and trust label for product surfaces.",
    sourceFiles: ["registry/default/social-proof.tsx"],
    usage: socialProofUsage,
  },
  {
    slug: "testimonials-grid",
    title: "Testimonials Grid",
    description:
      "A featured testimonial paired with quieter supporting customer stories.",
    sourceFiles: ["registry/default/testimonials-grid.tsx"],
    usage: testimonialsGridUsage,
  },
  {
    slug: "whats-new-card",
    title: "What’s New Card",
    description:
      "A focused product-update card with version, date, summary, and optional destination.",
    sourceFiles: ["registry/default/whats-new-card.tsx"],
    usage: whatsNewCardUsage,
  },
  {
    slug: "release-history-dialog",
    title: "Release History Dialog",
    description:
      "A responsive release-notes dialog with body lock, Escape handling, and structured entries.",
    sourceFiles: ["registry/default/release-history-dialog.tsx"],
    usage: releaseHistoryUsage,
  },
  {
    slug: "single-pricing-card",
    title: "Single Pricing Card",
    description:
      "An opinionated single-plan pricing card for focused products with one clear offer.",
    sourceFiles: ["registry/default/single-pricing-card.tsx"],
    usage: singlePricingCardUsage,
  },
  {
    slug: "pricing-block",
    title: "Pricing Block",
    description:
      "A responsive multi-plan block built from the same reusable single-plan card.",
    sourceFiles: [
      "registry/default/pricing-block.tsx",
      "registry/default/single-pricing-card.tsx",
    ],
    usage: pricingBlockUsage,
  },
  {
    slug: "provider-orbit",
    title: "Provider Orbit",
    description:
      "A reduced-motion-aware integration orbit that pauses when someone inspects it.",
    sourceFiles: ["registry/default/provider-orbit.tsx"],
    usage: providerOrbitUsage,
  },
  {
    slug: "morphing-download-icon",
    title: "Morphing Download Icon",
    description:
      "An Apple-to-download icon transition for Mac download calls to action.",
    sourceFiles: ["registry/default/morphing-download-icon.tsx"],
    usage: morphingDownloadIconUsage,
  },
] as const

type ComponentEntry = (typeof components)[number]

function getComponent(slug: string) {
  return components.find((component) => component.slug === slug)
}

export { components, getComponent }
export type { ComponentEntry }
