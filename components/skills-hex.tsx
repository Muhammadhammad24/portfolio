"use client"

import { useState } from "react"

/**
 * Skills grouped under the same six layers the hero stack uses, so the two
 * read as one idea. No percentages and no Expert/Advanced ladder: what counts
 * is how often a tool is actually in my hands, which is what the weight shows.
 */

type Use = "daily" | "regular" | "working"

type Group = {
  id: string
  layer: string
  note: string
  tools: { name: string; use: Use }[]
}

const GROUPS: Group[] = [
  {
    id: "security",
    layer: "Security & Compliance",
    note: "Access, detection, and the audits that follow",
    tools: [
      { name: "Zero Trust access", use: "daily" },
      { name: "Okta MFA / SSO", use: "daily" },
      { name: "Conditional Access", use: "daily" },
      { name: "RBAC", use: "daily" },
      { name: "GDPR / ISO 27001", use: "daily" },
      { name: "Microsoft Defender", use: "daily" },
      { name: "Microsoft Sentinel", use: "regular" },
      { name: "CrowdStrike", use: "regular" },
      { name: "Palo Alto", use: "regular" },
      { name: "Splunk SIEM", use: "regular" },
      { name: "Vulnerability mgmt", use: "regular" },
    ],
  },
  {
    id: "devsecops",
    layer: "DevSecOps & Automation",
    note: "The repetitive parts, turned into code",
    tools: [
      { name: "PowerShell", use: "daily" },
      { name: "Python", use: "daily" },
      { name: "Power Automate", use: "daily" },
      { name: "Git", use: "daily" },
      { name: "Bash", use: "regular" },
      { name: "Terraform", use: "regular" },
      { name: "Ansible", use: "regular" },
      { name: "GitHub Actions", use: "regular" },
      { name: "YAML / IaC", use: "regular" },
      { name: "Checkov", use: "working" },
    ],
  },
  {
    id: "cloud",
    layer: "Cloud",
    note: "Where most of the estate now lives",
    tools: [
      { name: "Microsoft Azure", use: "daily" },
      { name: "Azure Virtual Desktop", use: "daily" },
      { name: "Microsoft 365", use: "daily" },
      { name: "AWS", use: "regular" },
      { name: "Hyper-V", use: "regular" },
      { name: "Docker", use: "regular" },
      { name: "Google Cloud", use: "working" },
      { name: "Kubernetes", use: "working" },
    ],
  },
  {
    id: "network",
    layer: "Network",
    note: "Routing, segmentation, and keeping strangers out",
    tools: [
      { name: "TCP/IP · VLAN", use: "daily" },
      { name: "DNS / DHCP", use: "daily" },
      { name: "VPN", use: "daily" },
      { name: "pfSense", use: "regular" },
      { name: "Fortinet", use: "regular" },
      { name: "Cisco Meraki", use: "regular" },
      { name: "Cisco / Juniper", use: "regular" },
      { name: "Wi-Fi 6/7", use: "regular" },
      { name: "Wireshark", use: "regular" },
      { name: "SNMP", use: "working" },
    ],
  },
  {
    id: "servers",
    layer: "Servers & Infrastructure",
    note: "Identity, hosts, and the backups behind them",
    tools: [
      { name: "Active Directory", use: "daily" },
      { name: "Entra ID / Azure AD", use: "daily" },
      { name: "Group Policy", use: "daily" },
      { name: "Windows Server", use: "daily" },
      { name: "Exchange Online", use: "regular" },
      { name: "VMware ESXi", use: "regular" },
      { name: "Linux / RHEL", use: "regular" },
      { name: "WSUS", use: "regular" },
      { name: "Veeam backup", use: "regular" },
      { name: "SQL Server", use: "working" },
    ],
  },
  {
    id: "endpoints",
    layer: "Endpoints & Support",
    note: "The machines people actually sit in front of",
    tools: [
      { name: "Microsoft Intune", use: "daily" },
      { name: "Windows 10/11", use: "daily" },
      { name: "Autopilot", use: "daily" },
      { name: "ServiceNow", use: "daily" },
      { name: "Jira Service Mgmt", use: "daily" },
      { name: "ITIL", use: "daily" },
      { name: "TeamViewer", use: "daily" },
      { name: "macOS", use: "regular" },
      { name: "Jamf Pro", use: "regular" },
      { name: "iOS / Android", use: "regular" },
      { name: "Zendesk", use: "regular" },
      { name: "Freshservice", use: "regular" },
    ],
  },
]

const STYLES: Record<Use, { bg: string; border: string; color: string }> = {
  daily: { bg: "rgba(91,141,239,0.12)", border: "rgba(91,141,239,0.45)", color: "var(--accent)" },
  regular: { bg: "transparent", border: "var(--border-dark)", color: "var(--text-dim)" },
  working: { bg: "transparent", border: "var(--border)", color: "var(--text-muted)" },
}

const LEGEND: { use: Use; label: string }[] = [
  { use: "daily", label: "in my hands most days" },
  { use: "regular", label: "regularly, in production" },
  { use: "working", label: "working knowledge" },
]

export function SkillsHex() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="mt-12">
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2.5">
        {LEGEND.map(({ use, label }) => (
          <span key={use} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--text-muted)" }}>
            <span
              className="h-3.5 w-3.5 rounded"
              style={{ background: STYLES[use].bg, border: `1px solid ${STYLES[use].border}` }}
            />
            {label}
          </span>
        ))}
      </div>

      <div className="space-y-px overflow-hidden rounded-2xl" style={{ background: "var(--border)" }}>
        {GROUPS.map((g) => {
          const on = active === g.id
          return (
            <div
              key={g.id}
              onMouseEnter={() => setActive(g.id)}
              onMouseLeave={() => setActive(null)}
              className="grid grid-cols-1 gap-4 p-5 transition-colors duration-200 sm:grid-cols-[210px_1fr] sm:gap-6 sm:p-6"
              style={{ background: on ? "rgba(91,141,239,0.04)" : "var(--card-bg)" }}
            >
              <div>
                <h3
                  className="font-medium transition-colors duration-200"
                  style={{ fontSize: 15, color: on ? "var(--accent)" : "var(--text)" }}
                >
                  {g.layer}
                </h3>
                <p className="mt-1 text-[12.5px] leading-snug" style={{ color: "var(--text-muted)" }}>
                  {g.note}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 self-center">
                {g.tools.map((t) => {
                  const s = STYLES[t.use]
                  return (
                    <span
                      key={t.name}
                      className="rounded-md px-2.5 py-1 text-[12.5px]"
                      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                    >
                      {t.name}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
