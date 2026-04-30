# Framework Integration

How to set up FSD within the project's framework (Next.js App Router).
Covers directory placement, routing integration, and path alias configuration.

---

## General Principle

Place FSD layers inside `src/` to avoid naming conflicts with framework
directories. The FSD `app/` layer and `pages/` layer are **not** the same as
framework directories with the same names (e.g., Next.js `app/` directory).

---

## Next.js (App Router)

### Directory structure

```text
my-nextjs-project/
  app/                     ← Next.js App Router (routing + layouts)
    layout.tsx             ← Root layout — imports from FSD app layer
    page.tsx               ← Route entry — imports from FSD pages layer
    profile/
      page.tsx             ← Route entry for /profile
    api/                   ← Next.js API routes (if needed)
  pages/                   ← Empty placeholder (see "Pages Router conflict" below)
    README.md
  src/
    app/                   ← FSD app layer
      providers/
        index.tsx          ← All providers (QueryClient, theme, etc.)
      styles/
        globals.css
    pages/                 ← FSD pages layer
      home/
        ui/HomeView.tsx
        index.ts
      profile/
        ui/ProfileView.tsx
        model/profile.ts
        api/fetch-profile.ts
        index.ts
    widgets/               ← FSD widgets layer (when needed)
    features/              ← FSD features layer (when needed)
    entities/              ← FSD entities layer (when needed)
    shared/                ← FSD shared layer
      ui/
      lib/
      api/
```

### Pages Router conflict

When the App Router (`app/`) sits at the project root and the FSD pages layer
sits at `src/pages/`, Next.js detects them as App Router and Pages Router
respectively. Because their parent folders differ (root vs. `src/`), the build
fails with:

> `pages` and `app` directories should be under the same folder

Additionally, `.tsx`/`.ts` files inside `src/pages/` would otherwise be
registered as unintended Pages Router routes.

**Resolution:** create an empty `pages/` directory at the project root with a
single `README.md` (and no source files). Next.js binds Pages Router to the
root `pages/` and stops scanning `src/pages/`, leaving the FSD pages layer
untouched.

```text
pages/
  README.md            ← documents why the folder is empty; do not add code here
```

### Naming convention for page UIs

FSD page slices export their root component as `*View`, not `*Page`. The
framework route file (`app/.../page.tsx`) is a thin adapter that returns the
View. This keeps the word "page" reserved for the framework's routing layer
and makes intent unambiguous when both concepts coexist.

```typescript
// src/pages/home/ui/home-view.tsx
"use client"; // only when needed
export function HomeView() {
  return <main>Home</main>;
}

// src/pages/home/index.ts
export { HomeView } from "./ui/home-view";
```

### Wiring Next.js routes to FSD pages

```typescript
// app/layout.tsx
import { Providers } from '@/app/providers';
import '@/app/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/page.tsx — thin route entry
import { HomeView } from '@/pages/home';
export default function Page() {
  return <HomeView />;
}

// app/profile/page.tsx
import { ProfileView } from '@/pages/profile';
export default function Page() {
  return <ProfileView />;
}
```

### Path aliases (tsconfig)

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/app/*": ["./src/app/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/features/*": ["./src/features/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

Next.js automatically reads `tsconfig.json` paths — no additional
`next.config.js` alias configuration is needed.

> **TypeScript 6 note:** `baseUrl` is deprecated. Omit it and prefix every
> path mapping with `./` so the compiler resolves them relative to
> `tsconfig.json`. With `baseUrl`, you would get a deprecation warning; without
> the `./` prefix, you would get TS5090 (non-relative paths require `baseUrl`).

### Server Components and Public API splitting

FSD layers work inside both Server and Client Components. However, the
standard single `index.ts` public API can cause problems in RSC environments
because re-exporting client and server code from the same entry point may
trigger bundler errors or unintended client/server boundary crossings.

**Split the public API into multiple entry points per environment:**

```text
entities/user/
  model/
    user.ts
  ui/
    UserAvatar.tsx          ← 'use client' — uses hooks
    UserProfileCard.tsx     ← Server Component — no hooks
  api/
    user-queries.server.ts  ← Server-only data fetching
  index.ts                  ← Shared exports (types, pure functions)
  index.client.ts           ← Client component exports
  index.server.ts           ← Server component + server-only exports
```

```typescript
// entities/user/index.ts — shared (types, pure logic, no components)
export type { User } from "./model/user";
export { formatUserName } from "./model/user";

// entities/user/index.client.ts — client components only
export { UserAvatar } from "./ui/UserAvatar";

// entities/user/index.server.ts — server components + server-only code
export { UserProfileCard } from "./ui/UserProfileCard";
export { fetchUser } from "./api/user-queries.server";
```

```typescript
// Consumers import from the appropriate entry point:

// In a Server Component (pages/profile/ui/profile-view.tsx)
import { UserProfileCard } from "@/entities/user/index.server";
import type { User } from "@/entities/user";

// In a Client Component (features/comment/ui/CommentAuthor.tsx)
import { UserAvatar } from "@/entities/user/index.client";
```

**Rules for split public APIs:**

1. **`index.ts`** — Export only types, constants, and pure functions that work
   in both environments. This is the default import path.
2. **`index.client.ts`** — Export components that use `'use client'`, hooks,
   or browser APIs.
3. **`index.server.ts`** — Export Server Components, server-only data fetching
   functions, and code that uses server-only APIs.
4. **The `index.[env].ts` pattern is permissible in general** — not just for
   RSC. Any environment with distinct runtimes can use this pattern (e.g.,
   `index.edge.ts` for edge runtime code).
5. Steiger support for multiple entry points is available or coming in an
   upcoming release. If Steiger flags `index.client.ts` / `index.server.ts`,
   check for version updates.

**When NOT to split:**

- If a slice has no client/server boundary concerns (e.g., pure model logic),
  a single `index.ts` is sufficient.
- Do not pre-emptively split all slices — split only when you actually have
  both client and server exports in the same slice.

---

## Key Reminders

1. **FSD lives in `src/`** — the Next.js `app/` directory at the project root
   is the framework's own routing layer, not the FSD app layer.
2. **Framework route files are thin wrappers** — `app/.../page.tsx` imports
   and renders an FSD `*View` component. Business logic stays in FSD pages.
3. **Use the `*View` naming convention** for FSD page components to avoid
   confusion with Next.js's `page.tsx`.
4. **Path aliases are required** — without them, import paths become long and
   fragile. Configure them in `tsconfig.json`.
5. **Pages First still applies** — start with code in FSD `pages/` and extract
   to lower layers (`widgets/`, `features/`, `entities/`) only when needed.
