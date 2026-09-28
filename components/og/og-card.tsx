/* Shared layout for Open Graph images (rendered by next/og, so flexbox only). */

export const ogSize = { width: 1200, height: 630 }

const markPath =
  "M48 6h46v28H48v10h46v22a28 28 0 0 1-28 28H20V66h46V56H20V34A28 28 0 0 1 48 6Z"

export function OgCard({
  eyebrow,
  title,
  description,
  command,
}: {
  eyebrow: string
  title: string
  description: string
  command?: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="52" height="52" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="18" fill="#161616" />
          <rect
            x="0.5"
            y="0.5"
            width="63"
            height="63"
            rx="17.5"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
          />
          <path
            d={markPath}
            fill="#ffffff"
            transform="translate(6.35 9.5) scale(.45)"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: -0.4,
          }}
        >
          STARCK UI
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2.6,
            lineHeight: 1.02,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.38,
            color: "#a1a1aa",
            maxWidth: 980,
          }}
        >
          {description.length > 150
            ? description.slice(0, 147).replace(/\s+\S*$/, "") + "..."
            : description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {command ? (
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 24,
              color: "#d4d4d8",
              background: "#141414",
              border: "1px solid #27272a",
              borderRadius: 14,
              padding: "14px 20px",
            }}
          >
            {command}
          </div>
        ) : (
          <div style={{ display: "flex" }} />
        )}
        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>
          ui.starck.studio
        </div>
      </div>
    </div>
  )
}
