"use client"

/**
 * Simple selectable card grid. Every item is a plain rounded card; the selected
 * one is outlined in the accent colour. No decorative geometry, no per-item
 * entrance animation — just a calm, scannable grid.
 */

export type HexItem = {
  id: string
  title: string
  sub: string
  badge?: string
  dots?: number
}

const ACCENT = "#5B8DEF"

function Card({ item, active, onSelect }: { item: HexItem; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      data-active={active}
      className="panel flex flex-col items-start gap-2 p-4 pl-5 text-left outline-none"
    >
      {typeof item.dots === "number" && (
        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, d) => (
            <span
              key={d}
              className="rounded-full"
              style={{ width: 5, height: 5, background: d < item.dots! ? ACCENT : "var(--border-dark)" }}
            />
          ))}
        </span>
      )}

      <span
        className="font-semibold leading-snug transition-colors duration-200"
        style={{ fontSize: 15, color: active ? ACCENT : "var(--text)" }}
      >
        {item.title}
      </span>

      <span className="flex w-full items-center justify-between gap-2">
        <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{item.sub}</span>
        {item.badge && (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 font-medium"
            style={{
              fontSize: 10,
              letterSpacing: "0.04em",
              color: active ? ACCENT : "var(--text-muted)",
              border: `1px solid ${active ? "rgba(91,141,239,0.35)" : "var(--border)"}`,
            }}
          >
            {item.badge}
          </span>
        )}
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
  return (
    <div role="tablist" aria-label={label} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} item={item} active={item.id === activeId} onSelect={() => onSelect(item.id)} />
      ))}
    </div>
  )
}
