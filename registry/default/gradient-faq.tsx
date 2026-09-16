"use client"

import * as React from "react"

type GradientFaqItem = {
  title: string
  content: React.ReactNode
}

type GradientFaqProps = {
  items: readonly GradientFaqItem[]
  defaultOpen?: number
  className?: string
}

function GradientFaq({
  items,
  defaultOpen = 0,
  className = "",
}: GradientFaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpen)
  const id = React.useId()

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const open = openIndex === index
        const panelId = `${id}-panel-${index}`

        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-xl border border-black/8 bg-white/76 transition-colors hover:bg-white"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-[padding] duration-300 ${open ? "px-6 pt-6" : ""}`}
            >
              <span className="text-base font-medium tracking-[-0.015em] text-zinc-950">
                {item.title}
              </span>
              <span
                aria-hidden="true"
                className={`relative size-5 shrink-0 text-zinc-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
              >
                <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
              </span>
            </button>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-6 pb-5 text-sm leading-6 text-zinc-600 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { GradientFaq }
export type { GradientFaqItem, GradientFaqProps }
