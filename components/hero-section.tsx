"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { StackDiagram } from "@/components/stack-diagram"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Cursor-tracked spotlight — written straight to the DOM (no React state)
  // so it costs nothing beyond a single style write per pointer move.
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current
    const glow = spotlightRef.current
    if (!el || !glow) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    glow.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(91,141,239,0.06), transparent 60%)`
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 hidden sm:block" />

      <div className="container relative z-10 grid grid-cols-1 items-center gap-14 px-4 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* ── Left: identity ── */}
        <div className="hero-in">
          <div className="mb-7 flex items-center gap-3">
            <img
              src="/photo_hammad.jpg"
              alt="Muhammad Hammad"
              width={44}
              height={44}
              decoding="async"
              className="h-11 w-11 rounded-full object-cover object-top"
              style={{ border: "1px solid var(--border-dark)" }}
            />
            <span className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-muted)" }}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Available · Germany
            </span>
          </div>

          <h1
            className="font-semibold"
            style={{
              fontSize: "clamp(44px, 6.5vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Muhammad
            <br />
            Hammad
          </h1>

          <p
            className="mt-6 max-w-xl"
            style={{ fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.6, color: "var(--text-dim)" }}
          >
            IT Infrastructure &amp; Security Engineer. I keep company systems running and
            locked down: cloud, networks, servers, and the laptops people actually sit
            in front of.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="btn-cyber-fill flex items-center gap-2 px-6 py-3"
              style={{ fontSize: 15 }}
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="btn-cyber flex items-center px-6 py-3" style={{ fontSize: 15 }}>
              View projects
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/Muhammadhammad24", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mhammad24/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:muhammad24997@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="social-icon-btn flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: proof ── */}
        <div className="hero-in" style={{ animationDelay: "0.12s" }}>
          <StackDiagram />
        </div>
      </div>
    </section>
  )
}
