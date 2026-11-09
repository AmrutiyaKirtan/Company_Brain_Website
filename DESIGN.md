# Design System Specification: Your Company Brain (YCB)

**Status**: Active & Authoritative  
**Aesthetic Direction**: Editorial Precision & Modern Swiss Craft (Apple Glass meets Editorial Warm Paper)  
**Primary Brand Identity**: Local-First AI Knowledge Engine for Technical Teams

---

## 1. Color Palette & Tokens

The interface is built on a deliberate dual-surface architecture: **Warm Editorial Paper** for readable long-form information and **Obsidian Dark** for deep focus, terminal emulators, and code callouts.

### Core Tokens (`:root`)
- **Obsidian / Black**:
  - `--black: #0c0907` (Deep Obsidian base)
  - `--ink: #14100c` (Rich Warm Charcoal Ink)
- **Warm Editorial Paper**:
  - `--paper: #ece4d2` (Parchment base)
  - `--paper-subtle: #f4edd9` (Elevated card surface on paper)
  - `--paper-dark: #ded4bf` (Recessed borders & tab wells)
  - `--white: #f5eedb` (Soft off-white / light text)
  - `--cream: #fffaf0` (Highlight card fill)
- **Amber Accents & Signals**:
  - `--accent: #d97706` (Warm Amber 600)
  - `--accent-light: #fbbf24` (Amber 400 highlight)
  - Accent Pulse: `#10b981` (Emerald 500 for active/local signals)
- **Subtext & Lines (WCAG AA Calibrated)**:
  - `--muted-on-light: #5f5544` (Contrast ratio > 5.5:1 on `#ece4d2`)
  - `--muted-on-dark: #b8aa8c` (Contrast ratio > 6.2:1 on `#0c0907`)
  - `--line-on-light: rgba(20, 16, 12, 0.14)`
  - `--line-on-light-strong: rgba(20, 16, 12, 0.28)`
  - `--line-on-dark: rgba(245, 238, 219, 0.14)`
  - `--line-on-dark-strong: rgba(245, 238, 219, 0.28)`

### Apple Glass Materials
```css
--glass-bg-light: rgba(236, 228, 210, 0.75);
--glass-bg-dark: rgba(12, 9, 7, 0.82);
--glass-border-light: rgba(255, 255, 255, 0.4);
--glass-border-dark: rgba(245, 238, 219, 0.12);
--glass-blur: blur(24px) saturate(180%);
```

---

## 2. Typography Hierarchy

| Role | Font Family | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Headings** | `Space Grotesk` (`--font-space-grotesk`) | 600, 700 | `-0.028em` | Hero headlines, H1, H2, Section titles |
| **Body / Prose** | `DM Sans` (`--font-dm-sans`) | 400, 500 | `normal` | Paragraphs, descriptions, feature specs |
| **Code / Data / Status** | `IBM Plex Mono` (`--font-ibm-plex-mono`) | 500, 600 | `+0.04em` | CLI commands, connector keys, status badges |

### Typographic Rules
1. **Never copy prompt symbols**: Code snippet containers must render `$` with `user-select: none`.
2. **High-contrast subtext**: Never drop below `text-white/70` on dark backgrounds or `text-ink/75` on paper backgrounds.

---

## 3. Surface & Section Transition Architecture

- **No Jarring Zebra-Striping**: Scrolling through the landing page must feel like a unified journey. Transitions between dark and paper surfaces must use smooth gradient boundaries or contained dark code blocks on warm paper.
- **Card Containers**: Cards must earn their pixels. Never use generic identical 3-column card grids when the content represents sequential steps or differentiated concepts.

---

## 4. Interaction & Motion Rules

- **Native Pointer Integrity**: Never suppress the native OS cursor (`cursor: none !important` is forbidden). Custom cursor elements must act purely as non-blocking visual halos (`pointer-events: none`).
- **Spring Physics**: All modal transitions and hover states use Apple-standard critically damped spring motion (`damping: 22, stiffness: 300, mass: 0.8`).
- **Reduced Motion**: Respect `prefers-reduced-motion: reduce` across all canvas animations and floating visuals.
