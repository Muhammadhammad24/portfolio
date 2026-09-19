"use client"

import { useState } from "react"
import { motion } from "framer-motion"

/* ─── 3D SVG icons per specialization ─── */
const ICONS: Record<string, JSX.Element> = {
  DevSecOps: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dso1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ff41"/>
          <stop offset="1" stopColor="#00cc33"/>
        </linearGradient>
        <filter id="dsoglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Shield body */}
      <path d="M24 4L6 11v14c0 10 8 18 18 19 10-1 18-9 18-19V11Z" fill="rgba(0,255,65,0.1)" stroke="url(#dso1)" strokeWidth="2" strokeLinejoin="round" filter="url(#dsoglow)"/>
      {/* Lock body */}
      <rect x="17" y="23" width="14" height="10" rx="2" fill="url(#dso1)" opacity="0.85"/>
      {/* Lock shackle */}
      <path d="M19 23v-3a5 5 0 0 1 10 0v3" stroke="url(#dso1)" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#dsoglow)"/>
      {/* Keyhole */}
      <circle cx="24" cy="27.5" r="1.5" fill="#050a05"/>
      <rect x="23" y="28" width="2" height="3" rx="1" fill="#050a05"/>
      {/* Gear teeth top-right */}
      <circle cx="35" cy="13" r="4" fill="rgba(0,255,65,0.15)" stroke="rgba(0,255,65,0.5)" strokeWidth="1"/>
      <line x1="35" y1="8" x2="35" y2="6" stroke="rgba(0,255,65,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="35" y1="18" x2="35" y2="20" stroke="rgba(0,255,65,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="13" x2="28" y2="13" stroke="rgba(0,255,65,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="13" x2="42" y2="13" stroke="rgba(0,255,65,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "Cloud Engineer": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="ceg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#39ff14"/><stop offset="1" stopColor="#00cc33"/>
        </linearGradient>
        <filter id="ceglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Cloud shape */}
      <path d="M34 32H14a8 8 0 0 1-1-16 10 10 0 0 1 20 2 6 6 0 0 1 1 14Z" fill="rgba(57,255,20,0.1)" stroke="url(#ceg1)" strokeWidth="2" strokeLinejoin="round" filter="url(#ceglow)"/>
      {/* Upload arrow */}
      <line x1="24" y1="38" x2="24" y2="26" stroke="url(#ceg1)" strokeWidth="2" strokeLinecap="round"/>
      <polyline points="20,30 24,26 28,30" stroke="url(#ceg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Nodes below cloud */}
      <circle cx="16" cy="41" r="2.5" fill="rgba(57,255,20,0.2)" stroke="url(#ceg1)" strokeWidth="1.2"/>
      <circle cx="24" cy="43" r="2.5" fill="rgba(57,255,20,0.2)" stroke="url(#ceg1)" strokeWidth="1.2"/>
      <circle cx="32" cy="41" r="2.5" fill="rgba(57,255,20,0.2)" stroke="url(#ceg1)" strokeWidth="1.2"/>
      <line x1="16" y1="41" x2="24" y2="43" stroke="rgba(57,255,20,0.4)" strokeWidth="1"/>
      <line x1="32" y1="41" x2="24" y2="43" stroke="rgba(57,255,20,0.4)" strokeWidth="1"/>
    </svg>
  ),
  "IT Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="itg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ff41"/><stop offset="1" stopColor="#00aa22"/>
        </linearGradient>
        <filter id="itglow"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Server rack 1 */}
      <rect x="8" y="8" width="32" height="8" rx="2" fill="rgba(0,255,65,0.1)" stroke="url(#itg1)" strokeWidth="1.5" filter="url(#itglow)"/>
      <circle cx="14" cy="12" r="1.5" fill="#00ff41"/>
      <rect x="18" y="10.5" width="16" height="3" rx="1" fill="rgba(0,255,65,0.2)"/>
      {/* Server rack 2 */}
      <rect x="8" y="20" width="32" height="8" rx="2" fill="rgba(0,255,65,0.1)" stroke="url(#itg1)" strokeWidth="1.5" filter="url(#itglow)"/>
      <circle cx="14" cy="24" r="1.5" fill="#39ff14"/>
      <rect x="18" y="22.5" width="16" height="3" rx="1" fill="rgba(0,255,65,0.2)"/>
      {/* Server rack 3 */}
      <rect x="8" y="32" width="32" height="8" rx="2" fill="rgba(0,255,65,0.1)" stroke="url(#itg1)" strokeWidth="1.5" filter="url(#itglow)"/>
      <circle cx="14" cy="36" r="1.5" fill="#00ff41"/>
      <rect x="18" y="34.5" width="16" height="3" rx="1" fill="rgba(0,255,65,0.2)"/>
      {/* Status dots */}
      <circle cx="36" cy="12" r="1.2" fill="#00ff41" opacity="0.8"/>
      <circle cx="36" cy="24" r="1.2" fill="#00ff41" opacity="0.8"/>
      <circle cx="36" cy="36" r="1.2" fill="#39ff14" opacity="0.8"/>
    </svg>
  ),
  "Network Engineer": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="neg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#66ff66"/><stop offset="1" stopColor="#00cc33"/>
        </linearGradient>
        <filter id="neglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Centre hub */}
      <circle cx="24" cy="24" r="5" fill="rgba(102,255,102,0.15)" stroke="url(#neg1)" strokeWidth="2" filter="url(#neglow)"/>
      <circle cx="24" cy="24" r="2" fill="url(#neg1)"/>
      {/* Nodes */}
      <circle cx="8" cy="12" r="3.5" fill="rgba(102,255,102,0.12)" stroke="url(#neg1)" strokeWidth="1.5"/>
      <circle cx="40" cy="12" r="3.5" fill="rgba(102,255,102,0.12)" stroke="url(#neg1)" strokeWidth="1.5"/>
      <circle cx="8" cy="36" r="3.5" fill="rgba(102,255,102,0.12)" stroke="url(#neg1)" strokeWidth="1.5"/>
      <circle cx="40" cy="36" r="3.5" fill="rgba(102,255,102,0.12)" stroke="url(#neg1)" strokeWidth="1.5"/>
      <circle cx="24" cy="7" r="3" fill="rgba(102,255,102,0.12)" stroke="url(#neg1)" strokeWidth="1.5"/>
      {/* Connections */}
      <line x1="11" y1="14" x2="21" y2="21" stroke="rgba(102,255,102,0.45)" strokeWidth="1.2"/>
      <line x1="37" y1="14" x2="27" y2="21" stroke="rgba(102,255,102,0.45)" strokeWidth="1.2"/>
      <line x1="11" y1="34" x2="21" y2="27" stroke="rgba(102,255,102,0.45)" strokeWidth="1.2"/>
      <line x1="37" y1="34" x2="27" y2="27" stroke="rgba(102,255,102,0.45)" strokeWidth="1.2"/>
      <line x1="24" y1="10" x2="24" y2="19" stroke="rgba(102,255,102,0.45)" strokeWidth="1.2"/>
    </svg>
  ),
  "IT Security": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="isg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ffaa"/><stop offset="1" stopColor="#00cc77"/>
        </linearGradient>
        <filter id="isglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Shield */}
      <path d="M24 4L6 11v14c0 10 8 18 18 19 10-1 18-9 18-19V11Z" fill="rgba(0,255,170,0.08)" stroke="url(#isg1)" strokeWidth="2" strokeLinejoin="round" filter="url(#isglow)"/>
      {/* Checkmark */}
      <polyline points="15,24 21,30 33,18" stroke="url(#isg1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#isglow)"/>
      {/* Eye scan lines */}
      <line x1="6" y1="36" x2="42" y2="36" stroke="rgba(0,255,170,0.2)" strokeWidth="0.8"/>
      <line x1="6" y1="39" x2="42" y2="39" stroke="rgba(0,255,170,0.12)" strokeWidth="0.8"/>
      <line x1="6" y1="42" x2="42" y2="42" stroke="rgba(0,255,170,0.07)" strokeWidth="0.8"/>
    </svg>
  ),
  "IT Support Engineer": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="spg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#80ff80"/><stop offset="1" stopColor="#00aa33"/>
        </linearGradient>
        <filter id="spglow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Headset arc */}
      <path d="M10 24a14 14 0 0 1 28 0" stroke="url(#spg1)" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#spglow)"/>
      {/* Left ear cup */}
      <rect x="7" y="22" width="7" height="10" rx="3" fill="rgba(128,255,128,0.12)" stroke="url(#spg1)" strokeWidth="1.8" filter="url(#spglow)"/>
      {/* Right ear cup */}
      <rect x="34" y="22" width="7" height="10" rx="3" fill="rgba(128,255,128,0.12)" stroke="url(#spg1)" strokeWidth="1.8" filter="url(#spglow)"/>
      {/* Mic arm */}
      <path d="M34 30 Q40 34 38 40" stroke="url(#spg1)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <circle cx="38" cy="41" r="2" fill="rgba(128,255,128,0.3)" stroke="url(#spg1)" strokeWidth="1.2"/>
      {/* Signal waves */}
      <path d="M20 40 Q24 36 28 40" stroke="rgba(128,255,128,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M16 43 Q24 37 32 43" stroke="rgba(128,255,128,0.25)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  ),
}

interface SpecCardProps {
  spec: {
    role: string
    color: string
    desc: string
    tools: string[]
    metric: string
  }
  index: number
}

export function SpecCard({ spec, index }: SpecCardProps) {
  const [hovered, setHovered] = useState(false)
  const icon = ICONS[spec.role]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bracket-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-visible rounded-2xl transition-all duration-400 p-5 flex flex-col"
        style={{
          background: 'var(--card-bg)',
          border: `1px solid ${hovered ? spec.color : 'var(--border)'}`,
          boxShadow: hovered ? `0 0 35px var(--green-glow), 0 0 70px var(--green-glow2)` : 'none',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${spec.color}, transparent)`, opacity: hovered ? 0.7 : 0.2 }} />

        {/* 3D SVG Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 relative z-10 transition-all duration-300"
            style={{
              filter: hovered ? `drop-shadow(0 0 12px ${spec.color})` : `drop-shadow(0 0 4px var(--border-hot))`,
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}>
            {icon}
          </div>
          {/* Hex watermark */}
          <svg className="absolute -top-2 -left-2 opacity-15 pointer-events-none" width="56" height="60" viewBox="0 0 56 60">
            <polygon points="28,2 54,15 54,45 28,58 2,45 2,15" fill="none" stroke={spec.color} strokeWidth="1"/>
          </svg>
          {hovered && (
            <motion.div className="absolute top-0 left-0 w-14 h-14 rounded-xl"
              style={{ border: `1px solid ${spec.color}`, borderRadius: '12px' }}
              animate={{ scale: [1, 1.6, 1.9], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          )}
        </div>

        <h3 className="font-['Syne'] text-base font-bold mb-1.5 transition-colors duration-300"
          style={{ color: hovered ? spec.color : 'var(--text)' }}>
          {spec.role}
        </h3>

        <p className="text-xs leading-relaxed mb-4 flex-grow" style={{ color: 'var(--text-dim)' }}>
          {spec.desc}
        </p>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 transition-all duration-300"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <motion.div className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: spec.color, boxShadow: `0 0 5px ${spec.color}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }} />
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider font-bold" style={{ color: spec.color }}>
            {spec.metric}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          {spec.tools.map((tool) => (
            <span key={tool}
              className="font-['JetBrains_Mono'] text-[9px] tracking-wider px-1.5 py-0.5 rounded-sm transition-all duration-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: hovered ? spec.color : 'var(--green-mid)',
              }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
