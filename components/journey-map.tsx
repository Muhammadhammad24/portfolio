"use client"

import { motion } from "framer-motion"

/**
 * The route from Karachi to Göttingen, plotted on a bare lat/long graticule
 * rather than a drawn coastline: the two cities sit at their true projected
 * coordinates, so the geometry is honest and nothing is decorative invention.
 */

const W = 100
const H = 50

// Equirectangular projection: x = (lon+180)/360, y = (90-lat)/180
const KARACHI = { label: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011 }
const GOTTINGEN = { label: "Göttingen", country: "Germany", lat: 51.5413, lon: 9.9158 }

const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
})

const A = project(KARACHI.lat, KARACHI.lon)
const B = project(GOTTINGEN.lat, GOTTINGEN.lon)

// Arc bowing north, the way a flight path looks on a flat map.
const ARC = `M ${A.x} ${A.y} Q ${(A.x + B.x) / 2} ${Math.min(A.y, B.y) - 9} ${B.x} ${B.y}`

type Step = {
  year: string
  place: string
  title: string
  line: string
  now?: boolean
  next?: boolean
}

const STEPS: Step[] = [
  {
    year: "2016",
    place: "Karachi",
    title: "B.Sc. Computer Science",
    line: "University of Karachi. Networks and databases were the parts that stuck.",
  },
  {
    year: "2019",
    place: "Karachi",
    title: "First job: IT Engineer",
    line: "The Active Solutions. Helpdesk, servers, SQL databases. I learned that every ticket is a person who cannot work.",
  },
  {
    year: "2020",
    place: "Karachi",
    title: "Running the helpdesk",
    line: "Target Logistics. Firewalls, VPNs and Active Directory across departments, and a 40% faster resolution time.",
  },
  {
    year: "2021",
    place: "Karachi",
    title: "265 government endpoints",
    line: "KTDMC. Intune at scale, 100% patch compliance, provisioning cut from two hours to twenty minutes.",
  },
  {
    year: "2022",
    place: "Karachi",
    title: "Multi-site infrastructure",
    line: "Liberty Books. Windows, Linux and macOS across locations, plus the ticketing workflows behind them.",
  },
  {
    year: "2023",
    place: "Göttingen",
    title: "Moved 5,617 km",
    line: "Started the M.Sc. in Göttingen and took on cloud and on-prem infrastructure at Kontinental Establishment.",
  },
  {
    year: "2024",
    place: "Göttingen",
    title: "DevSecOps at the university",
    line: "Scientific computing: ML infrastructure, scanning in the pipeline, deployments down from four hours to thirty-five minutes.",
  },
  {
    year: "Now",
    place: "Germany",
    title: "180 people, 12 countries",
    line: "Azure and AWS, 500+ endpoints, Zero Trust access, and 25 hours a week of manual work automated away.",
    now: true,
  },
  {
    year: "Next",
    place: "",
    title: "Where this is going",
    line: "The two things I already build in public: infrastructure defined entirely in code, and AI that answers first-line support before a human has to.",
    next: true,
  },
]

export function JourneyMap() {
  return (
    <div className="space-y-10">
      {/* ── The route ── */}
      <div
        className="overflow-hidden rounded-2xl px-5 py-6 sm:px-8"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <span
            className="text-[13px] font-medium uppercase"
            style={{ color: "var(--accent)", letterSpacing: "0.12em" }}
          >
            Karachi → Göttingen
          </span>
          <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
            5,617 km · one career, carried across
          </span>
        </div>

        <svg viewBox={`30 0 50 32`} className="w-full" style={{ maxHeight: 260 }} aria-label="Route from Karachi to Göttingen">
          {/* Graticule: every 10° of latitude and longitude */}
          <g stroke="var(--border-dark)" strokeWidth="0.08">
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`v${i}`} x1={(i * 10 * W) / 180} y1="0" x2={(i * 10 * W) / 180} y2={H} />
            ))}
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={(i * 10 * H) / 180} x2={W} y2={(i * 10 * H) / 180} />
            ))}
          </g>

          {/* The route itself */}
          <motion.path
            d={ARC}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.35"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Origin */}
          <circle cx={A.x} cy={A.y} r="0.55" fill="var(--text-muted)" />
          <text x={A.x} y={A.y + 2.4} textAnchor="middle" fontSize="1.5" fill="var(--text-dim)">
            {KARACHI.label}
          </text>
          <text x={A.x} y={A.y + 4.1} textAnchor="middle" fontSize="1.1" fill="var(--text-muted)">
            {KARACHI.lat.toFixed(2)}°N {KARACHI.lon.toFixed(2)}°E
          </text>

          {/* Destination */}
          <circle cx={B.x} cy={B.y} r="1.5" fill="rgba(91,141,239,0.18)" />
          <circle cx={B.x} cy={B.y} r="0.6" fill="var(--accent)" />
          <text x={B.x} y={B.y - 2.6} textAnchor="middle" fontSize="1.5" fill="var(--text)">
            {GOTTINGEN.label}
          </text>
          <text x={B.x} y={B.y - 1.1} textAnchor="middle" fontSize="1.1" fill="var(--text-muted)">
            {GOTTINGEN.lat.toFixed(2)}°N {GOTTINGEN.lon.toFixed(2)}°E
          </text>
        </svg>
      </div>

      {/* ── Step by step ── */}
      <div className="relative">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[46px]"
          style={{ background: "var(--border-dark)" }}
        />

        <div className="space-y-7">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.year + s.title}
              className="relative pl-7 sm:pl-24"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.35, delay: Math.min(i, 4) * 0.04 }}
            >
              {/* Year, on the rail */}
              <span
                className="absolute left-0 top-0 hidden w-[38px] text-right text-[13px] tabular-nums sm:block"
                style={{ color: s.now || s.next ? "var(--accent)" : "var(--text-muted)" }}
              >
                {s.year}
              </span>

              <span
                className="absolute left-[3px] top-[7px] h-2 w-2 rounded-full sm:left-[42px]"
                style={{
                  background: s.now ? "var(--accent)" : "var(--bg-base)",
                  border: `2px solid ${s.now || s.next ? "var(--accent)" : "var(--border-dark)"}`,
                }}
              />

              <div>
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-[13px] tabular-nums sm:hidden" style={{ color: "var(--text-muted)" }}>
                    {s.year}
                  </span>
                  <h3 className="font-medium" style={{ fontSize: 16, color: "var(--text)" }}>
                    {s.title}
                  </h3>
                  {s.place && (
                    <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
                      {s.place}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 max-w-2xl text-sm" style={{ lineHeight: 1.65, color: "var(--text-dim)" }}>
                  {s.line}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
