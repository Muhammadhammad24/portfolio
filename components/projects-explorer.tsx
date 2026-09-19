"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { HexGallery, type HexItem } from "@/components/hex-gallery"

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
 * Projects as a honeycomb, like the skills section: all six visible at once,
 * the selected one opens in full underneath.
 */
export function ProjectsExplorer() {
  const [active, setActive] = useState(0)
  const p = PROJECTS[active]
  const items: HexItem[] = PROJECTS.map((proj, i) => ({
    id: String(i),
    title: proj.short,
    sub: proj.category,
    badge: proj.demoUrl ? "Live" : "Open source",
  }))

  return (
    <div className="mt-12 max-w-5xl mx-auto">
      <HexGallery items={items} activeId={String(active)} onSelect={(id) => setActive(Number(id))} label="Projects" />

      <div className="flex items-center justify-center gap-3 mt-12 mb-6" aria-hidden="true">
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(177,235,33,0.35))" }} />
        <span
          className="font-['JetBrains_Mono'] text-[10px] tracking-[0.35em] uppercase px-3 py-1 rounded-sm"
          style={{ color: "var(--lime)", border: "1px solid rgba(177,235,33,0.2)", background: "rgba(177,235,33,0.03)" }}
        >
          {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(177,235,33,0.35))" }} />
      </div>

      <div id="project-panel" role="tabpanel" key={active} className="orbit-fade max-w-3xl mx-auto">
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
