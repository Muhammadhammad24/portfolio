"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import type { ReactNode } from "react"
import { useRef } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

export function GlassmorphicCard({ children, className = "" }: GlassmorphicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-visible rounded-2xl bracket-card ${className}`}
      style={{
        rotateX, rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: '1.5rem',
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: 'var(--border-hot)', boxShadow: '0 0 30px rgba(0,255,65,0.1)' }}
    >
      {/* top shine */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-hot), transparent)' }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
