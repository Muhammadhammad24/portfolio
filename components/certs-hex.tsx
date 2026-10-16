"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { HexGallery, type HexItem } from "@/components/hex-gallery"

type Cert = {
  short: string
  name: string
  issuer: string
  year: number
  area: string
  covers: string
  verify?: string
}

const CERTS: Cert[] = [
  {
    short: "SysAdmin & IT Infrastructure",
    name: "System Administration and IT Infrastructure Services",
    issuer: "Google · Coursera",
    year: 2025,
    area: "Infrastructure",
    covers:
      "Directory services, cloud and on-prem servers, backup and recovery. Closest thing on this list to my day job.",
    verify: "https://coursera.org/verify/29N5ZLK6BVWW",
  },
  {
    short: "Full Stack Developer",
    name: "Full Stack Software Developer Assessment",
    issuer: "IBM · Coursera",
    year: 2023,
    area: "Software",
    covers:
      "Front-end, back-end, APIs, containers and cloud deployment, tested end to end rather than just watched.",
    verify: "https://coursera.org/verify/74NSF2JALFZV",
  },
  {
    short: "Computer Networks",
    name: "Discovering Computer Networks: hands on in the Open Networking Lab",
    issuer: "The Open University",
    year: 2023,
    area: "Networking",
    covers:
      "A 24-hour lab course where you actually build and break networks: addressing, routing, switching, services. Passed with all mandatory tests.",
  },
  {
    short: "Successful IT Systems",
    name: "Successful IT Systems",
    issuer: "The Open University",
    year: 2023,
    area: "IT Strategy",
    covers: "Why IT projects succeed or fail. Mostly about people and requirements, not technology.",
  },
  {
    short: "Cyber Security",
    name: "Beginner's Guide to Cyber Security",
    issuer: "Udemy",
    year: 2022,
    area: "Security",
    covers:
      "Attack types and the controls that actually stop them. This is the groundwork I later built on when rolling out Zero Trust and MFA at work.",
  },
  {
    short: "Information Security",
    name: "Information Security Basics for IT Support Technicians",
    issuer: "Udemy",
    year: 2022,
    area: "Security",
    covers: "Security from the support desk side: access control, handling requests, and not being the weak link.",
  },
  {
    short: "Database Development",
    name: "The Database Development Life Cycle",
    issuer: "The Open University",
    year: 2023,
    area: "Databases",
    covers:
      "How database projects differ from normal software delivery. Useful for the SQL Server and PostgreSQL databases I look after.",
  },
  {
    short: "Computer Systems",
    name: "An Introduction to Computers and Computer Systems",
    issuer: "The Open University",
    year: 2023,
    area: "Fundamentals",
    covers: "How computer systems fit together from the hardware up. Short, but it filled a few gaps.",
  },
  {
    short: "Exploring Data",
    name: "Exploring Data: Graphs and Numerical Summaries",
    issuer: "The Open University",
    year: 2023,
    area: "Data",
    covers:
      "Summarising and plotting data properly. The analytics side of my M.Sc. work in Göttingen.",
  },
]

const COURSEWORK = [
  { name: "The Data Science Course 2022: Complete Data Science Bootcamp", issuer: "Udemy", hours: "30 h" },
  { name: "Python: Introduction to Data Science and Machine Learning A-Z", issuer: "Udemy", hours: "7.5 h" },
  { name: "Python for Machine Learning with NumPy, Pandas & Matplotlib", issuer: "Udemy", hours: "7 h" },
  { name: "Complete Python Programming for Beginners", issuer: "Udemy", hours: "11 h" },
  { name: "The Complete React Redux Node Express MySQL Developer Course", issuer: "Udemy", hours: "8 h" },
  { name: "SQL: The Complete Introduction to SQL Programming", issuer: "Udemy", hours: "3.5 h" },
  { name: "R Programming: Data Analysis and Visualisations using R", issuer: "Udemy", hours: "3.5 h" },
  { name: "Data Analytics, Storage, Mining & Visual Big Data Technologies", issuer: "Udemy", hours: "" },
  { name: "Artificial Intelligence and the Future of Work", issuer: "Udemy", hours: "2 h" },
]

export function CertsHex() {
  const [active, setActive] = useState(0)
  const c = CERTS[active]
  const items: HexItem[] = CERTS.map((cert, i) => ({
    id: String(i),
    title: cert.short,
    sub: cert.issuer.split(" · ")[0],
    badge: cert.verify ? "Verified" : String(cert.year),
  }))

  return (
    <div className="section-body measure-wide">
      <HexGallery
        items={items}
        activeId={String(active)}
        onSelect={(id) => setActive(Number(id))}
        label="Certifications"
      />

      {/* Detail for the selected certificate */}
      <div
        role="tabpanel"
        key={active}
        className="card mt-6 p-6"
      >
        <p className="eyebrow">
          {c.area} · {c.year}
        </p>
        <h3 className="mt-2 font-semibold" style={{ fontSize: 18, color: "var(--text)" }}>
          {c.name}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          {c.issuer}
        </p>
        <p className="mt-4 text-sm" style={{ lineHeight: 1.65, color: "var(--text-dim)" }}>
          {c.covers}
        </p>

        {c.verify && (
          <a
            href={c.verify}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Verify credential <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Supporting coursework — present but deliberately understated */}
      <div className="mt-10">
        <h3
          className="mb-4 text-[13px] font-medium uppercase"
          style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
        >
          Additional coursework
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {COURSEWORK.map((w) => (
            <span key={w.name} className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              {w.name}
              <span style={{ color: "var(--border-dark)" }}>
                {" · "}{w.issuer}{w.hours ? ` · ${w.hours}` : ""}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
