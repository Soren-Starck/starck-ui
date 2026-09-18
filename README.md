<p align="center">
  <img src="./public/starck-ui-mark.svg" alt="STARCK UI" width="72" height="72" />
</p>

<h1 align="center">STARCK UI</h1>

<p align="center">
  The components we use to ship software.
</p>

<p align="center">
  <a href="https://ui.starck.studio">Website</a>
  ·
  <a href="https://ui.starck.studio/guide">Usage guide</a>
  ·
  <a href="./LICENSE">MIT license</a>
</p>

STARCK UI is a small, opinionated collection of open-code components built on
shadcn. Every component starts in a real STARCK product and is extracted only
after it proves useful.

## Install a component

Add the source directly to an existing shadcn project:

```sh
pnpm dlx shadcn@latest add https://ui.starck.studio/r/liquid-glass-navbar.json
```

The component becomes part of your codebase. Change it, restyle it, and make it
yours.

## Components

| Component                                                                            | What it does                                                                                    |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [Liquid Glass Navbar](https://ui.starck.studio/components/liquid-glass-navbar)       | Responsive navigation with expandable or fixed width, Chromium refraction, and a blur fallback. |
| [Blue CTA Button](https://ui.starck.studio/components/blue-cta-button)               | A dimensional call to action with sampled color tones, a specular rim, a quick press state, and macOS or Windows platform modes. |
| [Gradient FAQ](https://ui.starck.studio/components/gradient-faq)                     | An animated, crawlable accordion.                                                               |
| [Scroll Reveal](https://ui.starck.studio/components/scroll-reveal)                   | Progressive reveal and stagger primitives with reduced-motion support.                          |
| [Terminal Command](https://ui.starck.studio/components/terminal-command)             | A copyable command block with stable feedback and familiar macOS chrome.                        |
| [MacBook Mockup](https://ui.starck.studio/components/macbook-mockup)                 | A responsive device frame with an accessible optional fullscreen preview.                       |
| [Sticky Product CTA](https://ui.starck.studio/components/sticky-product-cta)         | A compact, scroll-aware product bar that keeps the next action within reach.                    |
| [Social Proof](https://ui.starck.studio/components/social-proof)                     | An accessible avatar stack, rating, and trust label.                                            |
| [Testimonials Grid](https://ui.starck.studio/components/testimonials-grid)           | A featured testimonial paired with quieter supporting stories.                                  |
| [What’s New Card](https://ui.starck.studio/components/whats-new-card)                | A focused product-update card with version, date, summary, and destination.                     |
| [Release History Dialog](https://ui.starck.studio/components/release-history-dialog) | Responsive release notes with body lock, Escape handling, and structured entries.               |
| [Single Pricing Card](https://ui.starck.studio/components/single-pricing-card)       | An opinionated one-plan pricing card for focused products.                                      |
| [Pricing Block](https://ui.starck.studio/components/pricing-block)                   | A responsive multi-plan block built from the single-plan card.                                  |
| [Provider Orbit](https://ui.starck.studio/components/provider-orbit)                 | A reduced-motion-aware integration orbit that pauses on inspection.                             |
| [Morphing Download Icon](https://ui.starck.studio/components/morphing-download-icon) | An Apple-to-download icon transition for Mac download calls to action.                          |
| [Founder Note](https://ui.starck.studio/components/founder-note)                     | A personal maker’s note with avatar, story, and contact links.                                 |

## Principles

- Real product use comes before inclusion.
- The live preview and usage example show the same component configuration.
- Accessibility, responsive behavior, and reduced motion are part of the component.
- STARCK UI provides craft defaults, not a mandatory brand skin.
- The registry source is canonical; the website renders that same source.

## Development

```sh
pnpm install
pnpm dev
```

Registry source lives in `registry/default`. Rebuild the public registry after a
component changes:

```sh
pnpm registry:build
```

Before opening a pull request, run:

```sh
pnpm typecheck
pnpm lint
pnpm build
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) before proposing a component.

## License and assets

The source code is available under the [MIT License](./LICENSE).

Third-party photographs and device mockup assets in `public/preview` are not
relicensed by this repository and remain subject to their original terms. The
product names and marks shown in demos belong to their respective owners and
are not granted under the MIT License.
