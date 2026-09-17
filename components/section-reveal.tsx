"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionReveal({ children, className = "", id }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={`relative ${className}`} id={id}>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
