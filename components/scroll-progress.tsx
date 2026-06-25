"use client"

import { useScroll, useSpring, motion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px origin-left z-[100]"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--green-dim), var(--green), var(--green))', boxShadow: '0 0 8px var(--green)' }}
    />
  )
}
