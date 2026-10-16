"use client"

/**
 * Skills under the same six layers as the hero stack. Set as plain type rather
 * than sixty bordered chips: the brighter names are what I am in most days,
 * the dimmer ones I reach for when the job calls for them.
 */

type Group = {
  layer: string
  note: string
  core: string[]
  also: string[]
}

const GROUPS: Group[] = [
  {
    layer: "Security & Compliance",
    note: "Access, detection, audits",
    core: ["Zero Trust", "Okta MFA / SSO", "Conditional Access", "Microsoft Defender"],
    also: ["Sentinel", "CrowdStrike", "Splunk", "GDPR / ISO 27001"],
  },
  {
    layer: "DevSecOps & Automation",
    note: "The repetitive parts, as code",
    core: ["PowerShell", "Python", "Power Automate", "Git"],
    also: ["Terraform", "Ansible", "GitHub Actions", "Bash"],
  },
  {
    layer: "Cloud",
    note: "Where the estate lives",
    core: ["Microsoft Azure", "Microsoft 365", "Azure Virtual Desktop"],
    also: ["AWS", "Hyper-V", "Docker", "Kubernetes"],
  },
  {
    layer: "Network",
    note: "Routing, segmentation, perimeter",
    core: ["TCP/IP · VLAN", "DNS / DHCP", "VPN"],
    also: ["pfSense", "Fortinet", "Cisco Meraki", "Wireshark"],
  },
  {
    layer: "Servers & Infrastructure",
    note: "Identity, hosts, backups",
    core: ["Active Directory", "Entra ID", "Windows Server", "Group Policy"],
    also: ["VMware ESXi", "Linux / RHEL", "Exchange Online", "Veeam"],
  },
  {
    layer: "Endpoints & Support",
    note: "The machines people use",
    core: ["Microsoft Intune", "Autopilot", "ServiceNow", "ITIL"],
    also: ["Jamf Pro", "macOS", "Jira Service Mgmt", "Zendesk"],
  },
]

export function SkillsHex() {
  return (
    <div className="section-body measure-wide">
      <p className="mb-7 text-[13px]" style={{ color: "var(--text-muted)" }}>
        Brighter names are the ones in my hands most days.
      </p>

      {/* The six layers carry the hero's own L6→L1 index, so the stack up
          there and the list down here are visibly the same six things. */}
      <div className="card overflow-hidden">
        {GROUPS.map((g, i) => (
          <div
            key={g.layer}
            className="grid grid-cols-1 gap-2 px-5 py-6 sm:grid-cols-[32px_230px_1fr] sm:gap-6 sm:px-7"
            style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
          >
            <span className="num hidden pt-[3px] text-[11px] sm:block" style={{ color: "var(--text-muted)" }}>
              L{GROUPS.length - i}
            </span>

            <div>
              <h3 className="font-medium" style={{ fontSize: 15.5, color: "var(--text)" }}>
                {g.layer}
              </h3>
              <p className="mt-1 text-[12.5px]" style={{ color: "var(--text-muted)" }}>
                {g.note}
              </p>
            </div>

            <p style={{ fontSize: 15, lineHeight: 1.9 }}>
              {g.core.map((t, j) => (
                <span key={t}>
                  {j > 0 && <span style={{ color: "var(--border-dark)" }}> · </span>}
                  <span style={{ color: "var(--accent)" }}>{t}</span>
                </span>
              ))}
              <span style={{ color: "var(--border-dark)" }}> · </span>
              {g.also.map((t, j) => (
                <span key={t}>
                  {j > 0 && <span style={{ color: "var(--border-dark)" }}> · </span>}
                  <span style={{ color: "var(--text-muted)" }}>{t}</span>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
