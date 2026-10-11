import { NextResponse } from "next/server"

/**
 * Delivers the contact form to my inbox.
 *
 * The provider key lives in WEB3FORMS_ACCESS_KEY (server-side only, never
 * shipped to the browser). Without it the route reports that delivery is not
 * configured rather than pretending the message was sent.
 */

const ENDPOINT = "https://api.web3forms.com/submit"
const TO_SUBJECT = "Portfolio contact form"

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

export async function POST(request: Request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  // Hidden field no human fills in; bots do.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const subject = clean(body.subject, 200)
  const message = clean(body.message, 5000)

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 })
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: subject ? `${TO_SUBJECT}: ${subject}` : TO_SUBJECT,
        from_name: name,
        replyto: email,
        name,
        email,
        message,
      }),
    })

    const payload = await res.json().catch(() => ({}) as { success?: boolean; message?: string })

    if (!res.ok || payload.success === false) {
      // Surface the provider's own reason: it is about form configuration,
      // never about the key, and it is the only way to debug a live failure.
      console.error("contact: provider rejected", res.status, payload.message)
      return NextResponse.json(
        { error: "Could not send right now.", reason: payload.message ?? `HTTP ${res.status}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Could not send right now." }, { status: 502 })
  }
}
