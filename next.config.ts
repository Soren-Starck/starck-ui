import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Lets the dev server be opened from another device on the LAN.
  allowedDevOrigins: ["192.168.1.*"],
}

export default nextConfig
