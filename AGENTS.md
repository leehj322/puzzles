# Project Agent Guide

This project provides Cursor Agent Skills under `.cursor/skills/`. Load the
relevant skill when its trigger conditions match the task.

## Available Skills

### design-system

- **Path**: `.cursor/skills/design-system/SKILL.md`
- **Use when**: creating or styling UI components, buttons, cards, layouts,
  or any visual element in this project.
- **Summary**: Intercom-inspired warm-cream design system — Saans typography,
  Fin Orange (`#ff5600`) accent, warm neutrals (`#faf9f6` / `#dedbd6`),
  4px button radius, `scale(1.1)` hover.

### feature-sliced-design

- **Path**: `.cursor/skills/feature-sliced-design/SKILL.md`
- **Use when**: organizing project structure, deciding where new code belongs,
  defining public APIs / import boundaries, resolving cross-imports, or
  refactoring under `src/`.
- **Summary**: Official FSD v2.1 methodology — layer order
  `app → pages → widgets → features → entities → shared`, Pages-First
  principle, public API via `index.ts`, no same-layer cross-imports.
- **Conditional references** (load only when needed):
  - `references/layer-structure.md` — folder/file structure setup
  - `references/public-api.md` — `index.ts` design, barrels, circular imports
  - `references/cross-import-patterns.md` — same-layer sharing & `@x` pattern
  - `references/framework-integration.md` — Next.js / Vite / path aliases
  - `references/practical-exmples.md` — auth, API, Redux, React Query patterns

## Rules

Project-wide rules live in `.cursor/rules/` and are applied automatically by
Cursor based on their frontmatter (`alwaysApply` / `globs`).

- `.cursor/rules/karpathy-guidelines.mdc` — general coding behavior
- `.cursor/rules/design-system.mdc` — design system enforcement
- `.cursor/rules/commit-convention.mdc` — conventional commits style for this repo
