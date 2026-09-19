import { ImageResponse } from "next/og"
import { NAME, ROLE } from "./site"

export const alt = `${NAME} — ${ROLE}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

const LIME = "#B1EB21"

export default function OpengraphImage() {
  const tags = ["Identity", "Endpoints", "Networks", "Cloud", "Security"]
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 80% 20%, #1a1f4a 0%, #000027 60%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: LIME, fontSize: 26, letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: LIME }} />
          AVAILABLE · GERMANY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1 }}>Muhammad</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, color: LIME }}>Hammad</div>
          <div style={{ fontSize: 34, marginTop: 28, color: "#c9cde0" }}>{ROLE}</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                border: "1px solid rgba(177,235,33,0.45)",
                borderRadius: 999,
                fontSize: 24,
                color: "#e6f7b8",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
