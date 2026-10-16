"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

/** Plain surface card — same shape, border and rhythm as every other card on the page. */
export function GlassmorphicCard({ children, className = "" }: GlassmorphicCardProps) {
  return (
    <motion.div
      className={`card p-6 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </motion.div>
  )
}
