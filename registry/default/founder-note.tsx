/* eslint-disable @next/next/no-img-element */

type FounderNoteLink = {
  label: string
  href: string
  icon: React.ReactNode
}

type FounderNoteProps = {
  name: string
  role: string
  avatarSrc: string
  paragraphs: readonly string[]
  links?: readonly FounderNoteLink[]
  sticky?: boolean
  className?: string
}

function FounderNote({
  name,
  role,
  avatarSrc,
  paragraphs,
  links = [],
  sticky = false,
  className = "",
}: FounderNoteProps) {
  const [greeting, ...rest] = paragraphs

  return (
    <aside className={`${sticky ? "lg:sticky lg:top-24" : ""} ${className}`}>
      <div className="rounded-2xl border border-black/8 bg-zinc-50 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <img
            src={avatarSrc}
            alt={name}
            width={56}
            height={56}
            className="size-14 rounded-full object-cover ring-2 ring-black/8"
          />
          <div>
            <p className="text-base leading-snug font-semibold text-zinc-950">
              {name}
            </p>
            <p className="text-sm text-zinc-500">{role}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
          {greeting ? <p className="text-zinc-950">{greeting}</p> : null}
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {links.length > 0 ? (
          <div className="mt-6 flex items-center gap-3 text-zinc-500">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={link.label}
                className="transition-colors hover:text-zinc-950"
              >
                {link.icon}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  )
}

export { FounderNote }
export type { FounderNoteLink, FounderNoteProps }
