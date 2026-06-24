"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Zap } from "lucide-react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  demoUrl: string
  repoUrl: string
  metric?: string
  metricLabel?: string
  features?: string[]
  number?: string
}

export function ProjectCard({
  title, description, tags, demoUrl, repoUrl, metric, metricLabel, features, number
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false) }}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bracket-card"
    >
      <div
        className="relative h-full overflow-visible rounded-2xl transition-all duration-500"
        style={{
          background: hovered ? 'rgba(0,255,65,0.05)' : 'rgba(0,255,65,0.02)',
          border: hovered ? '1px solid rgba(0,255,65,0.35)' : '1px solid rgba(0,255,65,0.1)',
          boxShadow: hovered ? '0 0 40px rgba(0,255,65,0.1), inset 0 0 40px rgba(0,255,65,0.02)' : 'none',
        }}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.5), transparent)', opacity: hovered ? 1 : 0.3 }} />

        {/* Number */}
        {number && (
          <div className="absolute top-4 left-4 font-['JetBrains_Mono'] text-[10px] tracking-widest"
            style={{ color: 'rgba(0,255,65,0.3)' }}>
            {number}
          </div>
        )}

        {/* Active dot */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ff41', boxShadow: '0 0 6px #00ff41' }} />
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest" style={{ color: 'rgba(0,255,65,0.5)' }}>LIVE</span>
        </div>

        <div className="p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="font-['Syne'] text-xl font-bold mt-4 mb-3 leading-tight transition-colors"
            style={{ color: hovered ? '#00ff41' : '#e8ffe8' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(232,255,232,0.55)' }}>
            {description}
          </p>

          {/* Metric highlight */}
          {metric && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(0,255,65,0.07)', border: '1px solid rgba(0,255,65,0.15)' }}>
              <Zap className="h-3.5 w-3.5 shrink-0" style={{ color: '#00ff41' }} />
              <span className="font-['JetBrains_Mono'] text-xs font-bold" style={{ color: '#00ff41' }}>
                {metric}
              </span>
              {metricLabel && (
                <span className="text-xs" style={{ color: 'rgba(0,255,65,0.55)' }}>{metricLabel}</span>
              )}
            </div>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <div className="mb-5">
              <p className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase mb-2"
                style={{ color: 'rgba(0,255,65,0.4)' }}>Key Features</p>
              <ul className="space-y-1.5">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: 'rgba(232,255,232,0.5)' }}>
                    <span style={{ color: '#00ff41' }} className="shrink-0 mt-0.5">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
            {tags.map((tag, i) => (
              <span key={i}
                className="font-['JetBrains_Mono'] text-[10px] tracking-wider px-2 py-0.5 rounded-sm transition-all duration-300"
                style={{
                  background: hovered ? 'rgba(0,255,65,0.12)' : 'rgba(0,255,65,0.06)',
                  border: '1px solid rgba(0,255,65,0.15)',
                  color: hovered ? '#00ff41' : 'rgba(0,255,65,0.7)',
                }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,255,65,0.1)' }}>
            <Link href={repoUrl} target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ color: 'rgba(0,255,65,0.6)', fontFamily: 'JetBrains Mono, monospace' }}>
              <Github className="h-3.5 w-3.5" />
              View Code
            </Link>
            <Link href={demoUrl} target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 ml-auto"
              style={{ color: '#00ff41', fontFamily: 'JetBrains Mono, monospace' }}>
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
