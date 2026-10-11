"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

const EMAIL = "muhammad24997@gmail.com"

export function ContactForm() {
  const [sent, setSent] = useState(false)

  // No backend here, so the message is handed to the visitor's mail client
  // addressed to me — that way nothing silently disappears.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const subject = String(data.get("subject") ?? "")
    const message = String(data.get("message") ?? "")

    const body = `${message}\n\n—\n${name}\n${email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setSent(true)
    form.reset()
    window.setTimeout(() => setSent(false), 6000)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: "0.6rem",
    padding: "0.8rem 1rem",
    fontSize: "0.9rem",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.2s",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className="rounded-2xl p-6"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      <h3 className="mb-6 text-xl font-semibold" style={{ color: "var(--text)" }}>
        Send a message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {[
          { name: "name", type: "text", placeholder: "Your name" },
          { name: "email", type: "email", placeholder: "Email address" },
          { name: "subject", type: "text", placeholder: "Subject" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            aria-label={field.placeholder}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(91,141,239,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        ))}

        <textarea
          name="message"
          placeholder="Your message"
          aria-label="Your message"
          rows={5}
          required
          style={{ ...inputStyle, resize: "none" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(91,141,239,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors duration-200"
          style={{ background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer" }}
        >
          <Send className="h-4 w-4" />
          Send message
        </button>

        <p className="pt-1 text-center text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          {sent ? "Opening your mail app…" : `Opens your mail app · or write to ${EMAIL}`}
        </p>
      </form>
    </motion.div>
  )
}
