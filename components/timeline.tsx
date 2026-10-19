"use client"


const experiences = [
  {
    title: "IT Engineer",
    company: "Kontinental Establishment",
    location: "Germany / United States · Hybrid",
    period: "Jan 2025 – Present",
    duration: "1 yr 10 mo",
    shortPeriod: "2025–Now",
    current: true,
    type: "Full-time",
    highlights: [
      "Partnered with IT, DevOps, and network teams to build security solutions aligned with business needs.",
      "Secured AWS and Azure cloud with encryption, access controls, and hardened configurations.",
      "Deployed antivirus and endpoint detection to protect all devices on the network.",
      "Configured and monitored firewalls, VPNs, and IDS/IPS to block external threats.",
      "Ensured compliance with industry standards and data protection regulations through regular audits.",
      "Implemented backup and disaster recovery strategies to guarantee business continuity.",
    ],
  },
  {
    title: "IT Engineer",
    company: "TestSolutions GmbH",
    location: "Frankfurt, Hesse, Germany · Hybrid",
    period: "Feb 2023 – Dec 2024",
    duration: "1 yr 11 mo",
    shortPeriod: "2023–24",
    current: false,
    type: "Contract",
    highlights: [
      "Managed cloud (Azure, AWS) and on-prem infrastructure for 180+ employees across 12 global locations with zero unauthorized access incidents.",
      "Automated onboarding, provisioning, and patching (Power Automate, PowerShell, Python), eliminating 25 hrs/week of manual work across a $2.3M+ SaaS stack.",
      "Cut device setup time by 75% by deploying 180+ macOS, Windows, and iOS endpoints via Intune, Jamf Pro, and Autopilot.",
      "Reduced manual ticket triaging by 40% with Jira Service Management automation and Slack-based routing.",
      "Enforced RBAC, MFA, and GDPR/ISO 27001-aligned controls, securing identity and access across all global locations.",
    ],
  },
  {
    title: "DevOps Engineer",
    company: "The University of Göttingen",
    location: "Göttingen, Lower Saxony, Germany · On-site",
    period: "Apr 2024 – Sep 2024",
    duration: "6 mo",
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
    location: "Karāchi, Sindh, Pakistan · On-site",
    period: "Jun 2022 – Oct 2022",
    duration: "5 mo",
    shortPeriod: "2022",
    current: false,
    type: "Full-time",
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
    company: "Karachi Tools, Dies & Moulds Centre (KTDMC)",
    location: "Karāchi, Sindh, Pakistan · On-site",
    period: "Oct 2021 – May 2022",
    duration: "8 mo",
    shortPeriod: "2021–22",
    current: false,
    type: "Full-time",
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
    location: "Karāchi, Sindh, Pakistan · On-site",
    period: "Jul 2020 – Sep 2021",
    duration: "1 yr 3 mo",
    shortPeriod: "2020–21",
    current: false,
    type: "Full-time",
    highlights: [
      "Managed IT infrastructure, network security, and technical support across multiple departments.",
      "Improved ticket resolution and remote support efficiency by 40% by leading IT helpdesk operations.",
      "Installed, configured, and maintained Windows systems and enterprise applications.",
      "Managed firewalls, VPNs, and network infrastructure (DNS, DHCP, Wi-Fi optimization) for seamless connectivity.",
      "Administered Active Directory accounts, group policies, and security permissions in line with security standards.",
      "Implemented GDPR-aligned security policies with endpoint protection and multi-factor authentication (MFA).",
      "Deployed data backup and disaster recovery strategies, minimizing downtime and ensuring business continuity.",
    ],
  },
  {
    title: "IT Engineer",
    company: "The Active Solutions",
    location: "Karāchi, Sindh, Pakistan · On-site",
    period: "Apr 2019 – Mar 2020",
    duration: "1 yr",
    shortPeriod: "2019–20",
    current: false,
    type: "Full-time",
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

/*
  ── One role, on the same left edge as everything else ──

  These used to hang off a rail: a vertical line down the left and a marker
  dot per role, with every card pushed 56px clear of it. It read fine on its
  own and wrong on the page, because nothing else in the portfolio starts
  there. Every other box — the figure above these, the project cards, the
  certificates, the two contact panels — begins at the container's own left
  edge, so these were the one column that did not line up with the heading
  sitting above them.

  The rail is gone and the cards sit flush with the rest. The role being
  current is still marked, but from inside the card: an accent edge down its
  left side, the same device the hero uses to call out what comes next. One
  margin, top to bottom of the page.
*/
function TimelineEntry({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <div
      className="card p-5 pl-6"
      style={
        exp.current
          ? { borderLeft: "2px solid var(--accent)" }
          : undefined
      }
    >
      <div className="mb-4">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold" style={{ color: "var(--text)" }}>
                  {exp.title}
                </h3>
                {exp.type && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[13px] font-medium"
                    style={{ color: "var(--accent)", border: "1px solid rgb(var(--accent-rgb) / 0.3)" }}
                  >
                    {exp.type}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--accent)" }}>
                {exp.company}
                <span style={{ color: "var(--text-muted)" }}> · {exp.location}</span>
              </p>
            </div>
              <span className="shrink-0 text-[14px] whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                {exp.period}
                {exp.duration && <span style={{ color: "var(--text-muted)", opacity: 0.65 }}> · {exp.duration}</span>}
              </span>
          </div>
        </div>

        <ul className="space-y-2">
          {exp.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm leading-relaxed"
              style={{ color: "var(--text-dim)" }}
            >
              <span
                className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export function Timeline() {
  return (
    <div className="measure-wide">
      <div className="space-y-5">
        {experiences.map((exp) => (
          <TimelineEntry key={exp.company} exp={exp} />
        ))}
      </div>
    </div>
  )
}
