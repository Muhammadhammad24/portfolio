"use client"

/**
 * Honeycomb picker in the style of the skills section: every item is visible
 * as a hexagon, rows interlock, and the selected one lights up. Sizing is
 * fluid so three hexagons fit on a phone. Motion is CSS only.
 */

export type HexItem = {
  id: string
  title: string
  sub: string
  badge?: string
  dots?: number
}

const LIME = "#B1EB21"
const CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

function Hex({ item, active, onSelect, index }: { item: HexItem; active: boolean; onSelect: () => void; index: number }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className="hex-cell group relative shrink-0 outline-none"
      style={{ width: "var(--hw)", height: "calc(var(--hw) * 1.14)", animationDelay: `${index * 0.05}s` }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-[background,transform,filter] duration-300 group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        style={{
          clipPath: CLIP,
          background: active ? `linear-gradient(145deg, ${LIME}26, ${LIME}0a)` : "var(--card-bg)",
          filter: active ? `drop-shadow(0 0 14px ${LIME}66)` : "none",
        }}
      >
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 130 148" preserveAspectRatio="none" aria-hidden="true">
          <polygon
            points="65,3 127,34 127,114 65,145 3,114 3,34"
            fill="none"
            stroke={active ? LIME : "var(--border)"}
            strokeWidth={active ? 2 : 1.5}
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke] duration-300 group-hover:stroke-[#B1EB21]"
          />
        </svg>

        <span className="relative z-10 flex flex-col items-center gap-1.5 px-3 text-center">
          {typeof item.dots === "number" && (
            <span className="flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, d) => (
                <span key={d} className="rounded-full" style={{ width: 5, height: 5, background: d < item.dots! ? LIME : "var(--border)" }} />
              ))}
            </span>
          )}
          <span
            className="font-['JetBrains_Mono'] leading-tight transition-colors duration-200 group-hover:text-[#B1EB21]"
            style={{ fontSize: "clamp(9px, 2.4vw, 11px)", color: active ? LIME : "var(--text-dim)", wordBreak: "break-word", lineHeight: 1.3 }}
          >
            {item.title}
          </span>
          <span
            className="font-['JetBrains_Mono'] uppercase tracking-widest"
            style={{ fontSize: "clamp(7px, 1.8vw, 8.5px)", color: active ? LIME : "var(--text-muted)", opacity: active ? 1 : 0.7 }}
          >
            {item.sub}
          </span>
          {item.badge && (
            <span
              className="font-['JetBrains_Mono'] uppercase tracking-wider rounded-sm px-1.5 py-0.5"
              style={{ fontSize: "clamp(7px, 1.7vw, 8px)", color: LIME, border: `1px solid ${LIME}44`, background: `${LIME}0d` }}
            >
              {item.badge}
            </span>
          )}
        </span>
      </span>
    </button>
  )
}

export function HexGallery({
  items,
  activeId,
  onSelect,
  label,
}: {
  items: HexItem[]
  activeId: string
  onSelect: (id: string) => void
  label: string
}) {
  // Rows of three; every second row shifts half a cell so the combs interlock.
  const rows: HexItem[][] = []
  for (let i = 0; i < items.length; i += 3) rows.push(items.slice(i, i + 3))

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex flex-col items-center"
      style={{ ["--hw" as string]: "clamp(88px, 25vw, 136px)" }}
    >
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex gap-2"
          style={{
            marginTop: r === 0 ? 0 : "calc(var(--hw) * -0.2)",
            marginLeft: r % 2 ? "calc(var(--hw) * 0.55)" : 0,
          }}
        >
          {row.map((item, i) => (
            <Hex key={item.id} item={item} index={r * 3 + i} active={item.id === activeId} onSelect={() => onSelect(item.id)} />
          ))}
        </div>
      ))}
    </div>
  )
}
