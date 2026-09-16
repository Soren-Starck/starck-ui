"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

type TerminalCommandProps = {
  lines: readonly string[]
  shell?: string
  className?: string
}

function CopyIcon({ checked = false }: { checked?: boolean }) {
  return checked ? (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
      <path
        d="m3 8.3 3.1 3.1L13 4.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
      <rect
        x="5.2"
        y="5.2"
        width="7.3"
        height="7.3"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M10.7 5.2V4.1c0-.9-.7-1.6-1.6-1.6h-5c-.9 0-1.6.7-1.6 1.6v5c0 .9.7 1.6 1.6 1.6h1.1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

function TerminalCommand({
  lines,
  shell = "zsh",
  className = "",
}: TerminalCommandProps) {
  const [copied, setCopied] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"))
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#0d1117] text-left text-white shadow-xl ring-1 ring-black/30 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-white/40">{shell}</span>
        <motion.button
          type="button"
          onClick={copy}
          whileTap={{ scale: 0.9 }}
          aria-label="Copy commands"
          className="ml-auto grid h-7 w-[74px] cursor-pointer place-items-center rounded-md text-xs font-medium transition-colors hover:bg-white/8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className={`inline-flex items-center gap-1.5 ${copied ? "text-[#3ddc63]" : "text-white/60"}`}
            >
              <CopyIcon checked={copied} />
              {copied ? "Copied" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
      <div className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-7 text-zinc-100">
        {lines.map((line) => (
          <div key={line} className="whitespace-pre">
            <span className="text-[#28c840] select-none">$ </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

export { TerminalCommand }
export type { TerminalCommandProps }
