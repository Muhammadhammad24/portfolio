"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  align?: "left" | "center"
}

/**
 * Every section opens the same way: a label, a dimension rule running out to
 * the edge of the column, then the title. The rule is the page's one repeated
 * mark — it appears at the head of all seven sections and nowhere else, so by
 * the third one the reader is reading a document rather than a series of pages.
 */
export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  // "01 — Background" → just "Background"
  const label = subtitle.replace(/^\s*\d+\s*[—–-]\s*/, "")

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      <div className="flex items-center gap-4">
        <span className="eyebrow shrink-0">{label}</span>
        <span className="dim-rule" aria-hidden="true" />
      </div>

      <h2
        className="mt-4 font-semibold"
        style={{
          fontSize: "clamp(32px, 4.5vw, 50px)",
          lineHeight: 1.12,
          letterSpacing: "-0.035em",
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
    </motion.div>
  )
}
