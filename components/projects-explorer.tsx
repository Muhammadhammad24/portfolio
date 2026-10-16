import { ArrowUpRight } from "lucide-react"

type Project = {
  short: string
  category: string
  title: string
  description: string
  metric: string
  metricLabel: string
  features: string[]
  tags: string[]
  repoUrl?: string
  demoUrl?: string
}

const PROJECTS: Project[] = [
  {
    short: "aws-terraform-platform",
    category: "Platform · DevSecOps",
    title: "aws-terraform-platform",
    description:
      "Production-style AWS infrastructure written entirely in Terraform. Failed servers are replaced automatically across two availability zones, and GitHub Actions deploys through OIDC, so no cloud keys are ever stored.",
    metric: "0 failed",
    metricLabel: "Checkov checks · 196 passed",
    features: [
      "Five reusable Terraform modules: network, compute, load balancer, monitoring, security",
      "Auto Scaling across two AZs with health-checked, rolling instance replacement",
      "OIDC pipeline: read-only plan on pull requests, approved apply to production",
      "KMS encryption, GuardDuty, multi-region CloudTrail and an ISO 27001 control map",
    ],
    tags: ["Terraform", "AWS", "Platform Engineering", "GitOps", "GitHub Actions", "OIDC", "DevSecOps", "CloudWatch"],
    repoUrl: "https://github.com/Muhammadhammad24/aws-terraform-platform",
  },
  {
    short: "Infotech-Wizard",
    category: "AIOps · RAG",
    title: "Infotech-Wizard",
    description:
      "An AI support assistant that answers IT questions from 3,531 resolved tickets in five languages. Retrieval and generation run on local hardware, so sensitive ticket data never leaves the company.",
    metric: "3,531 tickets",
    metricLabel: "indexed in 5 languages",
    features: [
      "Retrieval-augmented generation with FAISS vector search and multilingual embeddings",
      "Local LLM (TinyLlama) returns step-by-step answers with their source tickets",
      "FastAPI backend with typed schemas and readiness checks, React chat UI",
      "Docker Compose deployment, API tests and CI",
    ],
    tags: ["GenAI", "RAG", "LLM", "FastAPI", "FAISS", "PyTorch", "React", "Docker"],
    repoUrl: "https://github.com/Muhammadhammad24/Infotech-Wizard",
  },
  {
    short: "pfSense-Firewall-Lab",
    category: "Network Security",
    title: "pfSense-Firewall-Lab",
    description:
      "A segmented pfSense perimeter whose firewall rules are written as code, rendered to importable XML and audited in CI for exposed ports and any-to-any rules before they reach the firewall.",
    metric: "0 findings",
    metricLabel: "on the hardened rule set",
    features: [
      "WAN/LAN segmentation with DHCP, DNS and OpenVPN remote access",
      "TOML policy rendered to deterministic, importable pfSense XML",
      "Audit tool flags exposed management ports and missing egress filtering",
      "CI fails when the deployed rules drift from the policy; 22 tests",
    ],
    tags: ["Network Security", "Policy-as-Code", "pfSense", "Zero Trust", "Python", "OpenVPN", "CI/CD"],
    repoUrl: "https://github.com/Muhammadhammad24/pfSense-Firewall-Lab",
  },
  {
    short: "nova2labs",
    category: "Full-Stack · Cloud",
    title: "nova2labs",
    description:
      "The website of nova2labs, an AI, software and infrastructure studio. Server-rendered React with generative SVG artwork instead of stock images, and a contact pipeline that delivers leads straight to the business mailbox.",
    metric: "29 pages",
    metricLabel: "server-rendered, SEO-complete",
    features: [
      "React 19 and TanStack Start with server-side rendering, deployed on Vercel",
      "Seeded, animated SVG artwork generated in code, in both light and dark themes",
      "Lead capture over SMTP with relay and mailto fallbacks, so no enquiry is lost",
      "Sitemap, Open Graph and JSON-LD; typecheck, lint and build in CI",
    ],
    tags: ["React 19", "TanStack Start", "SSR", "TypeScript", "Tailwind CSS", "Nodemailer", "Vercel"],
    demoUrl: "https://www.nova2labs.com",
  },
  {
    short: "velqa​technologies", // zero-width break point; reads the same
    category: "Web · Edge",
    title: "velqatechnologies",
    description:
      "The production website of a BPO and customer-experience company: 13 service lines and 6 industries, exported as static pages and served from Vercel's global edge network.",
    metric: "33 routes",
    metricLabel: "statically generated",
    features: [
      "Next.js static export with per-page SEO metadata and a complete sitemap",
      "Reusable service and industry page templates",
      "Typecheck, lint and build in CI on every push",
      "Deployed and live on Vercel",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Edge Deployment", "SEO", "Vercel"],
    repoUrl: "https://github.com/Muhammadhammad24/velqatechnologies",
    demoUrl: "https://www.velqatechnologies.com",
  },
  {
    short: "nnapprox",
    category: "AI Research",
    title: "nnapprox",
    description:
      "A University of Göttingen research project with Sharareh Sayyad: how well neural networks approximate functions, comparing closed-form ReLU constructions with the greedy 'growing axons' method.",
    metric: "33 tests",
    metricLabel: "verify the error bounds",
    features: [
      "Shallow and deep (Yarotsky) ReLU constructions in PyTorch",
      "Measured O(n⁻²) convergence on smooth targets",
      "Greedy Axon baseline compared against random initialisation",
      "Experiments in 1-D and 2-D, with CI",
    ],
    tags: ["Deep Learning", "PyTorch", "Neural Networks", "Python", "Numerical Analysis", "Research"],
    repoUrl: "https://github.com/Muhammadhammad24/nnapprox",
  },
]

/**
 * Six projects, six links.
 *
 * This used to open a full panel under the grid — a diagram, a description, a
 * column of build notes. It was a lot of reading for something the visitor can
 * simply go and look at, and it buried the one thing they actually want, which
 * is the repository. So each card is the link now, and carries only what helps
 * someone decide whether to click: what it is, and the one number it proved.
 */
export function ProjectsExplorer() {
  return (
    <div className="measure-wide section-body grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p) => {
        const href = p.demoUrl ?? p.repoUrl
        if (!href) return null
        return (
          <a
            key={p.title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug" style={{ fontSize: 16, color: "var(--text)" }}>
                {p.short}
              </h3>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                style={{ color: "var(--text-muted)" }}
                aria-hidden="true"
              />
            </div>

            <p className="mt-1 text-[12.5px]" style={{ color: "var(--text-muted)" }}>
              {p.category}
            </p>

            {/* The single figure the project proved. */}
            {p.metric && (
              <div className="mt-5 flex items-baseline gap-2">
                <span className="num text-[15px] font-semibold" style={{ color: "var(--text)" }}>
                  {p.metric}
                </span>
                {p.metricLabel && (
                  <span className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
                    {p.metricLabel}
                  </span>
                )}
              </div>
            )}

            <span
              className="mt-4 self-start rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
              style={{
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {p.demoUrl ? "Live" : "Open source"}
            </span>
          </a>
        )
      })}
    </div>
  )
}
