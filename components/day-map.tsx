"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A day in production, built out of his own stack — not the industry's.
 *
 * Every tool named here is one he actually runs, and every number is one he
 * actually moved: 25 hours a week of onboarding, provisioning and patching
 * written into PowerShell and Python; 40% less manual triage after Jira
 * Service Management and Slack routing; 180-odd macOS, Windows and iOS
 * endpoints rebuilt through Intune, Jamf and Autopilot. The estate down the
 * left is his too — Grafana and Datadog watching, Fortinet and Cisco at the
 * edge, Windows and Linux underneath, Azure and AWS around it. The tag on
 * each block is the hat worn for it, because the span from service desk to
 * SRE is the point.
 *
 * Two things happen while it runs, and both are true of the job rather than
 * decoration:
 *
 *   The day gets broken. Monitoring catches something, the day is abandoned
 *   where it stands, the rail turns and drops to the incident, containment
 *   runs against a clock, and only then does the day pick up from the hour it
 *   was pulled out of. The four that watch become the four that act. This is
 *   the one place the page spends colour.
 *
 *   The day deletes itself. In the automation block the four repeating jobs
 *   are struck through one at a time and the hours they cost come back on the
 *   counter. Work leaving the system for good gets its own verb — a line
 *   through it — because it is the opposite of an incident, not a quieter
 *   version of one.
 *
 * Drawing grammar is the page's own: a box is a thing that happens, a solid
 * line is the day moving forward, a dashed line is something running on its
 * own underneath, a dotted frame is a boundary. Colour is the page's own too
 * — the whole site resolves to luminance, so the single red here is the only
 * hue on it, and it is spent on the one thing it is for.
 */

const W = 432
const H = 436

type Block = {
  id: string
  name: string
  /** The stack the block is actually spent in. */
  sub: string
  /** The rest of it, kept for the line underneath the diagram. */
  sub2: string
  /** The one-line result, shown while the block is lit. */
  does: string
  /** The hat worn for this one. */
  tag: string
  /** Where it sits on the clock; null for the one that can land anywhere. */
  at: [number, number] | null
}

const DAY: Block[] = [
  {
    id: "check",
    at: [8, 9],
    tag: "SRE",
    name: "Monitoring & alerts",
    sub: "Grafana · Datadog · Splunk",
    sub2: "overnight alerts · backup jobs · disk headroom",
    does: "all green",
  },
  {
    id: "triage",
    at: [9, 10],
    tag: "IT SUPPORT",
    name: "Service desk",
    sub: "Jira SM · ServiceNow · Slack routing",
    sub2: "L1–L3 triage · P1–P4 · 40% less manual triage",
    does: "sorted by impact",
  },
  {
    id: "change",
    at: [10, 12],
    tag: "DEVOPS",
    name: "Change management",
    sub: "Git · GitHub Actions · Terraform · CI/CD",
    sub2: "ITIL change window · tested, staged, rollback first",
    does: "shipped safely",
  },
  {
    id: "automate",
    at: [12, 15],
    tag: "AUTOMATION",
    name: "Automation & IaC",
    sub: "PowerShell · Python · Ansible · Terraform",
    sub2: "onboarding · provisioning · patching, as code",
    does: "25 h/week returned",
  },
  {
    id: "identity",
    at: [15, 16],
    tag: "SECURITY",
    name: "Identity & access",
    sub: "Entra ID · Active Directory · Okta",
    sub2: "RBAC · MFA · GDPR and ISO 27001 controls",
    does: "least privilege",
  },
  {
    id: "incident",
    at: null,
    tag: "ON-CALL",
    name: "Incident response",
    sub: "Defender · CrowdStrike · Veeam",
    sub2: "isolate · revoke · IDS/IPS · restore to RTO",
    does: "contained first",
  },
  {
    id: "fleet",
    at: [17, 18],
    tag: "ENDPOINTS",
    name: "Endpoint management",
    sub: "Intune · Jamf Pro · Autopilot · MDM",
    sub2: "180+ macOS, Windows and iOS · setup 75% faster",
    does: "fleet in line",
  },
]

/** The estate underneath all of it, which does not stop for any of it. */
const ALWAYS = [
  { name: "Monitor", sub: "Grafana · Datadog" },
  { name: "Network", sub: "Fortinet · Cisco" },
  { name: "Systems", sub: "Windows · Linux" },
  { name: "Cloud", sub: "Azure · AWS" },
]

/**
 * One mark per block, and it draws the thing itself rather than a company.
 *
 * Vendor logos were tried here and they were the wrong answer: monitoring is
 * not Grafana and a service desk is not ServiceNow, so picking one of them to
 * stand for the whole category says something untrue about the work. The only
 * one that read correctly was the endpoint mark, and only because it happens
 * to be shaped like a device. So every block now gets a mark shaped like what
 * it does — a pulse for watching, a queue and a ticket for the desk, a branch
 * for a change, brackets for the code that replaces the work, a shield for
 * who gets in, a triangle for the thing going wrong, a laptop and a phone for
 * the machines people actually hold.
 *
 * Neurath's rule for a pictogram: it may not denote more than the fact it is
 * chosen for. They carry no colour of their own either, so they dim when the
 * day steps back and turn red when it breaks — which a brand logo, stuck in
 * its own palette, could never do.
 */
const MARK = 19
const GLYPH: Record<string, string[]> = {
  check: ["M2 12h4l2.5-6 3.5 12 2.5-6H22"],
  triage: ["M3 5h18M3 10h18M3 15h11", "M18.5 14.3a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"],
  change: [
    "M6 2.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z",
    "M6 16.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z",
    "M18 9.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z",
    "M6 7.4v9.2M8.4 5h4.6a2.6 2.6 0 0 1 2.6 2.6v2",
  ],
  automate: ["M8.5 6 3.5 12l5 6M15.5 6l5 6-5 6"],
  identity: ["M12 3 20 6v6c0 4.4-3.3 7.9-8 9-4.7-1.1-8-4.6-8-9V6Z", "M9.3 12.2l1.9 1.9 3.5-3.8"],
  incident: ["M12 3.5 22 20H2Z", "M12 10v4M12 17h.01"],
  fleet: [
    "M3.6 4.5h9.8a1.6 1.6 0 0 1 1.6 1.6v6.3a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 12.4V6.1a1.6 1.6 0 0 1 1.6-1.6Z",
    "M1 18h15",
    "M18.4 9h3.1a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4h-3.1a1.4 1.4 0 0 1-1.4-1.4v-8.2A1.4 1.4 0 0 1 18.4 9Z",
  ],
}

/**
 * Colour on this page belongs to whatever is lit, so a mark that is not being
 * used sits in greyscale and only takes its own colours when the day is
 * actually inside that block. That way fifty-three brand palettes never get
 * to compete with the one red the incident is owed.
 */


/** The one block that does not get an hour — it takes whichever one it lands on. */
const BREAK = DAY.findIndex((d) => d.at === null)
/** The one block whose whole job is to make future blocks unnecessary. */
const AUTO = DAY.findIndex((d) => d.id === "automate")
/** The hours the day actually plans for, in order. */
const ORDER = DAY.map((_, i) => i).filter((i) => i !== BREAK)

/**
 * Four slots under the diagram, and two things they can say: what is running
 * underneath the day, and — once the day breaks — what is being done about it.
 *
 * A third vocabulary was tried here, where the automation block turned them
 * into the repeating jobs and struck each one out. It read as the row cutting
 * itself up and moving on, which is not what automation feels like. The hours
 * coming back say it on their own, so the slots hold still and the counter
 * does the talking.
 */
const WATCHING = ["monitoring", "backups", "endpoints", "on-call"]
const CONTAINING = ["isolate", "revoke", "block", "restore"]
/** Hours a week the automation block hands back, by the end of it. */
const TOIL_HOURS = 25

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
  /**
   * Where the incident came in. A P1 reaches an engineer one of two ways —
   * monitoring trips a threshold, or somebody cannot work and the service
   * desk escalates it up from L1 — so it arrives both ways here, in turn.
   */
  const [source, setSource] = useState<"monitor" | "desk">("monitor")
  /** Hours a week handed back so far. */
  const [hours, setHours] = useState(0)

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
  const automating = !broken && hour === AUTO

  /** Abandon whatever the day was doing and go to the incident. */
  const breakTheDay = () => {
    setSource((v) => (v === "monitor" ? "desk" : "monitor"))
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
      CONTAINING.forEach((_, k) => timers.push(setTimeout(() => setStep(k + 1), (k + 1) * 850)))
      timers.push(setTimeout(() => setPhase("clear"), CONTAINING.length * 850 + 400))
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

  // ── The automation block, counting back the week it hands over ──
  useEffect(() => {
    if (!automating) {
      setHours(0)
      return
    }
    const id = setInterval(() => setHours((v) => (v >= TOIL_HOURS ? v : v + 1)), 70)
    return () => clearInterval(id)
  }, [automating])

  const RAIL_X = NODE_X - 11
  /** Where the P1 came in, on the rail's own scale. */
  const sourceY = source === "monitor" ? ctlY(0) + CTL_H / 2 : nodeY(1) + NODE_H / 2
  /** Everything the incident touches: where it came in, the hour it took, itself. */
  const redTop = Math.min(sourceY, nodeY(from) + NODE_H / 2, nodeY(BREAK) + NODE_H / 2)
  const redBottom = Math.max(sourceY, nodeY(from) + NODE_H / 2, nodeY(BREAK) + NODE_H / 2)

  const B = DAY[hour]
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0")
  const ss = String(Math.floor(elapsed % 60)).padStart(2, "0")

  // One strip, two vocabularies: what watches, and what acts once it breaks.
  const slots = broken ? CONTAINING : WATCHING
  const landed = broken ? step : 0

  const statusText =
    phase === "alert"
      ? source === "monitor"
        ? "P1 · CAUGHT BY MONITORING"
        : "P1 · ESCALATED FROM L1"
      : phase === "contain"
        ? "P1 · CONTAINING"
        : phase === "clear"
          ? "CONTAINED · DAY RESUMES"
          : automating
            ? "TOIL REMOVED FROM THE WEEK"
            : "NOTHING ON FIRE"

  const readout = broken ? `T+${mm}:${ss}` : automating ? `+${hours} h/wk` : "--:--"

  return (
    <div
      ref={wrap}
      className="w-full"
      onMouseLeave={() => setPinned(false)}
      onPointerLeave={() => setPinned(false)}
      onBlur={() => setPinned(false)}
    >
      <div className="mb-4">
        <span className="eyebrow">A day in production</span>
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
          aria-label="A day in production: monitoring and alerts, service desk triage from L1 to L3, change management, infrastructure automation, identity and access, and endpoint management — over an estate of monitoring, network, systems and cloud that never stops. Partway through, monitoring catches an incident, the day stops, and containment runs before the day resumes."
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

          {/* ── The estate, which never stops ── */}
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
            // Monitoring lights only when monitoring is what caught it.
            const caught = breached && i === 0 && source === "monitor"
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
                  d={`M${CTL_X + CTL_W} ${ctlY(i) + CTL_H / 2} H${caught ? NODE_X - 11 : NODE_X - 16}`}
                  fill="none"
                  stroke={caught ? "var(--danger)" : "rgba(255,255,255,0.18)"}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  markerEnd={caught ? undefined : "url(#dm-head)"}
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
              d={`M${RAIL_X} ${redTop} V${redBottom}`}
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
            // The desk stays lit while it is the thing that raised the P1.
            const raised = breached && source === "desk" && n.id === "triage"
            // While the day is broken, everything that is not the incident
            // steps back — which is exactly what happens to the real day.
            const dimmed = broken && !isBreak && !raised
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.name} — ${n.tag}: ${n.sub}, ${n.sub2}`}
                className="dm-hour"
                style={{
                  cursor: "pointer",
                  opacity: dimmed ? 0.3 : 1,
                  transition: `opacity ${EASE}`,
                }}
                onMouseEnter={() => {
                  // Reaching for the incident sets one off. Everything else
                  // holds the day still on that block.
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
                    (isBreak && breached) || raised
                      ? "var(--danger-wash)"
                      : live
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.025)"
                  }
                  stroke={
                    raised
                      ? "var(--danger)"
                      : isBreak && broken
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
                {/* Spine, lit while the day is inside this block. */}
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

                {/* The mark for what this block does. */}
                <g
                  transform={`translate(${NODE_X + 12} ${y + (NODE_H - MARK) / 2}) scale(${MARK / 24})`}
                  fill="none"
                  stroke={
                    (isBreak && breached) || raised
                      ? "var(--danger)"
                      : live
                        ? "#FFFFFF"
                        : "rgba(255,255,255,0.42)"
                  }
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: `stroke ${EASE}` }}
                >
                  {GLYPH[n.id].map((d, k) => (
                    <path key={k} d={d} />
                  ))}
                </g>

                <text x={NODE_X + 41} y={y + 19} fontSize="14" fontWeight="500" fill="var(--text)">
                  {n.name}
                </text>
                {/* The hat worn for this block, under its name. */}
                <text
                  x={NODE_X + 41}
                  y={y + 33}
                  fontSize="9.5"
                  className="mono"
                  letterSpacing="0.07em"
                  fill={
                    (isBreak && breached) || raised ? "var(--danger)" : "rgba(255,255,255,0.32)"
                  }
                  style={{ transition: `fill ${EASE}` }}
                >
                  {n.tag}
                </text>
                {/* What it leaves behind, only while the day is inside it. */}
                <text
                  x={NODE_X + NODE_W - 12}
                  y={y + 33}
                  textAnchor="end"
                  fontSize="10.5"
                  fill={isBreak && breached ? "var(--danger)" : "var(--text-dim)"}
                  opacity={live ? 1 : 0}
                  style={{ transition: `opacity ${EASE}, fill ${EASE}` }}
                >
                  {n.does}
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

          {/* ── The state of the estate, and whichever counter the moment calls for ── */}
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
            fill={broken ? "var(--danger)" : automating ? "var(--text)" : "rgba(255,255,255,0.22)"}
            style={{ transition: `fill ${EASE}` }}
          >
            {readout}
          </text>

          {/* Four slots: what watches, or what acts once the day breaks. */}
          {slots.map((label, i) => {
            const done = landed > i
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
                  {label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* One line: when it happens, what it is, and what it leaves behind. */}
      <div
        className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
        style={{ borderTop: "1px solid var(--border)", paddingTop: 10, minHeight: 38 }}
      >
        <span
          className="mono text-[13px]"
          style={{ color: broken ? "var(--danger)" : "rgba(255,255,255,0.5)" }}
        >
          {B.at ? `${String(B.at[0]).padStart(2, "0")}:00` : "any hour"}
        </span>
        <span className="text-[14px] font-medium" style={{ color: "var(--text)" }}>
          {B.name}
        </span>
        <span className="text-[14px]" style={{ color: "var(--text-muted)" }}>
          — {broken ? `pulled out of ${DAY[from].name.toLowerCase()}` : B.sub2}
        </span>
      </div>
    </div>
  )
}
