type WhatsNewCardProps = {
  title: string
  version: string
  date: string
  summary: string
  href?: string
  className?: string
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden>
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsNewCard({
  title,
  version,
  date,
  summary,
  href,
  className = "",
}: WhatsNewCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-blue-600/8 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
          What’s new
        </span>
        <span className="font-mono text-[11px] text-zinc-400">v{version}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-zinc-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{summary}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
        <time>{date}</time>
        {href ? (
          <span className="inline-flex items-center gap-1 font-medium text-zinc-700 transition-transform group-hover:translate-x-0.5">
            Read more <ArrowIcon />
          </span>
        ) : null}
      </div>
    </>
  )

  const classes = `group block rounded-2xl border border-black/8 bg-white p-5 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(0,0,0,0.45)] ${className}`

  return href ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  )
}

export { WhatsNewCard }
export type { WhatsNewCardProps }
