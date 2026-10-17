/**
 * Anchor scrolling, driven by us rather than by `scroll-behavior: smooth`.
 *
 * The native animation runs on the compositor's own schedule and, on a page
 * this long, stalls whenever a frame runs late — the step-by-step crawl you
 * see when a nav item is clicked. A fixed-duration eased ramp keeps moving
 * even through a dropped frame, so the travel always reads as one glide.
 *
 * The ramp needs frames to run, and a tab that is backgrounded, throttled or
 * busy gets none — the scroll would then simply never happen. So every travel
 * also arms a timer that puts us at the destination if the frames never came.
 */

const DURATION = 620
// Matches `scroll-padding-top`: the nav floats over the top of every section.
const OFFSET = 96

// easeInOutCubic — slow off the mark, quick through the middle, soft landing.
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let frame = 0
let guard = 0

function stop() {
  if (frame) cancelAnimationFrame(frame)
  if (guard) window.clearTimeout(guard)
  frame = 0
  guard = 0
}

export function scrollToY(target: number) {
  stop()

  const start = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  const end = Math.max(0, Math.min(target, max))
  const distance = end - start
  if (Math.abs(distance) < 2) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: end, behavior: "auto" })
    return
  }

  const t0 = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / DURATION)
    window.scrollTo({ top: start + distance * ease(t), behavior: "auto" })
    frame = t < 1 ? requestAnimationFrame(step) : 0
    if (!frame) stop()
  }
  frame = requestAnimationFrame(step)

  // Whatever happened to the frames, we are at the destination by now.
  guard = window.setTimeout(() => {
    stop()
    window.scrollTo({ top: end, behavior: "auto" })
  }, DURATION + 120)
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  scrollToY(el.getBoundingClientRect().top + window.scrollY - OFFSET)
}
