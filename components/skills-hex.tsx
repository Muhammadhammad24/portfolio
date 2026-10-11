"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// AnimatePresence kept for category switch animation

const SKILL_CATEGORIES = [
  {
    id: "os", label: "OS & Platforms", color: "#5B8DEF",
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
    id: "support", label: "IT Support", color: "#5B8DEF",
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
    id: "sysadmin", label: "Sys Admin", color: "#5B8DEF",
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
    id: "network", label: "Networking", color: "#5B8DEF",
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
    id: "security", label: "Security", color: "#5B8DEF",
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
    id: "cloud", label: "Cloud", color: "#5B8DEF",
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
    id: "itsm", label: "ITSM", color: "#5B8DEF",
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
    id: "automation", label: "Automation", color: "#5B8DEF",
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
    id: "device", label: "Device Mgmt", color: "#5B8DEF",
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
    id: "monitoring", label: "Monitoring", color: "#5B8DEF",
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


function tierOf(level: number) {
  if (level >= 94) return 'Expert'
  if (level >= 88) return 'Advanced'
  if (level >= 80) return 'Proficient'
  return 'Competent'
}

export function SkillsHex() {
  const [activeId, setActiveId] = useState('os')
  const active = SKILL_CATEGORIES.find((c) => c.id === activeId)!

  return (
    <div className="mt-12">
      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {SKILL_CATEGORIES.map((cat) => {
          const on = cat.id === activeId
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className="rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200"
              style={{
                background: on ? 'rgba(91,141,239,0.1)' : 'transparent',
                border: `1px solid ${on ? 'rgba(91,141,239,0.4)' : 'var(--border)'}`,
                color: on ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Skill meters */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2"
        >
          {active.skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-sm" style={{ color: 'var(--text)' }}>
                  {skill.name}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {tierOf(skill.level)}
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'var(--border-dark)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--accent)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
