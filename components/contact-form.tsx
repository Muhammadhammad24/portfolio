"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

const FIELDS = [
  { id: "cf-name",    type: "text",  label: "Your Name",      placeholder: "Your Name",      autoComplete: "name" },
  { id: "cf-email",   type: "email", label: "Email Address",  placeholder: "Email Address",  autoComplete: "email" },
  { id: "cf-subject", type: "text",  label: "Subject",        placeholder: "Subject",        autoComplete: "off" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    e.currentTarget.reset()
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'var(--input-bg)',
    border: '1px solid var(--border)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--text)',
    outline: 'none',
    fontFamily: 'Space Grotesk, sans-serif',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border-hot)'
    e.target.style.boxShadow = '0 0 15px var(--accent-glow)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl bracket-card" style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '1.75rem',
      }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-hot), transparent)' }} />

        <h3 className="font-['Syne'] text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          Send a Message
        </h3>

        {submitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            role="alert"
            aria-live="polite"
          >
            <CheckCircle className="w-12 h-12 mb-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <p className="font-semibold text-lg" style={{ color: 'var(--accent)' }}>Message Sent!</p>
            <p className="text-sm mt-1" style={{ color: 'var(--accent-mid)' }}>I'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {FIELDS.map((field) => (
              <div key={field.id} className="flex flex-col gap-1">
                {/* Visually hidden label — screen readers use it, sighted users see placeholder */}
                <label
                  htmlFor={field.id}
                  className="sr-only"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required
                  aria-required="true"
                  style={inputBase}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label htmlFor="cf-message" className="sr-only">Your Message</label>
              <textarea
                id="cf-message"
                placeholder="Your Message"
                rows={5}
                required
                aria-required="true"
                style={{ ...inputBase, resize: 'none' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Sending message…" : "Send message"}
              className="btn-cyber-fill w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2" aria-hidden="true">
                  {/* CSS spinner — no JS animation, no Framer Motion rotate loop */}
                  <span
                    className="inline-block w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
                    style={{ animation: 'spin-slow 0.8s linear infinite' }}
                    aria-hidden="true"
                  />
                  Sending…
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}
