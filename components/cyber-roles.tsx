"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Cloud, Network, Lock, Server, HeadphonesIcon, ShieldCheck } from "lucide-react"

const ROLES = [
  { label: "DevSecOps",           icon: Lock,            color: "#00ff41", desc: "Dev · Sec · Ops" },
  { label: "Cloud Engineer",      icon: Cloud,           color: "#39ff14", desc: "Azure · AWS · GCP" },
  { label: "IT Infrastructure",   icon: Server,          color: "#00e637", desc: "Systems · Networks" },
  { label: "Network Engineer",    icon: Network,         color: "#66ff66", desc: "Cisco · VPN · VLAN" },
  { label: "IT Security",         icon: ShieldCheck,     color: "#00ffaa", desc: "Zero Trust · SIEM" },
  { label: "IT Support Engineer", icon: HeadphonesIcon,  color: "#80ff80", desc: "L1/L2/L3 · ITIL" },
]

function ShieldCore({ size = 160 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[1, 1.5, 2.0].map((scale, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: size * scale, height: size * scale,
            border: '1px solid var(--border)',
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0.12, 0.6] }}
          transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size, height: size,
          background: 'radial-gradient(circle at 40% 35%, var(--green-glow), var(--green-glow2) 70%)',
          border: '1.5px solid var(--border-hot)',
          boxShadow: '0 0 50px var(--green-glow), 0 0 100px var(--green-glow2), inset 0 0 30px var(--green-glow2)',
        }}>
        <Shield style={{
          width: size * 0.52, height: size * 0.52,
          color: 'var(--green)',
          filter: 'drop-shadow(0 0 14px var(--green-glow)) drop-shadow(0 0 28px var(--green-glow2))',
        }} />
      </div>
    </div>
  )
}

function RadarSweep({ radius }: { radius: number }) {
  const d = radius * 2
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ width: d, height: d, left: '50%', top: '50%', translateX: '-50%', translateY: '-50%', transformOrigin: 'center' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    >
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0.14" />
          </radialGradient>
        </defs>
        <path d={`M${radius} ${radius} L${radius} 2 A${radius} ${radius} 0 0 1 ${radius + radius * 0.65} ${radius - radius * 0.65} Z`}
          fill="url(#rg)" />
        <line x1={radius} y1={radius} x2={radius} y2={3}
          stroke="var(--green)" strokeWidth="1.2" strokeOpacity="0.55"
          style={{ filter: 'drop-shadow(0 0 2px var(--green))' }} />
      </svg>
    </motion.div>
  )
}

function RoleChip({ role, orbitR, index, total, speed, active, onClick }: {
  role: typeof ROLES[0]; orbitR: number; index: number; total: number
  speed: number; active: boolean; onClick: () => void
}) {
  const Icon = role.icon
  // Each chip starts at evenly spaced angle
  const startDeg = (index / total) * 360

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: orbitR * 2, height: orbitR * 2,
        left: '50%', top: '50%',
        translateX: '-50%', translateY: '-50%',
        transformOrigin: 'center',
        rotate: startDeg,
      }}
      animate={{ rotate: startDeg + 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute cursor-pointer pointer-events-auto"
        style={{ left: '50%', top: 0, translateX: '-50%', translateY: '-50%', rotate: -(startDeg) }}
        animate={{ rotate: -(startDeg + 360) }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
          style={{
            background: 'var(--card-bg)',
            border: `1px solid ${active ? role.color : 'var(--border)'}`,
            boxShadow: active ? `0 0 16px var(--green-glow), 0 0 32px var(--green-glow2)` : 'none',
            backdropFilter: 'blur(12px)',
            whiteSpace: 'nowrap',
          }}
        >
          <Icon className="h-3.5 w-3.5 shrink-0"
            style={{ color: active ? role.color : 'var(--green-mid)',
              filter: active ? `drop-shadow(0 0 4px ${role.color})` : 'none' }} />
          <span className="font-['JetBrains_Mono'] text-xs font-semibold tracking-wide"
            style={{ color: active ? role.color : 'var(--text-dim)' }}>
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
    const id = setInterval(() => setActiveIdx(i => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(id)
  }, [])

  const ORBIT_R = 195

  return (
    <div className="flex flex-col items-center gap-5">
      <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.4em] uppercase"
        style={{ color: 'var(--green-mid)' }}>
        Core Specializations
      </span>

      <div className="relative flex items-center justify-center"
        style={{ width: ORBIT_R * 2 + 130, height: ORBIT_R * 2 + 130 }}>

        {/* Orbit ring */}
        <div className="absolute rounded-full pointer-events-none"
          style={{
            width: ORBIT_R * 2 + 4, height: ORBIT_R * 2 + 4,
            border: '1px dashed var(--border)',
            left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
          }} />

        {/* Radar */}
        <RadarSweep radius={ORBIT_R + 2} />

        {/* Inner rings */}
        {[85, 135].map((r, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              width: r * 2, height: r * 2,
              border: '1px solid var(--border)',
              left: '50%', top: '50%',
              transform: 'translate(-50%,-50%)',
            }} />
        ))}

        {/* Shield */}
        <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
          <ShieldCore size={155} />
        </div>

        {/* Chips */}
        {ROLES.map((role, i) => (
          <RoleChip
            key={role.label}
            role={role}
            orbitR={ORBIT_R}
            index={i}
            total={ROLES.length}
            speed={24 + i * 3}
            active={activeIdx === i}
            onClick={() => setActiveIdx(i)}
          />
        ))}
      </div>

      {/* Active label */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 px-5 py-2.5 rounded-xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          minWidth: 240, justifyContent: 'center',
        }}
      >
        {(() => {
          const r = ROLES[activeIdx]; const Icon = r.icon
          return (
            <>
              <Icon className="h-3.5 w-3.5" style={{ color: r.color, filter: `drop-shadow(0 0 5px ${r.color})` }} />
              <div>
                <div className="font-['Syne'] text-sm font-bold" style={{ color: r.color }}>{r.label}</div>
                <div className="font-['JetBrains_Mono'] text-[9px] tracking-wider" style={{ color: 'var(--green-mid)' }}>{r.desc}</div>
              </div>
              <div className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: r.color, boxShadow: `0 0 5px ${r.color}` }} />
            </>
          )
        })()}
      </motion.div>
    </div>
  )
}
