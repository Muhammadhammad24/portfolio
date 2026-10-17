import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { ProjectsExplorer } from "@/components/projects-explorer"
import { Timeline } from "@/components/timeline"
import { JourneyMap } from "@/components/journey-map"
import { ContactForm } from "@/components/contact-form"
import { FloatingNav } from "@/components/floating-nav"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { GitHubPanel } from "@/components/github-panel"
import { SkillsHex } from "@/components/skills-hex"
import { CertsHex } from "@/components/certs-hex"
import { ProfilePhoto } from "@/components/profile-photo"
import { HeroSection } from "@/components/hero-section"
import { SectionReveal } from "@/components/section-reveal"
import { CommandPalette } from "@/components/command-palette"

export default function Portfolio() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <ScrollProgress />
      <FloatingNav />
      <CommandPalette />

      {/* ═══════════ HERO ═══════════ */}
      <HeroSection />

      {/* ═══════════ TRACK RECORD ═══════════ */}
      <SectionReveal className="section">
        <div className="container">
          <SectionHeading title="Seven years, zero breaches" subtitle="Track record" />
          <p className="section-lede">
            Those six layers are not a wish list. I have run them for a government body in
            Karachi, a logistics firm, a bookstore chain and now a company spread over twelve
            countries. Below is my GitHub, read live from their API — not a claim about my
            work, just the work.
          </p>

          <div className="section-body measure-wide">
            <GitHubPanel />
          </div>
        </div>
      </SectionReveal>

      {/* ═══════════ ABOUT ═══════════ */}
      <SectionReveal id="about" className="section">
        <div className="container">
          <SectionHeading title="About me" subtitle="Background" />

          <div className="section-body measure-wide grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">

            {/* ── Left: portrait + contact ── */}
            <div>
              <ProfilePhoto />
              <div className="mt-6 space-y-3">
                {[
                  { icon: MapPin, text: "Germany" },
                  { icon: Phone, text: "+49 176 8733 3721" },
                  { icon: Mail, text: "muhammad24997@gmail.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: story, education, languages ── */}
            <div className="space-y-12">
              <div className="space-y-5">
                <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-dim)' }}>
                  I started in 2019 on a helpdesk in Karachi. Dead laptops, forgotten passwords, a
                  printer nobody could fix. It taught me the thing I still work by: behind every
                  ticket there is a person who cannot do their job right now.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-dim)' }}>
                  Seven years and seven employers later the numbers are bigger.{" "}
                  <span style={{ color: 'var(--text)' }}>265 government endpoints</span> at KTDMC.{" "}
                  <span style={{ color: 'var(--text)' }}>180 people across 12 countries</span> at
                  TestSolutions. Azure and AWS, Active Directory, firewalls, a few hundred devices
                  that all have to wake up working on Monday. The job never really changed. Keep it
                  running, keep it locked, make sure nobody has to think about it.
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-dim)' }}>
                  What I actually enjoy is deleting work. If something gets done by hand twice, I
                  would rather lose a week automating it than do it a third time — that is how{" "}
                  <span style={{ color: 'var(--text)' }}>25 hours a week</span> of manual onboarding
                  and patching disappeared at TestSolutions. The best compliment my work gets is
                  silence: no outage, no breach, no ticket.
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="eyebrow mb-5">
                  Education
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      degree: "M.Sc. Data Science & Computer Science",
                      school: "Georg-August-Universität Göttingen, Germany",
                      period: "2023 – 2026",
                    },
                    {
                      degree: "B.Sc (Hons) Computational Mathematics",
                      school: "University of Karachi, Pakistan",
                      period: "2016 – 2018",
                    },
                  ].map((edu) => (
                    <div key={edu.degree} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <div>
                        <div className="font-medium" style={{ color: 'var(--text)' }}>{edu.degree}</div>
                        <div className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>{edu.school}</div>
                      </div>
                      <span className="shrink-0 text-sm whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="eyebrow mb-5">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {[
                    { lang: "English", level: "Fluent · C1" },
                    { lang: "German", level: "Intermediate · B1" },
                    { lang: "Urdu", level: "Native" },
                  ].map((l) => (
                    <div key={l.lang}>
                      <div className="font-medium" style={{ color: 'var(--text)' }}>{l.lang}</div>
                      <div className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>{l.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* ═══════════ SKILLS — tabbed categories + circular rings ═══════════ */}
      <SectionReveal id="skills" className="section">
        <div className="container">
          <SectionHeading title="Skills" subtitle="Expertise" />
          <p className="section-lede">
            Grouped by the same six layers as the stack above, and kept to what I actually reach for.
          </p>
          <SkillsHex />
        </div>
      </SectionReveal>

      {/* ═══════════ CERTIFICATIONS — live-site card style ═══════════ */}
      <SectionReveal id="certifications" className="section">
        <div className="container">
          <SectionHeading title="Certifications" subtitle="Credentials" />
          <p className="section-lede">
            Pick one to read what it covered. The Coursera ones link out so you can check them yourself rather than take my word for it.
          </p>
          <CertsHex />

          {/* Bottom stats removed */}
        </div>
      </SectionReveal>
      {/* ═══════════ PROJECTS ═══════════ */}
      <SectionReveal id="projects" className="section">
        <div className="container relative z-10">
          <SectionHeading title="Projects" subtitle="Work" />

          <ProjectsExplorer />
        </div>
      </SectionReveal>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <SectionReveal className="section">
        <div className="container">
          <SectionHeading title="How I got here" subtitle="The road" />
          <p className="section-lede">
            Seven years, two countries, seven employers. It started on a helpdesk in Karachi
            and it has been the same job ever since, only the number of people depending
            on it keeps going up.
          </p>

          <div className="section-body measure-wide">
            <JourneyMap />
          </div>

          {/* The nav's Experience lands here, on the roles themselves. */}
          <div id="experience" className="mt-20">
            <h3 className="eyebrow mb-10">
              The detail
            </h3>
            <Timeline />
          </div>
        </div>
      </SectionReveal>

      {/* ═══════════ CONTACT ═══════════ */}
      <SectionReveal id="contact" className="section">
        <div className="container relative z-10">
          <SectionHeading title="Get in touch" subtitle="Contact" />
          <div className="section-body measure-wide grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
            <GlassmorphicCard>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
                Let's connect
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                I am open to IT engineer and infrastructure roles in Germany, remote or on site. If you have a messy environment that needs sorting out, that is the kind of work I like most.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Mail, label: "Email", value: "muhammad24997@gmail.com", href: "mailto:muhammad24997@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+49 176 8733 3721", href: "tel:+4917687333721" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/mhammad24", href: "https://www.linkedin.com/in/mhammad24/" },
                  { icon: Github, label: "GitHub", value: "github.com/Muhammadhammad24", href: "https://github.com/Muhammadhammad24" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <Icon className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                    <div>
                      <div className="text-[11px] tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{label}</div>
                      <div className="text-sm" style={{ color: 'var(--text-dim)' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6" style={{ borderTop: `1px solid var(--border)` }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Available · Germany-based · Remote-friendly</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </SectionReveal>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-10" style={{ borderTop: `1px solid var(--border)` }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-base font-semibold" style={{ color: 'var(--text)' }}>MH</span>
            <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Muhammad Hammad · IT Infrastructure & Security Engineer · Germany
            </p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/Muhammadhammad24" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mhammad24/" },
              { icon: Mail, href: "mailto:muhammad24997@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <Link key={href} href={href} target="_blank" rel="noopener noreferrer"
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
