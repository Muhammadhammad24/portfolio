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

const ACCENT = "var(--accent)"

function Card({
  item,
  active,
  onSelect,
  id,
  panelId,
}: {
  item: HexItem
  active: boolean
  onSelect: () => void
  id: string
  panelId: string
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={panelId}
      // Roving focus: the arrow keys move between the cards, so the grid is
      // one tab stop rather than one per card.
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      data-active={active}
      className="card flex flex-col items-start gap-2 p-4 pl-5 text-left outline-none"
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
              border: `1px solid ${active ? "rgb(var(--accent-rgb) / 0.35)" : "var(--border)"}`,
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
  baseId,
  panelId,
}: {
  items: HexItem[]
  activeId: string
  onSelect: (id: string) => void
  label: string
  baseId: string
  panelId: string
}) {
  const tabId = (id: string) => `${baseId}-tab-${id}`

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const at = items.findIndex((i) => i.id === activeId)
    if (at === -1) return
    let next = at
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (at + 1) % items.length
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (at - 1 + items.length) % items.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = items.length - 1
    else return
    e.preventDefault()
    onSelect(items[next].id)
    document.getElementById(tabId(items[next].id))?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          active={item.id === activeId}
          onSelect={() => onSelect(item.id)}
          id={tabId(item.id)}
          panelId={panelId}
        />
      ))}
    </div>
  )
}
