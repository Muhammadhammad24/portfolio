"use client"

import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useThemeToggle } from "./theme-provider"

interface ThemeToggleProps {
  className?: string
  style?: React.CSSProperties
}

export function ThemeToggle({ className, style }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useThemeToggle()

  // Avoid layout shift while mounting — render a same-size placeholder
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        style={{ minWidth: 44, minHeight: 44, display: "inline-flex" }}
      />
    )
  }

  const isDark = theme === "dark"
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <button
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 44,
        minHeight: 44,
        padding: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        outline: "none",
        // Focus ring applied via :focus-visible in CSS; also set here for
        // browsers that rely on inline styles as a fallback
        ...style,
      }}
      // Inline focus ring via onFocus/onBlur is fragile — handled via className
      // below and the global CSS in globals.css. The spec requires:
      //   outline: 2px solid var(--border-hot); outline-offset: 2px
      // We apply it through a data attribute so it doesn't fight React synthetic events.
      data-theme-toggle=""
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Sun
              className="h-4 w-4"
              style={{ color: "var(--green)" }}
              aria-hidden="true"
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Moon
              className="h-4 w-4"
              style={{ color: "var(--green)" }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
