"use client"

import { useEffect, useRef, useState } from "react"

/**
 * The environment, not the CV.
 *
 * This is what a modern managed estate actually looks like end to end, and a
 * request is sent down it on a loop: a compliant device is checked against
 * identity, crosses a zero-trust edge, lands on a workload, touches data, and
 * is accounted for in observability. Alongside it runs the control plane —
 * the repository, the pipeline and the policy that put every one of those
 * boxes there in the first place, which is the half most diagrams leave out.
 *
 * The drawing grammar is the page's own: a box is a thing that runs, a solid
 * line is live traffic, a dashed line is something that happened at build
 * time, and a dotted frame is a boundary.
 */

const W = 364
const H = 452

type Node = {
  id: string
  name: string
  sub: string
  /** What this stage does to the request as it passes. */
  does: string
}

/** The runtime path, in the order traffic really takes it. */
const PATH: Node[] = [
  { id: "device", name: "Managed endpoint", sub: "Intune · Autopilot · Jamf", does: "device attested" },
  { id: "identity", name: "Identity", sub: "Entra ID · MFA · Conditional Access", does: "identity proven" },
  { id: "edge", name: "Zero-trust edge", sub: "ZTNA · firewall · DNS · segmentation", does: "least privilege" },
  { id: "workload", name: "Workload", sub: "Azure · AWS · Kubernetes · containers", does: "scheduled" },
  { id: "data", name: "Data & recovery", sub: "PostgreSQL · SQL · immutable backup", does: "read, replicated" },
  { id: "observe", name: "Observability", sub: "SIEM · metrics · alerting · runbooks", does: "accounted for" },
]

/** The control plane: what put the runtime there, and keeps it honest. */
const CONTROL = [
  { name: "Git", sub: "single source" },
  { name: "CI/CD", sub: "build, scan, ship" },
  { name: "IaC", sub: "Terraform" },
  { name: "Policy", sub: "ISO 27001 · GDPR" },
]

const NODE_X = 118
const NODE_W = 238
const NODE_H = 54
const GAP = 14
const TOP = 10
const nodeY = (i: number) => TOP + i * (NODE_H + GAP)

const CTL_X = 6
const CTL_W = 86
const CTL_H = 44
const ctlY = (i: number) => TOP + 26 + i * (CTL_H + 24)

export function ProductionEnv() {
  const [hop, setHop] = useState(-1)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // The diagram sits in the hero, so without this the request keeps hopping
    // — and re-rendering the whole SVG — for as long as the tab is open, from
    // the far end of the page and from behind another tab.
    let onScreen = true
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
    })
    if (wrap.current) io.observe(wrap.current)

    let i = -1
    const id = setInterval(() => {
      if (!onScreen || document.hidden) return
      i = i >= PATH.length - 1 ? -1 : i + 1
      setHop(i)
    }, 900)
    return () => {
      clearInterval(id)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrap} className="w-full">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="eyebrow">The environment I run</span>
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          one request, end to end
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A production environment: a request passes from a managed endpoint through identity, a zero-trust edge, a workload, data and observability, built and governed by a control plane of Git, CI/CD, infrastructure as code and policy."
      >
        <defs>
          <marker id="pe-head" markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto">
            <path d="M0 0 L5 2.5 L0 5 z" fill="rgba(255,255,255,0.32)" />
          </marker>
          <filter id="pe-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Control plane ── */}
        <rect
          x={CTL_X - 4}
          y={TOP + 4}
          width={CTL_W + 8}
          height={ctlY(CONTROL.length - 1) + CTL_H - TOP + 6}
          rx="9"
          fill="rgba(255,255,255,0.012)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text x={CTL_X + 2} y={TOP + 17} fontSize="7.5" fill="var(--text-muted)" letterSpacing="0.1em">
          CONTROL PLANE
        </text>

        {CONTROL.map((c, i) => (
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
            <text x={CTL_X + 10} y={ctlY(i) + 19} fontSize="10" fontWeight="500" fill="var(--text)">
              {c.name}
            </text>
            <text x={CTL_X + 10} y={ctlY(i) + 32} fontSize="7.5" fill="var(--text-muted)">
              {c.sub}
            </text>
            {/* Dashed: this is how the runtime got there, not live traffic. */}
            <path
              d={`M${CTL_X + CTL_W} ${ctlY(i) + CTL_H / 2} H${NODE_X - 16}`}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              strokeDasharray="3 3"
              markerEnd="url(#pe-head)"
            />
          </g>
        ))}

        {/* ── The rail the request descends ── */}
        <path
          d={`M${NODE_X - 11} ${nodeY(0) + NODE_H / 2} V${nodeY(PATH.length - 1) + NODE_H / 2}`}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          fill="none"
        />

        {/* ── Runtime path ── */}
        {PATH.map((n, i) => {
          const y = nodeY(i)
          const live = hop === i
          return (
            <g key={n.id}>
              {i > 0 && (
                <path
                  d={`M${NODE_X + NODE_W / 2} ${nodeY(i - 1) + NODE_H} V${y - 3}`}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  fill="none"
                  markerEnd="url(#pe-head)"
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
                style={{ transition: "fill 0.35s ease, stroke 0.35s ease" }}
              />
              {/* Spine, lit while the request is inside this stage. */}
              <rect
                x={NODE_X}
                y={y}
                width="2.5"
                height={NODE_H}
                rx="1.2"
                fill={live ? "#FFFFFF" : "rgba(255,255,255,0.16)"}
                style={{ transition: "fill 0.35s ease" }}
              />

              <text x={NODE_X + 14} y={y + 21} fontSize="12" fontWeight="500" fill="var(--text)">
                {n.name}
              </text>
              <text x={NODE_X + 14} y={y + 37} fontSize="8.5" fill="var(--text-muted)">
                {n.sub}
              </text>

              {/* What the stage just did, in place of its number. */}
              <text
                x={NODE_X + NODE_W - 12}
                y={y + 21}
                textAnchor="end"
                fontSize="8"
                fill="var(--text-dim)"
                opacity={live ? 1 : 0}
                style={{ transition: "opacity 0.35s ease" }}
              >
                {n.does}
              </text>
              <text
                x={NODE_X + NODE_W - 12}
                y={y + 21}
                textAnchor="end"
                fontSize="8.5"
                className="num"
                fill="rgba(255,255,255,0.22)"
                opacity={live ? 0 : 1}
                style={{ transition: "opacity 0.35s ease" }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          )
        })}

        {/* The request itself */}
        {hop >= 0 && (
          <circle
            cx={NODE_X - 11}
            cy={nodeY(hop) + NODE_H / 2}
            r="3.2"
            fill="#FFFFFF"
            filter="url(#pe-glow)"
            style={{ transition: "cy 0.5s cubic-bezier(0.5, 0, 0.3, 1)" }}
          />
        )}
      </svg>

      <p className="mt-3 text-[12.5px]" style={{ lineHeight: 1.65, color: "var(--text-muted)" }}>
        Dashed lines are how it got there; solid lines are traffic. I have built
        and run every box on this diagram.
      </p>
    </div>
  )
}
