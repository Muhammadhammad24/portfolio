interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Section wrapper. Deliberately does no scroll-gated fading: the cards,
 * timeline entries and meters inside each section animate themselves on
 * scroll, and tying a whole section's opacity to an observer risks leaving
 * content invisible if that observer misfires.
 */
export function SectionReveal({ children, className = "", id }: SectionRevealProps) {
  return (
    <div id={id} className={`relative ${className}`}>
      {children}
    </div>
  )
}
