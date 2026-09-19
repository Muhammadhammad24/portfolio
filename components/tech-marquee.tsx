"use client"

import Image from "next/image"

const ITEMS = [
  { label: "Windows",               icon: "Windows" },
  { label: "Windows Server",        icon: "Windows-Server" },
  { label: "Linux",                 icon: "Linux" },
  { label: "macOS",                 icon: "macOS" },
  { label: "VMware ESXi",           icon: "VMware-ESXi" },
  { label: "VMware vSphere",        icon: "VMware-vSphere" },
  { label: "Active Directory",      icon: "Active-Directory" },
  { label: "Azure AD / Entra ID",   icon: "Azure-AD-Entra-ID" },
  { label: "Exchange Online",       icon: "Exchange-Online" },
  { label: "WSUS",                  icon: "WSUS" },
  { label: "Microsoft Azure",       icon: "Microsoft-Azure" },
  { label: "AWS",                   icon: "AWS" },
  { label: "Google Cloud Platform", icon: "Google-Cloud-Platform" },
  { label: "Docker",                icon: "Docker" },
  { label: "Kubernetes",            icon: "Kubernetes" },
  { label: "Hyper-V",               icon: "Hyper-V" },
  { label: "VirtualBox",            icon: "VirtualBox" },
  { label: "Terraform",             icon: "Terraform" },
  { label: "Ansible",               icon: "Ansible" },
  { label: "CrowdStrike",           icon: "CrowdStrike" },
  { label: "Microsoft Sentinel",    icon: "Microsoft-Sentinel" },
  { label: "OKTA",                  icon: "OKTA" },
  { label: "Microsoft Defender",    icon: "Microsoft-Defender" },
  { label: "Conditional Access",    icon: "Conditional-Access" },
  { label: "Microsoft Intune",      icon: "Microsoft-Intune" },
  { label: "Cisco",                 icon: "Cisco" },
  { label: "Cisco Meraki",          icon: "Cisco-Meraki" },
  { label: "pfSense",               icon: "pfSense" },
  { label: "Fortinet",              icon: "Fortinet" },
  { label: "PowerShell",            icon: "PowerShell" },
  { label: "Python",                icon: "Python" },
  { label: "Bash",                  icon: "Bash" },
  { label: "Power Automate",        icon: "Power-Automate" },
  { label: "ServiceNow",            icon: "ServiceNow" },
  { label: "Jira Service Mgmt",     icon: "Jira-Service-Management" },
  { label: "Zendesk",               icon: "Zendesk" },
  { label: "Freshservice",          icon: "Freshservice" },
  { label: "Jamf Pro",              icon: "Jamf-Pro" },
  { label: "Kandji",                icon: "Kandji" },
  { label: "Apple Business Mgr",    icon: "Apple-Business-Manager" },
  { label: "MDT",                   icon: "MDT" },
  { label: "SCCM",                  icon: "SCCM" },
  { label: "Windows Autopilot",     icon: "Windows-Autopilot" },
  { label: "Microsoft Teams",       icon: "Microsoft-Teams" },
  { label: "SharePoint",            icon: "SharePoint" },
  { label: "OneDrive",              icon: "OneDrive" },
  { label: "Outlook",               icon: "Outlook" },
  { label: "Google Workspace",      icon: "Google-Workspace" },
  { label: "Zoom",                  icon: "Zoom" },
  { label: "Slack",                 icon: "Slack" },
  { label: "Confluence",            icon: "Confluence" },
  { label: "GitHub",                icon: "GitHub" },
  { label: "GitHub Actions",        icon: "GitHub-Actions" },
  { label: "GitLab",                icon: "GitLab" },
  { label: "Jenkins",               icon: "Jenkins" },
  { label: "ArgoCD",                icon: "ArgoCD" },
  { label: "Helm",                  icon: "Helm" },
  { label: "Prometheus",            icon: "Prometheus" },
  { label: "Grafana",               icon: "Grafana" },
  { label: "Azure Monitor",         icon: "Azure-Monitor" },
  { label: "AWS CloudWatch",        icon: "AWS-CloudWatch" },
  { label: "Pulumi",                icon: "Pulumi" },
  { label: "DLP",                   icon: "DLP" },
  { label: "PagerDuty",             icon: "PagerDuty" },
  { label: "Amazon EKS",            icon: "Amazon-EKS" },
  { label: "Azure AKS",             icon: "Azure-AKS" },
  { label: "Google GKE",            icon: "Google-GKE" },
  { label: "Azure CLI",             icon: "Azure-CLI" },
  { label: "Microsoft Graph API",   icon: "Microsoft-Graph-API" },
  { label: "VMware Workspace ONE",  icon: "VMware-Workspace-ONE" },
]

export function TechMarquee() {
  return (
    <div
      className="overflow-hidden py-3 select-none"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      {/*
        CSS-only seamless loop:
        - Two identical strips side by side, each 100% wide
        - CSS translateX(-50%) over 90s moves the first strip fully off-screen
          while the second strip takes its place — no JS, no state, no re-renders
        - `group` on each item handles hover purely via CSS
        - `will-change: transform` promotes to compositor layer
      */}
      <div
        className="marquee-inner flex items-center whitespace-nowrap"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {/* Two identical strips — duplication stays in markup, not in React state */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1 ? true : undefined}>
            {ITEMS.map((item) => (
              <span
                key={item.label}
                className="group inline-flex items-center cursor-default"
                style={{ padding: "2px 10px", borderRadius: 6, gap: 7 }}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt=""
                  aria-hidden
                  width={15}
                  height={15}
                  style={{
                    objectFit: "contain",
                    flexShrink: 0,
                    filter: "var(--icon-filter)",
                  }}
                />
                <span
                  className="font-['JetBrains_Mono'] uppercase whitespace-nowrap transition-colors duration-150"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "var(--accent-mid)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginLeft: 8,
                    background: "var(--border)",
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
