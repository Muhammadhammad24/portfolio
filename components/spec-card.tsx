"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMagneticTilt } from "@/hooks/use-magnetic-tilt"

const LIME = "#B1EB21"
const LIME_DIM = "#9BD117"
const LIME_BRIGHT = "#C2F343"

const ICONS: Record<string, JSX.Element> = {
  DevSecOps: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-dso" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <path d="M24 4L6 11v14c0 10 8 18 18 19 10-1 18-9 18-19V11Z"
        fill="rgba(177,235,33,0.06)" stroke="url(#g-dso)" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="17" y="23" width="14" height="10" rx="2" fill="url(#g-dso)" opacity="0.85"/>
      <path d="M19 23v-3a5 5 0 0 1 10 0v3" stroke="url(#g-dso)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="24" cy="27.5" r="1.5" fill="#000027"/>
      <circle cx="35" cy="13" r="4" fill="rgba(177,235,33,0.08)" stroke={LIME} strokeWidth="1" opacity="0.7"/>
      <line x1="35" y1="8"  x2="35" y2="6"  stroke={LIME} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="35" y1="18" x2="35" y2="20" stroke={LIME} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="30" y1="13" x2="28" y2="13" stroke={LIME} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="40" y1="13" x2="42" y2="13" stroke={LIME} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  "Cloud Engineer": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-ce" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <path d="M34 32H14a8 8 0 0 1-1-16 10 10 0 0 1 20 2 6 6 0 0 1 1 14Z"
        fill="rgba(177,235,33,0.06)" stroke="url(#g-ce)" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="24" y1="38" x2="24" y2="26" stroke="url(#g-ce)" strokeWidth="2" strokeLinecap="round"/>
      <polyline points="20,30 24,26 28,30" stroke="url(#g-ce)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="16" cy="41" r="2.5" fill="rgba(177,235,33,0.08)" stroke="url(#g-ce)" strokeWidth="1.2"/>
      <circle cx="24" cy="43" r="2.5" fill="rgba(177,235,33,0.08)" stroke="url(#g-ce)" strokeWidth="1.2"/>
      <circle cx="32" cy="41" r="2.5" fill="rgba(177,235,33,0.08)" stroke="url(#g-ce)" strokeWidth="1.2"/>
      <line x1="16" y1="41" x2="24" y2="43" stroke="rgba(177,235,33,0.30)" strokeWidth="1"/>
      <line x1="32" y1="41" x2="24" y2="43" stroke="rgba(177,235,33,0.30)" strokeWidth="1"/>
    </svg>
  ),
  "IT Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-it" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <rect x="8" y="8"  width="32" height="8" rx="2" fill="rgba(177,235,33,0.06)" stroke="url(#g-it)" strokeWidth="1.5"/>
      <circle cx="14" cy="12" r="1.5" fill={LIME_DIM}/>
      <rect x="18" y="10.5" width="16" height="3" rx="1" fill="rgba(177,235,33,0.18)"/>
      <rect x="8" y="20" width="32" height="8" rx="2" fill="rgba(177,235,33,0.06)" stroke="url(#g-it)" strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="1.5" fill={LIME}/>
      <rect x="18" y="22.5" width="16" height="3" rx="1" fill="rgba(177,235,33,0.18)"/>
      <rect x="8" y="32" width="32" height="8" rx="2" fill="rgba(177,235,33,0.06)" stroke="url(#g-it)" strokeWidth="1.5"/>
      <circle cx="14" cy="36" r="1.5" fill={LIME_DIM}/>
      <rect x="18" y="34.5" width="16" height="3" rx="1" fill="rgba(177,235,33,0.18)"/>
    </svg>
  ),
  "Network Engineer": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-ne" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="5" fill="rgba(177,235,33,0.08)" stroke="url(#g-ne)" strokeWidth="2"/>
      <circle cx="24" cy="24" r="2" fill="url(#g-ne)"/>
      <circle cx="8"  cy="12" r="3.5" fill="rgba(177,235,33,0.06)" stroke="url(#g-ne)" strokeWidth="1.5"/>
      <circle cx="40" cy="12" r="3.5" fill="rgba(177,235,33,0.06)" stroke="url(#g-ne)" strokeWidth="1.5"/>
      <circle cx="8"  cy="36" r="3.5" fill="rgba(177,235,33,0.06)" stroke="url(#g-ne)" strokeWidth="1.5"/>
      <circle cx="40" cy="36" r="3.5" fill="rgba(177,235,33,0.06)" stroke="url(#g-ne)" strokeWidth="1.5"/>
      <circle cx="24" cy="7"  r="3"   fill="rgba(177,235,33,0.06)" stroke="url(#g-ne)" strokeWidth="1.5"/>
      <line x1="11" y1="14" x2="21" y2="21" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
      <line x1="37" y1="14" x2="27" y2="21" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
      <line x1="11" y1="34" x2="21" y2="27" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
      <line x1="37" y1="34" x2="27" y2="27" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
      <line x1="24" y1="10" x2="24" y2="19" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
    </svg>
  ),
  "IT Security": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-is" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <path d="M24 4L6 11v14c0 10 8 18 18 19 10-1 18-9 18-19V11Z"
        fill="rgba(177,235,33,0.05)" stroke="url(#g-is)" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="15,24 21,30 33,18" stroke="url(#g-is)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  "IT Support Engineer": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="g-sp" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={LIME_BRIGHT}/><stop offset="1" stopColor={LIME_DIM}/>
        </linearGradient>
      </defs>
      <path d="M10 24a14 14 0 0 1 28 0" stroke="url(#g-sp)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <rect x="7"  y="22" width="7" height="10" rx="3" fill="rgba(177,235,33,0.06)" stroke="url(#g-sp)" strokeWidth="1.8"/>
      <rect x="34" y="22" width="7" height="10" rx="3" fill="rgba(177,235,33,0.06)" stroke="url(#g-sp)" strokeWidth="1.8"/>
      <path d="M34 30 Q40 34 38 40" stroke="url(#g-sp)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <circle cx="38" cy="41" r="2" fill="rgba(177,235,33,0.10)" stroke="url(#g-sp)" strokeWidth="1.2"/>
    </svg>
  ),
}

interface SpecCardProps {
  spec: { role: string; color: string; desc: string; tools: string[]; metric: string }
  index: number
}

export function SpecCard({ spec, index }: SpecCardProps) {
  const [hovered, setHovered] = useState(false)
  const icon = ICONS[spec.role]
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useMagneticTilt(6)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bracket-card"
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); onMouseLeave() }}
      onMouseMove={onMouseMove}
    >
      <div
        className="relative overflow-visible rounded-2xl transition-all duration-300 p-5 flex flex-col"
        style={{
          background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
          border: `1px solid ${hovered ? "rgba(177,235,33,0.28)" : "var(--border-dark-soft)"}`,
          boxShadow: hovered ? "0 0 32px rgba(177,235,33,0.08)" : "none",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(177,235,33,0.40), transparent)", opacity: hovered ? 1 : 0.15, transition: "opacity 0.3s" }} />

        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-12 h-12 transition-all duration-300"
            style={{ filter: hovered ? `drop-shadow(0 0 10px rgba(177,235,33,0.55))` : `drop-shadow(0 0 3px rgba(177,235,33,0.20))`, transform: hovered ? "scale(1.08)" : "scale(1)" }}>
            {icon}
          </div>
        </div>

        {/* Eyebrow */}
        <span className="eyebrow mb-2" style={{ color: LIME, opacity: 0.7 }}>Specialization</span>

        <h3 className="text-base font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? "#ffffff" : "var(--text-on-dark)", fontFamily: "Inter, sans-serif", fontSize: 17 }}>
          {spec.role}
        </h3>

        <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: "var(--text-on-dark-secondary)", lineHeight: 1.6 }}>
          {spec.desc}
        </p>

        {/* Metric badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{ background: "var(--lime-subtle)", border: "1px solid rgba(177,235,33,0.20)" }}>
          <motion.div className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: LIME, boxShadow: `0 0 6px rgba(177,235,33,0.60)` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }} />
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider font-bold" style={{ color: LIME }}>
            {spec.metric}
          </span>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: "1px solid var(--border-dark-soft)" }}>
          {spec.tools.map((tool) => (
            <span key={tool}
              className="font-['JetBrains_Mono'] text-[9px] tracking-wider px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(177,235,33,0.06)",
                border: "1px solid rgba(177,235,33,0.14)",
                color: hovered ? LIME : "var(--text-on-dark-muted)",
                transition: "color 0.2s",
              }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
