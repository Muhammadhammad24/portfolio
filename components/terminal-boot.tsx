"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_LINES = [
  { text: "> initializing profile...",         delay: 0,    duration: 600 },
  { text: "> loading credentials...",          delay: 700,  duration: 500 },
  { text: "> verifying clearance level...",    delay: 1300, duration: 700 },
  { text: "> scanning infrastructure...",      delay: 2100, duration: 600 },
  { text: "> ACCESS GRANTED",                  delay: 2800, duration: 400, accent: true },
]

function useTypewriter(text: string, speed = 28, startDelay = 0) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed("")
    setDone(false)
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, speed, startDelay])

  return { displayed, done }
}

function BootLine({ text, accent, lineDelay }: { text: string; accent?: boolean; lineDelay: number }) {
  const [visible, setVisible] = useState(false)
  const [chars, setChars] = useState("")

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      let i = 0
      const iv = setInterval(() => {
        i++
        setChars(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, 22)
      return () => clearInterval(iv)
    }, lineDelay)
    return () => clearTimeout(t)
  }, [text, lineDelay])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className="font-['JetBrains_Mono'] text-xs tracking-wider leading-relaxed"
      style={{ color: accent ? "var(--accent)" : "var(--text-muted)" }}
    >
      {accent && (
        <span style={{ color: "var(--accent)", filter: "drop-shadow(0 0 6px var(--accent))" }}>
          {chars}
        </span>
      )}
      {!accent && (
        <span>
          <span style={{ color: "var(--accent-dim)", opacity: 0.6 }}></span>
          {chars}
          {chars.length < text.length && (
            <span className="animate-pulse" style={{ color: "var(--accent)" }}>█</span>
          )}
        </span>
      )}
    </motion.div>
  )
}

interface TerminalBootProps {
  onComplete: () => void
  skip?: boolean
}

export function TerminalBoot({ onComplete, skip = false }: TerminalBootProps) {
  const [phase, setPhase] = useState<"booting" | "done">("booting")
  const calledRef = useRef(false)

  useEffect(() => {
    if (skip) {
      onComplete()
      return
    }
    // Total boot time = last line delay + its duration + small buffer
    const totalTime = BOOT_LINES[BOOT_LINES.length - 1].delay +
      BOOT_LINES[BOOT_LINES.length - 1].duration + 600

    const t = setTimeout(() => {
      setPhase("done")
      if (!calledRef.current) {
        calledRef.current = true
        onComplete()
      }
    }, totalTime)
    return () => clearTimeout(t)
  }, [onComplete, skip])

  if (phase === "done") return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-1.5 py-2"
    >
      {BOOT_LINES.map((line, i) => (
        <BootLine
          key={i}
          text={line.text}
          accent={line.accent}
          lineDelay={line.delay}
        />
      ))}
    </motion.div>
  )
}

interface HeroNameProps {
  firstName: string
  lastName: string
  bootDone: boolean
}

export function HeroName({ firstName, lastName, bootDone }: HeroNameProps) {
  const first = useTypewriter(firstName, 60, bootDone ? 0 : 99999)
  const last = useTypewriter(lastName, 60, bootDone ? firstName.length * 60 + 120 : 99999)

  return (
    <div style={{ overflow: "visible" }}>
      {/* Eyebrow label — NordLayer style */}
      <div
        className="eyebrow mb-4"
        style={{ color: "var(--lime)", letterSpacing: "0.08em" }}
      >
        IT Specialist
      </div>

      {/* Name — NordLayer H1 style: Inter 700, tight leading */}
      <h1
        style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          overflow: "visible",
          margin: 0,
          padding: 0,
        }}
      >
        {/* First name — white */}
        <span
          className="block"
          style={{
            color: "#ffffff",
            fontSize: "clamp(44px, 7vw, 80px)",
            minHeight: "1.1em",
          }}
        >
          {first.displayed}
          {bootDone && !first.done && (
            <span style={{ color: "var(--lime)", opacity: 0.9 }}>|</span>
          )}
        </span>

        {/* Last name — lime gradient */}
        <span
          className="block gradient-green"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            minHeight: "1.1em",
          }}
        >
          {last.displayed}
          {bootDone && first.done && !last.done && (
            <span
              style={{
                color: "var(--lime)",
                WebkitTextFillColor: "var(--lime)",
                opacity: 0.9,
              }}
            >|</span>
          )}
        </span>
      </h1>
    </div>
  )
}
