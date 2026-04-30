---
name: design-system
description: Apply the playful & cute puzzle-platform design system — rounded corners (button 12-16px, card 20-24px), multi-color playful accents (coral/yellow/mint/lavender), soft pastel or candy-kawaii tone variants, gentle bounce interactions. Use when creating or styling UI components, buttons, cards, or layouts in this project.
---

# Puzzle Platform Design System — Playful & Cute

## 1. Visual Theme & Atmosphere

This is a **puzzle platform for everyday play** — not a business tool. The design language should feel **light, friendly, and joyful**, like picking up a board-game piece. We move away from sharp industrial geometry and toward **rounded, bouncy, multi-color** surfaces that invite tapping, dragging, and lingering.

The system supports **two tone variants** — pick one per surface and stay consistent within it:

- **Soft Pastel** (default for most pages): muted lavender / mint / peach on warm off-white. Calm, modern-cute, suitable for long sessions and large UIs (lists, dashboards, settings).
- **Candy Kawaii** (for hero, onboarding, celebration moments): cream / pink / baby-blue with stronger pop, hand-drawn feel, slight wobble. Used sparingly for delight moments.

**Key Characteristics (both variants):**

- Soft off-white canvas (`#fbfaf7`) — warmer than pure white, gentler than gray
- **Rounded geometry** — buttons 12–16px, cards 20–24px, pills for tags
- **Multi-color playful palette** — coral, yellow, mint, lavender, sky used together, never monochrome
- Gentle bounce interactions — `scale(1.04)` hover, `scale(0.96)` active, soft spring easing
- Soft, low-spread shadows with a hint of color tint (not pure black)
- Friendly typography — rounded sans-serif, normal/positive tracking (no aggressive negative kerning)
- Generous whitespace and breathing room — never cramped

## 2. Color Palette & Roles

### Surfaces (shared)

- **Cream** (`#fbfaf7`): primary canvas — `--color-surface`
- **White** (`#ffffff`): elevated card surface — `--color-surface-elevated`
- **Soft Cream** (`#f4f1ea`): nested/sunken surface — `--color-surface-sunken`
- **Ink** (`#2a2a32`): primary text (softer than pure black) — `--color-text`
- **Ink Muted** (`#6b6b78`): secondary text — `--color-text-muted`
- **Ink Soft** (`#a6a6b3`): tertiary / placeholder — `--color-text-soft`
- **Border** (`#ece8df`): warm rounded border — `--color-border`

### Soft Pastel Variant (default)

Muted, modern, calm-cute. Use as primary accents across most product UI.

- **Lavender** (`#b8a4ff`): `--accent-lavender` — primary brand accent (focus, primary CTA)
- **Mint** (`#7fd6c2`): `--accent-mint` — success, completion
- **Peach** (`#ffb39c`): `--accent-peach` — warm highlights, hover
- **Sky** (`#a4d4ff`): `--accent-sky` — info, secondary
- **Butter** (`#ffe28a`): `--accent-butter` — attention, badges
- **Rose** (`#ff9bb8`): `--accent-rose` — favorites, hearts

### Candy Kawaii Variant (hero / onboarding / celebration)

Higher chroma, sweeter, more pop. Use sparingly on hero sections and reward states.

- **Pop Coral** (`#ff7a59`): `--candy-coral` — primary kawaii accent
- **Pop Pink** (`#ff5d9e`): `--candy-pink`
- **Pop Yellow** (`#ffd23f`): `--candy-yellow`
- **Pop Mint** (`#5ce0c0`): `--candy-mint`
- **Pop Sky** (`#5fb8ff`): `--candy-sky`
- **Pop Lilac** (`#c89aff`): `--candy-lilac`

### Semantic

- **Success**: `--accent-mint` (`#7fd6c2`)
- **Warning**: `--accent-butter` (`#ffe28a`) with ink text
- **Danger**: `#ff6b7a` (soft red, never harsh) — `--color-danger`
- **Info**: `--accent-sky` (`#a4d4ff`)

### Multi-color Usage Rule

Puzzle pieces, tags, avatars, and category chips **should rotate through the palette** — never a single accent column. Pick a deterministic hash (e.g. piece id % 6) so the same piece stays the same color across renders.

## 3. Typography Rules

### Font Families

- **Primary**: rounded geometric sans-serif — `Quicksand`, `Nunito`, or `Plus Jakarta Sans`
  - fallback: `ui-rounded, "SF Pro Rounded", system-ui, sans-serif`
- **Display** (hero, celebration): `Fredoka` or `Baloo 2` — rounded, slightly chunky
  - fallback: `ui-rounded, system-ui, sans-serif`
- **Mono** (timer, scores): `JetBrains Mono` or `DM Mono`
  - fallback: `ui-monospace, monospace`

### Hierarchy

| Role            | Font    | Size | Weight | Line Height | Letter Spacing |
| --------------- | ------- | ---- | ------ | ----------- | -------------- |
| Display Hero    | Fredoka | 64px | 600    | 1.10        | -0.5px         |
| Section Heading | Fredoka | 40px | 600    | 1.15        | -0.3px         |
| Sub-heading     | Primary | 28px | 600    | 1.20        | -0.2px         |
| Card Title      | Primary | 22px | 600    | 1.25        | -0.1px         |
| Feature Title   | Primary | 18px | 600    | 1.35        | 0              |
| Body Emphasis   | Primary | 16px | 600    | 1.50        | 0              |
| Body            | Primary | 15px | 500    | 1.55        | 0              |
| Body Small      | Primary | 13px | 500    | 1.50        | 0              |
| Button          | Primary | 15px | 600    | 1.20        | 0.1px          |
| Tag / Chip      | Primary | 12px | 600    | 1.00        | 0.2px          |
| Mono / Timer    | Mono    | 16px | 500    | 1.20        | 0              |

**Tracking rule**: Use **normal or slightly positive** letter-spacing. NEVER apply aggressive negative tracking — the rounded font character is part of the cute identity.

## 4. Component Stylings

### Buttons

**Primary (Soft Pastel)**

- Background: `--accent-lavender` (`#b8a4ff`)
- Text: `--color-text` (`#2a2a32`) — readable, not pure white on pastel
- Padding: `12px 20px`
- Radius: **14px**
- Shadow: `0 2px 0 0 #9684e0` (solid offset, gives "pressable" feel — like a key cap)
- Hover: `scale(1.04)`, shadow grows to `0 4px 0 0 #9684e0`, lift `translateY(-1px)`
- Active: `scale(0.96)`, shadow collapses to `0 0 0 0`, `translateY(2px)` (the key is pressed down)
- Transition: `transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle overshoot)

**Primary (Candy Kawaii)**

- Same shape, but background `--candy-coral` (`#ff7a59`), shadow `0 3px 0 0 #d85f3f`
- Slightly larger radius: **16px**

**Secondary / Outlined**

- Background: `--color-surface-elevated`
- Text: `--color-text`
- Border: `2px solid --color-border`
- Radius: 14px
- Hover: border becomes `--accent-lavender`, soft tint background `#f6f3ff`

**Ghost / Tertiary**

- Background: transparent
- Text: `--color-text-muted`
- Hover: `--color-surface-sunken` background, text becomes `--color-text`
- Radius: 12px

**Icon Button**

- Square 40×40, radius **12px**
- Same hover/active bounce

### Cards & Containers

- Background: `--color-surface-elevated` (white)
- Border: `1px solid --color-border` (warm)
- Radius: **20px** (Soft Pastel) / **24px** (Candy Kawaii)
- Shadow: `0 2px 8px rgba(180, 168, 140, 0.08)` — colored, soft, not pure black
- Hover (interactive cards): `scale(1.02)`, shadow grows to `0 6px 20px rgba(180, 168, 140, 0.14)`, `translateY(-2px)`

### Tags / Chips / Pills

- Radius: **9999px** (full pill) — chips are the one place we go fully round
- Padding: `4px 10px` (small) / `6px 14px` (medium)
- Background: pastel tint at ~20% opacity (e.g. `--accent-lavender` at 20%)
- Text: matching darker accent shade

### Inputs

- Background: `--color-surface-elevated`
- Border: `2px solid --color-border`
- Radius: **12px**
- Padding: `12px 14px`
- Focus: border becomes `--accent-lavender`, soft glow `0 0 0 4px rgba(184, 164, 255, 0.18)`
- No harsh red on error — use `--color-danger` border with soft pink glow

### Navigation

- Primary font 15px weight 600
- Active link: pill background in `--accent-lavender` at 15% opacity, text in lavender-800
- Hover: `--color-surface-sunken` background, radius 10px

### Puzzle Pieces (domain component)

- Radius: **16px** on outer corners
- Each piece pulls a color from the **6-color palette rotation** by deterministic hash
- Drag state: `scale(1.08)` + shadow `0 12px 24px rgba(0,0,0,0.18)` + slight rotation `rotate(2deg)`
- Snap-in: spring bounce, brief scale `1.15 → 1.0` over 240ms

## 5. Layout Principles

### Spacing scale

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96` (px) — generous, breathable

### Border Radius scale

| Element      | Radius              | Tailwind class    |
| ------------ | ------------------- | ----------------- |
| Tag / Chip   | 9999px (pill)       | `rounded-pill`    |
| Nav item     | 12px                | `rounded-nav`     |
| Input        | 14px                | `rounded-input`   |
| Icon button  | 14px                | `rounded-icon`    |
| Button       | 16px                | `rounded-button`  |
| Puzzle tile / decorative chip | 16px | `rounded-tile`    |
| Media frame inside card | 18px      | `rounded-media`   |
| Card         | 24px                | `rounded-card`    |
| Modal / Sheet| 28px                | `rounded-modal`   |

**Rule:** Never hardcode `rounded-[Npx]` in JSX. Add a token to
`apps/web/src/app/styles/globals.css` (`@theme inline { --radius-* }`) and use
the resulting `rounded-*` class instead.

### Corner consistency rule

Within one container, child radii should be **smaller than the parent**. e.g. card 20px → button inside 14px → tag inside 9999px (pill is exempt).

## 6. Depth & Elevation

Soft, **color-tinted** shadows — never pure `rgba(0,0,0,…)`.

- **Level 0** — flat, on canvas: no shadow
- **Level 1** — resting card: `0 2px 8px rgba(180, 168, 140, 0.08)`
- **Level 2** — hover/lifted: `0 6px 20px rgba(180, 168, 140, 0.14)`
- **Level 3** — modal/popover: `0 16px 40px rgba(80, 72, 56, 0.18)`
- **Pressable button**: solid offset shadow `0 2px 0 0 <accent-shade-darker>` (the keycap effect)

## 7. Motion

- **Default easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle overshoot, "boing")
- **Default duration**: 180ms (small) / 240ms (medium) / 320ms (large)
- **Hover**: lift + grow (`scale(1.04)`, `translateY(-1px)`)
- **Active**: press down (`scale(0.96)`, `translateY(2px)`)
- **Success / snap**: spring bounce, `1.0 → 1.15 → 1.0`
- **Page transitions**: fade + slide-up 8px, 240ms
- Respect `prefers-reduced-motion: reduce` — disable scale/translate, keep opacity only

## 8. Do's and Don'ts

### Do

- Use **rounded geometry** consistently — buttons ≥12px, cards ≥20px
- Rotate accents through the **multi-color palette** for repeated items (pieces, tags, avatars)
- Use **rounded** sans-serif (Quicksand / Nunito / Fredoka) with normal tracking
- Apply gentle **bounce** on hover/active using spring easing
- Use **color-tinted** soft shadows
- Keep text on pastels as **dark ink** (`#2a2a32`), not white — pastels need contrast

### Don't

- Don't use sharp 4px radii — too industrial for this product
- Don't apply aggressive negative letter-spacing — kills the friendly feel
- Don't use a single monochrome accent for repeated decorative elements
- Don't use harsh black `rgba(0,0,0,…)` shadows — always tinted
- Don't put white text on pastel buttons — contrast fails
- Don't mix Soft Pastel and Candy Kawaii within one surface — pick one tone per page

## 9. Responsive Behavior

Use **Tailwind v4 default breakpoints**: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Do not override them in `globals.css`.

- Mobile-first; tap targets minimum **44×44px**
- Buttons grow padding on mobile (`14px 22px`)
- Cards reduce radius slightly on mobile (`20px → 16px`) so they don't look bubble-heavy on small screens

### Sizing rule

Never hardcode arbitrary `max-w-[Npx]` or `rounded-[Npx]`. Use Tailwind's
default scale (`max-w-xs/sm/md/lg/xl/2xl/3xl/4xl/...`) for widths, and the
project's `--radius-*` tokens (`rounded-icon/tile/media/button/card/...`) for
corners. If no token fits, add one to `apps/web/src/app/styles/globals.css`
under `@theme inline { --radius-* }` rather than inlining a px value.

## 10. Agent Prompt Guide

### Quick Color Reference

- Canvas: Cream (`#fbfaf7`)
- Card surface: White (`#ffffff`)
- Text: Ink (`#2a2a32`)
- Border: Warm (`#ece8df`)
- Default accent (Pastel): Lavender (`#b8a4ff`)
- Hero accent (Candy): Coral (`#ff7a59`)
- 6-color rotation: lavender, mint, peach, sky, butter, rose

### Example Component Prompts

- **Primary button (Pastel)**: "Lavender (#b8a4ff) bg, ink text (#2a2a32), 14px radius, padding 12px 20px, solid offset shadow `0 2px 0 0 #9684e0`, Quicksand 15/600. Hover scale(1.04) translateY(-1px) shadow grows; active scale(0.96) translateY(2px) shadow collapses. Easing cubic-bezier(0.34, 1.56, 0.64, 1) 180ms."

- **Puzzle piece**: "Square card 16px radius, color from 6-palette rotation by piece-id hash (lavender/mint/peach/sky/butter/rose). Drag: scale(1.08) rotate(2deg) shadow `0 12px 24px rgba(0,0,0,0.18)`. Snap: spring bounce 1.0→1.15→1.0 over 240ms."

- **Card (Pastel)**: "White surface, 1px warm border (#ece8df), 20px radius, soft tinted shadow `0 2px 8px rgba(180,168,140,0.08)`. Hover: lift translateY(-2px), shadow grows to `0 6px 20px rgba(180,168,140,0.14)`."

- **Hero (Candy)**: "Cream canvas (#fbfaf7), Fredoka 64/600 ink text with -0.5px tracking. Coral primary CTA (#ff7a59) with `0 3px 0 0 #d85f3f` shadow, 16px radius. Decorative floating pastel shapes in mint/butter/lilac at 60% opacity."
