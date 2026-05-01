# Public API

How to design the contract between a slice and the code that consumes it,
plus the trade-offs of barrel `index.ts` files and how to mitigate them.

> **Source**: [feature-sliced.github.io — Public API](https://feature-sliced.github.io/documentation/docs/reference/public-api)

---

## What a Public API Is

A public API is the **contract** between a group of modules (typically a
slice) and the rest of the application. It also acts as a gate — only the
objects re-exported from the public API are visible to outside consumers.

In practice, it is implemented as an `index.ts` (or `index.js`) at the slice
root that re-exports the parts intended for external use:

```typescript
// pages/auth/index.ts
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

External consumers then import from the slice root, never from internal
files:

```typescript
// ✅ Correct — through public API
import { LoginPage } from "@/pages/auth";

// ❌ Violation — bypasses public API
import { LoginPage } from "@/pages/auth/ui/LoginPage";
```

---

## What Makes a Good Public API

A good public API achieves three goals:

1. **The rest of the app is protected from internal restructuring.** Renaming
   a file or moving a folder inside the slice should not break consumers.
2. **Behavioral changes that break expectations are reflected in the API.**
   If the contract changes (signature, semantics, return type), the public
   API surface should change too — making the break visible in code review.
3. **Only what is necessary is exposed.** Internal helpers, types, and
   intermediate state should remain private to the slice.

### Avoid Wildcard Re-exports

It is tempting to write `export *` to save typing, especially early in a
slice's life. Resist it — wildcard re-exports defeat goal 3 and silently
expose anything you add later.

```typescript
// ❌ Bad — features/comments/index.ts
export * from "./ui/Comment";
export * from "./model/comments";

// ✅ Good — list each export explicitly
export { Comment } from "./ui/Comment";
export { useComments, postComment } from "./model/comments";
```

Explicit exports also make the slice's interface **discoverable** at a
glance — a reader can open `index.ts` and immediately see what the slice
offers without diving into its internal files.

---

## Cross-Imports: the `@x` Public API

When two slices on the same layer (typically two entities) genuinely need to
share code, FSD provides a sanctioned escape hatch: the **`@x` notation**.
Each entity may expose a separate public API targeted at a specific
consuming entity.

```text
entities/
  user/
    @x/
      order.ts          ← public API exposed only to entities/order
    model/user.ts
    index.ts
  order/
    model/
      order-summary.ts  ← imports from user/@x/order
    index.ts
```

```typescript
// entities/order/model/order-summary.ts
import type { EntityA } from "@/entities/user/@x/order";
```

The notation `A/@x/B` reads as **"A crossed with B"** — A's public API for
use by B specifically.

> `@x` is a last resort. Always try Strategy 1 (merge slices), Strategy 2
> (extract to entities), and Strategy 3 (compose in higher layer) first.
> See `cross-import-patterns.md` for the full resolution order.

---

## Issues with Index (Barrel) Files

`index.ts` files are the most common way to define a public API, but they
have known trade-offs. This section lists each issue and the recommended
mitigation.

### 1. Circular Imports

A circular import is when two or more files import each other in a cycle.
Bundlers handle these inconsistently, sometimes producing runtime errors
that are hard to debug.

Index files create a clear opportunity for accidental cycles. A common
mistake: a file *inside* the slice imports from the slice's own `index.ts`.

```typescript
// pages/home/index.ts
export { HomePage } from "./ui/HomePage";
export { loadUserStatistics } from "./api/loadUserStatistics";

// ❌ pages/home/ui/HomePage.tsx — imports from its own slice's index
import { loadUserStatistics } from "../"; // creates index ↔ HomePage cycle
```

`index.ts` imports `HomePage`, `HomePage` imports `index.ts` → cycle.

**Mitigation rule** — when one file imports from another:

- **Same slice** → use **relative paths**, importing the specific file.
- **Different slices** → use **absolute paths** (the alias / public API).

```typescript
// ✅ pages/home/ui/HomePage.tsx — internal, relative, file-direct
import { loadUserStatistics } from "../api/loadUserStatistics";

// ✅ pages/dashboard/ui/DashboardPage.tsx — external, absolute, public API
import { loadUserStatistics } from "@/pages/home";
```

### 2. Tree-Shaking and Bundle Size in `shared/ui` and `shared/lib`

Some bundlers struggle to tree-shake re-exports from a single large barrel.
For most slices this is fine — the contents are closely related, so
consumers usually need most of them. The problem appears in **`shared/ui`**
and **`shared/lib`**, which collect unrelated modules.

If a single `shared/ui/index.ts` re-exports `Button`, `Carousel`,
`Accordion`, and a `Carousel` depends on a heavy library, importing only
`Button` may pull the heavy dependency into the bundle.

**Mitigation** — give each component or utility its own `index.ts`, and
import from the deeper path:

```text
shared/
  ui/
    button/
      Button.tsx
      index.ts
    text-field/
      TextField.tsx
      index.ts
    carousel/
      Carousel.tsx     ← heavy dependency stays scoped to this folder
      index.ts
```

```typescript
// pages/sign-in/ui/SignInPage.tsx
import { Button } from "@/shared/ui/button";
import { TextField } from "@/shared/ui/text-field";
// Carousel is not pulled in
```

### 3. No Hard Enforcement

`index.ts` is a **convention**, not a runtime constraint. Nothing prevents
a developer (or an IDE auto-import) from writing
`import { Foo } from "@/features/auth/ui/Foo"` and bypassing the public API.

**Mitigation** — run [Steiger](https://github.com/feature-sliced/steiger),
the official FSD linter. Its `public-api` rule flags imports that side-step
a slice's `index.ts`. Configure your IDE to prefer importing from the
deepest available `index.ts` to reduce accidental bypasses.

### 4. Dev-Server Performance on Large Projects

A large number of barrel files can slow down dev-server module resolution.
TkDodo's article ["Please Stop Using Barrel Files"](https://tkdodo.eu/blog/please-stop-using-barrel-files)
documents the issue.

**Mitigations:**

1. **Per-component barrels in `shared/ui` / `shared/lib`** (same fix as
   issue 2) reduces the size of any single re-export graph.
2. **Do not add barrels in segments of slice-bearing layers.** If
   `features/comments/index.ts` already exists, do **not** add
   `features/comments/ui/index.ts` as well — the segment-level barrel
   serves no architectural purpose and just slows resolution.
3. **Split very large projects into multiple FSD roots** in a monorepo.
   Each package is a separate FSD root with its own layers; some packages
   may only have `shared` + `entities`, others only `pages` + `app`.

---

## Practical Checklist

Use this checklist when creating or reviewing a slice's public API.

- [ ] Slice has an `index.ts` at its root
- [ ] All external consumers import from the slice root, not internal files
- [ ] Exports are **explicit** (`export { X } from "./..."`), no `export *`
- [ ] Internal helpers, intermediate types, and dev-only utilities are
      **not** in `index.ts`
- [ ] Files inside the slice do **not** import from the slice's own
      `index.ts` (use relative file-direct paths instead)
- [ ] If the slice is in `shared/ui` or `shared/lib` and contains
      independent components, each component has its own `index.ts`
- [ ] No segment-level barrels (`feature/x/ui/index.ts`) when a slice-level
      `index.ts` already exists
- [ ] Cross-imports between same-layer slices use the resolution order in
      `cross-import-patterns.md`; `@x` is used only between entities and
      only as a last resort
- [ ] Steiger or an equivalent linter is run in CI to catch public-API
      bypass

---

## Quick Reference

| Question                                                | Answer                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------- |
| Where does the public API live?                         | `<slice>/index.ts`                                                  |
| Can I `export *`?                                       | No — list exports explicitly                                        |
| Can a file import from its own slice's `index.ts`?      | No — use relative file-direct paths                                 |
| Should `shared/ui` have one big `index.ts`?             | No — give each component its own `index.ts`                         |
| Should every `ui/` segment have an `index.ts`?          | No — only the slice root                                            |
| Cross-import between two entities?                      | Last resort: `@x` (see `cross-import-patterns.md`)                  |
| How do I prevent consumers from bypassing the API?      | Run Steiger; configure IDE auto-import to prefer the slice root     |
| Where do split client/server entry points fit?          | `index.client.ts` / `index.server.ts` (see `framework-integration.md`) |
