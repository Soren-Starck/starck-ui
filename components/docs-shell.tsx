import Link from "next/link"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { StarckUiMark } from "@/components/starck-ui-mark"
import { Separator } from "@/components/ui/separator"
import { components } from "@/lib/components"

function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-sidebar md:flex md:flex-col">
        <div className="px-5 pt-6 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <StarckUiMark />
            <span>
              <span className="block text-sm font-semibold tracking-tight">
                STARCK UI
              </span>
              <span className="block text-[11px] text-muted-foreground">
                Components we ship.
              </span>
            </span>
          </Link>
        </div>
        <Separator />
        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-5 text-sm">
          <div className="space-y-1">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 transition-colors hover:bg-sidebar-accent"
            >
              Overview
            </Link>
            <Link
              href="/guide"
              className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              Usage
            </Link>
            <a
              href="/llms.txt"
              className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              llms.txt
            </a>
          </div>
          <div>
            <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground/55 uppercase">
              Components
            </p>
            <div className="space-y-1">
              {components.map((component) => (
                <Link
                  key={component.slug}
                  href={`/components/${component.slug}`}
                  className="group flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                >
                  <span>{component.title}</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="opacity-40 transition-[opacity,transform] group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="border-t px-5 py-4 text-xs text-muted-foreground">
          <a href="https://starck.studio" className="hover:text-foreground">
            A STARCK product ↗
          </a>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
            <Link href="/" className="flex items-center gap-2">
              <StarckUiMark />
              <span className="text-sm font-semibold">STARCK UI</span>
            </Link>
            <nav className="flex items-center gap-4 text-xs">
              <Link
                href="/components/liquid-glass-navbar"
                className="text-muted-foreground hover:text-foreground"
              >
                Components
              </Link>
              <a
                href="https://starck.studio"
                className="text-muted-foreground hover:text-foreground"
              >
                STARCK ↗
              </a>
            </nav>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

export { DocsShell }
