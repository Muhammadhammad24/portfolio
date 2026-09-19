"use client"

import { useEffect, useState } from "react"
import { Shield, Cloud, Network, Lock, Server, Headphones, ShieldCheck } from "lucide-react"

const LIME = "#B1EB21"

/* Each specialisation links to the section that shows the evidence for it. */
const ROLES = [
  { label: "DevSecOps",           icon: Lock,        desc: "Dev · Sec · Ops",      href: "#projects" },
  { label: "Cloud Engineer",      icon: Cloud,       desc: "Azure · AWS · GCP",    href: "#skills" },
  { label: "IT Infrastructure",   icon: Server,      desc: "Systems · Networks",   href: "#experience" },
  { label: "Network Engineer",    icon: Network,     desc: "Cisco · VPN · VLAN",   href: "#skills" },
  { label: "IT Security",         icon: ShieldCheck, desc: "Zero Trust · SIEM",    href: "#certifications" },
  { label: "IT Support Engineer", icon: Headphones,  desc: "L1/L2/L3 · ITIL",      href: "#about" },
]

const BOX = 440          // square stage in px
const C = BOX / 2        // centre
const R = 168            // orbit radius

function point(i: number) {
  const a = (i / ROLES.length) * Math.PI * 2 - Math.PI / 2
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}

/**
 * Core specialisations as an orbit around the shield. Signals travel from the
 * core to every role, and each role links to the part of the page that proves
 * it. Motion is SVG and CSS, so it stays off the main thread.
 */
export function CyberRoles() {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const current = hover ?? active

  useEffect(() => {
    if (hover !== null) return
    const id = setInterval(() => setActive((i) => (i + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [hover])

  const role = ROLES[current]
  const RoleIcon = role.icon

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[440px] mx-auto">
      <span className="eyebrow" style={{ color: LIME, opacity: 0.65 }}>Core Specializations</span>

      <div className="relative w-full" style={{ aspectRatio: "1 / 1", maxWidth: BOX }}>
        {/* Rings, spokes and travelling signals */}
        <svg viewBox={`0 0 ${BOX} ${BOX}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="orbit-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor={LIME} stopOpacity="0.16" />
              <stop offset="1" stopColor={LIME} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={C} cy={C} r={112} fill="url(#orbit-core-glow)" />
          <circle cx={C} cy={C} r={R + 26} fill="none" stroke="rgba(177,235,33,0.10)" strokeDasharray="2 7" className="orbit-spin" style={{ transformOrigin: `${C}px ${C}px` }} />
          <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(177,235,33,0.14)" strokeDasharray="4 6" />
          <circle cx={C} cy={C} r={108} fill="none" stroke="rgba(177,235,33,0.08)" />
          <circle cx={C} cy={C} r={65} fill="none" stroke="rgba(177,235,33,0.08)" />

          {ROLES.map((r, i) => {
            const p = point(i)
            const d = `M ${C} ${C} L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
            const on = i === current
            const dur = 2.2 + (i % 3) * 0.45
            return (
              <g key={r.label}>
                <path d={d} stroke={on ? "rgba(177,235,33,0.55)" : "rgba(177,235,33,0.14)"} strokeWidth={on ? 1.4 : 1} style={{ transition: "stroke .3s ease" }} />
                <circle r={on ? 3.4 : 2.4} fill={LIME} opacity="0">
                  <animateMotion dur={`${dur}s`} begin={`${(i * 0.37) % dur}s`} repeatCount="indefinite" path={d} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${dur}s`} begin={`${(i * 0.37) % dur}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* Shield core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full"
          style={{
            width: "28%", aspectRatio: "1 / 1",
            background: "radial-gradient(circle at 40% 35%, rgba(177,235,33,0.08), rgba(177,235,33,0.02) 70%)",
            border: "1.5px solid rgba(177,235,33,0.25)",
            boxShadow: "0 0 40px rgba(177,235,33,0.10), inset 0 0 30px rgba(177,235,33,0.04)",
          }}
        >
          <span className="orbit-pulse absolute inset-[-18%] rounded-full" style={{ border: "1px solid rgba(177,235,33,0.12)" }} aria-hidden="true" />
          <Shield style={{ width: "50%", height: "50%", color: LIME, filter: "drop-shadow(0 0 14px rgba(177,235,33,0.45))" }} />
        </div>

        {/* Roles on the orbit, each a real link */}
        {ROLES.map((r, i) => {
          const p = point(i)
          const Icon = r.icon
          const on = i === current
          return (
            <a
              key={r.label}
              href={r.href}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${r.label}: ${r.desc}`}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: `${(p.x / BOX) * 100}%`, top: `${(p.y / BOX) * 100}%` }}
            >
              <span
                className="flex items-center gap-2 px-3 py-2 transition-all duration-300"
                style={{
                  background: on ? "rgba(177,235,33,0.10)" : "var(--bg-card)",
                  border: `1px solid ${on ? "rgba(177,235,33,0.40)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "var(--radius-md)",
                  boxShadow: on ? "0 0 16px rgba(177,235,33,0.15)" : "none",
                  transform: on ? "scale(1.06)" : "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: on ? LIME : "rgba(255,255,255,0.35)" }} />
                <span className="font-['JetBrains_Mono'] font-semibold tracking-wide"
                  style={{ color: on ? LIME : "var(--text-on-dark-secondary)", fontSize: 11 }}>
                  {r.label}
                </span>
              </span>
            </a>
          )
        })}
      </div>

      {/* Active role display */}
      <a
        href={role.href}
        key={current}
        className="orbit-fade flex items-center gap-3 px-5 py-2.5 w-full"
        style={{
          background: "rgba(177,235,33,0.06)",
          border: "1px solid rgba(177,235,33,0.20)",
          borderRadius: "var(--radius-md)",
          maxWidth: 290,
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <RoleIcon className="h-4 w-4 shrink-0" style={{ color: LIME }} />
        <div>
          <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 14, fontFamily: "Inter, sans-serif" }}>{role.label}</div>
          <div className="font-['JetBrains_Mono']" style={{ color: "var(--text-on-dark-muted)", fontSize: 10, letterSpacing: "0.1em" }}>{role.desc}</div>
        </div>
        <span className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: LIME, boxShadow: "0 0 6px rgba(177,235,33,0.70)" }} />
      </a>
    </div>
  )
}
