"use client"

import { motion } from "framer-motion"

/**
 * A status page, but the service being monitored is a career.
 * Every number here is from real work history — the bars are a visual
 * texture, deterministic so server and client render identically.
 */

type Service = {
  name: string
  detail: string
  value: string
}

const SERVICES: Service[] = [
  { name: "Identity & Access", detail: "Active Directory · Entra ID · Okta", value: "0 breaches" },
  { name: "Cloud Infrastructure", detail: "Azure · AWS · GCP", value: "99.7%" },
  { name: "Network", detail: "Cisco · Meraki · pfSense · Fortinet", value: "99.8%" },
  { name: "Endpoints", detail: "Intune · Jamf Pro · Autopilot", value: "500+" },
  { name: "Security Monitoring", detail: "Sentinel · Defender · CrowdStrike", value: "99.2%" },
]

const BAR_COUNT = 34

// Deterministic pseudo-variation: no Math.random, so SSR and the client agree.
function barHeight(row: number, i: number) {
  const n = (row * 31 + i * 17) % 11
  return 58 + n * 4
}

export function StatusBoard() {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: "var(--accent)" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
            All systems operational
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          from the job
        </span>
      </div>

      {/* Services */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {SERVICES.map((s, row) => (
          <div key={s.name} className="px-5 py-3.5" style={{ borderTop: row === 0 ? "none" : "1px solid var(--border)" }}>
            <div className="mb-2.5 flex items-baseline justify-between gap-3">
              <span className="text-[13.5px] font-medium" style={{ color: "var(--text)" }}>
                {s.name}
              </span>
              <span className="shrink-0 text-[13px] tabular-nums" style={{ color: "var(--accent)" }}>
                {s.value}
              </span>
            </div>

            {/* Uptime strip */}
            <div className="flex items-end gap-[2px]" style={{ height: 14 }} aria-hidden="true">
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{ background: "var(--accent)", opacity: 0.55 }}
                  initial={{ height: "20%" }}
                  whileInView={{ height: `${barHeight(row, i)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: row * 0.05 + i * 0.008, ease: "easeOut" }}
                />
              ))}
            </div>

            <div className="mt-2 text-[12px]" style={{ color: "var(--text-muted)" }}>
              {s.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-elevated)" }}
      >
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          Six years · six employers
        </span>
        <span className="text-[12.5px] font-medium" style={{ color: "var(--text)" }}>
          0 unauthorized access incidents
        </span>
      </div>
    </div>
  )
}
