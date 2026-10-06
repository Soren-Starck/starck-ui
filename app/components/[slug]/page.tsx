import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ComponentWorkbench } from "@/components/component-workbench"
import { getComponentProvenance } from "@/lib/component-provenance.generated"
import { components, getComponent } from "@/lib/components"
import { jsonLd, repoUrl, siteName, siteUrl } from "@/lib/site"

type Props = {
  params: Promise<{ slug: string }>
}

const liquidGlassNavbarFaq = [
  {
    question: "Is there a shadcn liquid glass navbar component for React?",
    answer:
      "Yes. STARCK UI ships the Liquid Glass Navbar as React source through its shadcn registry.",
  },
  {
    question: "What does the Liquid Glass Navbar include?",
    answer:
      "It renders responsive mobile and desktop navigation, accepts brand, logo, links and CTA props, and supports expandable or fixed desktop width.",
  },
  {
    question: "What happens outside Chromium browsers?",
    answer:
      "The component uses a backdrop-blur fallback when its Chromium SVG refraction filter is not active.",
  },
] as const

const macbookMockupFaq = [
  {
    question: "What can I place inside the React MacBook mockup?",
    answer:
      "The required children prop accepts any React node, so the screen can contain an image, screenshot, video, or rendered landing-page interface.",
  },
  {
    question: "How does the optional fullscreen preview behave?",
    answer:
      "Fullscreen is enabled by default through the expandable prop. The dialog moves focus to its close button, contains Tab focus, closes with Escape or a backdrop click, locks body scrolling while open, and restores focus to the trigger when it closes.",
  },
  {
    question: "What frame and aspect ratio does MacBook Mockup use?",
    answer:
      "The default frameSrc is https://ui.starck.studio/preview/macbook-frame.webp. The wrapper uses a responsive 1792:1165 aspect ratio, full available width, and a maximum width of 4xl.",
  },
] as const

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const component = getComponent((await params).slug)
  if (!component) return {}

  const title = `${component.title} for shadcn/ui`
  const url = `/components/${component.slug}`
  return {
    title,
    description: component.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: component.description,
      url: `${siteUrl}${url}`,
      siteName,
      type: "website",
    },
  }
}

export default async function ComponentPage({ params }: Props) {
  const component = getComponent((await params).slug)
  if (!component) notFound()
  const provenance = getComponentProvenance(component.slug)

  const sources = await Promise.all(
    component.sourceFiles.map(async (sourcePath) => ({
      path: sourcePath,
      content: await readFile(
        path.join(
          process.cwd(),
          "registry",
          "default",
          path.basename(sourcePath)
        ),
        "utf8"
      ),
    }))
  )

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: component.title,
    description: component.description,
    url: `${siteUrl}/components/${component.slug}`,
    codeRepository: repoUrl,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: "React",
    license: "https://opensource.org/licenses/MIT",
    author: {
      "@type": "Person",
      name: "Soren Starck",
      url: "https://starck.studio",
    },
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
  }
  const pageStructuredData =
    component.slug === "liquid-glass-navbar"
      ? [
          structuredData,
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: liquidGlassNavbarFaq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : component.slug === "macbook-mockup"
        ? [
            structuredData,
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: macbookMockupFaq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : structuredData

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(pageStructuredData)}
      />
      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.035em]">
          {component.title}
        </h1>
        {component.slug === "macbook-mockup" ? (
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            STARCK UI&apos;s MacBook Mockup is a shadcn-compatible React frame for placing arbitrary landing-page content or screenshots inside a MacBook shell. Pass that content as <code>children</code>; the frame keeps a responsive 1792:1165 aspect ratio and can open an optional fullscreen dialog.
          </p>
        ) : (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {component.description}
          </p>
        )}
        {component.slug === "macbook-mockup" ? (
          <section className="mt-8 max-w-3xl space-y-7 text-sm leading-6 text-muted-foreground">
            <div>
              <h2 className="text-lg font-medium text-foreground">Props and responsive frame</h2>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="font-medium text-foreground"><code>children: ReactNode</code></dt>
                  <dd>Required screen content, rendered inside an overflow-hidden inset behind the frame image.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground"><code>className?: string</code></dt>
                  <dd>Appended to the outer relative wrapper. The default is an empty string.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground"><code>expandable?: boolean</code></dt>
                  <dd>Defaults to <code>true</code>. Set it to <code>false</code> to omit the fullscreen trigger and dialog.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground"><code>frameSrc?: string</code></dt>
                  <dd>Defaults to <code className="break-all">https://ui.starck.studio/preview/macbook-frame.webp</code>.</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground"><code>label?: string</code></dt>
                  <dd>Defaults to <code>Open fullscreen preview</code> and labels both the trigger and dialog.</dd>
                </div>
              </dl>
              <p className="mt-4">
                The frame wrapper is full width up to <code>max-w-4xl</code> and uses <code>aspect-[1792/1165]</code>. The screen content is clipped to proportional insets, while the decorative frame image fills the wrapper with <code>object-contain</code>.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-foreground">Fullscreen keyboard and focus behavior</h2>
              <p className="mt-3">
                When fullscreen opens, the source portals a modal dialog to <code>document.body</code>, saves the trigger, moves focus to the close button on the next animation frame, and sets body overflow to hidden. Its key handler closes on Escape and cycles Tab focus between focusable controls inside the dialog. Cleanup restores the previous body overflow and returns focus to the trigger. Clicking the backdrop closes the dialog; clicking the framed content does not.
              </p>
            </div>

            <p className="text-xs">
              Updated October 6, 2026. The preview and Usage output use the shared <code>macbookMockupExample</code> values. Generated provenance records the component in SessionWatcher at <code>session-watcher-website/components/MacbookPreview.tsx</code>.
            </p>

            <div>
              <h2 className="text-lg font-medium text-foreground">FAQ</h2>
              <dl className="mt-3 space-y-4">
                {macbookMockupFaq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-medium text-foreground">{item.question}</dt>
                    <dd className="mt-1">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}
        {component.slug === "liquid-glass-navbar" ? (
          <section className="mt-8 max-w-3xl space-y-5 text-sm leading-6 text-muted-foreground">
            <p>
              Yes. STARCK UI ships a shadcn-compatible Liquid Glass Navbar for React as source you add to your project. It renders separate responsive mobile and desktop navigation, with a brand, optional version, logo, CTA, and desktop links.
            </p>
            <p>
              The desktop navbar can use expandable or fixed width. When reduced motion is preferred, its expandable desktop width resolves to a fixed width instead of using the scroll-driven width transform.
            </p>
            <p>
              The glass effect uses an SVG displacement filter in Chromium. In other browsers the source applies a backdrop blur fallback. Both rendered navigation elements have the accessible name “Main navigation”; the example keeps the preview and Usage code on the same canonical data.
            </p>
            <p>
              Install it with the component page command, then pass only the props your product needs. The documentation preview and Usage code use liquidGlassNavbarExample, whose width behavior starts as expandable. The registry source owns independent prop defaults.
            </p>
            <p className="text-xs">Updated October 5, 2026. Provenance: used in SessionWatcher and Moorline, as recorded in the generated component provenance.</p>
            <div>
              <h2 className="text-lg font-medium text-foreground">FAQ</h2>
              <dl className="mt-3 space-y-4">
                {liquidGlassNavbarFaq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-medium text-foreground">{item.question}</dt>
                    <dd className="mt-1">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}
        {provenance.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-muted-foreground">Used in</span>
            {provenance.map((project, index) => (
              <span
                key={project.href}
                className="inline-flex items-center gap-2"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                ) : null}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                >
                  {project.iconSrc ? (
                    <Image
                      src={project.iconSrc}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 rounded-[4px]"
                    />
                  ) : null}
                  <span>{project.name} ↗</span>
                </a>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <ComponentWorkbench
        slug={component.slug}
        title={component.title}
        description={component.description}
        defaultUsage={component.usage}
        sources={sources}
      />
    </main>
  )
}
