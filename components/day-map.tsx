"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A day on the job, not the CV.
 *
 * The old diagram showed the estate; this one shows the person running it —
 * the order a modern infrastructure engineer actually works in. Down the left
 * runs the half of the job that never stops while he does any of it:
 * monitoring, backups, patching, logging.
 *
 * The point of the thing is what happens partway through. A day laid out
 * 1 → 7 in a tidy column is a lie about this job; the truth is that it gets
 * interrupted. So it does: monitoring catches something, the day is abandoned
 * where it stands, the rail turns and drops to the incident, containment runs
 * step by step against a clock, and only then does the day pick up where it
 * was. The four things that watch become the four things that act.
 *
 * Drawing grammar is the page's own: a box is a thing that happens, a solid
 * line is the day moving forward, a dashed line is something running on its
 * own in the background, a dotted frame is a boundary. Colour is the page's
 * own too — the whole site resolves to luminance, so the single red here is
 * the only hue on it, and it is spent on the one thing it is for.
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

/** The one block that does not get an hour — it takes whichever one it lands on. */
const BREAK = DAY.findIndex((d) => d.at === null)
/** The hours the day actually plans for, in order. */
const ORDER = DAY.map((_, i) => i).filter((i) => i !== BREAK)

/** What containment does, in the order it is done. Four, to match the four above. */
const CONTAIN = ["isolate", "revoke", "block", "restore"]

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

/** The status strip: one line of state, then the four slots underneath it. */
const STRIP_Y = 400
const CHIP_W = 100
const CHIP_GAP = 8
const chipX = (i: number) => CTL_X + i * (CHIP_W + CHIP_GAP)

const EASE = "0.45s cubic-bezier(0.4, 0, 0.2, 1)"

type Phase = "calm" | "alert" | "contain" | "clear"

/** Incident minutes per real second, so the clock reads like a real MTTR. */
const MTTR_RATE = 37.5

export function DayMap() {
  const [hour, setHour] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [phase, setPhase] = useState<Phase>("calm")
  /** How many containment steps have landed. */
  const [step, setStep] = useState(0)
  /** Seconds on the incident clock. */
  const [elapsed, setElapsed] = useState(0)
  /** The hour the day was on when it got interrupted. */
  const [from, setFrom] = useState(0)

  const wrap = useRef<HTMLDivElement>(null)
  /** True once the day has been held by a pointer at least once. */
  const resumed = useRef(false)
  /** Hours run since the last interruption. */
  const since = useRef(0)
  const hourRef = useRef(0)
  useEffect(() => {
    hourRef.current = hour
  }, [hour])

  const breached = phase === "alert" || phase === "contain"
  const broken = phase !== "calm"

  /** Abandon whatever the day was doing and go to the incident. */
  const breakTheDay = () => {
    setFrom(hourRef.current)
    setStep(0)
    setElapsed(0)
    setPhase("alert")
  }

  // ── The day moving forward, while nothing is wrong ──
  useEffect(() => {
    if (pinned || broken) {
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

      // Four quiet hours is as long as this job stays quiet.
      if (since.current >= 4) {
        since.current = 0
        breakTheDay()
        return
      }
      since.current += 1
      setHour((h) => {
        const p = ORDER.indexOf(h)
        return ORDER[(p + 1) % ORDER.length]
      })
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned, broken])

  // ── The interruption, beat by beat ──
  useEffect(() => {
    if (phase === "calm") return
    const timers: ReturnType<typeof setTimeout>[] = []

    if (phase === "alert") {
      setHour(BREAK)
      timers.push(setTimeout(() => setPhase("contain"), 1200))
    }
    if (phase === "contain") {
      CONTAIN.forEach((_, k) => timers.push(setTimeout(() => setStep(k + 1), (k + 1) * 850)))
      timers.push(setTimeout(() => setPhase("clear"), CONTAIN.length * 850 + 400))
    }
    if (phase === "clear") {
      timers.push(
        setTimeout(() => {
          setPhase("calm")
          // The day picks up from the hour it was pulled out of.
          setHour(ORDER[(ORDER.indexOf(from) + 1) % ORDER.length])
        }, 1900),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [phase, from])

  // ── The clock only runs while the incident is open ──
  useEffect(() => {
    if (!breached) return
    const id = setInterval(() => setElapsed((v) => v + MTTR_RATE / 10), 100)
    return () => clearInterval(id)
  }, [breached])

  const H_ = DAY[hour]
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0")
  const ss = String(Math.floor(elapsed % 60)).padStart(2, "0")

  const statusText =
    phase === "alert"
      ? "P1 · CAUGHT BY MONITORING"
      : phase === "contain"
        ? "P1 · CONTAINING"
        : phase === "clear"
          ? "CONTAINED · DAY RESUMES"
          : "NOTHING ON FIRE"

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
          // Whatever the window leaves after the heading and the line below is
          // what the day gets — so it is as large as it can be without ever
          // running off the first screen.
          style={{ maxHeight: "min(calc(100vh - 250px), 660px)" }}
          role="img"
          aria-label="The work in order: morning checks, ticket triage, a change window, automation work, security and identity, and closing the loop — with monitoring, backup, patching and logging running underneath all of it. Partway through, monitoring catches an incident, the day stops, and containment runs before the day resumes."
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

          {ALWAYS.map((c, i) => {
            // Monitoring is the one that catches it, so it is the one that lights.
            const caught = breached && i === 0
            return (
              <g key={c.name}>
                <rect
                  x={CTL_X}
                  y={ctlY(i)}
                  width={CTL_W}
                  height={CTL_H}
                  rx="7"
                  fill={caught ? "var(--danger-wash)" : "rgba(255,255,255,0.022)"}
                  stroke={caught ? "var(--danger)" : "rgba(255,255,255,0.14)"}
                  style={{ transition: `fill ${EASE}, stroke ${EASE}` }}
                />
                <text
                  x={CTL_X + 9}
                  y={ctlY(i) + 20}
                  fontSize="12.5"
                  fontWeight="500"
                  fill={caught ? "var(--danger)" : "var(--text)"}
                  style={{ transition: `fill ${EASE}` }}
                >
                  {c.name}
                </text>
                <text x={CTL_X + 9} y={ctlY(i) + 36} fontSize="10.5" fill="var(--text-muted)">
                  {c.sub}
                </text>
                {/* Dashed: it happens on its own, underneath the day. */}
                <path
                  d={`M${CTL_X + CTL_W} ${ctlY(i) + CTL_H / 2} H${NODE_X - 16}`}
                  fill="none"
                  stroke={caught ? "var(--danger)" : "rgba(255,255,255,0.18)"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  markerEnd="url(#dm-head)"
                  style={{ transition: `stroke ${EASE}` }}
                />
              </g>
            )
          })}

          {/* ── The rail the day runs down ── */}
          <path
            d={`M${NODE_X - 11} ${nodeY(0) + NODE_H / 2} V${nodeY(DAY.length - 1) + NODE_H / 2}`}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            fill="none"
          />
          {/* The stretch of day the incident takes away from him. */}
          {broken && (
            <path
              d={`M${NODE_X - 11} ${nodeY(Math.min(from, BREAK)) + NODE_H / 2} V${nodeY(Math.max(from, BREAK)) + NODE_H / 2}`}
              stroke={breached ? "var(--danger)" : "var(--danger-dim)"}
              strokeWidth="1.5"
              fill="none"
              style={{ transition: `stroke ${EASE}` }}
            />
          )}

          {DAY.map((n, i) => {
            const y = nodeY(i)
            const live = hour === i
            const isBreak = i === BREAK
            // While the day is broken, everything that is not the incident
            // steps back — which is exactly what happens to the real day.
            const dimmed = broken && !isBreak
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.name}: ${n.sub}, ${n.sub2}`}
                className="dm-hour"
                style={{
                  cursor: "pointer",
                  opacity: dimmed ? 0.3 : 1,
                  transition: `opacity ${EASE}`,
                }}
                onMouseEnter={() => {
                  // Reaching for the incident sets one off. Everything else
                  // holds the day still on that hour.
                  if (isBreak) {
                    if (!broken) breakTheDay()
                    return
                  }
                  setPhase("calm")
                  setHour(i)
                  setPinned(true)
                }}
                onFocus={() => {
                  if (isBreak) {
                    if (!broken) breakTheDay()
                    return
                  }
                  setPhase("calm")
                  setHour(i)
                  setPinned(true)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    if (isBreak) {
                      if (!broken) breakTheDay()
                      return
                    }
                    setPhase("calm")
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
                    strokeDasharray={isBreak ? "3 3" : undefined}
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
                  fill={
                    isBreak && breached
                      ? "var(--danger-wash)"
                      : live
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.025)"
                  }
                  stroke={
                    isBreak && broken
                      ? breached
                        ? "var(--danger)"
                        : "var(--danger-line)"
                      : live
                        ? "rgba(255,255,255,0.46)"
                        : "rgba(255,255,255,0.14)"
                  }
                  strokeWidth="1"
                  strokeDasharray={isBreak && !broken ? "5 4" : undefined}
                  style={{ transition: `fill ${EASE}, stroke ${EASE}` }}
                />
                {/* Spine, lit while the day is inside this hour. */}
                <rect
                  x={NODE_X}
                  y={y}
                  width="2.5"
                  height={NODE_H}
                  rx="1.2"
                  fill={
                    isBreak && breached ? "var(--danger)" : live ? "#FFFFFF" : "rgba(255,255,255,0.16)"
                  }
                  style={{ transition: `fill ${EASE}` }}
                />

                <text x={NODE_X + 13} y={y + 19} fontSize="14" fontWeight="500" fill="var(--text)">
                  {n.name}
                </text>
                {/* One stack line only — the rest of the detail waits below. */}
                <text x={NODE_X + 13} y={y + 34} fontSize="11.5" letterSpacing="0.012em" fill="rgba(255,255,255,0.5)">
                  {n.sub}
                </text>

                {/* The number, replaced by the result once the hour is lit. */}
                <text
                  x={NODE_X + NODE_W - 12}
                  y={y + 19}
                  textAnchor="end"
                  fontSize="10.5"
                  fill={isBreak && breached ? "var(--danger)" : "var(--text-dim)"}
                  opacity={live ? 1 : 0}
                  style={{ transition: `opacity ${EASE}, fill ${EASE}` }}
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
                  style={{ transition: `opacity ${EASE}` }}
                >
                  {isBreak ? "··" : String(ORDER.indexOf(i) + 1).padStart(2, "0")}
                </text>
              </g>
            )
          })}

          {/* Where the day currently is */}
          <circle
            cx={NODE_X - 11}
            cy={nodeY(hour) + NODE_H / 2}
            r="3.2"
            fill={breached ? "var(--danger)" : "#FFFFFF"}
            filter="url(#dm-glow)"
            style={{ transition: `cy 0.5s cubic-bezier(0.5, 0, 0.3, 1), fill ${EASE}` }}
          />

          {/* ── The state of the estate, and the clock that only runs when it is wrong ── */}
          <circle
            cx={CTL_X + 4}
            cy={STRIP_Y - 4}
            r="3"
            fill={breached ? "var(--danger)" : "rgba(255,255,255,0.55)"}
            className={breached ? undefined : "dot-pulse"}
            style={{ transformBox: "fill-box", transformOrigin: "center", transition: `fill ${EASE}` }}
          />
          <text
            x={CTL_X + 15}
            y={STRIP_Y}
            fontSize="10.5"
            letterSpacing="0.08em"
            fill={breached ? "var(--danger)" : "var(--text-muted)"}
            style={{ transition: `fill ${EASE}` }}
          >
            {statusText}
          </text>
          <text
            x={W - CTL_X}
            y={STRIP_Y}
            textAnchor="end"
            fontSize="10.5"
            className="mono"
            fill={broken ? "var(--danger)" : "rgba(255,255,255,0.22)"}
            style={{ transition: `fill ${EASE}` }}
          >
            {broken ? `T+${mm}:${ss}` : "--:--"}
          </text>

          {/* The four that watch, which during an incident become the four that act. */}
          {CONTAIN.map((act, i) => {
            const done = broken && step > i
            return (
              <g key={i}>
                <rect
                  x={chipX(i)}
                  y={STRIP_Y + 8}
                  width={CHIP_W}
                  height={20}
                  rx="5"
                  fill={done ? "var(--danger-wash)" : "rgba(255,255,255,0.02)"}
                  stroke={done ? "var(--danger-line)" : "rgba(255,255,255,0.12)"}
                  style={{ transition: `fill ${EASE}, stroke ${EASE}` }}
                />
                <text
                  x={chipX(i) + CHIP_W / 2}
                  y={STRIP_Y + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fill={done ? "var(--danger)" : broken ? "rgba(255,255,255,0.3)" : "var(--text-muted)"}
                  style={{ transition: `fill ${EASE}` }}
                >
                  {broken ? act : ALWAYS[i].name.toLowerCase()}
                </text>
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
        <span
          className="mono text-[13px]"
          style={{ color: broken ? "var(--danger)" : "rgba(255,255,255,0.5)" }}
        >
          {H_.at ? `${String(H_.at[0]).padStart(2, "0")}:00` : "any hour"}
        </span>
        <span className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
          {H_.name}
        </span>
        <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
          — {broken ? `pulled out of ${DAY[from].name.toLowerCase()}` : H_.does}
        </span>
      </div>
    </div>
  )
}
