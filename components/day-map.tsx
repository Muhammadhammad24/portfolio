"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A day on the job, not the CV.
 *
 * The old diagram showed the estate; this one shows the person running it —
 * the order a modern infrastructure engineer actually works in, from the
 * first twenty minutes of the morning to the note he leaves for tomorrow.
 * Down the left runs the half of the job that never stops while he does any
 * of it: monitoring, backups, patching, logging.
 *
 * Drawing grammar is the page's own: a box is a thing that happens, a solid
 * line is the day moving forward, a dashed line is something running on its
 * own in the background, a dotted frame is a boundary.
 */

const W = 432
const H = 436

type Hour = {
  id: string
  name: string
  /** The stack this hour is actually spent in, on two readable lines. */
  sub: string
  sub2: string
  /** The one-line result of the hour, shown while it is lit. */
  does: string
  /** Where the block sits on the clock; null for the one that can land anywhere. */
  at: [number, number] | null
}

const DAY: Hour[] = [
  {
    id: "check",
    at: [8, 9],
    name: "Morning check",
    sub: "PRTG · SolarWinds · Datadog",
    sub2: "Defender · patch compliance",
    does: "nothing on fire",
  },
  {
    id: "triage",
    at: [9, 10],
    name: "Triage the queue",
    sub: "ServiceNow · Jira SM · ITIL",
    sub2: "L1–L3 · P1–P4 · change mgmt",
    does: "sorted by impact",
  },
  {
    id: "change",
    at: [10, 12],
    name: "Change window",
    sub: "Group Policy · WSUS · SCCM",
    sub2: "maintenance window · rollback",
    does: "shipped safely",
  },
  {
    id: "build",
    at: [12, 15],
    name: "Build & automate",
    sub: "PowerShell · Python · Ansible",
    sub2: "Terraform · Intune · Autopilot",
    does: "tickets deleted",
  },
  {
    id: "secure",
    at: [15, 16],
    name: "Security & identity",
    sub: "Entra ID · Active Directory · Okta",
    sub2: "MFA/SSO · Zero Trust · GDPR",
    does: "least privilege",
  },
  {
    id: "incident",
    at: null,
    name: "Incident",
    sub: "Defender · CrowdStrike · Splunk",
    sub2: "isolate · revoke · Veeam restore",
    does: "contained first",
  },
  {
    id: "close",
    at: [17, 18],
    name: "Close the loop",
    sub: "Confluence · runbooks · postmortem",
    sub2: "M365 · Teams · asset records",
    does: "written down",
  },
]

/** The half of the job that runs while he is doing all of the above. */
const ALWAYS = [
  { name: "Monitor", sub: "PRTG · SolarWinds" },
  { name: "Backup", sub: "Veeam · Acronis" },
  { name: "Patch", sub: "WSUS · Intune" },
  { name: "Logs", sub: "Splunk SIEM" },
]

const NODE_X = 152
const NODE_W = 272
const NODE_H = 44
const GAP = 8
const TOP = 10
const nodeY = (i: number) => TOP + i * (NODE_H + GAP)

const CTL_X = 4
const CTL_W = 106
const CTL_H = 48
const ctlY = (i: number) => TOP + 44 + i * (CTL_H + 40)

/** The clock the day is laid against: one working day, 06:00 to 20:00. */
const R_X0 = CTL_X
const R_X1 = W - 4
const R_FROM = 6
const R_TO = 20
const RULE_Y = 412
const rx = (h: number) => R_X0 + ((h - R_FROM) / (R_TO - R_FROM)) * (R_X1 - R_X0)
const EASE = "0.5s cubic-bezier(0.5, 0, 0.3, 1)"

export function DayMap() {
  const [hour, setHour] = useState(0)
  const [pinned, setPinned] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  /** True once the day has been held by a pointer at least once. */
  const resumed = useRef(false)

  useEffect(() => {
    if (pinned) {
      resumed.current = true
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Driven by frames rather than a timer: it only moves while somebody is
    // actually being shown the page, and never jumps several hours at once
    // after a spell in a background tab.
    let frame = 0
    let last = performance.now()
    // Start the accumulator part-way so a release from hover carries straight
    // on instead of sitting still for a full beat first.
    let acc = resumed.current ? 2400 : 0
    resumed.current = false
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = now - last
      last = now
      acc += Math.min(dt, 500)
      if (acc < 1900) return
      acc = 0
      const box = wrap.current?.getBoundingClientRect()
      if (box && (box.bottom < -400 || box.top > window.innerHeight + 400)) return
      setHour((h) => (h + 1) % DAY.length)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [pinned])

  const H_ = DAY[hour]

  return (
    <div
      ref={wrap}
      className="w-full"
      onMouseLeave={() => setPinned(false)}
      onPointerLeave={() => setPinned(false)}
      onBlur={() => setPinned(false)}
    >
      <div className="mb-4">
        <span className="eyebrow">A day on the job</span>
      </div>

      <div className="relative">
        <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full"
        // On a short window the whole day scales down rather than running off
        // the bottom of the first screen.
        // Whatever the window leaves after the heading, the label row and the
        // paragraph below is what the day gets — so it is as large as it can be
        // without ever running off the first screen.
        style={{ maxHeight: "min(calc(100vh - 250px), 660px)" }}
        role="img"
        aria-label="The work in order: morning checks, ticket triage, a change window, automation work, security and identity, an incident if one comes, and closing the loop — with monitoring, backup, patching and logging running underneath all of it."
      >
        <defs>
          <marker id="dm-head" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto">
            <path d="M0 0 L5 2.5 L0 5 z" fill="rgba(255,255,255,0.32)" />
          </marker>
          <filter id="dm-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Always running ── */}
        <rect
          x={CTL_X - 4}
          y={TOP + 4}
          width={CTL_W + 16}
          height={ctlY(ALWAYS.length - 1) + CTL_H - TOP + 6}
          rx="9"
          fill="rgba(255,255,255,0.012)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text x={CTL_X + 2} y={TOP + 17} fontSize="10.5" fill="var(--text-muted)" letterSpacing="0.08em">
          ALWAYS RUNNING
        </text>
        <text x={CTL_X + 2} y={TOP + 30} fontSize="10.5" fill="rgba(255,255,255,0.28)">
          underneath every hour
        </text>

        {ALWAYS.map((c, i) => (
          <g key={c.name}>
            <rect
              x={CTL_X}
              y={ctlY(i)}
              width={CTL_W}
              height={CTL_H}
              rx="7"
              fill="rgba(255,255,255,0.022)"
              stroke="rgba(255,255,255,0.14)"
            />
            <text x={CTL_X + 9} y={ctlY(i) + 20} fontSize="12.5" fontWeight="500" fill="var(--text)">
              {c.name}
            </text>
            <text x={CTL_X + 9} y={ctlY(i) + 36} fontSize="10.5" fill="var(--text-muted)">
              {c.sub}
            </text>
            {/* Dashed: it happens on its own, underneath the day. */}
            <path
              d={`M${CTL_X + CTL_W} ${ctlY(i) + CTL_H / 2} H${NODE_X - 16}`}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              strokeDasharray="3 3"
              markerEnd="url(#dm-head)"
            />
          </g>
        ))}

        {/* ── The rail the day runs down ── */}
        <path
          d={`M${NODE_X - 11} ${nodeY(0) + NODE_H / 2} V${nodeY(DAY.length - 1) + NODE_H / 2}`}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          fill="none"
        />

        {DAY.map((n, i) => {
          const y = nodeY(i)
          const live = hour === i
          const incident = n.id === "incident"
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.name}: ${n.sub}, ${n.sub2}`}
              className="dm-hour"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => {
                setHour(i)
                setPinned(true)
              }}
              onFocus={() => {
                setHour(i)
                setPinned(true)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setHour(i)
                  setPinned(true)
                }
              }}
            >
              {i > 0 && (
                <path
                  d={`M${NODE_X + NODE_W / 2} ${nodeY(i - 1) + NODE_H} V${y - 3}`}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  strokeDasharray={incident ? "3 3" : undefined}
                  fill="none"
                  markerEnd="url(#dm-head)"
                />
              )}

              <rect
                x={NODE_X}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill={live ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)"}
                stroke={live ? "rgba(255,255,255,0.46)" : "rgba(255,255,255,0.14)"}
                strokeWidth="1"
                strokeDasharray={incident && !live ? "5 4" : undefined}
                style={{ transition: "fill 0.35s ease, stroke 0.35s ease" }}
              />
              {/* Spine, lit while the day is inside this hour. */}
              <rect
                x={NODE_X}
                y={y}
                width="2.5"
                height={NODE_H}
                rx="1.2"
                fill={live ? "#FFFFFF" : "rgba(255,255,255,0.16)"}
                style={{ transition: "fill 0.35s ease" }}
              />

              <text x={NODE_X + 13} y={y + 19} fontSize="14" fontWeight="500" fill="var(--text)">
                {n.name}
              </text>
              {/* One stack line only — the rest of the detail waits below. */}
              <text x={NODE_X + 13} y={y + 34} fontSize="11.5" letterSpacing="0.012em" fill="rgba(255,255,255,0.5)">
                {n.sub}
              </text>

              {/* The clock, replaced by the result once the hour is lit. */}
              <text
                x={NODE_X + NODE_W - 12}
                y={y + 19}
                textAnchor="end"
                fontSize="10.5"
                fill="var(--text-dim)"
                opacity={live ? 1 : 0}
                style={{ transition: "opacity 0.35s ease" }}
              >
                {n.does}
              </text>
              <text
                x={NODE_X + NODE_W - 12}
                y={y + 19}
                textAnchor="end"
                fontSize="10.5"
                className="mono"
                fill="rgba(255,255,255,0.22)"
                opacity={live ? 0 : 1}
                style={{ transition: "opacity 0.35s ease" }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          )
        })}

        {/* Where the day currently is */}
        <circle
          cx={NODE_X - 11}
          cy={nodeY(hour) + NODE_H / 2}
          r="3.2"
          fill="#FFFFFF"
          filter="url(#dm-glow)"
          style={{ transition: "cy 0.5s cubic-bezier(0.5, 0, 0.3, 1)" }}
        />

        {/* ── Where that block actually sits on the clock ── */}
        <text x={R_X0} y={RULE_Y - 26} fontSize="10.5" fill="var(--text-muted)" letterSpacing="0.08em">
          ON THE CLOCK
        </text>

        {/* The one block that refuses to own an hour gets the whole day, dashed. */}
        {H_.at ? (
          <rect
            x={rx(H_.at[0])}
            y={RULE_Y - 18}
            width={rx(H_.at[1]) - rx(H_.at[0])}
            height="16"
            rx="4"
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            style={{ transition: `x ${EASE}, width ${EASE}` }}
          />
        ) : (
          <rect
            x={R_X0}
            y={RULE_Y - 18}
            width={R_X1 - R_X0}
            height="16"
            rx="4"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.42)"
            strokeWidth="1"
            strokeDasharray="5 4"
          />
        )}

        <path d={`M${R_X0} ${RULE_Y} H${R_X1}`} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        {Array.from({ length: R_TO - R_FROM + 1 }, (_, k) => R_FROM + k).map((h) => {
          const label = h % 3 === 0
          return (
            <g key={h}>
              <path
                d={`M${rx(h)} ${RULE_Y} V${RULE_Y + (label ? 6 : 3)}`}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
              {label && (
                <text
                  x={rx(h)}
                  y={RULE_Y + 18}
                  textAnchor={h === R_FROM ? "start" : "middle"}
                  fontSize="9.5"
                  className="mono"
                  fill="rgba(255,255,255,0.3)"
                >
                  {String(h).padStart(2, "0")}
                </text>
              )}
            </g>
          )
        })}
        </svg>
      </div>

      {/* One line: the hour, what it is, and what it leaves behind. */}
      <div
        className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
        style={{ borderTop: "1px solid var(--border)", paddingTop: 10, minHeight: 38 }}
      >
        <span className="mono text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          {H_.at ? `${String(H_.at[0]).padStart(2, "0")}:00` : "any hour"}
        </span>
        <span className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
          {H_.name}
        </span>
        <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
          — {H_.does}
        </span>
      </div>
    </div>
  )
}
