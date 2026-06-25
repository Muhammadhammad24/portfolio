"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MouseFollower() {
  // Motion values update WITHOUT triggering React re-renders (key perf win)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { damping: 18, stiffness: 200, mass: 0.6 })
  const ringY = useSpring(y, { damping: 18, stiffness: 200, mass: 0.6 })
  const dotX = useSpring(x, { damping: 25, stiffness: 500 })
  const dotY = useSpring(y, { damping: 25, stiffness: 500 })

  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    // Only run on devices with a real (fine) pointer — skip phones/tablets entirely
    if (typeof window === "undefined") return
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    window.addEventListener("mousemove", move, { passive: true })
    document.body.addEventListener("mouseleave", leave)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      document.body.removeEventListener("mouseleave", leave)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-10 h-10 rounded-full"
        style={{
          border: '1px solid var(--border-hot)',
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.6 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full"
        style={{
          background: 'var(--green)', boxShadow: '0 0 6px var(--green)',
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}
