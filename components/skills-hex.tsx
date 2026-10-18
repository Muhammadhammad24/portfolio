/**
 * The toolbox, drawn with the real marks.
 *
 * Same seven domains and the same logos as the GitHub profile's toolbox panel,
 * exported once from that repository's icon set into `public/brands` with the
 * dark-mode treatment already applied — near-black marks lightened, everything
 * else exactly as the brand publishes it. Keeping both surfaces on one source
 * means a tool is added in one place and looks identical in the other.
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
      { label: "ServiceNow", icon: "servicenow", scale: 2.25 },
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

const TOTAL = DOMAINS.reduce((n, d) => n + d.tools.length, 0)
const BASE = 32

export function SkillsHex() {
  return (
    <div className="section-body measure-wide">
      <div className="card overflow-hidden">
        <div
          className="flex items-baseline justify-between gap-4 px-5 py-4 sm:px-7"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span className="eyebrow">Toolbox</span>
          <span className="mono text-[11px]" style={{ color: "var(--text-muted)" }}>
            {TOTAL} tools · {DOMAINS.length} domains · hands-on
          </span>
        </div>

        {DOMAINS.map((d, i) => (
          <div
            key={d.name}
            className="grid grid-cols-1 gap-5 px-5 py-6 sm:grid-cols-[196px_1fr] sm:gap-6 sm:px-7"
            style={{ borderTop: i === 0 ? "none" : "1px dashed var(--border)" }}
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <div>
                <h3 className="font-medium" style={{ fontSize: 14.5, color: "var(--text)" }}>
                  {d.name}
                </h3>
                <p className="mono mt-1 text-[10.5px]" style={{ color: "var(--text-muted)" }}>
                  {String(d.tools.length).padStart(2, "0")} tools
                </p>
                <p className="mt-1 text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {d.note}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-5">
              {d.tools.map((t) => {
                const size = BASE * (t.scale ?? 1)
                return (
                  <div key={t.label} className="brand w-[78px] shrink-0 text-center">
                    <div className="flex h-11 items-center justify-center">
                      <img
                        src={`/brands/${t.icon}.svg`}
                        alt=""
                        width={size}
                        height={size}
                        loading="lazy"
                        decoding="async"
                        style={{ width: size, height: size, objectFit: "contain" }}
                      />
                    </div>
                    <div
                      className="mono mt-2 text-[9.5px] leading-[1.35]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
