"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Shield, Cloud, Terminal, Server, Wifi, BookOpen, Network, Settings } from "lucide-react"

const CERT_ICONS: Record<string, typeof Shield> = {
  "ITIL Foundation":                         Settings,
  "System Administration & IT Infrastructure": Cloud,
  "Information Security":                    Shield,
  "Windows Server Fundamentals":             Server,
  "HDI Support Center Analyst":              BookOpen,
  "Linux Essentials":                        Terminal,
  "Discovering Computer Networks":           Network,
  "Successful IT Systems":                   Settings,
}

interface CertCardProps {
  cert: {
    name: string
    subtitle: string
    issuer: string
    color: string
  }
  index: number
}

export function CertCard({ cert, index }: CertCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = CERT_ICONS[cert.name] ?? Shield

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bracket-card"
    >
      <div
        className="relative h-full overflow-visible rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
        style={{
          background: hovered ? 'var(--card-bg)' : 'var(--card-bg)',
          border: hovered ? `1px solid var(--border-hot)` : '1px solid var(--border)',
          boxShadow: hovered ? `0 0 28px rgba(0,255,65,0.1)` : 'none',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`, opacity: hovered ? 0.65 : 0.18 }} />

        {/* Icon + badge row */}
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? 'var(--border)' : 'var(--surface)',
              border: `1px solid ${hovered ? 'var(--border-hot)' : 'var(--border)'}`,
              boxShadow: hovered ? `0 0 16px rgba(0,255,65,0.22)` : 'none',
            }}
          >
            <Icon
              className="h-5 w-5 transition-all duration-300"
              style={{
                color: hovered ? cert.color : 'var(--green)',
                filter: hovered ? `drop-shadow(0 0 6px ${cert.color})` : 'none',
              }}
            />
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <CheckCircle className="h-2.5 w-2.5" style={{ color: 'var(--green)' }} />
            <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider" style={{ color: 'var(--green-mid)' }}>
              VERIFIED
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h4 className="font-['Syne'] text-sm font-bold leading-tight mb-1 transition-colors duration-300"
            style={{ color: hovered ? cert.color : 'var(--text)' }}>
            {cert.name}
          </h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            {cert.subtitle}
          </p>
        </div>

        {/* Issuer */}
        <div className="flex items-center gap-2 pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: cert.color, boxShadow: `0 0 4px ${cert.color}` }} />
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider" style={{ color: 'var(--green-mid)' }}>
            {cert.issuer}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
