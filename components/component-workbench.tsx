"use client"

import * as React from "react"

import { ComponentActions } from "@/components/component-actions"
import { ComponentPreview } from "@/components/component-preview"
import { CopyButton } from "@/components/copy-button"
import { InstallCommand } from "@/components/install-command"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  blueCtaButtonExample,
  blueCtaButtonUsage,
  liquidGlassNavbarExample,
  liquidGlassNavbarUsage,
} from "@/lib/examples"
import type { BlueCtaTone } from "@/registry/default/blue-cta-button"
import type { NavbarWidthBehavior } from "@/registry/default/liquid-glass-navbar"

type ComponentSource = {
  path: string
  content: string
}

type ComponentWorkbenchProps = {
  slug: string
  title: string
  description: string
  sources: readonly ComponentSource[]
}

const toneOptions = [
  { value: "blue", label: "Blue", color: "bg-[#0a73e4]" },
  { value: "violet", label: "Violet", color: "bg-[#7447eb]" },
  { value: "emerald", label: "Emerald", color: "bg-[#07966a]" },
  { value: "rose", label: "Rose", color: "bg-[#e73f61]" },
] as const satisfies readonly {
  value: BlueCtaTone
  label: string
  color: string
}[]

function ToneControl({
  value,
  onChange,
}: {
  value: BlueCtaTone
  onChange: (tone: BlueCtaTone) => void
}) {
  return (
    <div
      role="group"
      aria-label="Button color"
      className="inline-flex h-9 items-center gap-1 rounded-full bg-muted px-2"
    >
      <span className="mr-1 text-xs font-medium text-muted-foreground">
        Color
      </span>
      {toneOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.label}
          aria-label={option.label}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="grid size-6 cursor-pointer place-items-center rounded-full ring-offset-2 ring-offset-muted transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-pressed:ring-2 aria-pressed:ring-foreground/50"
        >
          <span className={`size-3.5 rounded-full ${option.color}`} />
        </button>
      ))}
    </div>
  )
}

function WidthBehaviorControl({
  value,
  onChange,
}: {
  value: NavbarWidthBehavior
  onChange: (behavior: NavbarWidthBehavior) => void
}) {
  return (
    <div
      role="group"
      aria-label="Navbar width behavior"
      className="inline-flex h-9 items-center rounded-full bg-muted p-1"
    >
      {(["expand", "fixed"] as const).map((behavior) => (
        <button
          key={behavior}
          type="button"
          aria-pressed={value === behavior}
          onClick={() => onChange(behavior)}
          className="h-7 cursor-pointer rounded-full px-3 text-xs font-medium text-muted-foreground capitalize transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm"
        >
          {behavior}
        </button>
      ))}
    </div>
  )
}

function ComponentWorkbench({
  slug,
  title,
  description,
  sources,
}: ComponentWorkbenchProps) {
  const [blueCtaTone, setBlueCtaTone] = React.useState<BlueCtaTone>(
    blueCtaButtonExample.tone
  )
  const [navbarWidthBehavior, setNavbarWidthBehavior] =
    React.useState<NavbarWidthBehavior>(liquidGlassNavbarExample.widthBehavior)
  const usage =
    slug === "blue-cta-button"
      ? blueCtaButtonUsage(blueCtaTone)
      : liquidGlassNavbarUsage(navbarWidthBehavior)

  return (
    <>
      <div className="mt-10">
        <Tabs defaultValue="preview">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="source">Source</TabsTrigger>
              </TabsList>
              {slug === "blue-cta-button" ? (
                <ToneControl value={blueCtaTone} onChange={setBlueCtaTone} />
              ) : (
                <WidthBehaviorControl
                  value={navbarWidthBehavior}
                  onChange={setNavbarWidthBehavior}
                />
              )}
            </div>
            <ComponentActions
              slug={slug}
              title={title}
              description={description}
              usage={usage}
            />
          </div>
          <TabsContent value="preview" className="pt-3">
            <ComponentPreview
              slug={slug}
              blueCtaTone={blueCtaTone}
              navbarWidthBehavior={navbarWidthBehavior}
            />
          </TabsContent>
          <TabsContent value="source" className="pt-3">
            <div className="relative overflow-hidden rounded-2xl border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {sources[0].path}
                </span>
                <CopyButton
                  value={sources.map(({ content }) => content).join("\n\n")}
                />
              </div>
              <pre className="max-h-[640px] overflow-auto p-5 font-mono text-xs leading-5">
                <code>
                  {sources
                    .map(
                      (source) =>
                        `// ${source.path}\n\n${source.content.trim()}`
                    )
                    .join("\n\n")}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="my-12" />

      <section>
        <h2 className="text-lg font-medium">Install</h2>
        <p className="mt-2 mb-4 text-sm text-muted-foreground">
          Add the source directly to your shadcn project.
        </p>
        <InstallCommand slug={slug} />
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium">Usage</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border bg-muted/55 p-5 font-mono text-xs leading-5">
          <code>{usage}</code>
        </pre>
      </section>
    </>
  )
}

export { ComponentWorkbench }
export type { ComponentSource }
