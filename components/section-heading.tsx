"use client"


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
    <div
    >
      <div className="flex items-center gap-4">
        <span className="eyebrow shrink-0">{label}</span>
        <span className="dim-rule" aria-hidden="true" />
      </div>

      <h2
        className="mt-3 font-semibold"
        style={{
          fontSize: "clamp(25px, 3.1vw, 38px)",
          lineHeight: 1.12,
          letterSpacing: "-0.035em",
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
    </div>
  )
}
