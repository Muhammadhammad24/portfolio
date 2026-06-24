import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Shield, Terminal } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { CyberRoles } from "@/components/cyber-roles"
import { SpecCard } from "@/components/spec-card"
import { SkillsTabbed } from "@/components/skills-tabbed"
import { CertCard } from "@/components/cert-card"
import { TechMarquee } from "@/components/tech-marquee"
import { ProfilePhoto } from "@/components/profile-photo"

const G = "#00ff41"
const Gdim = "rgba(0,255,65,0.55)"
const Gmuted = "rgba(0,255,65,0.25)"
const Gborder = "rgba(0,255,65,0.12)"
const surface = "rgba(0,255,65,0.03)"
const textDim = "rgba(232,255,232,0.5)"
const textMuted = "rgba(232,255,232,0.25)"

export default function Portfolio() {
  return (
    <div className="min-h-screen grid-bg" style={{ background: '#050a05', color: '#e8ffe8' }}>
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-blob"
            style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full animate-blob animation-delay-2000"
            style={{ background: 'radial-gradient(circle, rgba(0,204,51,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 pb-10">
          {/* LEFT — Text */}
          <div className="space-y-8">
            {/* Status pill + avatar */}
            <div className="flex items-center gap-3">
              {/* Mini avatar */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ border: '2px solid rgba(0,255,65,0.4)', boxShadow: '0 0 14px rgba(0,255,65,0.25)' }}>
                  <img src="/photo_hammad.jpg" alt="Muhammad Hammad"
                    className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full animate-pulse"
                  style={{ background: '#00ff41', border: '1.5px solid #030703', boxShadow: '0 0 5px #00ff41' }} />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border: `1px solid ${Gborder}`, background: surface }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
                <span className="font-['JetBrains_Mono'] text-xs tracking-[0.2em] uppercase" style={{ color: Gdim }}>
                  Available · Germany
                </span>
              </div>
            </div>

            {/* Role label */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="h-4 w-4" style={{ color: Gdim }} />
                <span className="font-['JetBrains_Mono'] text-xs tracking-[0.3em] uppercase" style={{ color: textMuted }}>
                  IT Infrastructure & Security Engineer
                </span>
              </div>
              <h1 className="font-['Syne'] text-6xl md:text-8xl font-bold leading-tight tracking-tight" style={{ overflow: 'visible' }}>
                <span className="block" style={{ color: '#e8ffe8' }}>Muhammad</span>
                <span className="block gradient-green" style={{ paddingBottom: '0.15em', overflow: 'visible' }}>Hammad</span>
              </h1>
            </div>

            {/* Summary */}
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: textDim }}>
              6+ years securing & managing enterprise IT — from{" "}
              <span style={{ color: G }}>Zero Trust architecture</span> to{" "}
              <span style={{ color: G }}>AI-driven automation</span>,
              delivering <span style={{ color: G }}>99.7% uptime</span> across 500+ endpoints.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4" style={{ borderTop: `1px solid ${Gborder}`, borderBottom: `1px solid ${Gborder}` }}>
              {[
                { value: "6+", label: "Years Experience" },
                { value: "500+", label: "Endpoints Managed" },
                { value: "99.2%", label: "Threat Detection" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-['Syne'] text-3xl font-bold glow-text" style={{ color: G }}>{s.value}</div>
                  <div className="text-xs mt-0.5 font-['JetBrains_Mono'] tracking-wider" style={{ color: textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-cyber-fill flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wider">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="btn-cyber flex items-center gap-2 px-6 py-3 rounded-full text-sm">
                Contact Me
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/Muhammadhammad24", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/Hammad", label: "LinkedIn" },
                { icon: Mail, href: "mailto:muhammad24997@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} target="_blank"
                  className="social-icon-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
              <span className="font-['JetBrains_Mono'] text-xs" style={{ color: textMuted }}>+49 176 8733 3721</span>
            </div>
          </div>

          {/* RIGHT — Cyber Roles Orbital (swapped here, canvas removed) */}
          <div className="flex justify-center items-center">
            <CyberRoles />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.3em] uppercase" style={{ color: Gmuted }}>
            Scroll
          </span>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${G}, transparent)` }} />
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <TechMarquee />

      {/* ═══════════ CORE SPECIALIZATIONS ═══════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.2), transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.1), transparent)' }} />
        </div>
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-sm"
              style={{ color: G, border: '1px solid rgba(0,255,65,0.2)', background: 'rgba(0,255,65,0.04)' }}>
              Core Specializations
            </span>
            <h2 className="font-['Syne'] text-3xl font-bold mt-4" style={{ color: '#e8ffe8' }}>
              What I Do Best
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                role: "DevSecOps",
                color: "#00ff41",
                desc: "Bridging development, security, and operations — CI/CD pipelines with security baked in, not bolted on.",
                tools: ["CrowdStrike", "Splunk", "Okta", "Terraform", "Ansible", "Docker"],
                metric: "95% automated resolution",
              },
              {
                role: "Cloud Engineer",
                color: "#39ff14",
                desc: "Architecting and managing multi-cloud environments across Azure, AWS, and GCP with IaC and container orchestration.",
                tools: ["Microsoft Azure", "AWS", "GCP", "Kubernetes", "Terraform", "Hyper-V"],
                metric: "6h → 90min deployment",
              },
              {
                role: "IT Infrastructure",
                color: "#00e637",
                desc: "End-to-end enterprise infrastructure management from bare-metal servers to virtual machines and endpoint fleets.",
                tools: ["VMware ESXi", "Windows Server", "Active Directory", "Intune", "SCCM", "Veeam"],
                metric: "99.7% uptime maintained",
              },
              {
                role: "Network Engineer",
                color: "#66ff66",
                desc: "Designing, securing, and monitoring enterprise networks with Cisco, Juniper, and next-gen firewall solutions.",
                tools: ["Cisco Meraki", "Juniper", "pfSense", "Fortinet", "VPN", "Wi-Fi 6/7"],
                metric: "80% unauthorized access cut",
              },
              {
                role: "IT Security",
                color: "#00ffaa",
                desc: "Implementing Zero Trust architecture, SIEM, endpoint protection, and vulnerability management at enterprise scale.",
                tools: ["Microsoft Sentinel", "Defender", "CrowdStrike", "Okta", "Splunk", "Palo Alto"],
                metric: "99.2% threat detection",
              },
              {
                role: "IT Support Engineer",
                color: "#80ff80",
                desc: "Delivering L1/L2/L3 support, endpoint management, and ITSM operations with ITIL-aligned processes.",
                tools: ["ServiceNow", "Jira SM", "Intune", "Jamf Pro", "Zendesk", "TeamViewer"],
                metric: "94% SLA resolution rate",
              },
            ].map((spec, i) => (
              <SpecCard key={spec.role} spec={spec} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-32 relative">
        <div className="container">
          <SectionHeading title="About Me" subtitle="01 — Background" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mt-16">

            {/* ── LEFT: Photo + Contact ── */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl p-6 bracket-card flex flex-col items-center text-center gap-4"
                style={{ background: surface, border: `1px solid ${Gborder}` }}>
                <ProfilePhoto />
                <div>
                  <div className="font-['Syne'] text-lg font-bold" style={{ color: '#e8ffe8' }}>Muhammad Hammad</div>
                  <div className="font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase mt-1" style={{ color: Gdim }}>
                    IT Infrastructure & Security Engineer
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ background: 'rgba(0,255,65,0.06)', border: '1px solid rgba(0,255,65,0.18)' }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: G, boxShadow: `0 0 5px ${G}` }} />
                  <span className="font-['JetBrains_Mono'] text-[10px] tracking-wider" style={{ color: Gdim }}>
                    Open to Opportunities
                  </span>
                </div>
              </div>

              <div className="rounded-2xl p-4 space-y-3 bracket-card"
                style={{ background: surface, border: `1px solid ${Gborder}` }}>
                {[
                  { icon: MapPin, text: "Germany" },
                  { icon: Phone, text: "+49 176 8733 3721" },
                  { icon: Mail, text: "muhammad24997@gmail.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 cyber-icon-sm">
                      <Icon className="h-3 w-3" style={{ color: Gdim }} />
                    </div>
                    <span className="text-sm" style={{ color: textDim }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Summary + Education + Languages ── */}
            <div className="lg:col-span-3 space-y-8">

              {/* ─ Professional Summary ─ */}
              <div>
                {/* Section label */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: G, boxShadow: `0 0 8px ${G}` }} />
                  <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: G }}>
                    Professional Summary
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(0,255,65,0.1)' }} />
                </div>
                <GlassmorphicCard>
                  <p className="leading-relaxed text-sm mb-3" style={{ color: textDim }}>
                    IT professional with <span style={{ color: G, fontWeight: 600 }}>6+ years</span> of expertise in system
                    administration, cloud infrastructure, network engineering, and cybersecurity. Specializing in managing
                    large-scale enterprise environments through intelligent automation and AI-driven orchestration.
                  </p>
                  <p className="leading-relaxed text-sm mb-3" style={{ color: textDim }}>
                    Proven track record implementing <span style={{ color: G, fontWeight: 600 }}>Zero Trust security</span> frameworks,
                    achieving <span style={{ color: G, fontWeight: 600 }}>99.2% threat detection accuracy</span> and deploying
                    cloud environments for 180+ remote employees across 12 international locations.
                  </p>
                  <p className="leading-relaxed text-sm" style={{ color: textDim }}>
                    Career objective: Integrating AI chatbots, automated provisioning, and intelligent monitoring
                    to achieve <span style={{ color: G, fontWeight: 600 }}>80% automated support tickets</span> and zero-breach security posture.
                  </p>
                </GlassmorphicCard>
              </div>

              {/* ─ Education ─ */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: G, boxShadow: `0 0 8px ${G}` }} />
                  <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: G }}>
                    Education
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(0,255,65,0.1)' }} />
                </div>
                <div className="space-y-3">
                  {[
                    {
                      degree: "M.Sc. Data Science & Computer Science",
                      school: "Georg-August-Universität Göttingen",
                      location: "Germany",
                      period: "2023 – 2026",
                      courses: "Statistical Analysis · Database Management · IT Analytics",
                      badge: "Masters",
                    },
                    {
                      degree: "B.Sc. Computer Science",
                      school: "University of Karachi",
                      location: "Pakistan",
                      period: "2016 – 2018",
                      courses: "Network Administration · Database Systems · Programming",
                      badge: "Bachelors",
                    },
                  ].map((edu) => (
                    <div key={edu.school}
                      className="rounded-xl p-4 bracket-card transition-all duration-300"
                      style={{ background: surface, border: `1px solid ${Gborder}` }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
                              style={{ background: 'rgba(0,255,65,0.08)', border: '1px solid rgba(0,255,65,0.2)', color: Gdim }}>
                              {edu.badge}
                            </span>
                          </div>
                          <div className="font-['Syne'] font-bold text-sm" style={{ color: '#e8ffe8' }}>{edu.degree}</div>
                          <div className="text-xs mt-0.5" style={{ color: Gdim }}>
                            {edu.school} · <span style={{ color: 'rgba(232,255,232,0.35)' }}>{edu.location}</span>
                          </div>
                          <div className="font-['JetBrains_Mono'] text-[10px] mt-2 leading-relaxed" style={{ color: Gmuted }}>
                            {edu.courses}
                          </div>
                        </div>
                        <span className="font-['JetBrains_Mono'] text-[10px] whitespace-nowrap px-2 py-1 rounded-sm shrink-0"
                          style={{ color: G, border: `1px solid ${Gborder}`, background: 'rgba(0,255,65,0.05)' }}>
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─ Languages ─ */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: G, boxShadow: `0 0 8px ${G}` }} />
                  <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: G }}>
                    Languages
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(0,255,65,0.1)' }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { lang: "English", native: "C1", level: "Fluent", pct: 90, code: "EN" },
                    { lang: "German",  native: "B1", level: "Intermediate", pct: 55, code: "DE" },
                  ].map((l) => (
                    <div key={l.lang} className="rounded-xl p-4 bracket-card"
                      style={{ background: surface, border: `1px solid ${Gborder}` }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-['JetBrains_Mono'] text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.25)', color: '#00ff41' }}>
                            {l.code}
                          </span>
                          <span className="font-['Syne'] text-sm font-bold" style={{ color: '#e8ffe8' }}>{l.lang}</span>
                        </div>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded-sm"
                          style={{ color: G, border: `1px solid ${Gborder}`, background: 'rgba(0,255,65,0.05)' }}>
                          {l.native}
                        </span>
                      </div>
                      <div className="text-xs mb-2" style={{ color: textMuted }}>{l.level}</div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,65,0.08)' }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${l.pct}%`, background: `linear-gradient(90deg, #00cc33, ${G})`, boxShadow: `0 0 6px ${G}` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS — tabbed categories + circular rings ═══════════ */}
      <section id="skills" className="py-32 relative">
        <div className="container">
          <SectionHeading title="My Skills" subtitle="02 — Expertise" />
          <p className="text-center mt-4 text-sm max-w-2xl mx-auto" style={{ color: textDim }}>
            I've worked with a variety of technologies throughout my career. Here's a breakdown of my technical skills and proficiency levels.
          </p>
          <SkillsTabbed />
        </div>
      </section>

      {/* ═══════════ CERTIFICATIONS — live-site card style ═══════════ */}
      <section className="py-24 relative">
        <div className="container">
          <SectionHeading title="Professional Certifications" subtitle="03 — Credentials" />
          <p className="text-center mt-4 text-sm max-w-2xl mx-auto mb-12" style={{ color: textDim }}>
            Industry-recognised certifications validating expertise in IT service management, cloud infrastructure, and enterprise security.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "ITIL Foundation", subtitle: "IT Service Management", issuer: "ITIL", color: "#00ff41", icon: "◈" },
              { name: "System Administration & IT Infrastructure", subtitle: "Cloud Infrastructure", issuer: "Google", color: "#39ff14", icon: "◈" },
              { name: "Information Security", subtitle: "IT Support Technicians", issuer: "Security Institute", color: "#00cc33", icon: "◈" },
              { name: "Windows Server Fundamentals", subtitle: "Enterprise Infrastructure", issuer: "Microsoft", color: "#66ff66", icon: "◈" },
              { name: "HDI Support Center Analyst", subtitle: "Help Desk Best Practices", issuer: "HDI", color: "#00ff41", icon: "◈" },
              { name: "Linux Essentials", subtitle: "Linux Administration", issuer: "Linux Professional Institute", color: "#39ff14", icon: "◈" },
              { name: "Discovering Computer Networks", subtitle: "Network Engineering", issuer: "Open Networking Lab", color: "#00cc33", icon: "◈" },
              { name: "Successful IT Systems", subtitle: "Strategic IT Design", issuer: "IT Systems Institute", color: "#66ff66", icon: "◈" },
            ].map((cert, i) => (
              <CertCard key={i} cert={cert} index={i} />
            ))}
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10" style={{ borderTop: `1px solid ${Gborder}` }}>
            {[
              { value: "13", label: "Technology Categories" },
              { value: "95%+", label: "Automated Resolution" },
              { value: "8", label: "Professional Certifications" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-['Syne'] text-4xl font-bold glow-text mb-1" style={{ color: G }}>{s.value}</div>
                <div className="font-['JetBrains_Mono'] text-xs tracking-widest uppercase" style={{ color: Gmuted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.03) 0%, transparent 70%)' }} />
        </div>
        <div className="container relative z-10">
          <SectionHeading title="Projects" subtitle="04 — Work" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {/* Project 1 */}
            <ProjectCard
              number="01"
              title="InfoTech Wizard — AI-Powered IT Support Chatbot"
              description="Full-stack RAG-based IT support chatbot. FastAPI backend with PyTorch, Sentence-Transformers, and FAISS vector search. React/TypeScript frontend with real-time chat interface, Docker containerization, and comprehensive security features."
              metric="60% reduction"
              metricLabel="in IT ticket volume"
              features={[
                "Retrieval-Augmented Generation (RAG) pipeline with FAISS vector search",
                "Real-time chat interface with comprehensive security features",
                "Docker containerization for seamless deployment",
                "60% reduction in IT support ticket volume through intelligent automation",
              ]}
              tags={["FastAPI", "React", "TypeScript", "PyTorch", "Sentence-Transformers", "FAISS", "HuggingFace", "Docker", "RAG Architecture"]}
              repoUrl="https://github.com/Muhammadhammad24/Infotech-Wizard"
              demoUrl="https://github.com/Muhammadhammad24/Infotech-Wizard"
            />

            {/* Project 2 */}
            <ProjectCard
              number="02"
              title="NNApprox — AI-Powered System Analytics & Optimization"
              description="Python-based framework using PyTorch and JAX for intelligent system performance prediction and automated optimization. Custom neural network models with adaptive learning algorithms processing IT infrastructure metrics and system logs."
              metric="92% prediction accuracy"
              metricLabel="65% reduction in manual monitoring"
              features={[
                "Intelligent system performance prediction using custom neural network models",
                "Adaptive learning algorithms for IT infrastructure metrics analysis",
                "Automated analysis pipelines with comparative benchmarking",
                "92% prediction accuracy with 65% reduction in manual monitoring efforts",
              ]}
              tags={["Python", "PyTorch", "JAX", "TensorFlow", "Neural Networks", "Adaptive Learning", "System Analytics", "Performance Optimization", "Predictive Modeling", "Automated Pipelines"]}
              repoUrl="https://github.com/Muhammadhammad24/nnapprox"
              demoUrl="https://github.com/Muhammadhammad24/nnapprox"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="py-32 relative">
        <div className="container">
          <SectionHeading title="Experience" subtitle="05 — Career" />
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)' }} />
        </div>
        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="06 — Contact" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-16">
            <GlassmorphicCard>
              <h3 className="font-['Syne'] text-2xl font-bold mb-2" style={{ color: '#e8ffe8' }}>
                Let's Connect
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: textDim }}>
                Open to IT Engineer roles, consulting, and enterprise infrastructure projects in Germany and internationally.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Mail, label: "Email", value: "muhammad24997@gmail.com", href: "mailto:muhammad24997@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+49 176 8733 3721", href: "tel:+4917687333721" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/Hammad", href: "https://linkedin.com/in/Hammad" },
                  { icon: Github, label: "GitHub", value: "github.com/Muhammadhammad24", href: "https://github.com/Muhammadhammad24" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" className="flex items-center gap-4 group">
                    <div className="contact-icon-btn w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300">
                      <Icon className="h-4 w-4" style={{ color: Gdim }} />
                    </div>
                    <div>
                      <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase" style={{ color: Gmuted }}>{label}</div>
                      <div className="text-sm" style={{ color: textDim }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6" style={{ borderTop: `1px solid ${Gborder}` }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: G, boxShadow: `0 0 6px ${G}` }} />
                  <span className="text-sm" style={{ color: textMuted }}>Available · Germany-based · Remote-friendly</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-10" style={{ borderTop: `1px solid ${Gborder}` }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" style={{ color: G }} />
              <span className="font-['Syne'] font-bold text-xl tracking-widest" style={{ color: G }}>M·H</span>
            </div>
            <p className="font-['JetBrains_Mono'] text-xs mt-1.5" style={{ color: textMuted }}>
              © {new Date().getFullYear()} Muhammad Hammad · IT Infrastructure & Security Engineer · Germany
            </p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/Muhammadhammad24" },
              { icon: Linkedin, href: "https://linkedin.com/in/Hammad" },
              { icon: Mail, href: "mailto:muhammad24997@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <Link key={href} href={href} target="_blank"
                className="social-icon-btn w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Icon className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
