"use client"

import { useState } from "react"
import { ArrowUpRight, BadgeCheck } from "lucide-react"
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
    covers: "Directory services, cloud and on-prem infrastructure, backup and recovery, and server administration at scale.",
    verify: "https://coursera.org/verify/29N5ZLK6BVWW",
  },
  {
    short: "Full Stack Developer",
    name: "Full Stack Software Developer Assessment",
    issuer: "IBM · Coursera",
    year: 2023,
    area: "Software",
    covers: "Front-end and back-end development, APIs, containers and cloud deployment, assessed end to end.",
    verify: "https://coursera.org/verify/74NSF2JALFZV",
  },
  {
    short: "Computer Networks",
    name: "Discovering Computer Networks: hands-on in the Open Networking Lab",
    issuer: "The Open University",
    year: 2023,
    area: "Networking",
    covers: "Building and troubleshooting networks hands-on: addressing, routing, switching and services.",
  },
  {
    short: "Successful IT Systems",
    name: "Successful IT Systems",
    issuer: "The Open University",
    year: 2023,
    area: "IT Strategy",
    covers: "Why IT systems succeed or fail: requirements, stakeholders, delivery and operation.",
  },
  {
    short: "Information Security",
    name: "Information Security Basics for IT Support Technicians",
    issuer: "Udemy",
    year: 2022,
    area: "Security",
    covers: "Threats, access control and security practice for people who run IT support.",
  },
]

/** Certifications as a honeycomb, matching the skills section. */
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
    <div className="mt-10 max-w-4xl mx-auto">
      <HexGallery items={items} activeId={String(active)} onSelect={(id) => setActive(Number(id))} label="Certifications" />

      <div
        role="tabpanel"
        key={active}
        className="orbit-fade mt-12 mx-auto max-w-2xl p-6 sm:p-7"
        style={{ background: "var(--card-bg)", border: "1px solid rgba(177,235,33,0.25)", borderRadius: "var(--radius-lg)" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(177,235,33,0.08)", border: "1px solid rgba(177,235,33,0.25)" }}
          >
            <BadgeCheck className="h-5 w-5" style={{ color: "var(--lime)" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--lime)" }}>
              {c.area} · {c.year}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold leading-snug" style={{ color: "#ffffff", fontFamily: "Inter, sans-serif" }}>
              {c.name}
            </h3>
            <p className="mt-1 font-['JetBrains_Mono'] text-xs" style={{ color: "var(--text-muted)" }}>
              {c.issuer}
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {c.covers}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {c.verify ? "Publicly verifiable" : "Certificate on file"}
          </span>
          {c.verify && (
            <a
              href={c.verify}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs font-medium uppercase tracking-wider transition-transform hover:scale-105"
              style={{ color: "var(--lime)" }}
            >
              Verify <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
