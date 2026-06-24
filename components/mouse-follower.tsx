"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener("mousemove", move)
    document.body.addEventListener("mouseleave", leave)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      document.body.removeEventListener("mouseleave", leave)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9998] w-10 h-10 rounded-full"
        style={{ border: '1px solid rgba(0,255,65,0.5)' }}
        animate={{ x: pos.x - 20, y: pos.y - 20, opacity: visible ? 1 : 0, scale: clicking ? 0.6 : 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 200, mass: 0.6 }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full"
        style={{ background: '#00ff41', boxShadow: '0 0 6px #00ff41' }}
        animate={{ x: pos.x - 3, y: pos.y - 3, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      />
    </>
  )
}
