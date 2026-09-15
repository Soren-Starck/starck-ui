import * as React from "react"

type BlueCtaButtonProps = React.ComponentProps<"button"> & {
  icon?: React.ReactNode
}

const blueCtaClassName =
  "starck-blue-cta inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium tracking-[-0.022em] whitespace-nowrap text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

const blueCtaStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
} satisfies React.CSSProperties

function AppleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 814 1000"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.3-105.9-207.6-105.9-329.1 0-193.9 126.1-296.6 250.1-296.6 65.9 0 120.9 43.3 162.2 43.3 39.5 0 101.1-45.9 176.3-45.9 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 103.5-30.4 135.5-71.3z" />
    </svg>
  )
}

function BlueCtaButton({
  children = "Get SessionWatcher",
  className,
  icon,
  type = "button",
  ...props
}: BlueCtaButtonProps) {
  return (
    <button
      type={type}
      className={[blueCtaClassName, className].filter(Boolean).join(" ")}
      style={{
        ...blueCtaStyle,
        ...props.style,
      }}
      {...props}
    >
      {icon === undefined ? <AppleMark className="size-[15px]" /> : icon}
      {children}
    </button>
  )
}

export { AppleMark, BlueCtaButton, blueCtaClassName, blueCtaStyle }
export type { BlueCtaButtonProps }
