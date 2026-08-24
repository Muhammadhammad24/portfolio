"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface StatCounterProps {
  value: string   // e.g. "6+", "500+", "99.2%"
  label: string
}

function parseValue(raw: string): { num: number; suffix: string } {
  // e.g. "6+" → { num: 6, suffix: "+" }
  // "500+" → { num: 500, suffix: "+" }
  // "99.2%" → { num: 99.2, suffix: "%" }
  const match = raw.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: raw }
  return { num: parseFloat(match[1]), suffix: match[2] }
}

function easeOutElastic(t: number): number {
  if (t === 0 || t === 1) return t
  const p = 0.4
  const s = p / 4
  return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1
}

export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState("0")
  const [started, setStarted] = useState(false)

  const { num, suffix } = parseValue(value)
  const isDecimal = num % 1 !== 0

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)

    const duration = 1600
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutElastic(progress)

      // Overshoot: go slightly past target then settle
      const overshoot = progress < 1 ? eased * num * 1.04 : num
      const current = Math.min(overshoot, num * 1.12) // cap overshoot at 12%

      if (isDecimal) {
        setDisplay(Math.min(current, num).toFixed(1))
      } else {
        setDisplay(String(Math.round(Math.min(current, num))))
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        // Settle to exact value
        setDisplay(isDecimal ? num.toFixed(1) : String(Math.round(num)))
      }
    }

    requestAnimationFrame(tick)
  }, [inView, started, num, isDecimal])

  return (
    <div ref={ref} className="text-center group">
      <div
        className="font-['Syne'] text-2xl sm:text-3xl font-bold tabular-nums transition-all duration-300"
        style={{
          color: "var(--accent)",
          textShadow: "0 0 18px rgba(255,255,255,0.65), 0 0 36px rgba(255,255,255,0.28)",
          letterSpacing: "-0.02em",
        }}
      >
        {display}{suffix}
      </div>
      <div
        className="text-[10px] sm:text-xs mt-0.5 font-['JetBrains_Mono'] tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </div>
  )
}
