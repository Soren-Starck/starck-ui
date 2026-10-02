import {
  blueCtaButtonUsage,
  founderNoteUsage,
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

// Documentation copy may wrap code in backticks. Pages render those spans as
// <code>; metadata and JSON-LD strip them (see lib/inline-code.ts). Every
// behavior, prop and accessibility claim here must be true of the registry
// source in registry/default.

type ComponentProp = {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

type ComponentFaq = {
  question: string
  answer: string
}

type ComponentGuide = {
  title: string
  intro: string
  steps: readonly { title: string; body: string }[]
  codeTitle: string
  code: string
  note?: string
}

type ComponentEntry = {
  slug: string
  title: string
  /** Meta description and catalogue card copy: plain text, 150 characters max. */
  description: string
  /** Answer-first lead: what it is, then when to use it. */
  summary: string
  /** ISO date of the last change to this page's documentation or source. */
  updated: string
  sourceFiles: readonly string[]
  usage: string
  useCases: readonly string[]
  behaviors: readonly string[]
  props: readonly ComponentProp[]
  accessibility: readonly string[]
  faqs: readonly ComponentFaq[]
  guide?: ComponentGuide
}

const liquidGlassCode = `"use client"

import * as React from "react"

import { createLiquidGlass } from "@/lib/liquid-glass"

export function GlassPill({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const glass = createLiquidGlass(element, {
      borderRadius: Math.round(element.offsetHeight / 2),
      blur: 9,
      scale: -110,
      aberration: [0, 6, 12],
      saturation: 1.3,
      frost: 0.05,
    })
    return () => glass.destroy()
  }, [])

  return (
    <div ref={ref} className="rounded-full px-4 py-3 backdrop-blur-md">
      {children}
    </div>
  )
}`

const components: readonly ComponentEntry[] = [
  {
    slug: "liquid-glass-navbar",
    title: "Liquid Glass Navbar",
    description:
      "A floating React navbar with an Apple-style liquid glass effect: SVG refraction in Chromium, blur fallback elsewhere, a pill that widens on scroll.",
    summary:
      "A liquid glass navbar component for React and shadcn/ui that refracts the page behind it with an Apple-style liquid glass effect in Chromium browsers and falls back to a frosted blur in Safari and Firefox. Use it as the floating top bar of a product landing page that needs a logo, a few anchor links and one call to action.",
    updated: "2026-10-02",
    sourceFiles: [
      "registry/default/liquid-glass-navbar.tsx",
      "registry/default/liquid-glass.ts",
    ],
    usage: liquidGlassNavbarUsage(),
    useCases: [
      "The top bar of a product or app landing page, where hero imagery and screenshots scroll underneath and show off the refraction.",
      "Sites with one primary action (download, buy, sign up) that should stay visible in the header.",
      "Demos and previews that scroll inside an element instead of the window: pass `scrollContainerRef` and `contained`.",
    ],
    behaviors: [
      "In browsers whose user agent contains `Chrome/` (Chrome, Edge and other Chromium browsers), the bar's `backdrop-filter` is an SVG displacement filter, so content behind it bends at the rim with slight red, green and blue fringing.",
      "Everywhere else, including Safari and Firefox, the same helper sets `backdrop-filter: blur(12px)` instead. Before the effect mounts, Tailwind's `backdrop-blur-md` class already frosts the bar.",
      'With `widthBehavior="expand"` the desktop bar grows from 50% to 120% of the available width over the first 400px of scroll, never wider than 1200px. `"fixed"` keeps it at full width, up to 1200px.',
      "`contained` swaps `position: fixed` for a zero-height sticky header inside its parent. The expanding width then runs from 76% to 100% over 320px of scroll, with a minimum of `min(100%, 44rem)`.",
      "Below 640px a compact bar shows the logo, brand, version badge and CTA. The anchor links only appear from 640px up; there is no mobile menu.",
      "The glass is rebuilt when the viewport crosses 640px, and a ResizeObserver regenerates the refraction map whenever the bar changes size, so the effect follows the scroll-driven width.",
      "The logo and brand link to `#`. The CTA reuses the Blue CTA Button capsule and always shows the Apple logo.",
    ],
    props: [
      {
        name: "brand",
        type: "string",
        default: '"SessionWatcher"',
        description: "Product name shown next to the logo.",
      },
      {
        name: "version",
        type: "string",
        default: '"v7.3.0"',
        description: 'Small badge on the brand name. Pass `""` to hide it.',
      },
      {
        name: "logoSrc",
        type: "string",
        default: "SessionWatcher logo",
        description:
          'Logo image URL. Pass `""` to show a lettered placeholder instead.',
      },
      {
        name: "logoAlt",
        type: "string",
        default: "Value of `brand`",
        description: "Alt text for the logo image.",
      },
      {
        name: "links",
        type: "readonly { href: string; label: string }[]",
        default: "Pricing, Features and FAQ anchors",
        description: "Anchor links centered in the desktop bar.",
      },
      {
        name: "ctaHref",
        type: "string",
        default: '"#"',
        description: "Destination of the call to action.",
      },
      {
        name: "ctaLabel",
        type: "string",
        default: '"Get SessionWatcher"',
        description: "Text of the call to action.",
      },
      {
        name: "widthBehavior",
        type: '"expand" | "fixed"',
        default: '"expand"',
        description:
          "Whether the desktop bar widens with scroll or stays full width.",
      },
      {
        name: "contained",
        type: "boolean",
        default: "false",
        description:
          "Sticky inside its parent instead of fixed to the viewport.",
      },
      {
        name: "scrollContainerRef",
        type: "RefObject<HTMLElement | null>",
        description:
          "Element whose scroll position drives the width animation, instead of the window.",
      },
      {
        name: "className",
        type: "string",
        description: "Extra classes for the `header`.",
      },
    ],
    accessibility: [
      'Renders a `header` with `role="banner"` and a `nav` labelled "Main navigation". The mobile and desktop bars are both in the markup, but the inactive one is `display: none`, so assistive technology only meets one.',
      'The logo\'s alt text is `logoAlt`, falling back to `brand`. Pass `logoAlt=""` to mark it decorative, since the brand name sits right next to it.',
      "With `prefers-reduced-motion`, the scroll-linked width animation is off: the bar rests at 85% width, or 100% when `contained`.",
      "Links and the CTA are plain anchors in DOM order, and the CTA has a visible focus ring.",
      "The code does not read `prefers-reduced-transparency`, so the glass stays on when that setting is enabled.",
    ],
    guide: {
      title:
        "How to make an Apple-style liquid glass effect in React and Tailwind",
      intro:
        "There is no image or CSS-only trick. `lib/liquid-glass.ts`, adapted from Riz Roze's MIT-licensed liquid-glass, draws a refraction map for the bar's exact size and feeds it to `backdrop-filter`. Tailwind handles the layout and the initial blur; the helper adds the optics.",
      steps: [
        {
          title: "Draw a displacement map on a canvas",
          body: "`buildDisplacementMap` paints a canvas the size of the element plus padding. Neutral gray (128, 128, 128) means no displacement. Inside a rounded rectangle, a horizontal red gradient encodes x offsets and a vertical blue gradient, blended with `difference`, encodes y offsets. A blurred gray rounded rectangle inset from the edge flattens the middle, so the bending concentrates at the rim. The navbar's `blur: 9` softens that transition; it is not the visual blur. Maps are cached per size.",
        },
        {
          title: "Turn the map into an SVG filter",
          body: '`createFilterSvg` appends a hidden SVG whose filter loads the map with `feImage`, then runs three `feDisplacementMap` passes that read x from the red channel and y from the blue channel. `feColorMatrix` keeps one color channel per pass and `feBlend mode="screen"` recombines them. Each channel gets a slightly different scale (-110 plus an aberration of 0, 6 and 12 in the navbar), which produces the colored fringing.',
        },
        {
          title: "Apply it as a backdrop filter",
          body: "The element gets `backdrop-filter: url(#liquid-glass-n) saturate(1.3)`, with the `-webkit-` prefix, so the refraction applies to what is behind the bar rather than to its own content. `frost: 0.05` adds a 5% black tint, and the filter region is padded so displaced pixels are not clipped.",
        },
        {
          title: "Fall back outside Chromium",
          body: "`isChromium` is a user-agent test for `Chrome/`. Elsewhere, `createLiquidGlass` skips the SVG, sets `backdrop-filter: blur(12px)` (override it with `fallbackFilter`) and returns `isActive: false`, so you can tell which path ran.",
        },
        {
          title: "Mount and clean up from React",
          body: "The navbar calls `createLiquidGlass` in a `useEffect` on whichever bar is visible at `(min-width: 640px)`, with a border radius of half the bar's height, and calls `destroy()` on cleanup or when the breakpoint changes. `destroy()` removes the SVG and the inline styles.",
        },
      ],
      codeTitle:
        "The same effect on your own element, with the options the navbar uses",
      code: liquidGlassCode,
      note: "Reduced transparency: neither the helper nor the navbar checks `prefers-reduced-transparency`. To honor it, skip `createLiquidGlass` when that media query matches and give the element an opaque background.",
    },
    faqs: [
      {
        question: "Does the liquid glass effect work in Safari and Firefox?",
        answer:
          "They get a frosted blur, not the refraction. `createLiquidGlass` only builds the SVG displacement filter when the user agent contains `Chrome/`, which covers Chrome, Edge and other Chromium browsers. Everywhere else it applies `backdrop-filter: blur(12px)`, so the bar stays readable.",
      },
      {
        question: "Can I use the Liquid Glass Navbar without Next.js?",
        answer:
          "Yes. It renders plain `img` and `a` elements instead of `next/image` or `next/link`, so it works in any React project set up for shadcn/ui with Tailwind CSS. The shadcn CLI also installs framer-motion and the Blue CTA Button it depends on.",
      },
      {
        question: "How do I stop the navbar from widening on scroll?",
        answer:
          'Pass `widthBehavior="fixed"`. The desktop bar then stays at full width, up to 1200px. Visitors who prefer reduced motion never see the scroll animation either.',
      },
      {
        question: "Can I put the liquid glass effect on a card or a button?",
        answer:
          "Yes. The install adds `lib/liquid-glass.ts`: call `createLiquidGlass(element, options)` on any element with a size inside an effect, and `destroy()` on cleanup. The how-to on this page shows the exact options the navbar uses.",
      },
    ],
  },
  {
    slug: "blue-cta-button",
    title: "Blue CTA Button",
    description:
      "A glossy, dimensional CTA button for React: four color tones, specular rim, hover glow, press state, and macOS or Windows platform icons.",
    summary:
      "A call-to-action button component for React and shadcn/ui with a glossy, dimensional finish: a sampled color gradient, a specular top rim, inner shadows and a soft colored glow. Use it for the one action that matters most on a landing page, such as a Mac or Windows download or a purchase.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/blue-cta-button.tsx"],
    usage: blueCtaButtonUsage(),
    useCases: [
      "The primary download or buy button in a hero section.",
      "Products that ship on macOS and Windows and want the matching platform logo and button shape.",
      "Links and composed buttons that should share the look, through the exported `blueCtaClassName` and `blueCtaStyle`.",
    ],
    behaviors: [
      "`tone` picks one of four color sets (blue, violet, emerald, rose), applied as `--starck-blue-cta-*` CSS variables.",
      '`platform="macos"` draws a capsule with the Apple logo; `platform="windows"` draws a 10px rounded rectangle with the Windows 11 logo, matching the Fluent button shape.',
      "Hover lifts it 1px, brightens it and widens the glow. Pressing scales it to 98.5% with a 60ms transition.",
      "The base look is a `.starck-blue-cta` rule that the shadcn CLI adds to your CSS; the component sets the tone variables inline.",
      "`icon` replaces the platform logo, and `icon={null}` renders text only.",
      'It accepts every native `button` prop, defaults `type` to `"button"`, and uses the system font stack (-apple-system, SF Pro Text).',
      "It has no hooks, so it works as a React Server Component.",
    ],
    props: [
      {
        name: "tone",
        type: '"blue" | "violet" | "emerald" | "rose"',
        default: '"blue"',
        description: "Color set for the gradient, rim and glow.",
      },
      {
        name: "platform",
        type: '"macos" | "windows"',
        default: '"macos"',
        description: "Platform logo and button shape.",
      },
      {
        name: "icon",
        type: "ReactNode",
        default: "Platform logo",
        description: "Replaces the logo. Pass `null` for a text-only button.",
      },
      {
        name: "children",
        type: "ReactNode",
        default: '"Get SessionWatcher"',
        description: "Button label.",
      },
      {
        name: "...props",
        type: 'ComponentProps<"button">',
        description: 'Native button props. `type` defaults to `"button"`.',
      },
    ],
    accessibility: [
      "A native `button` with a `focus-visible` ring in the tone's glow color.",
      "Platform logos are `aria-hidden`, so the accessible name is the button text.",
      "Disabled buttons drop to 50% opacity and ignore pointer events.",
      "Hover and press feedback is CSS with no reduced-motion check; the movement is 1px plus a slight scale on press.",
    ],
    faqs: [
      {
        question: "How do I change the button color?",
        answer:
          "Pass `tone` as `blue`, `violet`, `emerald` or `rose`. For a brand color, add an entry to `blueCtaToneStyles` in the installed file with the five `--starck-blue-cta-*` variables.",
      },
      {
        question: "Can I use the Blue CTA Button as a link?",
        answer:
          "`BlueCtaButton` renders a `button`. For an anchor, put the exported `blueCtaClassName` and `blueCtaStyle` on your `a` element, as the Liquid Glass Navbar does. That gives the blue macOS capsule.",
      },
      {
        question: "Why is the Windows version not a pill?",
        answer:
          "Windows 11 Fluent buttons are rounded rectangles, so a capsule next to a Windows logo reads as a Mac button. The Windows mode uses a 10px radius instead.",
      },
    ],
  },
  {
    slug: "gradient-faq",
    title: "Gradient FAQ",
    description:
      "An animated React FAQ accordion that keeps every answer in the HTML for search engines, with aria-expanded buttons and a CSS grid height transition.",
    summary:
      "An FAQ accordion component for React and shadcn/ui that animates answers open with a CSS grid transition and keeps every answer in the page HTML. Use it for landing page FAQs when you want a light, animated accordion that search engines can still read in full.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/gradient-faq.tsx"],
    usage: gradientFaqUsage,
    useCases: [
      "The FAQ section of a product landing page or pricing page.",
      "Pages that also publish FAQPage structured data, since every answer is in the markup.",
      "Answers that need links or formatting, since `content` takes any React node.",
    ],
    behaviors: [
      "One item is open at a time, and clicking the open question closes it.",
      "`defaultOpen` picks the item open on load (0 by default). Pass an index that does not exist, such as -1, to start fully closed.",
      "Closed answers collapse with `grid-template-rows: 0fr` and fade to opacity 0 instead of unmounting, so the text is in the server-rendered HTML.",
      "The plus icon rotates 45 degrees into a close mark while padding and height animate over 300ms.",
    ],
    props: [
      {
        name: "items",
        type: "readonly { title: string; content: ReactNode }[]",
        required: true,
        description:
          "Questions and answers. Titles are used as keys, so keep them unique.",
      },
      {
        name: "defaultOpen",
        type: "number",
        default: "0",
        description: "Index of the item open on load.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the wrapper.",
      },
    ],
    accessibility: [
      "Each question is a `button` with `aria-expanded` and `aria-controls` pointing at its answer panel.",
      "Collapsed answers stay in the accessibility tree, and links inside them stay focusable, because they are hidden visually rather than with `hidden`.",
      "The 300ms transitions are CSS and do not check `prefers-reduced-motion`.",
    ],
    faqs: [
      {
        question: "Can search engines read the collapsed FAQ answers?",
        answer:
          "Yes. Answers are always rendered and only visually collapsed, so they are in the HTML. For FAQ structured data, add your own FAQPage JSON-LD with the same questions.",
      },
      {
        question: "Can more than one item be open at once?",
        answer:
          "No, it is a single-open accordion. To allow several, change the `openIndex` state to a set of indexes in the installed file.",
      },
      {
        question: "How do I start with every item closed?",
        answer:
          "Pass `defaultOpen={-1}`. No item matches that index, so every answer starts collapsed.",
      },
    ],
  },
  {
    slug: "scroll-reveal",
    title: "Scroll Reveal",
    description:
      "Reveal, Stagger and StaggerItem: framer-motion scroll animations that fade content in once as it enters view, with reduced-motion support.",
    summary:
      "Scroll reveal components for React and shadcn/ui: `Reveal` fades and lifts a block into place the first time it scrolls into view, and `Stagger` with `StaggerItem` does the same for a group, one child after another. Use them to give landing page sections a calm entrance, with shorter, opacity-only transitions for visitors who prefer reduced motion.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/scroll-reveal.tsx"],
    usage: scrollRevealUsage,
    useCases: [
      "Section headings and copy that should settle in as the visitor scrolls.",
      "Feature card grids where items appear one after another.",
      "Pages where motion must stay subtle and respect reduced-motion settings.",
    ],
    behaviors: [
      "`Reveal` and `Stagger` animate once, when 15% of the element is in view (`useInView` with `once: true`).",
      "`Reveal` starts fully visible in the server HTML and is only hidden by JavaScript, so its content shows even when scripts fail.",
      "`StaggerItem` children start at opacity 0 and appear in sequence, 0.07s apart by default, once their `Stagger` parent is in view.",
      "Default motion is a 20px rise for `Reveal` and 16px for `StaggerItem`, over 0.65s on a soft ease-out curve.",
      "With `prefers-reduced-motion` there is no vertical movement, no delay or stagger, and a 0.2s opacity fade.",
    ],
    props: [
      {
        name: "Reveal delay",
        type: "number",
        default: "0",
        description: "Seconds before the reveal starts.",
      },
      {
        name: "Reveal y",
        type: "number",
        default: "20",
        description: "Rise distance in pixels.",
      },
      {
        name: "Stagger stagger",
        type: "number",
        default: "0.07",
        description: "Seconds between children.",
      },
      {
        name: "Stagger delayChildren",
        type: "number",
        default: "0",
        description: "Seconds before the first child.",
      },
      {
        name: "StaggerItem y",
        type: "number",
        default: "16",
        description: "Rise distance in pixels.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Content of each wrapper (all three components).",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the wrapper `div` (all three components).",
      },
    ],
    accessibility: [
      "Reads `prefers-reduced-motion` through framer-motion's `useReducedMotion` and drops movement, delays and stagger.",
      "The wrappers are plain `div` elements, adding no roles or landmarks.",
    ],
    faqs: [
      {
        question: "Does Scroll Reveal respect reduced motion?",
        answer:
          "Yes. With `prefers-reduced-motion`, elements no longer move or stagger; they fade in over 0.2s.",
      },
      {
        question: "Will content stay hidden if JavaScript fails?",
        answer:
          "Not with `Reveal`: it is fully visible in the server HTML. `StaggerItem` starts at opacity 0, so keep essential above-the-fold content in `Reveal`.",
      },
      {
        question: "Does it animate again when I scroll back up?",
        answer:
          "No. Each element animates the first time it enters the viewport and then stays put.",
      },
    ],
  },
  {
    slug: "terminal-command",
    title: "Terminal Command",
    description:
      "A React terminal window for shell commands, with a copy button, $ prompts, macOS window dots and animated Copied feedback. Built for install commands.",
    summary:
      "A terminal command component for React and shadcn/ui that shows one or more shell commands in a dark macOS-style window with a copy button. Use it wherever visitors need to run something, such as a Homebrew or npm install command on a landing page or a quick start in your docs.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/terminal-command.tsx"],
    usage: terminalCommandUsage,
    useCases: [
      "Install commands on a product landing page (`brew install`, `npx`, `curl`).",
      "Short multi-step quick starts that should be copied in one click.",
      "Docs pages that want a terminal look without a syntax highlighter.",
    ],
    behaviors: [
      "Each string in `lines` renders on its own row after a green `$` prompt. The prompt is `select-none`, so manual text selection skips it.",
      'The copy button writes `lines.join("\\n")` to the clipboard with `navigator.clipboard.writeText`, without the prompts.',
      "After copying, the label swaps from Copy to Copied with a check icon for 1.8 seconds. The button has a fixed 74px width, so the title bar never shifts.",
      "If the clipboard write fails, the button simply stays on Copy.",
      "Long commands scroll horizontally instead of wrapping.",
      '`shell` sets the label next to the window dots (`"zsh"` by default), and framer-motion animates the label swap and the press.',
    ],
    props: [
      {
        name: "lines",
        type: "readonly string[]",
        required: true,
        description:
          "Commands, one per row. Lines are used as keys, so avoid exact duplicates.",
      },
      {
        name: "shell",
        type: "string",
        default: '"zsh"',
        description: "Label in the title bar.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the window.",
      },
    ],
    accessibility: [
      'The copy control is a native `button` named "Copy commands".',
      'The Copied state is visual only: the accessible name stays "Copy commands" and no live region announces success.',
      "The commands are real text, so they can be read and selected without the button.",
    ],
    faqs: [
      {
        question: "Does the copy button include the $ prompt?",
        answer:
          'No. It copies `lines.join("\\n")`, the raw commands only, and the `$` is excluded from manual selection too.',
      },
      {
        question: "Why does copying fail on my LAN or http:// URL?",
        answer:
          "`navigator.clipboard` only exists in secure contexts (HTTPS or localhost). On other origins the write throws, and the button stays on Copy.",
      },
      {
        question: "Can the terminal component show several commands?",
        answer:
          "Yes. Pass several strings in `lines`. Each gets its own prompt, and one click copies them all, separated by newlines.",
      },
      {
        question: "Does it highlight syntax?",
        answer:
          "No. Commands render as plain monospace text, which keeps the component free of a highlighter dependency.",
      },
    ],
  },
  {
    slug: "macbook-mockup",
    title: "MacBook Mockup",
    description:
      "Show a screenshot or live JSX inside a photographed MacBook frame. Responsive React component with an accessible fullscreen view for landing pages.",
    summary:
      "A MacBook mockup component for React and shadcn/ui that places any screenshot, video or live JSX inside a photographed silver MacBook frame. Use it on a landing page to show your app at laptop scale, with an optional click-to-fullscreen view for a closer look.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/macbook-mockup.tsx"],
    usage: macbookMockupUsage,
    useCases: [
      "A hero or feature section that shows a desktop or web app screenshot in context.",
      "Live JSX instead of a static image, so the screen stays crisp and editable. Set `expandable={false}` if visitors need to click inside it.",
      "Product pages where a fullscreen view helps visitors read small interface details.",
    ],
    behaviors: [
      "The frame keeps the photo's 1792 by 1165 aspect ratio, fills its container up to `max-w-4xl`, and places children in a screen area inset 11.7% from the top and 11.6% from the sides and bottom, so content scales with the frame.",
      "The frame is a photographed WebP layered above your content. By default `frameSrc` loads it from ui.starck.studio; copy the file into your own public folder and pass `frameSrc` to self-host it.",
      "When `expandable` (the default), hovering or focusing the screen shows a Fullscreen hint, and clicking opens a portal overlay with a larger copy of the frame, up to `max-w-6xl`.",
      "The overlay renders `children` a second time, so stateful content starts fresh there.",
      "The overlay locks page scroll and closes on Escape, on the close button, or on a click outside the frame.",
    ],
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description:
          "Screen content: an image, a video or any JSX. Give it `size-full` to fill the screen.",
      },
      {
        name: "frameSrc",
        type: "string",
        default: '"https://ui.starck.studio/preview/macbook-frame.webp"',
        description: "URL of the frame image.",
      },
      {
        name: "expandable",
        type: "boolean",
        default: "true",
        description: "Adds the fullscreen button and dialog.",
      },
      {
        name: "label",
        type: "string",
        default: '"Open fullscreen preview"',
        description: "Accessible name of the fullscreen button and dialog.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the outer wrapper, such as a max width.",
      },
    ],
    accessibility: [
      "The fullscreen trigger is a real `button` named by `label`, with a visible focus ring, and the Fullscreen hint also appears on keyboard focus.",
      'The overlay has `role="dialog"`, `aria-modal="true"` and the same label. Focus moves to the Close preview button, Tab cycles through the dialog\'s buttons, and focus returns to the trigger on close.',
      "The frame image has empty alt text because it is decorative; give your screenshot its own alt text.",
    ],
    faqs: [
      {
        question:
          "Can I put a video or a live React component inside the MacBook mockup?",
        answer:
          "Yes. `children` can be any React node; make it fill the screen with `size-full` (plus `object-cover` for an image or video). For interactive content, pass `expandable={false}`, because the fullscreen trigger is a button that covers the screen area.",
      },
      {
        question: "Is the MacBook frame CSS or an image?",
        answer:
          "An image: a photographed 1792 by 1165 MacBook frame, the same one SessionWatcher uses, layered above your content. CSS handles the aspect ratio and the screen inset.",
      },
      {
        question: "How do I turn off the fullscreen preview?",
        answer:
          "Pass `expandable={false}`. The mockup then renders only the frame and your content, with no button or dialog.",
      },
      {
        question: "Does the MacBook mockup need any dependencies?",
        answer:
          "No. It uses React and `createPortal` from react-dom, styled with Tailwind classes.",
      },
    ],
  },
  {
    slug: "sticky-product-cta",
    title: "Sticky Product CTA",
    description:
      "A sticky bottom call-to-action bar for React landing pages. Slides up after a scroll threshold with your product name, tagline and buttons.",
    summary:
      "A sticky call-to-action bar component for React and shadcn/ui that slides up from the bottom of the viewport once the visitor scrolls past a threshold, showing your product name, a short line and your actions. Use it on long product landing pages so the buy or download button stays within reach after the hero CTA scrolls away.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/sticky-product-cta.tsx"],
    usage: stickyProductCtaUsage,
    useCases: [
      "Long landing pages where the hero call to action scrolls out of view.",
      "Mobile visitors: below 640px the bar keeps just the title and the primary action.",
      "Previews inside a bounded container, with `contained`.",
    ],
    behaviors: [
      "It is visible when `window.scrollY >= showAfter` (600px by default), checked by a passive scroll listener. `showAfter={0}` shows it immediately.",
      "It slides in and out with a 300ms transform and hides again when the visitor scrolls back above the threshold; scroll direction does not matter.",
      "It is `fixed` to the bottom of the viewport. `contained` switches it to `absolute`, so it sits at the bottom of the nearest positioned parent; visibility still follows the window's scroll in both modes.",
      "Below 640px, `description` and `secondaryAction` are hidden. Title and description truncate to one line.",
      "Actions are slots: pass your own link or button, such as a shadcn `Button` or a plain anchor. `icon` renders in a 36px dark rounded tile.",
      "The bar is white at 88% opacity with a backdrop blur.",
    ],
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Product name or headline.",
      },
      {
        name: "description",
        type: "string",
        description: "Short line under the title, hidden below 640px.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "App icon or logo shown in a 36px tile.",
      },
      {
        name: "primaryAction",
        type: "ReactNode",
        required: true,
        description: "Your main link or button.",
      },
      {
        name: "secondaryAction",
        type: "ReactNode",
        description: "Optional second action, hidden below 640px.",
      },
      {
        name: "showAfter",
        type: "number",
        default: "600",
        description: "Window scroll offset in pixels before the bar appears.",
      },
      {
        name: "contained",
        type: "boolean",
        default: "false",
        description:
          "Positions the bar absolutely inside its parent instead of fixed to the viewport.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the outer bar.",
      },
    ],
    accessibility: [
      "While hidden, the bar is `aria-hidden` and translated off-screen, but its actions are not `inert`, so they stay in the Tab order. Add `inert` while hidden in the installed file if that matters on your page.",
      "The title is a paragraph, not a heading, so the bar does not add to the page outline.",
      "The slide is a CSS transform transition with no reduced-motion check.",
    ],
    faqs: [
      {
        question: "How do I control when the sticky bar appears?",
        answer:
          "Set `showAfter` to a window scroll offset in pixels. The default is 600, and `0` shows the bar from the start.",
      },
      {
        question: "Does the sticky CTA bar work on mobile?",
        answer:
          "Yes. It spans the full width, and below 640px the description and secondary action are hidden so the title and primary action fit on one row.",
      },
      {
        question: "Can it follow a scrolling container instead of the window?",
        answer:
          "Not as written. `contained` changes positioning only; visibility always reads `window.scrollY`. Use `showAfter={0}` for an always-visible contained bar, as the preview on this page does.",
      },
      {
        question: "Does it hide when the visitor scrolls back up?",
        answer:
          "Only below the threshold. It hides when the window scroll position drops under `showAfter` again, and it does not react to scroll direction.",
      },
    ],
  },
  {
    slug: "social-proof",
    title: "Social Proof",
    description:
      "An overlapping avatar stack, star rating and short trust label for React landing pages, in light and dark variants. No dependencies.",
    summary:
      "A social proof component for React and shadcn/ui that shows an overlapping stack of customer avatars next to a star rating and a short trust label. Use it under a hero headline or beside a call to action to show, in one line, that real people use the product.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/social-proof.tsx"],
    usage: socialProofUsage,
    useCases: [
      "Under a hero headline or next to the primary call to action.",
      "Pricing and checkout areas that need a quiet trust signal.",
      'Dark hero sections, with `variant="dark"`.',
    ],
    behaviors: [
      "Avatars overlap, each with a 2px ring that matches the variant's background.",
      "Each avatar is an image when `src` is set, otherwise a colored circle with `initials`, or the first two letters of `name`.",
      "`rating` fills that many of five amber stars. Stars are whole, and a fractional rating fills the next star, so pass an integer.",
      '`variant="dark"` switches the ring, empty-star and label colors for dark backgrounds.',
      "It has no hooks, so it renders on the server.",
    ],
    props: [
      {
        name: "avatars",
        type: "readonly { name: string; src?: string; initials?: string; color?: string }[]",
        required: true,
        description: "People to show. Names are used as keys.",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "Trust line under the stars.",
      },
      {
        name: "rating",
        type: "number",
        default: "5",
        description: "Filled stars out of five.",
      },
      {
        name: "variant",
        type: '"light" | "dark"',
        default: '"light"',
        description: "Colors for light or dark backgrounds.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the wrapper.",
      },
    ],
    accessibility: [
      "Image avatars use the person's name as alt text, and initials avatars carry the name as a `title` tooltip.",
      'The avatar group and star row have `aria-label` text ("4 customer avatars", "5 out of 5 stars") on plain `div` elements, which some screen readers ignore, so make `label` meaningful on its own.',
      "The star icons themselves are `aria-hidden`.",
    ],
    faqs: [
      {
        question: "Can I use real customer photos?",
        answer:
          "Yes. Give each avatar a `src`; the image uses the person's name as its alt text. Without `src`, it falls back to initials on `color`.",
      },
      {
        question: "Does the rating support half stars?",
        answer:
          "No. Stars are whole, and a fractional `rating` fills the next star, so 4.5 shows five. Pass an integer to keep the stars and the label consistent.",
      },
      {
        question: "Will it work on a dark background?",
        answer:
          'Yes. Pass `variant="dark"` to switch the avatar rings and text colors.',
      },
    ],
  },
  {
    slug: "testimonials-grid",
    title: "Testimonials Grid",
    description:
      "A React testimonials section: one large featured quote with stars beside smaller supporting quotes, each with name, role and avatar.",
    summary:
      "A testimonials section component for React and shadcn/ui that features one large quote and sets smaller supporting quotes beside it. Use it on a landing page when you have one standout customer quote and a few shorter ones to back it up.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/testimonials-grid.tsx"],
    usage: testimonialsGridUsage,
    useCases: [
      "A testimonials section with one hero quote and two or more supporting quotes.",
      "Pages where quotes should read as editorial content rather than a carousel.",
    ],
    behaviors: [
      "The first testimonial is featured: larger type, a decorative quotation mark and a five-star row. The rest render as smaller cards.",
      "From the `lg` breakpoint it is two columns, with the featured quote spanning two rows; below that, every quote stacks. Three testimonials fill the layout exactly.",
      "Each person shows `avatar` as an image, or `initials` (or the first two letters of `name`) on a blue-to-violet gradient.",
      "Quotes are wrapped in curly quotation marks for you.",
      "The featured stars are fixed text, not a rating prop, and an empty array renders nothing.",
      "It has no hooks, so it renders on the server.",
    ],
    props: [
      {
        name: "testimonials",
        type: "readonly { quote: string; name: string; role?: string; avatar?: string; initials?: string }[]",
        required: true,
        description:
          "The first item is featured. Names are used as keys, so keep them unique.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the grid.",
      },
    ],
    accessibility: [
      "Each testimonial is a `figure` with a `blockquote` and a `figcaption` naming the person.",
      "The large decorative quotation mark is `aria-hidden`, and avatar images have empty alt text because the name is printed beside them.",
      "The featured ★★★★★ row is plain text with no label.",
    ],
    faqs: [
      {
        question: "Which testimonial gets featured?",
        answer:
          "The first item in `testimonials`. Put your strongest quote first.",
      },
      {
        question: "How many testimonials should I pass?",
        answer:
          "Three fill the two-column layout exactly: the featured quote on the left and two cards stacked on the right. More continue in rows below.",
      },
      {
        question: "Can I remove the stars?",
        answer:
          "Yes, by deleting the ★★★★★ line in the installed file. They are not driven by a prop.",
      },
    ],
  },
  {
    slug: "whats-new-card",
    title: "What’s New Card",
    description:
      "A React card that announces your latest release: version, date, title, summary and an optional Read more link. Server-renderable, no dependencies.",
    summary:
      "A What's New card component for React and shadcn/ui that announces one product update with its version, date, title and a short summary. Use it on a homepage, dashboard or download page to point visitors at your latest release.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/whats-new-card.tsx"],
    usage: whatsNewCardUsage,
    useCases: [
      "Highlighting the latest release on a homepage or download page.",
      "A dashboard tile that links to your release notes.",
    ],
    behaviors: [
      "With `href`, the whole card becomes one link and shows Read more with an arrow that nudges right on hover. Without it, the card is an `article`.",
      '`version` is prefixed with "v", so pass "2.4.0" rather than "v2.4.0".',
      "Hover lifts the card 2px and deepens its shadow.",
      "`date` is a display string inside a `time` element.",
      "It has no hooks, so it renders on the server.",
    ],
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Headline of the update.",
      },
      {
        name: "version",
        type: "string",
        required: true,
        description: 'Version without the "v" prefix.',
      },
      {
        name: "date",
        type: "string",
        required: true,
        description: "Display date, shown as written.",
      },
      {
        name: "summary",
        type: "string",
        required: true,
        description: "One or two sentences about the update.",
      },
      {
        name: "href",
        type: "string",
        description: "Makes the whole card a link with a Read more hint.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the card.",
      },
    ],
    accessibility: [
      "When linked, the whole card is one anchor, so its accessible name is all of the card's text. Keep the title and summary short.",
      "The title is an `h3`; change the level in the installed file if it does not fit your outline.",
      "The arrow icon is `aria-hidden`.",
    ],
    faqs: [
      {
        question: "Should the version include a v?",
        answer:
          'No. The card adds the "v" itself, so `version="2.4.0"` renders as v2.4.0.',
      },
      {
        question: "Can the card open a changelog dialog instead of a page?",
        answer:
          "Not as written: with `href` it renders a link. Link it to your release notes page, or use the Release History Dialog for an in-page changelog.",
      },
      {
        question: "Is the date formatted for me?",
        answer:
          'No. `date` is shown exactly as you pass it, so format it before rendering, for example "September 2026".',
      },
    ],
  },
  {
    slug: "release-history-dialog",
    title: "Release History Dialog",
    description:
      "A release notes and changelog modal for React: versions, dates and notes, focus trapping, Escape to close, and a bottom sheet on mobile.",
    summary:
      "A release notes dialog component for React and shadcn/ui that opens a modal changelog listing each version with its date and notes. Use it for a Release history or What's new button in your app or on your site when a full changelog page would be overkill.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/release-history-dialog.tsx"],
    usage: releaseHistoryUsage,
    useCases: [
      "A Release history button on a download page, in an app footer or in settings.",
      "Desktop or web apps that already track releases as a version, a date and a few notes.",
      "Mobile-heavy sites, where the dialog opens as a bottom sheet.",
    ],
    behaviors: [
      "It renders its own trigger button (`triggerLabel`) and portals the dialog to `document.body`.",
      "On small screens it slides up as a bottom sheet with rounded top corners, up to 88vh tall; from 640px it is a centered card, up to 80vh. The release list scrolls while the header stays in place.",
      'Releases render in the order you pass them, each with a "Version x" heading, a date pill and a bulleted list of notes. It does not sort.',
      "Opening locks page scroll. Escape, the dimmed backdrop and the close button all close it.",
      "framer-motion fades and lifts it in over 0.26s; with `prefers-reduced-motion` the transitions are instant.",
    ],
    props: [
      {
        name: "releases",
        type: "readonly { version: string; date: string; notes: readonly string[] }[]",
        required: true,
        description:
          "Release entries in display order. Versions and notes are used as keys, so keep them unique.",
      },
      {
        name: "triggerLabel",
        type: "string",
        default: '"Release history"',
        description: "Text of the trigger button.",
      },
      {
        name: "title",
        type: "string",
        default: '"Release notes"',
        description: "Dialog heading, also its accessible name.",
      },
      {
        name: "description",
        type: "string",
        default: '"Every release, newest first."',
        description: "Line under the heading.",
      },
    ],
    accessibility: [
      'The dialog has `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing at its `h2` title.',
      "Focus moves to the Close button on open, Tab and Shift+Tab stay inside the dialog, and focus returns to the trigger when it closes.",
      "The backdrop is a button with `tabIndex={-1}`, so it closes the dialog on click without adding a Tab stop.",
      "Each release is a list item with an `h3`, inside an ordered list.",
      "Reduced motion removes the open and close animation.",
    ],
    faqs: [
      {
        question: "Does the release notes dialog sort releases by date?",
        answer:
          'No. It renders `releases` in array order, so pass the newest release first. That matches the default description, "Every release, newest first."',
      },
      {
        question: "Does it use the shadcn Dialog, Radix or Base UI?",
        answer:
          "No. It is self-contained: a React portal plus framer-motion, with its own focus trap, Escape handling, scroll lock and focus return. framer-motion is the only dependency the shadcn CLI installs.",
      },
      {
        question: "Can I load the changelog from GitHub releases or a CMS?",
        answer:
          "Yes, if you map each entry to `{ version, date, notes }` first. Notes render as plain text, so turn Markdown into short strings before passing them in.",
      },
      {
        question: "How does the changelog dialog look on mobile?",
        answer:
          "Below 640px it opens as a bottom sheet anchored to the bottom edge, up to 88% of the viewport height, with the list scrolling inside.",
      },
    ],
  },
  {
    slug: "single-pricing-card",
    title: "Single Pricing Card",
    description:
      "A one-plan pricing card for React and Tailwind: price, optional interval, feature checklist, badge and CTA link. For products with a single offer.",
    summary:
      "A single pricing card component for React and shadcn/ui that presents one plan: name, price, optional billing interval, a short description, a feature checklist and one call-to-action link. Use it when your product sells one offer, such as a lifetime license or a single subscription, and a multi-tier pricing table would only add noise.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/single-pricing-card.tsx"],
    usage: singlePricingCardUsage,
    useCases: [
      "The pricing section of a product with one plan or a one-time purchase.",
      "A buy box beside a feature list, a comparison or an FAQ.",
      "A starting point for tiers later: the Pricing Block renders this same card for each plan.",
    ],
    behaviors: [
      "`highlighted` inverts the card to a near-black background with a white CTA and a deep shadow; otherwise it is white with a black CTA.",
      "`badge` adds a small uppercase pill in the top-right corner.",
      '`interval` renders as "/ interval" after the price. Leave it out for one-time prices.',
      '`price` is a string, so currency formatting is yours ("$29", "29 €").',
      "The CTA is a plain link to `ctaHref` that lifts 2px on hover, and the card fills its parent's height (`h-full`) so cards in a row match.",
      "Colors are fixed Tailwind zinc and white classes rather than shadcn theme tokens.",
      'It has no hooks, no `"use client"` and no dependencies, so it renders as a React Server Component.',
    ],
    props: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Plan name shown above the price.",
      },
      {
        name: "price",
        type: "string",
        required: true,
        description: 'Display price, for example "$29".',
      },
      {
        name: "interval",
        type: "string",
        description: 'Billing period, shown as "/ interval" after the price.',
      },
      {
        name: "description",
        type: "string",
        required: true,
        description: "Short pitch under the price.",
      },
      {
        name: "features",
        type: "readonly string[]",
        required: true,
        description:
          "Checklist items. Each is used as a key, so keep them unique.",
      },
      {
        name: "ctaLabel",
        type: "string",
        required: true,
        description: "Text of the call to action.",
      },
      {
        name: "ctaHref",
        type: "string",
        required: true,
        description:
          "Destination of the call to action, such as a checkout URL.",
      },
      {
        name: "badge",
        type: "string",
        description: "Small label in the top-right corner.",
      },
      {
        name: "highlighted",
        type: "boolean",
        default: "false",
        description: "Inverted dark style for the featured plan.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the card.",
      },
    ],
    accessibility: [
      "The card is an `article` and the features are a real `ul`, read in visual order.",
      "Check icons are `aria-hidden`, so screen readers hear only the feature text.",
      'The CTA\'s accessible name is `ctaLabel`, so make it specific ("Get lifetime access" rather than "Buy").',
    ],
    faqs: [
      {
        question: "How do I show a one-time price instead of a monthly one?",
        answer:
          "Leave out `interval`. The card then shows only the price string, which suits lifetime and one-time offers.",
      },
      {
        question: "Does the pricing card follow my shadcn theme and dark mode?",
        answer:
          "No. It uses fixed Tailwind zinc and white classes, so it looks the same everywhere. To follow your theme, swap them for tokens such as `bg-card` and `text-foreground` in the installed file.",
      },
      {
        question: "Can the button open Stripe Checkout?",
        answer:
          "The CTA is a plain link, so point `ctaHref` at any checkout URL, such as a Stripe Payment Link. If you need to call an API first, replace the anchor with a button in the installed file.",
      },
      {
        question: "How do I show several plans side by side?",
        answer:
          "Use the Pricing Block. It renders one Single Pricing Card per plan in a responsive grid.",
      },
    ],
  },
  {
    slug: "pricing-block",
    title: "Pricing Block",
    description:
      "A responsive React pricing table for two or three plans, each a Single Pricing Card with price, features, badge, CTA and an optional highlight.",
    summary:
      "A pricing table component for React and shadcn/ui that lays out several plans in a responsive grid, rendering each one with the Single Pricing Card. Use it for a two- or three-tier pricing section where one recommended plan should stand out.",
    updated: "2026-10-02",
    sourceFiles: [
      "registry/default/pricing-block.tsx",
      "registry/default/single-pricing-card.tsx",
    ],
    usage: pricingBlockUsage,
    useCases: [
      "Solo and team tiers, or free and paid plans, side by side.",
      "Monthly tiers with one recommended plan, marked with `badge` and `highlighted`.",
      "Keeping single-plan and multi-plan pages consistent, since both use the same card.",
    ],
    behaviors: [
      "Columns follow the plan count: one plan stays a single card up to `max-w-md`, two or more become two columns from the `md` breakpoint, and three or more become three columns from `lg`, wrapping onto new rows.",
      "Cards in a row stretch to equal height.",
      "Each plan object is spread onto a Single Pricing Card, so `interval`, `badge` and `highlighted` work per plan.",
      "Plans are keyed by `name`, so plan names must be unique.",
      "It has no hooks, so it renders on the server.",
    ],
    props: [
      {
        name: "plans",
        type: "readonly PricingPlan[]",
        required: true,
        description:
          "Each plan takes the Single Pricing Card props: `name`, `price`, `interval`, `description`, `features`, `ctaLabel`, `ctaHref`, `badge` and `highlighted`.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the grid.",
      },
    ],
    accessibility: [
      "Each plan is its own `article` with a real feature list.",
      'Highlighting is visual (color and shadow). Put the recommendation in `badge` text as well, for example "Popular", so it is read aloud.',
    ],
    faqs: [
      {
        question: "How many plans can the pricing block show?",
        answer:
          "Any number. One plan renders a single card, two use two columns from `md`, and three or more use three columns from `lg`, wrapping onto new rows.",
      },
      {
        question: "How do I highlight the recommended plan?",
        answer:
          'Set `highlighted: true` and a `badge` such as "Popular" on that plan. The highlighted card inverts to a dark style.',
      },
      {
        question: "Does it include a monthly and yearly toggle?",
        answer:
          "No. Each plan has one `price` and `interval`. For a billing toggle, keep two plan arrays in your own state and pass the active one to `plans`.",
      },
    ],
  },
  {
    slug: "provider-orbit",
    title: "Provider Orbit",
    description:
      "An animated integrations orbit for React: provider icons circle your app's mark, pause on hover and stay still for reduced-motion users.",
    summary:
      "An integrations orbit component for React and shadcn/ui that circles provider or integration icons around your product's mark. Use it in a landing page section that answers what your product works with, when the list is short enough to take in at a glance.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/provider-orbit.tsx"],
    usage: providerOrbitUsage,
    useCases: [
      "Showing the services or AI providers a product connects to.",
      "A visual centerpiece for an integrations section, backed by a plain list for screen readers.",
    ],
    behaviors: [
      "Items are spaced evenly around the circle and stay upright while the ring turns, because each icon counter-rotates.",
      "One revolution takes `duration` seconds (32 by default, minimum 1), driven by `useAnimationFrame`.",
      "Rotation pauses while the pointer is over the orbit and resumes when it leaves.",
      "With `prefers-reduced-motion` the orbit stays still.",
      "The orbit is square, up to 420px wide, with a radius of `clamp(112px, 38vw, 170px)`.",
    ],
    props: [
      {
        name: "items",
        type: "readonly { name: string; icon: ReactNode }[]",
        required: true,
        description:
          "Providers on the ring. Names are used as keys and listed for screen readers.",
      },
      {
        name: "center",
        type: "ReactNode",
        required: true,
        description: "Content of the central tile, such as your logo or name.",
      },
      {
        name: "duration",
        type: "number",
        default: "32",
        description: "Seconds per revolution.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the orbit wrapper.",
      },
    ],
    accessibility: [
      "A visually hidden list repeats every provider name, so screen readers get the integrations as plain text.",
      "Icon tiles have the provider name as a `title` tooltip, and the dashed ring is `aria-hidden`.",
      "Reduced motion stops the rotation entirely. Pausing is pointer-based, as the orbit has no focusable parts.",
    ],
    faqs: [
      {
        question: "Does the orbit respect reduced motion?",
        answer:
          "Yes. When `prefers-reduced-motion` is set, the animation frame loop skips every update, so the orbit stays still.",
      },
      {
        question: "Can I use real logos?",
        answer:
          "Yes. `icon` accepts any React node, such as an inline SVG or an `img`, rendered in a 48px tile.",
      },
      {
        question: "How do I change the speed?",
        answer:
          "Set `duration` to the number of seconds for one full turn. Lower is faster, and values under 1 are treated as 1.",
      },
    ],
  },
  {
    slug: "morphing-download-icon",
    title: "Morphing Download Icon",
    description:
      "A React icon that morphs the Apple logo into a download arrow on hover, using flubber path interpolation. Made for Download for Mac buttons.",
    summary:
      "A morphing icon component for React and shadcn/ui that turns the Apple logo into a download arrow when you set its `hover` prop. Use it inside a Download for Mac button so the icon confirms what the click will do.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/morphing-download-icon.tsx"],
    usage: morphingDownloadIconUsage,
    useCases: [
      "Download for Mac buttons on a desktop app's landing page.",
      "Any call to action where the Apple logo should resolve into a download on hover or focus.",
    ],
    behaviors: [
      "It is controlled: set `hover` and it animates from the Apple logo to the arrow over 0.32s, and back when `hover` turns false.",
      "flubber's `interpolateAll` morphs the Apple body into the arrow and the leaf into the tray, and the icon nudges down 1.5px as it morphs.",
      "It draws with `currentColor`, so it inherits the button's text color. Size it with `className` (`size-4` by default).",
      "The path interpolators are built once per mount.",
    ],
    props: [
      {
        name: "hover",
        type: "boolean",
        required: true,
        description: "Drives the morph: `true` shows the download arrow.",
      },
      {
        name: "className",
        type: "string",
        default: '"size-4"',
        description: "Classes for the SVG, mainly its size.",
      },
    ],
    accessibility: [
      "The SVG is `aria-hidden`, so the button text carries the meaning.",
      "Set `hover` from focus as well as mouse events so keyboard users see the morph, as the usage on this page does.",
      "The morph does not check `prefers-reduced-motion`.",
    ],
    faqs: [
      {
        question: "Why is hover a prop instead of CSS :hover?",
        answer:
          "The morph is a JavaScript path interpolation, so the icon needs the state. A prop lets you trigger it from hover, focus or any other state on the parent button.",
      },
      {
        question: "What does the morphing icon depend on?",
        answer:
          "framer-motion for the animation and flubber for the shape interpolation. The shadcn CLI installs both, plus `@types/flubber`.",
      },
    ],
  },
  {
    slug: "founder-note",
    title: "Founder Note",
    description:
      "A personal note from the maker for React landing pages: avatar, name, role, short message and contact links, optionally sticky beside an FAQ.",
    summary:
      "A founder note component for React and shadcn/ui that shows the maker's photo, name and role, a few short paragraphs in their own voice, and icon links to reach them. Use it beside an FAQ or support section on an indie product's site to put a real person behind the product.",
    updated: "2026-10-02",
    sourceFiles: ["registry/default/founder-note.tsx"],
    usage: founderNoteUsage,
    useCases: [
      "Next to an FAQ or support section, so questions end with a person.",
      "The closing section of an indie product's landing page.",
    ],
    behaviors: [
      "The first paragraph is treated as the greeting and set in a darker color.",
      'External links open in a new tab with `rel="noopener noreferrer"`, while `mailto:` links open normally.',
      "`sticky` pins it with `lg:sticky lg:top-24` from the `lg` breakpoint, useful beside a long FAQ column.",
      "Link icons are a slot, so it ships without an icon library.",
      "It has no hooks, so it renders on the server.",
    ],
    props: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Founder's name, also the avatar's alt text.",
      },
      {
        name: "role",
        type: "string",
        required: true,
        description: "Line under the name.",
      },
      {
        name: "avatarSrc",
        type: "string",
        required: true,
        description: "Photo URL.",
      },
      {
        name: "paragraphs",
        type: "readonly string[]",
        required: true,
        description:
          "The note. The first is styled as the greeting, and each is used as a key.",
      },
      {
        name: "links",
        type: "readonly { label: string; href: string; icon: ReactNode }[]",
        default: "[]",
        description: "Icon links. `label` becomes the accessible name.",
      },
      {
        name: "sticky",
        type: "boolean",
        default: "false",
        description:
          "Sticks to the top of the viewport from the `lg` breakpoint.",
      },
      {
        name: "className",
        type: "string",
        description: "Classes for the `aside`.",
      },
    ],
    accessibility: [
      "Rendered as an `aside`, with the avatar's alt text set to `name`.",
      "Icon-only links use `label` as their `aria-label`.",
    ],
    faqs: [
      {
        question: "Where should a founder note go on a landing page?",
        answer:
          "It was built to sit beside an FAQ or support section. On large screens, `sticky` keeps it in view while that column scrolls.",
      },
      {
        question: "Do I need an icon library for the links?",
        answer:
          "No. Each link takes its own `icon` node, such as an inline SVG, so you choose the icons.",
      },
    ],
  },
]

function getComponent(slug: string) {
  return components.find((component) => component.slug === slug)
}

export { components, getComponent }
export type { ComponentEntry, ComponentFaq, ComponentGuide, ComponentProp }
