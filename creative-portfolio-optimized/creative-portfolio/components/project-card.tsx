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
          background: hovered ? 'var(--surface)' : 'var(--card-bg)',
          border: hovered ? '1px solid var(--border-hot)' : '1px solid var(--border)',
          boxShadow: hovered ? '0 0 40px var(--border), inset 0 0 40px var(--card-bg)' : 'none',
        }}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, var(--green-mid), transparent)', opacity: hovered ? 1 : 0.3 }} />

        {/* Number */}
        {number && (
          <div className="absolute top-4 left-4 font-['JetBrains_Mono'] text-[10px] tracking-widest"
            style={{ color: 'var(--border-hot)' }}>
            {number}
          </div>
        )}

        {/* Active dot */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--green)', boxShadow: '0 0 6px var(--green)' }} />
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest" style={{ color: 'var(--text-muted)' }}>LIVE</span>
        </div>

        <div className="p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="font-['Syne'] text-xl font-bold mt-4 mb-3 leading-tight transition-colors"
            style={{ color: hovered ? 'var(--green)' : 'var(--text)' }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-dim)' }}>
            {description}
          </p>

          {/* Metric highlight */}
          {metric && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <Zap className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--green)' }} />
              <span className="font-['JetBrains_Mono'] text-xs font-bold" style={{ color: 'var(--green)' }}>
                {metric}
              </span>
              {metricLabel && (
                <span className="text-xs" style={{ color: 'var(--green-mid)' }}>{metricLabel}</span>
              )}
            </div>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <div className="mb-5">
              <p className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase mb-2"
                style={{ color: 'var(--border-hot)' }}>Key Features</p>
              <ul className="space-y-1.5">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: 'var(--text-dim)' }}>
                    <span style={{ color: 'var(--green)' }} className="shrink-0 mt-0.5">▸</span>
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
                  background: hovered ? 'var(--border)' : 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  color: hovered ? 'var(--green)' : 'var(--green-mid)',
                }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <Link href={repoUrl} target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ color: 'var(--green-mid)', fontFamily: 'JetBrains Mono, monospace' }}>
              <Github className="h-3.5 w-3.5" />
              View Code
            </Link>
            <Link href={demoUrl} target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 ml-auto"
              style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
