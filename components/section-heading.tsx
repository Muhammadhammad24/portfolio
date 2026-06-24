"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  align?: "left" | "center"
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  const isCenter = align === "center"
  return (
    <div className={`space-y-4 ${isCenter ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} viewport={{ once: true }}
      >
        <span
          className="inline-block font-['JetBrains_Mono'] text-xs tracking-[0.35em] uppercase px-3 py-1 rounded-sm"
          style={{ color: '#00ff41', border: '1px solid rgba(0,255,65,0.25)', background: 'rgba(0,255,65,0.05)' }}
        >
          {subtitle}
        </span>
      </motion.div>

      <motion.h2
        className="font-['Syne'] text-4xl md:text-6xl font-bold leading-tight pb-2"
        style={{ color: '#e8ffe8' }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.div
        className={`flex items-center gap-3 pt-2 ${isCenter ? "justify-center" : "justify-start"}`}
        initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
        style={{ transformOrigin: isCenter ? "center" : "left" }}
      >
        <div className="h-px w-10" style={{ background: '#00ff41' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff41', boxShadow: '0 0 8px #00ff41' }} />
        <div className="h-px w-20" style={{ background: 'rgba(0,255,65,0.25)' }} />
      </motion.div>
    </div>
  )
}
