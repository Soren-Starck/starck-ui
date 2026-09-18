import * as React from "react"

const blueCtaTones = ["blue", "violet", "emerald", "rose"] as const

type BlueCtaTone = (typeof blueCtaTones)[number]

const blueCtaPlatforms = ["macos", "windows"] as const

type BlueCtaPlatform = (typeof blueCtaPlatforms)[number]

type BlueCtaButtonProps = React.ComponentProps<"button"> & {
  icon?: React.ReactNode
  tone?: BlueCtaTone
  platform?: BlueCtaPlatform
}

type BlueCtaToneStyle = React.CSSProperties & {
  "--starck-blue-cta-start": string
  "--starck-blue-cta-middle": string
  "--starck-blue-cta-end": string
  "--starck-blue-cta-dark": string
  "--starck-blue-cta-glow": string
}

const blueCtaToneStyles = {
  blue: {
    "--starck-blue-cta-start": "#0b75e5",
    "--starck-blue-cta-middle": "#0a73e4",
    "--starck-blue-cta-end": "#0972e4",
    "--starck-blue-cta-dark": "0 40 120",
    "--starck-blue-cta-glow": "10 118 240",
  },
  violet: {
    "--starck-blue-cta-start": "#8257f5",
    "--starck-blue-cta-middle": "#7447eb",
    "--starck-blue-cta-end": "#693cdd",
    "--starck-blue-cta-dark": "58 24 140",
    "--starck-blue-cta-glow": "124 58 237",
  },
  emerald: {
    "--starck-blue-cta-start": "#10a978",
    "--starck-blue-cta-middle": "#07966a",
    "--starck-blue-cta-end": "#05855e",
    "--starck-blue-cta-dark": "0 82 58",
    "--starck-blue-cta-glow": "5 150 105",
  },
  rose: {
    "--starck-blue-cta-start": "#f14f70",
    "--starck-blue-cta-middle": "#e73f61",
    "--starck-blue-cta-end": "#d93254",
    "--starck-blue-cta-dark": "130 20 52",
    "--starck-blue-cta-glow": "244 63 94",
  },
} satisfies Record<BlueCtaTone, BlueCtaToneStyle>

const blueCtaClassName =
  "starck-blue-cta inline-flex cursor-pointer items-center justify-center gap-1.5 px-5 py-2 text-sm font-medium tracking-[-0.022em] whitespace-nowrap text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--starck-blue-cta-glow)/0.6)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

// The capsule is an Apple shape: macOS has drawn fully-rounded buttons since
// Big Sur, so it reads as native there. Windows 11 has no such shape - Fluent
// buttons are rounded rectangles - and a pill next to a Windows logo looks like
// a Mac button in costume. 10px reads as Fluent at CTA scale without going
// sharp next to soft cards.
const blueCtaPlatformClassNames = {
  macos: "rounded-full",
  windows: "rounded-[10px]",
} satisfies Record<BlueCtaPlatform, string>

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

// The Windows 11 mark: four equal panes, no perspective. It stays legible at
// 15px, where the tilted Windows 8/10 logo turns to mush.
function WindowsMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M1 1h9.7v9.7H1zM13.3 1H23v9.7h-9.7zM1 13.3h9.7V23H1zM13.3 13.3H23V23h-9.7z" />
    </svg>
  )
}

function PlatformMark({
  platform,
  className,
}: {
  platform: BlueCtaPlatform
  className?: string
}) {
  return platform === "windows" ? (
    <WindowsMark className={className} />
  ) : (
    <AppleMark className={className} />
  )
}

function BlueCtaButton({
  children = "Get SessionWatcher",
  className,
  icon,
  platform = "macos",
  style,
  tone = "blue",
  type = "button",
  ...props
}: BlueCtaButtonProps) {
  return (
    <button
      type={type}
      className={[
        blueCtaClassName,
        blueCtaPlatformClassNames[platform],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...blueCtaStyle,
        ...blueCtaToneStyles[tone],
        ...style,
      }}
      {...props}
    >
      {icon === undefined ? (
        <PlatformMark platform={platform} className="size-[15px]" />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}

export {
  AppleMark,
  BlueCtaButton,
  blueCtaClassName,
  blueCtaPlatformClassNames,
  blueCtaPlatforms,
  blueCtaStyle,
  blueCtaTones,
  PlatformMark,
  WindowsMark,
}
export type { BlueCtaButtonProps, BlueCtaPlatform, BlueCtaTone }
