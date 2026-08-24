"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useMagneticTilt } from "@/hooks/use-magnetic-tilt"

const experiences = [
  {
    title: "IT Specialist",
    company: "Kontinental Establishment",
    location: "Germany / USA (Remote)",
    period: "Apr 2023 – Present",
    shortPeriod: "2023–Now",
    current: true,
    highlights: [
      "Managed cloud infrastructure across Azure, AWS & GCP with Docker/Kubernetes & Terraform/Ansible — deployment time 6h → 90min",
      "Deployed Azure Virtual Desktop for 180+ remote employees across 12 international locations",
      "Zero Trust security via CrowdStrike, Okta MFA/SSO, Splunk SIEM, Palo Alto Prisma — 99.2% threat detection accuracy",
      "Reduced incident response from 4 hours → 45 minutes via AI-driven automation & predictive analytics",
      "Managed $2.3M+ infrastructure with PowerShell, Python, ServiceNow ITSM — saving 25 hours/week manual work",
      "190+ endpoints via Intune, Autopilot, Jamf Pro — device setup time cut by 75% (3h → 25min)",
      "99.7% uptime & 100% SLA compliance with Datadog, New Relic, Veeam/Azure/AWS Backup",
    ],
  },
  {
    title: "IT Specialist",
    company: "Liberty Books (Pvt.) Ltd",
    location: "Karachi, Pakistan",
    period: "Jun 2022 – Oct 2022",
    shortPeriod: "2022",
    current: false,
    highlights: [
      "Managed 520+ Windows 10/11 workstations across 18 countries via SCCM, MDT, VMware Workspace ONE UEM",
      "Deployed M365, Google Workspace, Zoom Enterprise for 520+ users — 90% adoption, 43% productivity improvement",
      "ITSM via Freshservice, Jira SM, Zendesk — 1,200+ monthly tickets at 94% resolution rate, 15-min response",
      "140+ training sessions, 150+ documentation articles — reduced repeat tickets by 35%",
      "GDPR/HIPAA compliance for $3.2M asset portfolio — 100% compliance & 85% tracking accuracy",
    ],
  },
  {
    title: "IT Specialist",
    company: "KTDMC",
    location: "Karachi, Pakistan",
    period: "Oct 2021 – May 2022",
    shortPeriod: "2021–22",
    current: false,
    highlights: [
      "VMware vSphere/ESXi + Hyper-V infrastructure for 265+ government endpoints — 100% patch compliance via WSUS",
      "Cisco/Juniper, pfSense/SonicWall/Fortinet firewalls, VPN — cut unauthorized access by 80%",
      "99.8% uptime with PRTG, SolarWinds, Wireshark across 50+ devices",
      "Protected $1.2M+ government data via Veeam, Acronis — 4-hour RTO, 100% backup success",
      "Hybrid identity (AD, Azure AD, Group Policy) for 265+ accounts — provisioning cut from 2h → 20min",
    ],
  },
  {
    title: "IT Specialist",
    company: "Target Logistics International (Pvt.) Ltd",
    location: "Karachi, Pakistan",
    period: "Jul 2020 – Sep 2021",
    shortPeriod: "2020–21",
    current: false,
    highlights: [
      "ManageEngine ServiceDesk — 285+ monthly tickets, 92% satisfaction, resolution time 6h → 2.5h",
      "Coordinated $420K+ hardware lifecycle, extending hardware lifespan by 30%",
      "Veeam/Acronis backup for 25+ critical servers — 100% backup success across 3 locations",
      "Boosted network performance by 25% via SolarWinds NPM, DHCP/DNS management",
    ],
  },
  {
    title: "IT Specialist",
    company: "The Active Solutions",
    location: "Karachi, Pakistan",
    period: "Apr 2019 – Feb 2020",
    shortPeriod: "2019–20",
    current: false,
    highlights: [
      "L1/L2/L3 support for 125+ Windows 10 workstations — 96% user satisfaction",
      "VMware vSphere infrastructure with AD, Group Policy — 15% system performance improvement",
      "50+ technical procedures developed — training time reduced by 40%",
    ],
  },
]

/* ── Detail card shown below selected node ── */
function DetailCard({ exp }: { exp: typeof experiences[0] }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useMagneticTilt(3)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35 }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl bracket-card p-5 group"
      aria-label={`${exp.company} details`}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border-hot)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 30px var(--accent-glow2)" }}
      />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="font-['Syne'] text-lg font-bold" style={{ color: "var(--text)" }}>
              {exp.title}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: "var(--accent-mid)" }}>
              {exp.company}
              <span style={{ color: "var(--border)" }}> · </span>
              <span style={{ color: "var(--text-dim)" }}>{exp.location}</span>
            </p>
          </div>
          <span
            className="font-['JetBrains_Mono'] text-[10px] tracking-wider whitespace-nowrap h-fit px-2 py-1 rounded-sm"
            style={{ color: "var(--accent)", border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {exp.period}
          </span>
        </div>
        <ul className="space-y-1.5">
          {exp.highlights.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
              <span className="shrink-0 mt-0.5 font-['JetBrains_Mono'] text-xs" style={{ color: "var(--accent)" }}>▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ── Desktop: horizontal network topology ── */
function NetworkTopology() {
  const [activeIdx, setActiveIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  // SVG dimensions
  const W = 900
  const H = 160
  const nodeR = 22
  const nodeSpacing = W / (experiences.length + 1)
  const nodes = experiences.map((_, i) => ({
    x: nodeSpacing * (i + 1),
    y: H / 2,
  }))

  return (
    <div ref={ref} className="w-full">
      {/* SVG topology */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 500, height: "auto" }}
          aria-label="Career timeline network topology"
        >
          {/* Connection lines between nodes */}
          {nodes.slice(0, -1).map((node, i) => (
            <motion.line
              key={i}
              x1={node.x + nodeR}
              y1={node.y}
              x2={nodes[i + 1].x - nodeR}
              y2={nodes[i + 1].y}
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
            />
          ))}

          {/* Active highlight line */}
          {activeIdx > 0 && (
            <motion.line
              x1={nodes[0].x}
              y1={nodes[0].y}
              x2={nodes[activeIdx].x}
              y2={nodes[activeIdx].y}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Data packet animation on active line */}
          {inView && (
            <motion.circle
              r="3"
              fill="var(--accent)"
              style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
              animate={{
                cx: nodes.map((n) => n.x),
                cy: nodes.map((n) => n.y),
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />
          )}

          {/* Nodes */}
          {experiences.map((exp, i) => {
            const { x, y } = nodes[i]
            const isActive = activeIdx === i
            const isCurrent = exp.current

            return (
              <g
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label={`Select ${exp.company}`}
                aria-pressed={isActive}
              >
                {/* Outer pulse ring for active */}
                {isActive && (
                  <motion.circle
                    cx={x} cy={y} r={nodeR + 8}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    animate={{ r: [nodeR + 6, nodeR + 14, nodeR + 6], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Node circle */}
                <motion.circle
                  cx={x} cy={y}
                  r={nodeR}
                  fill={isActive ? "var(--accent-glow)" : "var(--card-bg)"}
                  stroke={isActive ? "var(--accent)" : isCurrent ? "var(--border-hot)" : "var(--border)"}
                  strokeWidth={isActive ? "2" : "1.5"}
                  animate={{ r: isActive ? nodeR + 2 : nodeR }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ filter: isActive ? "drop-shadow(0 0 8px var(--accent))" : "none" }}
                />

                {/* Node index */}
                <text
                  x={x} y={y + 5}
                  textAnchor="middle"
                  fill={isActive ? "var(--accent)" : "var(--text-muted)"}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {String(experiences.length - i).padStart(2, "0")}
                </text>

                {/* Current badge */}
                {isCurrent && (
                  <motion.circle
                    cx={x + nodeR - 4}
                    cy={y - nodeR + 4}
                    r="5"
                    fill="var(--accent)"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
                  />
                )}

                {/* Company label below node — two lines for full name */}
                {exp.company.split(" ").length <= 2 ? (
                  <motion.text
                    x={x} y={y + nodeR + 16}
                    textAnchor="middle"
                    fill={isActive ? "var(--accent)" : "var(--text-muted)"}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: i * 0.12 + 0.5 }}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {exp.company}
                  </motion.text>
                ) : (
                  <>
                    <motion.text
                      x={x} y={y + nodeR + 15}
                      textAnchor="middle"
                      fill={isActive ? "var(--accent)" : "var(--text-muted)"}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      animate={{ opacity: inView ? 1 : 0 }}
                      transition={{ delay: i * 0.12 + 0.5 }}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {exp.company.split(" ").slice(0, 2).join(" ")}
                    </motion.text>
                    <motion.text
                      x={x} y={y + nodeR + 26}
                      textAnchor="middle"
                      fill={isActive ? "var(--accent)" : "var(--text-muted)"}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      animate={{ opacity: inView ? 1 : 0 }}
                      transition={{ delay: i * 0.12 + 0.6 }}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {exp.company.split(" ").slice(2).join(" ")}
                    </motion.text>
                  </>
                )}

                {/* Period label above node */}
                <motion.text
                  x={x} y={y - nodeR - 8}
                  textAnchor="middle"
                  fill={isActive ? "var(--accent-dim)" : "var(--text-muted)"}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: i * 0.12 + 0.4 }}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {exp.shortPeriod}
                </motion.text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Detail card */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <DetailCard key={activeIdx} exp={experiences[activeIdx]} />
        </AnimatePresence>
      </div>

      {/* Nav hint */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Click node to inspect
        </span>
        <div className="flex gap-1">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to ${experiences[i].company}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: activeIdx === i ? "var(--accent)" : "var(--border)",
                boxShadow: activeIdx === i ? "0 0 5px var(--accent)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile: classic vertical timeline ── */
function VerticalTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }}
      />
      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useMagneticTilt(3)
          return (
            <motion.div
              key={index}
              className="relative pl-12"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Dot */}
              <div className="absolute left-2 top-5">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ border: "2px solid var(--accent)", background: "var(--bg)", boxShadow: "0 0 8px var(--accent-glow)" }}
                  whileInView={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                />
              </div>

              <motion.div
                ref={ref}
                className="relative overflow-visible rounded-2xl bracket-card p-5 group"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  rotateX, rotateY,
                  transformPerspective: 1000,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: "inset 0 0 30px var(--accent-glow2)" }}
                />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-['Syne'] text-lg font-bold" style={{ color: "var(--text)" }}>
                      {exp.title}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "var(--accent-mid)" }}>
                      {exp.company}
                      <span style={{ color: "var(--border)" }}> · </span>
                      <span style={{ color: "var(--text-dim)" }}>{exp.location}</span>
                    </p>
                  </div>
                  <span
                    className="font-['JetBrains_Mono'] text-[10px] tracking-wider whitespace-nowrap h-fit px-2 py-1 rounded-sm"
                    style={{ color: "var(--accent)", border: "1px solid var(--border)", background: "var(--surface)" }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                      <span className="shrink-0 mt-0.5 font-['JetBrains_Mono'] text-xs" style={{ color: "var(--accent)" }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Export ── */
export function Timeline() {
  return (
    <>
      {/* Desktop: network topology (md+) */}
      <div className="hidden md:block">
        <NetworkTopology />
      </div>
      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        <VerticalTimeline />
      </div>
    </>
  )
}
