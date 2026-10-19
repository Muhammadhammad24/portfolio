import Link from "next/link"
import { GitHubMark, GmailMark, LinkedInMark, MapsMark, PhoneMark } from "@/components/brand-marks"
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
            The lower half of the picture above is not a wish list. I have handed it back to a
            government body in Karachi, a logistics firm, a bookstore chain and now a company
            spread over twelve countries. Below is my GitHub, read live from their API — not a
            claim about my work, just the work.
          </p>

          <div className="section-body measure-wide">
            <GitHubPanel />
          </div>
        </div>
      </SectionReveal>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <SectionReveal id="experience-section" className="section">
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

      {/* ═══════════ PROJECTS ═══════════ */}
      <SectionReveal id="projects" className="section">
        <div className="container relative z-10">
          <SectionHeading title="Projects" subtitle="Work" />

          <ProjectsExplorer />
        </div>
      </SectionReveal>

      {/* ═══════════ SKILLS — tabbed categories + circular rings ═══════════ */}
      <SectionReveal id="skills" className="section">
        <div className="container">
          <SectionHeading title="Skills" subtitle="Expertise" />
          <p className="section-lede">
            Seven domains, and in each one the tools I actually have my hands on — not a list of everything I have ever opened.
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
                  { icon: MapsMark, text: "Germany" },
                  { icon: PhoneMark, text: "+49 176 8733 3721" },
                  { icon: GmailMark, text: "muhammad24997@gmail.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="mark-ring">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-dim)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: story, education, languages ── */}
            <div className="space-y-12">
              <div className="space-y-5">
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-dim)' }}>
                  IT Infrastructure Engineer with{" "}
                  <span style={{ color: 'var(--text)' }}>7 years of experience</span> bridging
                  traditional system administration and cloud-native approaches. I manage{" "}
                  <span style={{ color: 'var(--text)' }}>500+ endpoints</span> across Azure and AWS,
                  with a strong foundation in Windows and Linux server administration, enterprise
                  networking, and GDPR-aligned Zero Trust security.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-dim)' }}>
                  I build infrastructure that runs quietly in the background, scales without drama,
                  stays secure, and rarely needs anyone to step in. If your systems feel messy,
                  manual, or held together by too many late-night fixes, that is the kind of problem
                  I like solving. Bring me the chaos, I will hand back something clean and
                  self-reliant. Reach out anytime — let's build something together.
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

      {/* ═══════════ CONTACT ═══════════ */}
      <SectionReveal id="contact" className="section">
        <div className="container relative z-10">
          <SectionHeading title="Get in touch" subtitle="Contact" />
          <div className="section-body measure-wide grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
            <GlassmorphicCard>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                Let's connect
              </h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                I am open to IT engineer and infrastructure roles in Germany, remote or on site. If you have a messy environment that needs sorting out, that is the kind of work I like most.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: GmailMark, label: "Email", value: "muhammad24997@gmail.com", href: "mailto:muhammad24997@gmail.com" },
                  { icon: PhoneMark, label: "Phone", value: "+49 176 8733 3721", href: "tel:+4917687333721" },
                  { icon: LinkedInMark, label: "LinkedIn", value: "linkedin.com/in/mhammad24", href: "https://www.linkedin.com/in/mhammad24/" },
                  { icon: GitHubMark, label: "GitHub", value: "github.com/Muhammadhammad24", href: "https://github.com/Muhammadhammad24" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="mark-ring">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[13px] tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{label}</div>
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
              © {new Date().getFullYear()} Muhammad Hammad · IT Infrastructure Engineer · Germany
            </p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: GitHubMark, href: "https://github.com/Muhammadhammad24", label: "GitHub" },
              { icon: LinkedInMark, href: "https://www.linkedin.com/in/mhammad24/", label: "LinkedIn" },
              { icon: GmailMark, href: "mailto:muhammad24997@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              /* The mark is decorative, so without a label these three read as
                 bare URLs to a screen reader. The hero's row names them. */
              <Link key={href} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="mark-ring"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
