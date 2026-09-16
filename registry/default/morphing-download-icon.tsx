"use client"

import { useEffect, useMemo } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { interpolateAll as flubberInterpolateAll } from "flubber"

const APPLE_BODY =
  "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09z"
const APPLE_LEAF =
  "M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
const DOWNLOAD_ARROW = "M10 3 L14 3 L14 11 L17 11 L12 17 L7 11 L10 11 Z"
const DOWNLOAD_TRAY = "M4 19 L20 19 L20 21 L4 21 Z"

type MorphingDownloadIconProps = {
  className?: string
  hover: boolean
}

function MorphingDownloadIcon({
  className = "size-4",
  hover,
}: MorphingDownloadIconProps) {
  const [arrowInterpolator, trayInterpolator] = useMemo(
    () =>
      flubberInterpolateAll(
        [APPLE_BODY, APPLE_LEAF],
        [DOWNLOAD_ARROW, DOWNLOAD_TRAY],
        { maxSegmentLength: 2 }
      ) as unknown as [(value: number) => string, (value: number) => string],
    []
  )
  const progress = useMotionValue(0)
  const arrowPath = useTransform(progress, (value) => arrowInterpolator(value))
  const trayPath = useTransform(progress, (value) => trayInterpolator(value))
  const y = useTransform(progress, (value) => value * 1.5)

  useEffect(() => {
    const controls = animate(progress, hover ? 1 : 0, {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [hover, progress])

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ y }}
      aria-hidden="true"
    >
      <motion.path d={arrowPath} />
      <motion.path d={trayPath} />
    </motion.svg>
  )
}

export { MorphingDownloadIcon }
export type { MorphingDownloadIconProps }
