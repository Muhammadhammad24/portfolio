"use client"

import { Fragment } from "react"

/**
 * Bring me the chaos — one figure, not two.
 *
 * The claim has not changed: he is given a mess and he hands back something
 * quiet. What changed is the shape of the argument. Two panels side by side
 * only ever *imply* a transformation — the viewer has to notice that both
 * pictures contain the same eight things and then infer that one became the
 * other. That is a second step, and most people do not take it.
 *
 * So it is one continuous object instead. The estate as found sits at the
 * top, scattered and cross-wired, and every one of those runs is pulled down
 * into a single waist with his name on it. Out of the bottom of that waist
 * comes one backbone, and the same eight things hang off it in order. The
 * mess does not sit *beside* the order: it goes *through* him and comes out
 * the other side. An hourglass says that in one glance, in a thumbnail,
 * without reading a word.
 *
 * Three things deliberately do NOT appear here, because the page carries
 * them properly further down and a hero that repeats them is noise: the
 * years and places (the journey map and the timeline), the tool logos (the
 * skills grid), and the project write-ups.
 *
 * The last band is the direction — the work he is doing now so the top half
 * stops happening to anybody. It is the one forward-looking claim on the
 * page, and it is not a wish: the assistant exists and already answers out
 * of tickets that have been solved.
 *
 * Motion carries meaning and never gates it. The tangle scribbles itself in
 * loosely and out of step; the backbone below snaps into place in one beat.
 * Both finish inside a second, and the figure is complete and correct in its
 * first frame, with animation off, or printed on paper.
 */

type Node = {
  id: string
  label: string
  x: number
  y: number
  r?: number
  /** For the rebuilt half: what was actually done to this one. */
  did?: string
}

const W = 470
const H = 394
const NW = 80
const NH = 32

/** The three zones: what he is given, him, and what he leaves. */
const WAIST_TOP = 144
const WAIST_H = 46
const WAIST_X = 26
const WAIST_W = 418
const WAIST_MID = WAIST_X + WAIST_W / 2
const BUS_Y = 292
/** One clock for the whole machine, in seconds. */
const BEAT = 5.2

/**
 * What actually happens inside the door. These are not adjectives — each one
 * is a step he takes, in this order, and the figure lights them in order
 * because that is how the work goes: you cannot harden what you have not
 * fixed, or automate what you have not understood.
 */
const METHOD = ["TRIAGE", "ROOT CAUSE", "FIX", "HARDEN", "AUTOMATE", "DOCUMENT"]
/** The usable width inside the door, and one slot per step. */
const SLOT_X0 = WAIST_X + 16
const SLOT_W = (WAIST_W - 32) / METHOD.length
const slotMid = (i: number) => SLOT_X0 + SLOT_W * (i + 0.5)

/** As found. Nobody laid this out; the positions are chosen, the look is not. */
const MESS: Node[] = [
  { id: "users", label: "People", x: 6, y: 6, r: -2.5 },
  { id: "identity", label: "Logins", x: 132, y: 7, r: 1.8 },
  { id: "servers", label: "Servers", x: 260, y: 10, r: -1.8 },
  { id: "tickets", label: "Tickets", x: 388, y: 5, r: -1.4 },
  { id: "network", label: "Network", x: 0, y: 76, r: 2.2 },
  { id: "endpoints", label: "Laptops", x: 126, y: 72, r: -2 },
  { id: "monitor", label: "Monitor", x: 254, y: 80, r: 2.6 },
  { id: "cloud", label: "Cloud", x: 386, y: 74, r: 1.2 },
]

/** The runs, as found: crossing, doubling back, no two alike. */
const MESS_LINKS: { a: string; b: string; bend: number; bad?: boolean }[] = [
  { a: "users", b: "servers", bend: -30 },
  { a: "users", b: "tickets", bend: 24 },
  { a: "users", b: "endpoints", bend: 20 },
  { a: "identity", b: "endpoints", bend: -34, bad: true },
  { a: "identity", b: "cloud", bend: 20 },
  { a: "network", b: "servers", bend: 24 },
  { a: "network", b: "cloud", bend: -40, bad: true },
  { a: "servers", b: "cloud", bend: 14 },
  { a: "endpoints", b: "servers", bend: -20 },
  { a: "tickets", b: "servers", bend: 28 },
  { a: "endpoints", b: "cloud", bend: 34, bad: true },
]

/** As handed back: one bus, everything hung off it, nothing crossing. */
const ORDER: Node[] = [
  { id: "identity", label: "Logins", x: 18, y: 236, did: "SSO · MFA · RBAC" },
  { id: "endpoints", label: "Laptops", x: 136, y: 236, did: "Intune · Jamf" },
  { id: "servers", label: "Servers", x: 254, y: 236, did: "patched in CI" },
  { id: "cloud", label: "Cloud", x: 372, y: 236, did: "IaC, reviewed" },
  { id: "network", label: "Network", x: 18, y: 310, did: "segmented" },
  { id: "monitor", label: "Monitor", x: 136, y: 310, did: "alerts first" },
  { id: "tickets", label: "Tickets", x: 254, y: 310, did: "auto-routed" },
  { id: "users", label: "People", x: 372, y: 310, did: "self-service" },
]

/**
 * Four things he has genuinely walked into, and the four things he replaced
 * them with — paired in order, so the left of a line and the right of it are
 * the same problem before and after. Named in the tools he actually runs,
 * because "improved security posture" is what a CV says and "Entra ID with
 * AD tiering" is what the work was.
 */
const FOUND = [
  "shared Domain Admin, kept in a spreadsheet",
  "patched by hand, when someone remembers",
  "no monitoring — users are the alarm",
  "one flat VLAN, rules typed at the firewall",
]

const LEFT_BEHIND = [
  "Entra ID and AD tiering, RBAC, MFA",
  "Intune, Jamf and Autopilot rings",
  "Grafana and Datadog page me first",
  "Fortinet segmented, rules in Terraform",
]

const at = (set: Node[], id: string) => set.find((n) => n.id === id)!

/** Where a run sits vertically, which is when the comb reaches it. */
function midY(a: Node, b: Node) {
  return (a.y + b.y) / 2 + NH / 2
}

/**
 * A lazy curve between two boxes — the kind of cable run nobody planned.
 * Passing 0 gives the same path dead straight, and because the command
 * structure is identical the two interpolate: the run really does straighten
 * rather than cross-fading into a different shape.
 */
function bend(a: Node, b: Node, amount: number) {
  const ax = a.x + NW / 2
  const ay = a.y + NH / 2
  const bx = b.x + NW / 2
  const by = b.y + NH / 2
  const dx = bx - ax
  const dy = by - ay
  const len = Math.hypot(dx, dy) || 1
  return `M${ax} ${ay} Q${(ax + bx) / 2 - (dy / len) * amount} ${
    (ay + by) / 2 + (dx / len) * amount
  } ${bx} ${by}`
}

/** Everything above is pulled down into the waist. This is the funnel. */
function intoWaist(n: Node) {
  const x = n.x + NW / 2
  const y = n.y + NH
  return `M${x} ${y} C${x} ${y + 36} ${WAIST_MID} ${WAIST_TOP - 34} ${WAIST_MID} ${WAIST_TOP}`
}

function Box({ n, mess, struck }: { n: Node; mess?: boolean; struck?: boolean }) {
  return (
    <g transform={n.r ? `rotate(${n.r} ${n.x + NW / 2} ${n.y + NH / 2})` : undefined}>
      <rect
        x={n.x}
        y={n.y}
        width={NW}
        height={NH}
        rx="4"
        fill={mess ? "var(--bg)" : "rgba(255,255,255,0.055)"}
        stroke={
          struck ? "var(--danger)" : mess ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.55)"
        }
        strokeWidth="1"
        strokeDasharray={struck ? "3 2" : undefined}
      />
      <text
        x={n.x + NW / 2}
        y={n.y + NH / 2 + 3.2}
        textAnchor="middle"
        fontSize="12.5"
        className="mono"
        letterSpacing="0.02em"
        fill={struck ? "var(--danger)" : mess ? "rgba(255,255,255,0.5)" : "var(--text)"}
      >
        {n.label}
      </text>
      {/* The quiet layer: what was actually done to this one. The eight of
          them together are the change, item by item, rather than a claim. */}
      {n.did && (
        <text
          x={n.x + NW / 2}
          y={n.y + NH + 14}
          textAnchor="middle"
          fontSize="9.5"
          className="mono"
          letterSpacing="0.03em"
          fill="rgba(255,255,255,0.4)"
        >
          {n.did}
        </text>
      )}
    </g>
  )
}

export function ChaosToOrder() {
  return (
    <div className="hero-figure w-full">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="eyebrow">Bring me the chaos</span>
        <span className="mono text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          IN AT THE TOP · OUT AT THE BOTTOM
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="One figure in three parts. At the top, an estate as found: people, logins, tickets, network, servers, cloud, laptops and monitoring, cross-wired by eleven runs that nobody planned, with monitoring crossed out because there is none. Every one of those runs is drawn down into a single band in the middle marked Muhammad Hammad. Out of the bottom of that band comes one backbone, and the same eight things hang off it in order with nothing crossing, plus a loop from monitoring to tickets that closes them before anyone raises one."
      >
        <defs>
          {/* A band of light rather than a travelling dot: the system is
              being checked across, not a packet being couriered. */}
          <linearGradient id="sweep" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0; 1 0"
              dur={`${BEAT}s`}
              repeatCount="indefinite"
            />
          </linearGradient>

          {/*
            The tangle above has real presence because the runs that are
            wrong are hot. The rebuilt half needs presence of its own or the
            figure is top-heavy, and it cannot borrow a second colour — the
            page only ever spends one. So it gets light instead of heat: a
            pool of it around the backbone, and a bloom on the backbone
            itself, so the bottom reads as lit rather than merely tidy.
          */}
          <marker id="loopHead" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0 0 L5 2.5 L0 5 z" fill="rgba(255,255,255,0.6)" />
          </marker>
          <linearGradient id="combLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="busGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.09" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id="bloom" x="-30%" y="-400%" width="160%" height="900%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Above the waist: the estate as found ── */}
        {MESS_LINKS.map((l, i) => (
          <path
            key={i}
            className={`tangle-in seethe${l.bad ? " seethe-hot" : ""}`}
            style={{
              animationDelay: `${0.18 + i * 0.05}s, ${(i % 5) * 0.7}s`,
              // No two runs agree on a period, so the bundle never finds a
              // rhythm and never looks like it has settled.
              animationDuration: `0.9s, ${5.2 + (i % 4) * 1.3}s`,
            }}
            pathLength={1}
            d={bend(at(MESS, l.a), at(MESS, l.b), l.bend)}
            fill="none"
            stroke={l.bad ? "var(--danger)" : "rgba(255,255,255,0.2)"}
            strokeWidth={l.bad ? 1.1 : 1}
          >
            {/* The comb reaches this run at its own height, and for a moment
                it is straight. Then the comb moves on and it goes back to
                being what it was, because one pass does not fix an estate —
                that is what the half below is for. */}
            <animate
              attributeName="d"
              dur={`${BEAT}s`}
              repeatCount="indefinite"
              begin={`${(
                (midY(at(MESS, l.a), at(MESS, l.b)) / WAIST_TOP) * BEAT -
                BEAT
              ).toFixed(2)}s`}
              calcMode="spline"
              keyTimes="0;0.34;0.46;0.6;1"
              keySplines="0.4 0 0.6 1;0.2 0 0.2 1;0.3 0 0.7 1;0.4 0 0.6 1"
              values={[
                bend(at(MESS, l.a), at(MESS, l.b), l.bend),
                bend(at(MESS, l.a), at(MESS, l.b), l.bend),
                bend(at(MESS, l.a), at(MESS, l.b), 0),
                bend(at(MESS, l.a), at(MESS, l.b), l.bend),
                bend(at(MESS, l.a), at(MESS, l.b), l.bend),
              ].join(";")}
            />
          </path>
        ))}

        {/* Every run is pulled down into him. */}
        {MESS.map((n, i) => (
          <path
            key={`f-${n.id}`}
            className="tangle-in"
            style={{ animationDelay: `${0.62 + i * 0.035}s` }}
            pathLength={1}
            d={intoWaist(n)}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
        ))}

        {/* The pass itself. It is the only thing in the top half that knows
            where it is going, which is rather the point. */}
        <g className="comb">
          <path
            d={`M6 0 H${W - 6}`}
            stroke="url(#combLine)"
            strokeWidth="1.2"
            fill="none"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; 0 ${WAIST_TOP}`}
              dur={`${BEAT}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>

        {MESS.map((n) => (
          <Box key={n.id} n={n} mess struck={n.id === "monitor"} />
        ))}

        {/* The queue that only ever gets longer. */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            className="queue-bar"
            style={{ animationDelay: `${i * 1.4}s` }}
            x={404 + i * 1.5}
            y={32 + i * 4.5}
            width={50 - i * 2}
            height={3}
            rx="1"
            fill="none"
            stroke="var(--danger-line)"
            strokeWidth="0.8"
          />
        ))}

        <text
          className="mono"
          x={4}
          y={WAIST_TOP - 14}
          fontSize="9"
          letterSpacing="0.16em"
          fill="rgba(229,72,77,0.7)"
        >
          AS FOUND
        </text>
        <text
          className="mono"
          x={4}
          y={WAIST_TOP + WAIST_H + 20}
          fontSize="9"
          letterSpacing="0.16em"
          fill="rgba(255,255,255,0.4)"
        >
          AS HANDED BACK
        </text>

        {/* ── The waist: him ── */}
        <rect
          x={WAIST_X}
          y={WAIST_TOP}
          width={WAIST_W}
          height={WAIST_H}
          rx="7"
          fill="var(--bg-card)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />
        {/*
          ── The door does the work ──

          Every run that arrives is taken through six steps, and the six light
          in order on the same clock the backbone below runs on. So the figure
          is one machine end to end: the tangle arrives out of time, it is
          worked a step at a time, and what leaves is in rhythm. Watching the
          steps fire is watching the method, not an effect.
        */}
        {METHOD.map((step, i) => (
          <text
            key={step}
            className="mono method-step"
            style={{ animationDelay: `${((i * BEAT) / METHOD.length).toFixed(2)}s` }}
            x={slotMid(i)}
            y={WAIST_TOP + 20}
            textAnchor="middle"
            fontSize="9.5"
            letterSpacing="0.07em"
          >
            {step}
          </text>
        ))}
        {/* The separators stay put so the steps read as one sequence. */}
        {METHOD.slice(1).map((step, i) => (
          <text
            key={`sep-${step}`}
            x={SLOT_X0 + SLOT_W * (i + 1)}
            y={WAIST_TOP + 20}
            textAnchor="middle"
            fontSize="9.5"
            fill="rgba(255,255,255,0.22)"
          >
            ·
          </text>
        ))}

        <path
          d={`M${SLOT_X0} ${WAIST_TOP + 28} H${WAIST_X + WAIST_W - 16}`}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        {/* One pass, drawn as it happens. */}
        <path
          className="method-pass"
          d={`M${SLOT_X0} ${WAIST_TOP + 28} H${WAIST_X + WAIST_W - 16}`}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          pathLength={1}
        />

        <text
          x={WAIST_MID}
          y={WAIST_TOP + 41}
          textAnchor="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.46)"
        >
          the fix that stops it coming back, not the one that closes the ticket
        </text>

        {/* ── Below the waist: one backbone, everything in order ── */}
        <ellipse
          cx={W / 2}
          cy={BUS_Y}
          rx={W / 2 - 4}
          ry={60}
          fill="url(#busGlow)"
          className="bus-glow"
        />
        <path
          className="order-in"
          style={{ animationDelay: "0.95s" }}
          pathLength={1}
          d={`M${WAIST_MID} ${WAIST_TOP + WAIST_H} V${BUS_Y}`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.4"
          fill="none"
        />
        {/* Drawn from the middle outwards in both directions at once, so the
            backbone reads as power coming up through a grid rather than a
            line being swept across one. */}
        <path
          className="order-in"
          style={{ animationDelay: "1.05s" }}
          pathLength={1}
          d={`M${WAIST_MID} ${BUS_Y} H12`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          className="order-in"
          style={{ animationDelay: "1.05s" }}
          pathLength={1}
          d={`M${WAIST_MID} ${BUS_Y} H${W - 14}`}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.4"
          fill="none"
        />
        {/*
          ── The estate keeps time ──

          A well-run system is not a dead one. Checks poll, patches land in
          their window, backups run: it has a pulse, and the pulse is regular.
          So a band of light crosses the backbone on a fixed period and each
          thing hanging off it brightens exactly as the light reaches it —
          one clock, everything in step.

          That is the real opposite of the tangle above, which is not still
          either: up there nothing agrees on a period and it never settles.
          Noise against rhythm, rather than motion against stillness.
        */}
        <path
          className="order-in"
          style={{ animationDelay: "1.05s" }}
          pathLength={1}
          d={`M12 ${BUS_Y} H${W - 12}`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
          fill="none"
          filter="url(#bloom)"
        />
        <path
          className="sys-sweep"
          d={`M12 ${BUS_Y} H${W - 12}`}
          stroke="url(#sweep)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          filter="url(#bloom)"
        />
        {ORDER.map((n) => {
          const cx = n.x + NW / 2
          const top = n.y < BUS_Y
          // In phase with the sweep: a drop lights when the light arrives.
          const phase = ((cx - 12) / (W - 24)) * BEAT
          // The wave takes 0.45s to cross half the figure, so a node lights
          // when it is actually reached, not on a decorative stagger.
          const reach = 1.08 + (Math.abs(cx - WAIST_MID) / (W / 2 - 12)) * 0.45
          return (
            <g key={n.id}>
              <path
                className="order-in"
                style={{ animationDelay: `${reach.toFixed(2)}s` }}
                pathLength={1}
                d={`M${cx} ${top ? n.y + NH : n.y} V${BUS_Y}`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                fill="none"
              />
              <path
                className="sys-drop"
                style={{ animationDelay: `${phase.toFixed(2)}s` }}
                d={`M${cx} ${top ? n.y + NH : n.y} V${BUS_Y}`}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          )
        })}
        {/*
          ── The loop that closes itself ──

          Monitoring raises and clears the thing before a person ever opens a
          ticket about it. It is the one run in the lower half that is dashed,
          because like the estate's own background work it happens on its own,
          and it is the only one that moves — so it is also the clearest proof
          that the quiet half is running rather than merely drawn.
        */}
        <path
          className="loop-flow"
          d={`M${at(ORDER, "tickets").x + NW / 2} ${at(ORDER, "tickets").y + NH} V374 H${
            at(ORDER, "monitor").x + NW / 2
          } V${at(ORDER, "monitor").y + NH}`}
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          fill="none"
          markerEnd="url(#loopHead)"
        />
        <text
          className="mono"
          x={(at(ORDER, "monitor").x + at(ORDER, "tickets").x) / 2 + NW / 2}
          y={387}
          textAnchor="middle"
          fontSize="8.5"
          letterSpacing="0.08em"
          fill="rgba(255,255,255,0.45)"
        >
          CLOSED BEFORE ANYONE RAISES ONE
        </text>

        {ORDER.map((n) => (
          <Box key={n.id} n={n} />
        ))}
      </svg>

      {/*
        Each failure sits on the same row as the thing that replaced it, so
        the transformation reads across rather than being inferred from two
        separate lists. Four rows, four changes, before and after.
      */}
      <div className="pairs">
        <div className="half-tag" style={{ color: "var(--danger)" }}>
          What I walk into
        </div>
        <div className="half-tag">What I hand back</div>
        {FOUND.map((f, i) => (
          <Fragment key={f}>
            <div className="pair-line pair-bad">
              <span>×</span>
              {f}
            </div>
            <div className="pair-line pair-good">
              <span>✓</span>
              {LEFT_BEHIND[i]}
            </div>
          </Fragment>
        ))}
      </div>

      {/*
        ── And the direction ──
        The only forward-looking claim on the page, and not a wish: the
        assistant exists and already answers out of tickets already solved.
      */}
      <div className="next-band">
        <span className="mono next-tag">NEXT</span>
        <div className="min-w-0">
          <div className="next-title">Answer it before it becomes a ticket</div>
          <div className="next-sub">
            Infotech-Wizard — FAISS retrieval over 3,531 resolved tickets, local LLM, on-prem
          </div>
        </div>
      </div>

      <p className="hats">
        <span className="mono" style={{ color: "var(--text-muted)" }}>HATS · </span>
        Help desk · Service desk · L1–L3 · SysAdmin · Network · Security · SRE · Cloud · DevOps
      </p>
    </div>
  )
}
