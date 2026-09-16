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

const gradientFaqExample = {
  items: [
    {
      title: "Can I customize the components?",
      content:
        "Yes. You own the source, so every detail can be adapted to your product.",
    },
    {
      title: "Do they work with shadcn?",
      content:
        "Yes. Components are distributed as source through a standard shadcn registry.",
    },
    {
      title: "Are they accessible?",
      content:
        "Keyboard behavior, reduced motion, and semantic markup are treated as part of the component.",
    },
  ],
  defaultOpen: 0,
} as const

const scrollRevealExample = {
  heading: "Built to arrive quietly.",
  cards: ["One motion curve", "Reduced motion", "Progressive enhancement"],
} as const

const terminalCommandExample = {
  shell: "zsh",
  lines: [
    "pnpm dlx shadcn@latest add https://ui.starck.studio/r/terminal-command.json",
    "pnpm dev",
  ],
} as const

const macbookMockupExample = {
  eyebrow: "Live workspace",
  title: "One glance. Then back to work.",
  stats: ["4 active", "72% remaining", "Resets in 1h"],
} as const

const stickyProductCtaExample = {
  title: "Ship with STARCK UI",
  description: "Open source components from real products.",
  primaryLabel: "Add component",
  secondaryLabel: "View source",
  showAfter: 0,
  contained: true,
} as const

const socialProofExample = {
  avatars: [
    { name: "Ari Kim", initials: "AK", color: "#2563eb" },
    { name: "Mina Lee", initials: "ML", color: "#7c3aed" },
    { name: "Noah Bell", initials: "NB", color: "#059669" },
    { name: "Sara Chen", initials: "SC", color: "#e11d48" },
  ],
  label: "Loved by 500+ customers",
  rating: 5,
} as const

const testimonialsGridExample = {
  testimonials: [
    {
      quote:
        "The details are considered, the code is readable, and it took minutes to make it ours.",
      name: "Maya Chen",
      role: "Product designer",
      initials: "MC",
    },
    {
      quote: "It feels native to our product instead of imported from a kit.",
      name: "Alex Morgan",
      role: "Founder",
      initials: "AM",
    },
    {
      quote: "A strong default that still leaves room for our own identity.",
      name: "Nico Laurent",
      role: "Engineer",
      initials: "NL",
    },
  ],
} as const

const whatsNewCardExample = {
  title: "A calmer command menu",
  version: "2.4.0",
  date: "September 2026",
  summary:
    "Search is faster, keyboard navigation is clearer, and recent actions stay close at hand.",
  href: "#release-notes",
} as const

const releaseHistoryExample = {
  triggerLabel: "View release history",
  title: "Release notes",
  description: "Every meaningful change, newest first.",
  releases: [
    {
      version: "2.4.0",
      date: "Sep 12, 2026",
      notes: ["Added keyboard-first search.", "Refined empty states."],
    },
    {
      version: "2.3.0",
      date: "Aug 28, 2026",
      notes: ["Introduced reusable product switching."],
    },
  ],
} as const

const singlePricingCardExample = {
  name: "Lifetime",
  price: "$29",
  description: "One payment. Every future update included.",
  features: ["Use in unlimited projects", "Open source code", "Future updates"],
  ctaLabel: "Get lifetime access",
  ctaHref: "#buy",
  badge: "Best value",
  highlighted: true,
} as const

const pricingBlockExample = {
  plans: [
    {
      name: "Solo",
      price: "$9",
      interval: "month",
      description: "For one person shipping focused products.",
      features: ["All components", "Commercial use", "Updates"],
      ctaLabel: "Choose Solo",
      ctaHref: "#solo",
    },
    {
      name: "Studio",
      price: "$24",
      interval: "month",
      description: "For small teams building across products.",
      features: ["Everything in Solo", "Five seats", "Priority support"],
      ctaLabel: "Choose Studio",
      ctaHref: "#studio",
      badge: "Popular",
      highlighted: true,
    },
  ],
} as const

const providerOrbitExample = {
  center: "Your app",
  items: [
    { name: "Stripe", initials: "S", color: "#635bff" },
    { name: "GitHub", initials: "GH", color: "#18181b" },
    { name: "Slack", initials: "SL", color: "#611f69" },
    { name: "Linear", initials: "L", color: "#5e6ad2" },
    { name: "Notion", initials: "N", color: "#111827" },
    { name: "Figma", initials: "F", color: "#f24e1e" },
  ],
  duration: 32,
} as const

const morphingDownloadIconExample = {
  label: "Download for Mac",
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

const gradientFaqUsage = `<GradientFaq
  defaultOpen={${gradientFaqExample.defaultOpen}}
  items={[
${gradientFaqExample.items.map((item) => `    { title: "${item.title}", content: "${item.content}" },`).join("\n")}
  ]}
/>`

const scrollRevealUsage = `<Reveal className="w-full max-w-3xl text-center">
  <h2 className="text-3xl font-semibold tracking-[-0.04em]">
    ${scrollRevealExample.heading}
  </h2>
  <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
${scrollRevealExample.cards
  .map(
    (
      card
    ) => `    <StaggerItem className="rounded-2xl border bg-background p-5 text-sm text-muted-foreground shadow-sm">
      ${card}
    </StaggerItem>`
  )
  .join("\n")}
  </Stagger>
</Reveal>`

const terminalCommandUsage = `<TerminalCommand
  shell="${terminalCommandExample.shell}"
  lines={[
${terminalCommandExample.lines.map((line) => `    "${line}",`).join("\n")}
  ]}
/>`

const macbookMockupUsage = `<MacbookMockup>
  <div className="relative flex size-full flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-100 p-[7%]">
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full bg-red-400" />
      <span className="size-2 rounded-full bg-amber-400" />
      <span className="size-2 rounded-full bg-emerald-400" />
    </div>
    <div className="m-auto max-w-md text-center">
      <p className="text-[clamp(8px,1.4vw,14px)] text-zinc-500">${macbookMockupExample.eyebrow}</p>
      <h2 className="mt-2 text-[clamp(14px,3vw,34px)] leading-tight font-semibold tracking-[-0.04em] text-zinc-950">
        ${macbookMockupExample.title}
      </h2>
      <div className="mt-5 flex justify-center gap-2">
${macbookMockupExample.stats.map((stat) => `        <span className="rounded-full bg-white/80 px-2.5 py-1 text-[clamp(6px,1vw,11px)] text-zinc-600 shadow-sm">${stat}</span>`).join("\n")}
      </div>
    </div>
  </div>
</MacbookMockup>`

const stickyProductCtaUsage = `<StickyProductCta
  title="${stickyProductCtaExample.title}"
  description="${stickyProductCtaExample.description}"
  showAfter={${stickyProductCtaExample.showAfter}}
  contained
  secondaryAction={
    <a href="#source" className="text-xs font-medium text-zinc-600">
      ${stickyProductCtaExample.secondaryLabel}
    </a>
  }
  primaryAction={
    <a href="#install" className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white">
      ${stickyProductCtaExample.primaryLabel}
    </a>
  }
/>`

const socialProofUsage = `<SocialProof
  label="${socialProofExample.label}"
  rating={${socialProofExample.rating}}
  avatars={[
${socialProofExample.avatars.map((avatar) => `    { name: "${avatar.name}", initials: "${avatar.initials}", color: "${avatar.color}" },`).join("\n")}
  ]}
/>`

const testimonialsGridUsage = `<TestimonialsGrid
  testimonials={[
${testimonialsGridExample.testimonials.map((item) => `    { quote: "${item.quote}", name: "${item.name}", role: "${item.role}", initials: "${item.initials}" },`).join("\n")}
  ]}
/>`

const whatsNewCardUsage = `<WhatsNewCard
  title="${whatsNewCardExample.title}"
  version="${whatsNewCardExample.version}"
  date="${whatsNewCardExample.date}"
  summary="${whatsNewCardExample.summary}"
  href="${whatsNewCardExample.href}"
/>`

const releaseHistoryUsage = `<ReleaseHistoryDialog
  triggerLabel="${releaseHistoryExample.triggerLabel}"
  title="${releaseHistoryExample.title}"
  description="${releaseHistoryExample.description}"
  releases={[
${releaseHistoryExample.releases.map((release) => `    { version: "${release.version}", date: "${release.date}", notes: ${JSON.stringify(release.notes)} },`).join("\n")}
  ]}
/>`

const singlePricingCardUsage = `<SinglePricingCard
  name="${singlePricingCardExample.name}"
  price="${singlePricingCardExample.price}"
  description="${singlePricingCardExample.description}"
  features={${JSON.stringify(singlePricingCardExample.features)}}
  ctaLabel="${singlePricingCardExample.ctaLabel}"
  ctaHref="${singlePricingCardExample.ctaHref}"
  badge="${singlePricingCardExample.badge}"
  highlighted
/>`

const pricingBlockUsage = `<PricingBlock plans={${JSON.stringify(pricingBlockExample.plans, null, 2)}} />`

const providerOrbitUsage = `<ProviderOrbit
  center="${providerOrbitExample.center}"
  duration={${providerOrbitExample.duration}}
  items={[
${providerOrbitExample.items.map((item) => `    { name: "${item.name}", icon: <span style={{ color: "${item.color}" }}>${item.initials}</span> },`).join("\n")}
  ]}
/>`

const morphingDownloadIconUsage = `const [hovered, setHovered] = useState(false)

<button
  type="button"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onFocus={() => setHovered(true)}
  onBlur={() => setHovered(false)}
  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-lg"
>
  <MorphingDownloadIcon hover={hovered} />
  ${morphingDownloadIconExample.label}
</button>`

export {
  blueCtaButtonExample,
  blueCtaButtonUsage,
  gradientFaqExample,
  gradientFaqUsage,
  liquidGlassNavbarExample,
  liquidGlassNavbarUsage,
  macbookMockupExample,
  macbookMockupUsage,
  morphingDownloadIconExample,
  morphingDownloadIconUsage,
  pricingBlockExample,
  pricingBlockUsage,
  providerOrbitExample,
  providerOrbitUsage,
  releaseHistoryExample,
  releaseHistoryUsage,
  scrollRevealExample,
  scrollRevealUsage,
  singlePricingCardExample,
  singlePricingCardUsage,
  socialProofExample,
  socialProofUsage,
  stickyProductCtaExample,
  stickyProductCtaUsage,
  terminalCommandExample,
  terminalCommandUsage,
  testimonialsGridExample,
  testimonialsGridUsage,
  whatsNewCardExample,
  whatsNewCardUsage,
}
