"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  align?: "left" | "center"
}

export function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  const isCenter = align === "center"

  // "01 — Background" → just "Background"
  const label = subtitle.replace(/^\s*\d+\s*[—–-]\s*/, "")

  return (
    <motion.div
      className={isCenter ? "text-center" : "text-left"}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      <span
        className="text-[13px] font-medium uppercase"
        style={{ color: "var(--accent)", letterSpacing: "0.12em" }}
      >
        {label}
      </span>

      <h2
        className="mt-3 font-semibold"
        style={{
          fontSize: "clamp(32px, 4.5vw, 50px)",
          lineHeight: 1.12,
          letterSpacing: "-0.025em",
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
    </motion.div>
  )
}
