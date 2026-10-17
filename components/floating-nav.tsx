"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { scrollToSection, scrollToY } from "@/components/smooth-scroll"

const NAV_ITEMS = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
]

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState("")
  const isMobile = useMobile()
  // While our own scroll is in flight the observer would fire for every
  // section it passes, and each pill move forces a layout read mid-scroll.
  const travelling = useRef(false)

  // Highlight whichever section is currently in view.
  useEffect(() => {
    const ids = [...NAV_ITEMS.map((i) => i.id), "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible && !travelling.current) setActive(visible.target.id)
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // The pill lands on the destination straight away, then the observer is
  // let back in once the travel is over. Called from a real anchor, so a
  // click still reaches the section if this handler never runs.
  function goTo(e: React.MouseEvent, id: string) {
    // Let the browser handle a modified click (new tab, new window).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    travelling.current = true
    setActive(id)
    scrollToSection(id)
    history.replaceState(null, "", `#${id}`)
    window.setTimeout(() => {
      travelling.current = false
    }, 700)
  }

  return (
    <>
      <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <div
          className="rounded-full px-2 py-2"
          style={{
            background: "var(--nav-bg)",
            border: "1px solid var(--border)",
          }}
        >
          {isMobile ? (
            <div className="flex items-center gap-3 px-2">
              <span className="text-[15px] font-semibold" style={{ color: "var(--text)" }}>
                MH
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                style={{ color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer" }}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollToY(0)}
                className="px-3 text-[15px] font-semibold"
                style={{ color: "var(--text)", background: "none", border: "none", cursor: "pointer" }}
              >
                MH
              </button>

              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  className="relative rounded-full px-4 py-1.5 text-[14.5px] no-underline transition-colors duration-200"
                  style={{
                    color: active === item.id ? "var(--text)" : "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => goTo(e, "contact")}
                className="group ml-2 flex items-center gap-2 rounded-full py-1 pl-4 pr-1 text-[14.5px] font-medium no-underline transition-colors duration-200"
                style={{
                  background: "var(--accent)",
                  color: "var(--on-accent)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Contact
                <span className="btn-chev btn-chev-sm">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(9,9,11,0.96)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="space-y-6 text-center">
              {[...NAV_ITEMS, { name: "Contact", id: "contact" }].map((item) => (
                <div key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      setIsOpen(false)
                      goTo(e, item.id)
                    }}
                    className="text-2xl font-medium no-underline"
                    style={{ color: "var(--text)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
