"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"

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
    short: "Self-Healing AWS Platform",
    category: "Platform · DevSecOps",
    title: "Self-Healing AWS Platform — Terraform, GitOps & Keyless CI/CD",
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
    short: "Private GenAI Helpdesk",
    category: "AIOps · RAG",
    title: "InfoTech Wizard — Private GenAI Helpdesk with Multilingual RAG",
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
    short: "Firewall Policy-as-Code",
    category: "Network Security",
    title: "Firewall Policy-as-Code — pfSense with Automated Security Audits",
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
    short: "nova2labs Studio Platform",
    category: "Full-Stack · Cloud",
    title: "nova2labs — AI & Cloud Engineering Studio, Full-Stack SSR Platform",
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
    short: "Velqa Company Website",
    category: "Web · Edge",
    title: "Velqa Technologies — Edge-Delivered Company Website",
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
    demoUrl: "https://velqatechnologies.vercel.app",
  },
  {
    short: "NNApprox Research",
    category: "AI Research",
    title: "NNApprox — Deep Learning Research on ReLU Network Approximation",
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
 * Projects as a navigator: a list on the left (chips on mobile), one project
 * card open at a time on the right, like the services picker on nova2labs.
 */
export function ProjectsExplorer() {
  const [active, setActive] = useState(0)
  const p = PROJECTS[active]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8 mt-16 max-w-6xl mx-auto items-start">
      {/* Project list */}
      <div
        role="tablist"
        aria-label="Projects"
        className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 lg:sticky lg:top-28"
      >
        {PROJECTS.map((proj, i) => {
          const on = i === active
          return (
            <button
              key={proj.short}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="project-panel"
              onClick={() => setActive(i)}
              className="group shrink-0 text-left transition-all duration-300"
              style={{
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                background: on ? "rgba(177,235,33,0.08)" : "var(--card-bg)",
                border: `1px solid ${on ? "rgba(177,235,33,0.40)" : "var(--border)"}`,
                boxShadow: on ? "0 0 18px rgba(177,235,33,0.10)" : "none",
                minWidth: 220,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-['JetBrains_Mono'] text-[11px] font-bold"
                  style={{ color: on ? "var(--lime)" : "var(--text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div
                    className="text-sm font-semibold leading-tight"
                    style={{ color: on ? "#ffffff" : "var(--text-on-dark-secondary)", fontFamily: "Inter, sans-serif" }}
                  >
                    {proj.short}
                  </div>
                  <div
                    className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase mt-1"
                    style={{ color: on ? "var(--lime)" : "var(--text-muted)" }}
                  >
                    {proj.category}
                  </div>
                </div>
                <span
                  className="ml-auto hidden lg:block transition-transform duration-300"
                  style={{ color: on ? "var(--lime)" : "var(--text-muted)", transform: on ? "translateX(2px)" : "none" }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected project */}
      <div id="project-panel" role="tabpanel" key={active} className="orbit-fade">
        <ProjectCard
          number={String(active + 1).padStart(2, "0")}
          title={p.title}
          description={p.description}
          metric={p.metric}
          metricLabel={p.metricLabel}
          features={p.features}
          tags={p.tags}
          repoUrl={p.repoUrl}
          demoUrl={p.demoUrl}
        />
      </div>
    </div>
  )
}
