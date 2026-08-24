"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MouseFollower() {
  const rawX = useMotionValue(-400)
  const rawY = useMotionValue(-400)

  const ringX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.6 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.6 })
  const dotX  = useSpring(rawX, { stiffness: 800, damping: 35 })
  const dotY  = useSpring(rawY, { stiffness: 800, damping: 35 })

  const [visible,  setVisible]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [enabled,  setEnabled]  = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
      const el = e.target as HTMLElement
      setHovering(!!el.closest("a,button,input,textarea,[role='button']"))
    }
    const onLeave = () => setVisible(false)
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)

    window.addEventListener("mousemove",    onMove,  { passive: true })
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("mousedown",    onDown)
    window.addEventListener("mouseup",      onUp)
    return () => {
      window.removeEventListener("mousemove",    onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mousedown",    onDown)
      window.removeEventListener("mouseup",      onUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  const ringSize = clicking ? 18 : hovering ? 38 : 28
  const opacity  = visible ? 1 : 0

  return (
    <>
      {/* Outer ring — smooth lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          opacity,
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width:  ringSize,
            height: ringSize,
            borderColor: hovering ? "#B1EB21" : "rgba(177,235,33,0.55)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            border: "1.5px solid rgba(177,235,33,0.55)",
            boxShadow: hovering ? "0 0 12px rgba(177,235,33,0.30)" : "none",
          }}
        />
      </motion.div>

      {/* Center dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width:  clicking ? 3 : 4,
          height: clicking ? 3 : 4,
          background: "#B1EB21",
          boxShadow: "0 0 6px rgba(177,235,33,0.70)",
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          opacity,
        }}
      />
    </>
  )
}
