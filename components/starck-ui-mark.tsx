import { cn } from "@/lib/utils"

function StarckUiMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-[#101010] text-white",
        className
      )}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="size-full"
      >
        <rect
          x="0.5"
          y="0.5"
          width="63"
          height="63"
          rx="17.5"
          stroke="currentColor"
          strokeOpacity="0.12"
        />
        <path
          d="M48 6h46v28H48v10h46v22a28 28 0 0 1-28 28H20V66h46V56H20V34A28 28 0 0 1 48 6Z"
          fill="currentColor"
          transform="translate(6.35 9.5) scale(.45)"
        />
      </svg>
    </span>
  )
}

export { StarckUiMark }
