"use client"

import { motion } from "framer-motion"

const APPLE_BODY =
  "M12 6 L14 5 L17 6 L19 9 L18 13 L16 17 L13 18 L10 17 L7 18 L5 15 L4 11 L5 8 L8 6 Z"
const DOWNLOAD_BODY =
  "M10 3 L14 3 L14 10 L18 10 L15 13 L12 16 L9 13 L6 10 L10 10 L10 7 L10 5 L10 4 L10 3 Z"
const APPLE_DETAIL = "M12 5 L13 2 L16 1 L15 4 Z"
const DOWNLOAD_DETAIL = "M5 18 L19 18 L19 21 L5 21 Z"

type MorphingDownloadIconProps = {
  hover: boolean
  className?: string
}

function MorphingDownloadIcon({
  hover,
  className = "size-5",
}: MorphingDownloadIconProps) {
  const transition = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={{ y: hover ? 1 : 0 }}
      transition={transition}
      aria-hidden="true"
    >
      <motion.path
        initial={false}
        animate={{ d: hover ? DOWNLOAD_BODY : APPLE_BODY }}
        transition={transition}
      />
      <motion.path
        initial={false}
        animate={{ d: hover ? DOWNLOAD_DETAIL : APPLE_DETAIL }}
        transition={transition}
      />
    </motion.svg>
  )
}

export { MorphingDownloadIcon }
export type { MorphingDownloadIconProps }
