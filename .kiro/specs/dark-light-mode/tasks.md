# Implementation Plan: Dark / Light Mode Toggle

## Overview

Implement a persistent dark/light mode toggle for the creative portfolio. The work follows four
sequential phases:

1. **CSS Token Layer** — add dark + light palettes to `globals.css`; all colour values resolve from
   `var(--token)` references from this point forward.
2. **ThemeProvider + ThemeToggle** — wire up `next-themes`, create the context wrapper, and build
   the animated Sun/Moon button.
3. **Layout integration** — mount the provider in `app/layout.tsx` and embed the toggle in
   `FloatingNav`.
4. **Component token migration** — replace every hardcoded hex / rgba colour in all 14+ components
   with the correct CSS variable references.

All code is TypeScript/TSX. Dependencies (`next-themes`, `framer-motion`, `lucide-react`) are
already installed.

---

## Tasks

- [x] 1. Add CSS Token Layer to `globals.css`
  - Define the complete dark-mode palette under `:root` and `[data-theme="dark"]` selectors,
    preserving all existing custom property names (`--green`, `--bg`, `--surface`, `--border`,
    `--border-hot`, `--text`, `--text-dim`, `--text-muted`) and adding the new tokens
    (`--nav-bg`, `--card-bg`, `--card-border`, `--input-bg`, `--icon-filter`,
    `--scrollbar-thumb`, `--green-dim`, `--green-mid`, `--green-glow`, `--green-glow2`).
  - Define the complete light-mode palette under `[data-theme="light"]` using the values from
    the design document's `LightPalette` interface (`--green: #00b32d`, `--bg: #f4f9f4`, etc.).
  - Add the `body` / `html` colour-transition rule:
    `html { transition: background-color 0.25s ease, color 0.25s ease; }`.
  - Add `[data-theme="light"] .scanline { display: none; }`.
  - Add `[data-theme="light"] body::before { opacity: 0.15; }`.
  - Update `.grid-bg` background-image to use `var(--border)` tint values so grid lines stay
    visible in both modes.
  - Update scrollbar colours to use `var(--scrollbar-thumb)`.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 2. Create `ThemeProvider` and `useTheme` hook
  - [x] 2.1 Create `components/theme-provider.tsx`
    - Wrap `next-themes` `ThemeProvider` with `attribute="data-theme"`, `defaultTheme="dark"`,
      and `enableSystem`.
    - Export a `useTheme()` re-export from `next-themes` so consumers get `theme`, `setTheme`,
      and a `toggleTheme` convenience function via the same import path.
    - Add the `mounted` guard pattern to prevent hydration mismatches.
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 6.3, 7.2_

  - [x]* 2.2 Write property test for `ThemeProvider` toggle involution (Property 2)
    - **Property 2: Toggle is an involution (double-toggle identity)**
    - Use `fast-check` with `fc.constantFrom("dark", "light")`: render the provider with an
      initial theme, call `toggleTheme()` twice, assert the result equals the initial value.
    - **Validates: Requirements 2.5**

  - [x]* 2.3 Write property test for `ThemeProvider` persistence round-trip (Property 1)
    - **Property 1: Theme persistence round-trip**
    - Use `fast-check`: after `setTheme(t)`, read `localStorage.getItem("theme")` and assert it
      equals `t` for any value in `{"dark", "light"}`.
    - **Validates: Requirements 1.3**

- [x] 3. Create `ThemeToggle` button component
  - [x] 3.1 Create `components/theme-toggle.tsx`
    - Import `Sun` and `Moon` from `lucide-react`; call `useTheme()` from `next-themes`.
    - Render `<Sun>` when `theme === "dark"` and `<Moon>` when `theme === "light"`.
    - Animate the icon swap with a `framer-motion` `AnimatePresence` + `motion.div` rotate/scale
      transition (matches existing pattern in `FloatingNav`).
    - Set `aria-label="Switch to light mode"` when dark, `"Switch to dark mode"` when light.
    - Minimum touch target: `44px × 44px` (use `min-w-[44px] min-h-[44px]` or equivalent
      inline padding).
    - Add visible focus ring: `outline: 2px solid var(--border-hot); outline-offset: 2px`.
    - Accept optional `className` and `style` props.
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 6.1, 6.2, 6.4_

  - [x]* 3.2 Write property test for `ThemeToggle` icon/aria consistency (Property 3)
    - **Property 3: ThemeToggle icon and aria-label are consistent with active theme**
    - Use `fast-check` with `fc.constantFrom("dark", "light")`: for each theme value render the
      toggle, assert the correct icon is present and the `aria-label` matches the expected string.
      Assert `Moon` is never rendered when `theme === "dark"`.
    - **Validates: Requirements 2.3, 2.4, 2.7, 6.4**

- [x] 4. Integrate `ThemeProvider` into `app/layout.tsx` and mount `ThemeToggle` in `FloatingNav`
  - [x] 4.1 Update `app/layout.tsx`
    - Wrap `{children}` with `<ThemeProvider>` (import from `components/theme-provider.tsx`).
    - Add `suppressHydrationWarning` to the `<html>` tag.
    - Remove the hard-coded `bg-[#050a05]` class from `<body>` and replace with
      `style={{ background: 'var(--bg)', color: 'var(--text)' }}`.
    - _Requirements: 1.6, 6.3_

  - [x] 4.2 Update `components/floating-nav.tsx`
    - Import and render `<ThemeToggle>` to the right of the "Hire Me" button on the desktop row.
    - Render `<ThemeToggle>` at the bottom of the mobile full-screen menu `<div>`.
    - Replace the hard-coded nav pill background `rgba(3,8,3,0.96)` with `var(--nav-bg)`.
    - Replace all other hard-coded colour literals with their CSS variable equivalents
      (`#00ff41` → `var(--green)`, `rgba(0,255,65,0.22)` → `var(--border)`, etc.).
    - _Requirements: 2.1, 2.2, 4.14_

- [x] 5. Checkpoint — verify provider + toggle work end-to-end
  - Ensure the `data-theme` attribute flips on `<html>` when the toggle is clicked, the Sun/Moon
    icon animates correctly, `localStorage` is updated, and the colour transition is smooth.
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Migrate `app/page.tsx` colour constants to CSS tokens
  - [x] 6.1 Replace `page.tsx` hardcoded colour constants
    - Remove the constant block at the top of the file (`const G`, `Gdim`, `Gmuted`, `Gborder`,
      `surface`, `textDim`, `textMuted`).
    - Replace all occurrences of these constants with their CSS variable equivalents
      (`var(--green)`, `var(--green-mid)`, `var(--text-muted)`, `var(--border)`,
      `var(--card-bg)`, `var(--text-dim)`, `var(--text-muted)`) throughout the file.
    - Replace `#050a05` / `#030703` page background references with `var(--bg)`.
    - Replace `#e8ffe8` / `#e4ffe4` text colour references with `var(--text)`.
    - _Requirements: 4.1_

- [x] 7. Migrate core shared components to CSS tokens
  - [x] 7.1 Update `components/glassmorphic-card.tsx`
    - Replace `rgba(0,255,65,0.03)` → `var(--surface)`.
    - Replace `rgba(0,255,65,0.12)` border → `var(--border)`.
    - Replace `rgba(0,255,65,0.3)` hover border → `var(--border-hot)`.
    - Replace shine gradient stop `rgba(0,255,65,0.3)` → `var(--border-hot)`.
    - _Requirements: 4.2_

  - [x] 7.2 Update `components/section-heading.tsx`
    - Replace `#00ff41` colour references → `var(--green)`.
    - Replace `rgba(0,255,65,0.25)` border → `var(--border)`.
    - Replace `rgba(0,255,65,0.05)` background → `var(--surface)`.
    - Replace `#e8ffe8` heading colour → `var(--text)`.
    - _Requirements: 4.9_

  - [x] 7.3 Update `components/scroll-progress.tsx`
    - Replace gradient colours `#00cc33` / `#00ff41` / `#39ff14` with
      `var(--green-dim)`, `var(--green)`, `var(--green)`.
    - Replace `boxShadow` glow `#00ff41` → `var(--green)`.
    - _Requirements: 4.11_

  - [x] 7.4 Update `components/mouse-follower.tsx`
    - Replace `rgba(0,255,65,0.5)` ring border → `var(--border-hot)`.
    - Replace dot `background: '#00ff41'` → `var(--green)`.
    - Replace dot `boxShadow: '0 0 6px #00ff41'` → `0 0 6px var(--green)`.
    - _Requirements: 4.12_

- [x] 8. Migrate card and display components to CSS tokens
  - [x] 8.1 Update `components/project-card.tsx`
    - Replace all `rgba(0,255,65,…)` background, border, and glow values with appropriate
      CSS variable references (`var(--card-bg)`, `var(--border)`, `var(--border-hot)`, etc.).
    - Replace `#e8ffe8` → `var(--text)`, `#00ff41` → `var(--green)`,
      `rgba(232,255,232,0.55)` → `var(--text-dim)`, `rgba(232,255,232,0.5)` → `var(--text-dim)`,
      `rgba(0,255,65,0.5)` → `var(--text-muted)`.
    - _Requirements: 4.3_

  - [x] 8.2 Update `components/cert-card.tsx`
    - Replace hardcoded card backgrounds (`rgba(0,255,65,0.02/0.06)`) → `var(--card-bg)`.
    - Replace border colours → `var(--border)` / `var(--border-hot)`.
    - Replace badge background/border → `var(--surface)` / `var(--border)`.
    - Replace `#e8ffe8` text → `var(--text)`, `rgba(232,255,232,0.43)` → `var(--text-dim)`.
    - Replace issuer text `rgba(0,255,65,0.48)` → `var(--green-mid)`.
    - Replace `#00ff41` icon/dot colours → `var(--green)`.
    - _Requirements: 4.7_

  - [x] 8.3 Update `components/spec-card.tsx`
    - Replace card background and border → `var(--card-bg)` / `var(--border)`.
    - Replace metric pill background/border → `var(--surface)` / `var(--border)`.
    - Replace tool chip colours → `var(--surface)` / `var(--border)` / `var(--green-mid)`.
    - Replace body text `rgba(232,255,232,0.48)` → `var(--text-dim)`.
    - Replace `#e8ffe8` heading → `var(--text)`.
    - _Requirements: 4.8_

- [x] 9. Migrate interactive and data components to CSS tokens
  - [x] 9.1 Update `components/skills-tabbed.tsx` (including `SkillCard`)
    - Replace all card background/border values → `var(--card-bg)` / `var(--border)`.
    - Replace active tab background/border → `var(--surface)` / `var(--border-hot)`.
    - Replace inactive tab colours → `var(--card-bg)` / `var(--border)`.
    - Replace skill bar track `rgba(0,255,65,0.08)` → `var(--surface)`.
    - Replace skill bar gradient start `#00cc33` → `var(--green-dim)`.
    - Replace tier label and text colours → appropriate token variables.
    - Replace `#e8ffe8` text references → `var(--text)` / `var(--text-dim)`.
    - _Requirements: 4.4_

  - [x] 9.2 Update `components/timeline.tsx`
    - Replace connector line gradient `rgba(0,255,65,0.2)` → `var(--border)`.
    - Replace timeline dot `border: '2px solid #00ff41'` → `var(--green)`, `background: '#050a05'` → `var(--bg)`.
    - Replace timeline dot `boxShadow` glow → `var(--green-glow)`.
    - Replace card background/border → `var(--card-bg)` / `var(--border)`.
    - Replace top shine gradient → `var(--border)`.
    - Replace `#e8ffe8` headings → `var(--text)`.
    - Replace `rgba(0,255,65,0.6)` company name → `var(--green-mid)`.
    - Replace `rgba(232,255,232,0.4/0.5)` text → `var(--text-dim)`.
    - Replace `#00ff41` period badge and bullet → `var(--green)`.
    - _Requirements: 4.5_

  - [x] 9.3 Update `components/contact-form.tsx`
    - Replace `inputStyle` object `rgba(0,255,65,0.03)` background → `var(--input-bg)`.
    - Replace input border `rgba(0,255,65,0.15)` → `var(--border)`.
    - Replace focus border `rgba(0,255,65,0.4)` → `var(--border-hot)`.
    - Replace input text colour `#e8ffe8` → `var(--text)`.
    - Replace form card background/border → `var(--card-bg)` / `var(--border)`.
    - Replace shine line gradient → `var(--border-hot)`.
    - Replace heading `#e8ffe8` → `var(--text)`.
    - Replace success state `#00ff41` → `var(--green)`.
    - _Requirements: 4.6_

- [x] 10. Migrate animated and utility components to CSS tokens
  - [x] 10.1 Update `components/tech-marquee.tsx`
    - Replace the hardcoded `filter` string on `<img>` with `filter: var(--icon-filter)` so
      icons tint correctly on both dark and light backgrounds (both default and hover states).
    - Replace marquee wrapper border/background `rgba(0,255,65,0.1/0.015)` → `var(--border)` /
      `var(--surface)`.
    - Replace hover chip background `rgba(0,255,65,0.1)` → `var(--surface)`.
    - Replace label `#00ff41` → `var(--green)`, inactive `rgba(0,255,65,0.38)` → `var(--green-mid)`.
    - Replace separator dot colour → `var(--border)` / `var(--green-mid)`.
    - _Requirements: 4.10_

  - [x] 10.2 Update `components/cyber-roles.tsx`
    - Replace `ShieldCore` orbital ring borders `rgba(0,255,65,…)` → `var(--border)`.
    - Replace centre circle radial gradient stops → `var(--green-glow)` / `var(--green-glow2)`.
    - Replace centre circle border → `var(--border-hot)`.
    - Replace Shield icon colour `#00ff41` → `var(--green)`.
    - Replace `RoleChip` chip backgrounds `rgba(0,10,0,0.97)` / `rgba(0,8,0,0.92)` →
      `var(--card-bg)`.
    - Replace chip border → `var(--border)` (inactive) / active role colour (active, keep as-is).
    - Replace chip inactive text `rgba(232,255,232,0.6)` → `var(--text-dim)`.
    - Replace inner ring borders → `var(--border)`.
    - Replace active label card background/border → `var(--surface)` / `var(--border)`.
    - Replace active label desc text `rgba(0,255,65,0.38)` → `var(--green-mid)`.
    - Replace "Core Specializations" label `rgba(0,255,65,0.35)` → `var(--green-mid)`.
    - _Requirements: 4.13_

  - [x] 10.3 Update `components/profile-photo.tsx`
    - Replace rotating ring border `rgba(0,255,65,0.2)` → `var(--border)`.
    - Replace static inner ring border `rgba(0,255,65,0.1)` → `var(--border)`.
    - Replace photo container border `rgba(0,255,65,0.45)` → `var(--border-hot)`.
    - Replace photo container `boxShadow` green glow values → `var(--green-glow)` / `var(--green-glow2)`.
    - Replace pulse dot `background: '#00ff41'` → `var(--green)`.
    - Replace pulse dot `border: '2px solid #030703'` → `var(--bg)`.
    - Replace pulse dot `boxShadow` glow → `var(--green-glow)`.
    - _Requirements: 4.15_

- [x] 11. Final checkpoint — full theme switch validation
  - Build the project (`npm run build`) and confirm zero TypeScript and lint errors.
  - Toggle between dark and light mode; visually verify all 14+ components in both themes.
  - Confirm `localStorage` persists the chosen theme across a page reload.
  - Confirm `aria-label` updates on every toggle click.
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Start the development server for local visual testing
  - Run `npm run dev` in the project root to start the Next.js development server.
  - Open `http://localhost:3000` in a browser to verify the dark/light mode toggle works
    visually across all sections and components.
  - **Note:** This task is a manual step — run `npm run dev` in your terminal and inspect
    the result in the browser.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery.
- Each task references specific requirements for full traceability back to the spec.
- The colour-transition rule on `html` means all CSS-token-driven repaints animate smoothly
  at 0.25s with no JavaScript on the rendering hot path.
- The `mounted` guard in `ThemeProvider` is mandatory to prevent Next.js hydration warnings.
- Property tests (2.2, 2.3, 3.2) require `fast-check` (`npm install -D fast-check`) and a
  test runner (e.g. Vitest or Jest) configured for the project.
- The three correctness properties map to three `fc.property` test cases; each must be its own
  sub-task so it can be tracked and executed independently.
- Component token migration tasks (6–10) are independent of each other once tasks 1–4 are done
  and can be executed in parallel.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.1"] },
    { "id": 3, "tasks": ["3.2", "4.1", "4.2"] },
    { "id": 4, "tasks": ["6.1", "7.1", "7.2", "7.3", "7.4"] },
    { "id": 5, "tasks": ["8.1", "8.2", "8.3", "9.1", "9.2", "9.3", "10.1", "10.2", "10.3"] }
  ]
}
```
