"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GitHubMark, GmailMark, LinkedInMark } from "@/components/brand-marks"
import { DayMap } from "@/components/day-map"
import { scrollToSection } from "@/components/smooth-scroll"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="container relative z-10 grid grid-cols-1 items-center gap-10 px-4 pb-8 pt-24 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* ── Left: identity ── */}
        <div className="hero-in">
          <div className="mb-6 flex items-center gap-3">
            <img
              src="/photo_hammad.jpg"
              alt="Muhammad Hammad"
              width={44}
              height={44}
              decoding="async"
              className="h-11 w-11 rounded-full object-cover object-top"
              style={{ border: "1px solid var(--border-dark)" }}
            />
            <span className="flex items-center gap-2 text-[14px]" style={{ color: "var(--text-muted)" }}>
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
              fontSize: "clamp(38px, 6.5vw, 76px)",
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
            className="mt-5 max-w-xl"
            style={{ fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.65, color: "var(--text-dim)" }}
          >
            IT Infrastructure Engineer. I keep company systems running and
            locked down: cloud, networks, servers, and the laptops people actually sit
            in front of.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="btn-cyber-fill group flex items-center gap-3 py-2 pl-6 pr-2"
              style={{ fontSize: 15 }}
            >
              Get in touch
              <span className="btn-chev">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("projects")
              }}
              className="btn-cyber group flex items-center gap-3 py-2 pl-6 pr-2"
              style={{ fontSize: 15 }}
            >
              View projects
              <span className="btn-chev btn-chev-outline">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { icon: GitHubMark, href: "https://github.com/Muhammadhammad24", label: "GitHub" },
              { icon: LinkedInMark, href: "https://www.linkedin.com/in/mhammad24/", label: "LinkedIn" },
              { icon: GmailMark, href: "mailto:muhammad24997@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="social-icon-btn flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
              >
                <Icon className="h-[15px] w-[15px]" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: proof ── */}
        <div className="hero-in" style={{ animationDelay: "0.12s" }}>
          <DayMap />
        </div>
      </div>
    </section>
  )
}
