type PricingPlan = {
  name: string
  price: string
  interval?: string
  description: string
  features: readonly string[]
  ctaLabel: string
  ctaHref: string
  badge?: string
  highlighted?: boolean
}

type SinglePricingCardProps = PricingPlan & {
  className?: string
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 size-4 shrink-0"
      aria-hidden
    >
      <path
        d="m3 8.2 3 3L13 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SinglePricingCard({
  name,
  price,
  interval,
  description,
  features,
  ctaLabel,
  ctaHref,
  badge,
  highlighted = false,
  className = "",
}: SinglePricingCardProps) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 ${highlighted ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.65)]" : "border-black/8 bg-white text-zinc-950"} ${className}`}
    >
      {badge ? (
        <span
          className={`absolute top-5 right-5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase ${highlighted ? "bg-white/12 text-white" : "bg-zinc-100 text-zinc-600"}`}
        >
          {badge}
        </span>
      ) : null}
      <p
        className={`text-sm font-medium ${highlighted ? "text-white/70" : "text-zinc-500"}`}
      >
        {name}
      </p>
      <div className="mt-5 flex items-end gap-1.5">
        <span className="text-4xl font-semibold tracking-[-0.05em]">
          {price}
        </span>
        {interval ? (
          <span
            className={`pb-1 text-sm ${highlighted ? "text-white/55" : "text-zinc-500"}`}
          >
            / {interval}
          </span>
        ) : null}
      </div>
      <p
        className={`mt-3 text-sm leading-6 ${highlighted ? "text-white/60" : "text-zinc-600"}`}
      >
        {description}
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex gap-2 text-sm ${highlighted ? "text-white/80" : "text-zinc-700"}`}
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={ctaHref}
        className={`mt-7 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0 ${highlighted ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"}`}
      >
        {ctaLabel}
      </a>
    </article>
  )
}

export { SinglePricingCard }
export type { PricingPlan, SinglePricingCardProps }
