"use client"

import { useEffect, useRef, useState } from "react"
import { LAND } from "./world-land"

/**
 * An orthographic globe: the real Earth, projected onto a sphere and spun.
 * Land outlines are the 110m world atlas reduced to ~1k points, so the whole
 * thing re-projects every frame without a WebGL context or a map library.
 *
 * The depth is geometry rather than a drop shadow: points on the far
 * hemisphere are culled, the lighting terminator is a second sphere offset
 * toward the light, and the route between the two cities follows the actual
 * great circle, dipping behind the limb when it passes round the back.
 *
 * Colour note: the rest of the site is black and grey and its accent is white.
 * This component is the deliberate exception — it is the Earth, so it gets the
 * Earth's colours: deep ocean, green land, a blue atmosphere on the limb. They
 * are literals rather than theme tokens for exactly that reason.
 *
 * The route itself stays white, the same accent the rest of the page uses. A
 * second colour competing with the planet is what made it look decorated; one
 * white line over a blue world reads as drawn on it.
 */

const R = 100 // sphere radius in viewBox units
const TILT = 16 // camera latitude, degrees — looks down on the northern route
const DEG = Math.PI / 180

export type Marker = {
  label: string
  lat: number
  lon: number
  kind: "origin" | "home"
}

const rot = (lon: number, lat: number, lam: number) => {
  const l = (lon + lam) * DEG
  const p = lat * DEG
  const p0 = TILT * DEG
  const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)
  return {
    x: R * Math.cos(p) * Math.sin(l),
    y: -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)),
    visible: cosc > 0,
  }
}

/** Runs of consecutive visible points, as SVG subpaths. */
function ringPath(ring: [number, number][], lam: number) {
  let d = ""
  let open = false
  for (const [lon, lat] of ring) {
    const p = rot(lon, lat, lam)
    if (!p.visible) {
      open = false
      continue
    }
    d += `${open ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    open = true
  }
  return d
}

const unit = (lat: number, lon: number) => [
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
]

/** Spherical interpolation: the point t of the way along the great circle. */
function along(a: Marker, b: Marker, t: number) {
  const p1 = unit(a.lat, a.lon)
  const p2 = unit(b.lat, b.lon)
  const dot = p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2]
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)))
  const s1 = Math.sin((1 - t) * omega) / Math.sin(omega)
  const s2 = Math.sin(t * omega) / Math.sin(omega)
  const x = s1 * p1[0] + s2 * p2[0]
  const y = s1 * p1[1] + s2 * p2[1]
  const z = s1 * p1[2] + s2 * p2[2]
  return {
    lat: Math.asin(z / Math.hypot(x, y, z)) / DEG,
    lon: Math.atan2(y, x) / DEG,
  }
}

/** Great-circle route, sampled and cut where it goes behind the planet. */
function arcPath(a: Marker, b: Marker, lam: number) {
  const steps = 72
  const front: string[] = []
  const back: string[] = []
  let frontOpen = false
  let backOpen = false

  for (let i = 0; i <= steps; i++) {
    const { lat, lon } = along(a, b, i / steps)
    const p = rot(lon, lat, lam)
    if (p.visible) {
      front.push(`${frontOpen ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      frontOpen = true
      backOpen = false
    } else {
      back.push(`${backOpen ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      backOpen = true
      frontOpen = false
    }
  }
  return { front: front.join(""), back: back.join("") }
}

/** Meridians and parallels every 20°, same culling as the land. */
function graticule(lam: number) {
  let d = ""
  for (let lon = -180; lon < 180; lon += 20) {
    const ring: [number, number][] = []
    for (let lat = -80; lat <= 80; lat += 5) ring.push([lon, lat])
    d += ringPath(ring, lam)
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const ring: [number, number][] = []
    for (let lon = -180; lon <= 180; lon += 5) ring.push([lon, lat])
    d += ringPath(ring, lam)
  }
  return d
}

/**
 * Centred between the two cities, so the route faces the viewer at rest.
 * The idle motion is a slow swing around that longitude rather than a full
 * spin: a globe that keeps turning shows the empty Pacific half the time.
 * Dragging overrides it and can take the planet all the way round.
 */
const HOME_LON = -38
const SWING = 34 // degrees either side

export function Globe({ markers, className = "" }: { markers: Marker[]; className?: string }) {
  const [lam, setLam] = useState(HOME_LON)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ x: number; lam: number } | null>(null)
  const paused = useRef(false)
  // Where the swing resumes from, so a drag does not snap the planet back.
  const base = useRef(HOME_LON)
  const phase = useRef(0)
  // Progress of the pulse along the route, 0 → 1 with a pause before repeating.
  const trip = useRef(0)
  const [, setTick] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      // The pulse keeps travelling even while the planet is held still.
      trip.current = (trip.current + dt * 0.00018) % 1.35
      if (!paused.current) {
        phase.current += dt * 0.00013
        // Ease the parked longitude back toward home after a drag.
        base.current += (HOME_LON - base.current) * Math.min(1, dt * 0.0008)
        setLam(base.current + Math.sin(phase.current) * SWING)
      } else {
        setTick((n) => n + 1)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, lam }
    paused.current = true
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    setLam(drag.current.lam + (e.clientX - drag.current.x) * 0.45)
  }
  const onUp = () => {
    if (drag.current) {
      // Resume the swing from wherever the drag left the planet.
      base.current = lam
      phase.current = 0
    }
    drag.current = null
    paused.current = false
    setDragging(false)
  }

  const land = LAND.map((ring) => ringPath(ring, lam)).join("")
  const grid = graticule(lam)
  const route = markers.length >= 2 ? arcPath(markers[0], markers[1], lam) : null

  return (
    <svg
      viewBox="-130 -130 260 260"
      className={`w-full select-none ${className}`}
      style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
      role="img"
      aria-label="Rotating globe showing the route from Karachi to Göttingen"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        if (!drag.current) paused.current = false
      }}
    >
      <defs>
        {/* Ocean: lit from the upper left, falling off to the night side. */}
        <radialGradient id="g-ocean" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#1B3C6B" />
          <stop offset="48%" stopColor="#0E2142" />
          <stop offset="100%" stopColor="#05091A" />
        </radialGradient>
        {/* The limb catching light is what sells the curvature. */}
        <radialGradient id="g-limb" cx="50%" cy="50%" r="50%">
          <stop offset="86%" stopColor="rgba(92,196,255,0)" />
          <stop offset="97%" stopColor="rgba(92,196,255,0.34)" />
          <stop offset="100%" stopColor="rgba(186,236,255,0.72)" />
        </radialGradient>
        {/* Atmosphere bleeding past the edge. */}
        <radialGradient id="g-atmo" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="rgba(72,170,255,0)" />
          <stop offset="88%" stopColor="rgba(72,170,255,0.18)" />
          <stop offset="100%" stopColor="rgba(72,170,255,0)" />
        </radialGradient>
        <radialGradient id="g-spec" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id="clip-sphere">
          <circle cx="0" cy="0" r={R} />
        </clipPath>
        <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Atmosphere, outside the sphere */}
      <circle cx="0" cy="0" r={R * 1.22} fill="url(#g-atmo)" />

      {/* The planet */}
      <circle cx="0" cy="0" r={R} fill="url(#g-ocean)" />

      <g clipPath="url(#clip-sphere)">
        <path d={grid} fill="none" stroke="rgba(120,170,220,0.16)" strokeWidth="0.5" />

        <path
          d={land}
          fill="rgba(96,152,104,0.30)"
          stroke="rgba(150,206,158,0.62)"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />

        {/* Night side: a second sphere nudged away from the light. */}
        <circle cx={R * 0.52} cy={R * 0.42} r={R * 1.12} fill="rgba(2,5,14,0.50)" />

        {/* The leg of the route that is round the back */}
        {route?.back && (
          <path d={route.back} fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1" strokeDasharray="3 3" />
        )}
      </g>

      {/* Specular highlight and lit limb sit above the land */}
      <circle cx="0" cy="0" r={R} fill="url(#g-spec)" pointerEvents="none" />
      <circle cx="0" cy="0" r={R} fill="url(#g-limb)" pointerEvents="none" />

      {/* The route across the near side, drawn over the planet */}
      {route?.front && (
        <path
          d={route.front}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          filter="url(#f-glow)"
        />
      )}

      {/* A pulse running Karachi → Göttingen, the way the career did */}
      {markers.length >= 2 &&
        (() => {
          const t = Math.min(1, trip.current)
          if (t >= 1) return null
          const { lat, lon } = along(markers[0], markers[1], t)
          const p = rot(lon, lat, lam)
          if (!p.visible) return null
          return (
            <circle
              cx={p.x.toFixed(1)}
              cy={p.y.toFixed(1)}
              r="2"
              fill="#FFFFFF"
              filter="url(#f-glow)"
              opacity={Math.sin(t * Math.PI) * 0.9 + 0.1}
            />
          )
        })()}

      {/* Cities */}
      {markers.map((m) => {
        const p = rot(m.lon, m.lat, lam)
        if (!p.visible) return null
        const home = m.kind === "home"
        return (
          <g key={m.label} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            {home && (
              <circle r="3" fill="none" stroke="#FFFFFF" strokeWidth="1">
                <animate attributeName="r" values="3;11" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={home ? 3 : 2.4} fill={home ? "#FFFFFF" : "rgba(226,240,255,0.92)"} filter="url(#f-glow)" />
            <text
              y={home ? -8 : 13}
              textAnchor="middle"
              fontSize="8"
              fill={home ? "#FFFFFF" : "rgba(214,228,244,0.86)"}
              style={{ letterSpacing: "0.02em" }}
            >
              {m.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
