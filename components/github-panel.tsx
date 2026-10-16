/**
 * Real GitHub data, read from the API at build time and refreshed hourly.
 * Nothing here is typed in by hand — if the repos change, this changes.
 *
 * Set GITHUB_TOKEN in .env.local (and in the host's env vars once deployed) to
 * raise the rate limit from 60 to 5,000 requests an hour and to unlock the
 * contribution graph, which GitHub only exposes over the authenticated GraphQL
 * API. Without a token the panel still renders, just without that graph.
 */

const USER = "Muhammadhammad24"
const TOKEN = process.env.GITHUB_TOKEN

type Repo = {
  name: string
  language: string | null
  pushed_at: string
  created_at: string
  languages_url: string
  topics?: string[]
}

type Profile = {
  public_repos: number
  created_at: string
}

type ContributionDay = { date: string; contributionCount: number }

function headers(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" }
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`
  return h
}

async function gh<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: headers(), next: { revalidate: 3600 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/**
 * Total commits on a repo's default branch, read from the pagination header.
 * Returns null when the request fails (rate limit, network) so the caller can
 * tell a real zero apart from a missing answer and avoid showing a wrong total.
 */
async function commitCount(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${USER}/${repo}/commits?per_page=1`, {
      headers: headers(),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const link = res.headers.get("link")
    if (!link) {
      const body = (await res.json()) as unknown[]
      return Array.isArray(body) && body.length > 0 ? 1 : 0
    }
    const last = link.match(/[?&]page=(\d+)>;\s*rel="last"/)
    return last ? Number(last[1]) : 1
  } catch {
    return null
  }
}

/** The contribution calendar. Authenticated GraphQL only. */
async function contributions(): Promise<ContributionDay[] | null> {
  if (!TOKEN) return null
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login:String!){
          user(login:$login){
            contributionsCollection{
              contributionCalendar{
                weeks{ contributionDays{ date contributionCount } }
              }
            }
          }
        }`,
        variables: { login: USER },
      }),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!Array.isArray(weeks)) return null
    return weeks.flatMap((w: { contributionDays: ContributionDay[] }) => w.contributionDays)
  } catch {
    return null
  }
}

function formatBytes(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

/** Shown when GitHub will not answer, so the section still has a floor. */
function Unavailable() {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">GitHub</span>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium"
          style={{ color: "var(--accent)" }}
        >
          github.com/{USER} ↗
        </a>
      </div>
      <p className="mt-3 text-sm" style={{ lineHeight: 1.7, color: "var(--text-dim)", maxWidth: "62ch" }}>
        The live read of this profile is rate limited right now — GitHub allows
        sixty unauthenticated calls an hour. The repositories are public, so the
        link above is the same data, first hand.
      </p>
    </div>
  )
}

export async function GitHubPanel() {
  const [profile, repos] = await Promise.all([
    gh<Profile>(`https://api.github.com/users/${USER}`),
    gh<Repo[]>(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
  ])

  // Unauthenticated calls are capped at 60 an hour, so a rate limit is normal
  // rather than exceptional. Returning null here blanked the whole section —
  // heading, lede and all — which reads as a broken page. Say so instead.
  if (!profile || !repos || repos.length === 0) return <Unavailable />

  const [langResults, commitCounts, days] = await Promise.all([
    Promise.all(repos.map((r) => gh<Record<string, number>>(r.languages_url))),
    Promise.all(repos.map((r) => commitCount(r.name))),
    contributions(),
  ])

  const totals: Record<string, number> = {}
  for (const result of langResults) {
    if (!result) continue
    for (const [lang, bytes] of Object.entries(result)) {
      totals[lang] = (totals[lang] ?? 0) + bytes
    }
  }

  const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0)
  if (totalBytes === 0) return <Unavailable />

  // An undercount looks like a fact but is a lie, so only show the total when
  // every repository reported in.
  const totalCommits = commitCounts.every((c) => c !== null)
    ? commitCounts.reduce((a: number, b) => a + (b ?? 0), 0)
    : null

  const languages = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, bytes, pct: (bytes / totalBytes) * 100 }))

  const shown = languages.slice(0, 6)
  const otherPct = languages.slice(6).reduce((a, l) => a + l.pct, 0)

  // Tint steps of the accent so the chart matches the rest of the site.
  const tint = (i: number) => `rgb(var(--accent-rgb) / ${(0.95 - i * 0.13).toFixed(2)})`

  // Every tag below is one set on the repo itself; infrastructure, security
  // and AI tags are surfaced first because that is the work worth showing.
  const PRIORITY = [
    "terraform", "infrastructure-as-code", "aws", "devsecops", "sre", "oidc", "checkov",
    "iso27001", "autoscaling", "cloudwatch", "github-actions", "network-security", "pfsense",
    "firewall", "openvpn", "networking", "homelab", "runbook", "rag", "llm", "pytorch",
    "fastapi", "faiss", "docker", "it-support", "helpdesk", "deep-learning",
    "scientific-computing", "neural-networks",
  ]
  const rank = (t: string) => {
    const i = PRIORITY.indexOf(t)
    return i === -1 ? PRIORITY.length : i
  }
  const topics = Array.from(new Set(repos.flatMap((r) => r.topics ?? [])))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 16)

  const lastPush = repos.map((r) => r.pushed_at).sort().reverse()[0]
  const since = new Date(profile.created_at).getFullYear()

  const maxDay = days ? Math.max(1, ...days.map((d) => d.contributionCount)) : 1
  const level = (n: number) => {
    if (n === 0) return "var(--border-dark)"
    const ratio = n / maxDay
    if (ratio > 0.66) return "rgb(var(--accent-rgb) / 0.95)"
    if (ratio > 0.33) return "rgb(var(--accent-rgb) / 0.70)"
    if (ratio > 0.12) return "rgb(var(--accent-rgb) / 0.45)"
    return "rgb(var(--accent-rgb) / 0.25)"
  }

  return (
    <div
      className="card overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-medium hover:underline"
            style={{ color: "var(--text)" }}
          >
            github.com/{USER}
          </a>
        </div>
        <span className="eyebrow shrink-0">live from the API</span>
      </div>

      {/* Headline figures */}
      <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--border)" }}>
        {[
          { value: String(profile.public_repos), label: "public repos" },
          totalCommits !== null
            ? { value: String(totalCommits), label: "commits" }
            : { value: String(languages.length), label: "languages" },
          { value: formatBytes(totalBytes), label: "bytes of code" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="px-5 py-3.5"
            style={{ borderLeft: i === 0 ? "none" : "1px solid var(--border)" }}
          >
            <div className="num font-semibold" style={{ fontSize: 23, color: "var(--text)" }}>
              {s.value}
            </div>
            <div className="mt-0.5 text-[12px]" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Contribution graph — appears once GITHUB_TOKEN is configured */}
      {days && days.length > 0 && (
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="mb-2.5 text-[12.5px]" style={{ color: "var(--text-dim)" }}>
            <span className="num" style={{ color: "var(--text)" }}>
              {days.reduce((a, d) => a + d.contributionCount, 0)}
            </span>{" "}
            contributions this year
          </div>
          <div className="flex gap-[2px]">
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, w) => (
              <div key={w} className="flex flex-1 flex-col gap-[2px]">
                {days.slice(w * 7, w * 7 + 7).map((d) => (
                  <span
                    key={d.date}
                    title={`${d.date}: ${d.contributionCount}`}
                    className="aspect-square w-full rounded-[1.5px]"
                    style={{ background: level(d.contributionCount) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Language split, by real bytes committed */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="mb-3 flex h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--border-dark)" }}>
          {shown.map((l, i) => (
            <div
              key={l.name}
              style={{ width: `${l.pct}%`, background: tint(i) }}
              title={`${l.name} ${l.pct.toFixed(1)}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5">
          {shown.map((l, i) => (
            <span key={l.name} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--text-dim)" }}>
              <span className="h-2 w-2 rounded-full" style={{ background: tint(i) }} />
              {l.name}
              <span className="num" style={{ color: "var(--text-muted)" }}>{l.pct.toFixed(1)}%</span>
            </span>
          ))}
          {otherPct > 0 && (
            <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
              other {otherPct.toFixed(1)}%
            </span>
          )}
        </div>
        {shown.some((l) => l.name === "Jupyter Notebook") && (
          <p className="mt-3 text-[11.5px]" style={{ color: "var(--text-muted)" }}>
            Measured in bytes, so notebooks read high: they store their saved output alongside the code.
          </p>
        )}
      </div>

      {/* What those repos are actually about — GitHub topics, as tagged */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-1 text-[11.5px]"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}
      >
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          Pushing code since <span className="num">{since}</span>
        </span>
        <span className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
          last push <span className="num">{new Date(lastPush).toISOString().slice(0, 10)}</span>
        </span>
      </div>
    </div>
  )
}
