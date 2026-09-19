"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SKILL_CATEGORIES = [
  {
    id: "os", label: "OS & Platforms", color: "#B1EB21",
    skills: [
      { name: "Windows 10/11",               level: 95 },
      { name: "Windows Server",              level: 95 },
      { name: "macOS",                       level: 88 },
      { name: "Linux / RHEL",               level: 90 },
      { name: "VMware ESXi",                level: 92 },
      { name: "iOS / Android",               level: 85 },
    ],
  },
  {
    id: "support", label: "IT Support", color: "#B1EB21",
    skills: [
      { name: "L1/L2/L3 Support",            level: 98 },
      { name: "Remote Tools",                level: 95 },
      { name: "Incident Resolution",         level: 95 },
      { name: "ITIL Framework",              level: 95 },
      { name: "SLA Management",              level: 93 },
      { name: "Documentation",               level: 92 },
    ],
  },
  {
    id: "sysadmin", label: "Sys Admin", color: "#B1EB21",
    skills: [
      { name: "Active Directory",            level: 97 },
      { name: "Azure AD / Entra",           level: 95 },
      { name: "Group Policy",               level: 95 },
      { name: "Exchange Online",            level: 90 },
      { name: "LDAP / WSUS",               level: 88 },
      { name: "Account Management",         level: 96 },
    ],
  },
  {
    id: "network", label: "Networking", color: "#B1EB21",
    skills: [
      { name: "TCP/IP · VLAN",              level: 95 },
      { name: "Cisco / Juniper",            level: 88 },
      { name: "Meraki · Wi-Fi 6/7",        level: 87 },
      { name: "pfSense / Fortinet",        level: 90 },
      { name: "VPN Config",                level: 93 },
      { name: "SNMP Monitoring",           level: 88 },
    ],
  },
  {
    id: "security", label: "Security", color: "#B1EB21",
    skills: [
      { name: "CrowdStrike / Palo Alto",   level: 90 },
      { name: "Okta MFA / SSO",           level: 93 },
      { name: "Splunk SIEM",              level: 88 },
      { name: "Zero Trust",              level: 88 },
      { name: "Vulnerability Mgmt",      level: 87 },
      { name: "GDPR / HIPAA",            level: 92 },
    ],
  },
  {
    id: "cloud", label: "Cloud", color: "#B1EB21",
    skills: [
      { name: "Microsoft Azure",         level: 95 },
      { name: "AWS",                    level: 88 },
      { name: "Google Cloud",           level: 82 },
      { name: "Docker & Kubernetes",    level: 85 },
      { name: "Hyper-V",               level: 90 },
      { name: "Azure Virtual Desktop",  level: 92 },
    ],
  },
  {
    id: "itsm", label: "ITSM", color: "#B1EB21",
    skills: [
      { name: "ServiceNow",            level: 92 },
      { name: "Jira SM / Zendesk",    level: 88 },
      { name: "Freshservice",         level: 90 },
      { name: "ITIL Framework",       level: 95 },
      { name: "Asset Lifecycle",      level: 90 },
      { name: "Change Management",    level: 88 },
    ],
  },
  {
    id: "automation", label: "Automation", color: "#B1EB21",
    skills: [
      { name: "PowerShell",           level: 95 },
      { name: "Python",              level: 88 },
      { name: "Ansible / Terraform", level: 85 },
      { name: "Power Automate",      level: 90 },
      { name: "Bash / Batch",       level: 87 },
      { name: "YAML / IaC",        level: 85 },
    ],
  },
  {
    id: "device", label: "Device Mgmt", color: "#B1EB21",
    skills: [
      { name: "Intune / Autopilot",   level: 95 },
      { name: "Jamf Pro / Kandji",   level: 90 },
      { name: "Apple Bus. Manager", level: 88 },
      { name: "Workspace ONE",      level: 87 },
      { name: "MDM / MDT",         level: 90 },
      { name: "TeamViewer",        level: 95 },
    ],
  },
  {
    id: "monitoring", label: "Monitoring", color: "#B1EB21",
    skills: [
      { name: "PRTG / SolarWinds",  level: 90 },
      { name: "Datadog / New Relic",level: 87 },
      { name: "Splunk Enterprise",  level: 88 },
      { name: "Wireshark / SNMP",  level: 88 },
      { name: "Veeam / Backup",    level: 92 },
      { name: "Perf Monitor",     level: 90 },
    ],
  },
]

function getLevelMeta(level: number) {
  if (level >= 94) return { tier: "Expert",     dots: 5 }
  if (level >= 88) return { tier: "Advanced",   dots: 4 }
  if (level >= 80) return { tier: "Proficient", dots: 3 }
  return                   { tier: "Competent", dots: 2 }
}

/*
  HexCell — zero useState, zero Framer Motion per-cell.
  All hover effects are pure CSS via the `group` pattern +
  CSS custom properties injected on the element.
  The entrance animation (scale-in) is handled by the
  global `.hex-cell` keyframe already in globals.css.
*/
function HexCell({
  skill,
  color,
  index,
}: {
  skill: { name: string; level: number }
  color: string
  index: number
}) {
  const meta = getLevelMeta(skill.level)
  const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

  return (
    <div
      className="hex-cell group flex flex-col items-center"
      style={{
        width: 180,
        animationDelay: `${index * 0.05}s`,
        /* CSS custom prop so child pseudo/transition can read accent colour */
        ["--hc" as string]: color,
      }}
    >
      {/* Hex shape — scale on hover via CSS, no JS */}
      <div
        className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.06]"
        style={{
          width: 168,
          height: 192,
          clipPath: hexClip,
          background: "var(--card-bg)",
          transition: "background 0.22s",
        }}
      >
        {/* CSS-driven background on hover via inline style + group */}
        <style>{`
          .hex-cell:hover > div {
            background: linear-gradient(145deg, ${color}22, ${color}0a) !important;
            filter: drop-shadow(0 0 14px ${color}66);
          }
          .hex-cell:hover .hex-border-poly {
            stroke: ${color};
            stroke-width: 2;
          }
          .hex-cell:hover .hex-label {
            color: ${color};
          }
          .hex-cell:hover .hex-tier {
            color: ${color};
            opacity: 1;
          }
          .hex-cell:hover .hex-dot-active {
            box-shadow: 0 0 5px ${color};
          }
        `}</style>

        {/* Hex border SVG */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="168" height="192"
          viewBox="0 0 168 192"
          style={{ overflow: "visible" }}
        >
          <polygon
            className="hex-border-poly"
            points="84,4 164,44 164,148 84,188 4,148 4,44"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            style={{ transition: "stroke 0.22s, stroke-width 0.18s" }}
          />
        </svg>

        {/* Content */}
        <div className="flex flex-col items-center justify-center px-5 text-center gap-2.5 z-10">
          {/* Proficiency dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, d) => (
              <div
                key={d}
                className={d < meta.dots ? "hex-dot-active rounded-full" : "rounded-full"}
                style={{
                  width: 7, height: 7,
                  background: d < meta.dots ? color : "var(--border)",
                  transition: "box-shadow 0.2s",
                }}
              />
            ))}
          </div>

          {/* Skill name */}
          <span
            className="hex-label font-['JetBrains_Mono'] leading-tight text-center"
            style={{
              fontSize: "13px",
              color: "var(--text-dim)",
              transition: "color 0.2s",
              wordBreak: "break-word",
              lineHeight: 1.35,
            }}
          >
            {skill.name}
          </span>

          {/* Tier badge */}
          <span
            className="hex-tier font-['JetBrains_Mono'] tracking-widest uppercase"
            style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              opacity: 0.6,
              transition: "color 0.2s, opacity 0.2s",
            }}
          >
            {meta.tier}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Category selector ── */
function CategoryTab({
  cat,
  active,
  onClick,
}: {
  cat: (typeof SKILL_CATEGORIES)[0]
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-lg text-[11px] font-medium tracking-wider transition-all duration-200"
      style={{
        fontFamily: "JetBrains Mono, monospace",
        background: active ? "var(--surface)" : "var(--card-bg)",
        border: active ? `1px solid ${cat.color}55` : "1px solid var(--border)",
        color: active ? cat.color : "var(--text-muted)",
        boxShadow: active ? `0 0 14px ${cat.color}22` : "none",
        cursor: "pointer",
      }}
    >
      {cat.label}
    </button>
  )
}

export function SkillsHex() {
  const [activeId, setActiveId] = useState("os")
  const active = SKILL_CATEGORIES.find((c) => c.id === activeId)!

  return (
    <div className="mt-10">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {SKILL_CATEGORIES.map((cat) => (
          <CategoryTab
            key={cat.id}
            cat={cat}
            active={activeId === cat.id}
            onClick={() => setActiveId(cat.id)}
          />
        ))}
      </div>

      {/* Hex grid — AnimatePresence only for category switch, not per-cell */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
        >
          {/* Label row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to right, transparent, ${active.color}55)` }} />
            <span
              className="font-['JetBrains_Mono'] text-[10px] tracking-[0.35em] uppercase px-3 py-1 rounded-sm"
              style={{ color: active.color, border: `1px solid ${active.color}33`, background: `${active.color}08` }}
            >
              {active.label}
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to left, transparent, ${active.color}55)` }} />
          </div>

          <div className="flex flex-col items-center gap-0">
            <div className="flex gap-3" style={{ marginBottom: "-34px" }}>
              {active.skills.slice(0, 3).map((s, i) => (
                <HexCell key={s.name} skill={s} color={active.color} index={i} />
              ))}
            </div>
            <div className="flex gap-3" style={{ marginLeft: "92px", marginBottom: "-34px" }}>
              {active.skills.slice(3, 6).map((s, i) => (
                <HexCell key={s.name} skill={s} color={active.color} index={i + 3} />
              ))}
            </div>
          </div>

          {/* Progress bars — single motion.div parent, children use CSS transitions */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {active.skills.map((skill, i) => {
              const meta = getLevelMeta(skill.level)
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-['JetBrains_Mono'] text-[10px] w-36 shrink-0 truncate"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {skill.name}
                  </span>
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--surface)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${active.color}88, ${active.color})`,
                        boxShadow: `0 0 6px ${active.color}55`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.06 }}
                    />
                  </div>
                  <span
                    className="font-['JetBrains_Mono'] text-[9px] w-14 text-right shrink-0"
                    style={{ color: active.color }}
                  >
                    {meta.tier}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
        {[
          { tier: "Expert",     dots: 5, color: "#B1EB21" },
          { tier: "Advanced",   dots: 4, color: "#C2F343" },
          { tier: "Proficient", dots: 3, color: "#9BD117" },
          { tier: "Competent",  dots: 2, color: "#7AA312" },
        ].map((l) => (
          <div key={l.tier} className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, d) => (
                <div
                  key={d}
                  className="w-2 h-2 rounded-full"
                  style={{ background: d < l.dots ? l.color : "var(--border)" }}
                />
              ))}
            </div>
            <span
              className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {l.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
