"use client"

import { useState } from "react"

/**
 * The six specializations drawn the way an infrastructure engineer actually
 * draws a system: as a stack, top (policy) to bottom (the device on a desk).
 * Hovering a layer lifts it out of the stack and shows what sits inside it.
 */

type Layer = {
  id: string
  name: string
  tools: string
  metric: string
}

const LAYERS: Layer[] = [
  {
    id: "security",
    name: "Security & Compliance",
    tools: "Zero Trust · Sentinel · Defender · CrowdStrike · Okta",
    metric: "99.2% threat detection",
  },
  {
    id: "devsecops",
    name: "DevSecOps & Automation",
    tools: "CI/CD · Terraform · Ansible · PowerShell · Python",
    metric: "25 hrs/week of manual work removed",
  },
  {
    id: "cloud",
    name: "Cloud",
    tools: "Azure · AWS · GCP · Kubernetes · Docker",
    metric: "99.7% uptime",
  },
  {
    id: "network",
    name: "Network",
    tools: "Cisco · Meraki · pfSense · Fortinet · VLAN · VPN",
    metric: "80% drop in unauthorized access",
  },
  {
    id: "servers",
    name: "Servers & Infrastructure",
    tools: "VMware ESXi · Windows Server · Active Directory · Veeam",
    metric: "12 locations, zero incidents",
  },
  {
    id: "endpoints",
    name: "Endpoints & Support",
    tools: "Intune · Jamf Pro · Autopilot · ServiceNow · ITIL",
    metric: "500+ devices · 94% SLA",
  },
]

export function StackDiagram() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="w-full">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <span className="eyebrow">
          What I run
        </span>
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          top to bottom
        </span>
      </div>

      {/* Perspective only kicks in on wide screens, so small screens stay flat and legible */}
      <div className="lg:[transform:perspective(1400px)_rotateY(-8deg)_rotateX(1deg)] lg:[transform-style:preserve-3d]">
        {LAYERS.map((layer, i) => {
          const on = active === layer.id
          const dimmed = active !== null && !on
          return (
            <div
              key={layer.id}
              onMouseEnter={() => setActive(layer.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(layer.id)}
              onBlur={() => setActive(null)}
              // Touch has no hover, so a tap toggles the layer open instead.
              onClick={() => setActive((cur) => (cur === layer.id ? null : layer.id))}
              role="button"
              aria-expanded={on}
              tabIndex={0}
              className="group relative mb-[6px] cursor-pointer rounded-lg outline-none transition-all duration-300"
              style={{
                background: on ? "rgb(var(--accent-rgb) / 0.08)" : "var(--card-bg)",
                border: `1px solid ${on ? "rgb(var(--accent-rgb) / 0.45)" : "var(--border)"}`,
                transform: on ? "translateX(10px)" : "none",
                opacity: dimmed ? 0.45 : 1,
                // fake slab thickness so the layers read as a physical stack
                boxShadow: on
                  ? "0 6px 18px rgba(0,0,0,0.45), 0 2px 0 0 rgb(var(--accent-rgb) / 0.25)"
                  : "0 2px 0 0 rgba(255,255,255,0.03)",
              }}
            >
              {/* Accent spine */}
              <span
                className="absolute left-0 top-0 h-full w-[3px] rounded-l-lg transition-colors duration-300"
                style={{ background: on ? "var(--accent)" : "var(--border-dark)" }}
              />

              <div className="py-3.5 pl-5 pr-4">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[14.5px] font-medium transition-colors duration-200"
                    style={{ color: on ? "var(--accent)" : "var(--text)" }}
                  >
                    {layer.name}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums" style={{ color: "var(--border-dark)" }}>
                    L{LAYERS.length - i}
                  </span>
                </div>

                {/* Detail reveals on hover; height animates so the stack breathes */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: on ? 60 : 0, opacity: on ? 1 : 0 }}
                >
                  <div className="pt-2 text-[12.5px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {layer.tools}
                  </div>
                  <div className="pt-1 text-[12.5px] font-medium" style={{ color: "var(--accent)" }}>
                    {layer.metric}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-[12.5px]" style={{ color: "var(--text-muted)" }}>
        Open a layer to see what sits inside it. I have worked every one of these.
      </p>
    </div>
  )
}
