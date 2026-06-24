"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

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

  const inputStyle = {
    width: '100%',
    background: 'rgba(0,255,65,0.03)',
    border: '1px solid rgba(0,255,65,0.15)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#e8ffe8',
    outline: 'none',
    fontFamily: 'Space Grotesk, sans-serif',
    transition: 'all 0.3s',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl bracket-card" style={{
        background: 'rgba(0,255,65,0.03)', border: '1px solid rgba(0,255,65,0.12)', padding: '1.75rem',
      }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.35), transparent)' }} />

        <h3 className="font-['Syne'] text-2xl font-bold mb-6" style={{ color: '#e8ffe8' }}>
          Send a Message
        </h3>

        {submitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-12 h-12 mb-4" style={{ color: '#00ff41' }} />
            <p className="font-semibold text-lg" style={{ color: '#00ff41' }}>Message Sent!</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(0,255,65,0.5)' }}>I'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { type: "text", placeholder: "Your Name" },
              { type: "email", placeholder: "Email Address" },
              { type: "text", placeholder: "Subject" },
            ].map((field, i) => (
              <input key={i} type={field.type} placeholder={field.placeholder} required style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,255,65,0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0,255,65,0.08)' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(0,255,65,0.15)'; e.target.style.boxShadow = 'none' }}
              />
            ))}
            <textarea placeholder="Your Message" rows={5} required style={{ ...inputStyle, resize: 'none' }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(0,255,65,0.4)'; e.target.style.boxShadow = '0 0 15px rgba(0,255,65,0.08)' }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(0,255,65,0.15)'; e.target.style.boxShadow = 'none' }}
            />
            <button type="submit" disabled={isSubmitting}
              className="btn-cyber-fill w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
                    animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                  Sending...
                </span>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  )
}
