"use client"

import * as React from "react"
import {
  AiSparklesIcon,
  Copy01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

type ComponentActionsProps = {
  slug: string
  title: string
  description: string
  usage: string
}

function ComponentActions({
  slug,
  title,
  description,
  usage,
}: ComponentActionsProps) {
  const [copied, setCopied] = React.useState<"command" | "prompt" | null>(null)
  const installCommand = `pnpm dlx shadcn@latest add https://ui.starck.studio/r/${slug}.json`
  const prompt = `Implement the STARCK UI ${title} in this project.

Component: ${description}
Documentation: https://ui.starck.studio/components/${slug}

Before changing code, inspect the project's framework, styling system, component conventions, and routing. Then:

1. Install the canonical source with this command:
${installCommand}

2. Use this exact documented example as the visual and behavioral starting point:

${usage}

3. Adapt only the copy, assets, destinations, and integration details required by this project. Use the installed source instead of recreating or approximating it.
4. Preserve accessibility, responsive behavior, keyboard and focus states, hover and press feedback, and reduced-motion behavior.
5. Make no unrelated changes.
6. Run the project's typecheck, lint, and build commands, then verify the component on desktop and mobile.`

  async function copy(value: string, type: "command" | "prompt") {
    if (!(await copyToClipboard(value))) return
    setCopied(type)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
      <Button
        className="cursor-pointer"
        onClick={() => copy(installCommand, "command")}
        aria-live="polite"
      >
        <HugeiconsIcon
          icon={copied === "command" ? Tick02Icon : Copy01Icon}
          strokeWidth={2}
        />
        <span className="grid">
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1"
          >
            Add component
          </span>
          <span className="col-start-1 row-start-1">
            {copied === "command" ? "Copied" : "Add component"}
          </span>
        </span>
      </Button>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => copy(prompt, "prompt")}
        aria-live="polite"
      >
        <HugeiconsIcon
          icon={copied === "prompt" ? Tick02Icon : AiSparklesIcon}
          strokeWidth={2}
        />
        <span className="grid">
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1"
          >
            Implement with AI
          </span>
          <span className="col-start-1 row-start-1">
            {copied === "prompt" ? "Copied" : "Implement with AI"}
          </span>
        </span>
      </Button>
    </div>
  )
}

export { ComponentActions }
