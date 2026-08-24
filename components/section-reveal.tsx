"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const BINARY_CHARS = "01アイウエオカキクケコサシスセソ█▓▒░"

function DataStreamText() {
  const [text, setText] = useState("")
  const len = 48

  useEffect(() => {
    let frame = 0
    const iv = setInterval(() => {
      setText(
        Array.from({ length: len }, () =>
          BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)]
        ).join("")
      )
      frame++
      if (frame > 18) clearInterval(iv)
    }, 55)
    return () => clearInterval(iv)
  }, [])

  return (
    <span className="data-stream-text select-none" aria-hidden="true">
      {text}
    </span>
  )
}

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionReveal({ children, className = "", id }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [triggered, setTriggered] = useState(false)
  const [showStream, setShowStream] = useState(false)

  useEffect(() => {
    if (inView && !triggered) {
      setTriggered(true)
      setShowStream(true)
      setTimeout(() => setShowStream(false), 1400)
    }
  }, [inView, triggered])

  return (
    <div ref={ref} className={`relative ${className}`} id={id}>
      {/* Data stream bar sweeps across top of section */}
      {showStream && (
        <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none z-10" style={{ height: 28 }}>
          <div className="data-stream-bar" />
          <div className="flex items-center justify-center mt-1">
            <DataStreamText />
          </div>
        </div>
      )}

      {/* Section content fades + slides up */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
