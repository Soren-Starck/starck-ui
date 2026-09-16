"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"

type OrbitItem = {
  name: string
  icon: React.ReactNode
}

type ProviderOrbitProps = {
  items: readonly OrbitItem[]
  center: React.ReactNode
  duration?: number
  className?: string
}

function ProviderOrbit({
  items,
  center,
  duration = 32,
  className = "",
}: ProviderOrbitProps) {
  const reduced = useReducedMotion()
  const [paused, setPaused] = React.useState(false)
  const rotation = useMotionValue(0)
  const counterRotation = useTransform(rotation, (value) => -value)
  const safeDuration = Math.max(duration, 1)

  useAnimationFrame((_time, delta) => {
    if (reduced || paused) return
    rotation.set((rotation.get() + (delta / (safeDuration * 1000)) * 360) % 360)
  })

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[420px] ${className}`}
    >
      <div
        className="absolute inset-[8%] rounded-full border border-dashed border-zinc-300"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0"
        style={{ rotate: rotation }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index
          return (
            <div
              key={item.name}
              className="absolute top-1/2 left-1/2"
              style={
                {
                  "--orbit-radius": "clamp(112px, 38vw, 170px)",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius)))`,
                } as React.CSSProperties
              }
            >
              <motion.div style={{ rotate: counterRotation }}>
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div
                    title={item.name}
                    className="grid size-12 place-items-center rounded-2xl border border-black/8 bg-white text-sm font-semibold text-zinc-700 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.45)]"
                  >
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
      <div className="absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] border border-black/8 bg-zinc-950 text-center text-sm font-semibold text-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]">
        {center}
      </div>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export { ProviderOrbit }
export type { OrbitItem, ProviderOrbitProps }
