import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { DocsShell } from "@/components/docs-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const datafastEnabled = process.env.VERCEL_ENV === "production"

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.starck.studio"),
  title: {
    default: "STARCK UI",
    template: "%s · STARCK UI",
  },
  description:
    "The components STARCK uses to ship software. Open code built on shadcn.",
  openGraph: {
    title: "STARCK UI",
    description: "The components we use to ship software.",
    url: "https://ui.starck.studio",
    siteName: "STARCK UI",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
        </ThemeProvider>
        {datafastEnabled ? (
          <Script
            data-website-id="dfid_bh5lERvTjvgk4ckq4lpq4"
            data-domain="ui.starck.studio"
            src="https://datafa.st/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
