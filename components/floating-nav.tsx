"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Shield } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

/**
 * Smooth scroll with easeInOutCubic — feels like an elevator,
 * starts slow, accelerates, then slows into the target.
 * Offset = fixed nav height so section heading is visible.
 */
function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const NAV_OFFSET = 84
  const targetY = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = Math.min(Math.max(Math.abs(distance) * 0.5, 400), 900) // 400–900ms
  let startTime: number | null = null

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * eased)
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState("")
  const isMobile = useMobile()

  const navItems = [
    { name: "About",      id: "about" },
    { name: "Skills",     id: "skills" },
    { name: "Projects",   id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact",    id: "contact" },
  ]

  const handleClick = (id: string, name: string) => {
    setActive(name)
    smoothScrollTo(id)
  }

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div
          className="relative px-5 py-2.5 rounded-full"
          style={{
            background: 'rgba(3,8,3,0.96)',
            border: '1px solid rgba(0,255,65,0.22)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 0 0 1px rgba(0,255,65,0.05), 0 8px 32px rgba(0,0,0,0.7)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-px"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,65,0.5),transparent)' }} />

          {isMobile ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" style={{ color: '#00ff41' }} />
                <span className="font-bold text-sm tracking-widest font-['Syne']" style={{ color: '#00ff41' }}>MH</span>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: 'rgba(0,255,65,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 mr-5">
                <Shield className="h-3.5 w-3.5" style={{ color: '#00ff41', filter: 'drop-shadow(0 0 4px #00ff41)' }} />
                <span className="font-bold text-sm tracking-widest font-['Syne']" style={{ color: '#00ff41' }}>M·H</span>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id, item.name)}
                  className="relative px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-200"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: active === item.name ? '#00ff41' : 'rgba(232,255,232,0.42)',
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  {active === item.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(0,255,65,0.09)', border: '1px solid rgba(0,255,65,0.28)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              ))}

              <button
                onClick={() => handleClick("contact", "Contact")}
                className="btn-cyber ml-3 px-4 py-1.5 text-xs rounded-full"
                style={{ cursor: 'pointer' }}
              >
                Hire Me
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(3,8,3,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-7 text-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => {
                      setActive(item.name)
                      setIsOpen(false)
                      // Small delay so menu closes before scroll starts
                      setTimeout(() => smoothScrollTo(item.id), 350)
                    }}
                    className="text-3xl font-bold tracking-widest font-['Syne']"
                    style={{ color: 'rgba(0,255,65,0.65)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
