"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

type ReleaseEntry = {
  version: string
  date: string
  notes: readonly string[]
}

type ReleaseHistoryDialogProps = {
  releases: readonly ReleaseEntry[]
  triggerLabel?: string
  title?: string
  description?: string
}

function ReleaseHistoryDialog({
  releases,
  triggerLabel = "Release history",
  title = "Release notes",
  description = "Every release, newest first.",
}: ReleaseHistoryDialogProps) {
  const [open, setOpen] = React.useState(false)
  const reduceMotion = useReducedMotion()
  const titleId = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab") return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), a[href], [tabindex]:not([tabindex="-1"])'
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

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
      >
        {triggerLabel}
      </button>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Close release history"
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
                  />
                  <motion.div
                    ref={dialogRef}
                    className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-black/10 bg-white shadow-2xl sm:max-h-[80vh] sm:rounded-3xl"
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 24, scale: 0.985 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, scale: 0.99 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <header className="flex shrink-0 items-start justify-between gap-4 border-b border-black/8 px-5 py-4">
                      <div>
                        <h2
                          id={titleId}
                          className="font-semibold tracking-tight text-zinc-950"
                        >
                          {title}
                        </h2>
                        <p className="mt-1 text-xs text-zinc-500">
                          {description}
                        </p>
                      </div>
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                        className="grid size-8 cursor-pointer place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                      >
                        ×
                      </button>
                    </header>
                    <ol className="space-y-4 overflow-y-auto p-5">
                      {releases.map((release) => (
                        <li
                          key={release.version}
                          className="rounded-2xl border border-black/8 bg-zinc-50/70 p-5"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-zinc-950">
                              Version {release.version}
                            </h3>
                            <time className="rounded-full bg-white px-2.5 py-1 text-[11px] text-zinc-500 ring-1 ring-black/6">
                              {release.date}
                            </time>
                          </div>
                          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
                            {release.notes.map((note) => (
                              <li key={note} className="flex gap-2">
                                <span
                                  aria-hidden
                                  className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400"
                                />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  )
}

export { ReleaseHistoryDialog }
export type { ReleaseEntry, ReleaseHistoryDialogProps }
