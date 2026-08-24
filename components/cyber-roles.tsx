"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Cloud, Network, Lock, Server, Headphones, ShieldCheck } from "lucide-react"

const LIME = "#B1EB21"
const LIME_DIM = "#9BD117"

const ROLES = [
  { label: "DevSecOps",           icon: Lock,        desc: "Dev · Sec · Ops" },
  { label: "Cloud Engineer",      icon: Cloud,       desc: "Azure · AWS · GCP" },
  { label: "IT Infrastructure",   icon: Server,      desc: "Systems · Networks" },
  { label: "Network Engineer",    icon: Network,     desc: "Cisco · VPN · VLAN" },
  { label: "IT Security",         icon: ShieldCheck, desc: "Zero Trust · SIEM" },
  { label: "IT Support Engineer", icon: Headphones,  desc: "L1/L2/L3 · ITIL" },
]

function ShieldCore({ size = 160 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[1.5, 2.0, 2.6].map((scale, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ width: size * scale, height: size * scale, border: "1px solid rgba(177,235,33,0.10)" }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.08, 0.4] }}
          transition={{ duration: 3, delay: i * 0.9, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size, height: size,
          background: "radial-gradient(circle at 40% 35%, rgba(177,235,33,0.08), rgba(177,235,33,0.02) 70%)",
          border: "1.5px solid rgba(177,235,33,0.25)",
          boxShadow: "0 0 40px rgba(177,235,33,0.10), inset 0 0 30px rgba(177,235,33,0.04)",
        }}>
        <Shield style={{
          width: size * 0.50, height: size * 0.50,
          color: LIME,
          filter: `drop-shadow(0 0 14px rgba(177,235,33,0.45))`,
        }} />
      </div>
    </div>
  )
}

function RadarSweep({ radius }: { radius: number }) {
  const d = radius * 2
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ width: d, height: d, left: "50%", top: "50%", translateX: "-50%", translateY: "-50%", transformOrigin: "center" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="rg-lime" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={LIME} stopOpacity="0" />
            <stop offset="100%" stopColor={LIME} stopOpacity="0.10" />
          </radialGradient>
        </defs>
        <path d={`M${radius} ${radius} L${radius} 2 A${radius} ${radius} 0 0 1 ${radius + radius * 0.65} ${radius - radius * 0.65} Z`}
          fill="url(#rg-lime)" />
        <line x1={radius} y1={radius} x2={radius} y2={3}
          stroke={LIME} strokeWidth="1"
          style={{ opacity: 0.45, filter: `drop-shadow(0 0 3px rgba(177,235,33,0.6))` }} />
      </svg>
    </motion.div>
  )
}

function RoleChip({ role, orbitR, index, total, speed, active, onClick }: {
  role: typeof ROLES[0]; orbitR: number; index: number; total: number
  speed: number; active: boolean; onClick: () => void
}) {
  const Icon = role.icon
  const startDeg = (index / total) * 360

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: orbitR * 2, height: orbitR * 2, left: "50%", top: "50%", translateX: "-50%", translateY: "-50%", transformOrigin: "center", rotate: startDeg }}
      animate={{ rotate: startDeg + 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute cursor-pointer pointer-events-auto"
        style={{ left: "50%", top: 0, translateX: "-50%", translateY: "-50%", rotate: -startDeg }}
        animate={{ rotate: -(startDeg + 360) }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 transition-all duration-300"
          style={{
            background: active ? "rgba(177,235,33,0.10)" : "var(--bg-card)",
            border: `1px solid ${active ? "rgba(177,235,33,0.40)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "var(--radius-md)",
            boxShadow: active ? "0 0 16px rgba(177,235,33,0.15)" : "none",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
          }}
        >
          <Icon className="h-3.5 w-3.5 shrink-0"
            style={{ color: active ? LIME : "rgba(255,255,255,0.35)" }} />
          <span className="font-['JetBrains_Mono'] text-xs font-semibold tracking-wide"
            style={{ color: active ? LIME : "var(--text-on-dark-secondary)", fontSize: 11 }}>
            {role.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CyberRoles() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  const ORBIT_R = 160

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[440px] mx-auto">
      <span className="eyebrow" style={{ color: LIME, opacity: 0.65 }}>Core Specializations</span>

      <div className="relative flex items-center justify-center"
        style={{ width: ORBIT_R * 2 + 120, height: ORBIT_R * 2 + 120 }}>

        {/* Orbit ring */}
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: ORBIT_R * 2 + 4, height: ORBIT_R * 2 + 4,
            border: "1px dashed rgba(177,235,33,0.14)",
            left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          }} />

        <RadarSweep radius={ORBIT_R + 2} />

        {/* Inner rings */}
        {[65, 108].map((r, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: r * 2, height: r * 2, border: "1px solid rgba(177,235,33,0.08)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
          <ShieldCore size={124} />
        </div>

        {ROLES.map((role, i) => (
          <RoleChip key={role.label} role={role} orbitR={ORBIT_R} index={i} total={ROLES.length}
            speed={26 + i * 3} active={activeIdx === i} onClick={() => setActiveIdx(i)} />
        ))}
      </div>

      {/* Active role display */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="flex items-center gap-3 px-5 py-2.5 w-full"
        style={{
          background: "rgba(177,235,33,0.06)",
          border: "1px solid rgba(177,235,33,0.20)",
          borderRadius: "var(--radius-md)",
          maxWidth: 290,
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {(() => {
          const r = ROLES[activeIdx]; const Icon = r.icon
          return (
            <>
              <Icon className="h-4 w-4 shrink-0" style={{ color: LIME }} />
              <div>
                <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 14, fontFamily: "Inter, sans-serif" }}>{r.label}</div>
                <div className="font-['JetBrains_Mono']" style={{ color: "var(--text-on-dark-muted)", fontSize: 10, letterSpacing: "0.1em" }}>{r.desc}</div>
              </div>
              <motion.div className="ml-auto w-1.5 h-1.5 rounded-full"
                style={{ background: LIME, boxShadow: `0 0 6px rgba(177,235,33,0.70)` }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }} />
            </>
          )
        })()}
      </motion.div>
    </div>
  )
}
