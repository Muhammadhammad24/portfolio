"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    title: "IT Support & Administration Specialist",
    company: "Kontinental Establishment",
    location: "New York, USA (Remote)",
    period: "Apr 2023 – Present",
    highlights: [
      "Managed cloud infrastructure across Azure, AWS & GCP with Docker/Kubernetes & Terraform/Ansible — deployment time 6h → 90min",
      "Deployed Azure Virtual Desktop for 180+ remote employees across 12 international locations",
      "Zero Trust security via CrowdStrike, Okta MFA/SSO, Splunk SIEM, Palo Alto Prisma — 99.2% threat detection accuracy",
      "Reduced incident response from 4 hours → 45 minutes via AI-driven automation & predictive analytics",
      "Managed $2.3M+ infrastructure with PowerShell, Python, ServiceNow ITSM — saving 25 hours/week manual work",
      "190+ endpoints via Intune, Autopilot, Jamf Pro — device setup time cut by 75% (3h → 25min)",
      "99.7% uptime & 100% SLA compliance with Datadog, New Relic, Veeam/Azure/AWS Backup",
    ],
  },
  {
    title: "IT Support Specialist",
    company: "Liberty Books (Pvt.) Ltd",
    location: "Karachi, Pakistan",
    period: "Jun 2022 – Oct 2022",
    highlights: [
      "Managed 520+ Windows 10/11 workstations across 18 countries via SCCM, MDT, VMware Workspace ONE UEM",
      "Deployed M365, Google Workspace, Zoom Enterprise for 520+ users — 90% adoption, 43% productivity improvement",
      "ITSM via Freshservice, Jira SM, Zendesk — 1,200+ monthly tickets at 94% resolution rate, 15-min response",
      "140+ training sessions, 150+ documentation articles — reduced repeat tickets by 35%",
      "GDPR/HIPAA compliance for $3.2M asset portfolio — 100% compliance & 85% tracking accuracy",
    ],
  },
  {
    title: "IT Support and Administration Specialist",
    company: "KTDMC",
    location: "Karachi, Pakistan",
    period: "Oct 2021 – May 2022",
    highlights: [
      "VMware vSphere/ESXi + Hyper-V infrastructure for 265+ government endpoints — 100% patch compliance via WSUS",
      "Cisco/Juniper, pfSense/SonicWall/Fortinet firewalls, VPN — cut unauthorized access by 80%",
      "99.8% uptime with PRTG, SolarWinds, Wireshark across 50+ devices",
      "Protected $1.2M+ government data via Veeam, Acronis — 4-hour RTO, 100% backup success",
      "Hybrid identity (AD, Azure AD, Group Policy) for 265+ accounts — provisioning cut from 2h → 20min",
    ],
  },
  {
    title: "IT Support Specialist",
    company: "Target Logistics International (Pvt.) Ltd",
    location: "Karachi, Pakistan",
    period: "Jul 2020 – Sep 2021",
    highlights: [
      "ManageEngine ServiceDesk — 285+ monthly tickets, 92% satisfaction, resolution time 6h → 2.5h",
      "Coordinated $420K+ hardware lifecycle, extending hardware lifespan by 30%",
      "Veeam/Acronis backup for 25+ critical servers — 100% backup success across 3 locations",
      "Boosted network performance by 25% via SolarWinds NPM, DHCP/DNS management",
    ],
  },
  {
    title: "IT Support Engineer",
    company: "The Active Solutions",
    location: "Karachi, Pakistan",
    period: "Apr 2019 – Feb 2020",
    highlights: [
      "L1/L2/L3 support for 125+ Windows 10 workstations — 96% user satisfaction",
      "VMware vSphere infrastructure with AD, Group Policy — 15% system performance improvement",
      "50+ technical procedures developed — training time reduced by 40%",
    ],
  },
]

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,255,65,0.2), transparent)' }} />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-14 md:pl-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            {/* Dot */}
            <div className="absolute left-2.5 md:left-6 top-6">
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ border: '2px solid #00ff41', background: '#050a05', boxShadow: '0 0 8px rgba(0,255,65,0.5)' }}
                whileInView={{ scale: [0, 1.4, 1] }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              />
            </div>

            <div
              className="relative overflow-visible rounded-2xl bracket-card transition-all duration-300 p-5 group"
              style={{ background: 'rgba(0,255,65,0.02)', border: '1px solid rgba(0,255,65,0.1)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.2), transparent)' }} />
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: 'inset 0 0 30px rgba(0,255,65,0.03)' }} />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-['Syne'] text-lg font-bold leading-tight" style={{ color: '#e8ffe8' }}>
                    {exp.title}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(0,255,65,0.6)' }}>
                    {exp.company}
                    <span style={{ color: 'rgba(0,255,65,0.3)' }}> · </span>
                    <span style={{ color: 'rgba(232,255,232,0.4)' }}>{exp.location}</span>
                  </p>
                </div>
                <span
                  className="font-['JetBrains_Mono'] text-[10px] tracking-wider whitespace-nowrap h-fit px-2 py-1 rounded-sm"
                  style={{ color: '#00ff41', border: '1px solid rgba(0,255,65,0.2)', background: 'rgba(0,255,65,0.05)' }}
                >
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-1.5">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'rgba(232,255,232,0.5)' }}>
                    <span className="shrink-0 mt-0.5 font-['JetBrains_Mono'] text-xs" style={{ color: '#00ff41' }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
