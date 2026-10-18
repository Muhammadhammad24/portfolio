"use client"

import { Globe, type Marker } from "./globe"

/**
 * The route from Karachi to Göttingen on a real globe: both cities sit at
 * their true coordinates and the line between them is the actual great
 * circle, which is why it bows north rather than running straight across.
 */

const KARACHI = { lat: 24.8607, lon: 67.0011 }
const GOTTINGEN = { lat: 51.5413, lon: 9.9158 }

const MARKERS: Marker[] = [
  { label: "Karachi, Pakistan", ...KARACHI, kind: "origin" },
  { label: "Göttingen, Germany", ...GOTTINGEN, kind: "home" },
]

const FACTS = [
  { k: "Distance", v: "5,617 km" },
  { k: "Karachi", v: "24.86°N 67.00°E" },
  { k: "Göttingen", v: "51.54°N 9.92°E" },
  { k: "Elapsed", v: "2019 → now" },
]

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
    place: "Karachi, Pakistan",
    title: "B.Sc (Hons) Computational Mathematics",
    line: "University of Karachi. Networks and databases were the parts that stuck.",
  },
  {
    year: "2019",
    place: "Karachi, Pakistan",
    title: "First job: IT Engineer",
    line: "The Active Solutions. Helpdesk, servers, SQL databases. I learned that every ticket is a person who cannot work.",
  },
  {
    year: "2020",
    place: "Karachi, Pakistan",
    title: "Running the helpdesk",
    line: "Target Logistics. Firewalls, VPNs and Active Directory across departments, and a 40% faster resolution time.",
  },
  {
    year: "2021",
    place: "Karachi, Pakistan",
    title: "265 government endpoints",
    line: "KTDMC. Intune at scale, 100% patch compliance, provisioning cut from two hours to twenty minutes.",
  },
  {
    year: "2022",
    place: "Karachi, Pakistan",
    title: "Multi-site infrastructure",
    line: "Liberty Books. Windows, Linux and macOS across locations, plus the ticketing workflows behind them.",
  },
  {
    year: "2023",
    place: "Göttingen, Germany",
    title: "Moved 5,617 km",
    line: "Started the M.Sc. in Göttingen and took on cloud and on-prem infrastructure for TestSolutions, on contract out of Frankfurt.",
  },
  {
    year: "2024",
    place: "Göttingen, Germany",
    title: "DevOps at the university",
    line: "A six-month internship in scientific computing, April to September: ML infrastructure, scanning in the pipeline, deployments down from four hours to thirty-five minutes.",
  },
  {
    year: "Now",
    place: "Germany",
    title: "Securing the estate",
    line: "Kontinental Establishment since January 2025: AWS and Azure hardened, firewalls and IDS/IPS watched, endpoint detection everywhere, and backups that have been restored from.",
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
      {/* ── The route, on the planet it was actually walked across ── */}
      <div
        className="card overflow-hidden"
      >
        <div className="grid grid-cols-1 items-center gap-2 p-5 sm:p-7 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Globe */}
          <div className="relative">
            <Globe markers={MARKERS} className="mx-auto" />
            <p className="mt-1 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
              Drag to spin<span className="hidden sm:inline"> · hover to hold</span>
            </p>
          </div>

          {/* The numbers beside it, on their own left edge */}
          <div>
            <span className="eyebrow">Karachi → Göttingen</span>
            <h3 className="mt-3 font-semibold" style={{ fontSize: 26, lineHeight: 1.2, color: "var(--text)" }}>
              One career, carried 5,617 km
            </h3>
            <p className="mt-3 text-sm" style={{ lineHeight: 1.7, color: "var(--text-dim)" }}>
              Seven years that started on a helpdesk in Karachi and now run cloud
              infrastructure out of Germany. Same job, longer reach.
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
              {FACTS.map((f) => (
                <div key={f.k}>
                  <dt className="text-[13px] uppercase" style={{ letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-[15px] tabular-nums" style={{ color: "var(--text)" }}>
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Step by step ── */}
      <div className="relative">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[46px]"
          style={{ background: "var(--border-dark)" }}
        />

        <div className="space-y-7">
          {STEPS.map((s, i) => (
            <div
              key={s.year + s.title}
              className="relative pl-7 sm:pl-24"
            >
              {/* Year, on the rail */}
              <span
                className="absolute left-0 top-0 hidden w-[38px] text-right text-[14px] tabular-nums sm:block"
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
                  <span className="text-[14px] tabular-nums sm:hidden" style={{ color: "var(--text-muted)" }}>
                    {s.year}
                  </span>
                  <h3 className="font-medium" style={{ fontSize: 16, color: "var(--text)" }}>
                    {s.title}
                  </h3>
                  {s.place && (
                    <span className="text-[13.5px]" style={{ color: "var(--text-muted)" }}>
                      {s.place}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 max-w-2xl text-sm" style={{ lineHeight: 1.65, color: "var(--text-dim)" }}>
                  {s.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
