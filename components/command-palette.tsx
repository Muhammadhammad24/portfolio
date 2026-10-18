"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Copy,
  Search,
} from "lucide-react"
import { GitHubMark, GmailMark, LinkedInMark, PhoneMark } from "@/components/brand-marks"

type Command = {
  id: string
  label: string
  hint: string
  group: "Navigate" | "Contact" | "Links"
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  run: (ctx: { close: () => void; markCopied: (id: string) => void }) => void
}

import { scrollToSection } from "@/components/smooth-scroll"

const EMAIL = "muhammad24997@gmail.com"
const PHONE = "+49 176 8733 3721"

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

// navigator.clipboard is undefined outside a secure context, so fall back to
// the old execCommand path rather than letting the copy silently throw.
function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {})
    return
  }
  const ta = document.createElement("textarea")
  ta.value = text
  ta.setAttribute("readonly", "")
  ta.style.position = "fixed"
  ta.style.opacity = "0"
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand("copy")
  } catch {
    /* nothing else we can do */
  }
  document.body.removeChild(ta)
}

const COMMANDS: Command[] = [
  ...[
    { id: "about", label: "About", hint: "Background and education" },
    { id: "skills", label: "Skills", hint: "Tools and proficiency" },
    { id: "projects", label: "Projects", hint: "Things I have built" },
    { id: "experience", label: "Experience", hint: "Seven roles since 2019" },
    { id: "contact", label: "Contact", hint: "Send a message" },
  ].map(
    (s): Command => ({
      id: `go-${s.id}`,
      label: s.label,
      hint: s.hint,
      group: "Navigate",
      icon: ArrowRight,
      run: ({ close }) => {
        close()
        scrollToSection(s.id)
      },
    }),
  ),
  {
    id: "copy-email",
    label: "Copy email address",
    hint: EMAIL,
    group: "Contact",
    icon: Copy,
    run: ({ markCopied }) => {
      copyText(EMAIL)
      markCopied("copy-email")
    },
  },
  {
    id: "mail",
    label: "Send an email",
    hint: EMAIL,
    group: "Contact",
    icon: GmailMark,
    run: ({ close }) => {
      close()
      window.location.href = `mailto:${EMAIL}`
    },
  },
  {
    id: "copy-phone",
    label: "Copy phone number",
    hint: PHONE,
    group: "Contact",
    icon: PhoneMark,
    run: ({ markCopied }) => {
      copyText(PHONE)
      markCopied("copy-phone")
    },
  },
  {
    id: "github",
    label: "GitHub",
    hint: "github.com/Muhammadhammad24",
    group: "Links",
    icon: GitHubMark,
    run: ({ close }) => {
      close()
      openExternal("https://github.com/Muhammadhammad24")
    },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "linkedin.com/in/mhammad24",
    group: "Links",
    icon: LinkedInMark,
    run: ({ close }) => {
      close()
      openExternal("https://www.linkedin.com/in/mhammad24/")
    },
  },
]

export function CommandPalette() {
  // Held so a second copy cancels the first, and unmounting cancels both.
  const copyTimer = useRef<number | null>(null)
  useEffect(() => () => {
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
  }, [])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [cursor, setCursor] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [])
  const markCopied = useCallback((id: string) => {
    setCopied(id)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(null), 1400)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q) || c.group.toLowerCase().includes(q),
    )
  }, [query])

  // Global shortcut. Escape is handled here rather than on the search field
  // because focus can be on any row by then, and the panel shows an "esc" cap.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Reset + lock scroll while open
  useEffect(() => {
    if (!open) return
    setQuery("")
    setCursor(0)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    // Whatever opened the panel gets focus back, but only once the panel has
    // finished animating out — restoring it earlier is undone when React
    // removes the still-focused search field.
    opener.current = document.activeElement as HTMLElement | null
    const id = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(id)
    }
  }, [open])

  // Keep the highlighted row in range when the query narrows the list
  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(results.length - 1, 0)))
  }, [results.length])

  // The list scrolls, so arrowing past its bottom edge has to bring the row
  // along rather than highlighting something nobody can see.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-row="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [cursor])

  // Tab must cycle inside the panel: behind it the page is dimmed and scroll
  // locked, so focus that walks out of the dialog has no way back in.
  function onDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>("input, button")
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setCursor((c) => (results.length ? (c + 1) % results.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      results[cursor]?.run({ close, markCopied })
    }
  }

  let lastGroup = ""

  return (
    <>
      {/* Trigger — also tells people the shortcut exists */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[14px] transition-colors duration-200"
        style={{
          background: "var(--nav-bg)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
        }}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Quick menu</span>
        <kbd
          className="hidden rounded px-1.5 py-0.5 text-[12.5px] sm:inline"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          ⌘K
        </kbd>
      </button>

      <AnimatePresence onExitComplete={() => opener.current?.focus?.()}>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onMouseDown={close}
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={onDialogKeyDown}
              className="w-full max-w-lg overflow-hidden rounded-2xl"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-dark)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-3 px-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Jump to a section, copy my email…"
                  className="w-full bg-transparent py-4 text-[15px] outline-none"
                  style={{ color: "var(--text)" }}
                />
                <kbd
                  className="shrink-0 rounded px-1.5 py-0.5 text-[12.5px]"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  esc
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <div className="px-3 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                    Nothing matches “{query}”.
                  </div>
                )}

                {results.map((cmd, i) => {
                  const Icon = cmd.icon
                  const showGroup = cmd.group !== lastGroup
                  lastGroup = cmd.group
                  const activeRow = i === cursor
                  return (
                    <div key={cmd.id}>
                      {showGroup && (
                        <div
                          className="px-3 pb-1.5 pt-3 text-[12.5px] font-medium uppercase"
                          style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
                        >
                          {cmd.group}
                        </div>
                      )}
                      <button
                        data-row={i}
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => cmd.run({ close, markCopied })}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left"
                        style={{ background: activeRow ? "rgba(255,255,255,0.06)" : "transparent" }}
                      >
                        <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm" style={{ color: "var(--text)" }}>
                            {cmd.label}
                          </span>
                          <span className="block truncate text-[13px]" style={{ color: "var(--text-muted)" }}>
                            {cmd.hint}
                          </span>
                        </span>
                        {copied === cmd.id && (
                          <span className="flex shrink-0 items-center gap-1 text-[13px]" style={{ color: "var(--accent)" }}>
                            <Check className="h-3.5 w-3.5" /> Copied
                          </span>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
