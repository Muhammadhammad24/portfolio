"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SKILL_CATEGORIES = [
  { id: "os", label: "Operating Systems", skills: [
    { name: "Windows 10/11", level: 95 },
    { name: "Windows Server 2016/2019/2022", level: 95 },
    { name: "macOS", level: 88 },
    { name: "Linux (Ubuntu/CentOS/RHEL)", level: 90 },
    { name: "VMware ESXi", level: 92 },
    { name: "iOS / iPadOS / Android", level: 85 },
  ]},
  { id: "support", label: "Technical Support", skills: [
    { name: "L1 / L2 / L3 Support", level: 98 },
    { name: "Remote Tools (TeamViewer/AnyDesk)", level: 95 },
    { name: "Incident Resolution", level: 95 },
    { name: "ITIL Framework", level: 95 },
    { name: "SLA Management", level: 93 },
    { name: "Documentation", level: 92 },
  ]},
  { id: "sysadmin", label: "System Administration", skills: [
    { name: "Active Directory", level: 97 },
    { name: "Azure AD / Entra ID", level: 95 },
    { name: "Group Policy", level: 95 },
    { name: "Exchange Online", level: 90 },
    { name: "LDAP / WSUS", level: 88 },
    { name: "User Account Management", level: 96 },
  ]},
  { id: "network", label: "Network Infrastructure", skills: [
    { name: "TCP/IP · VLAN · DNS/DHCP", level: 95 },
    { name: "Cisco / Juniper Routing", level: 88 },
    { name: "Cisco Meraki · Wi-Fi 6/7", level: 87 },
    { name: "pfSense / Fortinet Firewalls", level: 90 },
    { name: "VPN Configuration", level: 93 },
    { name: "SNMP Monitoring", level: 88 },
  ]},
  { id: "security", label: "Cybersecurity", skills: [
    { name: "CrowdStrike / Palo Alto", level: 90 },
    { name: "Okta MFA / SSO", level: 93 },
    { name: "Splunk Enterprise SIEM", level: 88 },
    { name: "Zero Trust Architecture", level: 88 },
    { name: "Vulnerability Assessment", level: 87 },
    { name: "GDPR / HIPAA Compliance", level: 92 },
  ]},
  { id: "cloud", label: "Cloud Infrastructure", skills: [
    { name: "Microsoft Azure", level: 95 },
    { name: "AWS", level: 88 },
    { name: "Google Cloud Platform", level: 82 },
    { name: "Docker & Kubernetes", level: 85 },
    { name: "Hyper-V / VirtualBox", level: 90 },
    { name: "Azure Virtual Desktop", level: 92 },
  ]},
  { id: "itsm", label: "Service Management", skills: [
    { name: "ServiceNow", level: 92 },
    { name: "Jira SM / Zendesk", level: 88 },
    { name: "Freshservice / ManageEngine", level: 90 },
    { name: "ITIL Framework", level: 95 },
    { name: "Asset Lifecycle Management", level: 90 },
    { name: "Change Management", level: 88 },
  ]},
  { id: "automation", label: "Automation & Scripting", skills: [
    { name: "PowerShell", level: 95 },
    { name: "Python", level: 88 },
    { name: "Ansible / Terraform", level: 85 },
    { name: "Power Automate", level: 90 },
    { name: "Bash / Batch", level: 87 },
    { name: "YAML / IaC", level: 85 },
  ]},
  { id: "device", label: "Device Management", skills: [
    { name: "MS Intune / SCCM / Autopilot", level: 95 },
    { name: "Jamf Pro / Kandji", level: 90 },
    { name: "Apple Business Manager", level: 88 },
    { name: "VMware Workspace ONE", level: 87 },
    { name: "MDM / MDT", level: 90 },
    { name: "TeamViewer / Remote Tools", level: 95 },
  ]},
  { id: "monitoring", label: "System Monitoring", skills: [
    { name: "PRTG / SolarWinds", level: 90 },
    { name: "Datadog / New Relic", level: 87 },
    { name: "Splunk Enterprise", level: 88 },
    { name: "Wireshark / SNMP", level: 88 },
    { name: "Veeam / Azure Backup", level: 92 },
    { name: "Win Performance Monitor", level: 90 },
  ]},
]

/**
 * Convert 0-100 level to a tier label + dot count out of 5
 * No numbers shown — level communicated visually via dots + label
 */
function getLevelMeta(level: number): { tier: string; dots: number; color: string } {
  if (level >= 94) return { tier: "Expert",    dots: 5, color: "#00ff41" }
  if (level >= 88) return { tier: "Advanced",  dots: 4, color: "#39ff14" }
  if (level >= 80) return { tier: "Proficient",dots: 3, color: "#66ff66" }
  if (level >= 70) return { tier: "Competent", dots: 2, color: "#99ff99" }
  return              { tier: "Familiar",   dots: 1, color: "#b3ffb3" }
}

function SkillCard({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  const [hovered, setHovered] = useState(false)
  const meta = getLevelMeta(skill.level)
  const TOTAL_DOTS = 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22 }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-xl p-4 h-full transition-all duration-200"
        style={{
          background: hovered ? 'var(--surface)' : 'var(--card-bg)',
          border: hovered ? `1px solid ${meta.color}` : '1px solid var(--border)',
          boxShadow: hovered ? `0 0 20px var(--surface)` : 'none',
        }}
      >
        {/* Top glow line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-xl transition-opacity duration-200"
          style={{
            background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
            opacity: hovered ? 0.7 : 0.15,
          }}
        />

        {/* Skill name */}
        <p
          className="font-['Space_Grotesk'] text-xs font-semibold leading-normal mb-3 pb-0.5"
          style={{ color: hovered ? 'var(--text)' : 'var(--text-dim)' }}
        >
          {skill.name}
        </p>

        {/* Animated fill bar — terminal loading style */}
        <div
          className="relative h-1.5 rounded-full overflow-hidden mb-2.5"
          style={{ background: 'var(--surface)' }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, var(--green-dim), ${meta.color})`,
              boxShadow: hovered ? `0 0 8px ${meta.color}` : 'none',
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1.0, ease: "easeOut", delay: index * 0.04 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Dot matrix level indicator + tier label */}
        <div className="flex items-center justify-between">
          {/* 5 dots — filled = skill level */}
          <div className="flex items-center gap-1">
            {Array.from({ length: TOTAL_DOTS }).map((_, d) => (
              <motion.div
                key={d}
                className="rounded-full"
                style={{
                  width: 5, height: 5,
                  background: d < meta.dots ? meta.color : 'var(--border)',
                  boxShadow: d < meta.dots && hovered ? `0 0 5px ${meta.color}` : 'none',
                  transition: 'box-shadow 0.2s',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.04 + d * 0.06, duration: 0.2 }}
                viewport={{ once: true }}
              />
            ))}
          </div>

          {/* Tier label */}
          <span
            className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase"
            style={{ color: hovered ? meta.color : 'var(--text-muted)' }}
          >
            {meta.tier}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsTabbed() {
  const [activeId, setActiveId] = useState("os")
  const active = SKILL_CATEGORIES.find(c => c.id === activeId)!

  return (
    <div className="mt-10">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-all duration-200"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: activeId === cat.id ? 'var(--surface)' : 'var(--card-bg)',
              border: activeId === cat.id ? '1px solid var(--border-hot)' : '1px solid var(--border)',
              color: activeId === cat.id ? 'var(--green)' : 'var(--text-muted)',
              boxShadow: activeId === cat.id ? '0 0 12px rgba(0,255,65,0.15)' : 'none',
              cursor: 'pointer',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {active.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
        {[
          { tier: "Expert",     dots: 5, color: "#00ff41" },
          { tier: "Advanced",   dots: 4, color: "#39ff14" },
          { tier: "Proficient", dots: 3, color: "#66ff66" },
          { tier: "Competent",  dots: 2, color: "#99ff99" },
        ].map((l) => (
          <div key={l.tier} className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, d) => (
                <div key={d} className="w-2 h-2 rounded-full"
                  style={{ background: d < l.dots ? l.color : 'var(--border)' }} />
              ))}
            </div>
            <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}>
              {l.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
