"use client"

import * as React from "react"
import { createPortal } from "react-dom"

type MacbookMockupProps = {
  children: React.ReactNode
  className?: string
  expandable?: boolean
  frameSrc?: string
  label?: string
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden>
      <path
        d="m5 5 10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Frame({
  children,
  frameSrc,
}: {
  children: React.ReactNode
  frameSrc: string
}) {
  return (
    <div className="relative mx-auto aspect-[1792/1165] w-full max-w-4xl select-none">
      <div className="absolute [inset:11.7%_11.6%_11.6%] z-0 overflow-hidden bg-zinc-100">
        {children}
      </div>
      {/* This is the same photographed silver frame used by SessionWatcher. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt=""
        width={1792}
        height={1165}
        draggable={false}
        className="pointer-events-none relative z-10 block size-full object-contain"
      />
    </div>
  )
}

function MacbookMockup({
  children,
  className = "",
  expandable = true,
  frameSrc = "https://ui.starck.studio/preview/macbook-frame.webp",
  label = "Open fullscreen preview",
}: MacbookMockupProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab") return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const previous = document.body.style.overflow
    const returnFocus = triggerRef.current
    document.body.style.overflow = "hidden"
    const frame = requestAnimationFrame(() => closeRef.current?.focus())
    window.addEventListener("keydown", handleKey)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previous
      window.removeEventListener("keydown", handleKey)
      returnFocus?.focus()
    }
  }, [open])

  const frame = <Frame frameSrc={frameSrc}>{children}</Frame>

  return (
    <>
      <div className={`relative ${className}`}>
        {frame}
        {expandable ? (
          <button
            ref={triggerRef}
            type="button"
            aria-label={label}
            onClick={() => setOpen(true)}
            className="group absolute [inset:11.7%_11.6%_11.6%] z-20 cursor-zoom-in rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/35 group-focus-visible:bg-black/35">
              <span className="translate-y-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-950 opacity-0 shadow-lg transition-[opacity,transform] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                Fullscreen
              </span>
            </span>
          </button>
        ) : null}
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="fixed inset-0 z-[100] grid place-items-center bg-white/96 p-5 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Close preview"
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 grid size-10 cursor-pointer place-items-center rounded-full bg-zinc-950/6 text-zinc-700 hover:bg-zinc-950/10"
              >
                <CloseIcon />
              </button>
              <div
                className="w-full max-w-6xl"
                onClick={(event) => event.stopPropagation()}
              >
                {frame}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}

export { MacbookMockup }
export type { MacbookMockupProps }
