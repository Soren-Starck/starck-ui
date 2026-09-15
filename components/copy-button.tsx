"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <Button variant="ghost" size="xs" onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

export { CopyButton }
