# Requirements Document

## Introduction

This document defines the requirements for adding a dark/light mode toggle to the creative portfolio
Next.js application. The feature allows visitors to switch between a dark (green-on-near-black,
Matrix/cyber aesthetic) and a light (vivid green accents on an off-white canvas) theme. Every one
of the portfolio's 14+ components must look vibrant and readable in both modes. The user's
preference is persisted in `localStorage` and the OS `prefers-color-scheme` signal is respected on
first visit.

---

## Glossary

- **ThemeProvider**: The React context component that owns theme state and syncs it to the `<html>`
  element and `localStorage`.
- **ThemeToggle**: The animated Sun/Moon icon button rendered inside the FloatingNav that lets the
  user switch themes.
- **FloatingNav**: The existing sticky navigation bar component (`components/floating-nav.tsx`).
- **CSS Token Layer**: The set of CSS custom properties in `globals.css` whose values differ per
  `[data-theme]` selector, acting as the single source of truth for all theme-sensitive colours.
- **Design Token**: A named CSS custom property (e.g. `--green`, `--bg`, `--surface`) whose value
  is resolved by the browser at paint time from the active `[data-theme]` block.
- **FOUT**: Flash of Wrong Theme — a brief visible flicker where the page renders in the wrong
  theme before client-side JavaScript can correct it.
- **OS Preference**: The system-level dark/light setting exposed via the CSS media query
  `prefers-color-scheme`.
- **data-theme**: The HTML attribute set on `<html>` by the ThemeProvider to activate the
  correct CSS token block (`"dark"` or `"light"`).
- **next-themes**: The third-party library (already present in `package.json`) used as the
  underlying engine for SSR-safe theme management and FOUT prevention.

---

## Requirements

### Requirement 1: Theme State Management

**User Story:** As a portfolio visitor, I want my theme preference to be remembered across page
reloads, so that I do not have to re-select my preferred theme every time I visit.

#### Acceptance Criteria

1. WHEN a visitor loads the page for the first time with no stored preference, THE ThemeProvider
   SHALL read the OS `prefers-color-scheme` media query and apply the matching theme (`"dark"` or
   `"light"`).

2. WHEN a visitor loads the page and a `"theme"` key exists in `localStorage`, THE ThemeProvider
   SHALL apply the stored theme value instead of the OS preference.

3. WHEN the active theme changes, THE ThemeProvider SHALL write the new theme value to
   `localStorage` under the key `"theme"`.

4. WHEN `localStorage` is unavailable (e.g. private browsing mode or storage quota exceeded), THE
   ThemeProvider SHALL fall back to the OS preference for the current session without surfacing an
   error to the user.

5. THE ThemeProvider SHALL expose a `useTheme()` hook that returns the current `theme` value and
   a `toggleTheme()` function to all descendant components.

6. WHILE the page is hydrating on the client, THE ThemeProvider SHALL prevent a Flash of Wrong
   Theme by applying the correct `data-theme` attribute on `<html>` before the first paint.

---

### Requirement 2: Theme Toggle Button

**User Story:** As a portfolio visitor, I want a clearly visible toggle button in the navigation
bar, so that I can switch between dark and light mode at any time without navigating away.

#### Acceptance Criteria

1. THE FloatingNav SHALL render the ThemeToggle button to the right of the "Hire Me" button on
   desktop viewports.

2. THE FloatingNav SHALL render the ThemeToggle button at the bottom of the mobile full-screen
   menu on mobile viewports.

3. WHEN the active theme is `"dark"`, THE ThemeToggle SHALL display a Sun icon indicating that
   clicking will switch to light mode.

4. WHEN the active theme is `"light"`, THE ThemeToggle SHALL display a Moon icon indicating that
   clicking will switch to dark mode.

5. WHEN a user clicks the ThemeToggle button, THE ThemeProvider SHALL switch the active theme to
   the opposite value (`"dark"` → `"light"` or `"light"` → `"dark"`).

6. WHEN the theme switches, THE ThemeToggle SHALL animate the icon transition using a rotate and
   scale motion so the change feels immediate and polished.

7. THE ThemeToggle SHALL include an `aria-label` attribute that reads `"Switch to light mode"` when
   the current theme is `"dark"` and `"Switch to dark mode"` when the current theme is `"light"`.
   The Moon icon SHALL only be displayed when the current theme is `"light"`; it SHALL NOT appear
   when the current theme is `"dark"`.

8. THE ThemeToggle SHALL be operable via keyboard (Enter and Space keys) in addition to mouse
   click.

---

### Requirement 3: CSS Token Layer

**User Story:** As a developer, I want all theme-sensitive colours to be expressed as CSS custom
properties, so that the entire site repaints atomically when the theme changes without any
JavaScript overhead at runtime.

#### Acceptance Criteria

1. THE CSS Token Layer SHALL define a complete dark-mode palette under the `:root` and
   `[data-theme="dark"]` selectors, preserving all existing custom property names (`--green`,
   `--bg`, `--surface`, `--border`, `--border-hot`, `--text`, `--text-dim`, `--text-muted`,
   `--nav-bg`, `--card-bg`, `--card-border`, `--input-bg`, `--icon-filter`,
   `--scrollbar-thumb`).

2. THE CSS Token Layer SHALL define a complete light-mode palette under the `[data-theme="light"]`
   selector using the same custom property names as the dark palette.

3. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL set `--green` to a value with
   a contrast ratio of at least 4.5:1 against `--bg` to meet WCAG AA requirements.

4. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL set `--text` to a near-black
   value with a contrast ratio of at least 4.5:1 against `--bg`.

5. WHEN `data-theme` changes on `<html>` for any theme transition (dark-to-light or light-to-dark),
   THE CSS Token Layer SHALL apply a smooth transition on `background-color` and `color` of
   `0.25 s ease` so the switch does not feel abrupt.

6. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL hide the `.scanline` overlay
   element.

7. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL reduce the opacity of the
   `body::before` noise texture to `0.15` (from `0.3` in dark mode).

8. THE CSS Token Layer SHALL update the `.grid-bg` background-image opacity values so grid lines
   remain visible in both dark and light modes.

---

### Requirement 4: Component Token Migration

**User Story:** As a developer, I want all 14+ portfolio components to use CSS design tokens
instead of hardcoded hex colours, so that every component automatically repaints correctly when
the theme changes.

#### Acceptance Criteria

1. THE page.tsx file SHALL replace all hardcoded colour literals (e.g. `#00ff41`, `#e8ffe8`,
   `rgba(0,255,65,0.11)`) with their corresponding CSS variable references (e.g. `var(--green)`,
   `var(--text)`, `var(--border)`).

2. THE GlassmorphicCard component SHALL use `var(--surface)`, `var(--border)`, and `var(--text)`
   tokens for its background, border, and text colours.

3. THE ProjectCard component SHALL use CSS tokens for all colour values so it renders correctly
   in both dark and light modes.

4. THE SkillsTabbed component SHALL use CSS tokens for tab backgrounds, active-tab accents, skill
   bar fills, and text colours.

5. THE Timeline component SHALL use CSS tokens for connector lines, dot accents, card backgrounds,
   and text.

6. THE ContactForm component SHALL use CSS tokens for input backgrounds (`var(--input-bg)`),
   borders, labels, and button colours.

7. THE CertCard component SHALL use CSS tokens for card background, border, badge colours, and
   text.

8. THE SpecCard component SHALL use CSS tokens for card background, metric text, tool-pill colours,
   and body text.

9. THE SectionHeading component SHALL use CSS tokens for the heading colour and the subtitle
   accent colour.

10. THE TechMarquee component SHALL apply `filter: var(--icon-filter)` to technology icons so they
    remain visible and correctly tinted on both dark and light backgrounds.

11. THE ScrollProgress component SHALL use CSS tokens for the progress bar gradient colours.

12. THE MouseFollower component SHALL use `var(--border-hot)` for its ring border and `var(--green)`
    for its centre dot.

13. THE CyberRoles component SHALL use CSS tokens for orbital ring fills, chip backgrounds, and
    glow shadow colours.

14. THE FloatingNav component SHALL use `var(--nav-bg)` for its pill background colour and CSS
    tokens for all text and icon colours.

15. THE ProfilePhoto component SHALL use CSS tokens for its border and glow shadow colours.

---

### Requirement 5: Light Mode Visual Quality

**User Story:** As a portfolio visitor, I want the light mode to look just as vibrant and
colourful as dark mode, so that neither mode feels like a degraded or washed-out experience.

#### Acceptance Criteria

1. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL maintain the vivid green
   accent colour (`--green`) at a value that preserves perceived saturation and vibrancy rather
   than appearing pale or grey.

2. WHEN `[data-theme="light"]` is active, THE CSS Token Layer SHALL set the page background
   (`--bg`) to a soft off-white with a subtle green tint (not pure `#ffffff`) to retain the
   "cyber garden" aesthetic.

3. WHEN `[data-theme="light"]` is active, surface overlays and card fills SHALL use
   `rgba`-based green tints (mapped through `--surface`, `--card-bg`) so cards have visible depth
   without being muddy.

4. WHEN `[data-theme="light"]` is active, glow and shadow effects that use `--green-glow` and
   `--green-glow2` SHALL remain proportionally visible so interactive elements still feel
   energetic.

---

### Requirement 6: Accessibility

**User Story:** As a portfolio visitor using assistive technology, I want the theme toggle to be
fully accessible, so that I can operate it regardless of how I navigate the page.

#### Acceptance Criteria

1. THE ThemeToggle button SHALL have a visible focus ring with a minimum contrast ratio of 3:1
   against the adjacent background in both dark and light modes, meeting WCAG AA focus-indicator
   requirements.

2. THE ThemeToggle button SHALL have a minimum touch/click target size of 44 × 44 CSS pixels.

3. THE ThemeProvider SHALL prevent hydration mismatch warnings in the browser console for all
   scenarios, including the initial page load before the client-side theme preference is applied
   and all subsequent theme changes.

4. THE ThemeToggle SHALL have a descriptive `aria-label` that updates dynamically to reflect the
   action the button will perform (not the current state).

---

### Requirement 7: Performance

**User Story:** As a portfolio visitor, I want the theme switch to feel instantaneous, so that
toggling the mode does not slow down or jank the page.

#### Acceptance Criteria

1. WHEN the ThemeToggle is clicked, THE CSS Token Layer SHALL repaint the entire page via CSS
   custom property resolution with no JavaScript execution on the rendering hot path.

2. THE ThemeProvider SHALL cause re-renders only in components that explicitly consume `useTheme()`
   (ThemeToggle and FloatingNav), not in the entire component tree.

3. THE next-themes blocking script SHALL be no larger than 500 bytes minified so it does not
   meaningfully delay Time to First Byte.
