# Muhammad Hammad — IT Infrastructure & Security Engineer Portfolio

Personal portfolio website for Muhammad Hammad, IT Infrastructure & Security Engineer based in Germany.

## Tech Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — animations
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Structure

```
app/
  globals.css      # Global styles + cyber theme
  layout.tsx       # Root layout + metadata + favicon
  page.tsx         # Main portfolio page

components/
  floating-nav.tsx     # Fixed nav with smooth scroll
  profile-photo.tsx    # Animated photo widget
  cyber-roles.tsx      # Orbital specializations diagram
  spec-card.tsx        # "What I Do Best" cards with SVG icons
  tech-marquee.tsx     # Scrolling tech stack bar (hover to pause)
  project-card.tsx     # Project showcase cards
  timeline.tsx         # Work experience timeline
  contact-form.tsx     # Contact form
  glassmorphic-card.tsx
  section-heading.tsx
  scroll-progress.tsx

public/
  photo_hammad.jpg   # Profile photo
  favicon.svg        # Shield favicon
  icons/             # SVG tech-stack icons
```
