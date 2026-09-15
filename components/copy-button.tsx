"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/copy-to-clipboard"

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    if (!(await copyToClipboard(value))) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <Button
      variant="ghost"
      size="xs"
      className="cursor-pointer"
      onClick={copy}
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

export { CopyButton }
