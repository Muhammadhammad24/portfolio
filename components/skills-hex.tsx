"use client"

import { useEffect, useRef, useState } from "react"

/**
 * The toolbox, drawn with the real marks.
 *
 * Same seven domains and the same logos as the GitHub profile's toolbox panel,
 * exported once from that repository's icon set into `public/brands` with the
 * dark-mode treatment already applied — near-black marks lightened, everything
 * else exactly as the brand publishes it. Keeping both surfaces on one source
 * means a tool is added in one place and looks identical in the other.
 *
 * A wall of fifty-three logos says nothing except that somebody can make a
 * list. What is actually worth knowing is which of them get picked up
 * together, so the page shows that instead: a real job runs across the
 * toolbox, the four or five tools it genuinely touches light in the order
 * they are reached for, and everything else steps back. Onboarding a starter
 * lights an identity tool, then an endpoint one, then a script, then the
 * ticket it closes — four domains, one task, which is the honest shape of
 * this work and the thing a list can never show.
 *
 * The verb here is a route, not an alarm: nothing turns red and nothing is
 * struck out. The page keeps colour for the incident in the hero, so a path
 * through the estate is drawn the only other way this page draws anything —
 * by what is lit and what is not.
 */

type Tool = {
  label: string
  icon: string
  /** Wordmarks and wide marks sit small in their square, so they are drawn larger. */
  scale?: number
}

type Domain = {
  name: string
  note: string
  tools: Tool[]
}

const DOMAINS: Domain[] = [
  {
    name: "Cloud & virtualisation",
    note: "Where the estate lives",
    tools: [
      { label: "Azure", icon: "dev-azure-original" },
      { label: "AWS", icon: "dev-amazonwebservices-original-wordmark", scale: 1.375 },
      { label: "Google Cloud", icon: "dev-googlecloud-original" },
      { label: "VMware", icon: "vmware", scale: 1.375 },
      { label: "Virtual Desktop", icon: "ms-virtual-desktop" },
      { label: "Docker", icon: "si-docker" },
      { label: "Kubernetes", icon: "dev-kubernetes-original" },
      { label: "Terraform", icon: "terraform" },
    ],
  },
  {
    name: "Operating systems",
    note: "What the workloads run on",
    tools: [
      { label: "Windows", icon: "dev-windows11-original" },
      { label: "Linux", icon: "dev-linux-original" },
      { label: "Ubuntu", icon: "si-ubuntu" },
      { label: "Red Hat", icon: "redhat" },
      { label: "CentOS", icon: "dev-centos-original" },
      { label: "macOS", icon: "dev-apple-original" },
      { label: "iOS", icon: "si-ios" },
      { label: "Android", icon: "si-android" },
    ],
  },
  {
    name: "Identity & endpoints",
    note: "Who gets in, and on what",
    tools: [
      { label: "Entra ID", icon: "ms-entra-id" },
      { label: "Active Directory", icon: "ms-active-directory" },
      { label: "Intune", icon: "ms-intune" },
      { label: "Defender", icon: "ms-defender" },
      { label: "Jamf Pro", icon: "jamf" },
      { label: "Okta", icon: "okta", scale: 1.375 },
      { label: "TeamViewer", icon: "si-teamviewer" },
    ],
  },
  {
    name: "Network & security",
    note: "Routing, segmentation, perimeter",
    tools: [
      { label: "Cisco", icon: "cisco", scale: 1.375 },
      { label: "Juniper", icon: "si-junipernetworks", scale: 1.375 },
      { label: "Fortinet", icon: "si-fortinet" },
      { label: "pfSense", icon: "pfsense" },
      { label: "SonicWall", icon: "si-sonicwall", scale: 1.375 },
      { label: "Palo Alto", icon: "si-paloaltonetworks" },
      { label: "CrowdStrike", icon: "crowdstrike", scale: 1.375 },
    ],
  },
  {
    name: "Automation & delivery",
    note: "The repetitive parts, as code",
    tools: [
      { label: "PowerShell", icon: "dev-powershell-original" },
      { label: "Python", icon: "dev-python-original" },
      { label: "Bash", icon: "bash" },
      { label: "Ansible", icon: "si-ansible" },
      { label: "Chocolatey", icon: "si-chocolatey" },
      { label: "YAML", icon: "si-yaml" },
      { label: "GitHub Actions", icon: "si-githubactions" },
      { label: "Git", icon: "dev-git-original" },
    ],
  },
  {
    name: "Monitoring & backup",
    note: "Knowing, and getting it back",
    tools: [
      { label: "Splunk", icon: "si-splunk", scale: 1.375 },
      { label: "Datadog", icon: "datadog" },
      { label: "New Relic", icon: "si-newrelic" },
      { label: "Grafana", icon: "dev-grafana-original" },
      { label: "Prometheus", icon: "dev-prometheus-original" },
      { label: "Wireshark", icon: "wireshark" },
      { label: "Veeam", icon: "veeam", scale: 1.375 },
    ],
  },
  {
    name: "Service & collaboration",
    note: "How the work reaches people",
    tools: [
      { label: "ServiceNow", icon: "servicenow" },
      { label: "Jira", icon: "dev-jira-original" },
      { label: "Confluence", icon: "confluence" },
      { label: "Zendesk", icon: "si-zendesk" },
      { label: "Microsoft 365", icon: "ms-365" },
      { label: "Google Workspace", icon: "dev-google-original" },
      { label: "Slack", icon: "dev-slack-original" },
      { label: "Zoom", icon: "si-zoom", scale: 1.375 },
    ],
  },
]

/**
 * Real jobs, and the tools each one actually goes through, in the order they
 * are reached for. Every label here has to exist above — the route is only
 * worth drawing if it runs over the same toolbox the page is showing.
 */
const RUNS: { name: string; tools: string[] }[] = [
  { name: "onboard a starter", tools: ["Entra ID", "Intune", "Microsoft 365", "PowerShell", "ServiceNow"] },
  { name: "contain an incident", tools: ["Defender", "CrowdStrike", "Splunk", "Veeam"] },
  { name: "ship a change", tools: ["Git", "GitHub Actions", "Terraform", "Kubernetes"] },
  { name: "stand up an environment", tools: ["Azure", "Terraform", "Docker", "Kubernetes", "Grafana"] },
  { name: "chase a slow network", tools: ["Wireshark", "Cisco", "Fortinet", "Datadog"] },
  { name: "patch the estate", tools: ["Intune", "Chocolatey", "Ansible", "PowerShell"] },
  { name: "rebuild a dead server", tools: ["VMware", "Windows", "Veeam", "Ansible"] },
]

const TOTAL = DOMAINS.reduce((n, d) => n + d.tools.length, 0)
const EASE = "0.5s cubic-bezier(0.4, 0, 0.2, 1)"

export function SkillsHex() {
  /** Which job is running, or -1 for a plain toolbox with nothing lit. */
  const [run, setRun] = useState(-1)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Same clock as the day in the hero: frames rather than timers, so it only
    // runs while somebody is actually being shown it.
    let frame = 0
    let last = performance.now()
    let acc = 0
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = now - last
      last = now
      acc += Math.min(dt, 500)
      if (acc < 3200) return
      acc = 0
      const box = wrap.current?.getBoundingClientRect()
      if (box && (box.bottom < -200 || box.top > window.innerHeight + 200)) return
      setRun((r) => (r + 1) % RUNS.length)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const active = run >= 0 ? RUNS[run] : null
  /** Tool label → where it comes in the job. */
  const order = new Map(active?.tools.map((t, i) => [t, i + 1]))

  return (
    <div
      ref={wrap}
      className="section-body measure-wide"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <span className="eyebrow">By domain</span>
        <span className="mono text-[14px]" style={{ color: "var(--text-muted)" }}>
          <span className="hidden sm:inline">{TOTAL} tools · </span>
          {active ? (
            <span style={{ color: "var(--text-dim)" }}>to {active.name}</span>
          ) : (
            <>{DOMAINS.length} domains · hands-on</>
          )}
        </span>
      </div>

      <div className="space-y-px">
        {DOMAINS.map((d, i) => {
          // A job that never touches this domain lets it sit back, so the
          // crossing from one domain to the next is the thing you notice.
          const used = !active || d.tools.some((t) => order.has(t.label))
          return (
            <div
              key={d.name}
              className="skill-row grid grid-cols-1 gap-5 px-5 py-7 sm:grid-cols-[210px_1fr] sm:gap-8 sm:px-7"
            >
              {/* The domain, numbered the way every other stack on this page is. */}
              <div
                className="flex items-start gap-4"
                style={{ opacity: used ? 1 : 0.4, transition: `opacity ${EASE}` }}
              >
                <span className="num pt-[3px] text-[14px]" style={{ color: "var(--text-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-medium" style={{ fontSize: 15.5, color: "var(--text)" }}>
                    {d.name}
                  </h3>
                  <p className="mt-1 text-[14px]" style={{ lineHeight: 1.6, color: "var(--text-muted)" }}>
                    {d.note}
                  </p>
                </div>
              </div>

              {/* Drawn the way the profile's own toolbox draws them: the mark
                  standing on the page with no tile around it, at that panel's
                  sizes, and the name set small in the page's own type underneath. */}
              <div className="flex flex-wrap items-start gap-x-4 gap-y-6">
                {d.tools.map((t) => {
                  const at = order.get(t.label)
                  const lit = !active || at !== undefined
                  return (
                    <div
                      key={t.label}
                      className="tool-mark relative w-[82px] shrink-0 text-center"
                      style={{ opacity: lit ? 1 : 0.18, transition: `opacity ${EASE}` }}
                    >
                      {/* Where this one comes in the job. */}
                      <span
                        className="mono absolute right-0 top-0 text-[10px]"
                        style={{
                          color: "var(--text-dim)",
                          opacity: at ? 1 : 0,
                          transition: `opacity ${EASE}`,
                        }}
                      >
                        {at ?? ""}
                      </span>
                      <div className="flex h-12 items-center justify-center">
                        <img
                          src={`/brands/${t.icon}.svg`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: 32 * (t.scale ?? 1),
                            height: 32 * (t.scale ?? 1),
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <div
                        className="mt-2 text-[13px] leading-[1.45]"
                        style={{
                          color: at ? "var(--text)" : "var(--text-muted)",
                          transition: `color ${EASE}`,
                        }}
                      >
                        {t.label}
                      </div>
                    </div>
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
