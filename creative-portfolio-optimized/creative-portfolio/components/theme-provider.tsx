"use client"

import { useState, useEffect } from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// ---------------------------------------------------------------------------
// ThemeProvider
// Wraps next-themes' ThemeProvider with the project's required configuration:
//   - data-theme attribute (consumed by CSS token layer in globals.css)
//   - defaultTheme="dark"
//   - enableSystem (respects OS prefers-color-scheme on first visit)
// ---------------------------------------------------------------------------
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

// ---------------------------------------------------------------------------
// useTheme
// Re-export of next-themes' useTheme so consumers get `theme` and `setTheme`
// without importing next-themes directly.
// ---------------------------------------------------------------------------
export { useNextTheme as useTheme }

// ---------------------------------------------------------------------------
// useThemeToggle
// Extends useTheme with a `toggleTheme` convenience function and a `mounted`
// guard that prevents hydration mismatches (returns false until client-side
// useEffect has run).
// ---------------------------------------------------------------------------
export function useThemeToggle() {
  const { theme, setTheme, ...rest } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return { theme, setTheme, toggleTheme, mounted, ...rest }
}
