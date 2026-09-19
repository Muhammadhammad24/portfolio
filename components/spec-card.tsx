"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMagneticTilt } from "@/hooks/use-magnetic-tilt"

const L  = "#B1EB21"   // lime
const LD = "#9BD117"   // lime dim
const LB = "#C2F343"   // lime bright

/* ─────────────────────────────────────────────
   Each icon is a unique themed SVG illustration
   ───────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {

  /* DevSecOps — CI/CD pipeline with a prominent lock gate */
  DevSecOps: (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="dso-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="dso-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Pipeline track — bold */}
      <line x1="2" y1="26" x2="50" y2="26" stroke="rgba(177,235,33,0.22)" strokeWidth="2.5" strokeDasharray="4 3"/>
      {/* Stage nodes — larger */}
      {[6,18,34,46].map((x,i) => (
        <circle key={i} cx={x} cy="26" r={i===2?5.5:4}
          fill={i===2?"rgba(177,235,33,0.15)":"rgba(177,235,33,0.07)"}
          stroke={i===2?"url(#dso-g)":"rgba(177,235,33,0.35)"}
          strokeWidth={i===2?2:1.5}
          filter={i===2?"url(#dso-glow)":undefined}
        />
      ))}
      {/* Code brackets — left corner */}
      <path d="M4 8 L0 13 L4 18" stroke="url(#dso-g)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M12 8 L16 13 L12 18" stroke="url(#dso-g)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Lock body — bold centre piece */}
      <rect x="20" y="33" width="12" height="10" rx="2.5" fill="rgba(177,235,33,0.14)" stroke="url(#dso-g)" strokeWidth="2.2"/>
      <path d="M22 33v-3.5a4 4 0 0 1 8 0V33" stroke="url(#dso-g)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <circle cx="26" cy="38" r="1.8" fill={L} filter="url(#dso-glow)"/>
      {/* Rocket — right */}
      <path d="M44 8 C44 8 52 13 49 21 L44 23 L41 18 Z" fill="rgba(177,235,33,0.10)" stroke="url(#dso-g)" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M41 23 L38 26" stroke={L} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="44" cy="15" r="2.2" fill={L} filter="url(#dso-glow)"/>
      {/* Scan wave */}
      <path d="M16 6 Q18 3 20 6 Q22 9 24 6 Q26 3 28 6" stroke={L} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  ),

  /* Cloud Engineer — large bold cloud + k8s hex cluster */
  "Cloud Engineer": (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ce-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="ce-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Cloud — bolder, glowing */}
      <path d="M38 26H16a9 9 0 0 1-1-18 11 11 0 0 1 22 2 7 7 0 0 1 1 16Z"
        fill="rgba(177,235,33,0.10)" stroke="url(#ce-g)" strokeWidth="2.2" strokeLinejoin="round"
        filter="url(#ce-glow)"/>
      {/* Upload arrow — thicker */}
      <line x1="26" y1="42" x2="26" y2="29" stroke="url(#ce-g)" strokeWidth="2.5" strokeLinecap="round"/>
      <polyline points="20,35 26,29 32,35" stroke="url(#ce-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Kubernetes hex cluster — larger */}
      {[[14,48],[26,50],[38,48],[20,44],[32,44]].map(([cx,cy],i) => (
        <polygon key={i}
          points={`${cx},${cy-5} ${cx+4.5},${cy-2.5} ${cx+4.5},${cy+2.5} ${cx},${cy+5} ${cx-4.5},${cy+2.5} ${cx-4.5},${cy-2.5}`}
          fill={i===2?"rgba(177,235,33,0.14)":"rgba(177,235,33,0.06)"}
          stroke={i===2?"url(#ce-g)":"rgba(177,235,33,0.35)"} strokeWidth={i===2?1.8:1.2}
        />
      ))}
      <line x1="17" y1="45" x2="23" y2="45" stroke="rgba(177,235,33,0.35)" strokeWidth="1"/>
      <line x1="29" y1="45" x2="35" y2="45" stroke="rgba(177,235,33,0.35)" strokeWidth="1"/>
      <line x1="20" y1="44" x2="26" y2="50" stroke="rgba(177,235,33,0.35)" strokeWidth="1"/>
      <line x1="32" y1="44" x2="26" y2="50" stroke="rgba(177,235,33,0.35)" strokeWidth="1"/>
    </svg>
  ),

  /* IT Infrastructure — isometric server rack, bold LEDs */
  "IT Infrastructure": (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="it-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="it-glow"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Rack cabinet */}
      <rect x="6" y="4" width="40" height="44" rx="3.5" fill="rgba(177,235,33,0.05)" stroke="url(#it-g)" strokeWidth="2"/>
      <line x1="6" y1="11" x2="46" y2="11" stroke="rgba(177,235,33,0.15)" strokeWidth="1.2"/>
      <line x1="6" y1="46" x2="46" y2="46" stroke="rgba(177,235,33,0.15)" strokeWidth="1.2"/>
      {/* Server blades — 4 of them */}
      {[17,24,31,38].map((y,i) => (
        <g key={i}>
          <rect x="9" y={y-4.5} width="34" height="7" rx="2"
            fill="rgba(177,235,33,0.07)" stroke="rgba(177,235,33,0.28)" strokeWidth="1.2"/>
          {/* LED — glowing on active blades */}
          <circle cx="13.5" cy={y-1} r={i<2?2:1.5}
            fill={i<2?L:LD} opacity={i===3?0.35:1}
            filter={i<2?"url(#it-glow)":undefined}/>
          {/* Activity bar */}
          <rect x="18" y={y-2.5} width={[20,14,10,6][i]} height="3.5" rx="1.5"
            fill={i===0?"rgba(177,235,33,0.28)":"rgba(177,235,33,0.16)"}/>
          {/* Port */}
          <rect x="38" y={y-2.5} width="3.5" height="3.5" rx="0.8"
            fill="rgba(177,235,33,0.12)" stroke="rgba(177,235,33,0.30)" strokeWidth="0.8"/>
        </g>
      ))}
      {/* Cable tray */}
      <path d="M12 46 Q12 50 17 50 H35 Q40 50 40 46" stroke="rgba(177,235,33,0.35)" strokeWidth="1.4" fill="none"/>
    </svg>
  ),

  /* Network Engineer — bold topology with glowing core */
  "Network Engineer": (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ne-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="ne-glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Core router — large, glowing */}
      <circle cx="26" cy="26" r="7.5" fill="rgba(177,235,33,0.13)" stroke="url(#ne-g)" strokeWidth="2.2" filter="url(#ne-glow)"/>
      <circle cx="26" cy="26" r="3.5" fill={L} opacity="0.95"/>
      {/* Signal arcs */}
      <path d="M18 18 A11 11 0 0 1 34 18" stroke={L} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M13 13 A18 18 0 0 1 39 13" stroke={L} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.25"/>
      {/* Leaf nodes — larger */}
      {[[7,11],[45,11],[7,41],[45,41],[26,4]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="rgba(177,235,33,0.09)" stroke="rgba(177,235,33,0.50)" strokeWidth="1.6"/>
          <circle cx={cx} cy={cy} r="2" fill="rgba(177,235,33,0.40)"/>
          <line x1={cx} y1={cy} x2={26} y2={26} stroke="rgba(177,235,33,0.22)" strokeWidth="1.2" strokeDasharray="2.5 2.5"/>
        </g>
      ))}
      {/* VLAN strips */}
      <rect x="20" y="44" width="12" height="4" rx="1.5" fill="rgba(177,235,33,0.12)" stroke="rgba(177,235,33,0.35)" strokeWidth="1"/>
      <rect x="34" y="44" width="8" height="4" rx="1.5" fill="rgba(177,235,33,0.07)" stroke="rgba(177,235,33,0.22)" strokeWidth="1"/>
    </svg>
  ),

  /* IT Security — shield with bold eye + scan beam */
  "IT Security": (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="is-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="is-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="is-shield">
          <path d="M26 3L5 12v15c0 12 10 21 21 22 11-1 21-10 21-22V12Z"/>
        </clipPath>
      </defs>
      {/* Shield outer — bold */}
      <path d="M26 3L5 12v15c0 12 10 21 21 22 11-1 21-10 21-22V12Z"
        fill="rgba(177,235,33,0.08)" stroke="url(#is-g)" strokeWidth="2.4" strokeLinejoin="round"
        filter="url(#is-glow)"/>
      {/* Shield inner ring */}
      <path d="M26 10L11 17v10c0 9 8 16 15 17 7-1 15-8 15-17V17Z"
        fill="none" stroke="rgba(177,235,33,0.18)" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Eye — large */}
      <ellipse cx="26" cy="26" rx="9" ry="6" fill="none" stroke="url(#is-g)" strokeWidth="2"/>
      <circle cx="26" cy="26" r="3.5" fill="rgba(177,235,33,0.15)" stroke={L} strokeWidth="1.8"/>
      <circle cx="26" cy="26" r="1.6" fill={L} filter="url(#is-glow)"/>
      <circle cx="27.8" cy="24.5" r="0.8" fill="rgba(255,255,255,0.60)"/>
      {/* Scan line */}
      <line x1="7" y1="26" x2="45" y2="26" stroke={L} strokeWidth="1" opacity="0.28" strokeDasharray="2.5 3" clipPath="url(#is-shield)"/>
      {/* Threat triangles */}
      {[[9,14],[43,14]].map(([x,y],i) => (
        <polygon key={i} points={`${x},${y-4} ${x+3.5},${y+2} ${x-3.5},${y+2}`}
          fill="rgba(177,235,33,0.22)" stroke={L} strokeWidth="1.2" opacity="0.7"/>
      ))}
    </svg>
  ),

  /* IT Support Engineer — bold headset with waveform */
  "IT Support Engineer": (
    <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sp-g" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor={LB}/><stop offset="1" stopColor={LD}/>
        </linearGradient>
        <filter id="sp-glow"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Headband arc — bold */}
      <path d="M11 30 A15 15 0 0 1 41 30" stroke="url(#sp-g)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Left ear cup */}
      <rect x="5" y="26" width="10" height="14" rx="4" fill="rgba(177,235,33,0.10)" stroke="url(#sp-g)" strokeWidth="2.2"/>
      <line x1="10" y1="28" x2="10" y2="38" stroke={L} strokeWidth="1.4" opacity="0.45" strokeLinecap="round"/>
      {/* Right ear cup */}
      <rect x="37" y="26" width="10" height="14" rx="4" fill="rgba(177,235,33,0.10)" stroke="url(#sp-g)" strokeWidth="2.2"/>
      <line x1="42" y1="28" x2="42" y2="38" stroke={L} strokeWidth="1.4" opacity="0.45" strokeLinecap="round"/>
      {/* Mic boom */}
      <path d="M42 36 Q48 40 46 46" stroke="url(#sp-g)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="46" cy="47" r="2.8" fill="rgba(177,235,33,0.12)" stroke="url(#sp-g)" strokeWidth="1.6"
        filter="url(#sp-glow)"/>
      {/* Audio waveform — taller, bolder */}
      <polyline
        points="16,33 18,25 20,38 22,20 24,33 26,28 28,36 30,22 32,33 34,27 36,31"
        stroke="url(#sp-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Ticket check — top right */}
      <circle cx="41" cy="9" r="6" fill="rgba(177,235,33,0.08)" stroke="rgba(177,235,33,0.30)" strokeWidth="1.2"/>
      <path d="M37.5 9 L40 12 L45 6" stroke={L} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#sp-glow)"/>
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
        className="relative overflow-visible rounded-2xl transition-all duration-300 p-5 flex flex-col h-full"
        style={{
          background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
          border: `1px solid ${hovered ? "rgba(177,235,33,0.32)" : "var(--border-dark-soft)"}`,
          boxShadow: hovered ? "0 0 36px rgba(177,235,33,0.10), 0 0 2px rgba(177,235,33,0.06) inset" : "none",
          borderRadius: "var(--radius-lg)",
        }}
      >
        {/* Top shine */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(177,235,33,0.50), transparent)", opacity: hovered ? 1 : 0.15, transition: "opacity 0.3s" }} />

        {/* ── Icon box — hexagon frame ── */}
        <div className="relative mb-5">
          <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{
              width: 80, height: 80,
              filter: hovered
                ? `drop-shadow(0 0 18px rgba(177,235,33,0.80))`
                : `drop-shadow(0 0 6px rgba(177,235,33,0.28))`,
              transform: hovered ? "scale(1.08) translateY(-3px)" : "scale(1)",
            }}
          >
            {/* Outer pulse ring — visible on hover */}
            {hovered && (
              <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 80 80" width="80" height="80"
                style={{ animation: "orbit-pulse 1.8s ease-in-out infinite" }}>
                <polygon
                  points="40,1 75,20 75,60 40,79 5,60 5,20"
                  fill="none"
                  stroke="rgba(177,235,33,0.30)"
                  strokeWidth="1"
                />
              </svg>
            )}
            {/* Main hexagon background frame */}
            <svg className="absolute inset-0" viewBox="0 0 80 80" width="80" height="80">
              <defs>
                <linearGradient id={`hex-fill-${index}`} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="rgba(177,235,33,0.14)"/>
                  <stop offset="1" stopColor="rgba(177,235,33,0.04)"/>
                </linearGradient>
              </defs>
              {/* Hex fill */}
              <polygon
                points="40,3 73,21 73,59 40,77 7,59 7,21"
                fill={hovered ? `url(#hex-fill-${index})` : "rgba(177,235,33,0.05)"}
                stroke={hovered ? "rgba(177,235,33,0.70)" : "rgba(177,235,33,0.22)"}
                strokeWidth="1.8"
                style={{ transition: "all 0.3s" }}
              />
              {/* Inner hex detail ring */}
              <polygon
                points="40,12 64,26 64,54 40,68 16,54 16,26"
                fill="none"
                stroke={hovered ? "rgba(177,235,33,0.18)" : "rgba(177,235,33,0.07)"}
                strokeWidth="1"
                strokeDasharray={hovered ? "none" : "3 4"}
                style={{ transition: "all 0.3s" }}
              />
              {/* Corner accent dots at hex vertices */}
              {[[40,3],[73,21],[73,59],[40,77],[7,59],[7,21]].map(([cx,cy],vi) => (
                <circle key={vi} cx={cx} cy={cy} r={hovered ? 2.5 : 1.5}
                  fill={hovered ? "rgba(177,235,33,0.90)" : "rgba(177,235,33,0.30)"}
                  style={{ transition: "all 0.3s" }}
                />
              ))}
            </svg>
            {/* Actual icon — larger, centered */}
            <div className="relative z-10" style={{ width: 52, height: 52 }}>
              {icon}
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <span className="font-['JetBrains_Mono'] text-[9px] tracking-[0.35em] uppercase mb-2"
          style={{ color: "rgba(177,235,33,0.55)" }}>
          Specialization
        </span>

        {/* Role title */}
        <h3 className="font-bold mb-2 transition-colors duration-300"
          style={{
            color: hovered ? "#ffffff" : "var(--text-on-dark)",
            fontFamily: "Inter, sans-serif",
            fontSize: 17,
            lineHeight: 1.25,
          }}>
          {spec.role}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-grow"
          style={{ color: "var(--text-on-dark-secondary)", lineHeight: 1.65 }}>
          {spec.desc}
        </p>

        {/* Metric badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 w-fit"
          style={{ background: "rgba(177,235,33,0.07)", border: "1px solid rgba(177,235,33,0.22)" }}>
          <div className="blink-dot w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: L, boxShadow: `0 0 6px rgba(177,235,33,0.70)` }} />
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider font-bold" style={{ color: L }}>
            {spec.metric}
          </span>
        </div>

        {/* Tool tags */}
        <div className="flex flex-wrap gap-1.5 pt-3"
          style={{ borderTop: "1px solid rgba(177,235,33,0.10)" }}>
          {spec.tools.map((tool) => (
            <span key={tool}
              className="font-['JetBrains_Mono'] text-[9px] tracking-wider px-2 py-0.5 rounded"
              style={{
                background: hovered ? "rgba(177,235,33,0.10)" : "rgba(177,235,33,0.05)",
                border: `1px solid ${hovered ? "rgba(177,235,33,0.28)" : "rgba(177,235,33,0.12)"}`,
                color: hovered ? L : "var(--text-on-dark-muted)",
                transition: "all 0.2s",
              }}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
