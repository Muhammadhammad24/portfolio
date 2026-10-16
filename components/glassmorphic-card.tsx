"use client"

import type { ReactNode } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
}

/** Plain surface card — same shape, border and rhythm as every other card on the page. */
export function GlassmorphicCard({ children, className = "" }: GlassmorphicCardProps) {
  return (
    <div
      className={`card p-6 ${className}`}
    >
      {children}
    </div>
  )
}
