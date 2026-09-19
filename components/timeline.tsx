"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useMagneticTilt } from "@/hooks/use-magnetic-tilt"

const experiences = [
  {
    title: "IT Specialist",
    company: "Kontinental Establishment",
    location: "Germany / United States · Remote",
    period: "Apr 2023 – Present",
    shortPeriod: "2023–Now",
    current: true,
    highlights: [
      "Managed cloud (Azure, AWS) and on-prem infrastructure for 180+ employees across 12 global locations with zero unauthorized access incidents.",
      "Automated onboarding, provisioning, and patching (Power Automate, PowerShell, Python), eliminating 25 hrs/week of manual work across a $2.3M+ SaaS stack.",
      "Cut device setup time by 75% by deploying 180+ macOS, Windows, and iOS endpoints via Intune, Jamf Pro, and Autopilot.",
      "Reduced manual ticket triaging by 40% with Jira Service Management automation and Slack-based routing.",
      "Enforced RBAC, MFA, and GDPR/ISO 27001-aligned controls, securing identity and access across all global locations.",
    ],
  },
  {
    title: "Scientific Computing – DevSecOps",
    company: "The University of Göttingen",
    location: "Göttingen, Germany · On-site",
    period: "Apr 2024 – Sep 2024",
    shortPeriod: "2024",
    current: false,
    type: "Internship",
    highlights: [
      "Cut deployment time from 4 hours to 35 minutes by architecting ML infrastructure (Python, PyTorch, Docker, CI/CD) with automated testing — 92% model accuracy and 99.5% code coverage.",
      "Reduced vulnerabilities by 85% with DevSecOps: automated security scanning, Git, pre-commit hooks, and infrastructure-as-code, while ensuring GDPR-compliant data handling.",
      "Cut manual analysis time by 70% with an automated monitoring system (Python, FastAPI, real-time visualization) processing 10,000+ metrics.",
      "Maintained 99.8% uptime with a scalable data pipeline — PostgreSQL, automated ETL, and containerized microservices with fault-tolerant error handling.",
      "Built self-healing workflows for model optimization and predictive resource allocation using PowerShell, Bash, and Task Scheduler.",
    ],
  },
  {
    title: "IT Specialist",
    company: "Liberty Books Pvt Ltd.",
    location: "Karachi, Pakistan · On-site",
    period: "Jun 2022 – Oct 2022",
    shortPeriod: "2022",
    current: false,
    highlights: [
      "Managed IT infrastructure, systems, and security across multiple locations with seamless operations and minimal downtime.",
      "Reduced average resolution time by 25% by optimizing ServiceNow and Jira ticketing workflows.",
      "Administered Active Directory, Microsoft 365, and cloud (Azure AD, AWS) — governing user accounts, access controls, and security policies.",
      "Maintained high availability across Windows, Linux (Ubuntu, Red Hat), and macOS systems.",
      "Configured VPNs, firewalls (pfSense), DNS/DHCP, and secure remote access.",
      "Monitored networks for breaches, enforced security protocols, and ran centralized patch management.",
    ],
  },
  {
    title: "IT Specialist",
    company: "KTDMC",
    location: "Karachi, Pakistan · On-site",
    period: "Oct 2021 – May 2022",
    shortPeriod: "2021–22",
    current: false,
    highlights: [
      "Managed 265+ government-grade endpoints (macOS, Windows, iOS/Android) via Intune MDM, holding patch compliance at 100% through WSUS with full hardware asset accuracy.",
      "Cut provisioning time from 2 hours to 20 minutes across 265+ accounts using Active Directory, Azure AD, and Group Policy — with 99.4% email availability via Exchange Online.",
      "Reduced unauthorized access by 80% and held 99.8% uptime across Cisco and Juniper networks (TCP/IP, VLAN, DNS/DHCP, VPN).",
      "Authored centralized SOPs, runbooks, and IT guides that accelerated incident resolution and lowered escalation rates.",
    ],
  },
  {
    title: "IT Specialist",
    company: "Target Logistics International (Pvt.) Ltd",
    location: "Karachi, Pakistan · On-site",
    period: "Jul 2020 – Sep 2021",
    shortPeriod: "2020–21",
    current: false,
    highlights: [
      "Managed IT infrastructure, network security, and technical support across multiple departments.",
      "Improved ticket resolution and remote support efficiency by 40% by leading IT helpdesk operations.",
      "Managed firewalls, VPNs, and network infrastructure (DNS, DHCP, Wi-Fi optimization) for seamless connectivity.",
      "Administered Active Directory accounts, group policies, and security permissions in line with security standards.",
      "Implemented GDPR-aligned security policies with endpoint protection and multi-factor authentication (MFA).",
      "Deployed data backup and disaster recovery strategies, minimizing downtime and ensuring business continuity.",
    ],
  },
  {
    title: "IT Engineer",
    company: "The Active Solutions",
    location: "Karachi, Pakistan · On-site",
    period: "Apr 2019 – Mar 2020",
    shortPeriod: "2019–20",
    current: false,
    highlights: [
      "Provided technical support and system administration, ensuring stable IT operations across business functions.",
      "Reduced reported system errors by 30% by troubleshooting and resolving hardware and software issues.",
      "Managed and optimized SQL Server and Oracle databases, improving performance and data security.",
      "Administered Active Directory, user provisioning, access control, and group policy enforcement.",
      "Deployed enterprise software with seamless integration through testing and quality assurance.",
      "Maintained incident response and ITSM protocols, improving overall system reliability.",
    ],
  },
]

/* ── Detail card ── */
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
    >
      <div className="absolute inset-0 rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid rgba(177,235,33,0.25)" }} />
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: "linear-gradient(90deg, transparent, rgba(177,235,33,0.60), transparent)" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 30px rgba(177,235,33,0.04)" }} />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-lg" style={{ color: "#ffffff", fontFamily: "Inter, sans-serif" }}>
                {exp.title}
              </h3>
              {"type" in exp && exp.type && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(177,235,33,0.12)", color: "var(--lime)", border: "1px solid rgba(177,235,33,0.25)", fontFamily: "Inter, sans-serif" }}>
                  {exp.type}
                </span>
              )}
            </div>
            <p className="text-sm mt-0.5" style={{ color: "var(--lime)", fontFamily: "Inter, sans-serif" }}>
              {exp.company}
              <span style={{ color: "rgba(255,255,255,0.25)" }}> · </span>
              <span style={{ color: "var(--text-on-dark-secondary)" }}>{exp.location}</span>
            </p>
          </div>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider whitespace-nowrap h-fit px-2 py-1 rounded"
            style={{ color: "var(--lime)", border: "1px solid rgba(177,235,33,0.25)", background: "rgba(177,235,33,0.06)" }}>
            {exp.period}
          </span>
        </div>
        <ul className="space-y-2">
          {exp.highlights.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed"
              style={{ color: "var(--text-on-dark-secondary)", fontFamily: "Inter, sans-serif" }}>
              <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: "var(--lime)", minWidth: 4, minHeight: 4, marginTop: 8 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/* ── Desktop: network topology ── */
function NetworkTopology() {
  const [activeIdx, setActiveIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const W = 960
  const H = 170
  const nodeR = 22
  const nodeSpacing = W / (experiences.length + 1)
  const nodes = experiences.map((_, i) => ({ x: nodeSpacing * (i + 1), y: H / 2 }))

  return (
    <div ref={ref} className="w-full">
      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 560, height: "auto" }}>
          {/* Connection lines */}
          {nodes.slice(0, -1).map((node, i) => (
            <motion.line key={i}
              x1={node.x + nodeR} y1={node.y}
              x2={nodes[i + 1].x - nodeR} y2={nodes[i + 1].y}
              stroke="rgba(177,235,33,0.15)" strokeWidth="1.5" strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
            />
          ))}

          {/* Active highlight line */}
          {activeIdx > 0 && (
            <motion.line
              x1={nodes[0].x} y1={nodes[0].y}
              x2={nodes[activeIdx].x} y2={nodes[activeIdx].y}
              stroke="var(--lime)" strokeWidth="1.5" strokeOpacity="0.35"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Data packet */}
          {inView && (
            <motion.circle r="3" fill="var(--lime)"
              style={{ filter: "drop-shadow(0 0 4px var(--lime))" }}
              animate={{ cx: nodes.map(n => n.x), cy: nodes.map(n => n.y) }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          )}

          {/* Nodes */}
          {experiences.map((exp, i) => {
            const { x, y } = nodes[i]
            const isActive = activeIdx === i

            return (
              <g key={i} onClick={() => setActiveIdx(i)} style={{ cursor: "pointer" }}>
                {isActive && (
                  <motion.circle cx={x} cy={y} r={nodeR + 8}
                    fill="none" stroke="var(--lime)" strokeWidth="1" strokeOpacity="0.35"
                    animate={{ r: [nodeR + 6, nodeR + 14, nodeR + 6], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <motion.circle cx={x} cy={y} r={nodeR}
                  fill={isActive ? "rgba(177,235,33,0.10)" : "var(--bg-card)"}
                  stroke={isActive ? "var(--lime)" : "rgba(177,235,33,0.20)"}
                  strokeWidth={isActive ? "2" : "1.5"}
                  animate={{ r: isActive ? nodeR + 2 : nodeR }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ filter: isActive ? "drop-shadow(0 0 8px rgba(177,235,33,0.50))" : "none" }}
                />
                <text x={x} y={y + 5} textAnchor="middle"
                  fill={isActive ? "var(--lime)" : "rgba(177,235,33,0.45)"}
                  fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700"
                  style={{ pointerEvents: "none", userSelect: "none" }}>
                  {String(experiences.length - i).padStart(2, "0")}
                </text>
                {exp.current && (
                  <motion.circle cx={x + nodeR - 4} cy={y - nodeR + 4} r="5"
                    fill="var(--lime)"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ filter: "drop-shadow(0 0 4px var(--lime))" }}
                  />
                )}
                {/* Company name — two lines if needed */}
                {exp.company.split(" ").length <= 2 ? (
                  <motion.text x={x} y={y + nodeR + 16} textAnchor="middle"
                    fill={isActive ? "var(--lime)" : "var(--text-on-dark-muted)"}
                    fontSize="8.5" fontFamily="JetBrains Mono, monospace"
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: i * 0.12 + 0.5 }}
                    style={{ pointerEvents: "none", userSelect: "none" }}>
                    {exp.company}
                  </motion.text>
                ) : (
                  <>
                    <motion.text x={x} y={y + nodeR + 15} textAnchor="middle"
                      fill={isActive ? "var(--lime)" : "var(--text-on-dark-muted)"}
                      fontSize="8.5" fontFamily="JetBrains Mono, monospace"
                      animate={{ opacity: inView ? 1 : 0 }}
                      transition={{ delay: i * 0.12 + 0.5 }}
                      style={{ pointerEvents: "none", userSelect: "none" }}>
                      {exp.company.split(" ").slice(0, 2).join(" ")}
                    </motion.text>
                    <motion.text x={x} y={y + nodeR + 26} textAnchor="middle"
                      fill={isActive ? "var(--lime)" : "var(--text-on-dark-muted)"}
                      fontSize="8.5" fontFamily="JetBrains Mono, monospace"
                      animate={{ opacity: inView ? 1 : 0 }}
                      transition={{ delay: i * 0.12 + 0.6 }}
                      style={{ pointerEvents: "none", userSelect: "none" }}>
                      {exp.company.split(" ").slice(2).join(" ")}
                    </motion.text>
                  </>
                )}
                {/* Period above node */}
                <motion.text x={x} y={y - nodeR - 8} textAnchor="middle"
                  fill={isActive ? "rgba(177,235,33,0.80)" : "var(--text-on-dark-muted)"}
                  fontSize="8" fontFamily="JetBrains Mono, monospace"
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: i * 0.12 + 0.4 }}
                  style={{ pointerEvents: "none", userSelect: "none" }}>
                  {exp.shortPeriod}
                </motion.text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <DetailCard key={activeIdx} exp={experiences[activeIdx]} />
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase"
          style={{ color: "var(--text-on-dark-muted)" }}>
          Click node to inspect
        </span>
        <div className="flex gap-1">
          {experiences.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: activeIdx === i ? "var(--lime)" : "rgba(177,235,33,0.20)",
                boxShadow: activeIdx === i ? "0 0 5px rgba(177,235,33,0.60)" : "none",
              }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile: vertical timeline ── */
function VerticalTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(177,235,33,0.20), transparent)" }} />
      <div className="space-y-8">
        {experiences.map((exp, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useMagneticTilt(3)
          return (
            <motion.div key={index} className="relative pl-12"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}>
              <div className="absolute left-2 top-5">
                <motion.div className="w-3 h-3 rounded-full"
                  style={{ border: "2px solid var(--lime)", background: "var(--bg-base)", boxShadow: "0 0 8px rgba(177,235,33,0.35)" }}
                  whileInView={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }} />
              </div>
              <motion.div ref={ref}
                className="relative overflow-visible rounded-2xl bracket-card p-5 group"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(177,235,33,0.15)", rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
                onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(177,235,33,0.30), transparent)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: "inset 0 0 30px rgba(177,235,33,0.04)" }} />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base" style={{ color: "#ffffff", fontFamily: "Inter, sans-serif" }}>
                        {exp.title}
                      </h3>
                      {"type" in exp && exp.type && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(177,235,33,0.12)", color: "var(--lime)", border: "1px solid rgba(177,235,33,0.25)", fontFamily: "Inter, sans-serif" }}>
                          {exp.type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: "var(--lime)", fontFamily: "Inter, sans-serif" }}>
                      {exp.company}
                      <span style={{ color: "rgba(255,255,255,0.25)" }}> · </span>
                      <span style={{ color: "var(--text-on-dark-secondary)" }}>{exp.location}</span>
                    </p>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider whitespace-nowrap h-fit px-2 py-1 rounded"
                    style={{ color: "var(--lime)", border: "1px solid rgba(177,235,33,0.25)", background: "rgba(177,235,33,0.06)" }}>
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed"
                      style={{ color: "var(--text-on-dark-secondary)", fontFamily: "Inter, sans-serif" }}>
                      <span className="shrink-0 rounded-full" style={{ background: "var(--lime)", minWidth: 4, minHeight: 4, width: 4, height: 4, marginTop: 8 }} />
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

export function Timeline() {
  return (
    <>
      <div className="hidden md:block"><NetworkTopology /></div>
      <div className="md:hidden"><VerticalTimeline /></div>
    </>
  )
}
