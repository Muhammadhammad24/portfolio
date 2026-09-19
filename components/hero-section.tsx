"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { CyberRoles } from "@/components/cyber-roles"
import { HeroName } from "@/components/terminal-boot"

export function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG blobs — subtle only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(177,235,33,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-24 pb-10 px-4">
        {/* LEFT — Text */}
        <div className="space-y-6 lg:space-y-8">
          {/* Status pill + avatar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative shrink-0">
              <div
                className="w-12 h-12 rounded-full overflow-hidden"
                style={{ border: "2px solid rgba(255,255,255,0.4)", boxShadow: "0 0 14px rgba(177,235,33,0.25)" }}
              >
                <Image
                  src="/photo_hammad.jpg"
                  alt="Muhammad Hammad"
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full animate-pulse"
                style={{ background: "var(--accent)", border: "1.5px solid var(--bg)", boxShadow: "0 0 5px var(--accent)" }}
              />
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: "1px solid var(--border)", background: "var(--card-bg)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--lime)",
                }}
              >
                Available · Germany
              </span>
            </div>
          </div>

          {/* Terminal identifier row */}
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" style={{ color: "var(--accent-dim)" }} />
            <span
              className="font-['JetBrains_Mono'] text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              IT Infrastructure · AI · Security · Cloud · Network
            </span>
          </div>

          {/* Name — direct, no boot sequence */}
          <div className="min-h-[160px] sm:min-h-[140px]">
            <HeroName firstName="Muhammad" lastName="Hammad" bootDone={true} />
          </div>

          {/* Summary */}
          <p
            className="hero-in"
            style={{
              animationDelay: "0.2s",
              color: "var(--text-on-dark-secondary)",
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: 520,
            }}
          >
            6+ years securing & managing enterprise IT — from{" "}
            <span style={{ color: "var(--lime)", fontWeight: 600 }}>Zero Trust architecture</span> to{" "}
            <span style={{ color: "var(--lime)", fontWeight: 600 }}>AI-driven automation</span>, delivering{" "}
            <span style={{ color: "var(--lime)", fontWeight: 600 }}>99.7% uptime</span> across 500+ endpoints.
          </p>

          {/* Divider */}
          <div className="h-px" style={{ background: "var(--border)" }} />

          {/* CTAs */}
          <div
            className="hero-in flex flex-wrap gap-3 items-center"
            style={{ animationDelay: "0.35s" }}
          >
            <a
              href="#contact"
              className="btn-cyber-fill flex items-center gap-2 px-6 py-3 text-sm font-bold"
              style={{ borderRadius: "var(--radius-pill)", fontFamily: "Inter, sans-serif", fontSize: 15 }}
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="btn-cyber flex items-center gap-2 px-6 py-3 text-sm"
              style={{ borderRadius: "var(--radius-pill)", fontFamily: "Inter, sans-serif", fontSize: 15 }}
            >
              View Projects
            </a>
          </div>

          {/* Socials */}
          <div
            className="hero-in flex items-center gap-3 flex-wrap"
            style={{ animationDelay: "0.45s" }}
          >
            {[
              { icon: Github,   href: "https://github.com/Muhammadhammad24",    label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mhammad24/", label: "LinkedIn" },
              { icon: Mail,     href: "mailto:muhammad24997@gmail.com",          label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
            <span className="font-['JetBrains_Mono'] text-xs" style={{ color: "var(--text-muted)" }}>
              +49 176 8733 3721
            </span>
          </div>
        </div>

        {/* RIGHT — Cyber Roles Orbital */}
        <div className="hidden sm:flex justify-center items-center overflow-hidden">
          <CyberRoles />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="font-['JetBrains_Mono'] text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--accent-mid)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </div>
    </section>
  )
}
