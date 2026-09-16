/* eslint-disable @next/next/no-img-element */

type SocialProofAvatar = {
  name: string
  src?: string
  initials?: string
  color?: string
}

type SocialProofProps = {
  avatars: readonly SocialProofAvatar[]
  label: string
  rating?: number
  className?: string
  variant?: "light" | "dark"
}

function SocialProof({
  avatars,
  label,
  rating = 5,
  className = "",
  variant = "light",
}: SocialProofProps) {
  const dark = variant === "dark"

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex -space-x-2.5"
        aria-label={`${avatars.length} customer avatars`}
      >
        {avatars.map((avatar) =>
          avatar.src ? (
            <img
              key={avatar.name}
              src={avatar.src}
              alt={avatar.name}
              className={`size-9 rounded-full object-cover shadow-sm ring-2 ${dark ? "ring-zinc-900" : "ring-white"}`}
            />
          ) : (
            <span
              key={avatar.name}
              title={avatar.name}
              className={`grid size-9 place-items-center rounded-full text-[11px] font-semibold text-white shadow-sm ring-2 ${dark ? "ring-zinc-900" : "ring-white"}`}
              style={{ background: avatar.color ?? "#52525b" }}
            >
              {avatar.initials ?? avatar.name.slice(0, 2).toUpperCase()}
            </span>
          )
        )}
      </div>
      <div>
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              viewBox="0 0 16 16"
              className={`size-3.5 ${index < rating ? "text-amber-400" : dark ? "text-white/20" : "text-zinc-200"}`}
              fill="currentColor"
              aria-hidden
            >
              <path d="m8 1.4 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.2l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.4Z" />
            </svg>
          ))}
        </div>
        <p
          className={`mt-1 text-xs ${dark ? "text-white/65" : "text-zinc-500"}`}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

export { SocialProof }
export type { SocialProofAvatar, SocialProofProps }
