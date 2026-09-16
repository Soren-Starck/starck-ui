"use client"

import * as React from "react"

type StickyProductCtaProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  primaryAction: React.ReactNode
  secondaryAction?: React.ReactNode
  showAfter?: number
  contained?: boolean
  className?: string
}

function StickyProductCta({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  showAfter = 600,
  contained = false,
  className = "",
}: StickyProductCtaProps) {
  const [visible, setVisible] = React.useState(showAfter <= 0)

  React.useEffect(() => {
    const update = () => setVisible(window.scrollY >= showAfter)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [showAfter])

  return (
    <div
      aria-hidden={!visible}
      className={`${contained ? "absolute" : "fixed"} inset-x-0 bottom-0 z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"} ${className}`}
    >
      <div className="border-t border-black/8 bg-white/88 shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:gap-4">
          {icon ? (
            <div className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-zinc-950 text-white">
              {icon}
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-950">
              {title}
            </p>
            {description ? (
              <p className="mt-0.5 hidden truncate text-xs text-zinc-500 sm:block">
                {description}
              </p>
            ) : null}
          </div>
          {secondaryAction ? (
            <div className="hidden shrink-0 sm:block">{secondaryAction}</div>
          ) : null}
          <div className="shrink-0">{primaryAction}</div>
        </div>
      </div>
    </div>
  )
}

export { StickyProductCta }
export type { StickyProductCtaProps }
