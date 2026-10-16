"use client"

import type React from "react"
import { useState } from "react"
import { Check, Send } from "lucide-react"

const EMAIL = "muhammad24997@gmail.com"

// Web3Forms access keys are public by design — their own docs put them in
// client-side HTML. The browser posts directly because their bot protection
// rejects calls coming from a serverless IP.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

type State = "idle" | "sending" | "sent" | "error"

export function ContactForm() {
  const [state, setState] = useState<State>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    if (!ACCESS_KEY) {
      setError("Email delivery is not configured yet.")
      setState("error")
      return
    }

    // A bot filling the hidden field gets a thank-you and nothing is sent.
    if (String(data.company ?? "").trim()) {
      form.reset()
      setState("sent")
      return
    }

    setState("sending")
    setError("")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: data.subject ? `Portfolio: ${data.subject}` : "Portfolio contact form",
          from_name: data.name,
          replyto: data.email,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })
      const payload = await res.json().catch(() => ({}))

      if (!res.ok || payload.success === false) {
        setError("Could not send right now.")
        setState("error")
        return
      }

      form.reset()
      setState("sent")
    } catch {
      setError("Could not send right now.")
      setState("error")
    }
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
    <div
      className="card p-6"
    >
      <h3 className="mb-6 text-xl font-semibold" style={{ color: "var(--text)" }}>
        Send a message
      </h3>

      {state === "sent" ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{ background: "rgb(var(--accent-rgb) / 0.12)", border: "1px solid rgb(var(--accent-rgb) / 0.45)" }}
          >
            <Check className="h-5 w-5" style={{ color: "var(--accent)" }} />
          </span>
          <p className="font-medium" style={{ color: "var(--text)" }}>
            Thank you for your message.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            It has reached my inbox. I will get back to you shortly.
          </p>
        </div>
      ) : (
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
              required={field.name !== "subject"}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "rgb(var(--accent-rgb) / 0.5)")}
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
            onFocus={(e) => (e.target.style.borderColor = "rgb(var(--accent-rgb) / 0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          {/* Spam trap: hidden from people, tempting to bots */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          <button
            type="submit"
            disabled={state === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-opacity duration-200 disabled:opacity-60"
            style={{ background: "var(--accent)", color: "var(--on-accent)", border: "none", cursor: "pointer" }}
          >
            <Send className="h-4 w-4" />
            {state === "sending" ? "Sending…" : "Send message"}
          </button>

          <p className="pt-1 text-center text-[12.5px]" style={{ color: state === "error" ? "var(--danger)" : "var(--text-muted)" }}>
            {state === "error" ? `${error} You can email me at ${EMAIL}.` : `Or email me directly at ${EMAIL}`}
          </p>
        </form>
      )}
    </div>
  )
}
