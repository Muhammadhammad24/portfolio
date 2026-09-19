import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm tracking-[0.3em]" style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
        ERROR 404
      </p>
      <h1 className="text-4xl font-bold">This page doesn&apos;t exist</h1>
      <Link
        href="/"
        className="rounded-full px-6 py-3 font-semibold"
        style={{ background: "var(--accent)", color: "#000" }}
      >
        Back to the portfolio
      </Link>
    </main>
  )
}
