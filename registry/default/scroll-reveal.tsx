"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"

const EASE = [0.22, 0.61, 0.36, 1] as const

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 1, y: 0 }}
      animate={
        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : y }
      }
      transition={{
        duration: reduced ? 0.2 : 0.65,
        ease: EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerVariants: Variants = {
  hidden: {},
  shown: ({ stagger, delayChildren }) => ({
    transition: { staggerChildren: stagger, delayChildren },
  }),
}

function Stagger({
  children,
  className = "",
  stagger = 0.07,
  delayChildren = 0,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerVariants}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      custom={{
        stagger: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayChildren,
      }}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({
  children,
  className = "",
  y = 16,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0.2 : 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export { Reveal, Stagger, StaggerItem }
